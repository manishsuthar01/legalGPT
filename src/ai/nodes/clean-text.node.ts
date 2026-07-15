import { AnalysisState } from "@/ai/types";

export const cleanTextNode = async (state: AnalysisState): Promise<Partial<AnalysisState>> => {
    console.log(`[cleanTextNode] Cleaning text for contract: ${state.contractId}`);

    try {
        const rawText = state.extractedText;
        if (!rawText) {
            throw new Error("No extracted text found in state");
        }

        let cleanedText = rawText;

        cleanedText = cleanedText
            .replace(/\n{3,}/g, '\n\n') // Replace 3+ newlines with double newline
            .replace(/[ \t]+/g, ' ')    // Collapse multiple spaces/tabs into single space
            .trim();

        console.log(`[cleanTextNode] Text cleaned successfully. Length: ${cleanedText.length}`);
        return {
            cleanedText: cleanedText,
            status: "processing"
        };

    } catch (error) {
        console.error("[cleanTextNode] Error cleaning text:", error);
        return {
            status: "failed",
        };
    }
}
