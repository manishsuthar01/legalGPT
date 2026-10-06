'use client';

import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  Shield, 
  Lightbulb, 
  Copy, 
  Check, 
  Scale, 
  BookOpen,
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

  const getBorderAccent = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'border-l-red-500';
      case 'HIGH': return 'border-l-rose-500';
      case 'MEDIUM': return 'border-l-amber-500';
      case 'LOW': return 'border-l-emerald-500';
      default: return 'border-l-[#2D364A]';
    }
  };

  if (mergedClauses.length === 0) {
    return (
      <div className="flex-1 min-h-[300px] mt-4 bg-[#0F1218] border border-[#1E2533] rounded-lg overflow-hidden flex flex-col select-none">
        <div className="px-5 py-3.5 border-b border-[#1C222E] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={15} className="text-[#4B72C2]" />
            <h3 className="text-[#F1F4F8] font-semibold text-xs sm:text-sm font-mono uppercase tracking-wider">
              Clause-by-Clause Audit
            </h3>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <FileText size={24} className="text-[#636F83] mb-2" />
          <p className="text-[#9DA8B9] text-xs">No flagged clauses to inspect.</p>
          <p className="text-[#636F83] text-[11px] mt-0.5">Agreement text meets statutory baseline.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-[350px] mt-4 sm:mt-6 bg-[#0F1218] border border-[#1E2533] rounded-lg overflow-hidden flex flex-col select-text shadow-sm">
      {/* Table of Clauses Header */}
      <div className="px-4 py-3 sm:px-6 sm:py-3.5 border-b border-[#1C222E] flex items-center justify-between bg-[#0B0E14] select-none">
        <div className="flex items-center gap-2">
          <Scale size={15} className="text-[#4B72C2]" />
          <h3 className="text-[#F1F4F8] font-semibold text-xs sm:text-sm font-mono uppercase tracking-wider">
            Clause-by-Clause Audit & Redlines
          </h3>
        </div>
        <span className="text-[#636F83] text-xs font-mono">
          {mergedClauses.length} audited clause{mergedClauses.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {/* Clauses Accordion Stream */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#181E29]">
        {mergedClauses.map(({ review, advice }) => {
          const isExpanded = expandedId === review.clauseId;
          const rawRisk = review.strictReview?.risk || advice?.risk || 'MEDIUM';
          const riskLevel = getRiskLevel(rawRisk);

          return (
            <div 
              key={review.clauseId} 
              className={`transition-colors border-l-3 ${getBorderAccent(rawRisk)} ${
                isExpanded ? 'bg-[#0B0E14]' : 'hover:bg-[#121620]'
              }`}
            >
              {/* Collapsed Clause Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : review.clauseId)}
                aria-expanded={isExpanded}
                className="w-full flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-6 py-3.5 sm:py-4 text-left outline-none focus-ring cursor-pointer"
              >
                <div className="text-[#636F83] shrink-0">
                  {isExpanded ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-mono text-[#636F83] font-semibold">
                    §{review.clauseId}
                  </span>
                </div>

                <span className="text-[#F1F4F8] text-xs sm:text-sm font-medium flex-1 truncate">
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

              {/* Expanded Detailed Audit Workspace */}
              {isExpanded && (
                <div className="px-4 sm:px-6 pb-5 sm:pb-6 space-y-4 pt-1 border-t border-[#161B24]">
                  
                  {/* 1. Original Contract Verbatim Text */}
                  <div className="bg-[#080A0E] border border-[#1A202C] rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#141923]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#636F83] font-mono">
                        Original Contract Language (Raw Evidence)
                      </span>
                      <span className="text-[10px] text-[#636F83] font-mono">Verbatim extract</span>
                    </div>
                    <div className="font-legal-clause text-[#CCD3DE] text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap select-text">
                      {review.clauseText}
                    </div>
                  </div>

                  {/* 2. Reviewer Statutory Assessment */}
                  <div className="bg-[#0D1017] border border-[#1E2535] rounded-md p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-[#181F2B]">
                      <Shield size={13} className="text-[#4B72C2]" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F] font-mono">
                        Statutory Assessment & Breach Analysis
                      </span>
                    </div>
                    
                    <p className="text-[#C4CDD9] text-xs leading-relaxed mb-3">
                      {review.strictReview?.summary}
                    </p>

                    {/* Specific observed risk points */}
                    {review.strictReview?.observations?.length > 0 && (
                      <div className="mt-2.5 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#636F83] font-mono block">
                          Legal Observations:
                        </span>
                        <ul className="space-y-1 pl-1">
                          {review.strictReview.observations.map((obs, i) => (
                            <li key={i} className="text-[#9DA8B9] text-xs flex items-start gap-2">
                              <span className="text-[#4B72C2] mt-0.5">•</span>
                              <span className="leading-snug">{obs}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Applicable Law & Statutory Citations */}
                    {review.strictReview?.applicableLaw?.length > 0 && (
                      <div className="mt-3 pt-2.5 border-t border-[#161B26] flex items-center gap-1.5 flex-wrap">
                        <BookOpen size={12} className="text-[#C49B55] shrink-0" />
                        <span className="text-[10px] font-mono uppercase text-[#636F83]">Authority:</span>
                        {review.strictReview.applicableLaw.map((law, i) => (
                          <span 
                            key={i} 
                            className="text-[10px] font-mono text-[#D2D8E2] bg-[#141A24] border border-[#222B3B] rounded px-2 py-0.5"
                          >
                            {law}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Advisor Recommended Fix & Strategy */}
                  {advice && (
                    <div className="bg-[#10141E] border border-[#1F2B40] rounded-md p-3.5 sm:p-4">
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#1A2436]">
                        <div className="flex items-center gap-1.5">
                          <Lightbulb size={13} className="text-[#C49B55]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#C49B55] font-mono">
                            Advisory Counsel Guidance
                          </span>
                        </div>
                        <span className="text-[9px] font-mono uppercase font-bold text-[#4B72C2] bg-[#4B72C2]/10 border border-[#4B72C2]/20 px-2 py-0.5 rounded">
                          {advice.priority} Priority
                        </span>
                      </div>
                      
                      <p className="text-[#D8DEE9] text-xs leading-relaxed mb-2">
                        {advice.suggestedFix}
                      </p>
                      
                      {advice.rationale && (
                        <p className="text-[#7E8B9F] text-xs leading-relaxed italic bg-[#0B0E14] border border-[#161B24] rounded p-2">
                          <span className="font-semibold text-[#9DA8B9] not-italic mr-1">Negotiation Strategy:</span>
                          {advice.rationale}
                        </p>
                      )}
                    </div>
                  )}

                  {/* 4. Curative Replacement Language (Attorney Redline) */}
                  {advice?.replacementLanguage && (
                    <div className="bg-[#0B0E14] border border-[#223046] rounded-md p-3.5 sm:p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#1A2436]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] font-mono">
                            Recommended Redline (Substitute Language)
                          </span>
                        </div>
                        
                        <button
                          type="button"
                          onClick={() => handleCopy(advice.replacementLanguage || '', review.clauseId)}
                          className="flex items-center gap-1 text-[10px] font-mono text-[#4B72C2] hover:text-white bg-[#141C2A] hover:bg-[#2B5EA7] border border-[#263752] px-2.5 py-1 rounded transition-colors cursor-pointer"
                          title="Copy replacement language"
                        >
                          {copiedId === review.clauseId ? (
                            <>
                              <Check size={11} className="text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy size={11} />
                              <span>Copy Redline</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-[#06080C] border border-[#141A24] rounded p-3 text-xs font-mono text-[#D8E0EC] leading-relaxed whitespace-pre-wrap select-all">
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
