import { AnalysisState } from "@/ai/types/analysis";
import { supabaseAdmin } from "@/utils/supabase/admin";

export const extractTextNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    const startTime = Date.now();
    console.log(`[extractTextNode] Starting extraction for contract: ${state.contractId}`);
    try {
        const { data: fileBlob, error } = await supabaseAdmin.storage.from("contracts").download(state.uploadedFile);

        if (error || !fileBlob) {
            throw new Error(`Failed to download contract from Supabase storage: ${error?.message || "File not found"}`);
        }

        const arrayBuffer = await fileBlob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        let extractedText = "";

        // Strategy 1: Direct pure-JS pdf-parse internal lib (reliable, zero canvas / native dependencies)
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const pdfParseLib = require("pdf-parse/lib/pdf-parse.js");
            const data = await pdfParseLib(buffer);
            extractedText = data.text || "";
        } catch (err1) {
            console.warn("[extractTextNode] Strategy 1 (pdf-parse/lib) failed, trying standard require:", err1);
            try {
                // Strategy 2: Standard pdf-parse entry
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                const pdfDefault = require("pdf-parse");
                const data = await pdfDefault(buffer);
                extractedText = data.text || "";
            } catch (err2) {
                console.warn("[extractTextNode] Strategy 2 (pdf-parse) failed, trying LangChain PDFLoader:", err2);
                // Strategy 3: LangChain PDFLoader
                const { PDFLoader } = await import("@langchain/community/document_loaders/fs/pdf");
                const loader = new PDFLoader(fileBlob, { splitPages: false });
                const docs = await (loader as any).load();
                extractedText = docs.map((d: any) => d.pageContent).join("\n\n");
            }
        }

        if (!extractedText || !extractedText.trim()) {
            throw new Error("No text extracted from the document");
        }

        console.log(`[extractTextNode] Extracted ${extractedText.length} characters successfully in ${(Date.now() - startTime) / 1000}s`);

        return {
            extractedText: extractedText,
            status: "processing"
        };
    } catch (error) {
        console.error("[extractTextNode] Error extracting text:", error);

        return {
            status: "failed",
        };
    }
};

