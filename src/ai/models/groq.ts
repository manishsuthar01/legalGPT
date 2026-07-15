import { ChatGroq } from "@langchain/groq";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";

export const getGroqModel = (options?: any): BaseChatModel => {
    if (!process.env.GROQ_API_KEY) {
        throw new Error("Missing GROQ_API_KEY environment variable");
    }

    return new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: options?.model || "llama-3.1-8b-instant", // default model
        temperature: options?.temperature ?? 0,
        ...options,
    });
};
