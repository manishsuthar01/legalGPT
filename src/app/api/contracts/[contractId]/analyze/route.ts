import { NextRequest, NextResponse } from "next/server";
import { analyzeContractBodySchema } from "@/lib/validations/contract";
import { AnalysisProgressChunk, AnalysisService } from "@/server/services/analysis.service";
import { ContractService } from "@/server/services/contract.service";
import { createClient } from "@/lib/supabase/server";

interface RouteParams {
    contractId: string;
}

export async function POST(req: NextRequest, { params }: { params: Promise<RouteParams> }) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { contractId: rawContractId } = await params;
        const contractId = rawContractId && rawContractId !== "new" && rawContractId !== "default-contract"
            ? rawContractId
            : crypto.randomUUID();

        const body = await req.json();
        const { filePath, country, fileName } = body;

        // Security: Ensure the file path belongs strictly to the authenticated user
        if (!filePath || typeof filePath !== "string" || !filePath.startsWith(`${user.id}/`)) {
            return NextResponse.json(
                { success: false, error: "Access denied to specified file path" },
                { status: 403 }
            );
        }

        const validateBody = analyzeContractBodySchema.safeParse({
            contractId,
            userId: user.id,
            filePath,
            country,
            fileName,
        });

        if (!validateBody.success) {
            return NextResponse.json(
                { success: false, error: "Invalid request body", details: validateBody.error.format() },
                { status: 400 }
            );
        }

        // Initialize or update the contract record in Supabase database
        await ContractService.createContractRecord({
            id: contractId,
            userId: user.id,
            fileName: fileName || filePath.split('/').pop() || "Contract Document",
            filePath,
            country: country || "US",
            status: "processing",
        });

        const streamResponse = new ReadableStream<Uint8Array>({
            async start(controller) {
                const encoder = new TextEncoder();

                const handleStream = (chunk: AnalysisProgressChunk) => {
                    const data = JSON.stringify(chunk);
                    controller.enqueue(encoder.encode(`data: ${data}\n\n`));
                };

                // Immediately emit initial progress event to establish live stream feedback
                handleStream({
                    type: "progress",
                    node: "text-extract-node",
                    message: "Extracting contract text...",
                });

                try {
                    const result = await AnalysisService.runAnalysis(
                        contractId,
                        user.id,
                        filePath,
                        country,
                        handleStream
                    );

                    // Persist analysis report and update contract status in database
                    await ContractService.updateContractAnalysis({
                        contractId,
                        status: "completed",
                        riskScore: result.data.riskScore,
                        overallRisk: result.data.overallRisk,
                        analysisResult: result.data,
                    });

                    // Send the final summary, contractId, and risks back to the frontend
                    const finalPayload = JSON.stringify({ status: "DONE", contractId, data: result.data });
                    controller.enqueue(encoder.encode(`data: ${finalPayload}\n\n`));
                    controller.close();
                } catch (error: unknown) {
                    await ContractService.updateContractStatus(contractId, "failed");
                    const errorMessage = error instanceof Error ? error.message : String(error);
                    const errorPayload = JSON.stringify({ status: "error", message: errorMessage });
                    controller.enqueue(encoder.encode(`data: ${errorPayload}\n\n`));
                    controller.close();
                }
            }
        });

        return new NextResponse(streamResponse, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            },
        });
    } catch (error) {
        console.error("Analysis route failed:", error);
        return NextResponse.json({ success: false, error: "Failed to trigger analysis" }, { status: 500 });
    }
}