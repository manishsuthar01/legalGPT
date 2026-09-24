import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';

interface PositiveFinding {
  clauseTitle: string;
  explanation: string;
}

interface MissingClause {
  title: string;
  explanation: string;
  severity: string;
  suggestedLanguage: string;
}

interface RiskScoreBreakdown {
  contractQuality: number;
  clauseRisk: number;
  jurisdictionCompliance: number;
}

interface ExecutiveSummaryProps {
  summary: string;
  overallRisk: string;
  riskScore: number;
  riskScoreBreakdown?: RiskScoreBreakdown;
  positiveFindings?: PositiveFinding[];
  missingClauses?: MissingClause[];
}

const BreakdownBar = ({ label, value, max = 100 }: { label: string; value: number; max?: number }) => {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const getBarColor = () => {
    if (pct >= 70) return 'bg-[#22c55e]';
    if (pct >= 40) return 'bg-[#f59e0b]';
    return 'bg-[#ef4444]';
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <div className="flex items-center justify-between sm:w-[150px] shrink-0">
        <span className="text-[#666] text-[10px] font-bold uppercase tracking-wider">{label}</span>
        <span className="sm:hidden text-white text-xs font-semibold">{value}</span>
      </div>
      <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getBarColor()}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="hidden sm:inline-block text-white text-xs font-semibold w-[32px] text-right">{value}</span>
    </div>
  );
};

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ summary, overallRisk, riskScore, riskScoreBreakdown, positiveFindings, missingClauses }) => {
  const riskColor = overallRisk === 'HIGH' ? 'text-[#ef4444]' : overallRisk === 'MEDIUM' ? 'text-[#f59e0b]' : 'text-[#22c55e]';
  const riskBg = overallRisk === 'HIGH' ? 'bg-[#ef4444]' : overallRisk === 'MEDIUM' ? 'bg-[#f59e0b]' : 'bg-[#22c55e]';

  return (
    <div className="space-y-4 mb-6">
      {/* Summary Card */}
      <div className="bg-[#111] border border-[#222] rounded-xl sm:rounded-2xl p-4 sm:p-6">
        <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">Executive Summary</h3>
        <p className="text-[#999] text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">
          {summary}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3.5 sm:p-4">
            <span className="block text-[#666] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">Overall Risk</span>
            <span className={`${riskColor} font-semibold text-base sm:text-lg`}>{overallRisk}</span>
          </div>
          <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3.5 sm:p-4">
            <span className="block text-[#666] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1.5 sm:mb-2">Risk Score</span>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="text-white font-semibold text-base sm:text-lg">{riskScore}</span>
              <span className="text-[#666] text-xs sm:text-sm">/ 100</span>
              <div className="flex-1 h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${riskBg}`} style={{ width: `${riskScore}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Risk Score Breakdown */}
        {riskScoreBreakdown && (
          <div className="border-t border-[#1c1c1c] pt-4 mt-2">
            <p className="text-[#666] text-[10px] font-bold uppercase tracking-wider mb-3">Score Breakdown</p>
            <div className="space-y-3 sm:space-y-2.5">
              <BreakdownBar label="Contract Quality" value={riskScoreBreakdown.contractQuality} />
              <BreakdownBar label="Clause Risk" value={riskScoreBreakdown.clauseRisk} />
              <BreakdownBar label="Compliance" value={riskScoreBreakdown.jurisdictionCompliance} />
            </div>
          </div>
        )}
      </div>

      {/* Positive Findings */}
      {positiveFindings && positiveFindings.length > 0 && (
        <div className="bg-[#111] border border-[#222] rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <CheckCircle2 size={16} className="text-[#22c55e]" />
            <h3 className="text-white font-semibold text-sm sm:text-base">Positive Findings</h3>
            <span className="ml-auto text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">
              {positiveFindings.length} found
            </span>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {positiveFindings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-2.5 sm:gap-3 bg-[#22c55e]/5 border border-[#22c55e]/10 rounded-xl p-3 sm:p-3.5">
                <CheckCircle2 size={14} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white text-xs sm:text-sm font-medium mb-0.5">{finding.clauseTitle}</p>
                  <p className="text-[#999] text-xs leading-relaxed">{finding.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Missing Clauses */}
      {missingClauses && missingClauses.length > 0 && (
        <div className="bg-[#111] border border-[#222] rounded-xl sm:rounded-2xl p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <ShieldAlert size={16} className="text-[#f59e0b]" />
            <h3 className="text-white font-semibold text-sm sm:text-base">Missing Clauses</h3>
            <span className="ml-auto text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] bg-[#f59e0b]/10 px-2 py-0.5 rounded-full">
              {missingClauses.length} identified
            </span>
          </div>
          <div className="space-y-2.5 sm:space-y-3">
            {missingClauses.map((clause, idx) => (
              <div key={idx} className="bg-[#f59e0b]/5 border border-[#f59e0b]/10 rounded-xl p-3 sm:p-3.5">
                <div className="flex items-start gap-2 sm:gap-3 mb-2">
                  <AlertTriangle size={14} className="text-[#f59e0b] flex-shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                      <p className="text-white text-xs sm:text-sm font-medium">{clause.title}</p>
                      <span className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        clause.severity === 'critical' ? 'text-[#dc2626] bg-[#dc2626]/10' :
                        clause.severity === 'high' ? 'text-[#ef4444] bg-[#ef4444]/10' :
                        clause.severity === 'medium' ? 'text-[#f59e0b] bg-[#f59e0b]/10' :
                        'text-[#22c55e] bg-[#22c55e]/10'
                      }`}>{clause.severity}</span>
                    </div>
                    <p className="text-[#999] text-xs leading-relaxed">{clause.explanation}</p>
                  </div>
                </div>
                {clause.suggestedLanguage && (
                  <div className="sm:ml-[26px] mt-2 bg-[#0a0a0a] border border-[#222] rounded-lg p-2.5 sm:p-3 overflow-x-auto">
                    <p className="text-[#666] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">Suggested Language</p>
                    <p className="text-[#ccc] text-xs leading-relaxed font-mono whitespace-pre-wrap">{clause.suggestedLanguage}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

