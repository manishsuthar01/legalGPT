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
  Trash2,
  Loader2,
  FileCheck,
  ShieldAlert,
  Search,
  BookOpen
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { useUserContracts } from '@/features/contracts/hooks/useUserContracts';

interface LeftSidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
  activeContractId?: string;
  onSelectContract?: (contractId: string) => void;
}

export const LeftSidebar: React.FC<LeftSidebarProps> = ({ 
  isCollapsed = false, 
  onToggleCollapse, 
  onCloseMobile,
  activeContractId: propActiveContractId,
  onSelectContract
}) => {
  const [analysisExpanded, setAnalysisExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const params = useParams<{ contractId?: string }>();
  const activeContractId = propActiveContractId || params?.contractId;
  const { contracts, isLoading, deleteContract } = useUserContracts();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleNavigate = (path: string, contractId?: string) => {
    if (contractId && onSelectContract) {
      onSelectContract(contractId);
    }
    router.push(path);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleDelete = async (e: React.MouseEvent, contractId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this contract and its audit history?')) return;
    setDeletingId(contractId);
    await deleteContract(contractId);
    setDeletingId(null);
    if (activeContractId === contractId) {
      if (onSelectContract) {
        onSelectContract('new');
      }
      router.push('/app/contracts/new');
    }
  };

  const filteredContracts = contracts.filter((c) =>
    c.file_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside 
      className={`
        h-full flex flex-col bg-[#0B0E14] border-r border-[#1C222E] transition-all duration-200 select-none
        ${isCollapsed ? 'w-[64px]' : 'w-full'}
      `}
      aria-label="Contract Workspace Sidebar"
    >
      {/* Header / Logo Area */}
      <div 
        className={`h-[58px] flex items-center border-b border-[#1C222E] shrink-0 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}
      >
        <div
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="LegalGPT Home"
        >
          <div className="relative w-7 h-7 rounded-md bg-[#161B24] border border-[#263042] flex items-center justify-center p-1 transition-colors group-hover:border-[#3B547A]">
            <Image
              src="/logo/legalGPT_logo.png"
              alt="LegalGPT Logo"
              width={22}
              height={22}
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-[#F1F4F8] font-semibold text-sm tracking-tight">LegalGPT</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#C49B55] bg-[#C49B55]/10 px-1.5 py-0.2 rounded">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-[#636F83] font-mono leading-none">Contract Intelligence</span>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="md:hidden p-1.5 text-[#9DA8B9] hover:text-[#F1F4F8] hover:bg-[#161B23] rounded-md transition-colors focus-ring"
          >
            <X size={18} />
          </button>
        )}

        {/* Desktop Collapse Toggle */}
        {!isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar (Ctrl+[)"
            className="hidden md:flex p-1.5 text-[#636F83] hover:text-[#F1F4F8] hover:bg-[#161B23] rounded-md transition-colors focus-ring"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <nav 
        className={`flex-1 overflow-y-auto py-3.5 flex flex-col gap-4 ${
          isCollapsed ? 'px-2 items-center' : 'px-3'
        }`} 
        aria-label="Workspace Navigation"
      >
        {/* New Analysis Primary Button */}
        {isCollapsed ? (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            title="New Contract Analysis"
            aria-label="New Contract Analysis"
            className="w-10 h-10 flex items-center justify-center bg-[#2B5EA7] hover:bg-[#356FBF] text-white rounded-lg shadow-sm transition-colors focus-ring"
          >
            <Plus size={18} aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            className="w-full flex items-center justify-center gap-2 bg-[#2B5EA7] hover:bg-[#356FBF] text-white font-medium py-2 px-3 rounded-lg shadow-sm transition-colors focus-ring text-xs cursor-pointer"
          >
            <Plus size={16} aria-hidden="true" />
            <span>Audit New Agreement</span>
          </button>
        )}

        {/* Filter / Search input on desktop expanded */}
        {!isCollapsed && contracts.length > 3 && (
          <div className="relative w-full">
            <Search size={13} className="absolute left-2.5 top-2.5 text-[#636F83]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts..."
              aria-label="Search contracts"
              className="w-full bg-[#121620] border border-[#202736] focus:border-[#3B547A] text-[#F1F4F8] placeholder-[#636F83] text-xs rounded-md pl-8 pr-2.5 py-1.5 outline-none transition-colors"
            />
          </div>
        )}

        {/* Documents Group with Tree Structure */}
        <div className={`flex flex-col gap-1 w-full ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed ? (
            <div className="flex items-center justify-between px-2 py-1">
              <button
                aria-expanded={analysisExpanded}
                className="flex items-center gap-1.5 text-[#7E8B9F] hover:text-[#F1F4F8] cursor-pointer text-[10px] font-bold uppercase tracking-wider focus-ring rounded transition-colors"
                onClick={() => setAnalysisExpanded(!analysisExpanded)}
              >
                {analysisExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                <span>Active Agreements</span>
              </button>
              <span className="text-[10px] font-mono text-[#636F83] bg-[#161B23] px-1.5 py-0.2 rounded-full border border-[#222938]">
                {contracts.length}
              </span>
            </div>
          ) : (
            <div className="w-6 h-px bg-[#1C222E] my-1" />
          )}

          {(!isCollapsed ? analysisExpanded : true) && (
            <div className={`flex flex-col gap-1 w-full mt-0.5 ${!isCollapsed ? 'pl-1.5 border-l border-[#1C222E]' : ''}`}>
              {isLoading ? (
                // Loading Skeleton
                <div className="flex flex-col gap-1.5 p-1">
                  {[1, 2, 3].map((n) => (
                    <div 
                      key={n} 
                      className={`h-8 bg-[#141923] animate-pulse rounded-md ${isCollapsed ? 'w-10' : 'w-full'}`} 
                    />
                  ))}
                </div>
              ) : filteredContracts.length === 0 ? (
                // Empty state
                !isCollapsed && (
                  <div className="px-2 py-3 text-center">
                    <p className="text-xs text-[#636F83]">
                      {searchQuery ? 'No matching agreements.' : 'No agreements audited yet.'}
                    </p>
                    {!searchQuery && (
                      <button
                        onClick={() => handleNavigate('/app/contracts/new', 'new')}
                        className="mt-1 text-xs text-[#4B72C2] hover:underline cursor-pointer"
                      >
                        Upload your first contract
                      </button>
                    )}
                  </div>
                )
              ) : (
                // Real Contracts List with tree line connection
                filteredContracts.map((doc) => {
                  const isActive = activeContractId === doc.id;
                  const isDeleting = deletingId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleNavigate(`/app/contracts/${doc.id}`, doc.id)}
                      title={doc.file_name}
                      className={`
                        group relative w-full flex items-center gap-2 text-xs rounded-md cursor-pointer transition-colors focus-ring
                        ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-2'}
                        ${isActive 
                          ? 'bg-[#181E29] text-[#F1F4F8] border border-[#2E3B52] font-medium' 
                          : 'text-[#9DA8B9] hover:text-[#F1F4F8] hover:bg-[#121620] border border-transparent'
                        }
                      `}
                    >
                      <FileText 
                        size={15} 
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-[#4B72C2]' : 'text-[#636F83] group-hover:text-[#9DA8B9]'
                        }`} 
                        aria-hidden="true" 
                      />

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex flex-col">
                          <span className="truncate text-xs font-normal text-[#E2E6EC] group-hover:text-white">
                            {doc.file_name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {doc.status === 'processing' && (
                              <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                                <Loader2 size={9} className="animate-spin" /> auditing
                              </span>
                            )}
                            {doc.status === 'failed' && (
                              <span className="text-[10px] text-red-400 font-mono">
                                failed
                              </span>
                            )}
                            {doc.status === 'completed' && doc.overall_risk && (
                              <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold tracking-wider font-mono ${
                                doc.overall_risk === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                doc.overall_risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {doc.overall_risk} Risk
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Delete action button on hover */}
                      {!isCollapsed && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, doc.id)}
                          disabled={isDeleting}
                          title="Delete contract"
                          aria-label={`Delete ${doc.file_name}`}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-[#636F83] rounded transition-opacity outline-none"
                        >
                          {isDeleting ? (
                            <Loader2 size={12} className="animate-spin" />
                          ) : (
                            <Trash2 size={12} />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Quick Reference Links (Editorial Legal Tools) */}
        {!isCollapsed && (
          <div className="mt-auto flex flex-col gap-1 pt-2 border-t border-[#1C222E]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#636F83] px-2 mb-1">
              Legal Tools
            </span>
            <button 
              onClick={() => handleNavigate('/tools')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-[#9DA8B9] hover:text-[#F1F4F8] hover:bg-[#121620] transition-colors cursor-pointer text-left"
            >
              <FileCheck size={14} className="text-[#636F83]" />
              <span>Standard Clause Pre-screens</span>
            </button>
            <button 
              onClick={() => handleNavigate('/glossary')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-md text-xs text-[#9DA8B9] hover:text-[#F1F4F8] hover:bg-[#121620] transition-colors cursor-pointer text-left"
            >
              <BookOpen size={14} className="text-[#636F83]" />
              <span>Statutory Term Glossary</span>
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Area: Settings & Profile */}
      <div className={`border-t border-[#1C222E] bg-[#0A0C10] ${isCollapsed ? 'p-2 flex flex-col items-center' : 'p-3'}`}>
        <div className="flex flex-col gap-0.5 w-full">
          <button 
            title="Account & Security"
            className={`
              w-full flex items-center gap-2 text-xs text-[#7E8B9F] hover:text-[#F1F4F8] hover:bg-[#121620] rounded-md cursor-pointer transition-colors focus-ring
              ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5'}
            `}
          >
            <Settings size={15} aria-hidden="true" />
            {!isCollapsed && <span>Audit Settings</span>}
          </button>
          <button 
            title="User Profile"
            className={`
              w-full flex items-center gap-2 text-xs text-[#7E8B9F] hover:text-[#F1F4F8] hover:bg-[#121620] rounded-md cursor-pointer transition-colors focus-ring
              ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5'}
            `}
          >
            <User size={15} aria-hidden="true" />
            {!isCollapsed && <span>Legal Counsel Profile</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};
