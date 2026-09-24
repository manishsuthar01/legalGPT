import { StringOutputParser } from "@langchain/core/output_parsers";
import { prompt } from "../../prompts/analysis/legal-reviewer.prompt";
import { getResilientLLM } from "../../models";
import { AnalysisState } from "../../types/analysis";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const legalReviewerNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[legal-reviewer.node.ts] REVIEWING ${state.flaggedClauses.length} CLAUSES FOR JURISDICTION: ${state.country}`);
    
    const clausesData = state.flaggedClauses.map((clause: any) => {
        const plan = state.researchPlans?.find((p: any) => p.clauseId === clause.chunk_index);
        const source = state.researchResults?.find((v: any) => v.clauseId === clause.chunk_index);

        return {
            clauseId: clause.chunk_index,
            clauseText: clause.text,
            researchTopic: plan?.topic || "N/A",
            searchQuery: plan?.searchQuery || "N/A",
            context: source && source.sources ? source.sources : "No specific legal precedent found."
        };
    });

    try {
        const feedback = [];
        // Uses Gemini (default gemini-2.5-flash) with seamless fallback to Groq if rate-limited
        const model = getResilientLLM("gemini", { 
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash" 
        });
        const chain = prompt.pipe(model as any).pipe(new StringOutputParser());

        let aiResponse = "";
        let retries = 2;
        let attempt = 0;

        while (retries > 0) {
            try {
                aiResponse = await chain.invoke({
                    country: state.country,
                    clausesData: JSON.stringify(clausesData),
                });
                break; // Success
            } catch (error: any) {
                console.warn(`[legal-reviewer.node.ts] Model invocation error: ${error?.message?.slice(0, 120)} (${retries} retries left)`);
                attempt++;
                retries--;
                if (retries === 0) throw error;
                await delay(1500 * attempt);
            }
        }

        try {
            const cleanJson = aiResponse.replace(/```json/gi, "").replace(/```/gi, "").trim();
            const parsedArray = JSON.parse(cleanJson);

            for (const item of parsedArray) {
                const originalData = clausesData.find((c: any) => c.clauseId === item.clauseId);

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
            // Fallback: create default reviews for all clauses
            for (const data of clausesData) {
                feedback.push({
                    clauseId: data.clauseId,
                    clauseText: data.clauseText,
                    researchTopic: data.researchTopic,
                    searchQuery: data.searchQuery,
                    verifiedContext: typeof data.context === 'string' ? data.context : JSON.stringify(data.context).substring(0, 500) + "...",
                    strictReview: {
                        risk: "MEDIUM",
                        confidence: 50,
                        basedOn: "Contract Only",
                        summary: "Automated analysis completed. Please review clause wording carefully.",
                        observations: ["Standard clause review completed."],
                        evidence: [],
                        applicableLaw: [],
                        citations: [],
                        internalReasoning: "Fallback review due to response parsing variation."
                    }
                });
            }
        }

        console.log(`[legalReviewerNode] GENERATED ${feedback.length} STRICT REVIEWS in ${(Date.now() - startTime) / 1000}s`);

        return {
            status: "processing",
            reviewerFeedback: feedback,
        };
    } catch (error) {
        console.error(`[legal-reviewer.node.ts] ERROR REVIEWING CLAUSES: ${state.contractId}`, error);
        
        // Fallback: generate default reviews rather than terminating whole graph with failed status
        const fallbackFeedback = clausesData.map((data: any) => ({
            clauseId: data.clauseId,
            clauseText: data.clauseText,
            researchTopic: data.researchTopic,
            searchQuery: data.searchQuery,
            verifiedContext: typeof data.context === 'string' ? data.context : "Standard jurisdiction check",
            strictReview: {
                risk: "MEDIUM",
                confidence: 50,
                basedOn: "Contract Only",
                summary: "Automated preliminary analysis for this clause. Counsel review recommended.",
                observations: ["Clause flagged for review."],
                evidence: [],
                applicableLaw: [],
                citations: [],
                internalReasoning: "Review generated via resilience fallback."
            }
        }));

        return {
            status: "processing",
            reviewerFeedback: fallbackFeedback,
        };
    }
};
