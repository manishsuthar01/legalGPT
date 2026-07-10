Legal-GPT  is an AI-powered contract analysis and generation tool that helps users identify legal risks in contracts and create new legal documents. README.md:1-4

Core Features
1. Contract Scanner
Users can upload PDF or TXT files (or paste text) to receive an AI-generated risk analysis. ScanContract.jsx:335-337 The system uses Google Gemini AI to evaluate the contract against legal best practices and returns a structured report with: scanController.js:58-62

Overall Risk Rating: A traffic-light system (Red/Yellow/Green) indicating the document's safety level promptTemplate.js:8-10
Detailed Risk Cards: Each identified risk includes severity, title, plain-English explanation of the issue, and suggested mitigation strategies promptTemplate.js:12-19
Risk Summary: A 2-3 line overview of the contract's risk profile promptTemplate.js:11
2. Contract Generator
Users can create new legal documents by specifying: GenerateContract.jsx:7-13

Contract type (e.g., NDA, Service Agreement, Partnership Agreement)
Party names (Party A and Party B)
Key terms and details
The AI generates a legally sound contract with standard clauses (Scope, Confidentiality, Liability, Term, Signatures) based on the provided parameters. promptTemplate.js:26-43

Key Characteristics
Privacy-First: No contract data is stored or persisted; all processing happens in memory and is discarded immediately Security.jsx:21-24
No Authentication: Users can scan and generate contracts without creating an account Security.jsx:52-55
Stateless Architecture: Each request is independent, with no database or user tracking
Demo Mode: Falls back to mock responses when the Gemini API key is unavailable scanController.js:5-26
Notes
The application was built as a hackathon MVP focusing on core functionality and a professional user experience. README.md:4 It targets freelancers and legal professionals who need quick, plain-English insights into complex legal documents without the overhead of traditional legal review processes.