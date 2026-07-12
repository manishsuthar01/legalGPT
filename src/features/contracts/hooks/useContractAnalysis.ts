import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useContractAnalysis() {
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const startAnalysis = async (supabaseFilePath: string) => {
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
                    contractId: router.query.contractId,
                    userId: "user-123",
                    filePath: supabaseFilePath
                })

            });

            const data = await res.json()

            if (data.success) {
                console.log("Analysis triggered", data);
            } else {
                setError(data.error || "Failed to trigger analysis")
            }

        } catch (error) {
            console.error("Analysis failed:", error);
            setError("Network error. Try again.")
        } finally {
            setIsAnalysing(false)
        }
    }

    return {
        startAnalysis, isAnalysing, error
    }
}