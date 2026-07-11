import React from 'react';
import { Search, Download, Trash2, Clock } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

interface TopHeaderProps {
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
}

export const TopHeader: React.FC<TopHeaderProps> = ({ documentName, status }) => {
  return (
    <div className="h-[70px] w-full flex items-center justify-between px-8 bg-[#0a0a0a] border-b border-[#222]">
      <div className="flex items-center gap-4">
        <h1 className="text-white font-semibold text-lg">{status !== 'empty' ? documentName : 'New Analysis'}</h1>
        
        {status === 'complete' && (
          <StatusBadge level="high" label="High Risk" />
        )}
        {status === 'analyzing' && (
          <StatusBadge level="neutral" label="Analyzing" />
        )}

        {status === 'complete' && (
          <div className="flex items-center gap-1.5 text-xs text-[#666]">
            <Clock size={12} />
            <span>Analyzed just now</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-[#999] hover:text-white hover:bg-[#111] rounded-lg transition-colors border border-transparent hover:border-[#222]">
          <Search size={18} />
        </button>
        <button className="p-2 text-[#999] hover:text-white hover:bg-[#111] rounded-lg transition-colors border border-transparent hover:border-[#222]">
          <Download size={18} />
        </button>
        <button className="p-2 text-[#999] hover:text-[#ef4444] hover:bg-[#ef4444]/10 rounded-lg transition-colors border border-transparent hover:border-[#ef4444]/20">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
