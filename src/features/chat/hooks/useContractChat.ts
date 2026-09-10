import { useParams } from "next/navigation";
import { useState } from "react"
import { string } from "zod";


export default function useContractChat() {
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, SetError] = useState("");
    let contractId = undefined;

    const sendMessage = async ({ message }: { message: string }) => {
        try {
            if (!message) return;
            setLoading(true)

            // Get contractId from URL
            const params = useParams<{ contractId: string }>()
            const contractId = params?.contractId as string

            // Call API
            const res = await fetch(`/api/contracts/${contractId}/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: "user-123", message, sessionId }),
            })
            if (!res.ok) throw new Error("Failed to start chat")
            const data = await res.json()

            // Update session ID if new session was created
            if (data.session?.id) {
                setSessionId(data.session.id);
            }

            return data
        } catch (error) {
            if (error instanceof Error) {
                SetError(error.message)
            } else {
                SetError("Something went wrong. Please try again later.")
            }

        } finally {
            setLoading(false)
        }

    }


    return {
        sendMessage,
        error,
        loading
    }
}