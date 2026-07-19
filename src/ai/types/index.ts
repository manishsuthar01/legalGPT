export interface AdvisorFeedback {
    clauseId: number;
    clauseTitle: string;
    risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    likelihood: number; // 1-5
    impact: number; // 1-5
    whyItMatters: string;
    suggestedFix: string;
    replacementLanguage: string;
    rationale: string;
    priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
}

export interface RiskCard {
    id: string;
    severity: "critical" | "high" | "medium" | "low";
    clauseTitle: string;
    explanation: string;
    suggestedFix: string;
    likelihood: number; // 1-5
    impact: number; // 1-5
    whyItMatters: string;
}

export interface PositiveFinding {
    clauseTitle: string;
    explanation: string;
}

export interface MissingClause {
    title: string;
    explanation: string;
    severity: "critical" | "high" | "medium" | "low";
    suggestedLanguage: string;
}

export interface RiskScoreBreakdown {
    contractQuality: number; // 0-100
    clauseRisk: number; // 0-100
    jurisdictionCompliance: number; // 0-100
}

export interface AnalysisResult {
    summary: string;
    overallRisk: "HIGH" | "MEDIUM" | "LOW";
    riskScore: number;
    riskScoreBreakdown: RiskScoreBreakdown;
    riskCards: RiskCard[];
    advisorFeedback: AdvisorFeedback[];
    reviewerFeedback: any[];
    clauses: { text: string; source: string; chunk_index: number }[];
    positiveFindings: PositiveFinding[];
    missingClauses: MissingClause[];
}

export interface AnalysisState {
    contractId: string;
    country: string;
    uploadedFile: any;
    extractedText: string;
    cleanedText: string;
    clauses: { text: string; source: string, chunk_index: number }[];
    embeddings: number[][];
    analysis: any;
    summary: string;
    overallRisk: "HIGH" | "MEDIUM" | "LOW";
    riskScore: number;
    riskScoreBreakdown: RiskScoreBreakdown;
    vectorIds: string[];
    status: 'pending' | 'processing' | 'completed' | 'failed';
    flaggedClauses: any[];
    researchPlans: ResearchPlan[];
    researchResults: ResearchResult[];
    verifiedSources: any[];
    reviewerFeedback: any[];
    advisorFeedback: AdvisorFeedback[];
    riskCards: RiskCard[];
    positiveFindings: PositiveFinding[];
    missingClauses: MissingClause[];
}

export interface TavilySource {
    title: string;
    url: string;
    content: string;
}

export interface ResearchPlan {
    clauseId: number;
    topic: string;
    requiresResearch: boolean;
    searchQuery: string;
    reason: string;
}

export interface ResearchResult {
    clauseId: number;
    topic: string;
    searchQuery: string;
    sources: TavilySource[];
}

export interface VerifiedEvidence {
    clauseId: number;
    confidence: number;
    summary: string;
    citations: {
        title: string;
        url: string;
        authority: string;
    }[];
}

export interface ClauseReview {
    clauseId: number;
    risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
    confidence: number;
    basedOn: string;
    summary: string;
    observations: string[];
    evidence: string[];
    applicableLaw: string[];
    citations: {
        title: string;
        url: string;
    }[];
    internalReasoning: string;
}

export interface ChatState {
    contractId: string;
    sessionId: string;
    userQuestion: string;
    chatHistory: any[];
    retrievedClauses: string[];
    retrievedLaws: string[];
    finalContext: string;
    response: string;
}
