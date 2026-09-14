"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Info,
} from "lucide-react";
import { Breadcrumbs } from "@/components/seo/InternalLinking";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";

const sampleAggressiveNda = `1. Confidentiality Obligations: Recipient shall hold all Information disclosed by Discloser in strictest confidence in perpetuity, without limitation in time.
2. Definition: Confidential Information includes all business plans, customer data, and general concepts discussed, regardless of whether marked as confidential.
3. Non-Competition: Recipient agrees that for a period of 24 months following the evaluation period, Recipient shall not engage in, advise, or develop any software product operating in the same market as Discloser worldwide.
4. Intellectual Property: Any feedback, enhancements, or suggestions provided by Recipient shall become the sole property of Discloser without royalty or compensation.
5. Injunction: Discloser shall be entitled to immediate injunctive relief without the requirement to post any bond or prove actual financial damages.`;

const sampleBalancedNda = `1. Term: Recipient's confidentiality obligations under this Agreement shall expire three (3) years from the date of initial disclosure.
2. Standard Carve-outs: Confidential Information does not include information that is publicly known, already known to Recipient prior to disclosure, independently developed without reference to Discloser's materials, or required to be disclosed by law.
3. Purpose: Recipient shall use Confidential Information solely to evaluate a potential business partnership between the parties.
4. No License: Neither party acquires any intellectual property rights under this Agreement, and all pre-existing IP remains the property of the disclosing party.
5. Mutual Obligations: Both parties agree to protect each other's proprietary information using the same degree of care used to protect their own information of like importance.`;

interface RiskFinding {
  id: string;
  category: string;
  title: string;
  severity: "critical" | "warning" | "good";
  explanation: string;
  recommendation: string;
  saferLanguage?: string;
}

