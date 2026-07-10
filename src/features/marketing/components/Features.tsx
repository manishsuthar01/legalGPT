"use client";

import { motion } from "motion/react";

const features = [
  {
    title: "Instant Risk Analysis",
    description: "Our AI highlights critical clauses, missing terms, and potential liabilities in seconds, categorizing them by risk level.",
    icon: "⚡"
  },
  {
    title: "Contextual Document Chat",
    description: "Ask complex legal questions and get precise answers backed by citations from your uploaded contract.",
    icon: "💬"
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade encryption ensures your confidential documents remain private and secure at all times.",
    icon: "🔒"
  }
];

export const Features = () => {
  return (
    <section className="py-24 bg-obsidian">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Everything you need to review contracts</h2>
          <p className="text-silver text-lg max-w-2xl mx-auto">Powerful features designed to streamline your legal workflow.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="bg-surface border border-edge p-8 rounded-2xl hover:border-accent/50 hover:scale-[1.02] transition-all duration-300"
            >
              <div className="text-4xl mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-silver leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
