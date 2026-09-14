import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  ShieldAlert,
  FileText,
  BookOpen,
  ArrowRight,
  Layers,
} from "lucide-react";
import { getClauseBySlug } from "@/data/seo/clauses";
import { getContractBySlug } from "@/data/seo/contracts";
import { getGlossaryTermBySlug } from "@/data/seo/glossary";
import { BreadcrumbItem } from "@/lib/seo/types";

// ==========================================
// 1. Visual Breadcrumbs Component
// ==========================================
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center space-x-2 text-xs font-mono text-silver mb-8 overflow-x-auto whitespace-nowrap pb-1"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={item.href}>
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-[#555] shrink-0" aria-hidden="true" />
            )}
            {isLast ? (
              <span className="text-white font-medium truncate" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-accent transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

// ==========================================
// 2. Related Clauses Section
// ==========================================
interface RelatedClausesProps {
  clauseSlugs: string[];
  title?: string;
  description?: string;
}

export const RelatedClausesSection: React.FC<RelatedClausesProps> = ({
  clauseSlugs,
  title = "Critical Clauses to Review",
  description = "High-risk contractual provisions that demand careful scrutiny, negotiation, and protective replacement language.",
}) => {
  const clauses = clauseSlugs
    .map((slug) => getClauseBySlug(slug))
    .filter(Boolean);

  if (clauses.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-edge">
      <div className="flex items-center gap-2.5 mb-3">
        <ShieldAlert className="w-5 h-5 text-accent" />
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clauses.map((clause) => {
          if (!clause) return null;
          const isHighRisk = clause.riskLevel === "high";

          return (
            <Link
              key={clause.slug}
              href={`/clauses/${clause.slug}`}
              className="group rounded-2xl bg-surface/40 hover:bg-surface/80 border border-edge hover:border-accent/40 p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-silver">
                    {clause.category}
                  </span>
                  <span
                    className={`text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${
                      isHighRisk
                        ? "bg-red-950/40 text-red-400 border-red-500/30"
                        : "bg-amber-950/40 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {clause.riskLevel} Risk
                  </span>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent transition-colors flex items-center justify-between">
                  <span>{clause.name}</span>
                  <ArrowRight className="w-4 h-4 text-silver group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </h3>

                <p className="text-silver text-xs line-clamp-2 leading-relaxed">
                  {clause.definition}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-accent">
                <span>View Red Flags & Safer Language</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// 3. Related Contracts Section
// ==========================================
interface RelatedContractsProps {
  contractSlugs: string[];
  title?: string;
  description?: string;
}

export const RelatedContractsSection: React.FC<RelatedContractsProps> = ({
  contractSlugs,
  title = "Affected Contracts & Agreements",
  description = "Standard legal agreements where this provision appears and creates material operational or financial liability.",
}) => {
  const contracts = contractSlugs
    .map((slug) => getContractBySlug(slug))
    .filter(Boolean);

  if (contracts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-edge">
      <div className="flex items-center gap-2.5 mb-3">
        <FileText className="w-5 h-5 text-accent" />
        <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      </div>
      {description && (
        <p className="text-silver text-sm max-w-2xl mb-8 leading-relaxed">
          {description}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {contracts.map((contract) => {
          if (!contract) return null;

          return (
            <Link
              key={contract.slug}
              href={`/contracts/${contract.slug}`}
              className="group rounded-2xl bg-surface/40 hover:bg-surface/80 border border-edge hover:border-accent/40 p-5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {contract.targetAudience.slice(0, 2).map((aud) => (
                    <span
                      key={aud}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-silver truncate max-w-[140px]"
                    >
                      {aud}
                    </span>
                  ))}
                </div>

                <h3 className="text-white font-bold text-base mb-2 group-hover:text-accent transition-colors flex items-center justify-between">
                  <span className="truncate">{contract.title}</span>
                  <ArrowRight className="w-4 h-4 text-silver group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                </h3>

                <p className="text-silver text-xs line-clamp-2 leading-relaxed">
                  {contract.shortDescription}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-accent">
                <span>Negotiation Guide & Risks</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

// ==========================================
// 4. Related Glossary Chips
// ==========================================
interface RelatedGlossaryProps {
  termSlugs: string[];
  title?: string;
}

export const RelatedGlossarySection: React.FC<RelatedGlossaryProps> = ({
  termSlugs,
  title = "Related Legal Terms",
}) => {
  const terms = termSlugs
    .map((slug) => getGlossaryTermBySlug(slug))
    .filter(Boolean);

  if (terms.length === 0) return null;

  return (
    <div className="mt-10 p-5 rounded-2xl bg-surface/30 border border-edge">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-4 h-4 text-accent" />
        <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
          {title}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {terms.map((term) => {
          if (!term) return null;
          return (
            <Link
              key={term.slug}
              href={`/glossary/${term.slug}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface/90 border border-edge hover:border-accent/40 text-xs text-silver hover:text-white transition-all duration-200"
            >
              <span className="font-semibold text-white">{term.term}</span>
              <span className="text-[10px] text-accent font-mono">
                &ldquo;{term.simpleExplanation.slice(0, 30)}...&rdquo;
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
