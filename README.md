# LegalGPT

LegalGPT is an AI-powered contract analysis and legal advisory platform. It automatically ingests legal contracts (PDF, TXT, or pasted text), identifies potential business & legal risks, performs autonomous legal web research, and delivers executive risk reports alongside an interactive RAG legal chat assistant.

---

## Key Features

- **Automated Contract Ingestion & Parsing**: Extracts, sanitizes, and splits contract text into structured clauses.
- **Risk Identification & Flagging**: Evaluates clauses against legal standards to identify critical risk areas.
- **Autonomous Legal Web Research**: Deploys AI agents using search APIs (e.g. Tavily) to verify compliance, market standards, and legal risks.
- **Executive Legal Advisory**: Synthesizes clause-by-clause reviews into an overall risk rating, executive summary, and key recommendations.
- **Interactive RAG Legal Assistant**: RAG-powered chat that queries vector embeddings from Supabase to provide context-aware answers to contract-specific questions.

---

## Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Lucide Icons
- **AI Orchestration**: LangGraph, LangChain
- **Language Models**: Google Gemini (`@langchain/google-genai`), Groq (`@langchain/groq`)
- **Vector Database**: Supabase (`pgvector`)
- **Web Search API**: Tavily Search (`@langchain/tavily`)
- **Language**: TypeScript

---

## Local Setup Guide

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Supabase project with `pgvector` enabled
- API keys for Google Gemini, Groq, and Tavily

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/manishsuthar01/legalGPT.git
   cd legalGPT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   TAVILY_API_KEY=your_tavily_api_key
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

---

## Utility & Test Scripts

- **Test Chat Graph**: Run a quick offline/mock test invocation of the RAG Chat graph:
  ```bash
  npx tsx test-chat.ts
  ```

- **Print LangGraph Visual Diagram**: Output or print the graph node flow:
  ```bash
  npx tsx printGraph.ts
  ```

- **Type Check**:
  ```bash
  npx tsc --noEmit
  ```

---

## Architecture Overview

LegalGPT relies on stateful LangGraph workflows to process contracts:

- **Analysis Pipeline (`src/ai/graph/analysis.graph.ts`)**:
  `extractTextNode` -> `cleanTextNode` -> `splitClausesNode` -> `embedContractNode` -> `flagImpClausesNode` -> `planResearchNode` -> `executeResearchNode` -> `legalReviewerNode` -> `legalAdvisorNode`

- **Interactive RAG Chat (`src/ai/graph/chat.graph.ts`)**:
  Embeds user queries, searches vector embeddings stored in Supabase, and streams accurate legal context back to the user.

