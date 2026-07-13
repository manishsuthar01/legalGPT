import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { AnalysisState } from "@/ai/types";

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

const builder = new StateGraph(GraphState);

export const analysisGraph = builder.compile();