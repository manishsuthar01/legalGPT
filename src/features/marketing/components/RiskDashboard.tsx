"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { MacWindow } from "@/components/ui/MacWindow";
import { AlertTriangle, AlertCircle, CheckCircle2, Sparkles, Check, ArrowRight } from "lucide-react";
import Link from "next/link";

interface RiskItem {
  id: string;
  clauseRef: string;
  title: string;
  severity: "high" | "medium" | "low";
  summary: string;
  originalText: string;
  fixedText: string;
}

const mockRisks: RiskItem[] = [
  {
    id: "risk-1",
    clauseRef: "Section 8.2 • Indemnification",
    title: "Uncapped Consequential Liability",
    severity: "high",
    summary: "The vendor agrees to indemnify without any liability cap, exposing you to unlimited punitive and incidental damages.",
    originalText: "Vendor shall defend, indemnify, and hold harmless Customer from and against any and all losses, damages, liabilities, costs, without limitation or cap whatsoever.",
    fixedText: "Vendor's aggregate liability under this Section shall in no event exceed the total fees actually paid by Customer in the preceding twelve (12) months.",
  },
  {
    id: "risk-2",
    clauseRef: "Section 14.1 • Intellectual Property",
    title: "Broad Background IP Transfer",
    severity: "high",
    summary: "Transfers proprietary tooling and pre-existing IP to the client without standard carve-outs.",
    originalText: "All intellectual property conceived, developed, or utilized during performance shall become the exclusive property of Client.",
    fixedText: "Pre-existing vendor background IP and proprietary tools remain the sole property of Vendor, subject to a non-exclusive license.",
  },
  {
    id: "risk-3",
    clauseRef: "Section 19.3 • Renewal",
    title: "90-Day Auto-Renewal Lock",
    severity: "medium",
    summary: "Requires written notice 90 days in advance, exceeding standard 30-day industry windows.",
    originalText: "Agreement automatically renews for consecutive 1-year terms unless terminated in writing at least 90 days prior.",
    fixedText: "Agreement renews for successive 1-year terms unless either party gives written notice at least 30 days prior.",
  },
];

