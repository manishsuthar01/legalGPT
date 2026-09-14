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
  {
    slug: "non-compete",
    name: "Non-Compete Clause",
    category: "Employment",
    riskLevel: "high",
    definition:
      "A non-compete clause restricts an employee, contractor, or exiting founder from working for, advising, or establishing a competing business within a defined market, geographic region, and time frame post-termination.",
    whyItMatters:
      "Overbroad non-compete provisions can prevent you from earning a livelihood in your profession or force you to relocate. Even where state or federal regulations (like the FTC rule or California law) restrict enforcement, predatory employers still use them to intimidate workers.",
    standardLanguageExample:
      "During the term of employment and for a period of twelve (12) months thereafter, Employee shall not directly or indirectly engage in, perform services for, invest in, or operate any business that competes directly with the core SaaS products offered by Employer within the United States.",
    redFlags: [
      "Duration exceeding 12 months for standard employees or contractors",
      "Worldwide or unbounded geographic restrictions with vague market definitions",
      "Applying to low-level staff or independent contractors who possess no proprietary trade secrets",
      "No geographic or market carve-outs permitting work in related but non-competing software sectors",
    ],
    saferAlternative:
      "During the term of this Agreement and for six (6) months post-termination, Employee shall not provide direct consulting services to Named Competitors [List Specific Entities] in the specific technical capacity of [Core Specialization]. In jurisdictions where statutory post-employment covenants are prohibited, this section shall be void without affecting other provisions.",
    relatedContractSlugs: [
      "employment-agreement",
      "partnership-agreement",
      "freelance-agreement",
      "nda",
    ],
    relatedClauseSlugs: ["confidentiality", "non-solicitation", "termination"],
    faqs: [
      {
        question: "Are non-compete agreements legally enforceable?",
        answer:
          "Enforceability depends heavily on jurisdiction. California, Minnesota, Oklahoma, and North Dakota broadly ban non-competes. In states that allow them, courts will only enforce clauses that are reasonable in duration (under 1 year), geography, and protect legitimate trade secrets rather than ordinary competition.",
      },
      {
        question: "Can an independent contractor be bound by a non-compete?",
        answer:
          "In most jurisdictions, non-competes imposed on 1099 independent contractors are heavily disfavored and often trigger worker misclassification penalties. Non-disclosure and non-solicitation provisions are typically used instead.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "dispute-resolution-arbitration",
    name: "Dispute Resolution & Mandatory Arbitration",
    category: "General",
    riskLevel: "medium",
    definition:
      "A dispute resolution clause dictates the legal process by which contractual disagreements will be settled, commonly requiring mandatory binding arbitration instead of public civil litigation and waiving jury trials and class actions.",
    whyItMatters:
      "Arbitration is private and faster than court, but can be significantly more expensive for individuals and small startups because parties must pay private arbitrator hourly fees. Mandatory venue clauses can also force you to travel across the globe to litigate.",
    standardLanguageExample:
      "Any dispute, controversy, or claim arising out of or relating to this Agreement shall be settled by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The place of arbitration shall be Dover, Delaware, and judgment on the award may be entered in any court having jurisdiction.",
    redFlags: [
      "Mandatory venue in an inconvenient foreign jurisdiction where you have no physical presence",
      "Unilateral clause where the customer can sue in court, but you are forced into private arbitration",
      "Waiver of injunctive relief, preventing you from swiftly stopping IP or trade secret theft",
      "Clause forcing the losing party to pay all legal fees without exception (loser pays rule)",
    ],
    saferAlternative:
      "Prior to formal arbitration, the parties shall attempt in good faith to resolve any dispute through executive escalation for thirty (30) days. If unresolved, disputes shall be submitted to confidential binding arbitration administered by JAMS/AAA in the mutual home jurisdiction of the defendant, with each party bearing its own attorneys' fees unless frivolous.",
    relatedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "partnership-agreement",
      "commercial-lease-agreement",
    ],
    relatedClauseSlugs: ["limitation-of-liability", "termination"],
    faqs: [
      {
        question: "Is arbitration better than going to court?",
        answer:
          "Arbitration offers privacy, speed, and specialized decision-makers, making it favorable for IP and enterprise trade secrets. However, arbitration decisions cannot be appealed, and arbitrator fees ($500–$1,500/hr) can be prohibitive for small businesses.",
      },
      {
        question: "What is an informal negotiation escalation period?",
        answer:
          "It is a required 30-day window where C-level executives from both companies must meet to negotiate a business compromise before either party can file formal lawsuits or initiate costly arbitration.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "audit-rights",
    name: "Audit Rights & Compliance Clause",
    category: "General",
    riskLevel: "medium",
    definition:
      "An audit clause gives one party the right to inspect the other party's books, source code, data security practices, or facilities to verify compliance with licensing, financial payments, or data protection laws.",
    whyItMatters:
      "Poorly drafted audit clauses allow enterprise customers or licensors to disrupt your daily business operations, inspect proprietary code, or force you to pay for expensive third-party audit teams.",
    standardLanguageExample:
      "Upon reasonable prior written notice of at least thirty (30) business days, Licensor or its designated independent auditor may inspect Licensee's books, records, and systems during normal business hours to verify compliance with license metrics and royalty payments under this Agreement.",
    redFlags: [
      "Unannounced on-site physical audits into multi-tenant cloud or co-working environments",
      "Audits conducted by direct competitors or auditors paid on contingency fees",
      "More frequent than once per calendar year without documented reasonable suspicion of breach",
      "Burden-shifting clauses forcing you to pay the entire audit cost if an underpayment as small as 1% is discovered",
    ],
    saferAlternative:
      "Licensor may audit Licensee's records once per twelve (12) month period upon forty-five (45) days prior written notice. Any inspection shall be conducted during normal business hours by an independent certified accounting firm bound by confidentiality, without disrupting operations. If an audit reveals an underpayment exceeding five percent (5%), Licensee shall pay the reasonable cost of the audit.",
    relatedContractSlugs: [
      "saas-agreement",
      "data-processing-agreement",
      "ip-licensing-agreement",
      "master-services-agreement",
    ],
    relatedClauseSlugs: ["confidentiality", "limitation-of-liability"],
    faqs: [
      {
        question: "How can SaaS companies satisfy enterprise audit requirements?",
        answer:
          "Rather than granting direct access to source code or internal production servers, SaaS providers typically provide annual SOC 2 Type II reports, ISO 27001 certifications, and third-party penetration test summaries.",
      },
      {
        question: "What is a contingency-fee auditor?",
        answer:
          "A contingency-fee auditor receives a percentage of whatever unpaid fees or penalties they uncover. This creates an aggressive conflict of interest and should always be explicitly prohibited in the contract.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "warranty-disclaimer",
    name: "Warranty Disclaimer & 'As-Is' Provision",
    category: "Liability",
    riskLevel: "high",
    definition:
      "A warranty disclaimer eliminates express and statutory implied warranties—such as merchantability, fitness for a particular purpose, and uninterrupted uptime—providing products or software strictly on an 'as-is' and 'as-available' basis.",
    whyItMatters:
      "Under commercial law (like the UCC), sellers automatically warrant that goods and software are fit for standard use unless explicitly disclaimed in bold, capitalized, conspicuous text. Missing this clause leaves vendors liable for system outages and software bugs.",
    standardLanguageExample:
      "EXCEPT AS EXPRESSLY SET FORTH HEREIN, THE SERVICES AND DELIVERABLES ARE PROVIDED 'AS IS' AND 'AS AVAILABLE.' PROVIDER DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT, AND DOES NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE.",
    redFlags: [
      "Lack of conspicuous, uppercase, or bold text (courts can declare standard font disclaimers legally ineffective)",
      "Disclaimers that strip out the vendor's basic promise that they possess clear legal title to sell the product",
      "Failure to disclaim implied warranties of accuracy or third-party data availability",
      "Warranties promising 100% bug-free operation or 100% uptime with unlimited damages",
    ],
    saferAlternative:
      "Provider warrants that the Services will perform materially in accordance with the user documentation. EXCEPT FOR THE FOREGOING LIMITED WARRANTY, THE PLATFORM IS PROVIDED 'AS IS' WITHOUT WARRANTY OF ANY KIND. PROVIDER EXPRESSLY DISCLAIMS ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. CUSTOMER'S EXCLUSIVE REMEDY FOR BREACH OF WARRANTY SHALL BE RE-PERFORMANCE OR REFUND OF PRO-RATED FEES.",
    relatedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "ip-licensing-agreement",
      "consulting-agreement",
    ],
    relatedClauseSlugs: ["limitation-of-liability", "indemnification"],
    faqs: [
      {
        question: "Why are warranty disclaimers almost always written in ALL CAPS?",
        answer:
          "The Uniform Commercial Code (UCC) and contract case law require warranty disclaimers to be 'conspicuous.' Courts have historically held that bold, capitalized text satisfies the conspicuousness standard so buyers cannot claim they missed it.",
      },
      {
        question: "Can you disclaim intentional fraud or gross negligence?",
        answer:
          "No. Contractual disclaimers cannot legally waive liability for intentional fraud, intentional misrepresentation, gross negligence, or statutory violations in virtually all common-law jurisdictions.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "non-solicitation",
    name: "Non-Solicitation Provision",
    category: "Employment",
    riskLevel: "medium",
    definition:
      "A non-solicitation clause restricts a departing worker, agency, or contractor from actively recruiting employees of the counterparty, or poaching their clients and customers for a set duration.",
    whyItMatters:
      "Service businesses, agencies, and tech companies rely on non-solicitation provisions to prevent consultants or senior staff from taking team members or clients with them when they launch competing firms.",
    standardLanguageExample:
      "For a period of twelve (12) months following termination of this Agreement, neither party shall directly solicit, induce, or encourage any employee or independent contractor of the other party to terminate their employment or engagement, without prior written consent.",
    redFlags: [
      "Clauses that prohibit hiring an employee who responded independently to a public general job posting",
      "Banning contact with any customer of the counterparty, even if you never interacted with them",
      "Excessive liquidated damage penalties (e.g., demanding 200% of an employee's annual salary upon hire)",
      "Indefinite or perpetual non-solicitation restrictions",
    ],
    saferAlternative:
      "During the term and for one (1) year thereafter, neither party shall intentionally solicit for employment any employee of the other party with whom they had direct contact under this Agreement. This restriction shall not apply to general employment solicitations published to the public or employees who initiate contact on their own accord.",
    relatedContractSlugs: [
      "employment-agreement",
      "consulting-agreement",
      "master-services-agreement",
      "partnership-agreement",
    ],
    relatedClauseSlugs: ["non-compete", "confidentiality"],
    faqs: [
      {
        question: "What is the difference between direct solicitation and general recruitment?",
        answer:
          "Direct solicitation involves specifically reaching out to an individual employee with an offer to poach them. General recruitment involves posting a job opening on LinkedIn or your company website; hiring someone who applies to an open job is generally permitted if carved out.",
      },
      {
        question: "Are non-solicitation clauses enforceable in California?",
        answer:
          "In California, employee non-solicitation agreements are viewed with heavy skepticism by courts as indirect restraints on trade under Business and Professions Code § 16600, while customer non-solicitation is strictly limited to protecting verified trade secrets.",
      },
    ],
    updatedAt: "2026-03-14",
  },
];

export function getClauseBySlug(slug: string): ClauseType | undefined {
  return clausesData.find((c) => c.slug === slug);
}

export function getAllClauseSlugs(): string[] {
  return clausesData.map((c) => c.slug);
}
