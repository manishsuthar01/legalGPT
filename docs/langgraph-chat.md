# LangGraph Interactive Chat Workflow

LegalGPT includes a RAG-powered interactive conversational assistant that allows users to ask questions about analyzed contracts and receive context-grounded legal answers.

The chat workflow is built with LangGraph (`src/ai/graph/chat.graph.ts`) using a stateful directed graph.

---

## Graph Architecture

```text
       [ START ]
           │
           ▼
    retrive_clauses
  (Vector Search RAG)
           │
           ▼
   generate_response
   (LLM Reasoning)
           │
           ▼
        [ END ]
```

---

## Description of Nodes

1. **`retrive_clauses` (`retrieveContextNode`)**:
   - Extracts the latest user query from the conversational state.
   - Generates vector embeddings using Google Gemini (`gemini-embedding-001`).
   - Executes a similarity search against Supabase (`clauses` table with `match_clauses` RPC), scoped strictly to the current `contractId`.
   - Combines the top matching clauses into a unified context payload.

2. **`generate_response` (`generateResponseNode`)**:
   - Feeds the executive analysis summary, retrieved clause excerpts, and conversational history into the legal chat prompt pipeline.
   - Leverages high-performance Groq LLMs to produce clear, citations-aware, and actionable answers.
   - Appends the assistant's response to the state message list.

---

## Graph State Schema (`GraphState`)

The state is managed using `@langchain/langgraph` Annotations:

| State Key | Type | Reducer / Description |
| :--- | :--- | :--- |
| `messages` | `BaseMessage[]` | Handled via `MessagesAnnotation.spec` (appends new messages). |
| `contractId` | `string` | Contract identifier used for vector filtering. |
| `analysisSummary` | `string` | Executive overview of contract risks & recommendations. |
| `retrievedContext`| `string` | Most relevant clauses retrieved via similarity search. |
| `status` | `"unknown" \| "failed" \| "success"` | Tracks node execution outcome and error boundaries. |

---

## Offline Testing

Run an isolated test invocation of the chat graph:

```bash
npx tsx test-chat.ts
```
