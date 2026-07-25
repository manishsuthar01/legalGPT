import { supabaseAdmin } from "@/utils/supabase/admin";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatState } from "@/ai/types/chat";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { VectorStore } from "@langchain/core/vectorstores";
import { HumanMessage } from "@langchain/core/messages";


export const retrieveContextNode = async (state: ChatState): Promise<Partial<ChatState>> => {
    console.log("[retrieveContextNode] Fetching relevant clauses...");
    try {
        if (!state.contractId || !state.messages.at(-1)?.content) {
            return {
                status: "failed"
            }
        }
        const messages = state.messages;
        const latestMessage = messages[messages.length - 1];
        const query = String(latestMessage.content);
        if (!query) {
            return {
                status: "failed"
            }
        }
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GEMINI_API_KEY,
            model: "gemini-embedding-001",
        });

        const vectorStore = new SupabaseVectorStore(embeddings, {
            client: supabaseAdmin,
            tableName: "clauses",
            queryName: "match_clauses"
        })
        const results = await vectorStore.similaritySearch(query, 5, {
            contractId: state.contractId
        });
        const combinedContext = results.map((result) => result.pageContent).join("\n\n");
        console.log(`[retrieveContextNode] Retrieved ${results.length} relevant clauses.`);

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