export const RiskDashboard = () => {
  const [activeRiskId, setActiveRiskId] = useState<string>("risk-1");
  const [fixedRisks, setFixedRisks] = useState<Record<string, boolean>>({});

  const toggleFix = (id: string) => {
    setFixedRisks((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const activeRisk = mockRisks.find((r) => r.id === activeRiskId) || mockRisks[0];

  return (
    <section id="demo" className="py-20 relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-semibold uppercase tracking-widest mb-3">
            Interactive Redline Engine
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Auditing contracts in <span className="text-accent">real time</span>
          </h2>
          <p className="text-silver text-base md:text-lg max-w-xl mx-auto">
            Experience how Enigma isolates high-risk clauses, explains legal consequences, and generates attorney-grade redlines instantly.
          </p>
        </div>

        {/* Mac-Style Window Demo Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <MacWindow
            title="commercial_master_services_agreement_v2.pdf"
            statusBadge={
              <span className="inline-flex items-center gap-2 text-[11px] font-mono text-risk-high bg-risk-high/10 border border-risk-high/30 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-risk-high animate-pulse shrink-0" />
                <span>Score: 48/100 (High Risk)</span>
              </span>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] bg-[#0a0a0a]">
              
              {/* Left Column: Mock Legal Document Viewer */}
              <div className="lg:col-span-7 bg-[#0d0d0d] border-b lg:border-b-0 lg:border-r border-edge p-6 sm:p-8 flex flex-col font-sans">
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-edge/60">
                  <div className="flex items-center gap-2 text-xs text-silver font-mono">
                    <span>DOCUMENT VIEWER</span>
                    <span className="text-[#444]">•</span>
                    <span>PAGE 4 OF 12</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#666] font-mono text-[11px]">HIGHLIGHTS:</span>
                    <span className="px-1.5 py-0.5 rounded bg-risk-high/20 text-risk-high text-[10px] font-mono">2 HIGH</span>
                    <span className="px-1.5 py-0.5 rounded bg-risk-medium/20 text-risk-medium text-[10px] font-mono">1 MEDIUM</span>
                  </div>
                </div>

                {/* Contract Paper Simulation */}
                <div className="flex-1 bg-[#121214] border border-edge rounded-xl p-6 sm:p-8 text-sm leading-relaxed text-[#c4c4c4] space-y-6 overflow-y-auto max-h-[480px]">
                  <div>
                    <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-[#888] mb-2 font-mono">
                      8. INDEMNIFICATION & REIMBURSEMENT
                    </h4>
                    <p
                      onClick={() => setActiveRiskId("risk-1")}
                      className={`cursor-pointer rounded-lg p-3 transition-all duration-300 border ${
                        activeRiskId === "risk-1"
                          ? "bg-risk-high/10 border-risk-high/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] text-white"
                          : "bg-risk-high/5 border-risk-high/20 hover:border-risk-high/40"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.2 mr-2 bg-risk-high text-black text-[10px] font-bold rounded">
                        8.2
                      </span>
                      {fixedRisks["risk-1"] ? (
                        <span className="text-risk-low font-medium">
                          {mockRisks[0].fixedText}
                        </span>
                      ) : (
                        <span>
                          {mockRisks[0].originalText}
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-[#888] mb-2 font-mono">
                      14. INTELLECTUAL PROPERTY RIGHTS
                    </h4>
                    <p
                      onClick={() => setActiveRiskId("risk-2")}
                      className={`cursor-pointer rounded-lg p-3 transition-all duration-300 border ${
                        activeRiskId === "risk-2"
                          ? "bg-risk-high/10 border-risk-high/40 shadow-[0_0_15px_rgba(239,68,68,0.15)] text-white"
                          : "bg-risk-high/5 border-risk-high/20 hover:border-risk-high/40"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.2 mr-2 bg-risk-high text-black text-[10px] font-bold rounded">
                        14.1
                      </span>
                      {fixedRisks["risk-2"] ? (
                        <span className="text-risk-low font-medium">
                          {mockRisks[1].fixedText}
                        </span>
                      ) : (
                        <span>
                          {mockRisks[1].originalText}
                        </span>
                      )}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold text-xs tracking-wider uppercase text-[#888] mb-2 font-mono">
                      19. TERM, TERMINATION & RENEWAL
                    </h4>
                    <p
                      onClick={() => setActiveRiskId("risk-3")}
                      className={`cursor-pointer rounded-lg p-3 transition-all duration-300 border ${
                        activeRiskId === "risk-3"
                          ? "bg-risk-medium/10 border-risk-medium/40 shadow-[0_0_15px_rgba(245,158,11,0.15)] text-white"
                          : "bg-risk-medium/5 border-risk-medium/20 hover:border-risk-medium/40"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.2 mr-2 bg-risk-medium text-black text-[10px] font-bold rounded">
                        19.3
                      </span>
                      {fixedRisks["risk-3"] ? (
                        <span className="text-risk-low font-medium">
                          {mockRisks[2].fixedText}
                        </span>
                      ) : (
                        <span>
                          {mockRisks[2].originalText}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-[#666]">
                  <span>Click any highlighted clause to view legal counsel feedback</span>
                  <span className="text-accent font-mono text-[11px]">Enigma AI v2.4</span>
                </div>
              </div>

              {/* Right Column: Live Risk Feed */}
              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col bg-[#0f0f12]">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-edge">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-semibold text-sm">Identified Risks</span>
                    <span className="bg-accent/20 text-accent text-xs px-2 py-0.5 rounded-full font-mono">
                      {mockRisks.length} Issues
                    </span>
                  </div>
                  <span className="text-xs text-silver">Severity Sorted</span>
                </div>

                {/* Risk Feed Cards */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {mockRisks.map((risk) => {
                    const isActive = activeRiskId === risk.id;
                    const isFixed = fixedRisks[risk.id];

                    return (
                      <div
                        key={risk.id}
                        onClick={() => setActiveRiskId(risk.id)}
                        className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "bg-[#18181c] border-accent shadow-[0_0_20px_rgba(124,92,252,0.15)] scale-[1.01]"
                            : "bg-[#131316] border-edge hover:border-[#333] hover:bg-[#161619]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[11px] font-mono text-[#888]">
                            {risk.clauseRef}
                          </span>
                          {risk.severity === "high" ? (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-risk-high bg-risk-high/10 border border-risk-high/20 px-2 py-0.5 rounded-md">
                              <AlertTriangle className="w-3 h-3" /> High Risk
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-risk-medium bg-risk-medium/10 border border-risk-medium/20 px-2 py-0.5 rounded-md">
                              <AlertCircle className="w-3 h-3" /> Medium Risk
                            </span>
                          )}
                        </div>

                        <h4 className="text-white font-medium text-sm mb-1.5 flex items-center justify-between">
                          <span>{risk.title}</span>
                          {isFixed && (
                            <span className="text-risk-low flex items-center gap-1 text-xs font-normal">
                              <Check className="w-3.5 h-3.5" /> Redlined
                            </span>
                          )}
                        </h4>
                        <p className="text-silver text-xs leading-relaxed mb-3">
                          {risk.summary}
                        </p>

                        {isActive && (
                          <div className="pt-3 border-t border-edge/60">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFix(risk.id);
                              }}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                                isFixed
                                  ? "bg-risk-low/10 text-risk-low border border-risk-low/30 hover:bg-risk-low/20"
                                  : "bg-accent text-white hover:bg-accent/90 shadow-[0_0_15px_rgba(124,92,252,0.3)]"
                              }`}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>{isFixed ? "Revert to Original Clause" : "Auto-Fix Clause with AI"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-4 border-t border-edge flex items-center justify-between">
                  <div className="text-xs text-silver">
                    <span className="text-white font-medium">Ready to test?</span> Scan your own document.
                  </div>
                  <Link
                    href="/contracts/mock-id"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    <span>Full Workspace</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

            </div>
          </MacWindow>
        </motion.div>
      </div>
    </section>
  );
};
