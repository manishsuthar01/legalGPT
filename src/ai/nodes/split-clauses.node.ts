import { AnalysisState } from "@/ai/types";

export const splitClauseNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[splitClauseNode] Splitting text for contract: ${state.contractId}`);

    try {
        const rawText = state.cleanedText;
        if (!rawText) {
            throw new Error("No cleaned text found in state");
        }

        let clauses = rawText.split('\n\n');
        clauses = clauses.map(clause => clause.trim());
        clauses = clauses.filter(clause => clause.length > 0);

        console.log(`[splitClauseNode] Text split successfully. Number of clauses: ${clauses.length}`);
        return {
            clauses: clauses
        };
    } catch (error) {
        console.error("[splitClauseNode] Error splitting text:", error);
        return {
            status: "failed",
        };
    }
}