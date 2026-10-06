import React from 'react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { AlertCircle, FileSearch, AlertTriangle, ArrowRight } from 'lucide-react';

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

const RatingPills = ({ label, value, max = 5 }: { label: string; value: number; max?: number }) => {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[#636F83] text-[9px] font-mono uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <span
            key={i}
            className={`w-1.5 h-3 rounded-xs ${
              i < value ? 'bg-[#4B72C2]' : 'bg-[#1C222E]'
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-[#9DA8B9] text-[10px] font-mono">{value}/{max}</span>
    </div>
  );
};

export const RiskCard: React.FC<RiskCardProps> = ({ 
  severity, 
  clauseTitle, 
  explanation, 
  suggestedFix, 
  likelihood, 
  impact, 
  whyItMatters,
  onViewClause 
}) => {
  const getBadgeLabel = () => {
    switch (severity) {
      case 'critical': return 'Critical Exposure';
      case 'high': return 'High Risk';
      case 'medium': return 'Moderate Risk';
      case 'low': return 'Low Concern';
      default: return 'Observed Risk';
    }
  };

  const getBorderColor = () => {
    switch (severity) {
      case 'critical': return 'border-red-500/30 hover:border-red-500/50';
      case 'high': return 'border-rose-500/30 hover:border-rose-500/50';
      case 'medium': return 'border-amber-500/30 hover:border-amber-500/50';
      case 'low': return 'border-emerald-500/30 hover:border-emerald-500/50';
      default: return 'border-[#1E2533] hover:border-[#2D384D]';
    }
  };

  const getIconColor = () => {
    switch (severity) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-rose-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-emerald-400';
      default: return 'text-[#9DA8B9]';
    }
  };

  return (
    <div className={`bg-[#0F1218] border rounded-lg p-4 sm:p-5 transition-colors shadow-sm ${getBorderColor()}`}>
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 sm:gap-4 mb-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <AlertCircle size={16} className={`${getIconColor()} shrink-0 mt-0.5`} />
          <h4 className="text-[#F1F4F8] font-medium text-xs sm:text-sm leading-snug">
            {clauseTitle}
          </h4>
        </div>

        {/* Severity + Likelihood / Impact indicators */}
        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-2 shrink-0">
          <StatusBadge level={severity} label={getBadgeLabel()} size="sm" />
          {(likelihood != null && impact != null) && (
            <div className="flex items-center gap-3 mt-0.5">
              <RatingPills label="Likelihood" value={likelihood} />
              <RatingPills label="Impact" value={impact} />
            </div>
          )}
        </div>
      </div>

      {/* Why It Matters Callout */}
      {whyItMatters && (
        <div className="flex items-start gap-2 bg-[#0B0E14] border border-[#1A202C] rounded-md p-3 mb-3">
          <AlertTriangle size={14} className={`${getIconColor()} shrink-0 mt-0.5`} />
          <div className="text-xs text-[#C4CDD9] leading-relaxed">
            <span className="font-semibold text-[#F1F4F8] mr-1">Legal Ramification:</span>
            {whyItMatters}
          </div>
        </div>
      )}
      
      {/* Explanation */}
      <div className="mb-3.5">
        <p className="text-[#9DA8B9] text-xs leading-relaxed mb-3">
          {explanation}
        </p>
        
        {/* Suggested Fix */}
        <div className="bg-[#121620] border border-[#1E2636] rounded-md p-3">
          <p className="text-xs text-[#D8DEE9] leading-relaxed">
            <strong className="text-[#4B72C2] font-semibold mr-1">Recommended Remediation:</strong> 
            {suggestedFix}
          </p>
        </div>
      </div>

      {/* Jump to Clause Link */}
      {onViewClause && (
        <button 
          onClick={onViewClause}
          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-[#4B72C2] hover:text-[#688FD9] transition-colors focus-ring rounded p-1 -ml-1 cursor-pointer"
        >
          <span>Locate in Agreement</span>
          <ArrowRight size={12} />
        </button>
      )}
    </div>
  );
};
