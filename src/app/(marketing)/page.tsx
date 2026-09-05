import {
  Hero,
  RiskDashboard,
  Features,
  HowItWorks,
  Security,
  CTA,
} from "@/features/marketing";

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