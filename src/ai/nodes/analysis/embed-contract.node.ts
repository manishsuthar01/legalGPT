import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { AnalysisState } from "../types";

export const embedContracNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[embedContracNode] Embedding clauses for contract: ${state.contractId}`);

    try {
        if (!state.clauses || state.clauses.length === 0) {
            console.warn("[embedContracNode] Warning: No clauses found to embed. Skipping.");
            return { status: "processing" };
        }

        console.log(`[embedContracNode] Preparing to embed ${state.clauses.length} clauses...`);

        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-embedding-001",
        });

        const docsToStore = state.clauses.map((clause) => ({
            pageContent: clause.text,
            metadata: {
                source: clause.source,
                chunk_index: clause.chunk_index
            }
        }));

        const vectorStore = await SupabaseVectorStore.fromDocuments(
            docsToStore,
            embeddings as any,
            {
                client: supabaseAdmin,
                tableName: "clauses",
                queryName: "match_clauses"
            }
        );

        console.log(`[embedClausesNode] Successfully stored embeddings in Supabase! in ${(Date.now() - startTime) / 1000}s`);

        return {
            status: "processing"
        };

    } catch (error) {
        console.error("[embedContracNode] Error embedding clauses:", error);
        return {
            status: "failed",
        };
    }
}