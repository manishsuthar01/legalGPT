import { supabaseAdmin } from "@/utils/supabase/admin";
import { AnalysisResult } from "@/ai/types/analysis";

export interface CreateContractParams {
    id: string;
    userId: string;
    fileName: string;
    filePath: string;
    country?: string;
    status?: "pending" | "processing" | "completed" | "failed";
}

export interface ContractRecord {
    id: string;
    user_id: string;
    file_name: string;
    file_path: string;
    country: string;
    status: "pending" | "processing" | "completed" | "failed";
    risk_score: number | null;
    overall_risk: "LOW" | "MEDIUM" | "HIGH" | null;
    created_at: string;
    updated_at: string;
}

export class ContractService {
    /**
     * Initializes a contract record in Supabase database before or at the start of analysis.
     */
    static async createContractRecord({
        id,
        userId,
        fileName,
        filePath,
        country = "US",
        status = "processing"
    }: CreateContractParams): Promise<{ success: boolean; data?: ContractRecord; error?: string }> {
        try {
            const cleanFileName = fileName || filePath.split('/').pop() || "Untitled Contract";
            
            const { data, error } = await supabaseAdmin
                .from("contracts")
                .upsert(
                    {
                        id,
                        user_id: userId,
                        file_name: cleanFileName,
                        file_path: filePath,
                        country,
                        status,
                        updated_at: new Date().toISOString(),
                    },
                    { onConflict: "id" }
                )
                .select()
                .single();

            if (error) {
                console.warn("[ContractService.createContractRecord] Database warning:", error.message);
                return { success: false, error: error.message };
            }

            return { success: true, data: data as ContractRecord };
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.warn("[ContractService.createContractRecord] Exception:", errorMsg);
            return { success: false, error: errorMsg };
        }
    }

