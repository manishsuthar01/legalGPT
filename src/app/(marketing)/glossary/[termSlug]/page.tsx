import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BookOpen, ArrowRight, Quote, Sparkles } from "lucide-react";
import {
  glossaryData,
  getGlossaryTermBySlug,
  getAllGlossarySlugs,
} from "@/data/seo/glossary";
import { getClauseBySlug } from "@/data/seo/clauses";
import { getContractBySlug } from "@/data/seo/contracts";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/InternalLinking";

interface PageProps {
  params: Promise<{ termSlug: string }>;
}

export async function generateStaticParams() {
  return getAllGlossarySlugs().map((slug) => ({
    termSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { termSlug } = await params;
  const term = getGlossaryTermBySlug(termSlug);

  if (!term) {
    return createMetadata({
      title: "Term Not Found",
      description: "The requested legal term definition could not be found.",
      path: `/glossary/${termSlug}`,
      noindex: true,
    });
  }

  return createMetadata({
    title: `What is ${term.term}? Definition, Plain English Meaning & Contract Examples`,
    description: `Learn the practical business meaning of ${term.term}: ${term.simpleExplanation}. See real contract examples and associated risk clauses.`,
    path: `/glossary/${term.slug}`,
    keywords: [
      `what is ${term.term}`,
      `${term.term} meaning in contract`,
      `${term.term} definition`,
      `${term.term} legal explanation`,
      "contract terminology",
    ],
  });
}

export default async function GlossaryDetailPage({ params }: PageProps) {
  const { termSlug } = await params;
  const term = getGlossaryTermBySlug(termSlug);

  if (!term) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Glossary", href: "/glossary" },
    { label: term.term, href: `/glossary/${term.slug}` },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent mb-6 text-xs font-mono">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Legal Concept Explained</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              {term.term}
            </h1>
            <p className="text-accent text-base sm:text-xl font-medium mb-6 leading-relaxed">
              &ldquo;{term.simpleExplanation}&rdquo;
            </p>
          </div>

          {/* Formal Legal Definition */}
          <div className="rounded-2xl bg-surface/60 border border-edge p-8 mb-12 max-w-3xl">
            <h2 className="text-xs font-mono uppercase tracking-wider text-[#888] mb-3">
              Formal Legal Definition
            </h2>
            <p className="text-silver text-sm sm:text-base leading-relaxed">
              {term.definition}
            </p>
          </div>

          {/* Contract Example */}
          <div className="rounded-2xl bg-surface/40 border border-edge p-8 mb-16 max-w-3xl">
            <div className="flex items-center gap-2 text-accent mb-4">
              <Quote className="w-5 h-5" />
              <h2 className="text-sm font-mono uppercase tracking-wider text-white">
                How It Appears in Actual Contracts
              </h2>
            </div>
            <div className="rounded-xl bg-[#0b0b0e] border border-edge/60 p-5 font-mono text-xs text-[#ccc] leading-relaxed select-all">
              {term.exampleInContract}
            </div>
          </div>

          {/* Cross-linking to Clauses & Contracts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-3xl">
            {/* Related Clauses */}
            {term.relatedClauseSlugs.length > 0 && (
              <div className="rounded-xl bg-surface/50 border border-edge p-6">
                <h3 className="text-sm font-bold text-white mb-3">
                  Deep-Dive Clause Guides
                </h3>
                <div className="space-y-2">
                  {term.relatedClauseSlugs.map((slug) => {
                    const clause = getClauseBySlug(slug);
                    if (!clause) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/clauses/${slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#0e0e11] hover:bg-[#131317] border border-edge/40 text-silver hover:text-white text-xs transition-colors"
                      >
                        <span>{clause.name}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Related Contracts */}
            {term.relatedContractSlugs.length > 0 && (
              <div className="rounded-xl bg-surface/50 border border-edge p-6">
                <h3 className="text-sm font-bold text-white mb-3">
                  Contracts Using This Concept
                </h3>
                <div className="space-y-2">
                  {term.relatedContractSlugs.map((slug) => {
                    const contract = getContractBySlug(slug);
                    if (!contract) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/contracts/${slug}`}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-[#0e0e11] hover:bg-[#131317] border border-edge/40 text-silver hover:text-white text-xs transition-colors"
                      >
                        <span>{contract.title}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-accent" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-8 max-w-3xl text-center">
            <Sparkles className="w-6 h-6 text-accent mx-auto mb-3" />
            <h2 className="text-xl font-bold text-white mb-2">
              Reviewing an agreement with complex terms?
            </h2>
            <p className="text-silver text-xs mb-6">
              LegalGPT translates every clause into simple English and alerts you to unfair liabilities instantly.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Scan Contract Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
