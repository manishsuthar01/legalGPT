import { Annotation, StateGraph, MessagesAnnotation, START, END } from "@langchain/langgraph";

import { retrieveContextNode } from "@/ai/nodes/chat/retrieve-context.node";
import { generateResponseNode } from "@/ai/nodes/chat/generate-response.node";


export const GraphState = Annotation.Root({
    ...MessagesAnnotation.spec,
    contractId: Annotation<string>(),
    analysisSummary: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    retrievedContext: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState
    }),
    status: Annotation<"unknown" | "failed" | "success">({
        reducer: (oldState, newState) => newState || oldState,
    }),
})

const builder = new StateGraph(GraphState)
    .addNode('retrive_clauses', retrieveContextNode)
    .addNode('generate_response', generateResponseNode)

    .addEdge(START, 'retrive_clauses')
    .addEdge('retrive_clauses', 'generate_response')
    .addEdge('generate_response', END)


export const chatGraph = builder.compile();