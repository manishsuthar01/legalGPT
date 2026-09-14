import React from "react";
import Link from "next/link";
import {
  Globe,
  Scale,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Landmark,
  CheckCircle2,
  FileCheck,
  Zap,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/InternalLinking";
import { jurisdictionsData } from "@/data/seo/jurisdictions";

export const metadata = createMetadata({
  title: "Jurisdiction-Specific Contract Law Guides & Compliance Hub — LegalGPT",
  description:
    "Master local contract enforceability, statutory bans, mandatory stamping, and red flags across India, Delaware (US), California, the UK, and European Union.",
  path: "/jurisdictions",
  keywords: [
    "contract law by country",
    "India contract act compliance",
    "Delaware corporate law contracts",
    "California Section 16600 non compete",
    "UK contract law UCTA reasonableness",
    "EU GDPR commercial contract compliance",
    "cross border contract review",
  ],
});

export default function JurisdictionsHubPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Jurisdictions", href: "/jurisdictions" },
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
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>Global Contract Intelligence</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Contract Law &amp; Enforceability Across{" "}
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Key Global Jurisdictions.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Commercial contracts are not borderless. What constitutes market-standard boilerplate in Delaware may be strictly void against public policy in California or rendered inadmissible in court without state stamp duty in India. Explore local statutory standards before signing.
            </p>
          </div>

          {/* Jurisdictions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {jurisdictionsData.map((jurisdiction) => (
              <div
                key={jurisdiction.slug}
                className="rounded-3xl bg-surface/60 border border-edge hover:border-accent/40 p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-[0_0_30px_rgba(124,92,252,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" role="img" aria-label={jurisdiction.name}>
                        {jurisdiction.flag}
                      </span>
                      <div>
                        <h2 className="text-xl font-bold text-white group-hover:text-accent transition-colors">
                          {jurisdiction.name}
                        </h2>
                        <span className="text-[11px] font-mono text-silver">
                          {jurisdiction.countryCode} &bull; {jurisdiction.legalSystem}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-silver text-xs sm:text-sm leading-relaxed mb-6">
                    {jurisdiction.shortDescription}
                  </p>

                  {/* Governing Statutes Pill List */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase text-silver tracking-wider block mb-2.5">
                      Key Statutes &amp; Precedents
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {jurisdiction.keyStatutes.map((statute) => (
                        <span
                          key={statute.code}
                          className="text-[10px] font-mono px-2 py-1 rounded-md bg-white/5 border border-white/10 text-silver"
                        >
                          {statute.code}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Mandatory Execution Preview */}
                  <div className="mb-6 pt-4 border-t border-edge/60">
                    <span className="text-[11px] font-mono uppercase text-silver tracking-wider block mb-2">
                      Mandatory Execution Formalities
                    </span>
                    <ul className="space-y-1.5 text-xs text-silver">
                      {jurisdiction.mandatoryRequirements.slice(0, 2).map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/jurisdictions/${jurisdiction.slug}`}
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-surface hover:bg-accent border border-edge hover:border-accent text-white text-xs font-semibold transition-all group/btn mt-2"
                >
                  <span>Explore {jurisdiction.name} Guide</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {/* Educational / Why Jurisdiction Matters Section */}
          <div className="rounded-3xl bg-surface/40 border border-edge p-8 md:p-12 mb-20">
            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-wider mb-2">
                <Landmark className="w-4 h-4" />
                <span>Multi-Jurisdiction Risk Factors</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Why Governing Law &amp; Jurisdiction Make or Break Contracts
              </h2>
              <p className="text-silver text-sm leading-relaxed">
                A clause that is legally ironclad in New York may trigger statutory fines in San Francisco, prove completely void in Bengaluru, or fail judicial reasonableness in London. Here is why legal AI must be jurisdiction-aware.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface/60 border border-edge">
                <div className="w-10 h-10 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center justify-center text-red-400 mb-4">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  Non-Waivable Public Policy
                </h3>
                <p className="text-silver text-xs leading-relaxed">
                  Clauses like California Section 16600 and Indian Contract Act Section 27 void employee non-compete covenants unconditionally. Including them not only fails in court, but can expose employers to unfair competition and statutory damage claims.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface/60 border border-edge">
                <div className="w-10 h-10 rounded-xl bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  Stamp Duty &amp; Admissibility
                </h3>
                <p className="text-silver text-xs leading-relaxed">
                  In jurisdictions like India, unstamped commercial agreements cannot be admitted into evidence or enforced in arbitration under Section 35 of the Indian Stamp Act until punitive deficit fees (up to 10x) are cleared.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface/60 border border-edge">
                <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-white font-bold text-base mb-2">
                  Statutory Reasonableness
                </h3>
                <p className="text-silver text-xs leading-relaxed">
                  Under the UK Unfair Contract Terms Act 1977 (UCTA), standard liability caps and negligence waivers are subjected to strict judicial reasonableness tests. Unbalanced caps will be struck down entirely, leaving vendors with uncapped liability.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive CTA Banner */}
          <div className="rounded-3xl bg-gradient-to-r from-accent/20 via-surface/60 to-surface/40 border border-accent/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-accent tracking-widest block mb-2">
                Jurisdiction-Aware AI Review
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Review Your Contract Against Specific Country Statutes
              </h3>
              <p className="text-silver text-sm leading-relaxed">
                LegalGPT automatically tailors statutory validation, red flag scoring, and counter-clause generation based on whether your contract is governed by Indian law, Delaware corporate law, California statutes, UK law, or the EU.
              </p>
            </div>

            <Link
              href="/app/contracts/new"
              className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-[0_0_25px_rgba(124,92,252,0.3)] hover:shadow-[0_0_35px_rgba(124,92,252,0.5)] shrink-0 flex items-center gap-2"
            >
              <span>Upload Contract for Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
