'use client';

import React from 'react';
import { Menu, PanelLeft, FileText } from 'lucide-react';
import { StatusBadge, RiskLevel } from '../ui/StatusBadge';

interface TopHeaderProps {
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
  overallRisk?: 'LOW' | 'MEDIUM' | 'HIGH' | null;
  isLegalDocument?: boolean;
  documentType?: string;
  onMenuToggle?: () => void;
  isDesktopCollapsed?: boolean;
  onToggleDesktopCollapse?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({ 
  documentName, 
  status, 
  overallRisk,
  isLegalDocument = true,
  documentType,
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
          className="p-1.5 -ml-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E2532] rounded-md md:hidden transition-colors cursor-pointer"
        >
          <Menu size={18} />
        </button>

        {/* Desktop Sidebar Rail Collapse Toggle */}
        <button
          onClick={onToggleDesktopCollapse}
          aria-label={isDesktopCollapsed ? "Expand workspace navigation" : "Collapse workspace navigation"}
          title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden md:flex p-1.5 -ml-1 text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E2532] rounded-md transition-colors cursor-pointer"
        >
          <PanelLeft size={16} />
        </button>

        {/* Contract Title */}
        <div className="flex items-center gap-2 overflow-hidden min-w-0">
          <FileText size={15} className="text-[#818CF8] shrink-0 hidden xs:inline" />
          <h1 className="text-[#F1F5F9] font-medium text-xs sm:text-sm truncate max-w-[200px] xs:max-w-xs sm:max-w-md lg:max-w-lg">
            {status !== 'empty' ? documentName : 'New Contract'}
          </h1>
        </div>

        {/* Risk / Status Badge */}
        {status === 'complete' && (
          <div className="shrink-0 ml-1">
            {!isLegalDocument ? (
              <StatusBadge 
                level="neutral" 
                label={documentType || "Non-Legal Document"} 
                size="sm"
              />
            ) : overallRisk ? (
              <StatusBadge 
                level={getRiskLevel(overallRisk)} 
                label={`${overallRisk} Risk`} 
                size="sm"
              />
            ) : null}
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
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
            <span className="hidden sm:inline">Audit complete</span>
          </div>
        )}
      </div>
    </header>
  );
};
