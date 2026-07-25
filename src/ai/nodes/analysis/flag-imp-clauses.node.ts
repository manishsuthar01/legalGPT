import { AnalysisState } from "../types";

export const flagImpClausesNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    try {
        let clauses = state.clauses;
        const importantKeywords = ["indemni", "liabilit", "terminat", "warrant"];

        const flagged = clauses.filter((clause) => {
            return importantKeywords.some((keyword) =>
                clause.text.toLowerCase().includes(keyword)
            )
        })

        console.log(`[flagImpClausesNode] FLAGGED ${flagged.length} IMPORTANT CLAUSES FOR ${state.contractId} in ${(Date.now() - startTime) / 1000}s`);


        return {
            status: "processing",
            flaggedClauses: flagged,
        }

    } catch (error) {
        console.log(`[flagImpClausesNode] ERROR FLAGGING IMPORTANT CLAUSES FOR ${state.contractId}`);
        console.log(error);
        return {
            status: "failed",
        }
    }
}