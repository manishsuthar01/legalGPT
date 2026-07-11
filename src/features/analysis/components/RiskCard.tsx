import React from 'react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { AlertCircle, FileSearch } from 'lucide-react';

interface RiskCardProps {
  severity: 'high' | 'medium' | 'low';
  clauseTitle: string;
  explanation: string;
  suggestedFix: string;
}

export const RiskCard: React.FC<RiskCardProps> = ({ severity, clauseTitle, explanation, suggestedFix }) => {
  const getBadgeLabel = () => {
    switch (severity) {
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Risk';
      default: return 'Risk';
    }
  };

  const getBorderColor = () => {
    switch (severity) {
      case 'high': return 'hover:border-[#ef4444]/40';
      case 'medium': return 'hover:border-[#f59e0b]/40';
      case 'low': return 'hover:border-[#22c55e]/40';
      default: return 'hover:border-[#222]';
    }
  };

  return (
    <div className={`bg-[#111] border border-[#222] rounded-2xl p-6 transition-all duration-300 ${getBorderColor()}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertCircle size={16} className={
            severity === 'high' ? 'text-[#ef4444]' : 
            severity === 'medium' ? 'text-[#f59e0b]' : 'text-[#22c55e]'
          } />
          <h4 className="text-white font-medium">{clauseTitle}</h4>
        </div>
        <StatusBadge level={severity} label={getBadgeLabel()} />
      </div>
      
      <div className="mb-4">
        <p className="text-[#999] text-sm leading-relaxed mb-3">
          <strong className="text-white">Explanation:</strong> {explanation}
        </p>
        <div className="bg-[#7c5cfc]/5 border border-[#7c5cfc]/20 rounded-lg p-3">
          <p className="text-[#ccc] text-sm leading-relaxed">
            <strong className="text-[#7c5cfc]">Suggested Fix:</strong> {suggestedFix}
          </p>
        </div>
      </div>

      <button className="flex items-center gap-2 text-xs font-semibold text-[#666] hover:text-[#7c5cfc] uppercase tracking-widest transition-colors mt-4">
        <FileSearch size={14} />
        View Clause
      </button>
    </div>
  );
};
