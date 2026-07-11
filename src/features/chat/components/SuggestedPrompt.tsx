import React from 'react';
import { Sparkles } from 'lucide-react';

interface SuggestedPromptProps {
  text: string;
  onClick: () => void;
}

export const SuggestedPrompt: React.FC<SuggestedPromptProps> = ({ text, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-[#111] border border-[#222] hover:border-[#7c5cfc]/50 hover:bg-[#7c5cfc]/5 rounded-xl text-xs text-[#999] hover:text-[#ccc] transition-all duration-300 text-left"
    >
      <Sparkles size={14} className="text-[#7c5cfc]" />
      <span className="truncate">{text}</span>
    </button>
  );
};
