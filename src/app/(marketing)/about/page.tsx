import React from "react";
import Link from "next/link";
import { Scale, Users, Cpu, ShieldCheck, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "About LegalGPT — Democratizing Legal Intelligence",
  description:
    "Learn about LegalGPT's mission: building autonomous multi-agent contract audit systems so founders, freelancers, and businesses never sign unfair terms.",
  path: "/about",
  keywords: [
    "about legalgpt",
    "legal tech mission",
    "AI legal engineering",
    "contract review intelligence",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Scale className="w-3.5 h-3.5 text-accent" />
              <span>Our Mission</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Leveling the Playing Field <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                in Legal Agreements.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Every day, thousands of founders, freelancers, and small businesses sign agreements containing unlimited liability, predatory IP assignments, and unworkable indemnities simply because legal fees are out of reach.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            <div className="rounded-2xl bg-surface/60 border border-edge p-8">
              <Cpu className="w-8 h-8 text-accent mb-4" />
              <h2 className="text-lg font-bold text-white mb-2">Deterministic Multi-Agent AI</h2>
              <p className="text-silver text-xs leading-relaxed">
                Rather than treating contracts as single generic prompts, LegalGPT routes your document through a 9-node LangGraph pipeline with autonomous statutory research and dedicated reviewer/advisor agents.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-8">
              <Users className="w-8 h-8 text-accent mb-4" />
              <h2 className="text-lg font-bold text-white mb-2">Built for the Underserved</h2>
              <p className="text-silver text-xs leading-relaxed">
                We empower freelancers and startup teams who cannot afford $800/hr law firm retainers for everyday NDAs, SaaS terms, and contractor agreements.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-8">
              <ShieldCheck className="w-8 h-8 text-accent mb-4" />
              <h2 className="text-lg font-bold text-white mb-2">Radical Privacy by Design</h2>
              <p className="text-silver text-xs leading-relaxed">
                We reject the industry trend of training models on customer files. Your contracts belong to you, processed in memory and never monetized.
              </p>
            </div>
          </div>

          {/* Editorial & AI Ethics */}
          <div className="rounded-2xl bg-surface/40 border border-edge p-10 mb-20 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Our Engineering &amp; Legal Principles</h2>
            <div className="space-y-4 text-silver text-sm leading-relaxed">
              <p>
                LegalGPT is engineered as an advanced issue-spotting and contract intelligence copilot. It synthesizes clauses against statutory precedents (such as the UCC in the US, the Indian Contract Act of 1872, and English common law principles) using real-time search verification.
              </p>
              <p>
                While LegalGPT provides rigorous risk ratings and suggested counter-proposals, it does not constitute an attorney-client relationship. It is designed to prepare you for negotiations or to make your time with legal counsel 10x more efficient.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Try LegalGPT Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
