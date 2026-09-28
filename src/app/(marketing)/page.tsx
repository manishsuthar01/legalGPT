import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo/metadata";
import {
  Hero,
  RiskDashboard,
  Features,
  HowItWorks,
  Security,
  CTA,
} from "@/features/marketing";

export const metadata: Metadata = createMetadata({
  title: "AI Contract Review, Risk Analysis & Legal Intelligence",
  description:
    "Autonomous AI-powered contract analysis, clause risk detection, and legal advisory engine. Scan contracts in seconds for aggressive terms, liability risks, and missing protections.",
  path: "/",
  twitterCard: "summary_large_image",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <RiskDashboard />
      <Features />
      <HowItWorks />
      <Security />
      <CTA />
    </>
  );
}