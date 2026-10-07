import React from 'react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { AlertCircle, ArrowRight } from 'lucide-react';

interface RiskCardProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  clauseTitle: string;
  explanation: string;
  suggestedFix: string;
  likelihood?: number;
  impact?: number;
  whyItMatters?: string;
  onViewClause?: () => void;
}

export const RiskCard: React.FC<RiskCardProps> = ({ 
  severity, 
  clauseTitle, 
  explanation, 
  suggestedFix, 
  whyItMatters,
  onViewClause 
}) => {
  const getBadgeLabel = () => {
    switch (severity) {
      case 'critical': return 'Critical';
      case 'high': return 'High Risk';
      case 'medium': return 'Medium Risk';
      case 'low': return 'Low Concern';
      default: return 'Observed Risk';
    }
  };

  const getIconColor = () => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-rose-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-4 sm:p-5 transition-shadow hover:shadow-xs">
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <AlertCircle size={16} className={`${getIconColor()} shrink-0 mt-0.5`} />
          <h4 className="text-[#F1F5F9] font-semibold text-xs sm:text-sm leading-snug">
            {clauseTitle}
          </h4>
        </div>

        <StatusBadge level={severity} label={getBadgeLabel()} size="sm" />
      </div>

      {/* Explanation */}
      <p className="text-[#CBD5E1] text-xs leading-relaxed mb-3">
        {explanation}
      </p>

      {/* Why It Matters Callout */}
      {whyItMatters && (
        <p className="text-xs text-[#94A3B8] italic mb-3">
          {whyItMatters}
        </p>
      )}
      
      {/* Suggested Fix */}
      <div className="bg-[#141A24] border border-[#1E2532] rounded-lg p-3">
        <p className="text-xs text-[#E2E8F0] leading-relaxed">
          <strong className="text-[#818CF8] font-semibold mr-1">Recommended Fix:</strong> 
          {suggestedFix}
        </p>
      </div>

      {/* Jump to Clause Link */}
      {onViewClause && (
        <button 
          onClick={onViewClause}
          className="inline-flex items-center gap-1.5 text-xs text-[#818CF8] hover:underline font-medium mt-3 cursor-pointer"
        >
          <span>View in Agreement</span>
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
};


