import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Layers,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Copy,
} from "lucide-react";
import {
  clausesData,
  getClauseBySlug,
  getAllClauseSlugs,
} from "@/data/seo/clauses";
import { getContractBySlug } from "@/data/seo/contracts";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";

interface PageProps {
  params: Promise<{ clauseSlug: string }>;
}

export async function generateStaticParams() {
  return getAllClauseSlugs().map((slug) => ({
    clauseSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { clauseSlug } = await params;
  const clause = getClauseBySlug(clauseSlug);

  if (!clause) {
    return createMetadata({
      title: "Clause Not Found",
      description: "The requested legal clause guide could not be found.",
      path: `/clauses/${clauseSlug}`,
      noindex: true,
    });
  }

  return createMetadata({
    title: `${clause.name}: Definition, Red Flags & Safer Replacement Language`,
    description: `${clause.name} breakdown: Learn what it means, why it matters, aggressive traps to watch for, and protective counter-clause wording.`,
    path: `/clauses/${clause.slug}`,
    keywords: [
      clause.name,
      `${clause.name} example`,
      `${clause.name} red flags`,
      `${clause.name} risk`,
      `${clause.name} alternative language`,
      "contract clause redlines",
    ],
  });
}

export default async function ClauseDetailPage({ params }: PageProps) {
  const { clauseSlug } = await params;
  const clause = getClauseBySlug(clauseSlug);

  if (!clause) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Clauses", href: "/clauses" },
    { label: clause.name, href: `/clauses/${clause.slug}` },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(clause.faqs)} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-silver mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/clauses" className="hover:text-white transition-colors">
              Clauses
            </Link>
            <span>/</span>
            <span className="text-white truncate">{clause.name}</span>
          </nav>

          {/* Hero Header */}
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-accent bg-accent/15 px-3 py-1 rounded-full border border-accent/30 uppercase">
                {clause.category}
              </span>
              <span
                className={`text-xs font-mono uppercase px-3 py-1 rounded-full ${
                  clause.riskLevel === "high"
                    ? "bg-risk-high/15 border border-risk-high/30 text-risk-high"
                    : "bg-risk-medium/15 border border-risk-medium/30 text-risk-medium"
                }`}
              >
                {clause.riskLevel} Risk Severity
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {clause.name}
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed mb-6">
              {clause.whyItMatters}
            </p>
          </div>

          {/* Definition Box */}
          <div className="rounded-2xl bg-surface/60 border border-edge p-8 mb-16">
            <h2 className="text-sm font-mono uppercase tracking-wider text-accent mb-3">
              Plain-English Definition
            </h2>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              {clause.definition}
            </p>
          </div>

          {/* Side-by-Side Clause Comparison */}
          <section className="mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Standard vs. Protective Language
              </h2>
              <p className="text-silver text-xs sm:text-sm">
                Compare typical counterparty-favored phrasing against our attorney-approved balanced alternative.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Typical / Aggressive Language */}
              <div className="rounded-2xl bg-surface/50 border border-risk-high/30 p-8 relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-risk-high flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Typical Aggressive Language</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#777]">Favor: Counterparty</span>
                  </div>
                  <div className="rounded-xl bg-[#0d0d10] border border-edge/60 p-5 font-mono text-xs text-[#bbb] leading-relaxed select-all mb-4">
                    {clause.standardLanguageExample}
                  </div>
                </div>
                <p className="text-xs text-silver italic">
                  ⚠ Often leaves you exposed to uncapped liabilities or third-party indemnities without defense control.
                </p>
              </div>

              {/* Protective / Safer Alternative */}
              <div className="rounded-2xl bg-gradient-to-b from-surface via-surface to-[#151222] border-2 border-accent p-8 relative flex flex-col justify-between shadow-[0_0_30px_rgba(124,92,252,0.15)]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono uppercase text-accent flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>LegalGPT Safer Substitute</span>
                    </span>
                    <span className="text-[10px] font-mono text-accent">Recommended</span>
                  </div>
                  <div className="rounded-xl bg-[#0a0a0f] border border-accent/30 p-5 font-mono text-xs text-white leading-relaxed select-all mb-4">
                    {clause.saferAlternative}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-silver">
                  <span className="flex items-center gap-1 text-accent">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Balanced mutual liability &amp; defense control</span>
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Red Flags To Watch For */}
          <section className="rounded-2xl bg-surface/50 border border-edge p-8 mb-20">
            <div className="flex items-center gap-2.5 mb-6 text-risk-high">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-xl font-bold text-white">
                Dangerous Red Flags in this Clause
              </h2>
            </div>
            <p className="text-silver text-xs sm:text-sm mb-6 max-w-2xl">
              If you spot any of these phrases or omissions in your contract, pause and propose counter-language immediately:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clause.redFlags.map((flag) => (
                <div
                  key={flag}
                  className="rounded-xl bg-[#0f0f13] border border-edge/60 p-4 flex items-start gap-3"
                >
                  <span className="w-2 h-2 rounded-full bg-risk-high shrink-0 mt-1.5" />
                  <span className="text-silver text-xs leading-relaxed">{flag}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Mid-page CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-8 sm:p-10 mb-20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-2">
                Need to redline a {clause.name} right now?
              </h2>
              <p className="text-silver text-xs sm:text-sm max-w-xl">
                Upload your contract to LegalGPT. Our autonomous multi-agent pipeline spots aggressive variations of this clause and drafts custom substitute language.
              </p>
            </div>
            <Link
              href="/app/contracts/mock-id"
              className="shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Scan Contract Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQs */}
          <section className="mb-20">
            <div className="flex items-center gap-2 mb-6">
              <HelpCircle className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {clause.faqs.map((faq) => (
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
          </section>

          {/* Affected Contracts & Sibling Clauses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-edge pt-12">
            {/* Affected Contracts */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Contracts That Include This Clause
              </h3>
              <div className="flex flex-wrap gap-2">
                {clause.relatedContractSlugs.map((slug) => {
                  const contract = getContractBySlug(slug);
                  if (!contract) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/contracts/${slug}`}
                      className="px-3 py-1.5 rounded-lg bg-surface border border-edge hover:border-accent text-silver hover:text-white text-xs transition-colors"
                    >
                      {contract.title}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Sibling Clauses */}
            <div>
              <h3 className="text-base font-bold text-white mb-4">
                Related Clauses to Review
              </h3>
              <div className="flex flex-wrap gap-2">
                {clause.relatedClauseSlugs.map((slug) => {
                  const sibling = getClauseBySlug(slug);
                  if (!sibling) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/clauses/${slug}`}
                      className="px-3 py-1.5 rounded-lg bg-surface border border-edge hover:border-accent text-silver hover:text-white text-xs transition-colors"
                    >
                      {sibling.name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
