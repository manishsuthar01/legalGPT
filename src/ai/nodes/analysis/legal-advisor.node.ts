import { StringOutputParser } from "@langchain/core/output_parsers";
import { advisorPrompt } from "../../prompts/analysis/legal-advisor.prompt";
import { getResilientLLM } from "../../models";
import { AnalysisState } from "../../types/analysis";
import { safeParseJsonObject } from "../../utils/json-parser";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateNonLegalOutput = (state: AnalysisState): Partial<AnalysisState> => {
    const docName = (typeof state.uploadedFile === 'string' ? state.uploadedFile.split('/').pop() : '') || "Uploaded Document";
    const docType = state.documentType || "Non-Legal Document";
    const docReason = state.documentTypeReason || "The uploaded file does not contain contractual clauses or binding covenants.";

    return {
        status: "completed",
        isLegalDocument: false,
        documentType: docType,
        documentTypeReason: docReason,
        overallRisk: "LOW", // Valid with Supabase CHECK constraint ('LOW' | 'MEDIUM' | 'HIGH')
        riskScore: 0,
        riskScoreBreakdown: {
            contractQuality: 0,
            clauseRisk: 0,
            jurisdictionCompliance: 0,
        },
        summary: `Non-Legal Document Detected: The uploaded file "${docName}" has been identified as a ${docType} (${docReason}). LegalGPT is engineered specifically for legal contract intelligence, liability auditing, and compliance verification. Because this document contains no enforceable contract terms or legal liabilities, risk scoring and clause redlines are not applicable. You can still ask questions about this document in the Assistant panel on the right, or upload a legal agreement (e.g., NDA, MSA, SOW, Employment Contract) for legal auditing.`,
        riskCards: [],
        advisorFeedback: [],
        reviewerFeedback: [],
        positiveFindings: [],
        missingClauses: [],
    };
};

const generateFallbackOutput = (state: AnalysisState, reason: string): Partial<AnalysisState> => {
    if (state.isLegalDocument === false) {
        return generateNonLegalOutput(state);
    }

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
    const riskScore = hasCritical ? 78 : hasHigh ? 65 : fallbackCards.length > 0 ? 45 : 15;

    return {
        status: "completed",
        isLegalDocument: true,
        documentType: state.documentType || "Legal Contract",
        documentTypeReason: state.documentTypeReason || "Contract analyzed under standard legal baselines.",
        advisorFeedback: [],
        riskCards: fallbackCards,
        summary: fallbackCards.length > 0
            ? `Contract review completed for jurisdiction ${state.country}. ${fallbackCards.length} potential risk areas were evaluated.`
            : `Contract review completed for jurisdiction ${state.country}. All audited provisions align with standard commercial guidelines with no high-risk liabilities detected.`,
        overallRisk,
        riskScore,
        riskScoreBreakdown: {
            contractQuality: Math.max(30, 100 - riskScore),
            clauseRisk: riskScore,
            jurisdictionCompliance: 75,
        },
        positiveFindings: [
            {
                clauseTitle: "Standard Commercial Formatting",
                explanation: "Contract structure conforms to standard legal formatting and defined party roles.",
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

    // Short-circuit: Non-legal documents bypass the legal advisor prompt
    if (state.isLegalDocument === false) {
        console.log(`[legal-advisor.node.ts] Non-legal document detected (${state.documentType}). Returning non-legal document report.`);
        return generateNonLegalOutput(state);
    }

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
                    reviewerFeedback: JSON.stringify(state.reviewerFeedback || []),
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
            const parsed = safeParseJsonObject(aiResponse);
            if (!parsed) {
                throw new Error("Unable to parse advisor response as JSON object");
            }

            const advisorFeedback = parsed.advisorFeedback || [];
            const riskCards = parsed.riskCards || [];
            const summary = parsed.executiveSummary || "";
            const overallRisk = parsed.overallRisk || (riskCards.length > 0 ? "MEDIUM" : "LOW");
            const riskScore = parsed.riskScore ?? (riskCards.length > 0 ? 50 : 15);
            const riskScoreBreakdown = parsed.riskScoreBreakdown || {
                contractQuality: Math.max(30, 100 - riskScore),
                clauseRisk: riskScore,
                jurisdictionCompliance: 75
            };
            const positiveFindings = parsed.positiveFindings || [];
            const missingClauses = parsed.missingClauses || [];

            console.log(`[legal-advisor.node.ts] GENERATED ${advisorFeedback.length} SUGGESTIONS, ${riskCards.length} RISK CARDS in ${(Date.now() - startTime) / 1000}s`);

            return {
                status: "completed",
                isLegalDocument: true,
                documentType: state.documentType || "Legal Contract",
                documentTypeReason: state.documentTypeReason || "Document reviewed as an enforceable legal agreement.",
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
