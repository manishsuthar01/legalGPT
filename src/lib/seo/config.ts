export const siteConfig = {
  siteName: "LegalGPT",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://legalgpt.ai",
  defaultTitle: "LegalGPT — AI Contract Review, Risk Analysis & Legal Intelligence",
  titleTemplate: "%s | LegalGPT",
  defaultDescription:
    "Autonomous AI-powered contract analysis, clause risk detection, and legal advisory engine. Scan contracts in seconds for aggressive terms, liability risks, and missing protections.",
  defaultOgImage: "/logo/legalGPT_logo.png",
  twitterHandle: "@legalgpt",
  locale: "en_US",
  author: "LegalGPT Team",
  keywords: [
    "AI contract review",
    "contract risk analysis",
    "legal AI assistant",
    "clause analyzer",
    "AI contract auditor",
    "NDA checker",
    "SaaS agreement review",
    "indemnification clause",
    "limitation of liability",
    "legal tech",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
