import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChatMessageItem } from "../components/ChatMessage";

export default function useContractChat(contractIdProp?: string) {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState("");
    const params = useParams<{ contractId: string }>();
    const routeContractId = params?.contractId as string;
    const contractId = contractIdProp || (routeContractId && routeContractId !== "new" && routeContractId !== "default-contract" ? routeContractId : "");

    const [messages, setMessages] = useState<ChatMessageItem[]>([]);

    // Reset messages and session whenever contractId changes
    useEffect(() => {
        setMessages([]);
        setSessionId(null);
        SetError("");
    }, [contractId]);

    const sendMessage = async ({ message }: { message: string }) => {
        try {
            if (!message.trim()) return;
            if (!contractId) {
                SetError("Please analyze a contract before asking questions.");
                return;
            }

            setLoading(true);
            SetError("");

            const userMessage: ChatMessageItem = {
                id: crypto.randomUUID(),
                role: 'user',
                content: message,
            };
            setMessages(prev => [...prev, userMessage]);

            const res = await fetch(`/api/contracts/${contractId}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message, sessionId }),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || "Failed to get response from assistant");
            }

            const data = await res.json();

            if (data?.data?.message) {
                setMessages(prev => [...prev, data.data.message]);
            }

            // Update session ID if new session was created
            if (data?.data?.sessionId) {
                setSessionId(data.data.sessionId);
            }

            return data;

        } catch (error) {
            if (error instanceof Error) {
                SetError(error.message);
            } else {
                SetError("Something went wrong. Please try again later.");
            }

        } finally {
            setLoading(false);
        }
    };

    return {
        sendMessage,
        error,
        loading,
        messages,
        contractId
    };
}