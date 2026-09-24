'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Settings, 
  User, 
  X, 
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface LeftSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ 
  isCollapsed = false, 
  onToggleCollapse, 
  onCloseMobile 
}) => {
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside 
      className={`
        h-full flex flex-col bg-[#0a0a0a] border-r border-[#222] transition-all duration-300 select-none
        ${isCollapsed ? 'w-[68px]' : 'w-full'}
      `}
    >
      {/* Header / Logo Area */}
      <div className={`h-[60px] sm:h-[70px] flex items-center border-b border-[#222] shrink-0 ${isCollapsed ? 'justify-center px-2' : 'justify-between px-4 sm:px-6'}`}>
        <div
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="LegalGPT Home"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 flex-shrink-0 transition-transform group-hover:scale-105">
            <Image
              src="/logo/legalGPT_logo.png"
              alt="LegalGPT Logo"
              fill
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <span className="text-white font-bold text-base sm:text-lg tracking-tight">LegalGPT</span>
          )}
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="md:hidden p-1.5 text-[#999] hover:text-white hover:bg-[#161616] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <X size={20} />
          </button>
        )}

        {/* Desktop Collapse Toggle */}
        {!isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="hidden md:flex p-1.5 text-[#666] hover:text-white hover:bg-[#161616] rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <nav 
        className={`flex-1 overflow-y-auto py-4 sm:py-6 flex flex-col gap-5 ${isCollapsed ? 'px-2 items-center' : 'px-4'}`} 
        aria-label="Main Navigation"
      >
        {/* New Analysis Button */}
        {isCollapsed ? (
          <button
            onClick={() => handleNavigate('/app/contracts/new')}
            title="New Analysis"
            aria-label="New Analysis"
            className="w-11 h-11 flex items-center justify-center bg-[#7c5cfc] hover:bg-[#6a4beb] text-white rounded-xl shadow-lg shadow-[#7c5cfc]/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <Plus size={20} aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('/app/contracts/new')}
            className="w-full flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4beb] text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl shadow-lg shadow-[#7c5cfc]/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none text-sm"
          >
            <Plus size={18} aria-hidden="true" />
            <span>New Analysis</span>
          </button>
        )}

        {/* Documents Group */}
        <div className={`flex flex-col gap-1 w-full ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed ? (
            <button
              aria-expanded={analysisExpanded}
              className="w-full flex items-center justify-between text-[#777] hover:text-white cursor-pointer px-2 py-1 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none rounded-md transition-colors"
              onClick={() => setAnalysisExpanded(!analysisExpanded)}
            >
              <span className="text-[10px] font-bold uppercase tracking-widest">Recent Analysis</span>
              {analysisExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
            </button>
          ) : (
            <div className="w-8 h-px bg-[#222] my-1" />
          )}

          {(!isCollapsed ? analysisExpanded : true) && (
            <div className="flex flex-col gap-1 w-full">
              {[
                { name: 'NDA.pdf', path: '/app/contracts/1' },
                { name: 'Freelancer Agreement.pdf', path: '/app/contracts/2' },
                { name: 'Employment Contract.pdf', path: '/app/contracts/3' },
                { name: 'Lease Agreement.pdf', path: '/app/contracts/4' }
              ].map((doc, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleNavigate(doc.path)}
                  title={doc.name}
                  className={`
                    w-full text-left flex items-center gap-2.5 text-sm text-[#999] hover:text-white hover:bg-[#141414] rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none
                    ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
                  `}
                >
                  <FileText size={16} className="text-[#7c5cfc]/70 shrink-0" aria-hidden="true" />
                  {!isCollapsed && <span className="truncate text-xs sm:text-sm">{doc.name}</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Bottom Area */}
      <div className={`border-t border-[#222] ${isCollapsed ? 'p-2 flex flex-col items-center' : 'p-3 sm:p-4'}`}>
        <div className="flex flex-col gap-1 w-full">
          <button 
            title="Settings"
            className={`
              w-full flex items-center gap-2.5 text-sm text-[#888] hover:text-white hover:bg-[#141414] rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none
              ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
            `}
          >
            <Settings size={16} aria-hidden="true" />
            {!isCollapsed && <span className="text-xs sm:text-sm">Settings</span>}
          </button>
          <button 
            title="Profile"
            className={`
              w-full flex items-center gap-2.5 text-sm text-[#888] hover:text-white hover:bg-[#141414] rounded-lg cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none
              ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'}
            `}
          >
            <User size={16} aria-hidden="true" />
            {!isCollapsed && <span className="text-xs sm:text-sm">Profile</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

