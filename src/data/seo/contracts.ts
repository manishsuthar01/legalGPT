import { ContractType } from "@/lib/seo/types";

export const contractsData: ContractType[] = [
  {
    slug: "nda",
    title: "Non-Disclosure Agreement (NDA)",
    shortDescription:
      "Understand NDA risks, critical clauses, confidentiality traps, and what terms founders and freelancers should negotiate.",
    summary:
      "A Non-Disclosure Agreement (NDA), or confidentiality agreement, protects proprietary information when shared between parties. While routine, poorly drafted NDAs can lock you into perpetual liabilities, broad definitions of confidential information, or IP assignment traps.",
    targetAudience: [
      "Startup Founders",
      "Freelancers & Contractors",
      "Vendors & Agencies",
      "Software Developers",
    ],
    criticalClauseSlugs: ["confidentiality", "ip-ownership", "termination"],
    commonRisks: [
      {
        title: "Perpetual Confidentiality Term",
        severity: "high",
        description:
          "Obligations that never expire, creating indefinite legal exposure for ordinary commercial information.",
        recommendation:
          "Limit standard business information to 2–3 years; only keep bona fide trade secrets indefinite.",
      },
      {
        title: "Overly Broad Confidentiality Definition",
        severity: "high",
        description:
          "Defining everything disclosed (even public or pre-existing knowledge) as confidential without requiring written marking.",
        recommendation:
          "Include standard carve-outs (publicly known, pre-existing, independently developed, compelled disclosure).",
      },
      {
        title: "Hidden Non-Compete or Non-Solicit Restrictions",
        severity: "medium",
        description:
          "Sneaking employment or hiring restrictions into an NDA ostensibly meant only for evaluating partnerships.",
        recommendation:
          "Remove all non-compete clauses from preliminary NDAs; negotiate them only in definitive agreements.",
      },
    ],
    redFlags: [
      "One-way (unilateral) confidentiality where only your disclosures are exposed",
      "Injunctive relief without requirement to prove actual damages",
      "No standard carve-outs for information already known or independently developed",
      "Inclusion of intellectual property transfer or assignment language",
    ],
    negotiationTips: [
      "Always request a mutual NDA if both sides will exchange roadmap or business details.",
      "Cap the term between 1 and 3 years for standard commercial talks.",
      "Ensure verbal disclosures must be summarized in writing within 30 days to qualify as confidential.",
      "Exempt legally required disclosures under subpoena or regulatory request.",
    ],
    whenToGetLegalAdvice:
      "Seek formal attorney counsel if the NDA involves patentable technology disclosures, cross-border M&A discussions, or potential regulatory trade secrets.",
    relatedContractSlugs: ["saas-agreement", "consulting-agreement", "freelance-agreement"],
    faqs: [
      {
        question: "Is a unilateral NDA risky for a contractor or startup?",
        answer:
          "Yes. Unilateral NDAs obligate you to protect the other party's data while leaving any ideas, feedback, or proprietary methodologies you disclose completely unprotected.",
      },
      {
        question: "What is the standard duration of an NDA?",
        answer:
          "For commercial tech and business evaluations, 2 to 3 years from disclosure is market standard. Indefinite terms should strictly be reserved for true trade secrets (like proprietary source code or formulas).",
      },
      {
        question: "Can an NDA transfer IP ownership?",
        answer:
          "An NDA should never assign intellectual property. If you see 'assignment of inventions' or 'work made for hire' clauses in an NDA, strike them immediately.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "saas-agreement",
    title: "SaaS Agreement & Master Terms of Service",
    shortDescription:
      "A complete guide to SaaS contract risks: limitation of liability, uptime SLAs, data ownership, auto-renewals, and IP protection.",
    summary:
      "A Software-as-a-Service (SaaS) Agreement establishes the legal framework for cloud software subscriptions. It governs uptime guarantees, security responsibilities, data privacy compliance (GDPR/CCPA), intellectual property rights, and financial liability limits.",
    targetAudience: [
      "SaaS Founders & Vendors",
      "Procurement & IT Teams",
      "Enterprise Buyers",
      "Small Businesses",
    ],
    criticalClauseSlugs: ["limitation-of-liability", "indemnification", "termination", "ip-ownership"],
    commonRisks: [
      {
        title: "Uncapped Liability for Service Outages",
        severity: "high",
        description:
          "Failing to cap vendor liability to fees paid over the previous 12 months, exposing the business to catastrophic lawsuits.",
        recommendation:
          "Institute a standard aggregate cap equal to 12 months of fees paid, with a super-cap only for data breaches.",
      },
      {
        title: "Broad Customer Indemnification Demands",
        severity: "high",
        description:
          "Enterprise customers requiring SaaS vendors to indemnify them against all operational, privacy, and third-party claims.",
        recommendation:
          "Limit vendor indemnity strictly to third-party IP infringement claims arising from the core software.",
      },
      {
        title: "Predatory Auto-Renewal Traps",
        severity: "medium",
        description:
          "Multi-year automatic extensions requiring 90-day certified mail notice to cancel, locking buyers into unwanted subscriptions.",
        recommendation:
          "Require mutual 30-day written cancellation notice and clear annual renewal reminders.",
      },
    ],
    redFlags: [
      "Vendor claiming ownership or unrestricted derivative rights over customer data",
      "No SLA service credits or termination remedy for persistent downtime",
      "One-sided indemnity obligations with no vendor liability cap",
      "Vague data processing and sub-processor disclosure policies",
    ],
    negotiationTips: [
      "Negotiate a liability mutual aggregate cap tied to 12 months trailing subscription fees.",
      "Carve out customer-provided data from any vendor IP claims.",
      "Ensure data export rights in standard formats within 30 days of termination.",
      "Review SLA terms to ensure meaningful credits for sustained outages.",
    ],
    whenToGetLegalAdvice:
      "Consult enterprise counsel for contracts over $50k ACV, custom enterprise on-premises deployments, or when handling sensitive healthcare (HIPAA) or financial data.",
    relatedContractSlugs: ["nda", "consulting-agreement"],
    faqs: [
      {
        question: "What is a standard SaaS liability cap?",
        answer:
          "Market standard is equal to the total fees paid by the customer in the 12 months preceding the incident. Enterprise deals occasionally agree to a 'super-cap' of 2x-3x fees specifically for data breach or confidentiality breaches.",
      },
      {
        question: "Who owns AI outputs generated inside a SaaS platform?",
        answer:
          "Best practice states that customer inputs and generated outputs remain customer property, while the vendor retains ownership of the underlying algorithms, weights, and software.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "employment-agreement",
    title: "Employment Agreement & Executive Contract",
    shortDescription:
      "Review executive and employee contracts for non-competes, IP invention assignments, severance terms, and cause termination clauses.",
    summary:
      "An Employment Agreement sets out the obligations, compensation, equity vesting, intellectual property assignment, and exit terms between an employer and employee. Key friction points center on non-compete enforceability, moonlighting restrictions, and severance triggers.",
    targetAudience: [
      "Software Engineers & Executives",
      "Startup Founders Hiring Teams",
      "HR Directors",
      "Contractors Transitioning to Full-Time",
    ],
    criticalClauseSlugs: ["ip-ownership", "termination", "confidentiality"],
    commonRisks: [
      {
        title: "Overreaching Invention Assignment",
        severity: "high",
        description:
          "Claiming company ownership over everything you create on personal time, personal devices, and outside company scope.",
        recommendation:
          "Explicitly exclude prior inventions and personal projects created off-hours without company resources.",
      },
      {
        title: "Overly Restrictive Non-Competes",
        severity: "high",
        description:
          "Barring you from working in your entire industry or profession for 1–2 years after leaving.",
        recommendation:
          "Confirm state legality (e.g. California FTC rules ban non-competes) and narrow to direct direct competitors.",
      },
      {
        title: "Vague 'Cause' Termination Definitions",
        severity: "medium",
        description:
          "Allowing immediate firing and forfeiture of equity or severance for minor, subjective performance disputes.",
        recommendation:
          "Demand clear notice and a 30-day cure period before termination for cause takes effect.",
      },
    ],
    redFlags: [
      "Invention assignment with no exhibit to carve out pre-existing projects and patents",
      "Post-employment non-compete clauses covering excessive geographic or industry scope",
      "Unilateral ability of the employer to alter compensation or role without consent",
      "Clawback provisions on vested equity or earned bonuses",
    ],
    negotiationTips: [
      "List all pre-existing open source contributions, side businesses, and personal IP in the prior inventions disclosure schedule.",
      "Add a 30-day notice and cure period before 'for cause' termination can be executed.",
      "Clarify acceleration triggers for equity upon change of control (single or double trigger).",
    ],
    whenToGetLegalAdvice:
      "Always engage an employment attorney when reviewing C-suite equity compensation, severance agreements with non-disparagement waivers, or complex non-compete threats.",
    relatedContractSlugs: ["freelance-agreement", "consulting-agreement", "nda"],
    faqs: [
      {
        question: "Are non-compete agreements enforceable?",
        answer:
          "Enforceability depends heavily on jurisdiction. States like California, Minnesota, and Oklahoma prohibit employee non-competes entirely. In other jurisdictions, they must be strictly reasonable in duration (usually under 1 year) and geographic scope.",
      },
      {
        question: "Does an employer own my side projects?",
        answer:
          "If the contract includes a broad invention assignment clause and you haven't explicitly listed your side project on the exclusions exhibit, the employer could claim ownership—especially if you used company laptops or work hours.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "freelance-agreement",
    title: "Freelance & Independent Contractor Agreement",
    shortDescription:
      "Protect your freelance business: payment schedules, kill fees, scope creep defense, IP transfer upon payment, and liability caps.",
    summary:
      "A Freelance Agreement defines the scope of work, milestone deliverables, payment terms, and intellectual property rights between an independent contractor and a client. Clear agreements prevent scope creep, ensure timely payments, and clarify whether work is work-for-hire.",
    targetAudience: [
      "Freelancers & Solo Practitioners",
      "Agencies & Consultancies",
      "Founders Hiring Contractors",
      "Creative & Technical Freelancers",
    ],
    criticalClauseSlugs: ["ip-ownership", "limitation-of-liability", "termination", "indemnification"],
    commonRisks: [
      {
        title: "IP Transfer Before Full Payment",
        severity: "high",
        description:
          "Assigning copyright or code immediately upon creation rather than conditioning transfer upon receipt of full payment.",
        recommendation:
          "State clearly that IP ownership transfers to the client only after all project invoices are paid in full.",
      },
      {
        title: "No Kill Fee for Abrupt Cancellation",
        severity: "medium",
        description:
          "Client terminating the project midway without paying for reserved time, research, and partial deliverables.",
        recommendation:
          "Include a non-refundable upfront deposit and a kill fee covering work completed plus 25% of remaining value.",
      },
      {
        title: "Unlimited Liability for Bugs or Delays",
        severity: "high",
        description:
          "Signing client contracts that make the freelancer liable for lost business profits or indirect damages.",
        recommendation:
          "Cap total contractor liability to the fees actually paid under the specific statement of work.",
      },
    ],
    redFlags: [
      "Client demanding unlimited indemnification for third-party claims",
      "No revision limits or clear acceptance criteria, inviting endless unpaid revisions",
      "Net-60 or Net-90 payment terms with no late interest fees",
      "Exclusivity clauses preventing you from servicing other non-competing clients",
    ],
    negotiationTips: [
      "Always require a 30%–50% upfront deposit before kicking off milestone work.",
      "Limit revisions to 2 rounds per deliverable; charge an agreed hourly rate thereafter.",
      "Condition IP assignment on 100% full invoice clearance.",
      "Cap your liability strictly to the fees received for that specific milestone.",
    ],
    whenToGetLegalAdvice:
      "Consult counsel if the client demands indemnity for copyright infringement regarding third-party open source libraries or if contract classification risks employee misclassification fines.",
    relatedContractSlugs: ["consulting-agreement", "nda", "employment-agreement"],
    faqs: [
      {
        question: "When should intellectual property transfer to the client?",
        answer:
          "Market standard for contractors is conditional assignment: the client owns the work-product only after paying all invoices related to that deliverable.",
      },
      {
        question: "How do I defend against scope creep in a freelance agreement?",
        answer:
          "Define specific deliverables and include a change order clause stating any out-of-scope requests require a written estimate and additional milestone fee.",
      },
    ],
    updatedAt: "2026-03-01",
  },
  {
    slug: "consulting-agreement",
    title: "Master Consulting Services Agreement (MSA)",
    shortDescription:
      "Navigate consulting agreements: statements of work (SOW), warranties, IP licensing, contractor status, and dispute resolution.",
    summary:
      "A Consulting Agreement formalizes an advisory or specialized professional service engagement. It establishes billing rates, retainer terms, standard of care warranties, and boundaries between pre-existing consultant tools and bespoke client deliverables.",
    targetAudience: [
      "Management & IT Consultants",
      "Corporate Clients",
      "Boutique Advisory Firms",
      "Startup Advisors",
    ],
    criticalClauseSlugs: ["ip-ownership", "indemnification", "limitation-of-liability", "confidentiality"],
    commonRisks: [
      {
        title: "Forfeiture of Pre-Existing Frameworks & Tools",
        severity: "high",
        description:
          "Assigning your proprietary templates, spreadsheets, and software libraries to the client under blanket IP clauses.",
        recommendation:
          "Retain full ownership of pre-existing background IP; grant the client a non-exclusive license to use it with deliverables.",
      },
      {
        title: "Strict Performance Warranties",
        severity: "medium",
        description:
          "Guaranteeing specific commercial ROI or business outcomes rather than committing to professional standard of care.",
        recommendation:
          "Disclaim all implied warranties; warrant only that services will be performed in a professional, workmanlike manner.",
      },
      {
        title: "Disproportionate Indemnification",
        severity: "high",
        description:
          "Being asked to indemnify the client for decisions the client made based on consulting advice.",
        recommendation:
          "Strike advisory indemnities. Indemnification should strictly apply to willful misconduct or gross negligence.",
      },
    ],
    redFlags: [
      "No distinction between client bespoke work product and consultant background IP",
      "Warranties promising specific commercial sales increases or ROI metrics",
      "No clear procedure for approving and signing Statements of Work (SOWs)",
      "Non-solicitation of client staff with disproportionately high penalty fees",
    ],
    negotiationTips: [
      "Use modular Statements of Work (SOWs) so future engagements don't require renegotiating master legal terms.",
      "Explicitly carve out your background IP, methodologies, and advisory frameworks from client assignment.",
      "Add interest penalties (e.g. 1.5% per month) on delinquent invoices.",
    ],
    whenToGetLegalAdvice:
      "Get attorney review when structuring equity-for-advisory grants, cross-border tax withholdings, or non-solicitation disputes.",
    relatedContractSlugs: ["freelance-agreement", "saas-agreement", "nda"],
    faqs: [
      {
        question: "What is the difference between background IP and project deliverables?",
        answer:
          "Background IP includes frameworks, code libraries, and templates you created prior to or outside the engagement. Deliverables are the custom reports and solutions created specifically for the client. The client should own the deliverables, but only receive a license to background IP.",
      },
      {
        question: "Can an advisor be held liable for bad business results?",
        answer:
          "Not if the contract includes proper warranty disclaimers and limitation of liability clauses confirming the consultant provides advice, not business guarantees.",
      },
    ],
    updatedAt: "2026-03-01",
  },
];

export function getContractBySlug(slug: string): ContractType | undefined {
  return contractsData.find((c) => c.slug === slug);
}

export function getAllContractSlugs(): string[] {
  return contractsData.map((c) => c.slug);
}
