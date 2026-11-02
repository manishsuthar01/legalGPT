import { AnalysisState } from "../../types/analysis";
import { getResilientLLM } from "../../models";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { safeParseJsonObject } from "../../utils/json-parser";

interface DocumentClassification {
    isLegalDocument: boolean;
    documentType: string;
    documentTypeReason: string;
}

/**
 * Heuristic fallback classifier in case the LLM call times out or encounters network limits.
 */
function heuristicClassify(text: string, fileName: string): DocumentClassification {
    const lowerText = text.toLowerCase();
    const lowerFile = fileName.toLowerCase();

    // Check for clear resume signals
    const isResumeFileName = lowerFile.includes("resume") || lowerFile.includes("cv_") || lowerFile.endsWith("_cv.pdf") || lowerFile.includes("curriculum");
    const resumeKeywords = ["experience", "education", "skills", "projects", "technical skills", "summary", "bachelor", "master", "university", "linkedin", "github"];
    const resumeMatches = resumeKeywords.filter(k => lowerText.includes(k)).length;

    // Check for clear legal contract signals
    const legalKeywords = [
        "agreement", "contract", "parties", "whereas", "covenant", "indemnif",
        "liability", "governing law", "jurisdiction", "termination", "confidentiality",
        "intellectual property", "in witness whereof", "hereby agree"
    ];
    const legalMatches = legalKeywords.filter(k => lowerText.includes(k)).length;

    // Code / Tech doc indicators
    const isCode = lowerText.includes("import react") || lowerText.includes("const ") && lowerText.includes("function ") && lowerText.includes("export ");
    // Invoice indicators
    const isInvoice = (lowerFile.includes("invoice") || lowerFile.includes("receipt")) && (lowerText.includes("invoice no") || lowerText.includes("amount due") || lowerText.includes("bill to"));

    if (isResumeFileName || (resumeMatches >= 4 && legalMatches <= 2)) {
        return {
            isLegalDocument: false,
            documentType: "Resume / Curriculum Vitae",
            documentTypeReason: "The uploaded file contains candidate career history, education, and technical skills rather than binding contractual obligations or covenants."
        };
    }

    if (isCode) {
        return {
            isLegalDocument: false,
            documentType: "Source Code / Technical Script",
            documentTypeReason: "The uploaded file contains software source code or programmatic definitions rather than a legal contract."
        };
    }

    if (isInvoice) {
        return {
            isLegalDocument: false,
            documentType: "Financial Invoice / Receipt",
            documentTypeReason: "The uploaded file is a billing statement or commercial receipt lacking enforceable contractual terms or liability clauses."
        };
    }

    if (legalMatches >= 3) {
        return {
            isLegalDocument: true,
            documentType: "Commercial Agreement / Legal Contract",
            documentTypeReason: "The document contains standard legal provisions, bilateral clauses, and contractual covenants."
        };
    }

    // Default: If low legal signals and no specific contract structure
    if (legalMatches <= 1 && text.length < 5000) {
        return {
            isLegalDocument: false,
            documentType: "General Non-Legal Document",
            documentTypeReason: "The document does not contain recognizable contractual terms, parties, or legally binding covenants."
        };
    }

    return {
        isLegalDocument: true,
        documentType: "Legal Document",
        documentTypeReason: "The document contains legal or regulatory language requiring review."
    };
}

export const flagImpClausesNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[flagImpClausesNode] Classifying document & flagging clauses for contract: ${state.contractId}`);

    try {
        const clauses = state.clauses || [];
        const fullCleaned = state.cleanedText || clauses.map(c => c.text).join("\n\n");
        const fileName = (typeof state.uploadedFile === 'string' ? state.uploadedFile.split('/').pop() : '') || state.contractId || "document.pdf";

        // Step 1: Intelligent LLM Document Verification
        let classification: DocumentClassification | null = null;

        try {
            const classifierPrompt = ChatPromptTemplate.fromMessages([
                ["system", `You are a legal document verification system. Classify whether the uploaded document is a legally binding contract/legal document (e.g., Agreement, Contract, Terms of Service, Policy, Lease, NDA, Deed, License, By-laws, Settlement, Promissory Note) or a non-legal document (e.g., Resume/CV, Technical Documentation, Source Code, Invoice, Receipt, Essay, Academic Paper, Letter, Recipe, Casual Text).