export default function NdaCheckerPage() {
  const [contractText, setContractText] = useState(sampleAggressiveNda);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Free Tools", href: "/tools" },
    { label: "NDA Risk Checker", href: "/tools/nda-checker" },
  ];

  const faqs = [
    {
      question: "How does this free NDA checker analyze contract risk?",
      answer:
        "The tool inspects your text for known predatory clauses including perpetual terms, overbroad confidentiality definitions, hidden non-compete restrictions, and IP transfer traps.",
    },
    {
      question: "Is my pasted NDA uploaded or stored on any server?",
      answer:
        "No. This free scanner runs entirely client-side in your web browser. Your text never leaves your device.",
    },
    {
      question: "Can this replace a licensed attorney?",
      answer:
        "No. This tool provides automated preliminary risk flagging. For high-stakes acquisitions or patent disclosures, always consult a qualified lawyer.",
    },
  ];

  // Heuristic inspection rules
  const findings: RiskFinding[] = useMemo(() => {
    const text = contractText.toLowerCase();
    const results: RiskFinding[] = [];

    if (!text.trim()) return [];

    // 1. Perpetual / Indefinite Term
    if (text.includes("perpetuity") || text.includes("perpetual") || text.includes("indefinite") || text.includes("without limitation in time")) {
      results.push({
        id: "perpetual-term",
        category: "Duration Risk",
        title: "Perpetual Confidentiality Term Detected",
        severity: "critical",
        explanation:
          "The NDA requires you to keep information confidential forever. Standard commercial discussions should expire in 1–3 years.",
        recommendation:
          "Strike 'in perpetuity' and limit the obligation to 2 or 3 years from the disclosure date.",
        saferLanguage:
          "The confidentiality obligations herein shall survive for a period of three (3) years from the effective date of disclosure.",
      });
    } else if (text.includes("years") || text.includes("year") || text.includes("months")) {
      results.push({
        id: "reasonable-term",
        category: "Duration",
        title: "Definite Confidentiality Period",
        severity: "good",
        explanation: "The NDA contains a defined expiration period rather than perpetual exposure.",
        recommendation: "Verify that the duration does not exceed 3 years for standard business negotiations.",
      });
    }

    // 2. Hidden Non-Compete / Non-Solicit
    if (text.includes("non-competition") || text.includes("not compete") || text.includes("shall not engage in") || text.includes("competing business")) {
      results.push({
        id: "hidden-non-compete",
        category: "Restrictive Covenant",
        title: "Hidden Non-Compete Clause Detected",
        severity: "critical",
        explanation:
          "This document sneakily restricts your right to work, build products, or consult in your industry under the guise of an NDA.",
        recommendation:
          "Completely strike all non-compete provisions from preliminary NDAs. Non-competes belong only in formal employment or definitive acquisition agreements.",
        saferLanguage:
          "Recipient's receipt of Confidential Information shall not preclude Recipient from developing competing products independently without use of Discloser's Confidential Information.",
      });
    }

    // 3. Missing Carve-Outs
    const hasCarveOuts =
      text.includes("publicly known") ||
      text.includes("public knowledge") ||
      text.includes("prior possession") ||
      text.includes("independently developed") ||
      text.includes("required by law");

    if (!hasCarveOuts) {
      results.push({
        id: "missing-carveouts",
        category: "Scope Risk",
        title: "Missing Standard Confidentiality Carve-Outs",
        severity: "critical",
        explanation:
          "The NDA fails to exempt information that is already public, independently created, or legally compelled by court subpoena.",
        recommendation:
          "Insist on standard four-part carve-outs (public knowledge, prior possession, independent development, compelled disclosure).",
        saferLanguage:
          "Confidential Information shall exclude information that: (a) is or becomes publicly known without breach; (b) was already in Recipient's rightful possession; (c) is independently developed without reference to Discloser's materials; or (d) is required to be disclosed by court order.",
      });
    } else {
      results.push({
        id: "standard-carveouts",
        category: "Scope",
        title: "Standard Exclusions Present",
        severity: "good",
        explanation: "The agreement includes carve-outs protecting publicly available or independently created data.",
        recommendation: "Ensure compelled disclosure provisions require written notice before complying with subpoenas.",
      });
    }

    // 4. IP Assignment Sneaks
    if (text.includes("sole property") || text.includes("assigns all right") || text.includes("work made for hire") || text.includes("feedback shall become")) {
      results.push({
        id: "ip-assignment",
        category: "Intellectual Property",
        title: "IP Assignment / Feedback Forfeiture Trap",
        severity: "critical",
        explanation:
          "The discloser is attempting to seize ownership of ideas, feedback, or code you suggest during preliminary conversations.",
        recommendation:
          "Clarify that no intellectual property licenses or transfers are granted under an exploratory NDA.",
        saferLanguage:
          "Nothing in this Agreement grants either party any right, title, or interest in or to the other party's intellectual property or background technology.",
      });
    }

    // 5. Unilateral vs Mutual
    if (text.includes("mutual") || (text.includes("either party") && text.includes("disclosing party"))) {
      results.push({
        id: "mutual-parity",
        category: "Parity",
        title: "Mutual Confidentiality Protections",
        severity: "good",
        explanation: "Both parties share equal obligations to protect confidential information.",
        recommendation: "Ensure definition of confidential information applies symmetrically.",
      });
    } else if (text.includes("recipient shall") && !text.includes("mutual")) {
      results.push({
        id: "unilateral-risk",
        category: "Parity",
        title: "One-Way (Unilateral) NDA",
        severity: "warning",
        explanation:
          "Only you are bound by confidentiality. The other party is free to share your pitch, deck, or code with competitors.",
        recommendation:
          "Convert the agreement into a Mutual NDA if both parties will be sharing sensitive business details.",
      });
    }

    return results;
  }, [contractText]);

  // Calculate Risk Score
  const riskScore = useMemo(() => {
    if (!contractText.trim()) return 0;
    const criticalCount = findings.filter((f) => f.severity === "critical").length;
    const warningCount = findings.filter((f) => f.severity === "warning").length;
    const goodCount = findings.filter((f) => f.severity === "good").length;

    let score = 20 + criticalCount * 30 + warningCount * 15 - goodCount * 10;
    return Math.min(Math.max(score, 10), 98);
  }, [contractText, findings]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>Free Product-Led Tool • Client-Side Private</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
              Free NDA Risk Checker
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Paste your Non-Disclosure Agreement below to instantly identify predatory terms, perpetual liability periods, hidden non-competes, and IP forfeiture traps.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono text-silver">Try a Sample:</span>
            <button
              onClick={() => setContractText(sampleAggressiveNda)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-red-950/40 border border-red-500/30 text-red-300 hover:bg-red-900/40 transition-colors"
            >
              Aggressive One-Way NDA (High Risk)
            </button>
            <button
              onClick={() => setContractText(sampleBalancedNda)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/40 transition-colors"
            >
              Balanced Mutual NDA (Low Risk)
            </button>
            <button
              onClick={() => setContractText("")}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-surface border border-edge text-silver hover:text-white transition-colors flex items-center gap-1.5 ml-auto"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Clear Text</span>
            </button>
          </div>

          {/* Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Input Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="rounded-2xl bg-surface/60 border border-edge p-5 flex flex-col flex-1">
                <label className="text-xs font-mono text-silver uppercase mb-3 flex items-center justify-between">
                  <span>Paste NDA Text or Clauses Below:</span>
                  <span className="text-[#666]">{contractText.length} characters</span>
                </label>
                <textarea
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="Paste non-disclosure agreement clauses here..."
                  className="w-full flex-1 min-h-[380px] p-4 rounded-xl bg-[#09090b] border border-edge/60 text-white font-mono text-xs leading-relaxed focus:border-accent outline-none resize-y transition-all"
                />
                <div className="mt-4 flex items-center justify-between text-xs text-silver">
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Processed 100% in your browser. Zero server transmission.
                  </span>
                </div>
              </div>
            </div>

            {/* Results Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Score Card */}
              <div className="rounded-2xl bg-surface/80 border border-edge p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-silver">
                    Overall Risk Rating
                  </h3>
                  <span
                    className={`text-xs font-mono uppercase px-3 py-1 rounded-full border ${
                      riskScore >= 60
                        ? "bg-red-950/60 text-red-400 border-red-500/40"
                        : riskScore >= 35
                        ? "bg-amber-950/60 text-amber-400 border-amber-500/40"
                        : "bg-emerald-950/60 text-emerald-400 border-emerald-500/40"
                    }`}
                  >
                    {riskScore >= 60 ? "Critical Exposure" : riskScore >= 35 ? "Moderate Exposure" : "Low Risk Profile"}
                  </span>
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-5xl font-extrabold text-white">{riskScore}</span>
                  <span className="text-xs font-mono text-silver">/ 100 Risk Score</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden mb-6">
                  <div
                    className={`h-full transition-all duration-500 ${
                      riskScore >= 60
                        ? "bg-red-500"
                        : riskScore >= 35
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>

                <div className="text-xs text-silver leading-relaxed border-t border-edge/60 pt-4">
                  {riskScore >= 60 ? (
                    <p className="text-red-300 font-medium">
                      ⚠️ Caution: This document contains predatory terms that could restrict your future employment or bind you to indefinite liabilities. Do not sign as-is.
                    </p>
                  ) : riskScore >= 35 ? (
                    <p className="text-amber-300 font-medium">
                      ⚖️ Notice: Contains moderate imbalance or missing standard exclusions. Negotiation recommended before executing.
                    </p>
                  ) : (
                    <p className="text-emerald-300 font-medium">
                      ✅ Well-balanced: Contains standard bilateral protections and definite time boundaries.
                    </p>
                  )}
                </div>
              </div>

              {/* Full Scan CTA */}
              <div className="rounded-2xl bg-gradient-to-r from-accent/15 via-surface to-accent/5 border border-accent/30 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-accent text-xs font-mono mb-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Need Full Contract Multi-Agent Analysis?</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">
                    Upload Full Document to LegalGPT
                  </h4>
                  <p className="text-silver text-xs leading-relaxed mb-4">
                    Our full multi-agent workflow cross-checks local state statutes, flags 50+ clause categories, and powers interactive conversational contract drafting.
                  </p>
                </div>
                <Link
                  href="/app/contracts/new"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
                >
                  <span>Launch Deep AI Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Detailed Findings Section */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2.5">
              <ShieldAlert className="w-6 h-6 text-accent" />
              <span>Automated Clause Breakdown ({findings.length} findings)</span>
            </h2>
            <p className="text-silver text-sm mb-8">
              Review specific terms detected in your document with line-by-line attorney guidance.
            </p>

            <div className="space-y-4">
              {findings.map((item) => {
                const isCritical = item.severity === "critical";
                const isWarning = item.severity === "warning";

                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl border p-6 transition-all ${
                      isCritical
                        ? "bg-red-950/20 border-red-500/30"
                        : isWarning
                        ? "bg-amber-950/20 border-amber-500/30"
                        : "bg-surface/40 border-edge"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {isCritical ? (
                          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                        ) : isWarning ? (
                          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        ) : (
                          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        <h3 className="text-base font-bold text-white">{item.title}</h3>
                      </div>
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-silver">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-silver text-xs sm:text-sm leading-relaxed mb-4">
                      {item.explanation}
                    </p>

                    <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-silver mb-4">
                      <strong className="text-white block mb-1">Negotiation Recommendation:</strong>
                      {item.recommendation}
                    </div>

                    {item.saferLanguage && (
                      <div className="rounded-xl bg-[#09090b] border border-accent/20 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono text-accent uppercase font-semibold">
                            Recommended Safer Replacement Language:
                          </span>
                          <button
                            onClick={() => handleCopy(item.id, item.saferLanguage!)}
                            className="flex items-center gap-1.5 text-xs text-silver hover:text-white transition-colors"
                          >
                            {copiedId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy Clause</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="font-mono text-xs text-silver/90 leading-relaxed">
                          &ldquo;{item.saferLanguage}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* FAQs */}
          <section className="mb-20 border-t border-edge pt-14">
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
