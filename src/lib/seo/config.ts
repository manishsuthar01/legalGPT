/**
 * Resolves the canonical base URL for the site.
 * Prioritizes user configuration, then Vercel deployment variables,
 * and falls back cleanly to production domain.
 */
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://legalgpt.ai";
}

export const siteConfig = {
  siteName: "LegalGPT",
  siteUrl: resolveSiteUrl(),
  defaultTitle: "LegalGPT — AI Contract Review, Risk Analysis & Legal Intelligence",
  titleTemplate: "%s | LegalGPT",
  defaultDescription:
    "Autonomous AI-powered contract analysis, clause risk detection, and legal advisory engine. Scan contracts in seconds for aggressive terms, liability risks, and missing protections.",
  defaultOgImage: "/images/og-image.png",
  defaultTwitterImage: "/images/twitter-card.png",
  logoImage: "/logo/legalGPT_logo.png",
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@legalgpt",
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
