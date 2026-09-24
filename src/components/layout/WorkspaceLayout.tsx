'use client';

import React, { useState } from 'react';
import { LeftSidebar } from './LeftSidebar';
import { TopHeader } from './TopHeader';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children, documentName, status }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(false);

  return (
    <div className="flex h-[100dvh] bg-[#050505] text-[#999] overflow-hidden relative selection:bg-[#7c5cfc]/30 selection:text-white">
      {/* Sidebar - off-canvas on mobile, expandable/collapsible rail on desktop */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-50 transform transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-black/80' : '-translate-x-full'} 
          md:relative md:translate-x-0
          ${isDesktopCollapsed ? 'md:w-[68px]' : 'md:w-[260px]'}
          w-[270px] sm:w-[280px] shrink-0
        `}
      >
        <LeftSidebar 
          isCollapsed={isDesktopCollapsed}
          onToggleCollapse={() => setIsDesktopCollapsed(prev => !prev)}
          onCloseMobile={() => setIsMobileMenuOpen(false)} 
        />
      </div>

      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content container */}
      <div className="flex-1 flex flex-col min-w-0 h-[100dvh] overflow-hidden">
        <TopHeader 
          documentName={documentName} 
          status={status} 
          onMenuToggle={() => setIsMobileMenuOpen(true)}
          isDesktopCollapsed={isDesktopCollapsed}
          onToggleDesktopCollapse={() => setIsDesktopCollapsed(prev => !prev)}
        />
        <main className="flex-1 overflow-hidden relative h-full min-h-0">
          {children}
        </main>
      </div>
    </div>
  );
};

