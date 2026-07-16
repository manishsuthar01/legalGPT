import { analysisGraph } from "@/ai/graph/analysis.graph";

// this service is a wrapper around the langGraph

export class AnalysisService {
    static async runAnalysis(contractId: string, userId: string, filePath: string, country: string) {
        try {
            console.log(`Starting LangGraph analysis for contract: ${contractId} (${country})`);

            const initialState = {
                contractId,
                country,
                uploadedFile: filePath,
                extractedText: "",
                cleanedText: "",
                clauses: [],
                embeddings: [],
                analysis: null,
                summary: "",
                vectorIds: [],
                status: "pending" as const,
                flaggedClauses: [],
                researchResults: [],
                verifiedSources: [],
                reviewerFeedback: [],
                advisorFeedback: [],
                riskCards: []
            };

            // invoke fhe graph with initial state that return the final state
            const finalState = await analysisGraph.invoke(initialState);
            return {
                success: true,
                data: {
                    summary: finalState.summary,
                    risks: finalState.analysis
                }
            };

        } catch (error) {
            console.error("Error running analysis during langGraph execution:", error);
            throw error;
        }
    }
}