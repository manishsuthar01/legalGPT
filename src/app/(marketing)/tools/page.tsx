import React from "react";
import Link from "next/link";
import { Wrench, ShieldAlert, FileCheck, Layers, ArrowRight, Sparkles } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Free Legal AI Tools — Instant Contract & Clause Scanners",
  description:
    "Free AI contract review tools by LegalGPT. Check NDAs for traps, calculate contract risk scores, analyze individual clauses, and generate negotiation checklists.",
  path: "/tools",
  keywords: [
    "free contract scanner",
    "NDA risk checker",
    "clause analyzer free",
    "contract checklist generator",
    "free legal AI tools",
  ],
});

const toolsList = [
  {
    icon: ShieldAlert,
    title: "Full Contract Risk Checker",
    badge: "Deep AI Analysis",
    description:
      "Upload any contract in PDF or text format. Get a 0–100 risk score, high-severity clause count, and a summary of missing protections in 30 seconds.",
    href: "/app/contracts/new",
    cta: "Launch Deep Scanner",
  },
  {
    icon: FileCheck,
    title: "Free NDA Risk Checker",
    badge: "Instant Browser Tool",
    description:
      "Detect perpetual confidentiality periods, hidden non-competes, and aggressive IP assignment language in Non-Disclosure Agreements.",
    href: "/tools/nda-checker",
    cta: "Scan NDA Free",
  },
  {
    icon: Layers,
    title: "Clause Redlining Analyzer",
    badge: "Interactive Redlines",
    description:
      "Paste any single clause (indemnification, liability cap, non-compete) to get instant risk scoring and attorney-vetted replacement language.",
    href: "/tools/clause-analyzer",
    cta: "Analyze Clause Free",
  },
];

export default function ToolsHubPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Free Tools", href: "/tools" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Wrench className="w-3.5 h-3.5 text-accent" />
              <span>Free Product-Led Tools</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Instant Legal Audits. <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Zero Retainers.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Use our free AI tools to quickly inspect contracts before signing. Pinpoint liabilities, test clause enforceability, and generate negotiation checklists in seconds.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {toolsList.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.title}
                  className="rounded-2xl bg-surface/60 border border-edge p-8 flex flex-col justify-between hover:border-accent/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <span className="text-[10px] font-mono text-silver bg-[#1c1c20] px-2 py-0.5 rounded border border-edge">
                        {tool.badge}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3">{tool.title}</h2>
                    <p className="text-silver text-xs sm:text-sm leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  <Link
                    href={tool.href}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-accent/20 hover:bg-accent border border-accent/40 hover:border-accent text-white text-xs font-semibold transition-all group"
                  >
                    <span>{tool.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-surface to-[#161224] border border-edge p-10 text-center">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Need a full multi-agent contract audit?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6">
              Access the complete LegalGPT workspace with statutory web search verification and live RAG conversational copilot.
            </p>
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Open LegalGPT Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
