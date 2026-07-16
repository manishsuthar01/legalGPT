import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";

export class DuckDuckGoSearchService {


    static async search(query: string, maxResults: number = 5) {
        try {
            const duckduckgoTool = new DuckDuckGoSearch({ maxResults });
            const result = await duckduckgoTool.invoke(query);
            return result;
        } catch (error) {
            console.error("Error in DuckDuckGoSearchService:", error);
            throw error;
        }
    }
}