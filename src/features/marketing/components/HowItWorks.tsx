"use client";

import React from "react";
import { motion } from "motion/react";
import { Upload, Cpu, MessageSquareText, Check, Scale } from "lucide-react";
import { MacWindow } from "@/components/ui/MacWindow";

const steps = [
  {
    number: "01",
    icon: <Upload className="w-4 h-4 text-[#583AFE]" />,
    title: "Upload Agreement",
    description:
      "Drop your contract in PDF or DOCX format. The document is parsed securely in memory with zero permanent retention.",
  },
  {
    number: "02",
    icon: <Cpu className="w-4 h-4 text-[#583AFE]" />,
    title: "Automated Risk Review",
    description:
      "Specialized AI agents analyze clauses against statutory benchmarks to identify indemnities, traps, and missing protections.",
  },
  {
    number: "03",
    icon: <MessageSquareText className="w-4 h-4 text-[#16A34A]" />,
    title: "Review & Apply Redlines",
    description:
      "Review clear explanations of legal risks and apply attorney-grade balanced redlines in one click.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative z-10 bg-[#F9FAFB]/60 border-t border-[#F0F2F5]">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Steps */}
          <div className="lg:col-span-6">
            <span className="text-[#583AFE] text-[11px] font-semibold uppercase tracking-wider block mb-3">
              HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-[#0A0D14] mb-4">
              Three simple steps to <span className="text-[#583AFE]">contract clarity</span>
            </h2>
            <p className="text-[#4B5565] text-sm sm:text-base mb-8 leading-relaxed">
              No complex setup or training required. Upload your agreement and get actionable legal analysis and redlines in seconds.
            </p>

            <div className="space-y-3.5">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#D1D5DB] hover:shadow-xs transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#583AFE]/10 border border-[#583AFE]/20 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono text-[#583AFE] font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-sm font-semibold text-[#0A0D14]">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-[#4B5565] text-xs leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Mini Interactive MacWindow Graphic */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <MacWindow
                title="review_summary.pdf"
                statusBadge={
                  <span className="text-[#16A34A] text-[10px] font-mono flex items-center gap-1.5 font-semibold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                    AUDIT COMPLETE
                  </span>
                }
              >
                <div className="p-6 bg-white space-y-3 font-sans">
                  {/* Progress Step 1 */}
                  <div className="p-3.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center text-xs">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="text-[#0A0D14] text-xs font-semibold">Clause Segmentation</div>
                        <div className="text-[#6B7280] text-[10px]">All sections extracted and indexed</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">Verified</span>
                  </div>

                  {/* Progress Step 2 */}
                  <div className="p-3.5 rounded-xl bg-[#F4F2FF] border border-[#583AFE]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-[#583AFE]/15 text-[#583AFE] border border-[#583AFE]/30 flex items-center justify-center text-xs">
                        <Scale size={13} />
                      </div>
                      <div>
                        <div className="text-[#0A0D14] text-xs font-semibold">Risk Analysis</div>
                        <div className="text-[#583AFE] text-[10px]">Flagged 3 high-liability clauses</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-medium text-[#583AFE] bg-[#583AFE]/10 border border-[#583AFE]/20 px-2 py-0.5 rounded-md">3 Flags</span>
                  </div>

                  {/* Realistic Redline Preview Box */}
                  <div className="p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full font-semibold">
                        §8.2 High Risk Flagged
                      </span>
                      <span className="text-[11px] text-[#6B7280]">Indemnification</span>
                    </div>
                    <p className="text-[#4B5565] line-through text-[11px] leading-relaxed">
                      &quot;Vendor shall defend and indemnify Customer from all liabilities without limitation.&quot;
                    </p>
                    <div className="p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed font-medium">
                      ✓ Suggested Redline: &quot;Liability capped at aggregate fees paid over the preceding 12 months with mutual carve-outs.&quot;
                    </div>
                  </div>
                </div>
              </MacWindow>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
