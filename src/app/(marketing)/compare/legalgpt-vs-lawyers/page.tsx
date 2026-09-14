import React from "react";
import Link from "next/link";
import {
  Scale,
  Clock,
  DollarSign,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/InternalLinking";

export const metadata = createMetadata({
  title: "LegalGPT vs Traditional Law Firms — Cost, Speed & Review Accuracy",
  description:
    "Compare LegalGPT AI contract analysis with hiring an outside corporate law firm. Analyze turnaround velocity, hourly billable costs ($800/hr vs $29/mo), and discover the hybrid AI-first legal workflow.",
  path: "/compare/legalgpt-vs-lawyers",
  keywords: [
    "LegalGPT vs law firms",
    "AI contract review vs attorney",
    "law firm hourly rates contract review",
    "cheaper alternative to corporate lawyer",
    "hybrid AI legal workflow",
  ],
});

export default function LegalGptVsLawyersPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Comparisons", href: "/compare" },
    { label: "LegalGPT vs Law Firms", href: "/compare/legalgpt-vs-lawyers" },
  ];

  const faqs = [
    {
      question: "Can LegalGPT replace my outside corporate law firm?",
      answer:
        "No. LegalGPT is designed to automate routine contract triage, preliminary redlining, and risk detection. For high-stakes M&A, patent filings, or active courtroom disputes, you should always consult licensed legal counsel.",
    },
    {
      question: "How much money can a startup save using LegalGPT before sending to a lawyer?",
      answer:
        "By catching 90% of obvious red flags (unilateral indemnity, perpetual terms, missing liability caps) and inserting balanced counter-proposals beforehand, founders cut 3–5 billable attorney hours per contract, saving $1,500–$4,000 per deal.",
    },
    {
      question: "Does LegalGPT carry legal malpractice insurance?",
      answer:
        "No. LegalGPT is an advanced software analysis platform, not a law firm. Law firms charge premium rates in part to carry substantial malpractice insurance policies.",
    },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 mb-6 text-xs font-mono">
              <Scale className="w-3.5 h-3.5" />
              <span>Direct Comparison • Cost &amp; Velocity</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              LegalGPT vs Traditional Law Firms: <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                The Honest Breakdown
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Paying a corporate law firm $800/hr to redline a 5-page NDA or vendor MSA is inefficient for modern startups. Here is a direct breakdown of costs, turnaround times, and how high-growth companies use a hybrid &ldquo;AI First, Attorney Final&rdquo; approach.
            </p>
          </div>

          {/* Key Metric Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Turnaround Velocity</h3>
              <div className="text-2xl font-bold text-white mb-2">30s vs 5 Days</div>
              <p className="text-silver text-xs leading-relaxed">
                LegalGPT returns a line-by-line risk report in under 30 seconds. Law firms typically require 3 to 7 business days to return initial redlines.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mb-4">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Cost Per Review</h3>
              <div className="text-2xl font-bold text-white mb-2">$0–$29 vs $2,500+</div>
              <p className="text-silver text-xs leading-relaxed">
                Law firm reviews average 2–4 billable hours ($1,200–$3,500). LegalGPT offers free interactive tools and unlimited workspace plans from $29/mo.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Ideal Workflow</h3>
              <div className="text-2xl font-bold text-white mb-2">Hybrid AI Triage</div>
              <p className="text-silver text-xs leading-relaxed">
                Use LegalGPT to catch 90% of routine clauses first. Send only complex, bespoke negotiation points to outside counsel.
              </p>
            </div>
          </div>

          {/* Side-by-Side Detailed Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {/* Column 1: Where Traditional Law Firms Win */}
            <div className="rounded-3xl bg-surface/40 border border-edge p-8">
              <div className="flex items-center gap-2.5 mb-4 text-amber-400">
                <Scale className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">When to Hire a Law Firm</h2>
              </div>
              <p className="text-silver text-xs leading-relaxed mb-6">
                Certain high-stakes legal situations strictly require human judgment, bespoke regulatory structuring, and professional liability coverage:
              </p>

              <div className="space-y-4 text-xs text-silver">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">High-Stakes M&amp;A &amp; Financings ($1M+)</strong>
                    Complex equity financings, venture debt, and company sales involve bespoke tax structuring that demands certified legal specialists.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Live Courtroom Litigation &amp; Disputes</strong>
                    If you are being sued or initiating a lawsuit, only licensed attorneys can represent your company in court.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Attorney-Client Privileged Communications</strong>
                    Discussions with your retained attorney are protected by legal evidentiary privilege in court proceedings.
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Where LegalGPT Wins */}
            <div className="rounded-3xl bg-surface/40 border border-accent/30 p-8">
              <div className="flex items-center gap-2.5 mb-4 text-accent">
                <Sparkles className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">When to Use LegalGPT</h2>
              </div>
              <p className="text-silver text-xs leading-relaxed mb-6">
                For routine, high-volume day-to-day contract analysis, LegalGPT outperforms traditional retainers on speed, accessibility, and cost:
              </p>

              <div className="space-y-4 text-xs text-silver">
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Instant Pre-Signature Risk Triage</strong>
                    Scan 40-page SaaS agreements, MSAs, and NDAs in 30 seconds before signing or forwarding to your team.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Redline Replacement Language Generation</strong>
                    Get attorney-approved counter-proposals for aggressive indemnity, liability caps, and termination clauses instantly.
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">Negotiation Leverage &amp; Talking Points</strong>
                    Understand the exact business impact of every clause with plain-English summaries so you can negotiate with confidence.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* The Hybrid Workflow */}
          <div className="rounded-3xl bg-gradient-to-r from-surface via-[#171228] to-surface border border-accent/40 p-10 mb-20">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Winning Formula: The &ldquo;AI-First, Attorney-Final&rdquo; Workflow
            </h2>
            <p className="text-silver text-sm max-w-3xl mb-8 leading-relaxed">
              Fast-moving startups don&apos;t abandon lawyers—they supercharge them. Here is how modern companies save up to 80% on legal expenses:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-silver">
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-accent font-mono font-bold text-sm block mb-2">Step 1: Automated Triage</span>
                <p className="leading-relaxed">
                  Run the counterparty&apos;s contract through LegalGPT. Instantly identify missing liability caps, unilateral terms, and unfavorable governing law.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-accent font-mono font-bold text-sm block mb-2">Step 2: First-Pass Redlines</span>
                <p className="leading-relaxed">
                  Apply LegalGPT&apos;s balanced replacement clauses directly to the draft. Resolve 80% of standard negotiation points on your own.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-black/40 border border-white/5">
                <span className="text-accent font-mono font-bold text-sm block mb-2">Step 3: Attorney Polish</span>
                <p className="leading-relaxed">
                  Send the cleaned draft to outside counsel for 15 minutes of strategic review rather than paying for 4 hours of basic clause typing.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-white font-semibold text-sm">
                Ready to cut hours of tedious contract review?
              </span>
              <Link
                href="/app/contracts/new"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
              >
                <span>Upload Contract to LegalGPT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* FAQs */}
          <section className="border-t border-edge pt-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-2xl bg-surface/40 border border-edge">
                  <h3 className="text-white text-sm font-semibold mb-2">{faq.question}</h3>
                  <p className="text-silver text-xs leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
