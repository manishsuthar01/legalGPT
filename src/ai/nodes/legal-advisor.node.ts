import { StringOutputParser } from "@langchain/core/output_parsers";
import { advisorPrompt } from "../prompts/legal-advisor.prompt";
import { getLLM } from "../models";
import { AnalysisState } from "../types";
import fs from "fs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const legalAdvisorNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[legal-advisor.node.ts] GENERATING ADVICE FOR ${state.reviewerFeedback.length} REVIEWS (${state.country})`);

    try {
        const model = getLLM("gemini", { model: "gemini-3.5-flash" });
        const chain = advisorPrompt.pipe(model).pipe(new StringOutputParser());

        let aiResponse = "";
        let retries = 3;
        let attempt = 0;

        while (retries > 0) {
            try {
                aiResponse = await chain.invoke({
                    country: state.country,
                    reviewerFeedback: JSON.stringify(state.reviewerFeedback),
                });
                break;
            } catch (error: any) {
                if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Rate limit")) {
                    console.warn(`[legal-advisor.node.ts] Rate limited. Waiting before retrying... (${retries} retries left)`);
                    await delay(2000 * Math.pow(2, attempt));
                    attempt++;
                    retries--;
                    if (retries === 0) throw error;
                } else {
                    throw error;
                }
            }
        }

        try {
            const cleanJson = aiResponse.replace(/```json/gi, "").replace(/```/gi, "").trim();
            const parsed = JSON.parse(cleanJson);

            const advisorFeedback = parsed.advisorFeedback || [];
            const riskCards = parsed.riskCards || [];
            const summary = parsed.executiveSummary || "";
            const overallRisk = parsed.overallRisk || "MEDIUM";
            const riskScore = parsed.riskScore ?? 50;
            const riskScoreBreakdown = parsed.riskScoreBreakdown || { contractQuality: 50, clauseRisk: 50, jurisdictionCompliance: 50 };
            const positiveFindings = parsed.positiveFindings || [];
            const missingClauses = parsed.missingClauses || [];

            console.log(`[legal-advisor.node.ts] GENERATED ${advisorFeedback.length} SUGGESTIONS, ${riskCards.length} RISK CARDS, ${positiveFindings.length} POSITIVES, ${missingClauses.length} MISSING CLAUSES in ${(Date.now() - startTime) / 1000}s`);

            // Save for debugging
            fs.writeFileSync("advisor-output.json", JSON.stringify(parsed, null, 2));

            return {
                status: "completed",
                advisorFeedback,
                riskCards,
                summary,
                overallRisk,
                riskScore,
                riskScoreBreakdown,
                positiveFindings,
                missingClauses,
            };
        } catch (e) {
            console.warn(`[legal-advisor.node.ts] Failed to parse JSON. Raw response:`, aiResponse);

            // Fallback: generate minimal output from reviewer data
            const fallbackCards = state.reviewerFeedback.map((review, idx) => ({
                id: `risk-${idx + 1}`,
                severity: (review.strictReview?.risk?.toLowerCase() || "medium") as "critical" | "high" | "medium" | "low",
                clauseTitle: review.researchTopic || `Clause ${review.clauseId}`,
                explanation: review.strictReview?.summary || "Review available but advisor parsing failed.",
                suggestedFix: "Review the flagged clause and consult with legal counsel for specific guidance.",
                likelihood: 3,
                impact: 3,
                whyItMatters: "Unable to generate business impact analysis due to parsing error.",
            }));

            return {
                status: "completed",
                advisorFeedback: [],
                riskCards: fallbackCards,
                summary: "Contract analysis completed but advisor summary could not be generated. Please review individual risk cards.",
                overallRisk: "MEDIUM",
                riskScore: 50,
                riskScoreBreakdown: { contractQuality: 50, clauseRisk: 50, jurisdictionCompliance: 50 },
                positiveFindings: [],
                missingClauses: [],
            };
        }
    } catch (error) {
        console.error(`[legal-advisor.node.ts] ERROR GENERATING ADVICE: ${state.contractId}`, error);
        return { status: "failed" };
    }
};
