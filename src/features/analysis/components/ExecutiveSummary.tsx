import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, ShieldAlert, Copy, Check } from 'lucide-react';
import { StatusBadge } from '../../../components/ui/StatusBadge';

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
    if (pct >= 70) return 'bg-emerald-500';
    if (pct >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
      <div className="flex items-center justify-between sm:w-[150px] shrink-0">
        <span className="text-[#94A3B8] text-xs font-medium">{label}</span>
        <span className="sm:hidden text-[#F1F5F9] text-xs font-mono font-medium">{value}/100</span>
      </div>
      <div className="flex-1 h-1.5 bg-[#1E2532] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${getBarColor()}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="hidden sm:inline-block text-[#94A3B8] text-xs font-mono w-[30px] text-right">{value}</span>
    </div>
  );
};

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ 
  summary, 
  overallRisk, 
  riskScore, 
  riskScoreBreakdown, 
  positiveFindings, 
  missingClauses 
}) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getRiskSeverityLevel = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'critical' as const;
      case 'HIGH': return 'high' as const;
      case 'MEDIUM': return 'medium' as const;
      case 'LOW': return 'low' as const;
      default: return 'neutral' as const;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 mb-6 select-text">
      {/* Executive Summary Memorandum Card */}
      <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-4 sm:p-6 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#1E2532] mb-4">
          <h3 className="text-[#F1F5F9] font-semibold text-sm sm:text-base">
            Executive Summary
          </h3>
          <StatusBadge 
            level={getRiskSeverityLevel(overallRisk)} 
            label={`${overallRisk} Risk`} 
            size="sm" 
          />
        </div>

        <p className="text-[#CBD5E1] text-xs sm:text-sm leading-relaxed mb-5">
          {summary}
        </p>

        {/* Risk Score and Breakdown Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-[#141A24] border border-[#1E2532] rounded-xl p-3.5 sm:p-4">
          <div className="flex flex-col justify-between">
            <span className="text-[#94A3B8] text-xs font-medium mb-1">
              Overall Risk Assessment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-[#F1F5F9] text-2xl font-bold font-mono">{riskScore}</span>
              <span className="text-[#64748B] text-xs font-mono">/ 100</span>
            </div>
            <p className="text-xs text-[#94A3B8] mt-1">
              {riskScore >= 70 ? 'Requires legal redlines before signing.' :
               riskScore >= 40 ? 'Contains terms requiring review.' :
               'Terms align with standard market terms.'}
            </p>
          </div>

          {/* Breakdown Bars */}
          {riskScoreBreakdown && (
            <div className="flex flex-col justify-center space-y-2.5 border-t md:border-t-0 md:border-l border-[#1E2532] pt-3 md:pt-0 md:pl-4">
              <BreakdownBar label="Drafting Quality" value={riskScoreBreakdown.contractQuality} />
              <BreakdownBar label="Clause Exposure" value={riskScoreBreakdown.clauseRisk} />
              <BreakdownBar label="Compliance" value={riskScoreBreakdown.jurisdictionCompliance} />
            </div>
          )}
        </div>
      </div>

      {/* Missing Clauses Section */}
      {missingClauses && missingClauses.length > 0 && (
        <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1E2532] mb-4">
            <ShieldAlert size={16} className="text-amber-400" />
            <h3 className="text-[#F1F5F9] font-semibold text-sm sm:text-base">
              Missing Protective Clauses
            </h3>
            <span className="ml-auto text-[10px] font-mono text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full font-medium">
              {missingClauses.length} omitted
            </span>
          </div>

          <div className="space-y-3">
            {missingClauses.map((clause, idx) => (
              <div 
                key={idx} 
                className="bg-[#141A24] border border-[#1E2532] rounded-xl p-3.5 sm:p-4"
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <AlertTriangle size={15} className="text-amber-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <h4 className="text-[#F1F5F9] text-xs sm:text-sm font-medium">
                        {clause.title}
                      </h4>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                        clause.severity === 'critical' ? 'text-red-300 bg-red-500/15 border-red-500/30' :
                        clause.severity === 'high' ? 'text-rose-300 bg-rose-500/15 border-rose-500/30' :
                        'text-amber-300 bg-amber-500/15 border-amber-500/30'
                      }`}>
                        {clause.severity}
                      </span>
                    </div>
                    <p className="text-[#94A3B8] text-xs leading-relaxed">
                      {clause.explanation}
                    </p>
                  </div>
                </div>

                {/* Suggested Language to insert */}
                {clause.suggestedLanguage && (
                  <div className="mt-3 bg-[#0A0D12] border border-[#1E2532] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#94A3B8]">
                        Recommended Clause to Add
                      </span>
                      <button
                        onClick={() => handleCopy(clause.suggestedLanguage, idx)}
                        className="flex items-center gap-1 text-[11px] text-[#94A3B8] hover:text-white bg-[#1E2532] hover:bg-[#283244] px-2 py-0.5 rounded transition-colors cursor-pointer"
                        title="Copy suggested clause"
                      >
                        {copiedIdx === idx ? (
                          <>
                            <Check size={11} className="text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy size={11} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="text-[#CBD5E1] text-xs font-mono leading-relaxed whitespace-pre-wrap select-all">
                      {clause.suggestedLanguage}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Positive Findings Section */}
      {positiveFindings && positiveFindings.length > 0 && (
        <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-[#1E2532] mb-4">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <h3 className="text-[#F1F5F9] font-semibold text-sm sm:text-base">
              Standard Protective Terms
            </h3>
            <span className="ml-auto text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
              {positiveFindings.length} terms
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {positiveFindings.map((finding, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-2.5 bg-[#141A24] border border-[#1E2532] rounded-lg p-3"
              >
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#F1F5F9] text-xs font-medium mb-0.5">{finding.clauseTitle}</p>
                  <p className="text-[#94A3B8] text-xs leading-relaxed">{finding.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


