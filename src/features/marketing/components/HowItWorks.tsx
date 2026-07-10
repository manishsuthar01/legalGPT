"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Upload your contract",
    description: "Drag and drop your PDF or DOCX file into our secure vault."
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our legal AI scans the document, identifying clauses and potential risks."
  },
  {
    number: "03",
    title: "Review & Chat",
    description: "View the risk summary and chat directly with your document to clarify terms."
  }
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-surface/50 border-y border-edge">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, seamless workflow</h2>
            <p className="text-silver text-lg mb-10">We've designed Enigma to get out of your way. Upload your document and get insights immediately.</p>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 text-accent font-bold text-xl">{step.number}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-silver">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="frosted-glass rounded-2xl aspect-square lg:aspect-[4/5] flex items-center justify-center p-8 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" />
            <div className="relative z-10 w-full h-full border border-edge/50 rounded-xl bg-obsidian/80 flex items-center justify-center">
               <span className="text-silver/50">Interface Preview</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
