import React, { useState } from 'react';
import { Plus, FileText, ChevronDown, ChevronRight, Settings, User } from 'lucide-react';

export const LeftSidebar = () => {
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const [generationExpanded, setGenerationExpanded] = useState(true);

  return (
    <div className="w-[260px] h-full flex flex-col bg-[#0a0a0a] border-r border-[#222]">
      {/* Logo Area */}
      <div className="h-[70px] flex items-center px-6 border-b border-[#222]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#7c5cfc] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LegalGPT</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6">
        <button className="w-full flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#111] hover:border-[#333] border border-[#222] text-white font-semibold py-3 rounded-xl transition-all duration-300">
          <Plus size={18} />
          New Analysis
        </button>

        <div className="flex flex-col gap-2">
          <div
            className="flex items-center justify-between text-[#999] hover:text-white cursor-pointer px-2 py-1"
            onClick={() => setAnalysisExpanded(!analysisExpanded)}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Analysis</span>
            {analysisExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          {analysisExpanded && (
            <div className="flex flex-col gap-1">
              {['NDA.pdf', 'Freelancer Agreement.pdf', 'Employment Contract.pdf', 'Lease Agreement.pdf'].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer">
                  <FileText size={16} className="text-[#666]" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div
            className="flex items-center justify-between text-[#999] hover:text-white cursor-pointer px-2 py-1"
            onClick={() => setGenerationExpanded(!generationExpanded)}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Generation</span>
            {generationExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </div>
          {generationExpanded && (
            <div className="flex flex-col gap-1">
              {['NDA', 'Employment Agreement', 'Service Agreement'].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer">
                  <FileText size={16} className="text-[#666]" />
                  <span className="truncate">{doc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-[#222]">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer transition-colors">
            <Settings size={16} />
            <span>Settings</span>
          </div>
          <div className="flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer transition-colors">
            <User size={16} />
            <span>Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
};
