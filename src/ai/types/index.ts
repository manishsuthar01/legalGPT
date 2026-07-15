export interface AnalysisState {
    contractId: string;
    uploadedFile: any; // file reference/buffer
    extractedText: string;
    cleanedText: string;
    clauses: { text: string; source: string, chunk_index: number }[];
    embeddings: number[][];
    analysis: any;
    summary: string;
    vectorIds: string[];
    status: 'pending' | 'processing' | 'completed' | 'failed';
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
