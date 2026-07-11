export const mockChatData = {
  initialGreeting: "I've finished analyzing your contract. Ask anything about clauses, risks, negotiations, compliance or legal terminology.",
  suggestedPrompts: [
    "Explain this contract",
    "Summarize my obligations",
    "What should I negotiate?",
    "Is this enforceable in India?"
  ],
  messages: [
    {
      id: 'msg-1',
      role: 'assistant',
      content: "I've finished analyzing your contract. Ask anything about clauses, risks, negotiations, compliance or legal terminology.",
      timestamp: new Date().toISOString()
    }
  ]
};
