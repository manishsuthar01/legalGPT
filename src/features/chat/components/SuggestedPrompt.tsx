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
      className="flex items-center justify-between gap-2 px-3 py-2 bg-[#0F1218] border border-[#1E2533] hover:border-[#36455D] hover:bg-[#131822] rounded-md text-xs text-[#9DA8B9] hover:text-[#F1F4F8] transition-colors text-left focus-ring outline-none cursor-pointer group"
    >
      <div className="flex items-center gap-2 min-w-0">
        <HelpCircle size={13} className="text-[#4B72C2] shrink-0" aria-hidden="true" />
        <span className="truncate">{text}</span>
      </div>
      <ArrowRight size={11} className="text-[#636F83] group-hover:text-[#F1F4F8] transition-colors shrink-0" />
    </button>
  );
};
