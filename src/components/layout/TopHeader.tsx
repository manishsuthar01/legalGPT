import React from 'react';
import { Search, Download, Trash2, Clock, Menu } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

interface TopHeaderProps {
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
  onMenuToggle?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ documentName, status, onMenuToggle }) => {
  return (
    <header className="h-[70px] w-full flex items-center justify-between px-4 md:px-8 bg-[#0a0a0a] border-b border-[#222] shrink-0">
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        <button 
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="md:hidden p-2 -ml-2 text-[#999] hover:text-white hover:bg-[#111] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-white font-semibold text-base md:text-lg truncate">{status !== 'empty' ? documentName : 'New Analysis'}</h1>
        
        {status === 'complete' && (
          <div className="hidden sm:block shrink-0">
            <StatusBadge level="high" label="High Risk" />
          </div>
        )}
        {status === 'analyzing' && (
          <div className="hidden sm:block shrink-0">
            <StatusBadge level="neutral" label="Analyzing" />
          </div>
        )}

        {status === 'complete' && (
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#666] shrink-0">
            <Clock size={12} />
            <span>Analyzed just now</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 md:gap-3 shrink-0">
        <button aria-label="Search document" className="p-2 text-[#999] hover:text-white hover:bg-[#111] rounded-lg transition-colors border border-transparent hover:border-[#222] focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
          <Search size={18} />
        </button>
        <button aria-label="Download analysis" className="hidden sm:block p-2 text-[#999] hover:text-white hover:bg-[#111] rounded-lg transition-colors border border-transparent hover:border-[#222] focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
          <Download size={18} />
        </button>
        <button aria-label="Delete document" className="p-2 text-[#999] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors border border-transparent hover:border-[#ef4444]/20 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none">
          <Trash2 size={18} />
        </button>
      </div>
    </header>
  );
};
