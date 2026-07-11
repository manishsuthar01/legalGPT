import React from 'react';
import { mockAnalysisData } from '../mock/analysisData';

export const ExecutiveSummary = () => {
  return (
    <div className="bg-[#111] border border-[#222] rounded-2xl p-6 mb-6">
      <h3 className="text-white font-semibold mb-3">Executive Summary</h3>
      <p className="text-[#999] text-sm leading-relaxed mb-6">
        {mockAnalysisData.executiveSummary}
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
          <span className="block text-[#666] text-[10px] font-bold uppercase tracking-widest mb-1">Overall Risk</span>
          <span className="text-[#ef4444] font-semibold">{mockAnalysisData.overallRisk}</span>
        </div>
        <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
          <span className="block text-[#666] text-[10px] font-bold uppercase tracking-widest mb-1">Risk Score</span>
          <span className="text-white font-semibold">{mockAnalysisData.riskScore} / 100</span>
        </div>
      </div>
    </div>
  );
};
