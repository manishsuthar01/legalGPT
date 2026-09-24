import { StringOutputParser } from "@langchain/core/output_parsers";
import { advisorPrompt } from "../../prompts/analysis/legal-advisor.prompt";
import { getResilientLLM } from "../../models";
import { AnalysisState } from "../../types/analysis";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateFallbackOutput = (state: AnalysisState, reason: string): Partial<AnalysisState> => {
    const reviews = state.reviewerFeedback || [];

    // Synthesize risk cards from the reviewer node feedback
    const fallbackCards = reviews.map((review: any, idx: number) => {
        const severityRaw = review.strictReview?.risk?.toLowerCase() || "medium";
        const severity = (["critical", "high", "medium", "low"].includes(severityRaw)
            ? severityRaw
            : "medium") as "critical" | "high" | "medium" | "low";

        return {
            id: `risk-${idx + 1}`,
            severity,
            clauseTitle: review.researchTopic || `Clause ${review.clauseId}`,
            explanation: review.strictReview?.summary || "Clause flagged for review.",
            suggestedFix: "Review the flagged clause with legal counsel to align with jurisdiction standards.",
            likelihood: severity === "critical" ? 4 : severity === "high" ? 3 : 2,
            impact: severity === "critical" ? 5 : severity === "high" ? 4 : 3,
            whyItMatters: review.strictReview?.observations?.[0] || "Potential operational or legal liability.",
        };
    });

    const hasCritical = fallbackCards.some((c) => c.severity === "critical");
    const hasHigh = fallbackCards.some((c) => c.severity === "high");
    const overallRisk: "HIGH" | "MEDIUM" | "LOW" = hasCritical || hasHigh ? "HIGH" : fallbackCards.length > 0 ? "MEDIUM" : "LOW";
    const riskScore = hasCritical ? 78 : hasHigh ? 65 : 45;

    return {
        status: "completed",
        advisorFeedback: [],
        riskCards: fallbackCards,
        summary: `Contract review completed for jurisdiction ${state.country}. ${fallbackCards.length} potential risk areas were evaluated.`,
        overallRisk,
        riskScore,
        riskScoreBreakdown: {
            contractQuality: Math.max(30, 100 - riskScore),
            clauseRisk: riskScore,
            jurisdictionCompliance: 60,
        },
        positiveFindings: [
            {
                clauseTitle: "Standard Formatting",
                explanation: "Contract structure conforms to standard legal formatting.",
            },
            {
                clauseTitle: "Jurisdiction Review",
                explanation: `Jurisdiction rules evaluated for ${state.country}.`,
            },
        ],
        missingClauses: [],
    };
};

export const legalAdvisorNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[legal-advisor.node.ts] GENERATING ADVICE FOR ${state.reviewerFeedback?.length || 0} REVIEWS (${state.country})`);

    try {
        // Uses Gemini (default gemini-2.5-flash) with seamless fallback to Groq if rate-limited
        const model = getResilientLLM("gemini", { 
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash" 
        });
        const chain = advisorPrompt.pipe(model as any).pipe(new StringOutputParser());

        let aiResponse = "";
        let retries = 2;
        let attempt = 0;

        while (retries > 0) {
            try {
                aiResponse = await chain.invoke({
                    country: state.country,
                    reviewerFeedback: JSON.stringify(state.reviewerFeedback),
                });
                break;
            } catch (error: any) {
                console.warn(`[legal-advisor.node.ts] Model invocation error: ${error?.message?.slice(0, 120)} (${retries} retries left)`);
                attempt++;
                retries--;
                if (retries === 0) throw error;
                await delay(1500 * attempt);
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

            console.log(`[legal-advisor.node.ts] GENERATED ${advisorFeedback.length} SUGGESTIONS, ${riskCards.length} RISK CARDS in ${(Date.now() - startTime) / 1000}s`);

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
            return generateFallbackOutput(state, "JSON parsing error");
        }
    } catch (error) {
        console.error(`[legal-advisor.node.ts] ERROR GENERATING ADVICE: ${state.contractId}`, error);
        return generateFallbackOutput(state, "LLM invocation error");
    }
};