Respond ONLY in raw JSON with no markdown formatting:
{{
  "isLegalDocument": boolean,
  "documentType": string,
  "documentTypeReason": string
}}`],
                ["human", `File Name: {fileName}\n\nDocument Excerpt:\n{excerpt}`]
            ]);

            const model = getResilientLLM("gemini", {
                model: process.env.GEMINI_MODEL || "gemini-2.5-flash",
                temperature: 0,
            });

            const chain = classifierPrompt.pipe(model as any).pipe(new StringOutputParser());
            const rawResponse = await chain.invoke({
                fileName,
                excerpt: fullCleaned.slice(0, 3000)
            });

            const parsed = safeParseJsonObject(rawResponse);
            if (parsed && typeof parsed.isLegalDocument === "boolean") {
                classification = {
                    isLegalDocument: parsed.isLegalDocument,
                    documentType: parsed.documentType || (parsed.isLegalDocument ? "Legal Contract" : "Non-Legal Document"),
                    documentTypeReason: parsed.documentTypeReason || "Document classification completed."
                };
            }
        } catch (llmErr) {
            console.warn("[flagImpClausesNode] Classifier LLM call failed, falling back to heuristic:", llmErr);
        }

        // If LLM classification did not return, use reliable deterministic heuristic
        if (!classification) {
            classification = heuristicClassify(fullCleaned, fileName);
        }

        console.log(`[flagImpClausesNode] Document classification for ${state.contractId}:`, classification);

        // Step 2: Handle Non-Legal Documents
        if (!classification.isLegalDocument) {
            console.log(`[flagImpClausesNode] Non-legal document detected (${classification.documentType}). Skipping clause risk flagging.`);
            return {
                status: "processing",
                isLegalDocument: false,
                documentType: classification.documentType,
                documentTypeReason: classification.documentTypeReason,
                flaggedClauses: []
            };
        }

        // Step 3: Legal Document Clause Flagging
        const importantKeywords = [
            "indemni", "liabilit", "terminat", "warrant", "confidential",
            "intellectual property", "non-compete", "non-solicit", "governing law",
            "jurisdiction", "arbitrat", "dispute", "payment", "damages", "breach",
            "remed", "covenant", "severabilit", "assign"
        ];

        let flagged = clauses.filter((clause) => {
            const lower = clause.text.toLowerCase();
            return importantKeywords.some((keyword) => lower.includes(keyword));
        });

        // Fallback: If legal document but specific keywords weren't caught in small chunk fragments,
        // flag up to top 4 clauses so the reviewer has material to analyze
        if (flagged.length === 0 && clauses.length > 0) {
            console.log(`[flagImpClausesNode] No keyword matches in legal document; flagging first ${Math.min(4, clauses.length)} clauses as baseline.`);
            flagged = clauses.slice(0, 4);
        }

        console.log(`[flagImpClausesNode] FLAGGED ${flagged.length} IMPORTANT CLAUSES FOR ${state.contractId} in ${(Date.now() - startTime) / 1000}s`);

        return {
            status: "processing",
            isLegalDocument: true,
            documentType: classification.documentType,
            documentTypeReason: classification.documentTypeReason,
            flaggedClauses: flagged,
        };

    } catch (error) {
        console.error(`[flagImpClausesNode] ERROR in flagImpClausesNode FOR ${state.contractId}:`, error);
        return {
            status: "processing",
            isLegalDocument: true,
            documentType: "Legal Contract",
            documentTypeReason: "Defaulted to legal contract analysis.",
            flaggedClauses: state.clauses?.slice(0, 3) || []
        };
    }
};
