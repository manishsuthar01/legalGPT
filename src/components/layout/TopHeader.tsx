'use client';

import React from 'react';
import { Clock, Menu, PanelLeft, ShieldCheck, Scale, FileText } from 'lucide-react';
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
    <header className="h-[58px] w-full flex items-center justify-between px-3 sm:px-6 bg-[#0B0E14] border-b border-[#1C222E] shrink-0 z-30 select-none">
      <div className="flex items-center gap-2 sm:gap-3.5 overflow-hidden min-w-0">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onMenuToggle}
          aria-label="Open workspace navigation"
          className="md:hidden p-1.5 text-[#9DA8B9] hover:text-[#F1F4F8] hover:bg-[#161B23] rounded-md transition-colors focus-ring"
        >
          <Menu size={18} />
        </button>

        {/* Desktop Sidebar Toggle */}
        {onToggleDesktopCollapse && (
          <button
            onClick={onToggleDesktopCollapse}
            aria-label={isDesktopCollapsed ? "Expand sidebar (Ctrl+[)" : "Collapse sidebar (Ctrl+[)"}
            title={isDesktopCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex p-1.5 text-[#636F83] hover:text-[#F1F4F8] hover:bg-[#161B23] rounded-md transition-colors focus-ring"
          >
            <PanelLeft size={16} />
          </button>
        )}

        {/* Breadcrumb Context & Document Title */}
        <div className="flex items-center gap-1.5 overflow-hidden min-w-0">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#636F83] uppercase tracking-wider font-mono shrink-0">
            <Scale size={12} className="text-[#636F83]" />
            <span>Workspace</span>
            <span>/</span>
          </span>

          <div className="flex items-center gap-1.5 min-w-0">
            <FileText size={14} className="text-[#4B72C2] shrink-0 hidden xs:inline" />
            <h1 className="text-[#F1F4F8] font-medium text-xs sm:text-sm truncate max-w-[160px] xs:max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-lg">
              {status !== 'empty' ? documentName : 'New Contract Intake'}
            </h1>
          </div>
        </div>

        {/* Risk / Status Badge */}
        {status === 'complete' && overallRisk && (
          <div className="shrink-0">
            <StatusBadge 
              level={getRiskLevel(overallRisk)} 
              label={`${overallRisk} Risk`} 
              size="sm"
            />
          </div>
        )}
        {status === 'analyzing' && (
          <div className="shrink-0">
            <StatusBadge level="neutral" label="Audit In Progress" size="sm" />
          </div>
        )}

        {/* Timestamp / Freshness */}
        {status === 'complete' && (
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] text-[#636F83] font-mono shrink-0">
            <Clock size={11} />
            <span>Audit Complete</span>
          </div>
        )}
      </div>

      {/* Header Right Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Security & Statutory Model Badge */}
        <div className="flex items-center gap-1.5 text-[10px] text-[#9DA8B9] bg-[#121620] border border-[#202736] px-2.5 py-1 rounded-full font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
          <span className="hidden sm:inline">Statutory Engine: Active</span>
          <span className="sm:hidden">Engine</span>
        </div>
      </div>
    </header>
  );
};
