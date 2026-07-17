import { StringOutputParser } from "@langchain/core/output_parsers";
import { getLLM } from "../models";
import { AnalysisState, ResearchPlan } from "../types";
import { searchQueryPrompt } from "../prompts/search_query_prompt";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const planResearchNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[planResearchNode] PLANNING RESEARCH FOR ${state.flaggedClauses.length} CLAUSES`);
    try {
        const researchPlans: ResearchPlan[] = [];
        const { flaggedClauses, country } = state;
        const model = getLLM("groq");

        // We'll use a JSON mode if possible, but standard prompt + StringOutputParser with JSON.parse works
        const chain = searchQueryPrompt.pipe(model).pipe(new StringOutputParser());

        const clausesInput = JSON.stringify(flaggedClauses.map(c => ({
            clauseId: c.chunk_index,
            text: c.text
        })));

        let planResult = "";
        let retries = 3;
        let attempt = 0;
        while (retries > 0) {
            try {
                planResult = await chain.invoke({
                    country: country,
                    clauses: clausesInput,
                });

                // Clean markdown formatting if present
                const cleanedString = planResult.replace(/```json/g, "").replace(/```/g, "").trim();
                const parsedPlans = JSON.parse(cleanedString);

                if (Array.isArray(parsedPlans)) {
                    for (const plan of parsedPlans) {
                        researchPlans.push({
                            clauseId: plan.clauseId,
                            topic: plan.topic || "General",
                            requiresResearch: plan.requiresResearch !== false, // default true
                            searchQuery: plan.query || "",
                            reason: plan.reason || "Determined by LLM",
                        });
                    }
                }

                break;
            } catch (error: any) {
                if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Rate limit")) {
                    console.warn(`[planResearchNode] Rate limited. Waiting before retrying... (${retries} retries left)`);
                    await delay(2000 * Math.pow(2, attempt));
                    attempt++;
                    retries--;
                    if (retries === 0) throw error;
                } else if (error instanceof SyntaxError) {
                    console.warn(`[planResearchNode] JSON Parse Error: ${error.message}. Retrying...`);
                    retries--;
                    if (retries === 0) {
                        // Fallback to basic if parsing fails repeatedly
                        flaggedClauses.forEach(clause => {
                            researchPlans.push({
                                clauseId: clause.chunk_index,
                                topic: "Unparseable LLM output",
                                requiresResearch: false,
                                searchQuery: "",
                                reason: "Failed to parse LLM search query instructions."
                            });
                        });
                    }
                } else {
                    throw error;
                }
            }
        }

        // Rate limiting pause just in case
        await delay(1000);

        console.log(`[planResearchNode] GENERATED ${researchPlans.length} RESEARCH PLANS in ${(Date.now() - startTime) / 1000}s`);

        return {
            researchPlans,
            status: "processing",
        };
    } catch (error) {
        console.error(`[planResearchNode] ERROR PLANNING RESEARCH:`, error);
        return { status: "failed" };
    }
}
