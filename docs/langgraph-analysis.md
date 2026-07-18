# LangGraph Analysis Workflow

The analysis process for a contract follows this advanced LangGraph architecture:

```text
Extract Text
           │
           ▼
      Clean Text
           │
           ▼
      Split Clauses
           │
           ▼
   Embed Contract (Vectorized)
           │
           ▼
      Flag Important Clauses
           │
           ▼
      Plan Research
           │
           ▼
      Execute Research (Web)
           │
           ▼
      Legal Reviewer Agent
```

## Description of Nodes:

- **Extract Text**: Extracts the raw text from the uploaded contract document.
- **Clean Text**: Cleans and normalizes the extracted text for further processing.
- **Split Clauses**: Segments the cleaned text into distinct legal clauses.
- **Embed Contract**: Generates vector embeddings for each clause and stores them for retrieval.
- **Flag Important Clauses**: Initial node to identify high-risk or standard but crucial clauses.
- **Plan Research**: Creates a structured plan for researching legal precedents, regulations, or standards based on flagged clauses.
- **Execute Research**: Executes the planned research using web search tools and gathers verified legal context.
- **Legal Reviewer Agent**: A comprehensive review agent that uses the retrieved research context to analyze the clauses and provide detailed feedback, risk assessments, and observations.

The analysis executes on the backend and streams results to the client via Server-Sent Events (SSE) as each node completes, providing real-time feedback.
