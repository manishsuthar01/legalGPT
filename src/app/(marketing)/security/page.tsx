import React from "react";
import Link from "next/link";
import { Shield, Lock, EyeOff, Server, FileCheck, ArrowRight } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Security, Privacy & Data Architecture — LegalGPT",
  description:
    "Learn how LegalGPT safeguards your sensitive legal contracts with zero-data persistence, in-memory processing, and sovereign vector isolation.",
  path: "/security",
  keywords: [
    "legal AI security",
    "contract privacy",
    "zero data retention",
    "confidential legal tech",
    "SOC2 legal AI",
  ],
});

const securityPillars = [
  {
    icon: EyeOff,
    title: "Zero Model Training",
    description:
      "We never use customer contracts, proprietary clauses, or confidential disclosures to train or fine-tune public or proprietary AI models.",
  },
  {
    icon: Lock,
    title: "In-Memory Parsing & Ephemeral Processing",
    description:
      "Uploaded documents are streamed and parsed into volatile memory. Once your analysis report and session complete, raw documents are scrubbed.",
  },
  {
    icon: Server,
    title: "Sovereign Vector Isolation",
    description:
      "Contract embeddings generated for the RAG assistant are partitioned with strict session-level UUIDs in Supabase pgvector with row-level security.",
  },
  {
    icon: FileCheck,
    title: "Stateless AI Inference",
    description:
      "Invocations to LLM inference providers (Google Gemini & Groq) enforce zero-day retention agreements ensuring prompts are never cached or logged.",
  },
];

export default function SecurityPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Security & Privacy", href: "/security" },
        ])}
      />

      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[var(--width-container)] mx-auto px-6">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/80 border border-edge text-silver mb-6 text-xs font-mono tracking-widest uppercase">
              <Shield className="w-3.5 h-3.5 text-accent" />
              <span>Institutional Privacy Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              Legal Confidentiality. <br />
              <span className="text-accent drop-shadow-[0_0_35px_rgba(124,92,252,0.35)]">
                Cryptographically Enforced.
              </span>
            </h1>
            <p className="text-silver text-base sm:text-lg leading-relaxed">
              Legal documents carry the most sensitive trade secrets, financial terms, and strategic roadmaps of your company. We architected LegalGPT with zero compromise on privacy.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {securityPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl bg-surface/60 border border-edge p-8 hover:border-accent/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-between p-3 mb-6">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h2 className="text-xl font-bold text-white mb-3">{pillar.title}</h2>
                  <p className="text-silver text-sm leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>

          {/* Technical Deep Dive */}
          <div className="rounded-2xl bg-surface/40 border border-edge p-10 mb-20">
            <h2 className="text-2xl font-bold text-white mb-6">Technical Architecture &amp; Data Lifecycle</h2>
            <div className="space-y-6 text-sm text-silver leading-relaxed">
              <p>
                <strong className="text-white">1. Transport Encryption:</strong> All client communications utilize TLS 1.3 with Perfect Forward Secrecy. Uploaded PDFs or raw text never pass over unencrypted connections.
              </p>
              <p>
                <strong className="text-white">2. Multi-Agent Pipeline Isolation:</strong> Our LangGraph pipeline processes documents through modular state transitions. When Tavily web search runs to check governing law statutes, only abstracted clause concepts (not your identifying client names or proprietary business terms) are queried.
              </p>
              <p>
                <strong className="text-white">3. Vector Partitioning:</strong> Clause chunk embeddings stored in Supabase pgvector use HNSW indexing isolated strictly by contract UUID. Cross-tenant retrieval is architecturally impossible.
              </p>
              <p>
                <strong className="text-white">4. Right to Erasure:</strong> You retain complete ownership. You can purge your contract session at any time, which cryptographically destroys vector embeddings and session state instantly.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link
              href="/app/contracts/mock-id"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(124,92,252,0.3)]"
            >
              <span>Audit Document Securely</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
