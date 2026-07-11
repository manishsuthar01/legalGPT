import React, { useState } from 'react';
import { Plus, FileText, ChevronDown, ChevronRight, Settings, User, X } from 'lucide-react';

interface LeftSidebarProps {
  onCloseMobile?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ onCloseMobile }) => {
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const [generationExpanded, setGenerationExpanded] = useState(true);

  return (
    <aside className="w-[260px] h-full flex flex-col bg-[#0a0a0a] border-r border-[#222]">
      {/* Logo Area */}
      <div className="h-[70px] flex items-center justify-between px-6 border-b border-[#222] shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#7c5cfc] rounded-md flex items-center justify-center">
            <span className="text-white text-xs font-bold" aria-hidden="true">✓</span>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">LegalGPT</span>
        </div>
        {onCloseMobile && (
          <button 
            onClick={onCloseMobile}
            aria-label="Close menu"
            className="md:hidden p-1 text-[#999] hover:text-white rounded-md focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Content */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-6" aria-label="Main Navigation">
        <button className="w-full flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#111] hover:border-[#333] border border-[#222] text-white font-semibold py-3 rounded-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]">
          <Plus size={18} aria-hidden="true" />
          New Analysis
        </button>

        <div className="flex flex-col gap-2">
          <button
            aria-expanded={analysisExpanded}
            className="w-full flex items-center justify-between text-[#999] hover:text-white cursor-pointer px-2 py-1 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none rounded-md"
            onClick={() => setAnalysisExpanded(!analysisExpanded)}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Analysis</span>
            {analysisExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
          </button>
          {analysisExpanded && (
            <div className="flex flex-col gap-1">
              {['NDA.pdf', 'Freelancer Agreement.pdf', 'Employment Contract.pdf', 'Lease Agreement.pdf'].map((doc, idx) => (
                <button key={idx} className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
                  <FileText size={16} className="text-[#666] shrink-0" aria-hidden="true" />
                  <span className="truncate">{doc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <button
            aria-expanded={generationExpanded}
            className="w-full flex items-center justify-between text-[#999] hover:text-white cursor-pointer px-2 py-1 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none rounded-md"
            onClick={() => setGenerationExpanded(!generationExpanded)}
          >
            <span className="text-xs font-bold uppercase tracking-widest">Generation</span>
            {generationExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
          </button>
          {generationExpanded && (
            <div className="flex flex-col gap-1">
              {['NDA', 'Employment Agreement', 'Service Agreement'].map((doc, idx) => (
                <button key={idx} className="w-full text-left flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
                  <FileText size={16} className="text-[#666] shrink-0" aria-hidden="true" />
                  <span className="truncate">{doc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Settings */}
      <div className="p-4 border-t border-[#222]">
        <div className="flex flex-col gap-1">
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
            <Settings size={16} aria-hidden="true" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-2 px-2 py-2 text-sm text-[#999] hover:text-white hover:bg-[#111] rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
            <User size={16} aria-hidden="true" />
            <span>Profile</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
