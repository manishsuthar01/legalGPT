import { NextRequest, NextResponse } from "next/server";
import { analyzeContractBodySchema } from "@/lib/validations/contract";
import { AnalysisService } from "@/server/services/analysis.service";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { contractId, userId, filePath } = body;

        const validateBody = analyzeContractBodySchema.parse({
            contractId,
            userId,
            filePath
        });

        if (!validateBody) {
            return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
        }
        // service to invoke the graph
        const result = await AnalysisService.runAnalysis(contractId, userId, filePath);
        if (!result.success) {
            return NextResponse.json({ success: false, error: "Failed to trigger analysis service" }, { status: 500 })
        }
        // create  contract analysis record in db
        // update the status to processing    

        return NextResponse.json({
            success: true,
            message: "Analysis started successfully",
            data: result.data
        });
    } catch (error) {
        console.error("Analysis failed:", error);
        return NextResponse.json({ success: false, error: "Failed to trigger analysis" }, { status: 500 })
    }

} 