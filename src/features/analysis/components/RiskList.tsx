import React from 'react';
import { RiskCard } from './RiskCard';

interface RiskItem {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  clauseTitle: string;
  explanation: string;
  suggestedFix: string;
  likelihood?: number;
  impact?: number;
  whyItMatters?: string;
}

interface RiskListProps {
  risks: RiskItem[];
}

export const RiskList: React.FC<RiskListProps> = ({ risks }) => {
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
          severity={risk.severity}
          clauseTitle={risk.clauseTitle}
          explanation={risk.explanation}
          suggestedFix={risk.suggestedFix}
          likelihood={risk.likelihood}
          impact={risk.impact}
          whyItMatters={risk.whyItMatters}
        />
      ))}
    </div>
  );
};
