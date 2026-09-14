import React from "react";
import Link from "next/link";
import {
  BrainCircuit,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Search,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema, getFaqSchema } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/seo/InternalLinking";

export const metadata = createMetadata({
  title: "LegalGPT vs ChatGPT & General LLMs — Why Specialized Legal AI Wins",
  description:
    "Why raw ChatGPT hallucinates legal citations and fails at 40-page contract analysis. Compare LegalGPT's 9-node LangGraph multi-agent architecture, live statutory research, and zero-data training guarantees.",
  path: "/compare/legalgpt-vs-chatgpt",
  keywords: [
    "LegalGPT vs ChatGPT",
    "can ChatGPT review contracts",
    "ChatGPT legal hallucinations",
    "specialized legal AI vs Claude",
    "AI contract analysis multi-agent",
  ],
});

export default function LegalGptVsChatGptPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Comparisons", href: "/compare" },
    { label: "LegalGPT vs ChatGPT", href: "/compare/legalgpt-vs-chatgpt" },
  ];

  const faqs = [
    {
      question: "Why shouldn't I just paste contracts into ChatGPT or Claude?",
      answer:
        "General chatbots lack recursive legal chunking, meaning they lose track of defined terms across long documents. Furthermore, free and consumer tiers of general LLMs may use your proprietary contract disclosures to train future AI models unless strict enterprise opt-outs are configured.",
    },
    {
      question: "How does LegalGPT prevent legal hallucinations?",
      answer:
        "LegalGPT uses a 9-node LangGraph workflow that pairs extracted clauses with live web legal research (via Tavily) to verify statutes before passing evidence to two independent agents: a strict Legal Reviewer and a commercial Legal Advisor.",
    },
    {
      question: "Does LegalGPT train on the contracts I upload?",
      answer:
        "Never. LegalGPT enforces strict zero-data retention. Your documents are processed in-memory for the duration of your session and are never used to train public foundation models.",
    },
  ];

  return (
    <>
      <JsonLd schema={getBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={getFaqSchema(faqs)} />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          <Breadcrumbs items={breadcrumbs} />

          {/* Header */}
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent mb-6 text-xs font-mono">
              <BrainCircuit className="w-3.5 h-3.5" />
              <span>Specialized Legal RAG vs Generic AI</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              LegalGPT vs ChatGPT: <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Why Specialized Architecture Matters
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Pasting a 40-page enterprise contract into a generic chatbot like ChatGPT or Claude seems convenient—until it hallucinates a fake statute, misses a buried indemnity carve-out, or trains on your company&apos;s confidential IP. Here is how LegalGPT is engineered differently.
            </p>
          </div>

          {/* Core Architectural Differences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center mb-4">
                <Search className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Citation Grounding</h3>
              <div className="text-2xl font-bold text-white mb-2">Live Statutory Verification</div>
              <p className="text-silver text-xs leading-relaxed">
                Generic LLMs guess legal citations from static training weights. LegalGPT conducts live statutory research on every flagged clause to verify enforceable precedent.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Document Scale</h3>
              <div className="text-2xl font-bold text-white mb-2">Hierarchical Chunking</div>
              <p className="text-silver text-xs leading-relaxed">
                Chatbots suffer from &ldquo;lost in the middle&rdquo; syndrome on 40-page PDFs. LegalGPT isolates, embeds, and traces each individual clause to its exact definitions.
              </p>
            </div>

            <div className="rounded-2xl bg-surface/60 border border-edge p-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center mb-4">
                <Lock className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xs font-mono uppercase text-silver mb-1">Data Privacy</h3>
              <div className="text-2xl font-bold text-white mb-2">Zero-Data Retention</div>
              <p className="text-silver text-xs leading-relaxed">
                Your private contracts, pricing terms, and NDAs are never used for model training. Sessions process in memory with complete data segregation.
              </p>
            </div>
          </div>

          {/* Deep Architectural Teardown */}
          <div className="rounded-3xl bg-surface/40 border border-edge p-8 md:p-12 mb-20">
            <h2 className="text-2xl font-bold text-white mb-3">
              The 3 Critical Flaws of Using Generic Chatbots for Legal Work
            </h2>
            <p className="text-silver text-xs mb-10 max-w-2xl">
              Why general-purpose foundation models are dangerous when applied to legally binding documents without domain scaffolding.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-silver">
              {/* Flaw 1 */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono">
                  1
                </div>
                <h3 className="text-base font-bold text-white">The Hallucination Danger</h3>
                <p className="leading-relaxed">
                  General LLMs are trained to generate persuasive text, not truth. In high-profile legal incidents (e.g. Mata v. Avianca), generic models fabricated non-existent judicial decisions and statutory codes.
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-accent">
                  <strong>LegalGPT Defense:</strong> Live web retrieval via Tavily verifies governing statutes before generating review findings.
                </div>
              </div>

              {/* Flaw 2 */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono">
                  2
                </div>
                <h3 className="text-base font-bold text-white">Cross-Clause Blindness</h3>
                <p className="leading-relaxed">
                  A limitation of liability clause in Section 11 is completely altered by an uncapped indemnity carve-out buried in Section 18. Generic chatbots review linearly and often miss critical cross-sectional interactions.
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-accent">
                  <strong>LegalGPT Defense:</strong> Multi-node LangGraph splits clauses, maps global dependencies, and scores aggregate contract exposure.
                </div>
              </div>

              {/* Flaw 3 */}
              <div className="space-y-3">
                <div className="w-8 h-8 rounded-lg bg-red-950/50 border border-red-500/40 flex items-center justify-center text-red-400 font-bold font-mono">
                  3
                </div>
                <h3 className="text-base font-bold text-white">Lack of Domain Prompt Engineering</h3>
                <p className="leading-relaxed">
                  A generic prompt like &ldquo;review this contract&rdquo; returns vague bullet points. It fails to calculate standard super-caps, identify missing arbitration rules, or evaluate local employment covenants.
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-accent">
                  <strong>LegalGPT Defense:</strong> Two-tier architecture with separate Reviewer (strict auditor) and Advisor (commercial redlines) agents.
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Capability Table */}
          <div className="rounded-3xl bg-surface/40 border border-edge p-8 md:p-10 mb-20 overflow-x-auto">
            <h2 className="text-2xl font-bold text-white mb-2">Direct Technical Comparison</h2>
            <p className="text-silver text-xs mb-8">Detailed architectural specifications.</p>

            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-edge text-silver font-mono uppercase text-[11px]">
                  <th className="py-3 px-4">Feature</th>
                  <th className="py-3 px-4">ChatGPT / Claude (Standard)</th>
                  <th className="py-3 px-4 text-accent font-bold">LegalGPT Specialized Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-edge/40 text-silver">
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Architecture</td>
                  <td className="py-3.5 px-4">Single conversational LLM prompt</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">9-node LangGraph Multi-Agent Pipeline</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">External Legal Verification</td>
                  <td className="py-3.5 px-4 text-red-400">None (static pre-training data)</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Tavily Search + Statutory Grounding</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Clause Risk Scoring</td>
                  <td className="py-3.5 px-4 text-red-400">Subjective text descriptions</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">0–100 Quantitative Aggregate Risk Metric</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Replacement Language</td>
                  <td className="py-3.5 px-4">Generic summaries</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Attorney-vetted balanced redline clauses</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-white font-medium">Data Privacy Policy</td>
                  <td className="py-3.5 px-4 text-amber-400">May train on consumer prompts</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold">Guaranteed Zero-Data Model Training</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-surface via-[#171228] to-surface border border-accent/40 p-10 text-center mb-20">
            <h2 className="text-2xl font-bold text-white mb-3">
              Experience the Multi-Agent Legal Difference
            </h2>
            <p className="text-silver text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              Stop guessing with generic chatbots. Upload your contract to LegalGPT for grounded risk detection, verified citations, and instant redlines.
            </p>
            <Link
              href="/app/contracts/new"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Scan Contract in LegalGPT</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQs */}
          <section className="border-t border-edge pt-14">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {faqs.map((faq) => (
                <div key={faq.question} className="p-6 rounded-2xl bg-surface/40 border border-edge">
                  <h3 className="text-white text-sm font-semibold mb-2">{faq.question}</h3>
                  <p className="text-silver text-xs leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
