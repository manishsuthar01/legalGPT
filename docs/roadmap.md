# LegalGPT v2 — Roadmap

## Architecture and Workflow Updates

We are implementing a new advanced LangGraph workflow for contract analysis:

```text
User Contract (Vectorized)
           │
           ▼
      Flag Important Clauses
           │
           ▼
     Research Agent (Web)
           │
           ▼
     Source Verification
           │
           ▼
     Legal Reviewer Agent
           │
           ▼
     Legal Advisor Agent
           │
           ▼
 Executive Summary + Risk Cards
           │
           ▼
      Context-Aware Chat
```

### Upcoming Milestones

1. **Implement Agent Nodes:**
   - Develop Research Agent with web scraping and search capabilities.
   - Build Source Verification logic to check references.
   - Separate Reviewer and Advisor prompts.

2. **Integrate Output Generation:**
   - Connect the output to the `Executive Summary + Risk Cards` UI.
   - Enable `Context-Aware Chat` using the session history and verified sources.

3. **Enhance System Resilience:**
   - Error handling across LangGraph node transitions.
   - Retry logic for Research and LLM calls.
