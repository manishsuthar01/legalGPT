import { StringOutputParser } from "@langchain/core/output_parsers";
import { prompt } from "../prompts/legal-reviewer.prompt";
import { getLLM } from "../models";
import { AnalysisState } from "../types";
import fs from "fs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const legalReviewerNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[legal-reviewer.node.ts] REVIEWING ${state.flaggedClauses.length} CLAUSES FOR JURISDICTION: ${state.country}`);
    try {
        const feedback = [];
        const { researchResults, country, clauses } = state;
        const model = getLLM("gemini", { model: "gemini-3.5-flash" });
        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        const clausesData = state.flaggedClauses.map(clause => {
            const plan = state.researchPlans?.find((p) => p.clauseId === clause.chunk_index);
            const source = state.researchResults?.find((v) => v.clauseId === clause.chunk_index);

            return {
                clauseId: clause.chunk_index,
                clauseText: clause.text,
                researchTopic: plan?.topic || "N/A",
                searchQuery: plan?.searchQuery || "N/A",
                context: source && source.sources ? source.sources : "No specific legal precedent found."
            };
        });

        let aiResponse = "";
        let retries = 3;
        let attempt = 0;

        while (retries > 0) {
            try {
                aiResponse = await chain.invoke({
                    country: state.country,
                    clausesData: JSON.stringify(clausesData),
                });
                break; // Success
            } catch (error: any) {
                if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Rate limit")) {
                    console.warn(`[legal-reviewer.node.ts] Rate limited. Waiting before retrying... (${retries} retries left)`);
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
            const parsedArray = JSON.parse(cleanJson);

            for (const item of parsedArray) {
                const originalData = clausesData.find(c => c.clauseId === item.clauseId);

                if (originalData) {
                    feedback.push({
                        clauseId: item.clauseId,
                        clauseText: originalData.clauseText,
                        researchTopic: originalData.researchTopic,
                        searchQuery: originalData.searchQuery,
                        verifiedContext: typeof originalData.context === 'string' ? originalData.context : JSON.stringify(originalData.context).substring(0, 500) + "...",
                        strictReview: {
                            risk: item.risk,
                            confidence: item.confidence,
                            basedOn: item.basedOn,
                            summary: item.summary,
                            observations: item.observations,
                            evidence: item.evidence,
                            applicableLaw: item.applicableLaw,
                            citations: item.citations,
                            internalReasoning: item.internalReasoning
                        }
                    });
                }
            }
        } catch (e) {
            console.warn(`[legal-reviewer.node.ts] Failed to parse JSON array. Raw response:`, aiResponse);
            // Fallback: create empty reviews for all clauses
            for (const data of clausesData) {
                feedback.push({
                    clauseId: data.clauseId,
                    clauseText: data.clauseText,
                    researchTopic: data.researchTopic,
                    searchQuery: data.searchQuery,
                    verifiedContext: typeof data.context === 'string' ? data.context : JSON.stringify(data.context).substring(0, 500) + "...",
                    strictReview: {
                        risk: "CRITICAL",
                        confidence: 0,
                        basedOn: "Contract Only",
                        summary: "Failed to generate review due to parsing error",
                        observations: ["JSON parsing error"],
                        evidence: [],
                        applicableLaw: [],
                        citations: [],
                        internalReasoning: "Parsing failed"
                    }
                });
            }
        }

        console.log(`[legalReviewerNode] GENERATED ${feedback.length} STRICT REVIEWS in ${(Date.now() - startTime) / 1000}s`);

        // Save the reviews to a file so we can view them easily
        fs.writeFileSync("reviews.json", JSON.stringify(feedback, null, 2));

        return {
            status: "processing",
            reviewerFeedback: feedback,
        };
    } catch (error) {
        console.error(`[legal-reviewer.node.ts] ERROR REVIEWING CLAUSES: ${state.contractId}`, error);
        return { status: "failed" };
    }
}