import React from 'react';
import { CheckCircle2, Loader2, Circle, FileText } from 'lucide-react';
import { StreamProgress } from '@/features/contracts/hooks/useContractAnalysis';

const STEP_DEFINITIONS = [
  { id: 'extract', label: 'Extracting Text', desc: 'Parsing document structure', nodes: ['text-extract-node'] },
  { id: 'clean', label: 'Normalizing Content', desc: 'Cleaning document formatting', nodes: ['text-clean-node'] },
  { id: 'split', label: 'Segmenting Clauses', desc: 'Identifying individual clauses', nodes: ['clause-split-node'] },
  { id: 'embed', label: 'Indexing Terms', desc: 'Cross-referencing legal definitions', nodes: ['contract-embed-node'] },
  { id: 'analyze', label: 'Assessing Risk', desc: 'Flagging liability & ambiguous clauses', nodes: ['flag-imp-clauses-node', 'plan-research-node', 'execute-research-node'] },
  { id: 'review', label: 'Verifying Compliance', desc: 'Checking against standard governing law', nodes: ['legal-reviewer-node'] },
  { id: 'advise', label: 'Generating Redlines', desc: 'Preparing suggested replacement clauses', nodes: ['legal-advisor-node'] },
];

interface AnalysisProgressProps {
  streamData?: StreamProgress | null;
  completedNodes?: string[];
  currentNode?: string;
  documentName?: string;
}

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({
  completedNodes = [],
  currentNode = 'text-extract-node',
  documentName,
}) => {
  const steps = STEP_DEFINITIONS.map(def => {
    const isComplete = def.nodes.every(n => completedNodes.includes(n));
    const isCurrent = !isComplete && def.nodes.includes(currentNode);
    
    return {
      label: def.label,
      desc: def.desc,
      status: (isComplete ? 'complete' : isCurrent ? 'current' : 'pending') as 'complete' | 'current' | 'pending'
    };
  });

  const completedCount = steps.filter(s => s.status === 'complete').length;
  const progressPercent = Math.min(100, Math.round(((completedCount + 1) / (steps.length + 1)) * 100));

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-4 py-8">
      <div 
        className="w-full bg-[#0F1319] border border-[#1E2532] rounded-2xl p-5 sm:p-7 shadow-sm"
        role="status"
        aria-live="polite"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E2532] mb-5">
          <div>
            <h2 className="text-[#F1F5F9] text-sm font-semibold">
              Analyzing Contract
            </h2>
            <p className="text-xs text-[#94A3B8] mt-0.5">Evaluating clauses and liability risks</p>
          </div>
          <span className="text-xs font-mono font-semibold text-[#818CF8] bg-[#141A24] px-2.5 py-1 rounded-lg border border-[#1E2532]">
            {progressPercent}%
          </span>
        </div>

        {/* Document Name Tag */}
        {documentName && (
          <div className="flex items-center gap-2 bg-[#141A24] border border-[#1E2532] px-3 py-2 rounded-lg mb-5">
            <FileText size={14} className="text-[#818CF8] shrink-0" />
            <span className="text-xs text-[#E2E8F0] font-mono truncate">{documentName}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#1E2532] rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-[#583AFE] transition-all duration-300 rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Steps List */}
        <div className="flex flex-col gap-3">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 transition-opacity duration-200 ${
                step.status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {step.status === 'complete' && (
                  <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                )}
                {step.status === 'current' && (
                  <Loader2 size={16} className="text-[#818CF8] animate-spin" aria-hidden="true" />
                )}
                {step.status === 'pending' && (
                  <Circle size={16} className="text-[#475569]" aria-hidden="true" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span className={`text-xs ${
                  step.status === 'complete' ? 'text-[#94A3B8]' : 
                  step.status === 'current' ? 'text-[#F1F5F9] font-medium' : 
                  'text-[#64748B]'
                }`}>
                  {step.label}
                </span>
                <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

