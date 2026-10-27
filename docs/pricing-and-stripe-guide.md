# LegalGPT — Pricing Model & Stripe Integration Architecture Guide

> [!NOTE]
> **ARCHIVED / DEPRECATED:** LegalGPT is now a **100% Free to Use** platform. All pricing models, paywalls, and subscription tiers have been removed in favor of unrestricted open access for all users. This document is retained purely for historical architectural reference.

---

## Table of Contents

1. [Monetization Model & Business Rules](#1-monetization-model--business-rules)
2. [User Experience (UX) & Paywall Limit Exceeded Flow](#2-user-experience-ux--paywall-limit-exceeded-flow)
3. [Database Schema & Supabase SQL Migration](#3-database-schema--supabase-sql-migration)
4. [Stripe Dashboard Setup Guide](#4-stripe-dashboard-setup-guide)
5. [Backend Architecture & API Endpoints](#5-backend-architecture--api-endpoints)
   - [5.1. Stripe Client Utility](#51-stripe-client-utility)
   - [5.2. Subscription Service (Core Logic)](#52-subscription-service-core-logic)
   - [5.3. Checkout Session Endpoint (`/api/billing/checkout`)](#53-checkout-session-endpoint-apibillingcheckout)
   - [5.4. Customer Portal Endpoint (`/api/billing/portal`)](#54-customer-portal-endpoint-apibillingportal)
   - [5.5. Stripe Webhook Handler (`/api/billing/webhook`)](#55-stripe-webhook-handler-apibillingwebhook)
   - [5.6. Analysis Route Gatekeeper (`/api/contracts/[contractId]/analyze`)](#56-analysis-route-gatekeeper-apicontractscontractidanalyze)
6. [Frontend Implementation](#6-frontend-implementation)
   - [6.1. Paywall Modal State Store (Zustand)](#61-paywall-modal-state-store-zustand)
   - [6.2. Interactive Paywall Modal Component](#62-interactive-paywall-modal-component)
   - [6.3. Upload Dropzone Guardrail](#63-upload-dropzone-guardrail)
   - [6.4. TopHeader Usage Counter & Upgrade Button](#64-topheader-usage-counter--upgrade-button)
7. [Environment Variables](#7-environment-variables)
8. [Testing & QA Verification Checklist](#8-testing--qa-verification-checklist)

---

## 1. Monetization Model & Business Rules

### Tier Matrix

| Feature | Free Tier ("Starter") | Pro Counsel ($49/mo or $39/mo billed annually) | Enterprise |
| :--- | :--- | :--- | :--- |
| **Document Limit** | **1 Document Lifetime Free** | **Unlimited Audits** | **Unlimited + Custom Playbook** |
| **LangGraph Nodes** | Executive Summary + Clause Breakdown | Full 6-Node Chain (Research, Advisor, Reviewer) | Full Chain + Custom Playbooks |
| **Interactive Chat** | 3 Questions on that 1 document | Unlimited Context-Aware RAG Chat | Unlimited Chat + Team Sharing |
| **Export Formats** | View Online Only | PDF & DOCX Redline Exports | Custom Export / API Webhooks |
| **Jurisdictions** | US Standard | US, UK, India, EU GDPR Precedents | Global Jurisdictions + Dedicated SLA |

### Core Business Logic Rules
1. **Creation**: When a user registers, a record in `user_subscriptions` is initialized with `status = 'free'`, `free_analyses_used = 0`, and `free_analyses_limit = 1`.
2. **Consumption**: A free audit is only deducted once an analysis completes successfully (`status = 'completed'`). If processing fails due to a network glitch or OCR failure, the credit is preserved.
3. **Enforcement (Double-Lock Guardrail)**:
   - **Frontend Guard**: The dropzone and upload actions check user quota. If `free_analyses_used >= 1` and `status !== 'active'`, the file selector is intercepted and the Paywall Modal opens immediately.
   - **Backend Guard**: In `POST /api/contracts/[contractId]/analyze`, the server validates subscription status before calling LangGraph. If unauthorized, it terminates with HTTP 402 `PAYMENT_REQUIRED`.
4. **Historical Access**: Even when users exceed their free analysis limit, they retain permanent read-only access to view their already analyzed contract and chat history.

---

## 2. User Experience (UX) & Paywall Limit Exceeded Flow

### Step-by-Step Flowchart

```
                 User attempts to analyze document
                               │
                               ▼
                Is User Subscribed (active/trialing)?
                               │
               ┌───────────────┴───────────────┐
              YES                              NO
               │                               │
               ▼                               ▼
       Proceed with Analysis       Has user analyzed >= 1 doc?
       (Unlimited Pro Plan)                    │
                                ┌──────────────┴──────────────┐
                               NO                            YES
                                │                             │
                                ▼                             ▼
                        Allow 1st Free Audit          [TRIGGER PAYWALL]
                        (Increment count on DONE)     1. Open Paywall Modal
                                                      2. Block File Ingestion
                                                      3. Direct to Stripe Checkout
```

### How the User is Notified

1. **Top Navigation Header Counter**:
   - Free users see a pill: `Free Plan: 0/1 Used` or `Free Plan: 1/1 Used (Limit reached)`.
   - Clicking it opens the plan upgrade sheet.
2. **Dropzone Pre-Upload Intercept**:
   - If a free user with 1 used audit drags a file onto the dropzone or clicks "Select File", the upload is aborted before uploading bytes to Supabase storage.
   - A modal with glassmorphism design animates into view:
     > **"You've used your 1 free contract analysis"**
     > *Upgrade to Pro Counsel to unlock unlimited contract audits, autonomous legal research, and instant clause redlining.*
3. **In-Flight Stream Error Catch**:
   - If the user bypasses the client or uploads concurrently, the backend returns HTTP 402 with `{ code: "FREE_TIER_LIMIT_REACHED" }`. The frontend displays a persistent Paywall Banner with a 1-click upgrade button.

---

## 3. Database Schema & Supabase SQL Migration

Run this migration script directly in your **Supabase Dashboard -> SQL Editor**:

```sql
-- ==============================================================================
-- LegalGPT Database Migration: Subscriptions and Billing Quota
-- ==============================================================================

-- 1. Create `user_subscriptions` table
CREATE TABLE IF NOT EXISTS public.user_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL UNIQUE,
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT,
    status TEXT NOT NULL DEFAULT 'free' CHECK (status IN ('free', 'trialing', 'active', 'past_due', 'canceled', 'incomplete')),
    free_analyses_used INTEGER NOT NULL DEFAULT 0,
    free_analyses_limit INTEGER NOT NULL DEFAULT 1,
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indices for rapid indexing
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_user_id ON public.user_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer_id ON public.user_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON public.user_subscriptions(status);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Users can read their own subscription state
DROP POLICY IF EXISTS "Users can view own subscription" ON public.user_subscriptions;
CREATE POLICY "Users can view own subscription"
    ON public.user_subscriptions FOR SELECT
    USING (auth.uid()::text = user_id);

-- Only service role (server backend / webhooks) can insert or update subscription records
DROP POLICY IF EXISTS "Service role full access on subscriptions" ON public.user_subscriptions;
CREATE POLICY "Service role full access on subscriptions"
    ON public.user_subscriptions FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- 3. Stored Procedure for atomic analysis incrementation
CREATE OR REPLACE FUNCTION increment_free_analysis_usage(target_user_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_subscriptions (user_id, free_analyses_used, status)
    VALUES (target_user_id, 1, 'free')
    ON CONFLICT (user_id)
    DO UPDATE SET 
        free_analyses_used = public.user_subscriptions.free_analyses_used + 1,
        updated_at = timezone('utc'::text, now());
END;
$$;
```

---

## 4. Stripe Dashboard Setup Guide

### Step 1: Obtain Stripe API Keys
1. Go to the [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys).
2. Copy your **Publishable key** (`pk_test_...`) and **Secret key** (`sk_test_...`).

### Step 2: Create the Products & Prices
1. Navigate to **Product catalog** -> **Add product**.
2. **Product Name**: `LegalGPT Pro Counsel`
3. **Description**: `Unlimited contract audits, multi-agent risk scanning, and RAG copilot.`
4. **Pricing Plan 1 (Monthly)**:
   - Price: `$49.00 USD`
   - Billing period: `Monthly`
   - Copy Price ID: `price_1XXXXXXXXX` (e.g. `NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID`)
5. **Pricing Plan 2 (Annual - Optional)**:
   - Price: `$468.00 USD` ($39/mo)
   - Billing period: `Yearly`
   - Copy Price ID: `price_1YYYYYYYYY` (e.g. `NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID`)

### Step 3: Configure Customer Portal
1. Navigate to **Settings** -> **Customer portal** (`https://dashboard.stripe.com/test/settings/billing/portal`).
2. Toggle on:
   - **Allow customers to cancel subscriptions** (Immediate or at end of billing cycle).
   - **Allow customers to switch plans**.
   - **Allow customers to update payment methods**.
   - **Allow customers to view invoice history**.
3. Save changes.

### Step 4: Configure Webhooks
1. **Local Development (via Stripe CLI)**:
   ```bash
   # Install Stripe CLI and authenticate
   stripe login

   # Forward webhooks to local Next.js dev server
   stripe listen --forward-to localhost:3000/api/billing/webhook
   ```
   *The CLI will output a webhook signing secret: `whsec_...`. Paste this into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.*

2. **Production Webhook**:
   - Go to **Developers** -> **Webhooks** -> **Add an endpoint**.
   - Endpoint URL: `https://your-domain.com/api/billing/webhook`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`

---

## 5. Backend Architecture & API Endpoints

### 5.1. Stripe Client Utility (`src/lib/stripe/client.ts`)

Install Stripe SDK first:
```bash
npm install stripe
```

Create `src/lib/stripe/client.ts`:
```typescript
import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is missing in environment variables');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia' as any,
  appInfo: {
    name: 'LegalGPT',
    version: '1.0.0',
  },
});
```

---

### 5.2. Subscription Service (`src/server/services/subscription.service.ts`)

Create `src/server/services/subscription.service.ts`:
```typescript
import { supabaseAdmin } from '@/utils/supabase/admin';

export interface UserSubscriptionInfo {
  userId: string;
  status: 'free' | 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete';
  freeAnalysesUsed: number;
  freeAnalysesLimit: number;
  canAnalyze: boolean;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  currentPeriodEnd?: string | null;
  cancelAtPeriodEnd?: boolean;
}

export class SubscriptionService {
  /**
   * Fetch current subscription and quota status for a user.
   */
  static async getUserSubscription(userId: string): Promise<UserSubscriptionInfo> {
    const { data, error } = await supabaseAdmin
      .from('user_subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('[SubscriptionService.getUserSubscription] Error:', error.message);
    }

    if (!data) {
      // Default initial record if none exists yet
      return {
        userId,
        status: 'free',
        freeAnalysesUsed: 0,
        freeAnalysesLimit: 1,
        canAnalyze: true,
      };
    }

    const isPaidActive = data.status === 'active' || data.status === 'trialing';
    const canAnalyze = isPaidActive || (data.free_analyses_used < data.free_analyses_limit);

    return {
      userId: data.user_id,
      status: data.status,
      freeAnalysesUsed: data.free_analyses_used,
      freeAnalysesLimit: data.free_analyses_limit,
      canAnalyze,
      stripeCustomerId: data.stripe_customer_id,
      stripeSubscriptionId: data.stripe_subscription_id,
      currentPeriodEnd: data.current_period_end,
      cancelAtPeriodEnd: data.cancel_at_period_end,
    };
  }

  /**
   * Increments the analysis count atomically after successful audit.
   */
  static async recordAnalysisCompleted(userId: string): Promise<void> {
    const { error } = await supabaseAdmin.rpc('increment_free_analysis_usage', {
      target_user_id: userId,
    });

    if (error) {
      console.error('[SubscriptionService.recordAnalysisCompleted] Failed:', error.message);
    }
  }

  /**
   * Syncs active subscription after checkout session completes.
   */
  static async syncStripeCheckout(params: {
    userId: string;
    customerId: string;
    subscriptionId: string;
    priceId: string;
    currentPeriodEnd: Date;
  }): Promise<void> {
    await supabaseAdmin.from('user_subscriptions').upsert({
      user_id: params.userId,
      stripe_customer_id: params.customerId,
      stripe_subscription_id: params.subscriptionId,
      stripe_price_id: params.priceId,
      status: 'active',
      current_period_end: params.currentPeriodEnd.toISOString(),
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
  }

  /**
   * Updates state when subscription changes or cancels.
   */
  static async updateSubscriptionStatus(params: {
    subscriptionId: string;
    status: string;
    currentPeriodEnd: Date;
    cancelAtPeriodEnd: boolean;
  }): Promise<void> {
    await supabaseAdmin
      .from('user_subscriptions')
      .update({
        status: params.status,
        current_period_end: params.currentPeriodEnd.toISOString(),
        cancel_at_period_end: params.cancelAtPeriodEnd,
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', params.subscriptionId);
  }
}
```

---

### 5.3. Checkout Session Endpoint (`src/app/api/billing/checkout/route.ts`)

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/utils/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { priceId } = await req.json();
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Retrieve existing stripe customer ID if already generated
    const { data: subData } = await supabaseAdmin
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    let customerId = subData?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      customerId = customer.id;

      // Persist customer ID immediately
      await supabaseAdmin.from('user_subscriptions').upsert({
        user_id: user.id,
        stripe_customer_id: customerId,
        status: 'free',
      }, { onConflict: 'user_id' });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId || process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/app/contracts/new?upgrade=success`,
      cancel_url: `${appUrl}/pricing?canceled=true`,
      metadata: {
        userId: user.id,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### 5.4. Customer Billing Portal Endpoint (`src/app/api/billing/portal/route.ts`)

Allows paying users to manage their credit card, view past invoices, or cancel anytime:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';
import { supabaseAdmin } from '@/utils/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: sub } = await supabaseAdmin
      .from('user_subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!sub?.stripe_customer_id) {
      return NextResponse.json({ error: 'No active billing customer found' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: sub.stripe_customer_id,
      return_url: `${appUrl}/app/contracts/new`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Portal error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

---

### 5.5. Stripe Webhook Handler (`src/app/api/billing/webhook/route.ts`)

Processes asynchronous events sent by Stripe:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/client';
import { SubscriptionService } from '@/server/services/subscription.service';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing stripe webhook secret or signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription as string;
        const customerId = session.customer as string;

        if (userId && subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          await SubscriptionService.syncStripeCheckout({
            userId,
            customerId,
            subscriptionId,
            priceId: subscription.items.data[0]?.price.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          });
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await SubscriptionService.updateSubscriptionStatus({
          subscriptionId: sub.id,
          status: sub.status,
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        });
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await SubscriptionService.updateSubscriptionStatus({
          subscriptionId: sub.id,
          status: 'canceled',
          currentPeriodEnd: new Date(sub.current_period_end * 1000),
          cancelAtPeriodEnd: false,
        });
        break;
      }

      default:
        // Other events can be safely acknowledged
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook handler failed:', err);
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 });
  }
}
```

---

### 5.6. Analysis Route Gatekeeper (`src/app/api/contracts/[contractId]/analyze/route.ts`)

Integrate quota checks into the existing SSE analysis route:

```typescript
// Insert in POST handler right after user authentication:
const subInfo = await SubscriptionService.getUserSubscription(user.id);

if (!subInfo.canAnalyze) {
  return NextResponse.json(
    {
      success: false,
      code: "FREE_TIER_LIMIT_REACHED",
      error: "You have used your 1 free contract analysis. Upgrade to Pro for unlimited audits.",
      used: subInfo.freeAnalysesUsed,
      limit: subInfo.freeAnalysesLimit,
      upgradeUrl: "/pricing"
    },
    { status: 402 } // Payment Required
  );
}

// ... execute analysis ...

// Inside start(controller) upon result success:
if (subInfo.status === 'free') {
  await SubscriptionService.recordAnalysisCompleted(user.id);
}
```

---

## 6. Frontend Implementation

### 6.1. Paywall Modal State Store (`src/features/billing/store/usePaywallStore.ts`)

```typescript
import { create } from 'zustand';

interface PaywallState {
  isOpen: boolean;
  openPaywall: () => void;
  closePaywall: () => void;
}

export const usePaywallStore = create<PaywallState>((set) => ({
  isOpen: false,
  openPaywall: () => set({ isOpen: true }),
  closePaywall: () => set({ isOpen: false }),
}));
```

---

### 6.2. Interactive Paywall Modal Component (`src/features/billing/components/PaywallModal.tsx`)

```tsx
'use client';

import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { usePaywallStore } from '../store/usePaywallStore';

export const PaywallModal: React.FC = () => {
  const { isOpen, closePaywall } = usePaywallStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const priceId = billingCycle === 'annual'
        ? process.env.NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID
        : process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID;

      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Checkout failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0D1117] border border-[#1E2532] rounded-3xl p-6 sm:p-8 shadow-2xl text-white">
        {/* Close Button */}
        <button
          onClick={closePaywall}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-1.5 text-[#64748B] hover:text-white rounded-lg hover:bg-[#1E2532] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#583AFE]/10 border border-[#583AFE]/30 text-[#818CF8] text-[11px] font-semibold mb-4">
          <Sparkles size={13} />
          <span>Free Analysis Limit Reached</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-[#F1F5F9] mb-2">
          Unlock Unlimited Contract Audits
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          You have completed your 1 free contract audit. Upgrade to <strong className="text-white">Pro Counsel</strong> to analyze unlimited contracts, run autonomous web legal research, and unlock context-aware chat.
        </p>

        {/* Billing Switcher */}
        <div className="flex items-center justify-center gap-2 p-1 bg-[#161B22] border border-[#1E2532] rounded-xl mb-6">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
              billingCycle === 'monthly' ? 'bg-[#583AFE] text-white shadow-xs' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            Monthly ($49/mo)
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              billingCycle === 'annual' ? 'bg-[#583AFE] text-white shadow-xs' : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <span>Annual ($39/mo)</span>
            <span className="text-[10px] bg-[#10B981]/20 text-[#34D399] px-1.5 py-0.5 rounded-full font-semibold">Save 20%</span>
          </button>
        </div>

        {/* Feature List */}
        <div className="space-y-3 mb-8">
          {[
            'Unlimited document uploads & full LangGraph scanning',
            'Autonomous statutory web research (Tavily search integration)',
            'Interactive RAG Legal Assistant & clause negotiation redlines',
            'Coverage for US, UK, India, and EU contract precedent',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
              <Check size={15} className="text-[#10B981] shrink-0 mt-0.5" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* CTA Upgrade Button */}
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#583AFE] hover:bg-[#4d32e6] text-white text-sm font-semibold transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span>Redirecting to Stripe...</span>
          ) : (
            <>
              <Zap size={16} />
              <span>Upgrade to Pro Counsel</span>
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-[#64748B]">
          <ShieldCheck size={13} />
          <span>Secured with Stripe. Cancel anytime with 1 click.</span>
        </div>
      </div>
    </div>
  );
};
```

---

### 6.3. Upload Dropzone Guardrail (`src/features/contracts/components/UploadDropzone.tsx`)

In `UploadDropzone.tsx`, intercept the file selection before performing Supabase upload:

```typescript
// Add subscription checking:
const { openPaywall } = usePaywallStore();

const processFile = async (file: File) => {
  // Check subscription quota prior to uploading
  const statusRes = await fetch('/api/billing/status');
  const statusData = await statusRes.json();

  if (!statusData.canAnalyze) {
    openPaywall();
    return;
  }

  // Continue standard upload and analysis...
};
```

---

### 6.4. TopHeader Usage Counter & Upgrade Button (`src/components/layout/TopHeader.tsx`)

Add an upgrade button and usage indicator in the top navbar:

```tsx
{/* Free Tier Limit Indicator */}
{subscription?.status === 'free' ? (
  <button
    onClick={openPaywall}
    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-[#583AFE]/15 border border-[#583AFE]/40 text-[#A5B4FC] hover:bg-[#583AFE]/25 transition-all"
  >
    <Zap size={13} className="text-[#818CF8]" />
    <span>Free Audit: {subscription.freeAnalysesUsed}/1</span>
    <span className="font-semibold text-white ml-1">Upgrade</span>
  </button>
) : (
  <button
    onClick={handleOpenPortal}
    className="flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full bg-[#1E2532] text-[#94A3B8] hover:text-white"
  >
    <span>Pro Plan</span>
  </button>
)}
```

---

## 7. Environment Variables

Add these to `.env.local` and your Vercel/Production deployment settings:

```ini
# Stripe API Keys
STRIPE_SECRET_KEY=sk_test_51...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (from Stripe Dashboard Product Catalog)
NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID=price_1Qxxxxxxxxxxxxxx
NEXT_PUBLIC_STRIPE_PRO_ANNUAL_PRICE_ID=price_1Qyyyyyyyyyyyyyy

# Base App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 8. Testing & QA Verification Checklist

| Test Scenario | Steps to Execute | Expected Behavior |
| :--- | :--- | :--- |
| **New User First Audit** | Register new account -> Upload 1st agreement. | Upload succeeds, LangGraph executes, results render. Database sets `free_analyses_used = 1`. |
| **Second Audit Intercept** | Attempt to drag/upload a 2nd document while on Free plan. | Upload is blocked immediately. Paywall Modal pops up showing "Free Analysis Limit Reached". |
| **Direct API Abuse Test** | Execute `curl -X POST /api/contracts/<id>/analyze` using user session token. | Server returns HTTP 402 with structured `FREE_TIER_LIMIT_REACHED` payload. No LLM tokens consumed. |
| **Stripe Checkout Test** | Click "Upgrade to Pro" -> Use test card `4242 4242 4242 4242`. | Redirected back to app with `?upgrade=success`. Webhook fires `checkout.session.completed`. |
| **Paid User Audit** | Upload 2nd, 3rd, and 4th documents with active Pro subscription. | All contracts process smoothly with no paywall interruptions. |
| **Customer Portal Test** | Click "Pro Plan" in header -> Open Billing Portal -> Cancel subscription. | Webhook fires `customer.subscription.deleted`. User drops to canceled state and paywall reactivates. |
