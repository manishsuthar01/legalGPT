import React from "react";
import Link from "next/link";
import { Layers, ArrowRight, Sparkles, ShieldAlert } from "lucide-react";
import { clausesData } from "@/data/seo/clauses";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Clause Intelligence Library — Risk Analysis & Safer Alternatives",
  description:
    "Comprehensive guide to high-risk contract clauses. Discover standard language, red flags, and protective counter-clause wording for indemnity, liability, and termination.",
  path: "/clauses",
  keywords: [
    "contract clause library",
    "indemnification clause analysis",
    "limitation of liability clause",
    "contract clause alternatives",
    "legal clauses explained",
  ],
});

export default function ClausesHubPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Clause Library", href: "/clauses" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5 text-accent" />
              <span>Clause Intelligence Library</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Master the Clauses That <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Make or Break Deals.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Every catastrophic contract dispute traces back to a single poorly drafted sentence. Browse standard definitions, dangerous traps, and battle-tested substitute language.
            </p>
          </div>

          {/* Clause Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {clausesData.map((clause) => (
              <Link
                key={clause.slug}
                href={`/clauses/${clause.slug}`}
                className="group rounded-2xl bg-surface/60 border border-edge p-8 hover:border-accent/50 hover:bg-surface/90 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-accent bg-accent/15 px-2.5 py-1 rounded border border-accent/30 uppercase">
                      {clause.category}
                    </span>
                    <span
                      className={`text-xs font-mono uppercase px-2.5 py-1 rounded-full ${
                        clause.riskLevel === "high"
                          ? "bg-risk-high/15 border border-risk-high/30 text-risk-high"
                          : "bg-risk-medium/15 border border-risk-medium/30 text-risk-medium"
                      }`}
                    >
                      {clause.riskLevel} Risk
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                    <span>{clause.name}</span>
                  </h2>

                  <p className="text-silver text-sm leading-relaxed mb-6">
                    {clause.definition}
                  </p>

                  <div className="rounded-lg bg-[#0f0f13] border border-edge/60 p-4 mb-6">
                    <span className="text-xs font-mono text-[#888] block mb-1">
                      Top Red Flag:
                    </span>
                    <p className="text-xs text-silver flex items-start gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-risk-high shrink-0 mt-0.5" />
                      <span>{clause.redFlags[0]}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-accent text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  <span>View Full Clause Guide &amp; Safer Language</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-10 text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Unsure if a specific clause in your contract is risky?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6">
              LegalGPT instantly highlights aggressive phrasing and drafts safer alternative counter-language tailored to your side of the table.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Analyze Your Clause Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
