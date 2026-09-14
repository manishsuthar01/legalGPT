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
  {
    slug: "consequential-damages",
    term: "Consequential Damages",
    definition:
      "Damages that do not flow directly and immediately from an act of a party, but only from some of the consequences or results of such act (such as lost profits, lost revenues, or damage to business reputation).",
    simpleExplanation:
      "Secondary indirect financial losses—like lost future sales or damaged reputation—caused by a contract breach, which can easily exceed the total contract value.",
    exampleInContract:
      "'In no event shall either party be liable for any indirect, special, incidental, or consequential damages, including loss of profits, data, or goodwill.'",
    relatedClauseSlugs: ["limitation-of-liability", "indemnification"],
    relatedContractSlugs: ["saas-agreement", "master-services-agreement", "consulting-agreement"],
  },
  {
    slug: "cure-period",
    term: "Cure Period",
    definition:
      "A contractually defined window of time (often 15 to 30 days) granted to a breaching party to fix or remedy their default before the non-breaching party is legally entitled to terminate the contract or sue for damages.",
    simpleExplanation:
      "A formal grace period giving someone an opportunity to fix a breach before the deal is terminated or penalties hit.",
    exampleInContract:
      "'Either party may terminate this Agreement if the other party breaches any material term and fails to cure such breach within thirty (30) days of receiving written notice.'",
    relatedClauseSlugs: ["termination"],
    relatedContractSlugs: ["saas-agreement", "master-services-agreement", "commercial-lease-agreement"],
  },
  {
    slug: "representations-and-warranties",
    term: "Representations and Warranties",
    definition:
      "Formal statements of past or present facts ('representations') and continuing contractual promises of future truth or performance ('warranties') upon which a party relies when entering an agreement.",
    simpleExplanation:
      "Formal legal promises that facts about your company, code, and financial health are 100% accurate and will remain accurate.",
    exampleInContract:
      "'Vendor represents and warrants that it owns or possesses all necessary intellectual property rights to deliver the platform without infringing any third-party patent or copyright.'",
    relatedClauseSlugs: ["warranty-disclaimer", "indemnification"],
    relatedContractSlugs: ["master-services-agreement", "saas-agreement", "partnership-agreement"],
  },
  {
    slug: "injunctive-relief",
    term: "Injunctive Relief",
    definition:
      "A court order commanding a party to take a specific action or immediately cease an unlawful act (such as leaking confidential trade secrets or using stolen software code) when monetary damages alone would be inadequate.",
    simpleExplanation:
      "An emergency court order forcing someone to immediately stop doing something harmful, like leaking confidential trade secrets.",
    exampleInContract:
      "'The parties acknowledge that monetary damages would be inadequate for breach of confidentiality, and the disclosing party shall be entitled to seek immediate injunctive relief without posting a bond.'",
    relatedClauseSlugs: ["confidentiality", "non-compete"],
    relatedContractSlugs: ["nda", "employment-agreement", "partnership-agreement"],
  },
  {
    slug: "integration-clause",
    term: "Integration Clause (Entire Agreement)",
    definition:
      "A boilerplate contract term (also called a 'merger clause') stating that the written document represents the final, complete, and exclusive agreement between the parties, superseding all prior verbal talks, pitch decks, and emails.",
    simpleExplanation:
      "A rule saying: 'If it isn't written in this final contract, it doesn't count—regardless of what we promised in sales calls or emails.'",
    exampleInContract:
      "'This Agreement constitutes the entire understanding between the parties and supersedes all prior oral or written discussions, agreements, and representations regarding the subject matter.'",
    relatedClauseSlugs: ["warranty-disclaimer"],
    relatedContractSlugs: ["master-services-agreement", "saas-agreement", "consulting-agreement"],
  },
  {
    slug: "subrogation",
    term: "Waiver of Subrogation",
    definition:
      "A provision where an insured party waives the right of its insurance company to seek restitution or reimbursement from the counterparty after paying an insurance claim caused by that counterparty.",
    simpleExplanation:
      "Preventing your insurance company from suing your client or vendor to get their money back after an accident or insured loss.",
    exampleInContract:
      "'Each party hereby waives all rights of recovery against the other party for loss or damage covered by valid property or casualty insurance policies, including any right of subrogation.'",
    relatedClauseSlugs: ["limitation-of-liability", "indemnification"],
    relatedContractSlugs: ["commercial-lease-agreement", "master-services-agreement"],
  },
  {
    slug: "survival-clause",
    term: "Survival Clause",
    definition:
      "A provision specifying which contract sections (such as confidentiality, indemnification, limitation of liability, and governing law) remain in full legal effect even after the contract terminates or expires.",
    simpleExplanation:
      "A clause that keeps critical rules—like keeping secrets and liability caps—alive even after the business relationship ends.",
    exampleInContract:
      "'Sections [Confidentiality], [Limitation of Liability], [Indemnification], and [Governing Law] shall survive any termination or expiration of this Agreement.'",
    relatedClauseSlugs: ["termination", "confidentiality"],
    relatedContractSlugs: ["saas-agreement", "employment-agreement", "master-services-agreement"],
  },
  {
    slug: "waiver",
    term: "Waiver Clause",
    definition:
      "A provision stating that a party's failure or delay in enforcing a strict contract right on one occasion does not surrender or forfeit their right to enforce that rule in the future.",
    simpleExplanation:
      "Letting a late payment or minor violation slide once doesn't give the other party the right to do it forever.",
    exampleInContract:
      "'No failure or delay by either party in exercising any right or remedy under this Agreement shall operate as a waiver thereof, nor shall any single exercise preclude future enforcement.'",
    relatedClauseSlugs: ["termination"],
    relatedContractSlugs: ["saas-agreement", "master-services-agreement", "freelance-agreement"],
  },
  {
    slug: "estoppel",
    term: "Estoppel",
    definition:
      "A legal principle preventing a party from asserting a right or denying a fact when their previous words, conduct, or representations led the other party to reasonably rely on that state of affairs to their detriment.",
    simpleExplanation:
      "A legal rule preventing someone from going back on their word when the other side already spent money or made plans based on what they said.",
    exampleInContract:
      "'Tenant shall, within ten (10) business days of request, deliver a signed Tenant Estoppel Certificate certifying that the lease is unmodified and in full effect.'",
    relatedClauseSlugs: ["warranty-disclaimer"],
    relatedContractSlugs: ["commercial-lease-agreement", "partnership-agreement"],
  },
  {
    slug: "liquidated-damages",
    term: "Liquidated Damages",
    definition:
      "A pre-agreed financial amount set forth in a contract that a breaching party must pay as compensation if they violate a specific term (such as missing a strict software delivery deadline).",
    simpleExplanation:
      "A fixed penalty fee agreed upon in advance if someone misses a deadline or breaches a specific rule.",
    exampleInContract:
      "'In the event of unexcused project delivery delay beyond thirty (30) days, Vendor shall pay liquidated damages of $1,000 per business day of delay, up to a maximum of 10% of the total contract value.'",
    relatedClauseSlugs: ["limitation-of-liability", "termination"],
    relatedContractSlugs: ["master-services-agreement", "consulting-agreement", "freelance-agreement"],
  },
];

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
  return glossaryData.find((g) => g.slug === slug);
}

export function getAllGlossarySlugs(): string[] {
  return glossaryData.map((g) => g.slug);
}
