"use client";

import { motion } from "motion/react";
import Link from "next/link";

export const CTA = () => {
  return (
    <section className="py-24 mb-12">
      <div className="max-w-container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-surface border border-edge rounded-3xl p-12 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to transform your contract review?</h2>
            <p className="text-silver text-lg max-w-xl mx-auto mb-10">
              Join legal professionals saving hours on document analysis and review every single week.
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-accent text-white font-semibold hover:scale-[1.02] hover:bg-accent/90 transition-all duration-300"
            >
              Start Analyzing Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
