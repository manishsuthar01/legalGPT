import React from "react";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function useContractAnalysis() {
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const params = useParams();

    const startAnalysis = async (supabaseFilePath: string, country: string) => {
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

            const data = await res.json()

            if (data.success) {
                console.log("Analysis api called", data);
            } else {
                setError(data.error || "Failed to trigger analysis")
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