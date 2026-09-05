"use client";

import React from "react";
import { motion } from "motion/react";
import { Zap, Lock, Scale, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <Scale className="w-6 h-6 text-accent" />,
    title: "Deterministic Guardrails",
    tagline: "Rule-based clause auditing",
    description:
      "Cross-references jurisdictional standards, standard market definitions, and legal guidelines to ensure consistent risk detection without hallucinations.",
    badge: "Rule-Based Engine",
  },
  {
    icon: <Zap className="w-6 h-6 text-accent" />,
    title: "Instant Redline Extraction",
    tagline: "Granular clause breakdown",
    description:
      "Deep semantic scanning flags uncapped indemnities, IP transfer traps, non-competes, and dangerous unilateral terminations in under 5 seconds.",
    badge: "Inline Redlines",
  },
  {
    icon: <Lock className="w-6 h-6 text-accent" />,
    title: "In-Memory Session Processing",
    tagline: "Ephemeral document handling",
    description:
      "Contracts are analyzed dynamically in memory during your active session. Files are never used for public LLM training or long-term retention.",
    badge: "Session Isolated",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6">
        
        {/* Eyebrow and Headline Pattern */}
        <div className="text-center mb-16">
          <span className="text-accent text-[11px] font-bold uppercase tracking-widest block mb-3">
            BUILT FOR ACCURACY
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Engineered for <span className="text-accent">high-stakes</span> legal review
          </h2>
          <p className="text-silver text-base md:text-lg max-w-2xl mx-auto">
            Combining focused legal reasoning graphs with session privacy for attorneys, founders, and contract reviewers.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative bg-[#111111] border border-edge p-8 rounded-2xl hover:border-accent/40 hover:scale-[1.02] transition-all duration-300 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
            >
              {/* Subtle hover gradient glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div>
                {/* Icon Chip */}
                <div className="w-12 h-12 rounded-xl bg-[#1a1a1f] border border-edge/80 flex items-center justify-center mb-6 group-hover:border-accent/30 group-hover:scale-110 transition-all duration-300">
                  {feature.icon}
                </div>

                <div className="text-[11px] font-mono text-accent uppercase tracking-wider mb-2 font-medium">
                  {feature.tagline}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-silver text-sm leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-edge/40 flex items-center gap-2 text-xs text-[#777] group-hover:text-silver transition-colors font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                <span>{feature.badge}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
