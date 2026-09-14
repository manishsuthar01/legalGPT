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
  {
    slug: "master-services-agreement",
    title: "Master Services Agreement (MSA)",
    shortDescription:
      "Complete guide to MSAs: Statement of Work (SOW) hierarchies, indemnification caps, IP carve-outs, and payment term traps.",
    summary:
      "A Master Services Agreement (MSA) establishes the foundational legal framework governing ongoing or repeated vendor-client engagements. Specific deliverables and pricing are governed by modular Statements of Work (SOWs), making the core MSA terms critical for long-term legal and financial liability.",
    targetAudience: [
      "Enterprise Vendors",
      "Software Development Agencies",
      "Consulting Firms",
      "B2B Service Providers",
    ],
    criticalClauseSlugs: [
      "limitation-of-liability",
      "indemnification",
      "warranty-disclaimer",
      "termination",
    ],
    commonRisks: [
      {
        title: "Conflicting Terms Between MSA and Statements of Work",
        severity: "high",
        description:
          "Ambiguity over whether SOW custom terms override master MSA liability protections.",
        recommendation:
          "Include a clear order-of-precedence clause specifying which document controls in the event of a conflict.",
      },
      {
        title: "Uncapped Consequential and Lost Profits Liability",
        severity: "high",
        description:
          "Customer contracts seeking recovery for lost sales or indirect losses caused by project delays or bugs.",
        recommendation:
          "Insist on mutual waivers of indirect, special, and consequential damages, and cap aggregate recovery to fees paid in the last 12 months.",
      },
      {
        title: "Vague Acceptance Criteria Triggering Payment Withholding",
        severity: "medium",
        description:
          "Clients having subjective discretion to reject deliverables indefinitely without paying milestone invoices.",
        recommendation:
          "Establish deemed-acceptance windows (e.g. 10 business days) where deliverables are considered approved unless specific written defects are filed.",
      },
    ],
    redFlags: [
      "Customer demands unilateral indemnification with no reciprocal IP indemnity",
      "Unlimited audit rights into vendor financial records and internal employee pay rates",
      "Termination for convenience without paying for work completed and non-cancelable commitments",
      "Overly broad 'all work made for hire' clauses transferring vendor pre-existing tools and code libraries",
    ],
    negotiationTips: [
      "Keep standard legal terms in the MSA and operational timelines strictly in SOWs.",
      "Explicitly carve out vendor background technology, libraries, and frameworks from customer assignment.",
      "Include interest charges on late invoices and allow service suspension if payments are overdue by more than 30 days.",
    ],
    whenToGetLegalAdvice:
      "Consult specialized corporate counsel when negotiating multi-year enterprise MSAs with foreign jurisdictions, government agencies, or contracts exceeding $250k in total value.",
    relatedContractSlugs: [
      "saas-agreement",
      "consulting-agreement",
      "data-processing-agreement",
    ],
    faqs: [
      {
        question: "How does an MSA differ from a Statement of Work (SOW)?",
        answer:
          "The MSA contains permanent governing terms like confidentiality, liability caps, dispute resolution, and warranties. The SOW contains project-specific details such as scope, milestones, deliverables, and fees. Multiple SOWs can sit under one MSA.",
      },
      {
        question: "What is an Order of Precedence clause in an MSA?",
        answer:
          "An order of precedence clause determines which document wins if an SOW and the MSA contradict each other. Typically, the MSA governs legal terms unless the SOW explicitly names the specific section it intends to modify.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "data-processing-agreement",
    title: "Data Processing Agreement (DPA)",
    shortDescription:
      "GDPR, CCPA, and DPDP compliance guide for DPAs: data breach notification timelines, sub-processor liability, and audit rights.",
    summary:
      "A Data Processing Agreement (DPA) regulates the processing of personal data between a data controller and a data processor under regulations like GDPR, CCPA, and global privacy frameworks. Poorly negotiated DPAs can expose software vendors to catastrophic regulatory fines and unlimited indemnities.",
    targetAudience: [
      "SaaS Founders & CTOs",
      "Cloud Infrastructure Providers",
      "Healthcare & Fintech Platforms",
      "Data Analytics Companies",
    ],
    criticalClauseSlugs: [
      "audit-rights",
      "limitation-of-liability",
      "indemnification",
      "confidentiality",
    ],
    commonRisks: [
      {
        title: "Unrealistic 24-Hour Breach Notification Deadlines",
        severity: "high",
        description:
          "Customers demanding notification of potential security incidents within 24 hours of first detection.",
        recommendation:
          "Negotiate notification 'without undue delay' or within 48 to 72 hours of confirming a verified breach.",
      },
      {
        title: "Super-Caps or Uncapped Liability for Privacy Breaches",
        severity: "high",
        description:
          "Customers demanding privacy indemnities be completely excluded from the contract's limitation of liability cap.",
        recommendation:
          "Negotiate a reasonable super-cap (e.g., 2x to 3x annual contract value) rather than uncapped exposure.",
      },
      {
        title: "Customer Approval Required for Every New Sub-Processor",
        severity: "medium",
        description:
          "Requiring explicit prior consent for adding new cloud vendors or database tools, halting feature deployments.",
        recommendation:
          "Provide general written authorization with a requirement to give 30 days prior notice and an opportunity to object.",
      },
    ],
    redFlags: [
      "Customer passing 100% of their statutory GDPR fines directly onto the processor",
      "On-site physical audit rights into shared multi-tenant data centers",
      "No customer obligation to ensure data was collected lawfully prior to sharing",
      "Immediate termination rights for minor technical non-compliance without cure periods",
    ],
    negotiationTips: [
      "Satisfy audit requirements using standard third-party certifications like SOC 2 Type II or ISO 27001.",
      "Ensure customer indemnifies you if they upload data collected in violation of privacy laws.",
      "Standardize on the European Commission's standard contractual clauses (SCCs) for cross-border transfers.",
    ],
    whenToGetLegalAdvice:
      "Engage a certified data privacy attorney when transferring personal data between the US, EU, and India, or handling HIPAA/health information.",
    relatedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "nda",
    ],
    faqs: [
      {
        question: "Is a Data Processing Agreement mandatory under GDPR?",
        answer:
          "Yes. Article 28 of GDPR strictly requires a written contract between data controllers and data processors that specifies the nature, purpose, duration, and categories of data processed.",
      },
      {
        question: "Can a DPA have its own separate liability cap?",
        answer:
          "Yes. Often parties agree that the general contract cap applies to DPAs, or establish a dedicated 'privacy super-cap' (typically 2x–5x annual subscription value) to cover data breach claims.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "ip-licensing-agreement",
    title: "Intellectual Property (IP) Licensing Agreement",
    shortDescription:
      "Navigate exclusive vs non-exclusive licenses, royalty calculations, sublicensing rights, field-of-use restrictions, and reversion clauses.",
    summary:
      "An Intellectual Property (IP) Licensing Agreement permits a licensee to use, commercialize, or integrate copyrighted material, trademarks, or patented technology owned by a licensor. Crucial terms dictate exclusivity, geographic scope, quality control, and royalty payment terms.",
    targetAudience: [
      "Software Authors & Creators",
      "Patent Holders",
      "Brand Owners & Franchisors",
      "Digital Media Studios",
    ],
    criticalClauseSlugs: [
      "ip-ownership",
      "audit-rights",
      "warranty-disclaimer",
      "termination",
    ],
    commonRisks: [
      {
        title: "Inadvertently Granting Exclusive Global Rights",
        severity: "high",
        description:
          "Careless wording turning a standard license into an exclusive grant that prevents the creator from using their own IP.",
        recommendation:
          "Always specify 'non-exclusive, non-transferable, revocable' unless receiving substantial exclusivity consideration.",
      },
      {
        title: "Uncontrolled Sublicensing Without Royalty Sharing",
        severity: "high",
        description:
          "Licensees sublicensing the IP to third-party resellers without paying pass-through royalties.",
        recommendation:
          "Explicitly require licensor approval for sublicensing and define net revenue splits on sublicensed commercialization.",
      },
      {
        title: "Ambiguous Derivative Works Ownership",
        severity: "medium",
        description:
          "Disputes over who owns code enhancements, translation models, or modifications made by the licensee.",
        recommendation:
          "Clarify that licensor retains underlying IP and enhancements, while licensee owns separate standalone components.",
      },
    ],
    redFlags: [
      "Perpetual licenses that cannot be terminated even for non-payment of royalties",
      "Absence of quality control provisions (can result in forfeiture of trademark rights)",
      "Unrestricted field-of-use allowing licensee to compete in licensor's core market",
      "No audit rights to inspect royalty sales reports and accounting books",
    ],
    negotiationTips: [
      "Tie exclusivity to minimum annual sales or royalty performance quotas.",
      "Reserve the right to audit licensee sales records annually with penalty fees if underreporting exceeds 5%.",
      "Include automatic reversion rights if the licensee files for bankruptcy or ceases commercialization.",
    ],
    whenToGetLegalAdvice:
      "Seek intellectual property counsel for patent monetization, global trademark syndication, or white-label OEM software distribution.",
    relatedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "consulting-agreement",
    ],
    faqs: [
      {
        question: "What happens to a license if the licensor sells the company?",
        answer:
          "Unless restricted by 'change of control' or assignment clauses, licensing agreements generally transfer to the acquiring entity. Licensees should ensure agreements survive acquisition.",
      },
      {
        question: "What is the difference between an assignment and a license?",
        answer:
          "An assignment is a permanent transfer of ownership (like selling a car). A license grants permission to use the IP while the licensor retains ownership (like leasing a car).",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "commercial-lease-agreement",
    title: "Commercial Lease Agreement",
    shortDescription:
      "Protect your business in commercial leases: CAM charges, personal guarantees, early termination options, and restoration liabilities.",
    summary:
      "A Commercial Lease Agreement governs the rental of commercial properties, offices, and retail spaces. Unlike residential leases, commercial leases offer virtually no statutory tenant protections, making careful negotiation of CAM expenses, personal guarantees, and build-out rights vital.",
    targetAudience: [
      "Startup Founders & Office Managers",
      "Retail & Restaurant Operators",
      "Coworking & Warehouse Tenants",
      "Commercial Landlords",
    ],
    criticalClauseSlugs: [
      "termination",
      "indemnification",
      "limitation-of-liability",
      "dispute-resolution-arbitration",
    ],
    commonRisks: [
      {
        title: "Uncontrolled Common Area Maintenance (CAM) Spikes",
        severity: "high",
        description:
          "Landlords passing through structural capital repairs, administrative overheads, and roof replacements into monthly rent.",
        recommendation:
          "Cap controllable CAM expense increases at 3%–5% annually and exclude capital expenditures from operating costs.",
      },
      {
        title: "Broad Personal Guarantees Threatening Personal Assets",
        severity: "high",
        description:
          "Founders personally co-signing commercial leases, putting personal savings and homes on the line if the startup folds.",
        recommendation:
          "Negotiate a 'Good Guy Guarantee' or burning guarantee that expires after 12–24 months of on-time rent payments.",
      },
      {
        title: "Burdensome End-of-Lease Restoration Obligations",
        severity: "medium",
        description:
          "Clauses forcing tenants to demolish custom tenant improvements and restore premises to raw concrete shell.",
        recommendation:
          "Specify that the tenant will surrender the space in broom-clean condition with reasonable wear and tear permitted.",
      },
    ],
    redFlags: [
      "Unilateral landlord right to relocate tenant to inferior space in the building",
      "Subleasing restrictions prohibiting assignment to corporate buyers or merger partners",
      "No rent abatement if building loses power, internet, or HVAC for extended periods",
      "Zero notice period before landlord locks doors for minor administrative defaults",
    ],
    negotiationTips: [
      "Secure early termination 'kick-out' clauses if business metrics or funding milestones are missed.",
      "Ensure tenant improvements (TI) allowances are paid upfront or deducted directly from monthly rent.",
      "Reserve the right to sublease or assign the space to an affiliate or acquirer without landlord fee gouging.",
    ],
    whenToGetLegalAdvice:
      "Always engage a commercial real estate lawyer prior to signing multi-year leases or providing personal guarantees exceeding $50k.",
    relatedContractSlugs: [
      "master-services-agreement",
      "partnership-agreement",
    ],
    faqs: [
      {
        question: "What is a Triple Net (NNN) lease?",
        answer:
          "In a Triple Net lease, the tenant pays base rent plus their proportionate share of property taxes, property insurance, and Common Area Maintenance (CAM) expenses.",
      },
      {
        question: "What is a 'Good Guy' guarantee in commercial leasing?",
        answer:
          "A Good Guy guarantee limits a founder's personal liability to the period they actually occupy the space. If the company gives advance notice and vacates broom-clean, personal liability ends upon handover.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "partnership-agreement",
    title: "Partnership & Founder Agreement",
    shortDescription:
      "Essential guide to founder and partnership agreements: equity vesting, drag-along rights, deadlocks, and non-compete restrictions.",
    summary:
      "A Partnership Agreement or Founders' Agreement establishes ownership stakes, equity vesting schedules, decision-making powers, and dissolution mechanisms between business partners. Clear rules around departure, intellectual property assignment, and buyouts prevent catastrophic corporate deadlocks.",
    targetAudience: [
      "Startup Co-Founders",
      "LLC & LLP Partners",
      "Joint Venture Collaborators",
      "Angel Investors",
    ],
    criticalClauseSlugs: [
      "non-compete",
      "dispute-resolution-arbitration",
      "ip-ownership",
      "termination",
    ],
    commonRisks: [
      {
        title: "Immediate 100% Equity Ownership Without Vesting",
        severity: "high",
        description:
          "A co-founder leaves after three months but keeps 50% of the startup's equity, rendering the company uninvestable.",
        recommendation:
          "Implement standard 4-year vesting with a 1-year cliff and accelerated vesting on acquisition (double-trigger).",
      },
      {
        title: "Equal 50/50 Deadlocks Without Tie-Breaking Mechanics",
        severity: "high",
        description:
          "Disputes between equal partners freezing corporate decisions, payroll, and strategic hiring.",
        recommendation:
          "Establish an independent advisory board member tie-breaker, shotgun buy-sell clause, or designated executive domain authority.",
      },
      {
        title: "Unclear IP Assignment to the Corporate Entity",
        severity: "high",
        description:
          "Founders developing code or patents personally without formal assignment to the company prior to incorporation.",
        recommendation:
          "Execute comprehensive Invention Assignment Agreements transferring all past, present, and future product IP to the company.",
      },
    ],
    redFlags: [
      "No buyback mechanism for departing founders' unvested shares at nominal value",
      "Unrestricted rights for partners to sell shares to external third-party competitors",
      "No drag-along or tag-along clauses for future company acquisitions",
      "Permitting partners to launch competing ventures while holding equity",
    ],
    negotiationTips: [
      "Document roles, expected weekly time commitments, and salary expectations upfront.",
      "Include a Russian Roulette (Shotgun) or appraisal-based buyout clause for irreconcilable deadlocks.",
      "Ensure all company intellectual property is formally assigned before writing any code or taking outside capital.",
    ],
    whenToGetLegalAdvice:
      "Retain a startup attorney before formal incorporation or allocating cap table equity among co-founders.",
    relatedContractSlugs: [
      "nda",
      "employment-agreement",
      "consulting-agreement",
    ],
    faqs: [
      {
        question: "What is a 1-year cliff in founder vesting?",
        answer:
          "A 1-year cliff means that if a founder leaves before completing 12 months of service, they walk away with 0% of their equity. After 12 months, 25% vests immediately, with the remainder vesting monthly over years 2–4.",
      },
      {
        question: "What happens if co-founders disagree 50/50 on a major decision?",
        answer:
          "Without a deadlock mechanism, companies often wind up in judicial dissolution (court liquidation). Partnership agreements avoid this via shotgun buy-sell clauses or assigning final tie-breaking votes to an independent advisory board.",
      },
    ],
    updatedAt: "2026-03-14",
  },
];

export function getContractBySlug(slug: string): ContractType | undefined {
  return contractsData.find((c) => c.slug === slug);
}

export function getAllContractSlugs(): string[] {
  return contractsData.map((c) => c.slug);
}
