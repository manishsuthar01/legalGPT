import {
  Hero,
  Features,
  HowItWorks,
  Security,
  CTA,
} from "@/features/marketing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Security />
      <CTA />
    </>
  );
}