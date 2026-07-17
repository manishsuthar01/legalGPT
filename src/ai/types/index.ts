export interface AnalysisState {
    contractId: string;
    country: string;
    uploadedFile: any; // file reference/buffer
    extractedText: string;
    cleanedText: string;
    clauses: { text: string; source: string, chunk_index: number }[];
    embeddings: number[][];
    analysis: any;
    summary: string;
    vectorIds: string[];
    status: 'pending' | 'processing' | 'completed' | 'failed';
    flaggedClauses: any[];
    researchPlans: ResearchPlan[];
    researchResults: ResearchResult[];
    verifiedSources: any[];
    reviewerFeedback: any[];
    advisorFeedback: any[];
    riskCards: any[];
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
