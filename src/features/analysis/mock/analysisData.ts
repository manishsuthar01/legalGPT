export const mockAnalysisData = {
  executiveSummary: "This NDA contains non-standard clauses that pose significant risk. The perpetual term for confidentiality obligations is highly unusual and generally unenforceable in many jurisdictions. Furthermore, the definition of Confidential Information is overly broad.",
  overallRisk: 'High',
  riskScore: 78,
  risks: [
    {
      id: 'risk-1',
      severity: 'high',
      clauseTitle: '3. Term',
      explanation: 'The confidentiality obligations do not have a defined expiration date. Courts generally frown upon perpetual NDAs except for trade secrets.',
      suggestedFix: 'Limit the term to 2-3 years after the termination of the business relationship or disclosure.',
    },
    {
      id: 'risk-2',
      severity: 'medium',
      clauseTitle: '1. Definition of Confidential Information',
      explanation: 'The definition requires information to be designated as confidential at the time of disclosure, which can be administratively burdensome and easily forgotten.',
      suggestedFix: 'Include information that a reasonable person would consider confidential given the nature of the information and circumstances of disclosure.',
    },
    {
      id: 'risk-3',
      severity: 'low',
      clauseTitle: '5. Governing Law',
      explanation: 'The agreement is governed by Delaware law, which is standard, but you are located in California. This may require hiring Delaware counsel in case of dispute.',
      suggestedFix: 'Change governing law to California if you have the negotiating leverage.',
    }
  ]
} as const;
