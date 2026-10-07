'use client';

import React from 'react';
import { Menu, PanelLeft, FileText } from 'lucide-react';
import { StatusBadge, RiskLevel } from '../ui/StatusBadge';

interface TopHeaderProps {
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
  overallRisk?: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  onMenuToggle?: () => void;
  isDesktopCollapsed?: boolean;
  onToggleDesktopCollapse?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ 
  documentName, 
  status, 
  overallRisk, 
  onMenuToggle,
  isDesktopCollapsed,
  onToggleDesktopCollapse
}) => {
  const getRiskLevel = (risk?: string | null): RiskLevel => {
    switch (risk?.toUpperCase()) {
      case 'CRITICAL': return 'critical';
      case 'HIGH': return 'high';
      case 'MEDIUM': return 'medium';
      case 'LOW': return 'low';
      default: return 'neutral';
    }
  };

  return (
    <header className="h-[58px] w-full flex items-center justify-between px-4 sm:px-6 bg-[#0D1117] border-b border-[#1E2532] shrink-0 z-30 select-none">
      <div className="flex items-center gap-2 sm:gap-3.5 overflow-hidden min-w-0">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open workspace navigation"
          className="md:hidden p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#1E2532] rounded-md transition-colors"
        >
          <Menu size={18} />
        </button>

        {/* Desktop Sidebar Toggle */}
        {onToggleDesktopCollapse && (
          <button
            onClick={onToggleDesktopCollapse}
            aria-label={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex p-1.5 text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E2532] rounded-md transition-colors cursor-pointer"
          >
            <PanelLeft size={16} />
          </button>
        )}

        {/* Breadcrumb Context & Document Title */}
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <FileText size={15} className="text-[#818CF8] shrink-0 hidden xs:inline" />
          <h1 className="text-[#F1F5F9] font-medium text-xs sm:text-sm truncate max-w-[200px] xs:max-w-xs sm:max-w-md lg:max-w-lg">
            {status !== 'empty' ? documentName : 'New Contract'}
          </h1>
        </div>

        {/* Risk / Status Badge */}
        {status === 'complete' && overallRisk && (
          <div className="shrink-0 ml-1">
            <StatusBadge 
              level={getRiskLevel(overallRisk)} 
              label={`${overallRisk} Risk`} 
              size="sm"
            />
          </div>
        )}
        {status === 'analyzing' && (
          <div className="shrink-0 ml-1">
            <StatusBadge level="neutral" label="Analyzing" size="sm" />
          </div>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {status === 'complete' && (
          <span className="text-xs text-[#94A3B8] font-mono hidden sm:inline">
            Audit complete
          </span>
        )}
      </div>
    </header>
  );
};


