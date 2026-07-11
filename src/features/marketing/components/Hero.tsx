"use client";

import { motion } from "motion/react";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      <div className="max-w-container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium tracking-wide uppercase">AI-Powered Legal Assistant</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Review Contracts <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">
              10x Faster
            </span>
          </h1>
          <p className="text-lg md:text-xl text-silver max-w-2xl mx-auto mb-10 leading-relaxed">
            Upload your contracts, identify hidden risks instantly, and chat with your documents using advanced AI technology built for legal professionals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contracts/mock-id"
              className="px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:scale-[1.02] hover:bg-accent/90 transition-all duration-300 w-full sm:w-auto"
            >
              Get Started Free
            </Link>
            <Link 
              href="#how-it-works"
              className="px-8 py-4 rounded-xl bg-surface border border-edge text-white font-semibold hover:bg-edge transition-all duration-300 w-full sm:w-auto"
            >
              How it Works
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
