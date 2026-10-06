import React from 'react';
import { CheckCircle2, CircleDashed, Circle, FileText, Scale } from 'lucide-react';
import { StreamProgress } from '@/features/contracts/hooks/useContractAnalysis';

const STEP_DEFINITIONS = [
  { id: 'extract', label: 'Text Ingestion', desc: 'Extracting text and document hierarchy', nodes: ['text-extract-node'] },
  { id: 'clean', label: 'Normalization', desc: 'Cleaning formatting & header structure', nodes: ['text-clean-node'] },
  { id: 'split', label: 'Clause Segmentation', desc: 'Splitting sections into atomic legal obligations', nodes: ['clause-split-node'] },
  { id: 'embed', label: 'Vector Indexing', desc: 'Embedding clauses for statutory retrieval', nodes: ['contract-embed-node'] },
  { id: 'analyze', label: 'Statutory Risk Audit', desc: 'Evaluating liability, indemnities, and termination terms', nodes: ['flag-imp-clauses-node', 'plan-research-node', 'execute-research-node'] },
  { id: 'review', label: 'Legal Assessment', desc: 'Cross-referencing governing law and precedent', nodes: ['legal-reviewer-node'] },
  { id: 'advise', label: 'Advisory Redlines', desc: 'Synthesizing recommendations and replacement clauses', nodes: ['legal-advisor-node'] },
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
  const steps = [
    { label: 'Document Received', desc: 'File uploaded to encrypted enclave', status: 'complete' as const },
    ...STEP_DEFINITIONS.map(def => {
      const isComplete = def.nodes.every(n => completedNodes.includes(n));
      const isCurrent = !isComplete && def.nodes.includes(currentNode);
      
      return {
        label: def.label,
        desc: def.desc,
        status: (isComplete ? 'complete' : isCurrent ? 'current' : 'pending') as 'complete' | 'current' | 'pending'
      };
    })
  ];

  const completedCount = steps.filter(s => s.status === 'complete').length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto px-4 py-8">
      <div 
        className="w-full bg-[#0F1218] border border-[#222938] rounded-xl p-5 sm:p-7 shadow-lg"
        role="status"
        aria-live="polite"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1C222E] mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#161B23] border border-[#273244] flex items-center justify-center">
              <Scale size={16} className="text-[#C49B55]" />
            </div>
            <div>
              <h2 className="text-[#F1F4F8] text-sm font-semibold tracking-tight">
                Contract Audit in Progress
              </h2>
              <span className="text-[11px] text-[#636F83] font-mono">Multi-Agent Review Pipeline</span>
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-[#4B72C2] bg-[#161B23] px-2 py-0.5 rounded border border-[#222938]">
            {progressPercent}%
          </span>
        </div>

        {/* Document Name Tag */}
        {documentName && (
          <div className="flex items-center gap-2 bg-[#121620] border border-[#1E2533] px-3 py-2 rounded-md mb-5">
            <FileText size={14} className="text-[#4B72C2] shrink-0" />
            <span className="text-xs text-[#E2E6EC] font-mono truncate">{documentName}</span>
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#141923] rounded-full overflow-hidden mb-6">
          <div 
            className="h-full bg-[#2B5EA7] transition-all duration-300 rounded-full"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        {/* Steps List */}
        <div className="flex flex-col gap-3.5">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 transition-opacity duration-200 ${
                step.status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {step.status === 'complete' && (
                  <CheckCircle2 size={16} className="text-[#16A34A]" aria-hidden="true" />
                )}
                {step.status === 'current' && (
                  <CircleDashed size={16} className="text-[#4B72C2] animate-spin" aria-hidden="true" />
                )}
                {step.status === 'pending' && (
                  <Circle size={16} className="text-[#333E53]" aria-hidden="true" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${
                    step.status === 'complete' ? 'text-[#9DA8B9]' : 
                    step.status === 'current' ? 'text-[#F1F4F8] font-medium' : 
                    'text-[#636F83]'
                  }`}>
                    {step.label}
                  </span>
                  {step.status === 'current' && (
                    <span className="text-[9px] font-mono uppercase text-[#4B72C2] bg-[#4B72C2]/10 px-1.5 py-0.2 rounded font-semibold">
                      active
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#636F83] mt-0.5 leading-snug">
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
