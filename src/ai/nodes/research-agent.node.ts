import { TavilySearchService } from "@/server/services/search/tavily_search";
import { AnalysisState } from "../types";

export const researchAgentNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[researchAgentNode] RESEARCHING ${state.flaggedClauses.length} CLAUSES FOR JURISDICTION: ${state.country}`);
    try {
        const searchResults = [];
        const { flaggedClauses, country } = state;

        for (const clause of flaggedClauses) {
            const snippet = clause.text.split(" ").slice(0, 8).join(" ");
            const query = `legal standard precedent for "${snippet}" in ${country} contract law`;
            // console.log(`[researchAgentNode] SEARCHING FOR: ${query}`);

            const results = await TavilySearchService.search(query, 2);

            searchResults.push({
                clauseId: clause.chunk_index,
                query,
                result: results
            })
        }


        console.log(`[researchAgentNode] FOUND ${searchResults.length} RESEARCH RESULTS`);
        return {
            researchResults: searchResults,
            status: "processing",
        }


    }
    catch (error) {
        console.error(`[researchAgentNode] ERROR RESEARCHING`, error);
        return { status: "failed" };
    }
}