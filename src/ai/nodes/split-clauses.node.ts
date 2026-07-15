import { AnalysisState } from "@/ai/types";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const splitClauseNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[splitClauseNode] Splitting text for contract: ${state.contractId}`);

    try {
        const rawText = state.cleanedText;
        if (!rawText) {
            throw new Error("No cleaned text found in state");
        }

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 800,
            chunkOverlap: 200,
            separators: ["\n\n", "\n", ".", " "]
        });

        const docs = await splitter.createDocuments([rawText], [{ "source": state.contractId }]);
        let clauses = docs.map((doc, index) => ({
            text: doc.pageContent.trim(),
            source: doc.metadata.source as string,
            chunk_index: index,
        }));

        clauses = clauses.filter(clause => clause.text.length > 0);

        console.log(`[splitClauseNode] Text split successfully. Number of clauses: ${clauses.length}`);

        return {
            clauses: clauses,
            status: "processing"
        };

    } catch (error) {
        console.error("[splitClauseNode] Error splitting text:", error);
        return {
            status: "failed",
        };
    }
}