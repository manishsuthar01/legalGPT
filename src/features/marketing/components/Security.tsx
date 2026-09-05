"use client";

import React from "react";
import { motion } from "motion/react";
import { Shield } from "lucide-react";

export const Security = () => {
  return (
    <section id="security" className="py-28 relative z-10 text-center overflow-hidden">
      <div className="max-w-[var(--width-container)] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Badge matching reference image */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(124,92,252,0.1)] hover:border-accent/40 transition-colors">
            <Shield className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-silver">
              Security &amp; Privacy
            </span>
          </div>

          {/* Heading matching reference image */}
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Your Contracts. <br />
            <span className="text-accent drop-shadow-[0_0_40px_rgba(124,92,252,0.35)]">
              Completely Private.
            </span>
          </h2>

          {/* Paragraph text matching reference image */}
          <p className="text-silver text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            We built Legal-GPT with a privacy-first architecture. All contract text is processed in memory, never stored, and never used for any other purpose.
          </p>

          {/* Bullet points matching reference image */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-mono tracking-wider text-silver uppercase select-none">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Zero Data Storage</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>TLS 1.3 Encrypted</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>No Account Required</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
