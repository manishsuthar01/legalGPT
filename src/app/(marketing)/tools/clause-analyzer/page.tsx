"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Layers,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/InternalLinking";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";
import { clausesData } from "@/data/seo/clauses";

const presets = [
  {
    name: "Uncapped Indemnification",
    slug: "indemnification",
    text: "Vendor agrees to defend, indemnify, and hold harmless Customer, its officers, directors, employees, and affiliates from and against any and all claims, liabilities, losses, damages, or expenses (including unlimited attorneys' fees) arising out of or related to Vendor's performance under this Agreement.",
  },
  {
    name: "One-Sided Limitation of Liability",
    slug: "limitation-of-liability",
    text: "IN NO EVENT SHALL CUSTOMER BE LIABLE FOR ANY INDIRECT, SPECIAL, OR CONSEQUENTIAL DAMAGES. VENDOR'S MAXIMUM AGGREGATE LIABILITY SHALL BE UNLIMITED, AND VENDOR SHALL DEFEND CUSTOMER AGAINST ALL THIRD-PARTY CLAIMS.",
  },
  {
    name: "Overbroad Non-Compete",
    slug: "non-compete",
    text: "Employee covenants that for a period of twenty-four (24) months post-termination, Employee shall not directly or indirectly work for, consult with, or own any equity in any tech business operating anywhere in North America.",
  },
  {
    name: "Immediate Termination for Convenience",
    slug: "termination",
    text: "Customer may terminate this Agreement at any time for convenience with immediate effect upon written notice to Vendor, without any requirement to pay for work-in-progress or non-cancelable commitments.",
  },
];

