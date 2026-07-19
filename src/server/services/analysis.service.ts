import { analysisGraph } from "@/ai/graph/analysis.graph";

// this service is a wrapper around the langGraph

export class AnalysisService {
    static async runAnalysis(contractId: string, userId: string, filePath: string, country: string, handleStream: (chunk: any) => Promise<void>): Promise<any> {
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
                overallRisk: "MEDIUM" as const,
                riskScore: 0,
                vectorIds: [],
                status: "pending" as const,
                flaggedClauses: [],
                researchPlans: [],
                researchResults: [],
                verifiedSources: [],
                reviewerFeedback: [],
                advisorFeedback: [],
                riskCards: [],
                positiveFindings: [],
                missingClauses: [],
                riskScoreBreakdown: { contractQuality: 50, clauseRisk: 50, jurisdictionCompliance: 50 }
            };

            const stream = await analysisGraph.stream(initialState);

            let currentState: any = { ...initialState };

            for await (const chunk of stream) {
                const [nodeName] = Object.keys(chunk) as [keyof typeof chunk];
                const stateUpdates = chunk[nodeName];
                currentState = { ...currentState, ...stateUpdates };

                await handleStream({ type: "node_complete", node: String(nodeName), state: currentState });
            }

            return {
                success: true,
                data: {
                    summary: currentState.summary,
                    overallRisk: currentState.overallRisk,
                    riskScore: currentState.riskScore,
                    risks: currentState.analysis,
                    riskCards: currentState.riskCards,
                    advisorFeedback: currentState.advisorFeedback,
                    reviewerFeedback: currentState.reviewerFeedback,
                    clauses: currentState.clauses,
                    positiveFindings: currentState.positiveFindings,
                    missingClauses: currentState.missingClauses,
                    riskScoreBreakdown: currentState.riskScoreBreakdown,
                }
            };

        } catch (error) {
            console.error("Error running analysis during langGraph execution:", error);
            throw error;
        }
    }
}