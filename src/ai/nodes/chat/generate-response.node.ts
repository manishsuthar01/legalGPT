import { ChatState } from "@/ai/types/chat";
import { chatPrompt } from "@/ai/prompts/chat/chat.prompt";
import { getResilientLLM } from "@/ai/models";

export const generateResponseNode = async (state: ChatState): Promise<Partial<ChatState>> => {
    console.log("[generateResponseNode] Generating response...");

    if (state.status === "failed") {
        console.warn("[generateResponseNode] State is marked failed, skipping LLM invocation.");
        return {
            status: "failed"
        };
    }

    try {
        const { analysisSummary, retrievedContext, messages } = state;
        // Use resilient multi-provider LLM (Gemini primary with automatic fallback to Groq)
        const llm = getResilientLLM("gemini", {
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            temperature: 0.2,
        });

        const chain = chatPrompt().pipe(llm as any);
        const response = await chain.invoke({
            analysisSummary: analysisSummary || "No executive summary available.",
            retrievedContext: retrievedContext || "No specific clause excerpts retrieved.",
            messages
        });

        return {
            status: "success",
            messages: [response as any]
        };
    } catch (error) {
        console.error("[generateResponseNode] Error generating response:", error);
        return {
            status: "failed"
        };
    }
};
