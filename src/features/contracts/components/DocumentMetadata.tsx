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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 flex flex-col justify-center">
          <span className="text-[#666] text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</span>
          <span className="text-white text-lg font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};
