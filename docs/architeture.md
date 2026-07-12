# LegalGPT v2 — System Architecture

> AI-powered Legal Contract Analysis Workspace built with **Next.js 16**, **LangChain.js**, **LangGraph.js**, **Groq LLM**, **Supabase (Postgres + pgvector + Storage + Auth)**, and a dedicated **AI Compute Worker**.

---

# Vision

LegalGPT is not a chatbot.

It is an AI-powered legal workspace where users can:

- Upload legal contracts
- Receive AI-powered risk analysis
- Chat with the contract
- Understand clauses
- Rewrite risky clauses
- Generate negotiation suggestions
- (Future) Generate contracts

The application follows a modular AI architecture inspired by modern AI products like Cursor and Notion AI.

---

# High-Level Architecture

```text
                           User Browser
                                 │
                                 ▼
                    Next.js 16 Application
                                 │
      ┌──────────────────────────┼──────────────────────────┐
      ▼                          ▼                          ▼
  Authentication             API Routes              Streaming UI
                                 │
                                 ▼
                    LangGraph Workflow Engine
                                 │
                ┌────────────────┴────────────────┐
                ▼                                 ▼
          Groq LLM API                  AI Compute Worker
                                             │
                 ┌───────────────────────────┴────────────────────────────┐
                 ▼                                                        ▼
        Document Processing                                  Supabase Platform
                                                        (Storage + PostgreSQL +
                                                          pgvector + Auth)
```

---

# Core Principles

- Thin Next.js server
- Dedicated AI compute service
- Retrieval-Augmented Generation (RAG)
- Streaming AI responses
- Stateless API routes
- Background document processing
- Explainable AI
- Modular LangGraph workflows
- Production-ready architecture

---

# System Components

---

## 1. Next.js Application

### Technology

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- LangChain.js
- LangGraph.js

### Responsibilities

- User interface
- Authentication
- File upload
- Dashboard
- Contract workspace
- Chat interface
- Streaming responses
- LangGraph orchestration
- API routes
- Session management

The web application should remain lightweight.

It **never generates embeddings** directly.

---

## 2. AI Compute Worker

### Technology

Node.js

### Responsibilities

- PDF extraction
- DOCX extraction
- OCR (future)
- Text normalization
- Clause segmentation
- Embedding generation
- Background AI jobs
- Vector indexing

The worker performs all CPU-intensive AI tasks.

It has no UI.

---

## 3. Groq LLM

Responsibilities

- Contract analysis
- Risk scoring
- Executive summaries
- Clause explanation
- Context-aware chat
- Streaming responses
- Future contract generation

Groq is used only for reasoning.

Embeddings are generated locally by the worker.

---

## 4. Supabase

Supabase becomes the application's backend platform.

It replaces multiple standalone services.

### Services Used

- PostgreSQL
- pgvector
- Storage
- Authentication
- Row Level Security (future)

---

# Supabase Storage

Stores uploaded files.

Example

```
contracts/

    user-id/

        nda.pdf

        employment.pdf
```

The worker downloads documents from Storage instead of receiving large files over HTTP.

---

# PostgreSQL

Stores relational data.

Example tables

- users
- contracts
- analyses
- risks
- chat_sessions
- chat_messages

---

# pgvector

Stores semantic embeddings.

Each vector represents one contract chunk.

Example

```text
Chunk

↓

Embedding

↓

Stored in pgvector

↓

Similarity Search
```

Metadata example

```json
{
  "contractId": "...",
  "clause": "8.2",
  "page": 12,
  "heading": "Limitation of Liability",
  "chunkIndex": 34
}
```

---

# Authentication

Handled entirely by Supabase Auth.

Future:

- Email login
- Google OAuth
- GitHub OAuth

---

# Docker Development Environment

```text
Docker Compose

├── legalgpt-web
│      Next.js
│
├── legalgpt-worker
│      Node.js AI Worker
│
└── optional-local-supabase
```

In production:

Supabase is hosted.

Only the Web and Worker services are deployed.

---

# Project Structure

```text
legalgpt/

apps/

    web/
        Next.js Application

    worker/
        AI Compute Worker

packages/

    ai/
        LangGraph nodes

    prompts/
        Prompt templates

    shared/
        Shared types

docker/

    docker-compose.yml

docs/

    architecture.md

    api.md

    langgraph-analysis.md

    langgraph-chat.md

    database.md
```

---

# Upload Workflow

```text
User

↓

Upload PDF

↓

Next.js

↓

Supabase Storage

↓

Create Analysis Job

↓

AI Worker

↓

Download File

↓

Extract Text

↓

Normalize Text

↓

Split into Clauses

↓

Generate Embeddings

↓

Store Vectors (pgvector)

↓

Store Metadata (Postgres)

↓

Notify Completion

↓

Next.js

↓

Run Analysis Graph

↓

Display Risk Report
```

---

# Analysis Workflow

LangGraph orchestrates the analysis process.

```text
START

↓

Validate Upload

↓

Wait for Worker

↓

Retrieve Contract

↓

Retrieve Embeddings

↓

Retrieve Relevant Legal Knowledge

↓

Risk Analysis

↓

Generate Executive Summary

↓

Generate Risk Cards

↓

Persist Results

↓

Enable Chat

↓

END
```

---

# Chat Workflow

```text
User Question

↓

LangGraph Chat Graph

↓

Retrieve Chat History

↓

Embed User Query

↓

Similarity Search (pgvector)

↓

Retrieve Relevant Contract Chunks

↓

Retrieve Relevant Legal Clauses

↓

Merge Context

↓

Groq

↓

Streaming Response

↓

Save Conversation

↓

END
```

---

# AI Worker Pipeline

```text
Receive Job

↓

Download Contract

↓

Extract Text

↓

Normalize

↓

Split into Clauses

↓

Generate Embeddings

↓

Store in pgvector

↓

Store Metadata

↓

Mark Job Complete
```

---

# Why Use a Dedicated Worker?

Benefits

- Faster API responses
- Lower memory usage
- Independent scaling
- Better fault isolation
- Easier monitoring
- No Next.js request blocking

The worker handles expensive AI computation while the web application focuses on user experience.

---

# Future Job Queue

Current

```text
Next.js

↓

Worker
```

Future

```text
Next.js

↓

Queue

↓

Worker Pool

↓

Supabase
```

Possible queue technologies

- BullMQ
- Trigger.dev
- Inngest

---

# Future AI Features

The architecture is designed to support additional LangGraph workflows.

Examples

- Contract Generation
- Contract Comparison
- Clause Rewrite
- Negotiation Assistant
- Compliance Reports
- Version Comparison
- Team Collaboration

Each feature becomes its own graph while sharing the same retrieval infrastructure.

---

# Design Principles

- AI-first architecture
- Modular LangGraph workflows
- Thin web server
- Dedicated compute worker
- Retrieval-first reasoning
- Streaming-first user experience
- Explainable AI
- Separation of concerns
- Type-safe codebase
- Scalable system design

---

# Long-Term Vision

LegalGPT evolves into a complete AI Legal Workspace.

The application should feel closer to Cursor than to a traditional chatbot.

Users don't simply "chat with a PDF."

They upload contracts into a persistent workspace where AI continuously assists with analysis, legal reasoning, negotiations, and document generation.