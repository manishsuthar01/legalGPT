import { PromptTemplate } from "@langchain/core/prompts";

export const prompt = PromptTemplate.fromTemplate(`
You are a strict, senior legal reviewer. You must evaluate the following contract clause based on the provided verified legal context for {country}.
Determine if the clause is standard, highly risky, or invalid. Be strict, point out any missing protections, and highlight liabilities. 
Clause Text: {clause}
Verified Legal Context: {context}
Strict Legal Review:`);