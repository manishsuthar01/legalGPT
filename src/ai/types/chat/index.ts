import { BaseMessage } from "@langchain/core/messages";

export interface ChatState {
    contractId: string;
    analysisSummary: string;
    retrievedContext: string;
    messages: BaseMessage[];
    status: "unknown" | "failed" | "success";
}
