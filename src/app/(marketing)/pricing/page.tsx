import React from "react";
import Link from "next/link";
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Pricing & Plans — Transparent Legal AI for Everyone",
  description:
    "Predictable, transparent pricing for LegalGPT. Free contract audits for individuals and freelancers, with pro and enterprise tiers for fast-moving teams.",
  path: "/pricing",
  keywords: [
    "AI contract review pricing",
    "legal AI cost",
    "free contract scanner",
    "contract analysis pricing",
    "AI lawyer cost",
  ],
});

const pricingFaqs = [
  {
    question: "Are my uploaded contracts stored or used to train AI models?",
    answer:
      "No. LegalGPT uses strict zero-data retention architecture. Your documents are processed in memory during the audit and never used for model training or permanent storage.",
  },
  {
    question: "Can I use the Free plan for commercial agreements?",
    answer:
      "Yes! You can run risk audits on NDAs, freelance contracts, and standard terms without entering a credit card.",
  },
  {
    question: "What jurisdictions does LegalGPT support?",
    answer:
      "LegalGPT supports statutory compliance and market precedent checks across the United States, India, United Kingdom, and European Union (GDPR).",
  },
];

export default function PricingPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Pricing", href: "/pricing" },
        ])}
      />
      <JsonLd schema={getFaqSchema(pricingFaqs)} />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Simple, Transparent Tiers</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Invest in Protection. <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Avoid Catastrophic Liabilities.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Traditional legal reviews cost $500–$1,000 per hour. LegalGPT gives you instant, multi-agent contract audits and redlines for a fraction of the cost.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {/* Tier 1: Free */}
            <div className="rounded-2xl bg-surface/60 border border-edge p-8 flex flex-col justify-between hover:border-edge/80 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Starter Free</h2>
                  <span className="text-[11px] font-mono uppercase text-silver bg-[#1c1c1f] px-2.5 py-1 rounded-full border border-edge">
                    Individuals
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$0</span>
                  <span className="text-silver text-sm">/ month</span>
                </div>
                <p className="text-silver text-xs leading-relaxed mb-6">
                  Instant contract risk scanning for solo freelancers and founders reviewing standard agreements.
                </p>
                <ul className="space-y-3 mb-8 text-xs text-silver">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>3 Contract Audits / month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>Executive Risk Score &amp; High-Risk Flags</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>PDF &amp; Raw Text Ingestion</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>Zero Data Retention</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/contracts/mock-id"
                className="w-full text-center py-3 rounded-xl border border-edge bg-[#151518] hover:bg-[#1a1a1f] text-white text-xs font-semibold transition-colors"
              >
                Scan Free Now
              </Link>
            </div>

            {/* Tier 2: Pro (Featured) */}
            <div className="rounded-2xl bg-gradient-to-b from-surface via-surface to-[#161224] border-2 border-accent p-8 flex flex-col justify-between relative shadow-[0_0_40px_rgba(124,92,252,0.2)]">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[11px] font-bold px-3.5 py-0.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Pro Founder</h2>
                  <Zap className="w-4 h-4 text-accent" />
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">$49</span>
                  <span className="text-silver text-sm">/ month</span>
                </div>
                <p className="text-silver text-xs leading-relaxed mb-6">
                  Deep multi-agent legal research, redlining alternatives, and interactive RAG chat for startups and agencies.
                </p>
                <ul className="space-y-3 mb-8 text-xs text-white">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Unlimited Contract Audits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Autonomous Web Legal Research (Tavily)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Substitute Clause Redlining Language</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>Interactive RAG Contract Copilot</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0" />
                    <span>US, UK, &amp; India Jurisdiction Engines</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/contracts/mock-id"
                className="w-full text-center py-3 rounded-xl bg-accent hover:bg-accent/90 text-white text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.4)]"
              >
                Start 14-Day Trial
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="rounded-2xl bg-surface/60 border border-edge p-8 flex flex-col justify-between hover:border-edge/80 transition-all">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Enterprise</h2>
                  <ShieldCheck className="w-4 h-4 text-silver" />
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold text-white">Custom</span>
                </div>
                <p className="text-silver text-xs leading-relaxed mb-6">
                  Custom legal guidelines, API integrations, private VPC deployment, and team collaboration.
                </p>
                <ul className="space-y-3 mb-8 text-xs text-silver">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>Custom Playbook &amp; Risk Weights</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>Dedicated Private VPC Deployment</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>REST API &amp; Webhook Integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-risk-low shrink-0" />
                    <span>SSO / SAML &amp; Audit Logging</span>
                  </li>
                </ul>
              </div>
              <a
                href="mailto:contact@legalgpt.ai"
                className="w-full text-center py-3 rounded-xl border border-edge bg-[#151518] hover:bg-[#1a1a1f] text-white text-xs font-semibold transition-colors"
              >
                Contact Enterprise
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {pricingFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-xl bg-surface/40 border border-edge p-6"
                >
                  <h3 className="text-white text-base font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-silver text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="mt-20 p-10 rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge text-center">
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to verify your next contract?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6">
              Upload your agreement and receive a full clause-by-clause risk score in under 60 seconds.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Audit Document Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
