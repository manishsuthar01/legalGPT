"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative pt-12 sm:pt-16 md:pt-20 pb-6 sm:pb-8 overflow-hidden bg-white text-center">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center">
        
        {/* Soft Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] mb-6 sm:mb-8 select-none"
        >
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          <span className="text-xs font-medium text-[#4B5565]">
            AI-Powered Contract Review &amp; Risk Detection
          </span>
        </motion.div>

        {/* Wollo Style Clean Large Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal tracking-[-0.03em] text-[#0A0D14] mb-5 leading-[1.08] max-w-4xl mx-auto"
        >
          Maximize Your Contract <br className="hidden sm:inline" />
          Intelligence
        </motion.h1>

        {/* Clear, Natural Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-[#4B5565] max-w-2xl mx-auto mb-8 sm:mb-9 leading-relaxed font-normal"
        >
          Uncover hidden liabilities, one-sided indemnity terms, and missing protections before you sign. Get attorney-grade redlines in seconds.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
        >
          <Link
            href="/app/contracts/new"
            className="flex items-center justify-center gap-2 bg-[#583AFE] hover:bg-[#4d32e6] text-white font-medium px-8 py-3.5 rounded-full text-[13px] transition-all shadow-sm hover:shadow-md active:scale-95 w-full sm:w-auto"
          >
            <span>Start Free Trial</span>
          </Link>
          <Link
            href="#demo"
            className="flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] hover:bg-[#F9FAFB] text-[#0A0D14] font-medium px-8 py-3.5 rounded-full text-[13px] transition-all active:scale-95 w-full sm:w-auto shadow-2xs"
          >
            <span>Explore Interactive Demo</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

