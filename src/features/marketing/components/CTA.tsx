"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 mb-16 relative z-10">
      <div className="max-w-[var(--width-container)] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface border border-edge rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          {/* Radial purple background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[11px] font-semibold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START REVIEWING IN SECONDS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
              Ready to audit your contracts <br className="hidden sm:block" />
              with <span className="text-accent">superhuman confidence?</span>
            </h2>

            <p className="text-silver text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Upload any agreement today and discover what traditional manual reviews miss before you sign.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contracts/mock-id"
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base hover:scale-[1.02] hover:bg-accent/90 transition-all duration-300 shadow-[0_0_25px_rgba(124,92,252,0.35)] w-full sm:w-auto"
              >
                <span>Start Free Audit</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#demo"
                className="flex items-center justify-center px-8 py-4 rounded-xl bg-[#16161a] border border-edge text-white font-medium text-base hover:bg-edge hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
              >
                Explore Live Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