export default function ClauseAnalyzerPage() {
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [clauseText, setClauseText] = useState(presets[0].text);
  const [copied, setCopied] = useState(false);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Free Tools", href: "/tools" },
    { label: "Clause Redline Analyzer", href: "/tools/clause-analyzer" },
  ];

  const faqs = [
    {
      question: "How does the Clause Redline Analyzer detect risk?",
      answer:
        "It scans contractual clauses against our attorney-vetted pattern engine to detect missing liability caps, unilateral obligations, unlimited attorney fees, and overbroad restrictive covenants.",
    },
    {
      question: "Can I use the safer alternative language directly in my contract?",
      answer:
        "Yes! The alternative language is drafted as a balanced, commercial compromise designed to protect your interests while remaining reasonable to counterparty counsel.",
    },
    {
      question: "Is this analysis confidential?",
      answer:
        "Yes. The analyzer runs entirely inside your web browser. No clause data is stored or logged.",
    },
  ];

  // Matched clause intelligence from database
  const matchedClause = useMemo(() => {
    const text = clauseText.toLowerCase();
    if (text.includes("indemnif") || text.includes("hold harmless")) {
      return clausesData.find((c) => c.slug === "indemnification");
    }
    if (text.includes("liability") || text.includes("consequential")) {
      return clausesData.find((c) => c.slug === "limitation-of-liability");
    }
    if (text.includes("compete") || text.includes("competition")) {
      return clausesData.find((c) => c.slug === "non-compete");
    }
    if (text.includes("terminat")) {
      return clausesData.find((c) => c.slug === "termination-for-convenience");
    }
    if (text.includes("confidential")) {
      return clausesData.find((c) => c.slug === "confidentiality-non-disclosure");
    }
    return clausesData[0];
  }, [clauseText]);

  // Client-side heuristics
  const analysis = useMemo(() => {
    const text = clauseText.toLowerCase();
    const flags: string[] = [];

    if (text.includes("unlimited") || (text.includes("indemnif") && !text.includes("subject to section [limitation"))) {
      flags.push("Uncapped financial exposure without liability ceiling");
    }
    if (text.includes("any and all claims") || text.includes("regardless of theory")) {
      flags.push("Broad scope extending beyond material breach or gross negligence");
    }
    if (!text.includes("mutual") && (text.includes("vendor agrees") || text.includes("recipient shall"))) {
      flags.push("Unilateral commitment with no reciprocal counterparty protection");
    }
    if (text.includes("immediate effect") && text.includes("convenience")) {
      flags.push("Termination for convenience without reasonable 30-day notice period");
    }
    if (text.includes("twenty-four") || text.includes("24 months") || text.includes("in perpetuity")) {
      flags.push("Excessive time duration exceeding typical industry standards");
    }

    const riskScore = flags.length >= 3 ? 88 : flags.length >= 1 ? 65 : 30;

    return { flags, riskScore };
  }, [clauseText]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="py-16 md:py-24 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent mb-6 text-xs font-mono">
              <Layers className="w-3.5 h-3.5" />
              <span>Interactive Clause Redline Analyzer</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Instant Clause Redline Scanner
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Paste any single contract clause below to instantly evaluate risk level, identify predatory traps, and get attorney-vetted replacement counter-language.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="text-xs font-mono text-silver">Sample Presets:</span>
            {presets.map((preset, idx) => (
              <button
                key={preset.name}
                onClick={() => {
                  setSelectedPreset(idx);
                  setClauseText(preset.text);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                  selectedPreset === idx
                    ? "bg-accent text-white font-bold shadow-[0_0_12px_rgba(124,92,252,0.3)]"
                    : "bg-surface border border-edge text-silver hover:text-white"
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Input Column (6 cols) */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="rounded-2xl bg-surface/60 border border-edge p-5 flex flex-col flex-1">
                <label className="text-xs font-mono text-silver uppercase mb-3 flex items-center justify-between">
                  <span>Paste Contract Clause:</span>
                  <span className="text-[#666]">{clauseText.length} chars</span>
                </label>
                <textarea
                  value={clauseText}
                  onChange={(e) => setClauseText(e.target.value)}
                  placeholder="Paste clause text here (e.g. indemnity, liability cap, non-compete)..."
                  className="w-full flex-1 min-h-[340px] p-4 rounded-xl bg-[#09090b] border border-edge/60 text-white font-mono text-xs leading-relaxed focus:border-accent outline-none resize-y transition-all"
                />
                <div className="mt-4 flex items-center justify-between text-xs text-silver">
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    100% Client-Side Privacy
                  </span>
                  <button
                    onClick={() => setClauseText("")}
                    className="text-[11px] font-mono text-silver hover:text-white flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Analysis Result (6 cols) */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              {/* Risk Score Pill */}
              <div className="rounded-2xl bg-surface/80 border border-edge p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-silver">
                    Estimated Clause Risk
                  </span>
                  <span
                    className={`text-xs font-mono uppercase px-3 py-0.5 rounded-full border ${
                      analysis.riskScore >= 70
                        ? "bg-red-950/60 text-red-400 border-red-500/40"
                        : analysis.riskScore >= 40
                        ? "bg-amber-950/60 text-amber-400 border-amber-500/40"
                        : "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                    }`}
                  >
                    {analysis.riskScore >= 70 ? "High Risk" : analysis.riskScore >= 40 ? "Medium Risk" : "Low Risk"}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-4xl font-extrabold text-white">{analysis.riskScore}</span>
                  <span className="text-xs font-mono text-silver">/ 100 Risk Rating</span>
                </div>

                {/* Flags Detected */}
                <div className="space-y-2 mb-4 border-t border-edge/60 pt-4">
                  <span className="text-xs font-mono uppercase text-silver block mb-2">
                    Key Flags Detected:
                  </span>
                  {analysis.flags.length > 0 ? (
                    analysis.flags.map((flag, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-red-300">
                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                        <span>{flag}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-emerald-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>No critical predatory triggers detected.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Recommended Replacement Language */}
              {matchedClause?.saferAlternative && (
                <div className="rounded-2xl bg-[#09090b] border border-accent/40 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-accent uppercase font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended Replacement Language
                      </span>
                      <button
                        onClick={() => handleCopy(matchedClause.saferAlternative)}
                        className="flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="font-mono text-xs text-silver leading-relaxed mb-4">
                      &ldquo;{matchedClause.saferAlternative}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-silver">
                    <span>Target Category: {matchedClause.category}</span>
                    <Link
                      href={`/clauses/${matchedClause.slug}`}
                      className="text-accent hover:underline flex items-center gap-1 font-mono text-[11px]"
                    >
                      <span>Read Deep Clause Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cross-Link to App */}
          <div className="rounded-2xl bg-gradient-to-r from-surface via-[#141022] to-surface border border-edge p-10 text-center mb-20">
            <h2 className="text-2xl font-bold text-white mb-3">
              Need to analyze an entire 40-page contract at once?
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Don&apos;t check clauses one by one. Upload the entire PDF or DOCX file to LegalGPT. Our multi-agent graph automatically parses clauses, computes aggregate liability scores, and answers specific questions.
            </p>
            <Link
              href="/app/contracts/new"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Launch Full Contract Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQs */}
          <section className="border-t border-edge pt-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-2xl bg-surface/40 border border-edge">
                  <h3 className="text-white text-sm font-semibold mb-2">{faq.question}</h3>
                  <p className="text-silver text-xs leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
