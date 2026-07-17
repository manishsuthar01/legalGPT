import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { getGroqModel } from "./groq";
import { getGeminiModel } from "./gemini";
import { getGlmModel } from "./glm";

export type SupportedModelProviders = "groq" | "gemini" | "glm";

export const getLLM = (provider: SupportedModelProviders, options?: any): BaseChatModel => {
    switch (provider) {
        case "groq":
            return getGroqModel(options);
        case "gemini":
            return getGeminiModel(options);
        case "glm":
            return getGlmModel(options);
        default:
            throw new Error(`Unsupported model provider: ${provider}`);
    }
};
