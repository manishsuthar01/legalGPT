import React from 'react';
import { HelpCircle, ArrowRight } from 'lucide-react';

interface SuggestedPromptProps {
  text: string;
  onClick: () => void;
}

export const SuggestedPrompt: React.FC<SuggestedPromptProps> = ({ text, onClick }) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="flex items-center justify-between gap-2 px-3 py-2 bg-[#141A24] border border-[#1E2532] hover:border-[#2D3C54] hover:bg-[#1A2230] rounded-lg text-xs text-[#CBD5E1] hover:text-white transition-colors text-left outline-none cursor-pointer group"
    >
      <div className="flex items-center gap-2 min-w-0">
        <HelpCircle size={13} className="text-[#818CF8] shrink-0" aria-hidden="true" />
        <span className="truncate">{text}</span>
      </div>
      <ArrowRight size={11} className="text-[#64748B] group-hover:text-white transition-colors shrink-0" />
    </button>
  );
};

