import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ContractService } from "@/server/services/contract.service";

export async function GET(req: NextRequest) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const contracts = await ContractService.getUserContracts(user.id);

        return NextResponse.json({
            success: true,
            data: contracts,
        });
    } catch (error) {
        console.error("GET /api/contracts error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch contracts" },
            { status: 500 }
        );
    }
}
