import { TavilySearch } from "@langchain/tavily";

export class TavilySearchService {
    static async search(query: string, maxResults: number = 3) {
        try {

            const tavilyTool = new TavilySearch({
                maxResults
            });

            const result = await tavilyTool.invoke({ query });
            return result;
        } catch (error) {
            console.error("Error in TavilySearchService:", error);
            throw error;
        }
    }
}
