import React from 'react';
import { LeftSidebar } from './LeftSidebar';
import { TopHeader } from './TopHeader';

interface WorkspaceLayoutProps {
  children: React.ReactNode;
  documentName: string;
  status: 'analyzing' | 'complete' | 'empty';
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({ children, documentName, status }) => {
  return (
    <div className="flex h-screen bg-[#050505] text-[#999] overflow-hidden">
      <LeftSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader documentName={documentName} status={status} />
        <main className="flex-1 overflow-hidden relative">
          {children}
        </main>
      </div>
    </div>
  );
};
