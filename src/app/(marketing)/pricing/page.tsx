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
      <JsonLd schema={getFaqSchema(pricingFaqs)} />      <div className="py-16 md:py-24 relative z-10 bg-white">
        <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5565] mb-6 text-[11px] font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#583AFE]" />
              <span>Transparent Pricing Tiers</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-normal tracking-[-0.03em] text-[#0A0D14] mb-4">
              Invest in Protection. <br />
              <span className="text-[#583AFE]">
                Eliminate Hidden Liability.
              </span>
            </h1>
            <p className="text-[#4B5565] text-sm sm:text-base leading-relaxed">
              Traditional legal reviews cost $500–$1,000 per hour. LegalGPT gives you instant, multi-agent contract audits and redlines for a fraction of the cost.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
            {/* Tier 1: Free */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-7 sm:p-8 flex flex-col justify-between hover:border-[#D1D5DB] hover:bg-white hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#0A0D14]">Starter Audit</h2>
                  <span className="text-[10px] font-mono uppercase text-[#6B7280] bg-white px-2.5 py-1 rounded-full border border-[#E5E7EB] font-medium">
                    Solo &amp; Freelance
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold font-mono text-[#0A0D14]">$0</span>
                  <span className="text-[#6B7280] text-xs">/ month</span>
                </div>
                <p className="text-[#4B5565] text-xs sm:text-sm leading-relaxed mb-6">
                  Instant contract risk scanning for solo practitioners and founders reviewing standard agreements.
                </p>
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#4B5565]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>3 Contract Audits / month</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Executive Risk Score &amp; High-Risk Flags</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>PDF &amp; Raw Text Ingestion</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Zero Corporate Data Retention</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/contracts/new"
                className="w-full text-center py-3 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#0A0D14] text-xs font-semibold transition-all shadow-2xs"
              >
                Scan Free Now
              </Link>
            </div>

            {/* Tier 2: Pro (Featured) */}
            <div className="rounded-2xl bg-white border-2 border-[#583AFE] p-7 sm:p-8 flex flex-col justify-between relative shadow-lg">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#583AFE] text-white text-[10px] font-bold px-3.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Recommended
              </div>
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#0A0D14]">Pro Counsel</h2>
                  <Zap className="w-4 h-4 text-[#583AFE]" />
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold font-mono text-[#0A0D14]">$49</span>
                  <span className="text-[#6B7280] text-xs">/ month</span>
                </div>
                <p className="text-[#4B5565] text-xs sm:text-sm leading-relaxed mb-6">
                  Deep multi-agent legal research, redlining alternatives, and interactive RAG chat for startups and counsel.
                </p>
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#1F2937]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#583AFE] shrink-0" />
                    <span>Unlimited Contract Audits</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#583AFE] shrink-0" />
                    <span>Autonomous Web Legal Research (Tavily)</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#583AFE] shrink-0" />
                    <span>Substitute Clause Redlining Language</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#583AFE] shrink-0" />
                    <span>Interactive RAG Contract Copilot</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#583AFE] shrink-0" />
                    <span>US, UK, &amp; India Jurisdiction Engines</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/app/contracts/new"
                className="w-full text-center py-3 rounded-full bg-[#583AFE] hover:bg-[#4d32e6] text-white text-xs font-semibold transition-all shadow-md active:scale-95"
              >
                Start 14-Day Trial
              </Link>
            </div>

            {/* Tier 3: Enterprise */}
            <div className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-7 sm:p-8 flex flex-col justify-between hover:border-[#D1D5DB] hover:bg-white hover:shadow-xs transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-semibold text-[#0A0D14]">Enterprise</h2>
                  <ShieldCheck className="w-4 h-4 text-[#6B7280]" />
                </div>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold font-mono text-[#0A0D14]">Custom</span>
                </div>
                <p className="text-[#4B5565] text-xs sm:text-sm leading-relaxed mb-6">
                  Custom legal guidelines, API integrations, private VPC deployment, and team collaboration.
                </p>
                <ul className="space-y-3 mb-8 text-xs sm:text-sm text-[#4B5565]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Custom Playbook &amp; Risk Weights</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>Dedicated Private VPC Deployment</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>REST API &amp; Webhook Integration</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#16A34A] shrink-0" />
                    <span>SSO / SAML &amp; Audit Logging</span>
                  </li>
                </ul>
              </div>
              <a
                href="mailto:contact@legalgpt.ai"
                className="w-full text-center py-3 rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F9FAFB] text-[#0A0D14] text-xs font-semibold transition-all shadow-2xs"
              >
                Contact Enterprise
              </a>
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A0D14] text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3.5">
              {pricingFaqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] p-6 hover:border-[#D1D5DB] transition-all"
                >
                  <h3 className="text-[#0A0D14] text-base font-semibold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#4B5565] text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="rounded-[28px] sm:rounded-[36px] bg-[#0A0D14] p-10 sm:p-14 text-center text-white shadow-xl">
            <h2 className="text-3xl sm:text-4xl font-normal text-white mb-3 tracking-tight">
              Ready to verify your next contract?
            </h2>
            <p className="text-[#9DA8B9] text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Upload your agreement and receive a full clause-by-clause risk score in under 60 seconds.
            </p>
            <Link
              href="/app/contracts/new"
              className="inline-flex items-center gap-2 bg-[#583AFE] hover:bg-[#4d32e6] text-white px-8 py-3.5 rounded-full text-xs font-semibold transition-all shadow-md active:scale-95"
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