    /**
     * Updates contract status and stores the finalized analysis report JSON blobs.
     */
    static async updateContractAnalysis({
        contractId,
        status = "completed",
        riskScore,
        overallRisk,
        analysisResult
    }: {
        contractId: string;
        status?: "completed" | "failed";
        riskScore: number;
        overallRisk: "LOW" | "MEDIUM" | "HIGH";
        analysisResult: AnalysisResult;
    }): Promise<{ success: boolean; error?: string }> {
        try {
            // 1. Update the contracts table status and top-level risk metrics
            const { error: contractUpdateError } = await supabaseAdmin
                .from("contracts")
                .update({
                    status,
                    risk_score: riskScore,
                    overall_risk: overallRisk,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", contractId);

            if (contractUpdateError) {
                console.warn("[ContractService.updateContractAnalysis] Failed updating contracts table:", contractUpdateError.message);
            }

            // 2. Persist comprehensive report into analysis_reports table
            const { error: reportError } = await supabaseAdmin
                .from("analysis_reports")
                .upsert(
                    {
                        contract_id: contractId,
                        summary: analysisResult.summary || "",
                        overall_risk: overallRisk,
                        risk_score: riskScore,
                        risk_score_breakdown: analysisResult.riskScoreBreakdown || {
                            contractQuality: 50,
                            clauseRisk: 50,
                            jurisdictionCompliance: 50
                        },
                        risk_cards: analysisResult.riskCards || [],
                        advisor_feedback: analysisResult.advisorFeedback || [],
                        reviewer_feedback: analysisResult.reviewerFeedback || [],
                        positive_findings: analysisResult.positiveFindings || [],
                        missing_clauses: analysisResult.missingClauses || [],
                        created_at: new Date().toISOString(),
                    },
                    { onConflict: "contract_id" }
                );

            if (reportError) {
                console.warn("[ContractService.updateContractAnalysis] Failed saving analysis_reports:", reportError.message);
                return { success: false, error: reportError.message };
            }

            return { success: true };
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.warn("[ContractService.updateContractAnalysis] Exception:", errorMsg);
            return { success: false, error: errorMsg };
        }
    }

    /**
     * Updates status for a contract (e.g., mark as 'failed' or 'processing')
     */
    static async updateContractStatus(
        contractId: string, 
        status: "pending" | "processing" | "completed" | "failed"
    ): Promise<void> {
        try {
            await supabaseAdmin
                .from("contracts")
                .update({ status, updated_at: new Date().toISOString() })
                .eq("id", contractId);
        } catch (err) {
            console.warn("[ContractService.updateContractStatus] Error updating status:", err);
        }
    }

    /**
     * Retrieves all contracts uploaded by a specific user for sidebar navigation.
     */
    static async getUserContracts(userId: string): Promise<ContractRecord[]> {
        try {
            const { data, error } = await supabaseAdmin
                .from("contracts")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            if (error) {
                console.warn("[ContractService.getUserContracts] Database warning:", error.message);
                return [];
            }

            return (data || []) as ContractRecord[];
        } catch (err) {
            console.warn("[ContractService.getUserContracts] Exception:", err);
            return [];
        }
    }

    /**
     * Retrieves a single contract and its full parsed analysis report.
     */
    static async getContractWithAnalysis(
        contractId: string, 
        userId: string
    ): Promise<{
        contract: ContractRecord | null;
        analysisResult: AnalysisResult | null;
    }> {
        try {
            // 1. Fetch contract metadata ensuring user isolation
            const { data: contract, error: contractErr } = await supabaseAdmin
                .from("contracts")
                .select("*")
                .eq("id", contractId)
                .eq("user_id", userId)
                .single();

            if (contractErr || !contract) {
                return { contract: null, analysisResult: null };
            }

            // 2. Fetch associated analysis report
            const { data: report, error: reportErr } = await supabaseAdmin
                .from("analysis_reports")
                .select("*")
                .eq("contract_id", contractId)
                .maybeSingle();

            if (reportErr || !report) {
                return { contract: contract as ContractRecord, analysisResult: null };
            }

            // 3. Fetch segmented clauses for this contract from clauses table
            const { data: clausesData } = await supabaseAdmin
                .from("clauses")
                .select("content, source, chunk_index")
                .eq("contract_id", contractId)
                .order("chunk_index", { ascending: true });

            const clauses = (clausesData || []).map((c) => ({
                text: c.content || "",
                source: c.source || "Document",
                chunk_index: c.chunk_index || 0,
            }));

            // 4. Map database snake_case fields to AnalysisResult camelCase interface
            const mappedAnalysisResult: AnalysisResult = {
                summary: report.summary,
                overallRisk: report.overall_risk,
                riskScore: report.risk_score,
                riskScoreBreakdown: report.risk_score_breakdown || {
                    contractQuality: 50,
                    clauseRisk: 50,
                    jurisdictionCompliance: 50
                },
                riskCards: report.risk_cards || [],
                advisorFeedback: report.advisor_feedback || [],
                reviewerFeedback: report.reviewer_feedback || [],
                clauses,
                positiveFindings: report.positive_findings || [],
                missingClauses: report.missing_clauses || [],
            };

            return {
                contract: contract as ContractRecord,
                analysisResult: mappedAnalysisResult
            };
        } catch (err) {
            console.error("[ContractService.getContractWithAnalysis] Error:", err);
            return { contract: null, analysisResult: null };
        }
    }

    /**
     * Deletes a contract, its analysis report, and the physical file in storage.
     */
    static async deleteContract(contractId: string, userId: string): Promise<{ success: boolean; error?: string }> {
        try {
            // First verify ownership and retrieve storage file path
            const { data: contract, error: findError } = await supabaseAdmin
                .from("contracts")
                .select("file_path")
                .eq("id", contractId)
                .eq("user_id", userId)
                .single();

            if (findError || !contract) {
                return { success: false, error: "Contract not found or access denied" };
            }

            // Delete storage file if path exists
            if (contract.file_path) {
                try {
                    await supabaseAdmin.storage.from("contracts").remove([contract.file_path]);
                } catch (stErr) {
                    console.warn("[ContractService.deleteContract] Storage removal warning:", stErr);
                }
            }

            // Delete database row (cascades to analysis_reports and clauses)
            const { error: deleteError } = await supabaseAdmin
                .from("contracts")
                .delete()
                .eq("id", contractId)
                .eq("user_id", userId);

            if (deleteError) {
                return { success: false, error: deleteError.message };
            }

            return { success: true };
        } catch (err: unknown) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            return { success: false, error: errorMsg };
        }
    }
}
