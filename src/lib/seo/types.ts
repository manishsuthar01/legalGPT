export interface SeoPageMeta {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noindex?: boolean;
  type?: "website" | "article";
  publishedAt?: string;
  updatedAt?: string;
  keywords?: string[];
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ContractRisk {
  title: string;
  severity: "high" | "medium" | "low";
  description: string;
  recommendation: string;
}

export interface ContractType {
  slug: string;
  title: string;
  shortDescription: string;
  summary: string;
  targetAudience: string[];
  criticalClauseSlugs: string[];
  commonRisks: ContractRisk[];
  redFlags: string[];
  negotiationTips: string[];
  whenToGetLegalAdvice: string;
  relatedContractSlugs: string[];
  faqs: FaqItem[];
  updatedAt: string;
}

export interface ClauseType {
  slug: string;
  name: string;
  category: "Liability" | "IP" | "Termination" | "Confidentiality" | "Employment" | "General";
  riskLevel: "high" | "medium" | "low";
  definition: string;
  whyItMatters: string;
  standardLanguageExample: string;
  redFlags: string[];
  saferAlternative: string;
  relatedContractSlugs: string[];
  relatedClauseSlugs: string[];
  faqs: FaqItem[];
  updatedAt: string;
}

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  simpleExplanation: string;
  exampleInContract: string;
  relatedClauseSlugs: string[];
  relatedContractSlugs: string[];
}

export interface JurisdictionStatute {
  name: string;
  code: string;
  impactOnContracts: string;
}

export interface JurisdictionType {
  slug: string;
  countryCode: string;
  flag: string;
  name: string;
  shortDescription: string;
  overview: string;
  legalSystem: "Common Law" | "Civil Law" | "Hybrid System";
  governingBody: string;
  keyStatutes: JurisdictionStatute[];
  mandatoryRequirements: string[];
  localRedFlags: string[];
  recommendedContractSlugs: string[];
  faqs: FaqItem[];
  updatedAt: string;
}

