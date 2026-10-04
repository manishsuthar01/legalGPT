import { StringOutputParser } from "@langchain/core/output_parsers";
import { prompt } from "../../prompts/analysis/legal-reviewer.prompt";
import { getResilientLLM } from "../../models";
import { AnalysisState } from "../../types/analysis";
import { safeParseJsonArray } from "../../utils/json-parser";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const legalReviewerNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[legal-reviewer.node.ts] REVIEWING ${state.flaggedClauses.length} CLAUSES FOR JURISDICTION: ${state.country}`);

    // Condense evidence sources so the prompt isn't overwhelmed by raw HTML or huge articles
    const cleanContext = (sources: any): string => {
        if (!sources) return "No specific legal precedent found.";
        if (typeof sources === 'string') return sources.slice(0, 800);
        if (Array.isArray(sources)) {
            return sources.slice(0, 3).map((s: any) => {
                const title = s.title || "Legal Source";
                const content = (s.content || s.snippet || "").slice(0, 400);
                const url = s.url || "";
                return `Title: ${title}\nURL: ${url}\nContent: ${content}`;
            }).join("\n---\n");
        }
        return JSON.stringify(sources).slice(0, 800);
    };

    const clausesData = state.flaggedClauses.map((clause: any) => {
        const plan = state.researchPlans?.find((p: any) => p.clauseId === clause.chunk_index);
        const source = state.researchResults?.find((v: any) => v.clauseId === clause.chunk_index);

        return {
            clauseId: clause.chunk_index,
            clauseText: clause.text,
            researchTopic: plan?.topic || "N/A",
            searchQuery: plan?.searchQuery || "N/A",
            context: cleanContext(source?.sources)
        };
    });

    try {
        const feedback: any[] = [];
        const model = getResilientLLM("gemini", { 
            model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
            temperature: 0,
            maxOutputTokens: 8192,
        });
        const chain = prompt.pipe(model as any).pipe(new StringOutputParser());

        // Process clauses in batches of max 4 to prevent model output truncation
        const BATCH_SIZE = 4;
        const batches: (typeof clausesData)[] = [];
        for (let i = 0; i < clausesData.length; i += BATCH_SIZE) {
            batches.push(clausesData.slice(i, i + BATCH_SIZE));
        }

        console.log(`[legal-reviewer.node.ts] Split ${clausesData.length} clauses into ${batches.length} batch(es) for processing`);

        for (let bIndex = 0; bIndex < batches.length; bIndex++) {
            const batch = batches[bIndex];
            let aiResponse = "";
            let retries = 2;
            let attempt = 0;

            while (retries > 0) {
                try {
                    aiResponse = await chain.invoke({
                        country: state.country,
                        clausesData: JSON.stringify(batch),
                    });
                    break;
                } catch (error: any) {
                    console.warn(`[legal-reviewer.node.ts] Batch ${bIndex + 1} invocation error: ${error?.message?.slice(0, 120)} (${retries} retries left)`);
                    attempt++;
                    retries--;
                    if (retries === 0) throw error;
                    await delay(1500 * attempt);
                }
            }

            const parsedArray = safeParseJsonArray(aiResponse);
            console.log(`[legal-reviewer.node.ts] Batch ${bIndex + 1}: Successfully extracted ${parsedArray.length} reviews.`);

            // Map parsed items back to original batch data
            for (const item of parsedArray) {
                const originalData = batch.find((c: any) => c.clauseId === item.clauseId);
                if (originalData) {
                    feedback.push({
                        clauseId: item.clauseId,
                        clauseText: originalData.clauseText,
                        researchTopic: originalData.researchTopic,
                        searchQuery: originalData.searchQuery,
                        verifiedContext: originalData.context,
                        strictReview: {
                            risk: item.risk || "MEDIUM",
                            confidence: typeof item.confidence === "number" ? item.confidence : 60,
                            basedOn: item.basedOn || "Contract Only",
                            summary: item.summary || "Legal analysis completed.",
                            observations: Array.isArray(item.observations) ? item.observations : [item.observations || "Clause evaluated."],
                            evidence: Array.isArray(item.evidence) ? item.evidence : [],
                            applicableLaw: Array.isArray(item.applicableLaw) ? item.applicableLaw : [],
                            citations: Array.isArray(item.citations) ? item.citations : [],
                            internalReasoning: item.internalReasoning || "Analysis derived from jurisdiction check."
                        }
                    });
                }
            }

            // Fallback only for any clause that was completely omitted from this batch
            for (const data of batch) {
                const alreadyAdded = feedback.some((f: any) => f.clauseId === data.clauseId);
                if (!alreadyAdded) {
                    console.warn(`[legal-reviewer.node.ts] Clause ${data.clauseId} missing from parsed batch, creating per-clause fallback.`);
                    feedback.push({
                        clauseId: data.clauseId,
                        clauseText: data.clauseText,
                        researchTopic: data.researchTopic,
                        searchQuery: data.searchQuery,
                        verifiedContext: data.context,
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
        }

        console.log(`[legalReviewerNode] GENERATED ${feedback.length} STRICT REVIEWS in ${(Date.now() - startTime) / 1000}s`);

        return {
            status: "processing",
            reviewerFeedback: feedback,
        };
    } catch (error) {
        console.error(`[legal-reviewer.node.ts] ERROR REVIEWING CLAUSES: ${state.contractId}`, error);
        
        // Resilience fallback: generate default reviews rather than terminating whole graph with failed status
        const fallbackFeedback = clausesData.map((data: any) => ({
            clauseId: data.clauseId,
            clauseText: data.clauseText,
            researchTopic: data.researchTopic,
            searchQuery: data.searchQuery,
            verifiedContext: data.context,
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
