import React from "react";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { glossaryData } from "@/data/seo/glossary";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";
import { GlossarySearchFilter } from "./GlossarySearchFilter";

export const metadata = createMetadata({
  title: "Legal Tech & Contract Glossary — Plain-English Definitions",
  description:
    "Demystify complex legal jargon. Explore plain-English definitions and contract examples for indemnification, liability, arbitration, force majeure, and more.",
  path: "/glossary",
  keywords: [
    "legal glossary",
    "contract terminology",
    "plain English legal terms",
    "indemnification definition",
    "legal jargon explained",
  ],
});

export default function GlossaryHubPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Legal Glossary", href: "/glossary" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <BookOpen className="w-3.5 h-3.5 text-accent" />
              <span>Plain-English Legal Glossary</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Legal Jargon, <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Decoded for Humans.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Lawyers write in dense, archaic terminology that obscures risk. Browse our interactive glossary to understand what these words actually mean in practical business deals.
            </p>
          </div>

          {/* Interactive Search & Alphabet Filter */}
          <GlossarySearchFilter terms={glossaryData} />

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-10 text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Confused by terminology inside an active contract?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6">
              Upload the document into LegalGPT. Our interactive RAG assistant explains clauses in plain English and cites governing statutes on demand.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Ask LegalGPT AI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
