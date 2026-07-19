import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Shield, Lightbulb } from 'lucide-react';

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

  const mergedClauses = reviewerFeedback.map(review => {
    const advice = advisorFeedback.find(a => a.clauseId === review.clauseId);
    return { review, advice };
  });

  if (mergedClauses.length === 0) {
    return (
      <div className="flex-1 min-h-[400px] mt-6 bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-[#222] flex items-center justify-between">
          <h3 className="text-white font-semibold">Clause Analysis</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <p className="text-[#555] text-sm">No flagged clauses to display.</p>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'text-[#dc2626]';
      case 'HIGH': return 'text-[#ef4444]';
      case 'MEDIUM': return 'text-[#f59e0b]';
      case 'LOW': return 'text-[#22c55e]';
      default: return 'text-[#999]';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'bg-[#dc2626]/5 border-[#dc2626]/20';
      case 'HIGH': return 'bg-[#ef4444]/5 border-[#ef4444]/20';
      case 'MEDIUM': return 'bg-[#f59e0b]/5 border-[#f59e0b]/20';
      case 'LOW': return 'bg-[#22c55e]/5 border-[#22c55e]/20';
      default: return 'bg-[#222]/5 border-[#222]/20';
    }
  };

  return (
    <div className="flex-1 min-h-[400px] mt-6 bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#222] flex items-center justify-between">
        <h3 className="text-white font-semibold">Clause Analysis</h3>
        <span className="text-[#666] text-xs">{mergedClauses.length} flagged clause{mergedClauses.length !== 1 ? 's' : ''}</span>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {mergedClauses.map(({ review, advice }, idx) => {
          const isExpanded = expandedId === review.clauseId;
          const risk = review.strictReview?.risk || advice?.risk || 'MEDIUM';

          return (
            <div key={review.clauseId} className="border-b border-[#1a1a1a] last:border-b-0">
              {/* Collapsed Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : review.clauseId)}
                className="w-full flex items-center gap-3 px-6 py-4 hover:bg-[#111] transition-colors text-left"
              >
                {isExpanded ? (
                  <ChevronDown size={16} className="text-[#666] flex-shrink-0" />
                ) : (
                  <ChevronRight size={16} className="text-[#666] flex-shrink-0" />
                )}
                <span className="text-white text-sm font-medium flex-1 truncate">
                  {advice?.clauseTitle || review.researchTopic || `Clause ${review.clauseId}`}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${getRiskColor(risk)}`}>
                  {risk}
                </span>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-4">
                  {/* Original Clause Text */}
                  <div className="bg-[#111] border border-[#222] rounded-xl p-4">
                    <p className="text-[#666] text-[10px] font-bold uppercase tracking-widest mb-2">Original Clause</p>
                    <p className="text-[#ccc] text-sm leading-relaxed whitespace-pre-wrap">
                      {review.clauseText}
                    </p>
                  </div>

                  {/* Reviewer Assessment */}
                  <div className={`border rounded-xl p-4 ${getRiskBg(risk)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <Shield size={14} className={getRiskColor(risk)} />
                      <p className="text-[#666] text-[10px] font-bold uppercase tracking-widest">Reviewer Assessment</p>
                    </div>
                    <p className="text-[#ccc] text-sm leading-relaxed mb-3">
                      {review.strictReview?.summary}
                    </p>
                    {review.strictReview?.observations?.length > 0 && (
                      <ul className="space-y-1">
                        {review.strictReview.observations.map((obs, i) => (
                          <li key={i} className="text-[#999] text-xs flex items-start gap-2">
                            <span className="text-[#666] mt-0.5">•</span>
                            <span>{obs}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Advisor Suggestion */}
                  {advice && (
                    <div className="bg-[#7c5cfc]/5 border border-[#7c5cfc]/20 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-[#7c5cfc]" />
                        <p className="text-[#666] text-[10px] font-bold uppercase tracking-widest">Advisor Suggestion</p>
                        <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#7c5cfc] bg-[#7c5cfc]/10 px-2 py-0.5 rounded-full">
                          {advice.priority} Priority
                        </span>
                      </div>
                      <p className="text-[#ccc] text-sm leading-relaxed mb-2">
                        {advice.suggestedFix}
                      </p>
                      <p className="text-[#888] text-xs leading-relaxed italic">
                        {advice.rationale}
                      </p>
                    </div>
                  )}

                  {/* Replacement Language */}
                  {advice?.replacementLanguage && (
                    <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#7c5cfc]">
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                          </svg>
                          <p className="text-[#666] text-[10px] font-bold uppercase tracking-widest">Replacement Language</p>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(advice.replacementLanguage || '');
                          }}
                          className="text-[10px] font-bold uppercase tracking-wider text-[#7c5cfc] hover:text-[#9b82fc] bg-[#7c5cfc]/10 hover:bg-[#7c5cfc]/20 px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                      <p className="text-[#ccc] text-sm leading-relaxed font-mono bg-[#080808] border border-[#1a1a1a] rounded-lg p-3 whitespace-pre-wrap">
                        {advice.replacementLanguage}
                      </p>
                    </div>
                  )}

                  {/* Applicable Law */}
                  {review.strictReview?.applicableLaw?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {review.strictReview.applicableLaw.map((law, i) => (
                        <span key={i} className="text-[10px] font-medium text-[#999] bg-[#111] border border-[#222] rounded-full px-3 py-1">
                          {law}
                        </span>
                      ))}
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
