import React from 'react';
import { StatusBadge } from '../../../components/ui/StatusBadge';
import { AlertCircle, FileSearch, AlertTriangle } from 'lucide-react';

interface RiskCardProps {
  severity: 'critical' | 'high' | 'medium' | 'low';
  clauseTitle: string;
  explanation: string;
  suggestedFix: string;
  likelihood?: number;
  impact?: number;
  whyItMatters?: string;
}

const StarRating = ({ value, max = 5, color }: { value: number; max?: number; color: string }) => {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`text-xs ${i < value ? color : 'text-[#333]'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export const RiskCard: React.FC<RiskCardProps> = ({ severity, clauseTitle, explanation, suggestedFix, likelihood, impact, whyItMatters }) => {
  const getBadgeLabel = () => {
    switch (severity) {
      case 'critical': return 'Critical';
      case 'high': return 'High';
      case 'medium': return 'Medium';
      case 'low': return 'Low';
      default: return 'Risk';
    }
  };

  const getBorderColor = () => {
    switch (severity) {
      case 'critical': return 'hover:border-[#dc2626]/40';
      case 'high': return 'hover:border-[#ef4444]/40';
      case 'medium': return 'hover:border-[#f59e0b]/40';
      case 'low': return 'hover:border-[#22c55e]/40';
      default: return 'hover:border-[#222]';
    }
  };

  const getIconColor = () => {
    switch (severity) {
      case 'critical': return 'text-[#dc2626]';
      case 'high': return 'text-[#ef4444]';
      case 'medium': return 'text-[#f59e0b]';
      case 'low': return 'text-[#22c55e]';
      default: return 'text-[#999]';
    }
  };

  const getStarColor = () => {
    switch (severity) {
      case 'critical': return 'text-[#dc2626]';
      case 'high': return 'text-[#ef4444]';
      case 'medium': return 'text-[#f59e0b]';
      case 'low': return 'text-[#22c55e]';
      default: return 'text-[#999]';
    }
  };

  return (
    <div className={`bg-[#111] border border-[#222] rounded-2xl p-6 transition-all duration-300 ${getBorderColor()}`}>
      {/* Header Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AlertCircle size={16} className={getIconColor()} />
          <h4 className="text-white font-medium">{clauseTitle}</h4>
        </div>

        {/* Severity + Stars Block */}
        <div className="flex flex-col items-end gap-1.5">
          <StatusBadge level={severity} label={getBadgeLabel()} />
          {(likelihood != null && impact != null) && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex items-center gap-2">
                <span className="text-[#666] text-[10px] font-bold uppercase tracking-widest w-[70px] text-right">Likelihood</span>
                <StarRating value={likelihood} color={getStarColor()} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#666] text-[10px] font-bold uppercase tracking-widest w-[70px] text-right">Impact</span>
                <StarRating value={impact} color={getStarColor()} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Why It Matters */}
      {whyItMatters && (
        <div className="flex items-start gap-2.5 bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-3.5 mb-4">
          <AlertTriangle size={14} className={`${getIconColor()} flex-shrink-0 mt-0.5`} />
          <p className="text-[#ccc] text-sm leading-relaxed">{whyItMatters}</p>
        </div>
      )}
      
      {/* Explanation */}
      <div className="mb-4">
        <p className="text-[#999] text-sm leading-relaxed mb-3">
          {explanation}
        </p>
        <div className="bg-[#7c5cfc]/5 border border-[#7c5cfc]/20 rounded-lg p-3">
          <p className="text-[#ccc] text-sm leading-relaxed">
            <strong className="text-[#7c5cfc]">Suggested Fix:</strong> {suggestedFix}
          </p>
        </div>
      </div>

      <button className="flex items-center gap-2 text-xs font-semibold text-[#666] hover:text-[#7c5cfc] uppercase tracking-widest transition-colors mt-2 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none rounded p-1 -ml-1">
        <FileSearch size={14} aria-hidden="true" />
        View Clause
      </button>
    </div>
  );
};
