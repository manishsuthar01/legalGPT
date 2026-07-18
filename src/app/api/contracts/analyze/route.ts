import { NextRequest, NextResponse } from "next/server";
import { analyzeContractBodySchema } from "@/lib/validations/contract";
import { AnalysisService } from "@/server/services/analysis.service";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json();
        const { contractId, userId, filePath, country } = body;

        const validateBody = analyzeContractBodySchema.parse({
            contractId,
            userId,
            filePath,
            country
        });

        if (!validateBody) {
            return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
        }

        const streamResponse = new ReadableStream<Uint8Array>({
            async start(controller) {
                const encoder = new TextEncoder();
                const handleStream = (chunk: any): any => {
                    // chunk: {"type":"node_complete","node":"plan-research-node","state":{}}
                    const data = JSON.stringify(chunk);
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                }
                try {
                    const result = await AnalysisService.runAnalysis(contractId, userId, filePath, country, handleStream);

                    // Send the final summary and risks back to the frontend
                    const finalPayload = JSON.stringify({ status: "DONE", data: result.data });
                    controller.enqueue(encoder.encode(`data: ${finalPayload}\n\n`));

                    controller.close();
                } catch (error) {
                    controller.enqueue(encoder.encode(`data: {"status": "error", "message": "${error}"}\n\n`));
                    controller.close();
                }
            }
        })


        // create  contract analysis record in db
        // update the status to processing    

        return new NextResponse(streamResponse, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("Analysis failed:", error);
        return NextResponse.json({ success: false, error: "Failed to trigger analysis" }, { status: 500 })
    }

} 