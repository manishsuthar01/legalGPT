import { Annotation, StateGraph } from "@langchain/langgraph";

const GraphState = Annotation.Root({
    messageHistory: Annotation<any[]>(),
    contractId: Annotation<string>(),
    currentQuery: Annotation<string>(),
    clauses: Annotation<{ text: string, source: string }[]>(),
    analysis: Annotation<any>(),
    researchResults: Annotation<any[]>(),
    reviewerFeedback: Annotation<any[]>(),
    advisorFeedback: Annotation<any[]>(),
})

const builder = new StateGraph(GraphState)
//  add nodes 

export const chatGraph = builder.compile();