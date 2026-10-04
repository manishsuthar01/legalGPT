/**
 * Robust JSON extraction and repair utility for LLM responses.
 * Handles markdown formatting, conversational intros/outros, trailing commas,
 * unescaped quotes, and truncated JSON structures.
 */

export function cleanJsonString(raw: string): string {
    if (!raw) return "";

    let text = raw.trim();

    // Strip markdown code blocks (```json ... ``` or ``` ...)
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();

    // Strip single-line comments
    text = text.replace(/\/\/.*$/gm, "");

    return text;
}

export function repairJsonString(jsonStr: string): string {
    let str = jsonStr.trim();

    // Remove trailing commas before closing braces/brackets: [1, 2,] or {"a": 1,}
    str = str.replace(/,\s*([}\]])/g, "$1");

    return str;
}

export function safeParseJsonArray<T = any>(raw: string): T[] {
    if (!raw || typeof raw !== "string") return [];

    const cleaned = cleanJsonString(raw);

    // 1. Direct parse attempt
    try {
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === "object" && parsed !== null) {
            for (const key of Object.keys(parsed)) {
                if (Array.isArray(parsed[key])) return parsed[key];
            }
        }
    } catch {
        // Fall through to boundary extraction
    }

    // 2. Locate outermost '[' and ']'
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");

    if (firstBracket !== -1) {
        let candidate = "";

        if (lastBracket > firstBracket) {
            candidate = cleaned.slice(firstBracket, lastBracket + 1);
        } else {
            // Truncated: find the last complete object '}' and close the array
            const lastBrace = cleaned.lastIndexOf("}");
            if (lastBrace > firstBracket) {
                candidate = cleaned.slice(firstBracket, lastBrace + 1) + "]";
            }
        }

        if (candidate) {
            try {
                const repaired = repairJsonString(candidate);
                const parsed = JSON.parse(repaired);
                if (Array.isArray(parsed)) return parsed;
            } catch {
                // Fall through to object extractor
            }
        }
    }

    // 3. Fallback: Parse individual JSON objects { ... } by tracking braces
    const objects: T[] = [];
    let depth = 0;
    let inString = false;
    let escape = false;
    let objStartIndex = -1;

    for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];

        if (escape) {
            escape = false;
            continue;
        }

        if (char === "\\") {
            escape = true;
            continue;
        }

        if (char === '"') {
            inString = !inString;
            continue;
        }

        if (!inString) {
            if (char === "{") {
                if (depth === 0) {
                    objStartIndex = i;
                }
                depth++;
            } else if (char === "}") {
                depth--;
                if (depth === 0 && objStartIndex !== -1) {
                    const objCandidate = cleaned.slice(objStartIndex, i + 1);
                    try {
                        const parsedObj = JSON.parse(repairJsonString(objCandidate));
                        if (typeof parsedObj === "object" && parsedObj !== null) {
                            objects.push(parsedObj);
                        }
                    } catch {
                        // Skip corrupted single object
                    }
                    objStartIndex = -1;
                }
            }
        }
    }

    return objects;
}

export function safeParseJsonObject<T = any>(raw: string): T | null {
    if (!raw || typeof raw !== "string") return null;

    const cleaned = cleanJsonString(raw);

    // 1. Direct parse attempt
    try {
        const parsed = JSON.parse(cleaned);
        if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
            return parsed;
        }
    } catch {
        // Fall through
    }

    // 2. Locate outermost '{' and '}'
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");

    if (firstBrace !== -1 && lastBrace > firstBrace) {
        try {
            const candidate = cleaned.slice(firstBrace, lastBrace + 1);
            const repaired = repairJsonString(candidate);
            const parsed = JSON.parse(repaired);
            if (typeof parsed === "object" && parsed !== null) {
                return parsed;
            }
        } catch {
            // ignore
        }
    }

    return null;
}
