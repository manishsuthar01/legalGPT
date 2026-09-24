import { StringOutputParser } from "@langchain/core/output_parsers";
import { getResilientLLM } from "../../models";
import { AnalysisState, ResearchPlan } from "../../types/analysis";
import { searchQueryPrompt } from "../../prompts/analysis/search_query_prompt";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const planResearchNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[planResearchNode] PLANNING RESEARCH FOR ${state.flaggedClauses.length} CLAUSES`);
    try {
        const researchPlans: ResearchPlan[] = [];
        const { flaggedClauses, country } = state;
        const model = getResilientLLM("groq");

        // We'll use a JSON mode if possible, but standard prompt + StringOutputParser with JSON.parse works
        const chain = searchQueryPrompt.pipe(model as any).pipe(new StringOutputParser());

        const clausesInput = JSON.stringify(flaggedClauses.map((c: any) => ({
            clauseId: c.chunk_index,
            text: c.text
        })));

        let planResult = "";
        let retries = 2;
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
                console.warn(`[planResearchNode] Warning during plan research: ${error?.message?.slice(0, 100)} (${retries} retries left)`);
                attempt++;
                retries--;
                if (retries === 0) {
                    flaggedClauses.forEach((clause: any) => {
                        researchPlans.push({
                            clauseId: clause.chunk_index,
                            topic: "Jurisdiction compliance check",
                            requiresResearch: false,
                            searchQuery: "",
                            reason: "Automated preliminary analysis check"
                        });
                    });
                } else {
                    await delay(1500 * attempt);
                }
            }
        }

        console.log(`[planResearchNode] GENERATED ${researchPlans.length} RESEARCH PLANS in ${(Date.now() - startTime) / 1000}s`);

        return {
            researchPlans,
            status: "processing",
        };
    } catch (error) {
        console.error(`[planResearchNode] ERROR PLANNING RESEARCH:`, error);
        const fallbackPlans = (state.flaggedClauses || []).map((clause: any) => ({
            clauseId: clause.chunk_index,
            topic: "Jurisdiction compliance check",
            requiresResearch: false,
            searchQuery: "",
            reason: "Fallback check due to temporary planner constraint"
        }));
        return {
            researchPlans: fallbackPlans,
            status: "processing",
        };
    }
}

