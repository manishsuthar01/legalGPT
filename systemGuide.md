# LegalGPT System Guide

LegalGPT is an enterprise-grade AI-powered contract analysis, review, and conversational legal assistant built with Next.js 16, LangGraph, and TypeScript.

## Core Features & Workflows

### 1. Automated Contract Analysis Pipeline (`src/ai/graph/analysis.graph.ts`)
Users upload contracts (PDF, TXT, or text input) to run an end-to-end multi-node stateful LangGraph pipeline:
- **Text Extraction & Cleaning**: Extracted using PDF parser utilities (`extractTextNode`), sanitized, and standardized (`cleanTextNode`).
- **Clause Splitting & Vector Embedding**: Segments contract into logical clauses (`splitClausesNode`) and generates embeddings stored in Supabase pgvector (`embedContractNode`).
- **Risk Identification & Flagging**: Flags high-risk and critical clauses (`flagImpClausesNode`).
- **Autonomous Legal Research**: Formulates a targeted web research plan (`planResearchNode`) and executes research queries using Tavily (`executeResearchNode`).
- **Multi-Reviewer Assessment**: Performs specialized legal analysis on flagged clauses (`legalReviewerNode`).
- **Executive Legal Advisory**: Aggregates reviews into an overall risk score, executive summary, key risks, and actionable recommendations (`legalAdvisorNode`).

### 2. Interactive RAG Chat (`src/ai/graph/chat.graph.ts`)
A RAG-powered legal chat assistant that:
- Maintains conversational history with user messages (`HumanMessage`, `AIMessage`).
- Dynamically queries vector embeddings from Supabase to pull relevant contract clauses as context.
- Answers specific legal queries accurately with direct references to contract clauses.

---

## Technical Stack & Architecture

- **Framework**: Next.js 16 (App Router) & React 19
- **Orchestration**: LangGraph state machine & LangChain
- **AI Models**: Google Gemini (`@langchain/google-genai`) & Groq (`@langchain/groq`)
- **Vector Database**: Supabase (`pgvector`)
- **Styling**: Tailwind CSS v4 & Lucide Icons
- **Language**: TypeScript (strict typing)

---

## Folder Structure Summary

- `src/ai/`: Graph definitions (`analysis.graph.ts`, `chat.graph.ts`), nodes, prompts, chains, and domain types.
- `src/app/`: Next.js App Router routes, layouts, and Server Server API endpoints (`/api/contracts/analyze`).
- `src/components/`: Reusable UI components and design system elements.
- `src/features/`: Modular feature domains (`analysis`, `chat`, `contracts`, `marketing`).
- `src/server/`: Backend services for contract parsing, graph invocation, and Supabase integration.
- `src/utils/`: Supabase client and helper utility functions.