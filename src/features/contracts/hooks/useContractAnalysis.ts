import React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function useContractAnalysis() {
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    const startAnalysis = async (supabaseFilePath: string, country: string, setStreamData: (data: any) => void) => {
        setIsAnalysing(true);
        setError(null);
        try {
            // triggers the nextjs API route that runs the langraph pipeline
            const res = await fetch("/api/contracts/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contractId: params.contractId,
                    userId: "user-123",
                    filePath: supabaseFilePath,
                    country
                })

            });

            if (!res.body) throw new Error("No response body");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Decode the current chunk and add it to our buffer
                buffer += decoder.decode(value, { stream: true });
                
                // SSE events are separated by double newlines
                const lines = buffer.split('\n\n');
                
                // Keep the last incomplete part in the buffer
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const rawData = line.slice(6);
                        try {
                            const parsedData = JSON.parse(rawData);
                            
                            if (parsedData.status === 'DONE') {
                                setStreamData({ type: 'DONE', data: parsedData.data });
                            } else if (parsedData.status === 'error') {
                                setError(parsedData.message);
                            } else {
                                // This is a progress chunk from the graph (e.g. { type: "node_complete", node: "..." })
                                setStreamData(parsedData);
                            }
                        } catch (e) {
                            console.error("Failed to parse stream data:", e);
                        }
                    }
                }
            }
        } catch (error) {
            console.error("useContractAnalysis hook failed:", error);
            setError("Network error. Try again.")
        } finally {
            setIsAnalysing(false)
        }
    }

    return {
        startAnalysis, isAnalysing, error
    }
}