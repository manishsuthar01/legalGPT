import React from 'react';

interface DocumentMetadataProps {
  clauseCount: number;
  riskScore: number;
}

export const DocumentMetadata: React.FC<DocumentMetadataProps> = ({ clauseCount, riskScore }) => {
  const stats = [
    { label: 'Clauses Analyzed', value: clauseCount },
    { label: 'Risk Score', value: `${riskScore}/100` },
    { label: 'Uploaded', value: 'Today' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-2.5 sm:p-4 flex flex-col justify-center overflow-hidden">
          <span className="text-[#666] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-0.5 sm:mb-1 truncate">
            {stat.label}
          </span>
          <span className="text-white text-sm sm:text-lg font-semibold truncate">
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
};

