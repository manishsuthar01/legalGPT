import { z } from "zod"

export const analyzeContractBodySchema = z.object({
    contractId: z.string().min(1, "Contract ID is required"),
    userId: z.string().min(1, "User ID is required"),
    filePath: z.string().min(1, "File path is required"),
    country: z.string().min(1, "Country is required"),
})

export type AnalyzeContractBodySchema = z.infer<typeof analyzeContractBodySchema>;
