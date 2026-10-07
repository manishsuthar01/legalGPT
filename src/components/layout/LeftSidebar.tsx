'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  FileText, 
  ChevronDown, 
  ChevronRight, 
  Settings, 
  X, 
  PanelLeftClose,
  Trash2,
  Loader2,
  Search,
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
    if (!confirm('Are you sure you want to delete this contract?')) return;
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
        h-full flex flex-col bg-[#0D1117] border-r border-[#1E2532] transition-all duration-200 select-none
        ${isCollapsed ? 'w-[64px]' : 'w-full'}
      `}
      aria-label="Workspace Sidebar"
    >
      {/* Header / Logo Area */}
      <div 
        className={`h-[58px] flex items-center border-b border-[#1E2532] shrink-0 ${
          isCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        }`}
      >
        <div
          onClick={() => handleNavigate('/')}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="LegalGPT Home"
        >
          <div className="relative w-7 h-7 rounded-lg bg-[#583AFE]/15 border border-[#583AFE]/30 flex items-center justify-center p-1 transition-colors">
            <Image
              src="/logo/legalGPT_logo.png"
              alt="LegalGPT Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="text-[#F1F5F9] font-bold text-sm tracking-tight">
                legal<span className="text-[#583AFE]">gpt</span>
              </span>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            aria-label="Close navigation menu"
            className="md:hidden p-1.5 text-[#94A3B8] hover:text-white hover:bg-[#1E2532] rounded-md transition-colors"
          >
            <X size={18} />
          </button>
        )}

        {/* Desktop Collapse Toggle */}
        {!isCollapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
            className="hidden md:flex p-1.5 text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E2532] rounded-md transition-colors cursor-pointer"
          >
            <PanelLeftClose size={16} />
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <nav 
        className={`flex-1 overflow-y-auto py-3.5 flex flex-col gap-3 ${
          isCollapsed ? 'px-2 items-center' : 'px-3'
        }`} 
        aria-label="Workspace Navigation"
      >
        {/* New Contract Primary Button */}
        {isCollapsed ? (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            title="New Contract"
            aria-label="New Contract"
            className="w-10 h-10 flex items-center justify-center bg-[#583AFE] hover:bg-[#4E32E8] text-white rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Plus size={18} aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            className="w-full flex items-center justify-center gap-2 bg-[#583AFE] hover:bg-[#4E32E8] text-white font-medium py-2 px-3 rounded-lg shadow-sm transition-all cursor-pointer text-xs"
          >
            <Plus size={15} aria-hidden="true" />
            <span>New Contract</span>
          </button>
        )}

        {/* Filter / Search input on desktop expanded */}
        {!isCollapsed && contracts.length > 2 && (
          <div className="relative w-full">
            <Search size={13} className="absolute left-2.5 top-2.5 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts..."
              aria-label="Search contracts"
              className="w-full bg-[#141A24] border border-[#222B3B] focus:border-[#4B5E80] text-[#F1F5F9] placeholder-[#64748B] text-xs rounded-lg pl-8 pr-2.5 py-1.5 outline-none transition-colors"
            />
          </div>
        )}

        {/* Documents Group with Tree Structure */}
        <div className={`flex flex-col gap-1 w-full ${isCollapsed ? 'items-center' : ''}`}>
          {!isCollapsed ? (
            <div className="flex items-center justify-between px-2 py-1">
              <button
                aria-expanded={analysisExpanded}
                className="flex items-center gap-1.5 text-[#94A3B8] hover:text-[#F1F5F9] cursor-pointer text-xs font-semibold rounded transition-colors"
                onClick={() => setAnalysisExpanded(!analysisExpanded)}
              >
                {analysisExpanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                <span>Contracts</span>
              </button>
              <span className="text-[11px] font-mono text-[#64748B] bg-[#141A24] px-1.5 py-0.2 rounded-full border border-[#222B3B]">
                {contracts.length}
              </span>
            </div>
          ) : (
            <div className="w-6 h-px bg-[#1E2532] my-1" />
          )}

          {(!isCollapsed ? analysisExpanded : true) && (
            <div className="flex flex-col gap-1 w-full mt-0.5">
              {isLoading ? (
                // Loading Skeleton
                <div className="flex flex-col gap-1.5 p-1">
                  {[1, 2, 3].map((n) => (
                    <div 
                      key={n} 
                      className={`h-8 bg-[#141A24] animate-pulse rounded-md ${isCollapsed ? 'w-10' : 'w-full'}`} 
                    />
                  ))}
                </div>
              ) : filteredContracts.length === 0 ? (
                // Empty state
                !isCollapsed && (
                  <div className="px-2 py-3 text-center">
                    <p className="text-xs text-[#64748B]">
                      {searchQuery ? 'No matching contracts.' : 'No contracts uploaded.'}
                    </p>
                    {!searchQuery && (
                      <button
                        onClick={() => handleNavigate('/app/contracts/new', 'new')}
                        className="mt-1 text-xs text-[#818CF8] hover:underline cursor-pointer font-medium"
                      >
                        Upload your first contract
                      </button>
                    )}
                  </div>
                )
              ) : (
                // Real Contracts List
                filteredContracts.map((doc) => {
                  const isActive = activeContractId === doc.id;
                  const isDeleting = deletingId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleNavigate(`/app/contracts/${doc.id}`, doc.id)}
                      title={doc.file_name}
                      className={`
                        group relative w-full flex items-center gap-2 text-xs rounded-lg cursor-pointer transition-colors
                        ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-2'}
                        ${isActive 
                          ? 'bg-[#182232] text-white font-medium border border-[#2A3B54]' 
                          : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#141A24] border border-transparent'
                        }
                      `}
                    >
                      <FileText 
                        size={15} 
                        className={`shrink-0 transition-colors ${
                          isActive ? 'text-[#818CF8]' : 'text-[#64748B] group-hover:text-[#94A3B8]'
                        }`} 
                        aria-hidden="true" 
                      />

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex flex-col">
                          <span className="truncate text-xs text-[#E2E8F0]">
                            {doc.file_name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {doc.status === 'processing' && (
                              <span className="text-[10px] text-amber-400 flex items-center gap-1">
                                <Loader2 size={9} className="animate-spin" /> analyzing
                              </span>
                            )}
                            {doc.status === 'failed' && (
                              <span className="text-[10px] text-rose-400">
                                failed
                              </span>
                            )}
                            {doc.status === 'completed' && doc.overall_risk && (
                              <span className={`text-[10px] uppercase px-1.5 py-0.2 rounded font-medium ${
                                doc.overall_risk === 'HIGH' ? 'bg-rose-500/15 text-rose-300' :
                                doc.overall_risk === 'MEDIUM' ? 'bg-amber-500/15 text-amber-300' :
                                'bg-emerald-500/15 text-emerald-300'
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
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-400 text-[#64748B] rounded transition-opacity outline-none"
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
      </nav>

      {/* Bottom Area: Settings & Back to Marketing */}
      <div className={`border-t border-[#1E2532] bg-[#0A0D12] ${isCollapsed ? 'p-2 flex flex-col items-center' : 'p-3'}`}>
        <div className="flex flex-col gap-0.5 w-full">
          <button 
            onClick={() => handleNavigate('/')}
            title="Overview & Home"
            className={`
              w-full flex items-center gap-2 text-xs text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#141A24] rounded-md cursor-pointer transition-colors
              ${isCollapsed ? 'justify-center p-2' : 'px-2.5 py-1.5'}
            `}
          >
            <Settings size={15} aria-hidden="true" />
            {!isCollapsed && <span>Overview &amp; Home</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};


