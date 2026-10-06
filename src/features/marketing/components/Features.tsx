"use client";

import React from "react";
import { motion } from "motion/react";
import { Zap, Lock, Scale, CheckCircle2 } from "lucide-react";

const features = [
  {
    icon: <Scale className="w-5 h-5 text-[#583AFE]" />,
    title: "Automated Risk Detection",
    tagline: "Liability protection",
    description:
      "Instantly flags uncapped indemnities, one-sided termination windows, intellectual property traps, and non-standard clauses.",
  },
  {
    icon: <Zap className="w-5 h-5 text-[#583AFE]" />,
    title: "One-Click Smart Redlines",
    tagline: "Actionable clause fixes",
    description:
      "Receive attorney-grade replacement language for high-risk terms. Compare side-by-side and accept balanced revisions in seconds.",
  },
  {
    icon: <Lock className="w-5 h-5 text-[#16A34A]" />,
    title: "Strict Confidentiality",
    tagline: "Zero retention guarantee",
    description:
      "Contracts are analyzed ephemerally in memory during your active session. Your sensitive legal data is never stored or used for model training.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-20 sm:py-28 relative z-10 bg-white border-t border-[#F0F2F5]">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
        
        {/* Eyebrow and Headline Pattern */}
        <div className="text-center mb-16">
          <span className="text-[#583AFE] text-[11px] font-semibold uppercase tracking-wider block mb-3">
            POWERFUL CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-normal tracking-[-0.03em] text-[#0A0D14] mb-4">
            Everything you need to review contracts <span className="text-[#583AFE]">faster</span>
          </h2>
          <p className="text-[#4B5565] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Spot risks before you sign, avoid costly disputes, and negotiate agreements from a position of strength.
          </p>
        </div>

        {/* 3-Card Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-[#F9FAFB] border border-[#E5E7EB] p-7 sm:p-8 rounded-2xl hover:border-[#D1D5DB] hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Icon Chip */}
                <div className="w-12 h-12 rounded-xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-6 shadow-2xs group-hover:scale-105 transition-transform">
                  {feature.icon}
                </div>

                <div className="text-[11px] font-semibold text-[#583AFE] uppercase tracking-wider mb-2">
                  {feature.tagline}
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-[#0A0D14] mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-[#4B5565] text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
