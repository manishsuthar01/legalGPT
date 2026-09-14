import { ClauseType } from "@/lib/seo/types";

export const clausesData: ClauseType[] = [
  {
    slug: "indemnification",
    name: "Indemnification Clause",
    category: "Liability",
    riskLevel: "high",
    definition:
      "An indemnification clause (also called a 'hold harmless' provision) is a contractual agreement where one party promises to pay for legal costs, damages, or settlements incurred by the other party from third-party lawsuits.",
    whyItMatters:
      "Indemnification is one of the highest financial risks in any contract. An uncapped or one-sided indemnity can force a small company or contractor into bankruptcy to defend a lawsuit filed against a giant corporate partner.",
    standardLanguageExample:
      "Vendor agrees to defend, indemnify, and hold harmless Customer, its officers, directors, and employees from and against any third-party claims, liabilities, losses, or expenses (including reasonable attorneys' fees) arising out of Vendor's breach of this Agreement, gross negligence, or infringement of intellectual property rights.",
    redFlags: [
      "Unilateral indemnification where only you indemnify the other party",
      "Indemnifying for ordinary negligence rather than gross negligence or willful misconduct",
      "Indemnifying for claims arising from the other party's own actions or instructions",
      "No control over the legal defense or settlement negotiations",
      "Indemnity claims exempted from the contract's overall Limitation of Liability cap",
    ],
    saferAlternative:
      "Each party ('Indemnifying Party') agrees to defend and indemnify the other party from and against third-party claims arising solely from the Indemnifying Party's gross negligence, willful misconduct, or material breach, subject to the aggregate liability cap set forth in Section [Limitation of Liability]. The Indemnifying Party shall have sole control over defense and settlement.",
    relatedContractSlugs: ["saas-agreement", "consulting-agreement", "freelance-agreement"],
    relatedClauseSlugs: ["limitation-of-liability", "termination"],
    faqs: [
      {
        question: "Should indemnification be mutual or one-way?",
        answer:
          "In almost all commercial contracts, indemnification should be mutual. If you are required to indemnify the counterparty for IP infringement or breach, they should reciprocate by indemnifying you for claims caused by their platform, staff, or materials.",
      },
      {
        question: "Is indemnification capped by limitation of liability?",
        answer:
          "By default, counterparties often try to carve out indemnification from liability caps. Best practice for vendors and contractors is to ensure indemnity is either subject to the general cap or a negotiated 'super-cap' (e.g. 2x annual contract value).",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "limitation-of-liability",
    name: "Limitation of Liability (LoL)",
    category: "Liability",
    riskLevel: "high",
    definition:
      "A Limitation of Liability clause caps the maximum financial exposure either party can face in a lawsuit and disclaims indirect, punitive, and consequential damages (like lost profits).",
    whyItMatters:
      "Without this clause, a minor bug or delayed deliverable could trigger a lawsuit demanding millions in lost customer revenue or business interruption damages. It acts as the ultimate shield for your business.",
    standardLanguageExample:
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL EITHER PARTY BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR LOST REVENUES, ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT. NEITHER PARTY'S TOTAL AGGREGATE LIABILITY SHALL EXCEED THE TOTAL FEES PAID OR PAYABLE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.",
    redFlags: [
      "Missing limitation of liability clause altogether (creating unlimited legal exposure)",
      "Uncapped liability for simple breach of confidentiality or data protection",
      "One-sided caps where the vendor is capped at $100 but the customer has unlimited recovery",
      "Excessively narrow exclusions that fail to exclude lost profits and consequential damages",
    ],
    saferAlternative:
      "In no event shall either party's aggregate liability under or related to this Agreement exceed the total fees paid by Customer to Provider in the twelve (12) months preceding the incident. Neither party shall be liable for indirect, incidental, punitive, or consequential damages (including lost profits or business interruption), regardless of theory of liability.",
    relatedContractSlugs: ["saas-agreement", "freelance-agreement", "consulting-agreement"],
    relatedClauseSlugs: ["indemnification", "termination"],
    faqs: [
      {
        question: "What is the standard monetary cap in commercial contracts?",
        answer:
          "For software, consulting, and service contracts, the standard cap is the total fees paid or payable by the client under the contract in the preceding 12 months.",
      },
      {
        question: "What are consequential damages?",
        answer:
          "Consequential (or indirect) damages are financial losses that do not flow directly from the breach itself, but from the downstream consequences—such as lost sales, reputational harm, or lost investors. A proper LoL clause disclaims these entirely.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "termination",
    name: "Termination Clause (Cause & Convenience)",
    category: "Termination",
    riskLevel: "medium",
    definition:
      "The termination clause specifies how, when, and why a contract can be brought to an end—including termination for cause (breach) and termination for convenience (without reason).",
    whyItMatters:
      "A bad termination clause can trap you in an unprofitable, toxic relationship without an exit, or allow the counterparty to terminate overnight leaving you with unpaid invoices or sudden infrastructure shutdowns.",
    standardLanguageExample:
      "Either party may terminate this Agreement for convenience upon sixty (60) days' prior written notice. Either party may terminate immediately upon written notice if the other party materially breaches this Agreement and fails to cure such breach within thirty (30) days of receiving written notice thereof.",
    redFlags: [
      "Termination for convenience available only to one party",
      "Immediate termination for breach without a mandatory cure period (typically 30 days)",
      "Vague 'for cause' definitions that include subjective dissatisfaction",
      "No post-termination transition period or data retrieval rights",
      "Forfeiture of all fees upon termination",
    ],
    saferAlternative:
      "Either party may terminate this Agreement: (a) for convenience upon thirty (30) days' written notice, provided Customer pays all accrued fees for work performed up to the termination date; or (b) immediately if the other party materially breaches this Agreement and fails to cure such breach within thirty (30) days of written notification.",
    relatedContractSlugs: ["saas-agreement", "employment-agreement", "freelance-agreement", "nda"],
    relatedClauseSlugs: ["limitation-of-liability", "confidentiality"],
    faqs: [
      {
        question: "What is the difference between termination for cause and convenience?",
        answer:
          "Termination for cause occurs when one party breaks an important term (material breach), usually following a notice and cure period. Termination for convenience allows a party to exit at will for any reason, usually requiring 30–60 days notice.",
      },
      {
        question: "What is a 'cure period'?",
        answer:
          "A cure period gives the party accused of a breach a fixed window (typically 30 days) to rectify the issue before the contract is officially terminated.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "confidentiality",
    name: "Confidentiality & Non-Disclosure Clause",
    category: "Confidentiality",
    riskLevel: "medium",
    definition:
      "A confidentiality provision restricts how parties handle, protect, and share proprietary commercial, financial, or technical information exchanged during a contract.",
    whyItMatters:
      "If terms are too narrow, your confidential roadmaps or client lists can be leaked legally. If terms are too broad, you could be sued simply for using general skills you learned during the project.",
    standardLanguageExample:
      "Receiving Party shall protect Disclosing Party's Confidential Information with the same degree of care it uses for its own confidential information, but in no event less than reasonable care. Receiving Party shall not disclose Confidential Information to any third party except employees and legal advisors with a strict need to know.",
    redFlags: [
      "No expiration date on standard commercial data (perpetual confidentiality)",
      "Missing exclusions for publicly available or independently developed information",
      "Unilateral protection where only the counterparty's secrets are defended",
      "Strict liability for any breach without requirement of negligence or bad faith",
    ],
    saferAlternative:
      "Receiving Party shall hold Disclosing Party's Confidential Information in strict confidence for a period of three (3) years from disclosure. Confidential Information shall exclude information that is: (i) publicly known without breach; (ii) already in Receiving Party's possession without restriction; or (iii) independently developed without reference to Disclosing Party's data.",
    relatedContractSlugs: ["nda", "employment-agreement", "saas-agreement", "consulting-agreement"],
    relatedClauseSlugs: ["ip-ownership", "termination"],
    faqs: [
      {
        question: "Does confidentiality last forever?",
        answer:
          "Standard commercial confidentiality typically expires 2–3 years after disclosure. Only genuine trade secrets (such as proprietary formulas or source code) should have indefinite protection.",
      },
      {
        question: "Can I disclose confidential info if subpoenaed by a court?",
        answer:
          "Yes, provided the contract includes a 'compelled disclosure' carve-out requiring you to promptly notify the disclosing party so they can seek a protective order.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "ip-ownership",
    name: "Intellectual Property (IP) Assignment Clause",
    category: "IP",
    riskLevel: "high",
    definition:
      "An IP clause dictates who owns the code, designs, patents, trademarks, and writings created under the agreement, and whether pre-existing frameworks remain licensed or transferred.",
    whyItMatters:
      "Signing the wrong IP clause can cause you to inadvertently surrender ownership of your own core tech stack, SaaS platform, or personal side projects to an employer or client.",
    standardLanguageExample:
      "Upon receipt of full and final payment, Provider assigns to Customer all right, title, and interest in and to the custom deliverables created specifically for Customer under this Agreement. Provider retains all rights in its pre-existing materials, tools, and background intellectual property.",
    redFlags: [
      "Assigning IP before full payment has been received and cleared",
      "Transferring ownership of pre-existing background IP, libraries, or developer tools",
      "Employers claiming ownership of off-hours personal inventions created on private hardware",
      "Work-for-hire clauses applied to independent contractors without explicit deliverable definitions",
    ],
    saferAlternative:
      "Conditioned upon Customer's full payment of all fees, Provider assigns to Customer all copyright and patent rights in the bespoke deliverables. Provider retains sole ownership of all pre-existing tools, algorithms, and background IP, and grants Customer a perpetual, non-exclusive license to use such background IP solely as incorporated into the deliverables.",
    relatedContractSlugs: ["freelance-agreement", "employment-agreement", "consulting-agreement", "saas-agreement"],
    relatedClauseSlugs: ["confidentiality", "indemnification"],
    faqs: [
      {
        question: "What is 'Work Made for Hire'?",
        answer:
          "Under copyright law, 'Work Made for Hire' means the hiring party automatically owns the copyright from the moment of creation. For contractors, this only applies to specific statutory categories and requires a signed written agreement.",
      },
      {
        question: "How can contractors protect their reusable codebase?",
        answer:
          "Include a clear distinction between 'Custom Deliverables' (assigned upon payment) and 'Background Technology' (retained by contractor, licensed non-exclusively to client).",
      },
    ],
    updatedAt: "2026-03-01",
  },
];

export function getClauseBySlug(slug: string): ClauseType | undefined {
  return clausesData.find((c) => c.slug === slug);
}

export function getAllClauseSlugs(): string[] {
  return clausesData.map((c) => c.slug);
}
