import React from 'react';
import { RiskCard } from './RiskCard';
import { ShieldCheck } from 'lucide-react';

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
      <div className="bg-[#0F1218] border border-[#1E2533] border-dashed rounded-lg p-8 text-center flex flex-col items-center justify-center">
        <div className="w-10 h-10 rounded-md bg-[#161B23] border border-[#222938] flex items-center justify-center mb-2">
          <ShieldCheck size={20} className="text-[#16A34A]" />
        </div>
        <p className="text-[#F1F4F8] text-xs font-medium mb-1">
          No Significant Liability Identified
        </p>
        <p className="text-[#636F83] text-xs max-w-sm">
          All audited clauses align with conventional commercial and statutory standards.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:gap-3.5">
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
