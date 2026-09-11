import { chatBodySchema } from "@/lib/validations/chat";
import { chatService } from "@/server/services/chat.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ contractId: string }> }
) {
    try {
        const { contractId } = await params;
        const body = await req.json();
        const validateBody = chatBodySchema.safeParse(body);
        console.log("chat request body:", body)
        if (!validateBody.success) {
            return NextResponse.json(
                { success: false, error: "Invalid request body", details: validateBody.error.format() },
                { status: 400 }
            );
        }

        const { message, userId = "user-123", sessionId } = body;

        const result = await chatService.chatWithContract({
            contractId,
            userId,
            message,
            sessionId,
        });

        return NextResponse.json({
            success: true,
            data: result,
        });
    } catch (error) {
        console.error("Chat route error:", error);
        const errorMessage = error instanceof Error ? error.message : "Internal server error";
        const status = errorMessage === "Session not found" ? 404 : 500;

        return NextResponse.json(
            { success: false, error: errorMessage },
            { status }
        );
    }
}