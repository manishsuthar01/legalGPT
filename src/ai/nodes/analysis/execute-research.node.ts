import pLimit from "p-limit";
import { TavilySearchService } from "@/server/services/search/tavily_search";
import { AnalysisState, ResearchResult, TavilySource } from "../types";

export const executeResearchNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[executeResearchNode] EXECUTING RESEARCH FOR ${state.researchPlans?.length || 0} PLANS`);
    try {
        const { researchPlans } = state;
        const researchResults: ResearchResult[] = [];
        
        if (!researchPlans || researchPlans.length === 0) {
            return {
                researchResults: [],
                status: "processing"
            };
        }

        // Filter plans that actually need research
        const activePlans = researchPlans.filter(plan => plan.requiresResearch && plan.searchQuery);
        console.log(`[executeResearchNode] ${activePlans.length} PLANS REQUIRE ACTIVE RESEARCH`);

        // Cache to avoid duplicate searches for identical queries
        const searchCache = new Map<string, TavilySource[]>();
        
        // Setup concurrency limit of 3
        const limit = pLimit(3);

        const executeSearch = async (plan: typeof activePlans[0]) => {
            const query = plan.searchQuery;

            if (searchCache.has(query)) {
                console.log(`[executeResearchNode] Cache hit for query: "${query}"`);
                return {
                    clauseId: plan.clauseId,
                    topic: plan.topic,
                    searchQuery: query,
                    sources: searchCache.get(query)!
                };
            }

            console.log(`[executeResearchNode] Executing search for query: "${query}"`);
            try {
                // Perform the search
                const resultStr = await TavilySearchService.search(query, 2);
                let results: any = resultStr;
                
                // Parse if returned as string (depending on Tavily library version/wrapper)
                if (typeof resultStr === "string") {
                    try {
                        results = JSON.parse(resultStr);
                    } catch (e) {
                        console.warn(`[executeResearchNode] Failed to parse Tavily string output as JSON. Treating as raw content.`);
                        results = [{ url: "N/A", title: "Raw Search Result", content: resultStr }];
                    }
                }

                // Ensure it's an array for normalize
                const resultsArray = Array.isArray(results) ? results : (results.results || [results]);

                // Normalize results (ignoring favicon, images, score, etc.)
                const normalizedSources: TavilySource[] = resultsArray.map((r: any) => ({
                    title: r.title || "No Title",
                    url: r.url || "No URL",
                    content: r.content || r.snippet || JSON.stringify(r)
                }));

                searchCache.set(query, normalizedSources);

                return {
                    clauseId: plan.clauseId,
                    topic: plan.topic,
                    searchQuery: query,
                    sources: normalizedSources
                };
            } catch (error) {
                console.error(`[executeResearchNode] Error searching query "${query}":`, error);
                return {
                    clauseId: plan.clauseId,
                    topic: plan.topic,
                    searchQuery: query,
                    sources: []
                };
            }
        };

        // Execute all active plans with concurrency limits
        const searchPromises = activePlans.map(plan => limit(() => executeSearch(plan)));
        const activeResults = await Promise.all(searchPromises);
        
        researchResults.push(...activeResults);

        // Add dummy results for plans that didn't need research
        const inactivePlans = researchPlans.filter(plan => !plan.requiresResearch);
        for (const plan of inactivePlans) {
            researchResults.push({
                clauseId: plan.clauseId,
                topic: plan.topic,
                searchQuery: plan.searchQuery || "N/A",
                sources: []
            });
        }

        console.log(`[executeResearchNode] COMPLETED ${researchResults.length} TOTAL RESEARCH RESULTS in ${(Date.now() - startTime) / 1000}s`);
        
        return {
            researchResults,
            status: "processing",
        };
    } catch (error) {
        console.error(`[executeResearchNode] ERROR EXECUTING RESEARCH:`, error);
        return { status: "failed" };
    }
}
