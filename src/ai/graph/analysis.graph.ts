import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { AnalysisState } from "@/ai/types";
import { extractTextNode } from "@/ai/nodes/extract-text.node"
import { cleanTextNode } from "@/ai/nodes/clean-text.node"
import { splitClauseNode } from "@/ai/nodes/split-clauses.node"
import { embedContracNode } from "@/ai/nodes/embed-contract.node"
import { flagImpClausesNode } from "@/ai/nodes/flag-imp-clauses.node"
import { planResearchNode } from "@/ai/nodes/plan-research.node"
import { executeResearchNode } from "@/ai/nodes/execute-research.node"
import { legalReviewerNode } from "@/ai/nodes/legal-reviewer.node"

const GraphState = Annotation.Root({
    contractId: Annotation<string>(),
    country: Annotation<string>(),
    uploadedFile: Annotation<string>(),
    extractedText: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    cleanedText: Annotation<string>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    clauses: Annotation<{ text: string, source: string }[]>({
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
    }),
    flaggedClauses: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    researchPlans: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    researchResults: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    verifiedSources: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    reviewerFeedback: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    advisorFeedback: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    }),
    riskCards: Annotation<any[]>({
        reducer: (oldState, newState) => newState || oldState,
    })
});

const builder = new StateGraph(GraphState)
    .addNode("text-extract-node", extractTextNode)
    .addNode("text-clean-node", cleanTextNode)
    .addNode("clause-split-node", splitClauseNode)
    .addNode("contract-embed-node", embedContracNode)
    .addNode("flag-imp-clauses-node", flagImpClausesNode)
    .addNode("plan-research-node", planResearchNode)
    .addNode("execute-research-node", executeResearchNode)
    .addNode("legal-reviewer-node", legalReviewerNode)
    .addEdge(START, "text-extract-node")
    .addEdge("text-extract-node", "text-clean-node")
    .addEdge("text-clean-node", "clause-split-node")
    .addEdge("clause-split-node", "contract-embed-node")
    .addEdge("contract-embed-node", "flag-imp-clauses-node")
    .addEdge("flag-imp-clauses-node", "plan-research-node")
    .addEdge("plan-research-node", "execute-research-node")
    .addEdge("execute-research-node", "legal-reviewer-node")
    .addEdge("legal-reviewer-node", END);

// stategraph is a builder class that needs to be compiled to create a graph with methods like invoke, stream etc
export const analysisGraph = builder.compile();