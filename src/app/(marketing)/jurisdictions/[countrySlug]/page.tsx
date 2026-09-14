import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Globe,
  Scale,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Landmark,
  CheckCircle2,
  FileText,
  HelpCircle,
  FileCheck2,
  BookOpen,
} from "lucide-react";
import {
  jurisdictionsData,
  getJurisdictionBySlug,
  getAllJurisdictionSlugs,
} from "@/data/seo/jurisdictions";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";
import {
  Breadcrumbs,
  RelatedContractsSection,
} from "@/components/seo/InternalLinking";

interface PageProps {
  params: Promise<{ countrySlug: string }>;
}

export async function generateStaticParams() {
  return getAllJurisdictionSlugs().map((slug) => ({
    countrySlug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { countrySlug } = await params;
  const jurisdiction = getJurisdictionBySlug(countrySlug);

  if (!jurisdiction) {
    return createMetadata({
      title: "Jurisdiction Not Found",
      description: "The requested jurisdiction guide could not be found.",
      path: `/jurisdictions/${countrySlug}`,
      noindex: true,
    });
  }

  return createMetadata({
    title: `${jurisdiction.name} Contract Law Guide: Statutes, Formalities & Red Flags`,
    description: jurisdiction.shortDescription,
    path: `/jurisdictions/${jurisdiction.slug}`,
    keywords: [
      jurisdiction.name,
      `${jurisdiction.name} contract law`,
      `${jurisdiction.name} contract red flags`,
      `${jurisdiction.name} commercial contracts`,
      `${jurisdiction.name} contract enforceability`,
      `${jurisdiction.name} legal compliance`,
    ],
  });
}

export default async function JurisdictionDetailPage({ params }: PageProps) {
  const { countrySlug } = await params;
  const jurisdiction = getJurisdictionBySlug(countrySlug);

  if (!jurisdiction) {
    notFound();
  }

  const otherJurisdictions = jurisdictionsData.filter(
    (j) => j.slug !== jurisdiction.slug
  );

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Jurisdictions", href: "/jurisdictions" },
    { label: jurisdiction.name, href: `/jurisdictions/${jurisdiction.slug}` },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(jurisdiction.faqs)} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs items={breadcrumbs} />

          {/* Hero Section */}
          <div className="max-w-4xl mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-4xl" role="img" aria-label={jurisdiction.name}>
                {jurisdiction.flag}
              </span>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-mono">
                <Globe className="w-3.5 h-3.5" />
                <span>{jurisdiction.legalSystem}</span>
              </div>
              <span className="text-xs font-mono text-silver px-3 py-1 rounded-full bg-white/5 border border-white/10">
                Code: {jurisdiction.countryCode}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              {jurisdiction.name} Commercial Contract Law &amp; Enforceability Guide
            </h1>

            <p className="text-silver text-base sm:text-lg leading-relaxed mb-8">
              {jurisdiction.overview}
            </p>

            <div className="p-4 rounded-2xl bg-surface/50 border border-edge flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs text-silver font-mono">
                <Landmark className="w-4 h-4 text-accent shrink-0" />
                <span>Primary Judicial Venues: <strong className="text-white">{jurisdiction.governingBody}</strong></span>
              </div>

              <Link
                href="/app/contracts/new"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-all shrink-0"
              >
                <span>Upload Contract for Review</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 1. Key Governing Statutes & Precedents */}
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-3">
              <Scale className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Key Statutes &amp; Legal Precedents
              </h2>
            </div>
            <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
              Statutory provisions that supersede standard boilerplate language and dictate enforceability in {jurisdiction.name}.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jurisdiction.keyStatutes.map((statute, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-surface/60 border border-edge p-6 flex flex-col justify-between hover:border-edge/80 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded bg-accent/15 border border-accent/30 text-accent font-semibold">
                        {statute.code}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-3">
                      {statute.name}
                    </h3>
                    <p className="text-silver text-xs sm:text-sm leading-relaxed">
                      {statute.impactOnContracts}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. Mandatory Execution Formalities */}
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-3">
              <FileCheck2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Mandatory Execution &amp; Validity Formalities
              </h2>
            </div>
            <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
              Procedural requirements that must be met for commercial agreements in {jurisdiction.name} to be legally binding and admissible in court.
            </p>

            <div className="rounded-3xl bg-surface/40 border border-edge p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jurisdiction.mandatoryRequirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-surface/60 border border-edge/60"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-silver leading-relaxed">
                      {req}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. Local Red Flags & Unenforceable Provisions */}
          <section className="mb-20">
            <div className="flex items-center gap-2.5 mb-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Jurisdiction-Specific Red Flags in {jurisdiction.name}
              </h2>
            </div>
            <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
              Common drafting mistakes and unenforceable clauses frequently inserted into contracts governed by {jurisdiction.name} law.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {jurisdiction.localRedFlags.map((flag, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-red-950/20 border border-red-500/30 p-5 flex items-start gap-3.5"
                >
                  <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-mono uppercase text-red-400 font-semibold block mb-1">
                      Enforceability Warning #{idx + 1}
                    </span>
                    <p className="text-silver text-xs sm:text-sm leading-relaxed">
                      {flag}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Frequently Asked Questions (FAQ) */}
          {jurisdiction.faqs.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-2.5 mb-3">
                <HelpCircle className="w-5 h-5 text-accent" />
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Frequently Asked Questions on {jurisdiction.name} Law
                </h2>
              </div>
              <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
                Clear legal explanations for founders, contractors, and in-house counsel operating in {jurisdiction.name}.
              </p>

              <div className="space-y-4 max-w-3xl">
                {jurisdiction.faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-surface/40 border border-edge"
                  >
                    <h3 className="text-white font-semibold text-base mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-silver text-xs sm:text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Recommended Contract Types */}
          <RelatedContractsSection
            contractSlugs={jurisdiction.recommendedContractSlugs}
            title={`Common Contracts Governed by ${jurisdiction.name} Law`}
            description={`Key agreement templates and teardown guides heavily influenced by ${jurisdiction.name} statutory regulations and court precedents.`}
          />

          {/* 6. Explore Other Jurisdictions */}
          <section className="mt-20 pt-12 border-t border-edge">
            <div className="flex items-center gap-2.5 mb-3">
              <Globe className="w-5 h-5 text-accent" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Compare with Other Jurisdictions
              </h2>
            </div>
            <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
              Explore contract rules and statutory differences across other major legal systems.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherJurisdictions.map((other) => (
                <Link
                  key={other.slug}
                  href={`/jurisdictions/${other.slug}`}
                  className="group rounded-2xl bg-surface/40 hover:bg-surface/80 border border-edge hover:border-accent/40 p-5 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl" role="img" aria-label={other.name}>
                        {other.flag}
                      </span>
                      <span className="text-[10px] font-mono text-silver px-2 py-0.5 rounded bg-white/5 border border-white/10">
                        {other.countryCode}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1 group-hover:text-accent transition-colors">
                      {other.name}
                    </h3>
                    <p className="text-silver text-[11px] line-clamp-2 leading-relaxed">
                      {other.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-accent">
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 7. Bottom Pre-configured Launch CTA */}
          <div className="mt-20 rounded-3xl bg-gradient-to-r from-accent/20 via-surface/60 to-surface/40 border border-accent/30 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase text-accent tracking-widest block mb-2">
                Automated Jurisdiction Triage
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                Review Your {jurisdiction.name} Contract in Seconds
              </h3>
              <p className="text-silver text-sm leading-relaxed">
                Our multi-agent legal RAG engine verifies clauses against {jurisdiction.name} statutory codes, highlights void provisions, and drafts jurisdiction-compliant counter-clauses in 30 seconds.
              </p>
            </div>

            <Link
              href="/app/contracts/new"
              className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold transition-all shadow-[0_0_25px_rgba(124,92,252,0.3)] hover:shadow-[0_0_35px_rgba(124,92,252,0.5)] shrink-0 flex items-center gap-2"
            >
              <span>Start Free Contract Review</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
