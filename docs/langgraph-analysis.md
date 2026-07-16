# LangGraph Analysis Workflow

The analysis process for a contract follows this advanced LangGraph architecture:

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

## Description of Nodes:

- **User Contract (Vectorized)**: The uploaded contract is split into chunks and embedded into the vector database.
- **Flag Important Clauses**: Initial node to identify high-risk or standard but crucial clauses.
- **Research Agent (Web)**: Uses search to find relevant legal precedents, regulations, or standards.
- **Source Verification**: Ensures the research is accurate and applicable to the contract's jurisdiction.
- **Legal Reviewer Agent**: A first-pass agent that performs strict review against standard playbooks.
- **Legal Advisor Agent**: A second-pass agent that provides more nuanced, advisory feedback and synthesizes risks.
- **Executive Summary + Risk Cards**: Output generation node summarizing the findings into an actionable format.
- **Context-Aware Chat**: Interactive node allowing the user to converse with the analyzed contract state.
