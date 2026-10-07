'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Copy, 
  Check, 
  FileText
} from 'lucide-react';
import { StatusBadge, RiskLevel } from '../../../components/ui/StatusBadge';

interface AdvisorItem {
  clauseId: number;
  clauseTitle: string;
  risk: string;
  suggestedFix: string;
  replacementLanguage?: string;
  rationale: string;
  priority: string;
  likelihood?: number;
  impact?: number;
  whyItMatters?: string;
}

interface ReviewerItem {
  clauseId: number;
  clauseText: string;
  researchTopic: string;
  strictReview: {
    risk: string;
    summary: string;
    observations: string[];
    evidence: string[];
    applicableLaw: string[];
    internalReasoning: string;
  };
}

interface ClauseViewerProps {
  advisorFeedback: AdvisorItem[];
  reviewerFeedback: ReviewerItem[];
}

export const ClauseViewer: React.FC<ClauseViewerProps> = ({ advisorFeedback, reviewerFeedback }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const mergedClauses = reviewerFeedback.map(review => {
    const advice = advisorFeedback.find(a => a.clauseId === review.clauseId);
    return { review, advice };
  });

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getRiskLevel = (risk: string): RiskLevel => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'critical';
      case 'HIGH': return 'high';
      case 'MEDIUM': return 'medium';
      case 'LOW': return 'low';
      default: return 'neutral';
    }
  };

  if (mergedClauses.length === 0) {
    return (
      <div className="flex-1 min-h-[220px] mt-4 bg-[#0F1319] border border-[#1E2532] rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 text-center select-none shadow-sm">
        <FileText size={22} className="text-[#64748B] mb-2" />
        <p className="text-[#F1F5F9] text-xs font-medium">No flagged clauses to display.</p>
        <p className="text-[#94A3B8] text-xs mt-0.5">Agreement text meets baseline standards.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 mt-4 sm:mt-6 bg-[#0F1319] border border-[#1E2532] rounded-xl overflow-hidden flex flex-col select-text shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-[#1E2532] flex items-center justify-between bg-[#0F1319] select-none">
        <h3 className="text-[#F1F5F9] font-semibold text-xs sm:text-sm">
          Clause Analysis &amp; Redlines
        </h3>
        <span className="text-[#94A3B8] text-xs font-mono">
          {mergedClauses.length} clause{mergedClauses.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {/* Accordion List */}
      <div className="divide-y divide-[#1E2532]">
        {mergedClauses.map(({ review, advice }) => {
          const isExpanded = expandedId === review.clauseId;
          const rawRisk = review.strictReview?.risk || advice?.risk || 'MEDIUM';
          const riskLevel = getRiskLevel(rawRisk);

          return (
            <div 
              key={review.clauseId} 
              className={`transition-colors ${
                isExpanded ? 'bg-[#141A24]' : 'hover:bg-[#121722]'
              }`}
            >
              {/* Clause Header Toggle */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : review.clauseId)}
                aria-expanded={isExpanded}
                className="w-full flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-3.5 sm:py-4 text-left outline-none cursor-pointer"
              >
                <div className="text-[#64748B] shrink-0">
                  {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </div>

                <span className="text-xs font-mono text-[#818CF8] shrink-0 font-semibold">
                  §{review.clauseId}
                </span>

                <span className="text-[#F1F5F9] text-xs sm:text-sm font-medium flex-1 truncate">
                  {advice?.clauseTitle || review.researchTopic || `Clause ${review.clauseId}`}
                </span>

                <div className="shrink-0">
                  <StatusBadge 
                    level={riskLevel} 
                    label={rawRisk} 
                    size="sm" 
                  />
                </div>
              </button>

              {/* Expanded Detail */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-5 space-y-3.5 pt-1 border-t border-[#1E2532]">
                  
                  {/* Original Text */}
                  <div className="bg-[#0A0D12] border border-[#1E2532] rounded-lg p-3.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block mb-1.5">
                      Original Clause Text
                    </span>
                    <p className="text-xs text-[#E2E8F0] leading-relaxed whitespace-pre-wrap select-text font-serif">
                      {review.clauseText}
                    </p>
                  </div>

                  {/* Summary / Analysis */}
                  {review.strictReview?.summary && (
                    <div className="p-3 bg-[#111722] border border-[#1E2532] rounded-lg">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8] block mb-1">
                        Issue
                      </span>
                      <p className="text-xs text-[#CBD5E1] leading-relaxed">
                        {review.strictReview.summary}
                      </p>
                    </div>
                  )}

                  {/* Redline Substitute Language */}
                  {advice?.replacementLanguage && (
                    <div className="bg-[#061B10] border border-[#14532D] rounded-lg p-3.5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-[#86EFAC]">
                          Suggested Redline
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleCopy(advice.replacementLanguage || '', review.clauseId)}
                          className="flex items-center gap-1 text-xs text-[#86EFAC] bg-[#0A2614] hover:bg-[#0E351C] border border-[#14532D] px-2.5 py-1 rounded transition-colors cursor-pointer"
                          title="Copy replacement language"
                        >
                          {copiedId === review.clauseId ? (
                            <>
                              <Check size={12} className="text-[#86EFAC]" />
                              <span className="font-medium text-[#86EFAC]">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Copy Redline</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-[#030F08] border border-[#14532D] rounded p-2.5 text-xs font-mono text-[#86EFAC] leading-relaxed whitespace-pre-wrap select-all">
                        {advice.replacementLanguage}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

};

