import React from "react";
import Link from "next/link";
import { FileText, ArrowRight, ShieldAlert, Sparkles } from "lucide-react";
import { contractsData } from "@/data/seo/contracts";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Contract Risk Guides & Negotiation Intelligence — LegalGPT",
  description:
    "Explore in-depth contract analysis guides. Discover hidden risks, aggressive clauses, and negotiation strategies for NDAs, SaaS agreements, employment contracts, and more.",
  path: "/contracts",
  keywords: [
    "contract guides",
    "NDA review guide",
    "SaaS agreement review",
    "employment contract risks",
    "contract negotiation tips",
  ],
});

export default function ContractsHubPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Contracts Hub", href: "/contracts" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Contract Knowledge Hub</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Never Sign a Contract <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                You Don&apos;t Understand.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Explore our comprehensive legal teardowns for the most common commercial agreements. Spot predatory clauses before they become financial liabilities.
            </p>
          </div>

          {/* Contracts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {contractsData.map((contract) => (
              <Link
                key={contract.slug}
                href={`/contracts/${contract.slug}`}
                className="group rounded-2xl bg-surface/60 border border-edge p-8 hover:border-accent/50 hover:bg-surface/90 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent" />
                    </div>
                    <span className="text-xs font-mono text-[#777] uppercase">
                      {contract.targetAudience[0]}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors flex items-center gap-2">
                    <span>{contract.title}</span>
                  </h2>

                  <p className="text-silver text-sm leading-relaxed mb-6">
                    {contract.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {contract.commonRisks.slice(0, 2).map((risk) => (
                      <span
                        key={risk.title}
                        className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-md bg-[#181418] border border-risk-high/30 text-risk-high"
                      >
                        <ShieldAlert className="w-3 h-3" />
                        <span>{risk.title}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-accent text-xs font-semibold group-hover:translate-x-1 transition-transform">
                  <span>Read Full Contract Breakdown</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-10 text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Have a contract right now that needs review?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6">
              Drop your PDF into LegalGPT and receive an autonomous 9-node risk report in seconds.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Scan Contract for Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
