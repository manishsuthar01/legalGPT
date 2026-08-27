# LegalGPT — API Design Specification

This document details the HTTP API endpoints implemented and planned across LegalGPT.

---

## 1. Contract Analysis API

### `POST /api/contracts/analyze`

Executes the end-to-end LangGraph analysis pipeline for a contract file and streams step-by-step progress and final reports back to the client using **Server-Sent Events (SSE)**.

- **Content-Type**: `application/json`
- **Response Type**: `text/event-stream`

#### Request Body Schema

```json
{
  "contractId": "string (UUID or unique contract identifier)",
  "userId": "string (User identifier)",
  "filePath": "string (Supabase storage path to the contract document)",
  "country": "string (Jurisdiction for legal review, e.g. 'United States', 'India')"
}
```

#### Validation

Validates input via Zod schema (`analyzeContractBodySchema`).
- Returns HTTP `400 Bad Request` with structured error details if payload is invalid.

#### SSE Stream Format

Events are streamed using the SSE standard (`data: <JSON>\n\n`):

1. **Progress Update (`type: 'node_complete'`):**
   ```json
   data: {"type":"node_complete","node":"clause-split-node"}
   ```

2. **Final Completion (`status: 'DONE'`):**
   ```json
   data: {"status":"DONE","data":{"overallRiskScore":8,"executiveSummary":"...","risks":[...]}}
   ```

3. **Stream Error (`status: 'error'`):**
   ```json
   data: {"status":"error","message":"Detailed error description"}
   ```

---

## 2. Interactive Legal Chat API

### `POST /api/contracts/:contractId/chat` (Planned)

Context-aware RAG endpoint enabling users to ask questions about specific clauses and receive grounded legal advice.

- **Content-Type**: `application/json`
- **Response Type**: `application/json` (or streaming SSE)

#### Request Body Schema

```json
{
  "message": "string (User query regarding the contract)"
}
```

#### Response Format

```json
{
  "id": "msg-1700000000000",
  "role": "assistant",
  "content": "Under Clause 4, the non-compete obligation extends for 12 months post-termination...",
  "timestamp": "2026-08-27T17:00:00.000Z",
  "sources": [
    {
      "clauseNumber": 4,
      "relevanceScore": 0.89
    }
  ]
}
```

---

## HTTP Status Codes & Error Handling

| Status Code | Description | Payload Structure |
| :--- | :--- | :--- |
| `200 OK` | Successful response or active SSE stream | Stream / JSON |
| `400 Bad Request` | Missing or malformed parameters | `{"success": false, "error": "...", "details": {...}}` |
| `404 Not Found` | Contract or document path does not exist | `{"success": false, "error": "Resource not found"}` |
| `500 Internal Error`| Unhandled server or graph execution failure | `{"success": false, "error": "Internal server error"}` |
