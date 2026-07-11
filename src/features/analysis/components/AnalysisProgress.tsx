import React from 'react';
import { CheckCircle2, CircleDashed, Circle } from 'lucide-react';

export const AnalysisProgress = () => {
  const steps = [
    { label: 'Upload complete', status: 'complete' },
    { label: 'Extracting text', status: 'complete' },
    { label: 'Splitting clauses', status: 'complete' },
    { label: 'Creating embeddings', status: 'complete' },
    { label: 'Running legal analysis', status: 'current' },
    { label: 'Generating summary', status: 'pending' },
    { label: 'Preparing AI assistant', status: 'pending' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto px-6">
      <div className="w-full bg-[#111] border border-[#222] rounded-2xl p-10 shadow-2xl">
        <h2 className="text-white text-xl font-semibold mb-8 text-center tracking-tight">
          Analyzing Contract
        </h2>
        
        <div className="flex flex-col gap-5">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-4">
              {step.status === 'complete' && (
                <CheckCircle2 size={20} className="text-[#22c55e]" />
              )}
              {step.status === 'current' && (
                <CircleDashed size={20} className="text-[#7c5cfc] animate-spin" />
              )}
              {step.status === 'pending' && (
                <Circle size={20} className="text-[#333]" />
              )}
              <span className={`text-sm ${
                step.status === 'complete' ? 'text-[#999]' : 
                step.status === 'current' ? 'text-white font-medium' : 
                'text-[#555]'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
