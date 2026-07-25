# LegalGPT

LegalGPT is an AI-powered contract analysis and review application. It automatically processes legal documents, identifies potential risks, and provides a comprehensive executive summary along with actionable legal advice. The platform also includes a conversational interface that allows users to ask specific questions about the analyzed contract using Retrieval-Augmented Generation (RAG).

## Features

- **Automated Contract Analysis**: Extracts, cleans, and splits contract text into individual clauses.
- **Risk Identification**: Flags critical clauses and evaluates them for potential business and legal risks.
- **Deep Legal Research**: Employs autonomous AI agents to research flagged clauses and formulate professional reviews.
- **Legal Advisor**: Generates clear, actionable advice and overall risk scores based on the aggregated reviews.
- **Interactive Chat**: A RAG-powered assistant that retrieves specific context from the uploaded contract to accurately answer user inquiries.

## Technology Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS, TypeScript
- **AI Orchestration**: LangGraph, LangChain
- **Language Models**: Google Gemini, Groq
- **Database & Vector Store**: Supabase (pgvector)
- **Document Processing**: PDF parsing utilities

## Local Setup Guide

Follow these instructions to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project
- API keys for your preferred LLM providers (e.g., Google Gemini, Groq)

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

3. **Configure environment variables**
   Create a `.env.local` file in the root directory of the project and populate it with the necessary keys. You will need to configure your Supabase URL, Supabase service role key, and AI provider API keys.
   
   Example `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   GEMINI_API_KEY=your_gemini_api_key
   GROQ_API_KEY=your_groq_api_key
   # Add any additional required keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`.

## Architecture Overview

The application relies heavily on LangGraph to manage its stateful AI workflows:
- **Analysis Graph** (`src/ai/graph/analysis.graph.ts`): A multi-step pipeline that handles document ingestion, chunking, embedding generation, clause flagging, research, and final review.
- **Chat Graph** (`src/ai/graph/chat.graph.ts`): An interactive RAG pipeline that embeds user questions, retrieves relevant clauses from Supabase, and generates context-aware responses.
