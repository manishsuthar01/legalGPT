import React from 'react';
import { mockContractData } from '../mock/contractData';

export const ClauseViewer = () => {
  return (
    <div className="flex-1 min-h-[400px] mt-6 bg-[#0a0a0a] border border-[#222] rounded-2xl overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#222] flex items-center justify-between">
        <h3 className="text-white font-semibold">Document Viewer</h3>
        <span className="text-[#666] text-xs">Preview mode</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 whitespace-pre-wrap text-[#999] leading-relaxed font-sans text-sm">
        {mockContractData.content}
      </div>
    </div>
  );
};
