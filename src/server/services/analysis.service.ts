import { analysisGraph } from "@/ai/graph/analysis.graph";
import { AnalysisResult, AnalysisState } from "@/ai/types/analysis";

export interface AnalysisProgressChunk {
    type: "node_complete" | "progress" | "status";
    node?: string;
    message?: string;
    state?: Partial<AnalysisState>;
}

export type StreamHandler = (chunk: AnalysisProgressChunk) => void | Promise<void>;

export class AnalysisService {
    static async runAnalysis(
        contractId: string,
        userId: string,
        filePath: string,
        country: string,
        handleStream: StreamHandler
    ): Promise<{ success: boolean; data: AnalysisResult }> {
        try {
            console.log(`Starting LangGraph analysis for contract: ${contractId} (${country}) for user ${userId}`);

            const initialState: AnalysisState = {
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
            let currentState: AnalysisState = { ...initialState };

            for await (const chunk of stream) {
                const [nodeName] = Object.keys(chunk) as [keyof typeof chunk];
                const stateUpdates = chunk[nodeName] as Partial<AnalysisState>;
                currentState = { ...currentState, ...stateUpdates };

                await handleStream({
                    type: "node_complete",
                    node: String(nodeName),
                });
            }

            const analysisData: AnalysisResult = {
                summary: currentState.summary,
                overallRisk: currentState.overallRisk,
                riskScore: currentState.riskScore,
                riskScoreBreakdown: currentState.riskScoreBreakdown,
                riskCards: currentState.riskCards,
                advisorFeedback: currentState.advisorFeedback,
                reviewerFeedback: currentState.reviewerFeedback,
                clauses: currentState.clauses,
                positiveFindings: currentState.positiveFindings,
                missingClauses: currentState.missingClauses,
            };

            return {
                success: true,
                data: analysisData,
            };

        } catch (error) {
            console.error("Error running analysis during langGraph execution:", error);
            throw error;
        }
    }
}