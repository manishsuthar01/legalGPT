import React from 'react';
import { RiskCard } from './RiskCard';
import { mockAnalysisData } from '../mock/analysisData';

export const RiskList = () => {
  return (
    <div className="flex flex-col gap-4">
      {mockAnalysisData.risks.map((risk) => (
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
