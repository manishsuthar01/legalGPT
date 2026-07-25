import { PromptTemplate } from "@langchain/core/prompts";


export const searchQueryPrompt = PromptTemplate.fromTemplate(`
            You are a legal search planner.

            Your job is NOT to analyze the clauses.
            
            Your only task is to generate ONE highly specific search query for EACH clause provided.
            
            Jurisdiction
            
            {country}
            
            Clauses (JSON array)
            
            {clauses}

            Requirements

            - Research ONLY if the clause involves complex legal issues: employment law, tax, privacy, IP, termination, non-compete, liability, or governing law.
            - If it is a standard boilerplate clause (e.g. severability, entire agreement, notices), set "requiresResearch": false.
            - Use legal terminology
            
            - Mention jurisdiction
            
            - Mention statute if obvious
             
            - Mention clause type
           
            - Maximum 15 words per query
           
            - No punctuation except quotes
            
            Return ONLY a JSON array. Each object in the array must correspond to a clause in the input.
            
            [
              {{
                "clauseId": 123,
                "topic": "",
                "requiresResearch": true,
                "reason": "",
                "query": ""
              }}
            ]
               
    `);