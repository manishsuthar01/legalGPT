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

  return (
    <div className="flex h-screen bg-[#050505] text-[#999] overflow-hidden relative">
      {/* Sidebar - hidden on mobile unless open, block on desktop */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <LeftSidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopHeader 
          documentName={documentName} 
          status={status} 
          onMenuToggle={() => setIsMobileMenuOpen(true)} 
        />
        <main className="flex-1 overflow-hidden relative h-full">
          {children}
        </main>
      </div>
    </div>
  );
};
