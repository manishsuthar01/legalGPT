import React, { useState, useEffect } from 'react';
import { CheckCircle2, CircleDashed, Circle } from 'lucide-react';

const NODE_SEQUENCE = [
  "text-extract-node",
  "text-clean-node",
  "clause-split-node",
  "contract-embed-node",
  "flag-imp-clauses-node",
  "plan-research-node",
  "execute-research-node",
  "legal-reviewer-node",
  "legal-advisor-node"
];

const STEP_DEFINITIONS = [
  { id: 'extract', label: 'Extracting text', nodes: ['text-extract-node'] },
  { id: 'clean', label: 'Cleaning text', nodes: ['text-clean-node'] },
  { id: 'split', label: 'Splitting clauses', nodes: ['clause-split-node'] },
  { id: 'embed', label: 'Creating embeddings', nodes: ['contract-embed-node'] },
  { id: 'analyze', label: 'Running legal analysis', nodes: ['flag-imp-clauses-node', 'plan-research-node', 'execute-research-node'] },
  { id: 'review', label: 'Generating summary & Review', nodes: ['legal-reviewer-node'] },
  { id: 'advise', label: 'Generating suggestions & fixes', nodes: ['legal-advisor-node'] },
];

export const AnalysisProgress = ({ streamData }: { streamData: any }) => {
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [currentNode, setCurrentNode] = useState<string>("text-extract-node");

  useEffect(() => {
    if (streamData?.type === 'node_complete') {
      const completedNode = streamData.node;
      setCompletedNodes(prev => {
        if (!prev.includes(completedNode)) {
          return [...prev, completedNode];
        }
        return prev;
      });
      
      const index = NODE_SEQUENCE.indexOf(completedNode);
      if (index !== -1 && index + 1 < NODE_SEQUENCE.length) {
        setCurrentNode(NODE_SEQUENCE[index + 1]);
      } else {
        setCurrentNode("");
      }
    }
  }, [streamData]);

  const steps = [
    { label: 'Upload complete', status: 'complete' },
    ...STEP_DEFINITIONS.map(def => {
      const isComplete = def.nodes.every(n => completedNodes.includes(n));
      const isCurrent = !isComplete && def.nodes.includes(currentNode);
      
      return {
        label: def.label,
        status: isComplete ? 'complete' : isCurrent ? 'current' : 'pending'
      };
    })
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto px-6">
      <div 
        className="w-full bg-[#111] border border-[#222] rounded-2xl p-10 shadow-2xl"
        role="status"
        aria-live="polite"
      >
        <h2 className="text-white text-xl font-semibold mb-8 text-center tracking-tight">
          Analyzing Contract
        </h2>
        
        <div className="flex flex-col gap-5">
          {steps.map((step, idx) => (
            <div key={idx} className={`flex items-center gap-4 transition-opacity duration-300 ${step.status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
              {step.status === 'complete' && (
                <CheckCircle2 size={20} className="text-[#22c55e]" aria-hidden="true" />
              )}
              {step.status === 'current' && (
                <CircleDashed size={20} className="text-[#7c5cfc] animate-spin" aria-hidden="true" />
              )}
              {step.status === 'pending' && (
                <Circle size={20} className="text-[#333]" aria-hidden="true" />
              )}
              <span className={`text-sm ${
                step.status === 'complete' ? 'text-[#999]' : 
                step.status === 'current' ? 'text-white font-medium' : 
                'text-[#555]'
              }`}>
                {step.label}
                {step.status === 'current' && <span className="sr-only"> (in progress)</span>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
