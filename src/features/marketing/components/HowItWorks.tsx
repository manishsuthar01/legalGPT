"use client";

import React from "react";
import { motion } from "motion/react";
import { Upload, Cpu, MessageSquareText, Check, ArrowRight } from "lucide-react";
import { MacWindow } from "@/components/ui/MacWindow";

const steps = [
  {
    number: "01",
    icon: <Upload className="w-5 h-5 text-accent" />,
    title: "Secure Contract Ingestion",
    description:
      "Upload your PDF or DOCX agreement. Documents are encrypted and parsed into granular semantic clauses in memory.",
  },
  {
    number: "02",
    icon: <Cpu className="w-5 h-5 text-accent" />,
    title: "Multi-Agent Risk Audit",
    description:
      "Our LangGraph reasoning engine triggers specialized Legal Advisor and Reviewer agents to verify statutory alignment.",
  },
  {
    number: "03",
    icon: <MessageSquareText className="w-5 h-5 text-accent" />,
    title: "Interactive Redlines & Q&A",
    description:
      "Review flagged liabilities with automated one-click redlines, or chat directly with the contract to clarify obligations.",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative z-10 bg-surface/30 border-y border-edge">
      <div className="max-w-[var(--width-container)] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Steps */}
          <div className="lg:col-span-6">
            <span className="text-accent text-[11px] font-bold uppercase tracking-widest block mb-3">
              INTELLIGENT PIPELINE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Simple, <span className="text-accent">seamless</span> workflow
            </h2>
            <p className="text-silver text-base md:text-lg mb-10 leading-relaxed">
              We&apos;ve engineered LegalGPT to get straight to answers. From raw upload to actionable legal counsel in under 15 seconds.
            </p>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex gap-4 p-4 rounded-xl border border-edge/60 bg-[#0d0d0f] hover:border-accent/30 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#16161a] border border-edge flex items-center justify-center flex-shrink-0 group-hover:border-accent/40 group-hover:scale-105 transition-all">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-accent font-bold">
                        {step.number}
                      </span>
                      <h3 className="text-base font-semibold text-white">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-silver text-xs sm:text-sm leading-relaxed">
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
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <MacWindow
                title="pipeline_status.graph"
                statusBadge={
                  <span className="text-risk-low text-[10px] font-mono flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-risk-low animate-pulse" />
                    LIVE PIPELINE
                  </span>
                }
              >
                <div className="p-6 bg-[#0b0b0e] space-y-4">
                  {/* Progress Step 1 */}
                  <div className="p-3.5 rounded-xl bg-[#111116] border border-edge flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-risk-low/20 text-risk-low flex items-center justify-center text-xs">
                        <Check className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">Semantic Clause Chunking</div>
                        <div className="text-[#666] text-[11px] font-mono">14 distinct legal sections indexed</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-silver bg-[#1c1c24] px-2 py-0.5 rounded">0.8s</span>
                  </div>

                  {/* Progress Step 2 */}
                  <div className="p-3.5 rounded-xl bg-[#111116] border border-accent/40 shadow-[0_0_15px_rgba(124,92,252,0.1)] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-mono animate-pulse">
                        ✦
                      </div>
                      <div>
                        <div className="text-white text-xs font-semibold">Multi-Agent Legal Audit</div>
                        <div className="text-accent text-[11px] font-mono">Cross-checking indemnification precedent</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded animate-pulse">RUNNING</span>
                  </div>

                  {/* Progress Step 3 */}
                  <div className="p-3.5 rounded-xl bg-[#0e0e12] border border-edge/40 opacity-70 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#1e1e24] text-[#666] flex items-center justify-center text-xs font-mono">
                        3
                      </div>
                      <div>
                        <div className="text-silver text-xs font-semibold">Synthesis & Redlines</div>
                        <div className="text-[#555] text-[11px] font-mono">Generating attorney summary</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#555]">QUEUED</span>
                  </div>

                  {/* Mini Code/Log Output Box */}
                  <div className="p-3 rounded-lg bg-[#060608] border border-edge/60 font-mono text-[11px] text-silver space-y-1">
                    <div className="text-[#555]">// Live LangGraph Node Output</div>
                    <div className="text-accent">&gt; node: &quot;legal-advisor&quot; triggered</div>
                    <div className="text-risk-high">&gt; flag: Uncapped Indemnity (Section 8.2)</div>
                    <div className="text-risk-low">&gt; generated: reciprocal cap amendment</div>
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
