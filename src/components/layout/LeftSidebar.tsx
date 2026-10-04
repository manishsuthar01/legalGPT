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
  Loader2
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
    if (!confirm('Are you sure you want to delete this contract and its analysis?')) return;
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
        className={`flex-1 overflow-y-auto py-4 sm:py-6 flex flex-col gap-5 ${isCollapsed ? 'px-2 items-center' : 'px-3 sm:px-4'}`} 
        aria-label="Main Navigation"
      >
        {/* New Analysis Button */}
        {isCollapsed ? (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            title="New Analysis"
            aria-label="New Analysis"
            className="w-11 h-11 flex items-center justify-center bg-[#7c5cfc] hover:bg-[#6a4beb] text-white rounded-xl shadow-lg shadow-[#7c5cfc]/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none"
          >
            <Plus size={20} aria-hidden="true" />
          </button>
        ) : (
          <button
            onClick={() => handleNavigate('/app/contracts/new', 'new')}
            className="w-full flex items-center justify-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4beb] text-white font-semibold py-2.5 sm:py-3 px-4 rounded-xl shadow-lg shadow-[#7c5cfc]/20 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none text-sm cursor-pointer"
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
              <span className="text-[10px] font-bold uppercase tracking-widest">Recent Contracts</span>
              {analysisExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
            </button>
          ) : (
            <div className="w-8 h-px bg-[#222] my-1" />
          )}

          {(!isCollapsed ? analysisExpanded : true) && (
            <div className="flex flex-col gap-1 w-full mt-1">
              {isLoading ? (
                // Loading Skeleton
                <div className="flex flex-col gap-2 p-1">
                  {[1, 2, 3].map((n) => (
                    <div 
                      key={n} 
                      className={`h-9 bg-[#141414] animate-pulse rounded-lg ${isCollapsed ? 'w-10' : 'w-full'}`} 
                    />
                  ))}
                </div>
              ) : contracts.length === 0 ? (
                // Empty state
                !isCollapsed && (
                  <div className="px-2 py-4 text-center">
                    <p className="text-xs text-[#555]">No contracts analyzed yet.</p>
                    <button
                      onClick={() => handleNavigate('/app/contracts/new', 'new')}
                      className="mt-2 text-xs text-[#7c5cfc] hover:underline cursor-pointer"
                    >
                      Upload your first contract
                    </button>
                  </div>
                )
              ) : (
                // Real Contracts List
                contracts.map((doc) => {
                  const isActive = activeContractId === doc.id;
                  const isDeleting = deletingId === doc.id;

                  return (
                    <div
                      key={doc.id}
                      onClick={() => handleNavigate(`/app/contracts/${doc.id}`, doc.id)}
                      title={doc.file_name}
                      className={`
                        group relative w-full flex items-center gap-2.5 text-sm rounded-lg cursor-pointer transition-all duration-150 focus-visible:ring-2 focus-visible:ring-[#7c5cfc] outline-none
                        ${isCollapsed ? 'justify-center p-2.5' : 'px-3 py-2.5'}
                        ${isActive 
                          ? 'bg-[#181822] text-white border border-[#7c5cfc]/40 font-medium' 
                          : 'text-[#999] hover:text-white hover:bg-[#141414] border border-transparent'
                        }
                      `}
                    >
                      <FileText 
                        size={16} 
                        className={`shrink-0 transition-colors ${isActive ? 'text-[#7c5cfc]' : 'text-[#666] group-hover:text-[#7c5cfc]/80'}`} 
                        aria-hidden="true" 
                      />

                      {!isCollapsed && (
                        <div className="flex-1 min-w-0 flex flex-col">
                          <span className="truncate text-xs sm:text-sm">{doc.file_name}</span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            {doc.status === 'processing' && (
                              <span className="text-[10px] text-amber-400/90 font-medium flex items-center gap-1">
                                <Loader2 size={10} className="animate-spin" /> Processing
                              </span>
                            )}
                            {doc.status === 'failed' && (
                              <span className="text-[10px] text-red-400 font-medium">
                                Failed
                              </span>
                            )}
                            {doc.status === 'completed' && doc.overall_risk && (
                              <span className={`text-[9px] uppercase px-1.5 py-0.2 rounded font-semibold tracking-wider ${
                                doc.overall_risk === 'HIGH' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                doc.overall_risk === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                'bg-green-500/10 text-green-400 border border-green-500/20'
                              }`}>
                                {doc.overall_risk} Risk
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Delete action button on hover (desktop expanded) */}
                      {!isCollapsed && (
                        <button
                          type="button"
                          onClick={(e) => handleDelete(e, doc.id)}
                          disabled={isDeleting}
                          title="Delete contract"
                          className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 text-[#555] rounded transition-opacity outline-none"
                        >
                          {isDeleting ? (
                            <Loader2 size={13} className="animate-spin" />
                          ) : (
                            <Trash2 size={13} />
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
