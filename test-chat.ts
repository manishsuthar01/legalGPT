import { chatGraph } from "./src/ai/graph/chat.graph";
import { HumanMessage } from "@langchain/core/messages";
import * as dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

async function main() {
    console.log("Starting Chat Graph Test...");

    try {
        const initialState = {
            contractId: "test-id",
            analysisSummary: "This is a standard non-disclosure agreement with a term of 2 years.",
            retrievedContext: "Clause 3: Confidentiality obligations shall survive for a period of two (2) years following termination.",
            messages: [
                new HumanMessage("How long do the confidentiality obligations last?"),
            ],
            status: "success" as const
        };

        const result = await chatGraph.invoke(initialState);
        
        console.log("\n--- RESULT ---");
        console.log("Status:", result.status);
        console.log("Messages:");
        result.messages.forEach((msg: any, i: number) => {
             console.log(`[Message ${i + 1}] Type: ${msg._getType()}, Content:\n${msg.content}`);
        });

    } catch (error) {
        console.error("Test failed:", error);
    }
}

main();
