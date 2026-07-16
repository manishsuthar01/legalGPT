import { AnalysisState } from "../types";
import { getLLM } from "../models/index";
import { prompt } from "../prompts/search-result-verify.prompt"
import { StringOutputParser } from "@langchain/core/output_parsers";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const sourceVerificationNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[source-verification.node.ts] VERIFYING SOURCES FOR ${state.contractId}`);
    try {
        const verified = [];
        const { researchResults, country } = state;
        const model = getLLM("groq");

        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        for (const res of state.researchResults) {

            const textResult = typeof res.result === "string" ? res.result : JSON.stringify(res.result);
            
            let aiResponse = "";
            let retries = 3;
            while (retries > 0) {
                try {
                    aiResponse = await chain.invoke({
                        country: state.country,
                        query: res.query,
                        results: textResult,
                    });
                    break;
                } catch (error: any) {
                    if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Rate limit")) {
                        console.warn(`[source-verification.node.ts] Rate limited. Waiting 5 seconds before retrying... (${retries} retries left)`);
                        await delay(5000);
                        retries--;
                        if (retries === 0) throw error;
                    } else {
                        throw error;
                    }
                }
            }
            
            // Wait 1 second to reduce token burst rate
            await delay(1000);

            if (!aiResponse.includes("IRRELEVANT")) {
                verified.push({
                    clauseId: res.clauseId,
                    query: res.query,
                    verifiedData: aiResponse.trim()
                });
            }
        }
        console.log(`[sourceVerificationNode] VERIFIED ${verified.length} SOURCES SUCCESSFULLY`);
        return {
            status: "processing",
            verifiedSources: verified,
        }

    } catch (error) {
        console.log(`[source-verification.node.ts] ERROR VERIFYING SOURCES: ${state.contractId}`, error);
        return { status: "failed" };
    }

}