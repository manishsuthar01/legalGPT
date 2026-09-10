import { z } from "zod";

export const chatBodySchema = z.object({
    message: z.string().min(1, "Message is required"),
    userId: z.string().optional(),
    sessionId: z.string().nullable().optional(),
});

export type ChatBodySchema = z.infer<typeof chatBodySchema>;
