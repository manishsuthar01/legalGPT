'use client';

import React from 'react';
import { Clock, Menu, PanelLeft } from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';

interface TopHeaderProps {
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
  onMenuToggle?: () => void;
  isDesktopCollapsed?: boolean;
  onToggleDesktopCollapse?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ 
  documentName, 
  status, 
  onMenuToggle,
  isDesktopCollapsed,
  onToggleDesktopCollapse
}) => {
  return (
    <header className="h-[60px] sm:h-[70px] w-full flex items-center justify-between px-3 sm:px-6 md:px-8 bg-[#0a0a0a] border-b border-[#222] shrink-0 z-30">
      <div className="flex items-center gap-2 sm:gap-4 overflow-hidden min-w-0">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="md:hidden p-2 -ml-1 text-[#999] hover:text-white hover:bg-[#161616] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
        >
          <Menu size={20} />
        </button>

        {/* Desktop Sidebar Toggle (Gemini style) */}
        {onToggleDesktopCollapse && (
          <button
            onClick={onToggleDesktopCollapse}
            aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex p-2 -ml-2 text-[#777] hover:text-white hover:bg-[#161616] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <PanelLeft size={18} />
          </button>
        )}

        {/* Document Title */}
        <h1 className="text-white font-semibold text-sm sm:text-base md:text-lg truncate max-w-[150px] xs:max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-lg">
          {status !== 'empty' ? documentName : 'New Analysis'}
        </h1>

        {/* Risk / Status Badge */}
        {status === 'complete' && (
          <div className="shrink-0 scale-90 sm:scale-100 origin-left">
            <StatusBadge level="high" label="High Risk" />
          </div>
        )}
        {status === 'analyzing' && (
          <div className="shrink-0 scale-90 sm:scale-100 origin-left">
            <StatusBadge level="neutral" label="Analyzing" />
          </div>
        )}

        {/* Timestamp */}
        {status === 'complete' && (
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#666] shrink-0">
            <Clock size={12} />
            <span>Analyzed just now</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Quick status pill for mobile header */}
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#777] bg-[#121212] border border-[#222] px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span className="hidden xs:inline">LegalAI Engine</span>
          <span className="xs:hidden">AI</span>
        </div>
      </div>
    </header>
  );
};

