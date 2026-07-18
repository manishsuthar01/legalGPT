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
                vectorIds: [],
                status: "pending" as const,
                flaggedClauses: [],
                researchResults: [],
                verifiedSources: [],
                reviewerFeedback: [],
                advisorFeedback: [],
                riskCards: []
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
                    risks: currentState.analysis
                }
            };

        } catch (error) {
            console.error("Error running analysis during langGraph execution:", error);
            throw error;
        }
    }
}