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
      <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-8 text-center flex flex-col items-center justify-center shadow-xs">
        <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center mb-2">
          <ShieldCheck size={20} className="text-emerald-400" />
        </div>
        <p className="text-[#F1F5F9] text-xs font-medium mb-1">
          No Significant Risks Found
        </p>
        <p className="text-[#94A3B8] text-xs max-w-sm">
          All audited clauses align with standard commercial guidelines.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
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

