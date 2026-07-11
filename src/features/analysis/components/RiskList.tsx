import React from 'react';
import { RiskCard } from './RiskCard';
import { mockAnalysisData } from '../mock/analysisData';

export const RiskList = () => {
  const risks = mockAnalysisData.risks;

  if (!risks || risks.length === 0) {
    return (
      <div className="bg-[#111] border border-[#222] border-dashed rounded-2xl p-8 text-center">
        <p className="text-[#999] text-sm">No significant risks were identified in this document.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {risks.map((risk) => (
        <RiskCard 
          key={risk.id}
          severity={risk.severity as any}
          clauseTitle={risk.clauseTitle}
          explanation={risk.explanation}
          suggestedFix={risk.suggestedFix}
        />
      ))}
    </div>
  );
};
