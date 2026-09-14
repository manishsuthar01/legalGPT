import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Shield,
  Layers,
} from "lucide-react";
import {
  contractsData,
  getContractBySlug,
  getAllContractSlugs,
} from "@/data/seo/contracts";
import { getClauseBySlug } from "@/data/seo/clauses";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";

interface PageProps {
  params: Promise<{ contractSlug: string }>;
}

export async function generateStaticParams() {
  return getAllContractSlugs().map((slug) => ({
    contractSlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { contractSlug } = await params;
  const contract = getContractBySlug(contractSlug);

  if (!contract) {
    return createMetadata({
      title: "Contract Not Found",
      description: "The requested contract guide could not be found.",
      path: `/contracts/${contractSlug}`,
      noindex: true,
    });
  }

  return createMetadata({
    title: `${contract.title}: Risks, Key Clauses & Negotiation Guide`,
    description: contract.shortDescription,
    path: `/contracts/${contract.slug}`,
    keywords: [
      contract.title,
      `${contract.title} risks`,
      `${contract.title} review`,
      `${contract.title} red flags`,
      "contract negotiation AI",
    ],
  });
}

export default async function ContractDetailPage({ params }: PageProps) {
  const { contractSlug } = await params;
  const contract = getContractBySlug(contractSlug);

  if (!contract) {
    notFound();
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contracts", href: "/contracts" },
    { label: contract.title, href: `/contracts/${contract.slug}` },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(contract.faqs)} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-mono text-silver mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/contracts" className="hover:text-white transition-colors">
              Contracts
            </Link>
            <span>/</span>
            <span className="text-white truncate">{contract.title}</span>
          </nav>

          {/* Hero Section */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent mb-6 text-xs font-mono">
              <FileText className="w-3.5 h-3.5" />
              <span>Contract Teardown Guide</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {contract.title}
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed mb-6">
              {contract.summary}
            </p>

            <div className="flex flex-wrap items-center gap-2 text-xs text-silver">
              <span className="font-mono text-[#666]">Target Audience:</span>
              {contract.targetAudience.map((audience) => (
                <span
                  key={audience}
                  className="px-2.5 py-1 rounded-md bg-surface border border-edge text-silver text-[11px]"
                >
                  {audience}
                </span>
              ))}
            </div>
          </div>

          {/* Quick CTA Card */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#191426] border border-accent/40 p-6 sm:p-8 mb-16 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(124,92,252,0.15)]">
            <div>
              <h2 className="text-lg font-bold text-white mb-1">
                Have a {contract.title} to review right now?
              </h2>
              <p className="text-silver text-xs">
                Upload your document to LegalGPT for an instant risk audit and redline suggestions.
              </p>
            </div>
            <Link
              href="/app/contracts/mock-id"
              className="shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Scan This Contract</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Critical Clauses Section */}
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-6">
              <Layers className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-white">
                Critical Clauses to Watch In This Contract
              </h2>
            </div>
            <p className="text-silver text-sm mb-6 max-w-2xl">
              These provisions carry the highest financial and operational stakes in a {contract.title}. Click any clause for an in-depth breakdown and safer replacement language.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {contract.criticalClauseSlugs.map((clauseSlug) => {
                const clause = getClauseBySlug(clauseSlug);
                if (!clause) return null;
                return (
                  <Link
                    key={clause.slug}
                    href={`/clauses/${clause.slug}`}
                    className="group rounded-xl bg-surface/60 border border-edge p-6 hover:border-accent/50 hover:bg-surface transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#1f1627] text-accent border border-accent/30">
                          {clause.category}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase ${
                            clause.riskLevel === "high"
                              ? "text-risk-high"
                              : "text-risk-medium"
                          }`}
                        >
                          {clause.riskLevel} Risk
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2 group-hover:text-accent transition-colors">
                        {clause.name}
                      </h3>
                      <p className="text-silver text-xs line-clamp-3 leading-relaxed mb-4">
                        {clause.definition}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-accent text-xs font-semibold group-hover:translate-x-1 transition-transform">
                      <span>View Clause Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Common Risks Section */}
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-6">
              <AlertTriangle className="w-5 h-5 text-risk-high" />
              <h2 className="text-2xl font-bold text-white">
                Major Contract Risks &amp; Recommendations
              </h2>
            </div>
            <div className="space-y-6">
              {contract.commonRisks.map((risk) => (
                <div
                  key={risk.title}
                  className="rounded-xl bg-surface/50 border border-edge p-6 hover:border-edge/80 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{risk.title}</h3>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
                        risk.severity === "high"
                          ? "bg-risk-high/15 border border-risk-high/30 text-risk-high"
                          : "bg-risk-medium/15 border border-risk-medium/30 text-risk-medium"
                      }`}
                    >
                      {risk.severity} Severity
                    </span>
                  </div>
                  <p className="text-silver text-sm leading-relaxed mb-4">
                    {risk.description}
                  </p>
                  <div className="rounded-lg bg-[#0e0e11] border border-edge/60 p-4 text-xs text-silver">
                    <strong className="text-white block mb-1">
                      Recommended Negotiation Counter:
                    </strong>
                    {risk.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Red Flags & Negotiation Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Red Flags */}
            <div className="rounded-2xl bg-surface/50 border border-edge p-8">
              <div className="flex items-center gap-2 text-risk-high mb-4">
                <AlertTriangle className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">Immediate Red Flags</h2>
              </div>
              <ul className="space-y-3 text-silver text-xs leading-relaxed">
                {contract.redFlags.map((flag) => (
                  <li key={flag} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk-high shrink-0 mt-1.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negotiation Tips */}
            <div className="rounded-2xl bg-surface/50 border border-edge p-8">
              <div className="flex items-center gap-2 text-risk-low mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <h2 className="text-xl font-bold text-white">Negotiation Playbook</h2>
              </div>
              <ul className="space-y-3 text-silver text-xs leading-relaxed">
                {contract.negotiationTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk-low shrink-0 mt-1.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* When to get legal advice */}
          <div className="rounded-xl bg-[#14121a] border border-accent/20 p-6 mb-20 flex items-start gap-4">
            <Shield className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div className="text-xs text-silver leading-relaxed">
              <strong className="text-white block mb-1">
                When to Seek Licensed Legal Counsel:
              </strong>
              {contract.whenToGetLegalAdvice}
            </div>
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
              {contract.faqs.map((faq) => (
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

          {/* Related Contracts */}
          {contract.relatedContractSlugs.length > 0 && (
            <section className="border-t border-edge pt-12">
              <h2 className="text-lg font-bold text-white mb-6">
                Related Contract Guides
              </h2>
              <div className="flex flex-wrap gap-3">
                {contract.relatedContractSlugs.map((slug) => {
                  const related = contractsData.find((c) => c.slug === slug);
                  if (!related) return null;
                  return (
                    <Link
                      key={slug}
                      href={`/contracts/${slug}`}
                      className="px-4 py-2 rounded-xl bg-surface border border-edge hover:border-accent text-silver hover:text-white text-xs transition-colors"
                    >
                      {related.title}
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
