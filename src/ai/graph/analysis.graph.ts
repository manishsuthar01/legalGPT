import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { AnalysisState } from "@/ai/types";
import { extractTextNode } from "@/ai/nodes/extract-text.node"
import { cleanTextNode } from "@/ai/nodes/clean-text.node"

const GraphState = Annotation.Root({
    contractId: Annotation<string>(),
    uploadedFile: Annotation<string>(),
    extractedText: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    cleanedText: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    clauses: Annotation<string[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    embeddings: Annotation<number[][]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    analysis: Annotation<any>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    summary: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    vectorIds: Annotation<string[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    status: Annotation<"pending" | "processing" | "completed">({
        reducer: (oldState, newState) => newState || oldState,
    })
});

const builder = new StateGraph(GraphState)
    .addNode("text-extract-node", extractTextNode)
    .addNode("text-clean-node", cleanTextNode)
    .addEdge(START, "text-extract-node")
    .addEdge("text-extract-node", "text-clean-node")
    .addEdge("text-clean-node", END);

// stategraph is a builder class that needs to be compiled to create a graph with methods like invoke, stream etc
export const analysisGraph = builder.compile();