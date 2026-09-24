import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { Runnable } from "@langchain/core/runnables";
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

export interface ResilientLLMOptions {
    model?: string;
    temperature?: number;
    maxRetries?: number;
    fallbackProviders?: SupportedModelProviders[];
    [key: string]: any;
}

/**
 * Returns an LLM runnable configured with automatic multi-model / multi-provider fallbacks.
 * If the primary model encounters a rate limit (429), quota exhaustion, or error,
 * it seamlessly fails over to backup providers (e.g. Gemini -> Groq) without dropping the request.
 */
export const getResilientLLM = (
    primaryProvider: SupportedModelProviders = "gemini",
    options?: ResilientLLMOptions
): Runnable => {
    // Determine target primary model
    const requestedModel = options?.model || (primaryProvider === "gemini" ? (process.env.GEMINI_MODEL || "gemini-2.5-flash") : undefined);

    const primary = getLLM(primaryProvider, {
        maxRetries: 1, // Fail quickly to activate fallbacks instead of long stalls
        ...options,
        ...(requestedModel ? { model: requestedModel } : {}),
    });

    const fallbacks: BaseChatModel[] = [];

    if (primaryProvider === "gemini") {
        // Fallback 1: If primary model was something other than gemini-2.5-flash (e.g. 3.5), try gemini-2.5-flash
        if (requestedModel && requestedModel !== "gemini-2.5-flash" && process.env.GEMINI_API_KEY) {
            try {
                fallbacks.push(getGeminiModel({ model: "gemini-2.5-flash", maxRetries: 1, temperature: options?.temperature ?? 0 }));
            } catch (e) {
                // Ignore initialization error
            }
        }
        // Fallback 2: Groq (ultra fast, high quota)
        if (process.env.GROQ_API_KEY) {
            try {
                fallbacks.push(getGroqModel({ model: "openai/gpt-oss-120b", temperature: options?.temperature ?? 0 }));
            } catch (e) {
                // Ignore initialization error
            }
        }
    } else if (primaryProvider === "groq") {
        // If Groq is primary, fallback to Gemini
        if (process.env.GEMINI_API_KEY) {
            try {
                fallbacks.push(getGeminiModel({ model: "gemini-2.5-flash", maxRetries: 1, temperature: options?.temperature ?? 0 }));
            } catch (e) {
                // Ignore
            }
        }
    }

    if (fallbacks.length > 0) {
        return (primary as any).withFallbacks({ fallbacks });
    }

    return primary;
};

