"use client";

import React from "react";
import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";

export const Security = () => {
  return (
    <section id="security" className="py-20 sm:py-28 relative z-10 text-center overflow-hidden bg-white border-t border-[#F0F2F5]">
      <div className="max-w-[var(--width-container)] mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[#4B5565] mb-6">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span className="text-[11px] font-semibold tracking-wide uppercase">
              Security &amp; Privacy First
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-[-0.03em] text-[#0A0D14] mb-5 leading-[1.08]">
            Your contracts stay <br />
            <span className="text-[#583AFE]">
              100% confidential
            </span>
          </h2>

          {/* Paragraph text */}
          <p className="text-[#4B5565] text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-normal">
            Built for enterprise confidentiality. Documents are analyzed ephemerally in memory and never retained, logged, or used to train public AI models.
          </p>

          {/* Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-[#4B5565] select-none">
            <span className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              <span>In-Memory Processing</span>
            </span>
            <span className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-[#583AFE]" />
              <span>Zero AI Training</span>
            </span>
            <span className="flex items-center gap-2 bg-[#F9FAFB] border border-[#E5E7EB] px-4 py-2 rounded-full font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>End-to-End Encryption</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
