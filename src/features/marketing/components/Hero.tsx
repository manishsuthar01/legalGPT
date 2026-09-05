"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
      {/* Soft Radial Purple Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none radial-purple-glow opacity-80" />

      <div className="max-w-[var(--width-container)] mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-surface border border-edge mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(124,92,252,0.1)] hover:border-accent/30 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[11px] font-semibold tracking-wider text-silver uppercase">
            AI-Powered Contract Auditor
          </span>
          <span className="text-accent text-xs">✦</span>
        </motion.div>

        {/* Huge Headline with Enigma Accent Pattern */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 leading-[1.08] max-w-5xl"
        >
          Review Contracts <br />
          <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.3)]">
            10x Faster
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-silver max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Upload your contracts, identify hidden risks instantly, and chat with your documents using advanced AI technology built for legal professionals.
        </motion.p>

        {/* CTA Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-14"
        >
          <Link
            href="/contracts/mock-id"
            className="group flex items-center justify-center gap-2.5 bg-accent text-white font-semibold px-8 py-4 rounded-xl text-base hover:scale-[1.02] hover:bg-accent/90 transition-all duration-300 shadow-[0_0_25px_rgba(124,92,252,0.35)] w-full sm:w-auto"
          >
            <span>Scan Your Contract</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="#demo"
            className="flex items-center justify-center gap-2 bg-surface border border-edge text-white font-medium px-8 py-4 rounded-xl text-base hover:bg-[#181818] hover:border-[#333] hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Interactive Demo</span>
          </Link>
        </motion.div>

        {/* Feasible Technical Badges Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-[11px] font-mono tracking-widest text-[#666] uppercase select-none"
        >
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent/80" /> In-Memory Parsing
          </span>
          <span className="text-[#333]">•</span>
          <span>Zero Persistent Storage</span>
          <span className="text-[#333]">•</span>
          <span className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-risk-low" /> Multi-Agent Verification
          </span>
          <span className="text-[#333]">•</span>
          <span>Instant Redlines</span>
        </motion.div>
      </div>
    </section>
  );
};
