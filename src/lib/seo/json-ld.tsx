import React from "react";
import { siteConfig } from "./config";
import { BreadcrumbItem, FaqItem } from "./types";
import { getAbsoluteUrl } from "./metadata";

interface JsonLdProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any>;
}

export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Generates Schema.org Organization structured data for LegalGPT.
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.siteUrl,
    logo: `${siteConfig.siteUrl}/logo/legalGPT_logo.png`,
    description: siteConfig.defaultDescription,
    sameAs: [
      "https://github.com/manishsuthar01/legalGPT",
      "https://twitter.com/legalgpt",
    ],
  };
}

/**
 * Generates Schema.org SoftwareApplication structured data.
 */
export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteConfig.defaultDescription,
    url: siteConfig.siteUrl,
    screenshot: `${siteConfig.siteUrl}/logo/legalGPT_logo.png`,
    featureList: [
      "Automated Contract Risk Audit",
      "Autonomous Multi-Agent Legal Web Research",
      "Clause-by-Clause Redlining & Alternative Recommendations",
      "Context-Aware RAG Legal Chat Assistant",
      "Jurisdiction-Specific Compliance Checks",
    ],
  };
}

/**
 * Generates Schema.org BreadcrumbList structured data.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: getAbsoluteUrl(item.href),
    })),
  };
}

/**
 * Generates Schema.org FAQPage structured data.
 */
export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
