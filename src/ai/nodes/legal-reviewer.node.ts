import { StringOutputParser } from "@langchain/core/output_parsers";
import { prompt } from "../prompts/legal-reviewer.prompt";
import { getLLM } from "../models";
import { AnalysisState } from "../types";
import fs from "fs";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const legalReviewerNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[legal-reviewer.node.ts] REVIEWING ${state.clauses.length} CLAUSES FOR JURISDICTION: ${state.country}`);
    try {
        const feedback = [];
        const { verifiedSources, country, clauses } = state;
        const model = getLLM("gemini");
        const chain = prompt.pipe(model).pipe(new StringOutputParser());

        for (let clause of state.flaggedClauses) {
            //    falgged clause me se koi sa hi isme aaega kyu ki humne flaggedClauses me se hi search kra hai or usi me se verification bhi
            //    ab yaha par hum uss clause ko reviews me add kreng
            const source = state.verifiedSources.find((v) => (
                v.clauseId === clause.chunk_index
            ))

            const context = source ? source.verifiedData : "No specific legal precedent found. Rely on general contract law principles."

            let review = "";
            let retries = 3;
            while (retries > 0) {
                try {
                    review = await chain.invoke({
                        country: state.country,
                        clause: clause.text,
                        context: context,
                    });
                    break; // Success, exit retry loop
                } catch (error: any) {
                    if (error?.status === 429 || error?.message?.includes("429") || error?.message?.includes("Rate limit")) {
                        console.warn(`[legal-reviewer.node.ts] Rate limited. Waiting 5 seconds before retrying... (${retries} retries left)`);
                        await delay(5000);
                        retries--;
                        if (retries === 0) throw error;
                    } else {
                        throw error;
                    }
                }
            }

            // Wait 1 second between clauses to reduce token burst rate
            await delay(1000);

            feedback.push({
                clauseId: clause.chunk_index,
                clauseText: clause.text,
                strictReview: review.trim()
            });

        }

        console.log(`[legalReviewerNode] GENERATED ${feedback.length} STRICT REVIEWS`);

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