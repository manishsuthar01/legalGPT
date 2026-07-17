import { ChatOpenAI } from "@langchain/openai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

export const getGlmModel = (options?: any): BaseChatModel => {
    if (!process.env.GLM_API_KEY) {
        throw new Error("Missing GLM_API_KEY environment variable");
    }

    return new ChatOpenAI({
        apiKey: process.env.GLM_API_KEY,
        model: options?.model || "glm-4-flash",
        temperature: options?.temperature ?? 0,
        configuration: {
            baseURL: "https://api.z.ai/api/paas/v4/"
        },
        ...options,
    });
};
