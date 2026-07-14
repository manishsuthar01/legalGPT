import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { AnalysisState } from "@/ai/types";
import { supabaseAdmin } from "@/utils/supabase/admin";

export const extractTextNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[extractTextNode] Starting extraction for contract: ${state.contractId}`);
    try {
        const { data: fileBlob, error } = await supabaseAdmin.storage.from("contracts").download(state.uploadedFile);

        if (error || !fileBlob) {
            throw new Error(`Failed to download contract from Supabase storage: ${error?.message || "File not found"}`);
        }

        const pdfLoader = new PDFLoader(fileBlob, {
            splitPages: false
        });

        const docs = await pdfLoader.load();
        const extractedText = docs.map(doc => doc.pageContent).join("\n\n");

        if (!extractedText.trim()) {
            throw new Error("No text extracted from the document");
        }

        console.log(`[extractTextNode] Extracted ${extractedText.length} characters successfully`);

        return {
            extractedText: extractedText,
            status: "processing"
        }
    } catch (error) {
        console.error("[extractTextNode] Error extracting text:", error);

        return {
            status: "failed",
        }
    }
}