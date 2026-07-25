import { ChatState } from "@/ai/types/chat";
import { chatPrompt } from "@/ai/prompts/chat/chat.prompt";
import { getLLM } from "@/ai/models";
import { PromptTemplate } from "@langchain/core/prompts";

export const generateResponseNode = async (state: ChatState): Promise<Partial<ChatState>> => {
    console.log("[generateResponseNode] Generating response...");

    if (state.status === "failed" || state.status === "unknown") {
        return {
            status: "failed"
        }
    }
    try {
        const { analysisSummary, retrievedContext, messages } = state;
        const llm = getLLM('groq');
        const chain = chatPrompt().pipe(llm);
        const response = await chain.invoke({
            analysisSummary,
            retrievedContext,
            messages
        })

        return {
            status: "success",
            messages: [response]

        }
    } catch (error) {
        console.error("[generateResponseNode] Error generating response:", error);
        return {
            status: "failed"
        }
    }
}
