"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Scale } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-16 sm:py-24 relative z-10 bg-white">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0A0D14] rounded-[28px] sm:rounded-[36px] p-8 sm:p-16 text-center relative overflow-hidden shadow-xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#D1D5DB] text-[11px] font-medium tracking-wide mb-6">
              <Scale className="w-3.5 h-3.5 text-[#583AFE]" />
              <span>GET STARTED TODAY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-normal !text-white mb-5 tracking-tight leading-tight">
              Review contracts in seconds <br className="hidden sm:block" />
              with <span className="!text-[#A5B4FC]">total confidence</span>
            </h2>

            <p className="!text-[#CBD5E1] text-xs sm:text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-normal">
              Join founders, legal counsel, and business owners who catch risky clauses and negotiate better contracts before signing.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/app/contracts/new"
                className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#583AFE] hover:bg-[#4d32e6] text-white font-semibold text-xs transition-all shadow-md active:scale-95 w-full sm:w-auto"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="#demo"
                className="flex items-center justify-center px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs transition-all w-full sm:w-auto"
              >
                Explore Interactive Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
