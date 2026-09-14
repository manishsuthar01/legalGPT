import React from "react";
import Link from "next/link";
import { Scale, BrainCircuit, ArrowRight, ShieldCheck, Zap, DollarSign, Check, X } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/InternalLinking";

export const metadata = createMetadata({
  title: "LegalGPT vs Alternatives — AI Contract Review Comparison Hub",
  description:
    "Compare LegalGPT against traditional law firm retainers and general LLMs like ChatGPT and Claude. Discover how multi-agent legal RAG saves time and budget without compromising accuracy.",
  path: "/compare",
  keywords: [
    "LegalGPT vs lawyers",
    "LegalGPT vs ChatGPT",
    "AI contract review comparison",
    "contract analysis tools comparison",
    "best legal AI software",
  ],
});

export default function CompareHubPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Comparisons", href: "/compare" },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Scale className="w-3.5 h-3.5 text-accent" />
              <span>Honest Product Comparisons</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              How LegalGPT Compares to <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Law Firms &amp; Generic AI.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Founders and legal teams need to know where specialized legal AI fits into their operations. Explore our honest side-by-side breakdowns to see when to use LegalGPT, when to use ChatGPT, and when to hire an attorney.
            </p>
          </div>

          {/* Feature Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Card 1: vs Traditional Lawyers */}
            <div className="rounded-3xl bg-surface/60 border border-edge hover:border-accent/40 p-8 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center mb-6">
                  <Scale className="w-6 h-6 text-amber-400" />
                </div>
                <span className="text-xs font-mono uppercase text-silver tracking-wider">
                  Cost &amp; Velocity Comparison
                </span>
                <h2 className="text-2xl font-bold text-white mt-1 mb-3 group-hover:text-accent transition-colors">
                  LegalGPT vs Traditional Law Firms
                </h2>
                <p className="text-silver text-sm leading-relaxed mb-6">
                  Law firms bill $500–$1,200/hr and take 3–7 business days to redline routine contracts. Discover how LegalGPT provides 90% of routine contract triage in 30 seconds for a fraction of the cost, reserving expensive attorney hours for high-stakes M&amp;A.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-silver font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Instant 30-second turnaround vs 3–7 business days</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Predictable monthly plans vs $800/hr open-ended bills</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Automated preliminary triage before legal counsel sign-off</span>
                  </div>
                </div>
              </div>

              <Link
                href="/compare/legalgpt-vs-lawyers"
                className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-surface hover:bg-accent border border-edge hover:border-accent text-white text-xs font-semibold transition-all group/btn"
              >
                <span>Read Full Law Firm Comparison</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Card 2: vs General LLMs */}
            <div className="rounded-3xl bg-surface/60 border border-edge hover:border-accent/40 p-8 flex flex-col justify-between transition-all group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-6">
                  <BrainCircuit className="w-6 h-6 text-accent" />
                </div>
                <span className="text-xs font-mono uppercase text-silver tracking-wider">
                  Accuracy &amp; RAG Architecture
                </span>
                <h2 className="text-2xl font-bold text-white mt-1 mb-3 group-hover:text-accent transition-colors">
                  LegalGPT vs General LLMs (ChatGPT / Claude)
                </h2>
                <p className="text-silver text-sm leading-relaxed mb-6">
                  Raw conversational LLMs frequently hallucinate statutory citations, miss cross-clause dependencies in 40-page agreements, and train on user prompts. Learn why our 9-node LangGraph multi-agent pipeline delivers enterprise legal grounding.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-silver font-mono">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Verified live web statutory research &amp; citations</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Zero-data retention (your contracts are never used for training)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Two-tier Legal Reviewer + Legal Advisor multi-agent graph</span>
                  </div>
                </div>
              </div>

              <Link
                href="/compare/legalgpt-vs-chatgpt"
                className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-surface hover:bg-accent border border-edge hover:border-accent text-white text-xs font-semibold transition-all group/btn"
              >
                <span>Read Full ChatGPT Comparison</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Quick Matrix Table */}
          <div className="rounded-3xl bg-surface/40 border border-edge p-8 md:p-10 mb-20 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-2">
              Feature &amp; Capability Matrix
            </h2>
            <p className="text-silver text-xs mb-8">
              At-a-glance comparison across traditional counsel, generic chatbots, and LegalGPT.
            </p>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-edge text-silver font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Capability</th>
                  <th className="py-3 px-4">Traditional Law Firm</th>
                  <th className="py-3 px-4">ChatGPT / Claude (Raw)</th>
                  <th className="py-3 px-4 text-accent font-bold">LegalGPT Specialized AI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge/40 text-silver">
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Turnaround Speed</td>
                  <td className="py-3.5 px-4">3–7 business days</td>
                  <td className="py-3.5 px-4">15–30 seconds</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Under 30 seconds</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Average Cost</td>
                  <td className="py-3.5 px-4">$500–$1,200 / hour</td>
                  <td className="py-3.5 px-4">$20 / month</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">$29/mo or Free Scanner</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Full Contract PDF Chunking</td>
                  <td className="py-3.5 px-4 text-emerald-400">Manual review</td>
                  <td className="py-3.5 px-4 text-red-400">Limited / context truncation</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Automated clause vectorization</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Verified Legal Web Research</td>
                  <td className="py-3.5 px-4 text-emerald-400">LexisNexis / Westlaw</td>
                  <td className="py-3.5 px-4 text-red-400">Prone to hallucinations</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Integrated Tavily web verification</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Zero-Data Training Guarantee</td>
                  <td className="py-3.5 px-4 text-emerald-400">Attorney-client privilege</td>
                  <td className="py-3.5 px-4 text-red-400">Varies (opt-out required)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Guaranteed zero-training policy</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Attorney Liability Insurance</td>
                  <td className="py-3.5 px-4 text-emerald-400">Full malpractice insurance</td>
                  <td className="py-3.5 px-4 text-red-400">None (disclaimed)</td>
                  <td className="py-3.5 px-4 text-silver">Software triage (attorney backup)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
