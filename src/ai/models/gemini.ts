import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

export const getGeminiModel = (options?: any): BaseChatModel => {
    if (!process.env.GEMINI_API_KEY) {
        throw new Error("Missing GEMINI_API_KEY environment variable");
    }

    return new ChatGoogleGenerativeAI({
        apiKey: process.env.GEMINI_API_KEY,
        model: options?.model || "gemini-2.5-flash", // default model
        temperature: options?.temperature ?? 0,
        ...options,
    });
};
