"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { MacWindow } from "@/components/ui/MacWindow";
import { AlertTriangle, AlertCircle, Check, ArrowRight, Scale, FileText } from "lucide-react";
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
    fixedText: "Vendor's aggregate liability under this Section shall in no event exceed the total fees actually paid by Customer in the preceding twelve (12) months. Neither party shall be liable for consequential damages.",
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

  return (
    <section id="demo" className="pb-16 sm:pb-24 relative z-10 bg-white">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
        
        {/* Massive Curved Visual Showcase Container matching Wollo hero showcase */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-gradient-to-b from-[#F4F6F9] via-[#ECEFF4] to-[#E2E6EC] p-2.5 sm:p-4 md:p-6 border border-[#DCE0E7] shadow-[0_20px_50px_rgba(10,13,20,0.05)] overflow-hidden"
        >
          <MacWindow
            title="master_services_agreement.pdf"
            statusBadge={
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full whitespace-nowrap shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                <span>Risk Score: 78/100 (High)</span>
              </span>
            }
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[540px] bg-white">
              
              {/* Left Column: Legal Document Viewer */}
              <div className="lg:col-span-7 bg-white border-b lg:border-b-0 lg:border-r border-[#E5E7EB] p-4 sm:p-6 flex flex-col font-sans">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                    <FileText size={14} className="text-[#583AFE]" />
                    <span className="font-semibold text-[#0A0D14]">Contract Preview</span>
                    <span className="text-[#D1D5DB]">•</span>
                    <span>Section 8: Indemnification</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-medium">2 High</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-medium">1 Medium</span>
                  </div>
                </div>

                {/* Contract Paper Simulation */}
                <div className="flex-1 bg-[#FAFAFC] border border-[#E5E7EB] rounded-xl p-4 sm:p-6 text-xs sm:text-[13px] leading-relaxed text-[#1F2937] space-y-5 overflow-y-auto max-h-[440px]">
                  <div>
                    <h4 className="text-[#6B7280] text-[11px] font-semibold uppercase tracking-wider mb-2">
                      8. INDEMNIFICATION &amp; REIMBURSEMENT
                    </h4>
                    <div
                      onClick={() => setActiveRiskId("risk-1")}
                      className={`cursor-pointer rounded-lg p-3.5 transition-all border select-text ${
                        activeRiskId === "risk-1"
                          ? "bg-rose-50/80 border-rose-300 text-[#0A0D14] ring-1 ring-rose-200"
                          : "bg-rose-50/30 border-rose-200/60 hover:border-rose-300"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.5 mr-2 bg-rose-100 text-rose-700 text-[10px] font-mono font-bold rounded">
                        §8.2
                      </span>
                      {fixedRisks["risk-1"] ? (
                        <span className="text-emerald-700 font-mono text-xs font-medium">
                          {mockRisks[0].fixedText}
                        </span>
                      ) : (
                        <span className="font-legal-clause text-[#111827]">
                          {mockRisks[0].originalText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#6B7280] text-[11px] font-semibold uppercase tracking-wider mb-2">
                      14. INTELLECTUAL PROPERTY RIGHTS
                    </h4>
                    <div
                      onClick={() => setActiveRiskId("risk-2")}
                      className={`cursor-pointer rounded-lg p-3.5 transition-all border select-text ${
                        activeRiskId === "risk-2"
                          ? "bg-rose-50/80 border-rose-300 text-[#0A0D14] ring-1 ring-rose-200"
                          : "bg-rose-50/30 border-rose-200/60 hover:border-rose-300"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.5 mr-2 bg-rose-100 text-rose-700 text-[10px] font-mono font-bold rounded">
                        §14.1
                      </span>
                      {fixedRisks["risk-2"] ? (
                        <span className="text-emerald-700 font-mono text-xs font-medium">
                          {mockRisks[1].fixedText}
                        </span>
                      ) : (
                        <span className="font-legal-clause text-[#111827]">
                          {mockRisks[1].originalText}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[#6B7280] text-[11px] font-semibold uppercase tracking-wider mb-2">
                      19. TERM, TERMINATION &amp; RENEWAL
                    </h4>
                    <div
                      onClick={() => setActiveRiskId("risk-3")}
                      className={`cursor-pointer rounded-lg p-3.5 transition-all border select-text ${
                        activeRiskId === "risk-3"
                          ? "bg-amber-50/80 border-amber-300 text-[#0A0D14] ring-1 ring-amber-200"
                          : "bg-amber-50/30 border-amber-200/60 hover:border-amber-300"
                      }`}
                    >
                      <span className="inline-block px-1.5 py-0.5 mr-2 bg-amber-100 text-amber-800 text-[10px] font-mono font-bold rounded">
                        §19.3
                      </span>
                      {fixedRisks["risk-3"] ? (
                        <span className="text-emerald-700 font-mono text-xs font-medium">
                          {mockRisks[2].fixedText}
                        </span>
                      ) : (
                        <span className="font-legal-clause text-[#111827]">
                          {mockRisks[2].originalText}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3.5 flex items-center justify-between text-xs text-[#6B7280] select-none">
                  <span>Click any highlighted clause to preview the recommended redline</span>
                  <span className="text-emerald-600 font-medium">Interactive Demo</span>
                </div>
              </div>

              {/* Right Column: Live Risk Feed */}
              <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col bg-[#F9FAFB]">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#0A0D14] font-semibold text-xs uppercase tracking-wider">
                      Flagged Clauses
                    </span>
                    <span className="bg-[#583AFE]/10 text-[#583AFE] border border-[#583AFE]/20 text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {mockRisks.length} flagged
                    </span>
                  </div>
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
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${
                          isActive
                            ? "bg-white border-[#583AFE] shadow-sm ring-1 ring-[#583AFE]/20"
                            : "bg-white/80 border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-[#6B7280]">
                            {risk.clauseRef}
                          </span>
                          {risk.severity === "high" ? (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full">
                              <AlertTriangle className="w-2.5 h-2.5 text-rose-500" /> High
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                              <AlertCircle className="w-2.5 h-2.5 text-amber-500" /> Medium
                            </span>
                          )}
                        </div>

                        <h4 className="text-[#0A0D14] font-semibold text-xs mb-1.5 flex items-center justify-between">
                          <span>{risk.title}</span>
                          {isFixed && (
                            <span className="text-emerald-600 flex items-center gap-1 text-[11px] font-mono font-medium">
                              <Check className="w-3 h-3" /> Redlined
                            </span>
                          )}
                        </h4>
                        <p className="text-[#4B5565] text-xs leading-relaxed mb-3">
                          {risk.summary}
                        </p>

                        {isActive && (
                          <div className="pt-3 border-t border-[#F3F4F6]">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFix(risk.id);
                              }}
                              className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                                isFixed
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100"
                                  : "bg-[#583AFE] hover:bg-[#4c30f0] text-white"
                              }`}
                            >
                              <span>{isFixed ? "Revert to Original Text" : "Apply Recommended Redline"}</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Action */}
                <div className="pt-3.5 mt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <div className="text-xs text-[#6B7280]">
                    <span className="text-[#0A0D14] font-medium">Have an agreement?</span> Review in workspace.
                  </div>
                  <Link
                    href="/app/contracts/new"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#583AFE] hover:text-[#4c30f0] transition-colors"
                  >
                    <span>Open Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
