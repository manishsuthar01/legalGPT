import { useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { AnalysisResult } from "@/ai/types/analysis";

export interface StreamProgress {
    type: string;
    node?: string;
    status?: string;
    data?: AnalysisResult;
    message?: string;
}

export const NODE_SEQUENCE = [
    "text-extract-node",
    "text-clean-node",
    "clause-split-node",
    "contract-embed-node",
    "flag-imp-clauses-node",
    "plan-research-node",
    "execute-research-node",
    "legal-reviewer-node",
    "legal-advisor-node"
];

export default function useContractAnalysis() {
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [streamData, setStreamData] = useState<StreamProgress | null>(null);
    const [completedNodes, setCompletedNodes] = useState<string[]>([]);
    const [currentNode, setCurrentNode] = useState<string>("text-extract-node");
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const params = useParams();

    const resetAnalysis = useCallback(() => {
        setIsAnalysing(false);
        setError(null);
        setStreamData(null);
        setCompletedNodes([]);
        setCurrentNode("text-extract-node");
        setAnalysisResult(null);
    }, []);

    const startAnalysis = useCallback(async (supabaseFilePath: string, country: string) => {
        setIsAnalysing(true);
        setError(null);
        setCompletedNodes([]);
        setCurrentNode(NODE_SEQUENCE[0]);
        setStreamData(null);
        setAnalysisResult(null);

        try {
            const contractId = typeof params?.contractId === 'string' ? params.contractId : "default-contract";
            const res = await fetch("/api/contracts/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contractId,
                    userId: "user-123",
                    filePath: supabaseFilePath,
                    country
                })
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `Server responded with status ${res.status}`);
            }

            if (!res.body) throw new Error("No response body received from server");
            const reader = res.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                
                // Handle both \r\n and \n newlines for SSE event boundaries
                const lines = buffer.split(/\r?\n\r?\n/);
                buffer = lines.pop() || '';

                for (const line of lines) {
                    const trimmedLine = line.trim();
                    if (trimmedLine.startsWith('data: ')) {
                        const rawData = trimmedLine.slice(6);
                        try {
                            const parsedData: StreamProgress = JSON.parse(rawData);
                            
                            if (parsedData.status === 'DONE' && parsedData.data) {
                                setAnalysisResult(parsedData.data);
                                setStreamData({ type: 'DONE', data: parsedData.data });
                                setCurrentNode("");
                            } else if (parsedData.status === 'error') {
                                setError(parsedData.message || "An error occurred during analysis");
                            } else if (parsedData.type === 'node_complete' && parsedData.node) {
                                const completedNode = parsedData.node;
                                setCompletedNodes((prev) => 
                                    prev.includes(completedNode) ? prev : [...prev, completedNode]
                                );
                                const nextIndex = NODE_SEQUENCE.indexOf(completedNode) + 1;
                                if (nextIndex < NODE_SEQUENCE.length) {
                                    setCurrentNode(NODE_SEQUENCE[nextIndex]);
                                } else {
                                    setCurrentNode("");
                                }
                                setStreamData(parsedData);
                            }
                        } catch (e) {
                            console.error("Failed to parse stream data JSON:", e, rawData);
                        }
                    }
                }
            }
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Network error. Try again.";
            console.error("useContractAnalysis hook failed:", err);
            setError(message);
        } finally {
            setIsAnalysing(false);
        }
    }, [params]);

    return {
        startAnalysis,
        isAnalysing,
        error,
        streamData,
        completedNodes,
        currentNode,
        analysisResult,
        resetAnalysis,
        setAnalysisResult
    };
}