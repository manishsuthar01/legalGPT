import { JurisdictionType } from "@/lib/seo/types";

export const jurisdictionsData: JurisdictionType[] = [
  {
    slug: "india",
    countryCode: "IN",
    flag: "🇮🇳",
    name: "India",
    shortDescription:
      "Essential guide to contract law in India: Section 27 non-compete voidness, state-specific stamp duty, and DPDP Act compliance.",
    overview:
      "Contracts in India are primarily governed by the Indian Contract Act, 1872, alongside state-specific Stamp Acts and the Digital Personal Data Protection (DPDP) Act, 2023. Indian courts take a strictly protective stance toward employees and require mandatory payment of stamp duty for contracts to be admissible as evidence in court.",
    legalSystem: "Common Law",
    governingBody: "Supreme Court of India & High Courts; Ministry of Corporate Affairs (MCA)",
    keyStatutes: [
      {
        name: "Indian Contract Act, 1872",
        code: "Section 27 (Agreement in Restraint of Trade)",
        impactOnContracts:
          "Renders post-employment non-compete agreements completely void and unenforceable, regardless of duration or geographic scope. Employers cannot restrict workers after departure.",
      },
      {
        name: "Indian Stamp Act, 1899 (and State Acts)",
        code: "Section 35 (Inadmissibility for Non-Stamping)",
        impactOnContracts:
          "Unstamped or insufficiently stamped commercial agreements cannot be admitted as evidence in court or enforced in arbitration until the deficit stamp duty and penalty (up to 10x) is paid.",
      },
      {
        name: "Digital Personal Data Protection Act, 2023",
        code: "DPDP Act (Data Fiduciary Obligations)",
        impactOnContracts:
          "Mandates strict statutory processing agreements with data processors, requiring reasonable security safeguards and notification of breaches to the Data Protection Board.",
      },
      {
        name: "Specific Relief Act, 1963",
        code: "Section 14 & 20A (Specific Performance)",
        impactOnContracts:
          "Contracts determinable in nature (such as those terminable at will without cause) cannot be enforced through injunctions or specific performance; only damages may be sought.",
      },
    ],
    mandatoryRequirements: [
      "Physical or digital e-stamping (e-Stamp certificate) according to state stamp duty schedules (e.g. Maharashtra, Karnataka, Delhi).",
      "Valid lawful consideration (quid pro quo) that is not unlawful or opposed to public policy.",
      "Dual signature execution with mutual capacity (competence under Section 11).",
      "Digital execution compliant with the Information Technology Act, 2000 (Aadhaar e-Sign or DSC Class 3).",
    ],
    localRedFlags: [
      "Including post-termination non-compete covenants that violate Section 27 of the Indian Contract Act.",
      "Failure to pay adequate state stamp duty, causing arbitration agreements to be impounded by courts.",
      "Liquidated damages clauses operating as excessive in terrorem penalties (Indian courts only award reasonable compensation under Section 74).",
      "Vague dispute resolution clauses specifying non-existent arbitration councils or seats.",
    ],
    recommendedContractSlugs: [
      "employment-agreement",
      "nda",
      "master-services-agreement",
      "saas-agreement",
      "partnership-agreement",
    ],
    faqs: [
      {
        question: "Can an Indian company enforce a 1-year non-compete clause against an employee?",
        answer:
          "No. Under Section 27 of the Indian Contract Act, 1872, any agreement restraining an individual from exercising a lawful profession, trade, or business is void to that extent. Indian courts consistently refuse to enforce post-employment non-competes, though confidentiality and verified trade secret protections remain enforceable.",
      },
      {
        question: "Why is stamp duty critical for contracts in India?",
        answer:
          "Under Section 35 of the Indian Stamp Act, unstamped commercial contracts cannot be acted upon by any public authority, arbitrator, or court. In recent Supreme Court rulings, unstamped arbitration agreements must be validated and stamped before arbitration can proceed.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "united-states",
    countryCode: "US",
    flag: "🇺🇸",
    name: "United States (Federal & Delaware)",
    shortDescription:
      "Guide to US commercial contract standards: Delaware corporate law, UCC Article 2 sale of goods, and mandatory arbitration enforcement.",
    overview:
      "The United States operates under a federal common-law system where commercial contract enforcement is governed predominantly by state statutory law (with Delaware being the premier corporate venue) and the Uniform Commercial Code (UCC) for commercial transactions. US law strongly respects freedom of contract between commercial enterprises.",
    legalSystem: "Common Law",
    governingBody: "Delaware Court of Chancery; US Federal District Courts; State Supreme Courts",
    keyStatutes: [
      {
        name: "Delaware General Corporation Law (DGCL)",
        code: "8 Del. C. § 101 et seq.",
        impactOnContracts:
          "Provides the gold-standard corporate legal framework for shareholder agreements, founder vesting, M&A mergers, and corporate governance disputes.",
      },
      {
        name: "Uniform Commercial Code (UCC)",
        code: "Article 2 (Sale of Goods)",
        impactOnContracts:
          "Governs commercial sales contracts, warranties of merchantability and fitness, battle of the forms (Section 2-207), and conspicuous disclaimer rules.",
      },
      {
        name: "Federal Arbitration Act (FAA)",
        code: "9 U.S.C. § 1 et seq.",
        impactOnContracts:
          "Strictly enforces mandatory binding arbitration agreements and class-action waivers in commercial and SaaS customer agreements, preempting hostile state laws.",
      },
      {
        name: "Defend Trade Secrets Act (DTSA)",
        code: "18 U.S.C. § 1836",
        impactOnContracts:
          "Grants federal civil cause of action and emergency ex parte seizure orders for theft of trade secrets in interstate commerce, provided whistleblower notice immunity is included.",
      },
    ],
    mandatoryRequirements: [
      "Mutual consideration (value bargained for and exchanged between the parties).",
      "Satisfaction of the Statute of Frauds (agreements exceeding one year or sales of goods over $500 must be in signed writing).",
      "Conspicuous (capitalized or bold) disclaimers for UCC implied warranties.",
      "DTSA whistleblower immunity notice in any contract protecting trade secrets with contractors or employees.",
    ],
    localRedFlags: [
      "Failing to include explicit disclaimer of consequential, special, and indirect damages.",
      "Uncapped customer indemnities that bypass the general Limitation of Liability cap.",
      "Missing DTSA whistleblower immunity carve-out, preventing recovery of exemplary damages and attorney fees.",
      "Ambiguous choice of law provisions failing to exclude conflicts-of-law principles.",
    ],
    recommendedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "ip-licensing-agreement",
      "nda",
      "consulting-agreement",
    ],
    faqs: [
      {
        question: "Why do so many US technology contracts choose Delaware governing law?",
        answer:
          "Delaware possesses a specialized Court of Chancery dedicated entirely to corporate and commercial disputes without jury trials. Its judges are business law experts, resulting in highly predictable, well-reasoned legal outcomes for corporate contracts.",
      },
      {
        question: "What is the consequence of omitting a consequential damages waiver in the US?",
        answer:
          "Under common law and the UCC, a party in breach can be held liable for all indirect damages reasonably foreseeable at contract signing, including lost enterprise revenues, lost customers, and business interruption, which can easily bankrupt a vendor.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "california",
    countryCode: "US-CA",
    flag: "🌴",
    name: "California (US)",
    shortDescription:
      "Navigating California contract rules: strict non-compete and non-solicit prohibitions under Section 16600, CCPA/CPRA, and Labor Code § 2870.",
    overview:
      "California maintains one of the most distinctive and protective legal environments in the United States. Under Business & Professions Code § 16600, all non-compete agreements and most customer non-solicitation clauses are strictly void as a matter of fundamental public policy. California also guarantees employee ownership of off-hours inventions under Labor Code § 2870.",
    legalSystem: "Common Law",
    governingBody: "California Superior Courts; California Supreme Court; Division of Labor Standards Enforcement (DLSE)",
    keyStatutes: [
      {
        name: "California Business & Professions Code",
        code: "Section 16600 & 16600.5",
        impactOnContracts:
          "Declares void every contract that restrains anyone from engaging in a lawful profession, trade, or business. Out-of-state employers cannot enforce foreign non-competes against California residents, and signing workers to illegal covenants triggers statutory damages.",
      },
      {
        name: "California Labor Code",
        code: "Section 2870 (Invention Assignments)",
        impactOnContracts:
          "Prohibits employers from claiming ownership of employee inventions developed entirely on the employee's own time without using employer equipment, supplies, or trade secrets.",
      },
      {
        name: "California Consumer Privacy Act (CCPA / CPRA)",
        code: "Cal. Civ. Code § 1798.100 et seq.",
        impactOnContracts:
          "Requires strict 'Service Provider' contractual terms prohibiting vendors from retaining, using, or selling consumer personal data outside the direct business purpose.",
      },
    ],
    mandatoryRequirements: [
      "Explicit statutory notice of California Labor Code § 2870 attached to any Proprietary Information and Inventions Agreement (PIIA).",
      "CCPA Service Provider statutory data restrictions in all vendor contracts handling California resident data.",
      "Good-faith wage transparency and expense reimbursement under California Labor Code § 2802.",
    ],
    localRedFlags: [
      "Including non-compete covenants or broad employee non-solicitation clauses (illegal in California).",
      "Using out-of-state choice of law clauses to circumvent California worker rights (strictly voided by California Labor Code § 925).",
      "Attempting to claim ownership of side projects developed without company resources on personal time.",
      "Pre-dispute jury trial waivers (unenforceable in California state courts without formal arbitration).",
    ],
    recommendedContractSlugs: [
      "employment-agreement",
      "freelance-agreement",
      "consulting-agreement",
      "nda",
      "partnership-agreement",
    ],
    faqs: [
      {
        question: "Can an out-of-state company enforce an NDA with a non-compete against a remote employee in California?",
        answer:
          "No. Under California Labor Code § 925 and AB 1076, out-of-state choice of law provisions cannot evade California's non-compete ban. Presenting an employee with an unenforceable non-compete is an act of unfair competition in California, entitling workers to civil penalties and attorney fees.",
      },
      {
        question: "Are employee non-solicitation provisions enforceable in California?",
        answer:
          "Following recent appellate decisions (AMN Healthcare v. Aya Healthcare), covenants restraining the solicitation of employees are widely treated as void under Section 16600 if they restrain recruiters or workers in their ordinary trade.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "united-kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    name: "United Kingdom (England & Wales)",
    shortDescription:
      "English contract law standards: Unfair Contract Terms Act 1977 (UCTA) reasonableness test, UK GDPR, and deeds execution rules.",
    overview:
      "English commercial contract law is one of the most widely chosen jurisdictions for international trade and finance. It emphasizes strict adherence to written terms, freedom of contract for sophisticated commercial entities, and the statutory reasonableness test under the Unfair Contract Terms Act 1977 (UCTA) for liability exclusions.",
    legalSystem: "Common Law",
    governingBody: "High Court of England and Wales (Commercial Court); UK Supreme Court; Information Commissioner's Office (ICO)",
    keyStatutes: [
      {
        name: "Unfair Contract Terms Act 1977 (UCTA)",
        code: "Sections 2, 3, and 11",
        impactOnContracts:
          "Requires exclusions or limitations of liability for negligence and breach in standard business terms to satisfy a judicial test of 'reasonableness.' Liability for death or personal injury caused by negligence cannot be excluded under any circumstances.",
      },
      {
        name: "Data Protection Act 2018 & UK GDPR",
        code: "UK GDPR Article 28",
        impactOnContracts:
          "Regulates processing of personal data post-Brexit, requiring mandatory controller-processor agreements and UK International Data Transfer Agreements (IDTAs) for outbound data exports.",
      },
      {
        name: "Contracts (Rights of Third Parties) Act 1999",
        code: "Third-Party Rights",
        impactOnContracts:
          "Permits third parties to enforce contract terms unless expressly excluded by the agreement (which standard UK boilerplate contracts explicitly do).",
      },
    ],
    mandatoryRequirements: [
      "Valid consideration (or execution under seal as a Formal Deed where consideration is lacking, such as certain IP assignments or unilateral guarantees).",
      "Explicit exclusion of liability for death or personal injury resulting from negligence (mandatory under UCTA).",
      "Standard exclusion of third-party rights under the Contracts (Rights of Third Parties) Act 1999.",
      "International Data Transfer Agreement (IDTA) or UK Addendum to EU SCCs for cross-border data transfers.",
    ],
    localRedFlags: [
      "Attempting to exclude liability for death or personal injury (renders the entire clause void under UCTA).",
      "Unreasonable, arbitrary liability caps in standard terms of business that fail the UCTA reasonableness test.",
      "Executing agreements as deeds without required statutory witnessing and attestation formalities.",
      "Conflating warranties with contractual representations (which can trigger tortious rescission under the Misrepresentation Act 1967).",
    ],
    recommendedContractSlugs: [
      "saas-agreement",
      "master-services-agreement",
      "consulting-agreement",
      "data-processing-agreement",
      "ip-licensing-agreement",
    ],
    faqs: [
      {
        question: "What is the UCTA 'Reasonableness Test' in UK contracts?",
        answer:
          "Under Section 11 of UCTA, a term must be a fair and reasonable one to include in view of the circumstances known to the parties at the time of contracting. Courts evaluate the relative bargaining power of the parties and whether insurance was available to cover the risk.",
      },
      {
        question: "What is the difference between executing a contract as an Agreement vs a Deed in the UK?",
        answer:
          "A simple agreement requires consideration (an exchange of value) and carries a 6-year limitation period. A Deed does not require consideration (useful for unilateral IP assignments), requires formal witnessing, and carries an extended 12-year statutory limitation period.",
      },
    ],
    updatedAt: "2026-03-14",
  },
  {
    slug: "european-union",
    countryCode: "EU",
    flag: "🇪🇺",
    name: "European Union",
    shortDescription:
      "Navigating European commercial agreements: GDPR Article 28 DPAs, Brussels I Regulation, and civil law good-faith requirements.",
    overview:
      "The European Union features a harmonized legal framework built primarily on Civil Law traditions (with national statutory codes in France, Germany, etc.). The EU enforces strict regulatory baselines, including mandatory GDPR data processing requirements, digital market fair-competition directives, and cross-border choice of court rules under the Brussels I Regulation.",
    legalSystem: "Civil Law",
    governingBody: "Court of Justice of the European Union (CJEU); European Data Protection Board (EDPB); National Commercial Courts",
    keyStatutes: [
      {
        name: "General Data Protection Regulation (GDPR)",
        code: "Regulation (EU) 2016/679 (Article 28)",
        impactOnContracts:
          "Imposes mandatory statutory language on all controller-to-processor relationships, defining data categories, breach reporting timelines, and audit compliance requirements.",
      },
      {
        name: "Brussels I Regulation (Recast)",
        code: "Regulation (EU) No 1215/2012",
        impactOnContracts:
          "Governs jurisdiction and the recognition and enforcement of judgments in civil and commercial matters between EU member states.",
      },
      {
        name: "EU Artificial Intelligence Act (EU AI Act)",
        code: "Regulation (EU) 2024/1689",
        impactOnContracts:
          "Requires downstream deployers and enterprise providers of AI systems to negotiate transparency, copyright provenance, and risk management clauses in enterprise software licenses.",
      },
    ],
    mandatoryRequirements: [
      "Standard Contractual Clauses (SCCs) for transfers of personal data to third countries lacking an EU adequacy decision.",
      "Adherence to civil law principles of good faith (bona fides) during contract negotiation and performance.",
      "Clear, fair B2B terms compliant with the EU Directive on unfair commercial terms in member states.",
    ],
    localRedFlags: [
      "Omitting mandatory Article 28 GDPR terms when processing EU citizen personal data (triggers fines up to €20M or 4% of global turnover).",
      "One-sided termination clauses that violate national statutory rules against abrupt termination of established business relationships.",
      "Excluding liability for gross negligence (faute lourde) or willful misconduct, which is legally prohibited across major civil law jurisdictions.",
    ],
    recommendedContractSlugs: [
      "data-processing-agreement",
      "saas-agreement",
      "master-services-agreement",
      "ip-licensing-agreement",
    ],
    faqs: [
      {
        question: "Can an EU contract disclaim gross negligence or willful misconduct?",
        answer:
          "No. In civil law jurisdictions across the European Union (including Germany's BGB § 276 and French civil code), parties cannot legally limit or exclude liability for intentional acts, fraud, or gross negligence. Such clauses are void.",
      },
      {
        question: "What are the EU Standard Contractual Clauses (SCCs)?",
        answer:
          "SCCs are standardized contractual terms adopted by the European Commission that guarantee personal data transferred outside the European Economic Area (EEA) to countries like the US or India receives GDPR-equivalent protection.",
      },
    ],
    updatedAt: "2026-03-14",
  },
];

export function getJurisdictionBySlug(slug: string): JurisdictionType | undefined {
  return jurisdictionsData.find((j) => j.slug === slug);
}

export function getAllJurisdictionSlugs(): string[] {
  return jurisdictionsData.map((j) => j.slug);
}
