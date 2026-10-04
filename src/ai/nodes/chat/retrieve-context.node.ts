import { supabaseAdmin } from "@/utils/supabase/admin";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatState } from "@/ai/types/chat";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { VectorStore } from "@langchain/core/vectorstores";
import { HumanMessage } from "@langchain/core/messages";


export const retrieveContextNode = async (state: ChatState): Promise<Partial<ChatState>> => {
    console.log("[retrieveContextNode] Fetching relevant clauses...");
    try {
        if (!state.contractId || state.contractId === "new" || state.contractId === "default-contract" || !state.messages.at(-1)?.content) {
            console.warn(`[retrieveContextNode] Invalid or missing contractId: "${state.contractId}", skipping retrieval.`);
            return {
                retrievedContext: "",
                status: "success"
            };
        }
        const messages = state.messages;
        const latestMessage = messages[messages.length - 1];
        const query = String(latestMessage.content);
        if (!query.trim()) {
            return {
                retrievedContext: "",
                status: "success"
            };
        }
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-embedding-001",
        });

        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabaseAdmin,
            tableName: "clauses",
            queryName: "match_clauses"
        });

        console.log(`[retrieveContextNode] Searching clauses strictly for contractId: "${state.contractId}" with query: "${query.slice(0, 50)}..."`);
        const results = await vectorStore.similaritySearch(query, 5, {
            contractId: state.contractId,
            contract_id: state.contractId
        });
        const combinedContext = results.map((result) => result.pageContent).join("\n\n");
        console.log(`[retrieveContextNode] Retrieved ${results.length} relevant clauses for contract ${state.contractId}.`);

        return {
            retrievedContext: combinedContext,
            status: "success"
        }

    } catch (error) {
        console.error("[retrieveContextNode] Error fetching relevant clauses:", error);
        return {
            status: "failed"
        }
    }
}