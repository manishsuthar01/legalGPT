import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { getGroqModel } from "./groq";
import { getGeminiModel } from "./gemini";

export type SupportedModelProviders = "groq" | "gemini";

export const getLLM = (provider: SupportedModelProviders, options?: any): BaseChatModel => {
    switch (provider) {
        case "groq":
            return getGroqModel(options);
        case "gemini":
            return getGeminiModel(options);
        default:
            throw new Error(`Unsupported model provider: ${provider}`);
    }
};
