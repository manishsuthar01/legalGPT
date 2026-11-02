import { supabaseAdmin } from "@/utils/supabase/admin";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatState } from "@/ai/types/chat";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

export const retrieveContextNode = async (state: ChatState): Promise<Partial<ChatState>> => {
    console.log(`[retrieveContextNode] Fetching relevant clauses for contractId: "${state.contractId}"...`);

    if (!state.contractId || state.contractId === "new" || state.contractId === "default-contract") {
        console.warn(`[retrieveContextNode] Invalid contractId: "${state.contractId}", skipping retrieval.`);
        return {
            retrievedContext: "",
            status: "success"
        };
    }

    const messages = state.messages || [];
    const latestMessage = messages[messages.length - 1];
    const query = String(latestMessage?.content || "").trim();

    // Helper: Direct fallback query to retrieve actual document clauses from Supabase
    const fetchDirectClauses = async (limit = 8): Promise<string[]> => {
        try {
            const { data, error } = await supabaseAdmin
                .from("clauses")
                .select("id, content, metadata")
                .contains("metadata", { contractId: state.contractId })
                .order("id", { ascending: true })
                .limit(limit);

            if (error || !data) {
                console.warn("[retrieveContextNode] Fallback direct fetch error:", error?.message);
                return [];
            }
            return data.map((row: any) => String(row.content || "").trim()).filter(Boolean);
        } catch (err) {
            console.warn("[retrieveContextNode] Exception during direct clauses fallback:", err);
            return [];
        }
    };

    let retrievedClauses: string[] = [];

    // Attempt semantic vector search first
    if (query) {
        try {
            const embeddings = new GoogleGenerativeAIEmbeddings({
                apiKey: process.env.GEMINI_API_KEY,
                model: "gemini-embedding-001",
            });

            const vectorStore = new SupabaseVectorStore(embeddings, {
                client: supabaseAdmin,
                tableName: "clauses",
                queryName: "match_clauses"
            });

            console.log(`[retrieveContextNode] Performing vector similarity search for: "${query.slice(0, 60)}..."`);
            const vectorResults = await vectorStore.similaritySearch(query, 6, {
                contractId: state.contractId,
                contract_id: state.contractId
            });

            if (vectorResults && vectorResults.length > 0) {
                retrievedClauses = vectorResults.map((r) => r.pageContent.trim()).filter(Boolean);
                console.log(`[retrieveContextNode] Vector similarity found ${retrievedClauses.length} clauses.`);
            }
        } catch (vecErr) {
            console.warn("[retrieveContextNode] Vector similarity search encountered an error, activating direct fallback:", vecErr);
        }
    }

    // Check if the query is an overview/general inquiry (e.g. "Explain this contract", "Summarize", "What is this?")
    const lowerQuery = query.toLowerCase();
    const isOverviewQuery = !query ||
        lowerQuery.includes("explain") ||
        lowerQuery.includes("summar") ||
        lowerQuery.includes("overview") ||
        lowerQuery.includes("what is this") ||
        lowerQuery.includes("tell me about") ||
        lowerQuery.includes("review this");

    // If vector search returned 0 clauses OR if this is an overview query, fetch direct document clauses
    if (retrievedClauses.length === 0 || isOverviewQuery) {
        console.log(`[retrieveContextNode] Fetching direct document clauses (overviewQuery: ${isOverviewQuery}, vectorHits: ${retrievedClauses.length})...`);
        const direct = await fetchDirectClauses(8);

        if (retrievedClauses.length === 0) {
            retrievedClauses = direct;
        } else {
            // Combine vector results with introductory clauses without duplicates
            const combinedSet = new Set(retrievedClauses);
            for (const d of direct) {
                if (!combinedSet.has(d)) {
                    retrievedClauses.push(d);
                    combinedSet.add(d);
                }
            }
        }
    }

    const combinedContext = retrievedClauses.length > 0
        ? retrievedClauses.map((clauseText, i) => `[Document Excerpt ${i + 1}]:\n${clauseText}`).join("\n\n---\n\n")
        : "";

    console.log(`[retrieveContextNode] Final context prepared: ${retrievedClauses.length} excerpts (${combinedContext.length} chars)`);

    return {
        retrievedContext: combinedContext,
        status: "success"
    };
};
