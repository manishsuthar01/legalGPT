"use client";

import { motion } from "motion/react";

export const Security = () => {
  return (
    <section className="py-24 bg-obsidian text-center">
      <div className="max-w-container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-risk-low/10 border border-risk-low/20 text-risk-low mb-6 uppercase tracking-wider text-xs font-bold">
            Bank-grade Security
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Your documents are safe with us</h2>
          <p className="text-silver max-w-2xl mx-auto mb-12">
            We employ state-of-the-art encryption and never train our public models on your confidential data.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {["SOC2 Compliant", "AES-256 Encryption", "Zero Data Retention", "Private LLMs"].map((badge, i) => (
              <div key={i} className="px-4 py-2 rounded-lg bg-surface border border-edge text-sm text-silver font-medium hover:border-accent/30 transition-colors cursor-default">
                {badge}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
