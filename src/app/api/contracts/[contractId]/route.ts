import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ContractService } from "@/server/services/contract.service";

interface RouteParams {
    contractId: string;
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { contractId } = await params;
        if (!contractId || contractId === "new" || contractId === "default-contract") {
            return NextResponse.json({ success: false, error: "Invalid contract ID" }, { status: 400 });
        }

        const data = await ContractService.getContractWithAnalysis(contractId, user.id);

        if (!data.contract) {
            return NextResponse.json({ success: false, error: "Contract not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                contract: data.contract,
                analysisResult: data.analysisResult,
            },
        });
    } catch (error) {
        console.error("GET /api/contracts/[contractId] error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch contract details" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { contractId } = await params;
        if (!contractId || contractId === "new" || contractId === "default-contract") {
            return NextResponse.json({ success: false, error: "Invalid contract ID" }, { status: 400 });
        }

        const result = await ContractService.deleteContract(contractId, user.id);

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error || "Failed to delete" }, { status: 400 });
        }

        return NextResponse.json({
            success: true,
            message: "Contract deleted successfully",
        });
    } catch (error) {
        console.error("DELETE /api/contracts/[contractId] error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to delete contract" },
            { status: 500 }
        );
    }
}
