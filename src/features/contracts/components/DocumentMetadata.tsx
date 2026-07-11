import React from 'react';
import { mockContractData } from '../mock/contractData';

export const DocumentMetadata = () => {
  const { metadata } = mockContractData;

  const stats = [
    { label: 'Pages', value: metadata.pages },
    { label: 'Clauses', value: metadata.clauses },
    { label: 'Uploaded', value: 'Today' },
    { label: 'Risk Score', value: `${metadata.riskScore}/100` },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 flex flex-col justify-center">
          <span className="text-[#666] text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</span>
          <span className="text-white text-lg font-semibold">{stat.value}</span>
        </div>
      ))}
    </div>
  );
};
