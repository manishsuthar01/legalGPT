import { chatGraph } from "@/ai/graph/chat.graph";
import { ChatState } from "@/ai/types/chat";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { HumanMessage } from "@langchain/core/messages";

export interface ChatContractInput {
    contractId: string;
    userId: string;
    message: string;
    sessionId?: string | null;
}

export interface ChatContractResponse {
    sessionId: string;
    message: {
        id: string;
        role: "assistant";
        content: string;
        created_at: string;
    };
}

export class chatService {
    static async chatWithContract({
        sessionId,
        contractId,
        userId,
        message,
    }: ChatContractInput): Promise<ChatContractResponse> {
        try {
            let targetSessionId: string | null = sessionId || null;

            // 1. Resolve or Create Chat Session
            if (targetSessionId) {
                const { data: session, error } = await supabaseAdmin
                    .from("chat_sessions")
                    .select("id")
                    .eq("id", targetSessionId)
                    .eq("user_id", userId)
                    .single();

                if (error || !session) {
                    throw new Error("Session not found");
                }
            } else {
                const titleSnippet = message.length > 35 ? `${message.slice(0, 35)}...` : message;
                const { data: newSession, error: sessionError } = await supabaseAdmin
                    .from("chat_sessions")
                    .insert({
                        contract_id: contractId,
                        user_id: userId,
                        title: titleSnippet,
                    })
                    .select("id")
                    .single();

                if (sessionError || !newSession) {
                    console.error("Failed to create chat session:", sessionError);
                    throw new Error("Failed to create chat session");
                }

                targetSessionId = newSession.id;
            }

            // 2. Persist the User Message to Supabase
            const { error: userMsgError } = await supabaseAdmin
                .from("chat_messages")
                .insert({
                    session_id: targetSessionId,
                    role: "user",
                    content: message,
                    status: "sent",
                });

            if (userMsgError) {
                console.error("Failed to record user message:", userMsgError);
            }

            // 3. Prepare LangGraph Initial State & Execute
            const initialState: ChatState = {
                contractId,
                analysisSummary: "",
                retrievedContext: "",
                messages: [new HumanMessage(message)],
                status: "unknown",
            };

            const result = await chatGraph.invoke(initialState);
            const aiMessage = result?.messages?.[result.messages.length - 1];
            const aiResponse = String(aiMessage?.content || "I was unable to analyze the contract for this question.");

            // 4. Persist the Assistant Message to Supabase
            const { data: savedAiMessage, error: aiMsgError } = await supabaseAdmin
                .from("chat_messages")
                .insert({
                    session_id: targetSessionId,
                    role: "assistant",
                    content: aiResponse,
                    status: "completed",
                    metadata: {
                        retrievedContext: result?.retrievedContext || "",
                    },
                })
                .select("id, created_at")
                .single();

            if (aiMsgError) {
                console.error("Failed to record AI message:", aiMsgError);
            }
            if (!targetSessionId) {
                throw new Error("Session ID could not be resolved");
            }


            return {
                sessionId: targetSessionId,
                message: {
                    id: savedAiMessage?.id || crypto.randomUUID(),
                    role: "assistant",
                    content: aiResponse,
                    created_at: savedAiMessage?.created_at || new Date().toISOString(),
                },
            };
        } catch (error) {
            console.error("Error in chatService.chatWithContract:", error);
            throw error;
        }
    }
}