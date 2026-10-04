import { createClient } from "@/lib/supabase/server";
import { chatBodySchema } from "@/lib/validations/chat";
import { chatService } from "@/server/services/chat.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ contractId: string }> }
) {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { contractId } = await params;
        if (!contractId || contractId === "new" || contractId === "default-contract") {
            return NextResponse.json(
                { success: false, error: "Please upload and analyze a contract before chatting." },
                { status: 400 }
            );
        }

        const body = await req.json();
        const validateBody = chatBodySchema.safeParse(body);

        if (!validateBody.success) {
            return NextResponse.json(
                { success: false, error: "Invalid request body", details: validateBody.error.format() },
                { status: 400 }
            );
        }

        const { message, sessionId } = validateBody.data;

        const result = await chatService.chatWithContract({
            contractId,
            userId: user.id,
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
        return NextResponse.json({ success: false, error: errorMessage }, { status });
    }
}