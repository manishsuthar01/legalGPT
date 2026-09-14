import { GlossaryTerm } from "@/lib/seo/types";

export const glossaryData: GlossaryTerm[] = [
  {
    slug: "indemnification",
    term: "Indemnification",
    definition:
      "A contractual obligation where one party (the indemnitor) promises to compensate the other party (the indemnitee) for certain damages, losses, or legal defense costs resulting from specified third-party claims.",
    simpleExplanation:
      "A legal promise to pay for someone else's legal troubles and lawsuit bills if something goes wrong because of your work.",
    exampleInContract:
      "'Contractor shall indemnify and hold harmless Client against any claims, losses, or damages arising out of Contractor's negligence or infringement of third-party intellectual property.'",
    relatedClauseSlugs: ["indemnification", "limitation-of-liability"],
    relatedContractSlugs: ["saas-agreement", "freelance-agreement", "consulting-agreement"],
  },
  {
    slug: "force-majeure",
    term: "Force Majeure",
    definition:
      "A contract provision that excuses one or both parties from fulfilling their contractual obligations upon the occurrence of extraordinary, unforeseeable events beyond their reasonable control (such as war, pandemics, or natural disasters).",
    simpleExplanation:
      "An 'act of God' clause that frees parties from penalties if an unforeseen disaster makes fulfilling the contract impossible.",
    exampleInContract:
      "'Neither party shall be liable for delay or failure to perform its obligations if caused by events beyond its reasonable control, including natural disasters, acts of war, or nationwide telecommunication failures.'",
    relatedClauseSlugs: ["termination"],
    relatedContractSlugs: ["saas-agreement", "consulting-agreement"],
  },
  {
    slug: "liability",
    term: "Liability",
    definition:
      "The state of being legally bound and responsible for damages, debt, or injury resulting from a breach of contract, tortious act, or statutory violation.",
    simpleExplanation:
      "The legal and financial responsibility to pay compensation when something breaks or an agreement is violated.",
    exampleInContract:
      "'Under no circumstances shall either party's aggregate liability exceed the total fees paid under this Agreement in the twelve months preceding the event.'",
    relatedClauseSlugs: ["limitation-of-liability", "indemnification"],
    relatedContractSlugs: ["saas-agreement", "freelance-agreement", "employment-agreement"],
  },
  {
    slug: "arbitration",
    term: "Arbitration",
    definition:
      "A private dispute resolution mechanism where an independent third party (an arbitrator) hears evidence and renders a binding legal decision, circumventing public court litigation.",
    simpleExplanation:
      "Resolving legal disputes privately with a hired judge instead of going to public court.",
    exampleInContract:
      "'Any dispute arising under this Agreement shall be resolved through binding confidential arbitration administered by the American Arbitration Association under its Commercial Rules.'",
    relatedClauseSlugs: ["termination"],
    relatedContractSlugs: ["employment-agreement", "saas-agreement", "consulting-agreement"],
  },
  {
    slug: "severability",
    term: "Severability",
    definition:
      "A standard boilerplate clause stating that if any individual provision of the contract is determined by a court to be illegal or unenforceable, the remaining terms of the contract will continue in full force and effect.",
    simpleExplanation:
      "If one sentence in the contract turns out to be illegal, the rest of the contract stays alive instead of the whole deal falling apart.",
    exampleInContract:
      "'If any provision of this Agreement is held to be invalid or unenforceable, such provision shall be modified to the minimum extent necessary, and the remaining provisions shall remain in full force.'",
    relatedClauseSlugs: ["termination"],
    relatedContractSlugs: ["nda", "saas-agreement", "employment-agreement", "freelance-agreement"],
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryData.find((g) => g.slug === slug);
}

export function getAllGlossarySlugs(): string[] {
  return glossaryData.map((g) => g.slug);
}
