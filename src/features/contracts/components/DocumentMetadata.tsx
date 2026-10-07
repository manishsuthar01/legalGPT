import React from 'react';
import { FileText, ShieldAlert } from 'lucide-react';

interface DocumentMetadataProps {
  clauseCount: number;
  riskScore: number;
}

export const DocumentMetadata: React.FC<DocumentMetadataProps> = ({ clauseCount, riskScore }) => {
  const getRiskStatus = (score: number) => {
    if (score >= 70) return { label: 'High Risk', color: 'text-rose-300 bg-rose-500/15 border-rose-500/30' };
    if (score >= 40) return { label: 'Medium Risk', color: 'text-amber-300 bg-amber-500/15 border-amber-500/30' };
    return { label: 'Low Risk', color: 'text-emerald-300 bg-emerald-500/15 border-emerald-500/30' };
  };

  const riskStatus = getRiskStatus(riskScore);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5 select-none">
      {/* Metric 1: Clauses */}
      <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#94A3B8] text-xs font-medium">
            Clauses Analyzed
          </span>
          <FileText size={15} className="text-[#64748B]" aria-hidden="true" />
        </div>
        <div className="flex items-baseline gap-1.5 mt-1">
          <span className="text-[#F1F5F9] text-xl font-bold font-mono">
            {clauseCount}
          </span>
          <span className="text-[#64748B] text-xs">clauses</span>
        </div>
      </div>

      {/* Metric 2: Risk Score */}
      <div className="bg-[#0F1319] border border-[#1E2532] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#94A3B8] text-xs font-medium">
            Risk Score
          </span>
          <ShieldAlert 
            size={15} 
            className={riskScore >= 70 ? 'text-rose-400' : riskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'} 
            aria-hidden="true" 
          />
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[#F1F5F9] text-xl font-bold font-mono">
            {riskScore}
          </span>
          <span className="text-[#64748B] text-xs font-mono">/ 100</span>
          <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${riskStatus.color}`}>
            {riskStatus.label}
          </span>
        </div>
      </div>

      {/* Metric 3: Assessment summary */}
      <div className="col-span-2 sm:col-span-1 bg-[#0F1319] border border-[#1E2532] rounded-xl p-3.5 sm:p-4 flex flex-col justify-between shadow-xs">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[#94A3B8] text-xs font-medium">
            Review Status
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-xs font-medium text-[#E2E8F0]">
            {riskScore >= 70 ? 'Requires Redlines' : riskScore >= 40 ? 'Review Recommended' : 'Standard Terms'}
          </span>
        </div>
      </div>
    </div>
  );
};


