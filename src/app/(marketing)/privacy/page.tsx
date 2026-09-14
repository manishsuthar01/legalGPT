import React from "react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd, getBreadcrumbSchema } from "@/lib/seo/json-ld";

export const metadata = createMetadata({
  title: "Privacy Policy — LegalGPT",
  description: "Learn how LegalGPT handles data privacy, zero-data retention, and encryption for contract documents.",
  path: "/privacy",
  noindex: false,
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        schema={getBreadcrumbSchema([
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy" },
        ])}
      />
      <div className="py-20 md:py-28 relative z-10">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">Privacy Policy</h1>
          <p className="text-silver text-xs font-mono mb-12">Last Updated: March 2026</p>

          <div className="space-y-8 text-silver text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">1. Our Core Privacy Commitment</h2>
              <p>
                We believe that contract intelligence must be privacy-first. We do not sell your personal data, and we do not use your confidential contract disclosures to train or fine-tune artificial intelligence models.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">2. Information Processed</h2>
              <p>
                When you use LegalGPT, we ingest contract text solely to perform clause extraction, risk assessment, and contextual vector search during your active session. All data in transit is encrypted using TLS 1.3.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">3. Subprocessors &amp; AI Providers</h2>
              <p>
                We utilize specialized AI infrastructure providers (Google Cloud Gemini and Groq) under strict API agreements that mandate zero data retention for inputs and outputs. Abstracted clause queries checked against web search APIs (such as Tavily) do not contain identifying company or personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">4. Your Rights (GDPR &amp; CCPA)</h2>
              <p>
                You have the right to request immediate deletion of any temporary session tokens or vector embeddings associated with your contract analysis. Contact privacy@legalgpt.ai for any data inquiries.
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
