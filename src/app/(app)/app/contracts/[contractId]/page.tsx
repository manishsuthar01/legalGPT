'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { UploadDropzone } from '@/features/contracts/components/UploadDropzone';
import { AnalysisProgress } from '@/features/analysis/components/AnalysisProgress';
import { DocumentMetadata } from '@/features/contracts/components/DocumentMetadata';
import { ExecutiveSummary } from '@/features/analysis/components/ExecutiveSummary';
import { RiskList } from '@/features/analysis/components/RiskList';
import { ClauseViewer } from '@/features/contracts/components/ClauseViewer';
import { ChatPanel } from '@/features/chat/components/ChatPanel';
import useContractAnalysis from '@/features/contracts/hooks/useContractAnalysis';
import { FileText, MessageSquare } from 'lucide-react';

type UIState = 'empty' | 'analyzing' | 'complete';
type MobileTab = 'analysis' | 'chat';

export default function ContractWorkspacePage() {
  const params = useParams<{ contractId: string }>();
  const [contractId, setContractId] = useState<string>(() => {
    if (params?.contractId && params.contractId !== 'new' && params.contractId !== 'default-contract') {
      return params.contractId;
    }
    return '';
  });

  const {
    startAnalysis,
    isAnalysing,
    error,
    completedNodes,
    currentNode,
    analysisResult,
  } = useContractAnalysis();

  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTab>('analysis');

  // Resizable and toggleable chat layout state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [chatWidth, setChatWidth] = useState<number>(450);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Restore saved preferences from localStorage
  useEffect(() => {
    try {
      const savedWidth = localStorage.getItem('legalgpt_chat_width');
      if (savedWidth) {
        const parsed = parseInt(savedWidth, 10);
        if (!isNaN(parsed) && parsed >= 320 && parsed <= 800) {
          setChatWidth(parsed);
        }
      }
      const savedOpen = localStorage.getItem('legalgpt_chat_open');
      if (savedOpen !== null) {
        setIsChatOpen(savedOpen === 'true');
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('legalgpt_chat_open', String(next));
      } catch {}
      return next;
    });
  }, []);

  const handleSetChatWidth = useCallback((newWidth: number) => {
    setChatWidth(newWidth);
    try {
      localStorage.setItem('legalgpt_chat_width', String(newWidth));
    } catch {}
  }, []);

  // Keyboard shortcut (Cmd+K / Ctrl+K) to toggle chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleChat]);

  // Mouse drag handler for horizontal resizing
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const rawWidth = rect.right - e.clientX;
      const minWidth = 320;
      const maxWidth = Math.max(minWidth, Math.min(rect.width * 0.65, 800));
      const clampedWidth = Math.max(minWidth, Math.min(rawWidth, maxWidth));
      setChatWidth(clampedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      try {
        localStorage.setItem('legalgpt_chat_width', String(chatWidth));
      } catch {}
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, chatWidth]);

  const handleUpload = async (path: string, country: string) => {
    // Generate a fresh unique contract ID for every uploaded document
    const targetId = crypto.randomUUID();
    setContractId(targetId);

    // Update browser URL without reloading so the route reflects the active contract
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/app/contracts/${targetId}`);
    }

    await startAnalysis(path, country, targetId);
  };

  // UI state is purely driven by the analysis pipeline
  const uiState: UIState = analysisResult
    ? 'complete'
    : isAnalysing
    ? 'analyzing'
    : 'empty';

  return (
    <WorkspaceLayout
      documentName={analysisResult ? 'Contract Analysis' : 'Upload a Contract'}
      status={uiState}
    >
      {/* State 1: Empty */}
      {uiState === 'empty' && (
        <div className="h-full w-full flex items-center justify-center relative overflow-y-auto p-4 sm:p-6">
          <UploadDropzone onUpload={handleUpload} />
          {error && (
            <div className="absolute bottom-6 sm:bottom-12 bg-red-950/80 border border-red-500/30 text-red-300 text-xs sm:text-sm px-4 py-2 rounded-xl shadow-lg max-w-sm text-center">
              {error}
            </div>
          )}
          <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      )}

      {/* State 2: Analyzing */}
      {uiState === 'analyzing' && (
        <div className="h-full w-full flex items-center justify-center bg-[#050505] p-4 sm:p-6 overflow-y-auto">
          <AnalysisProgress completedNodes={completedNodes} currentNode={currentNode} />
        </div>
      )}

      {/* State 3: Analysis Complete */}
      {uiState === 'complete' && analysisResult && (
        <div className="h-full flex flex-col overflow-hidden relative">
          
          {/* Mobile & Tablet Segmented View Switcher (Hidden on desktop lg) */}
          <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-[#0c0c0c] border-b border-[#222] shrink-0 z-20">
            <div className="grid grid-cols-2 gap-1.5 w-full bg-[#141414] p-1 rounded-xl border border-[#222]">
              <button
                type="button"
                onClick={() => setMobileActiveTab('analysis')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7c5cfc] ${
                  mobileActiveTab === 'analysis'
                    ? 'bg-[#7c5cfc] text-white shadow-md shadow-[#7c5cfc]/20'
                    : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <FileText size={15} />
                <span>Document Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('chat')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#7c5cfc] ${
                  mobileActiveTab === 'chat'
                    ? 'bg-[#7c5cfc] text-white shadow-md shadow-[#7c5cfc]/20'
                    : 'text-[#888] hover:text-white hover:bg-[#1a1a1a]'
                }`}
              >
                <MessageSquare size={15} />
                <span>Ask LegalGPT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              </button>
            </div>
          </div>

          {/* Core Workspace Body */}
          <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 relative">
            
            {/* Left Column - Main Workspace (Expands to 100% when chat is collapsed) */}
            <div 
              className={`
                flex-1 flex flex-col h-full overflow-y-auto p-3.5 sm:p-6 lg:p-8 
                border-b lg:border-b-0 min-w-0 transition-all duration-150
                ${mobileActiveTab === 'analysis' ? 'flex' : 'hidden lg:flex'}
              `}
            >
              <DocumentMetadata 
                clauseCount={analysisResult.clauses?.length || 0}
                riskScore={analysisResult.riskScore}
              />

              <div className="flex-1 flex flex-col min-h-0 mt-2">
                <ExecutiveSummary 
                  summary={analysisResult.summary}
                  overallRisk={analysisResult.overallRisk}
                  riskScore={analysisResult.riskScore}
                  riskScoreBreakdown={analysisResult.riskScoreBreakdown}
                  positiveFindings={analysisResult.positiveFindings}
                  missingClauses={analysisResult.missingClauses}
                />

                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3 sm:mb-4 text-base sm:text-lg">Identified Risks</h3>
                  <RiskList risks={analysisResult.riskCards || []} />
                </div>

                <ClauseViewer 
                  advisorFeedback={analysisResult.advisorFeedback || []}
                  reviewerFeedback={analysisResult.reviewerFeedback || []}
                />
              </div>
            </div>

            {/* Desktop Resizable Divider Handle */}
            {isChatOpen && (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDoubleClick={() => handleSetChatWidth(450)}
                title="Drag to resize chat panel • Double-click to reset"
                className={`hidden lg:flex w-1.5 hover:w-2 hover:bg-[#7c5cfc] cursor-col-resize relative group transition-all duration-150 z-20 items-center justify-center shrink-0 border-l border-r border-[#1a1a24] ${
                  isDragging ? 'bg-[#7c5cfc] w-2' : 'bg-[#121218] hover:bg-[#7c5cfc]/60'
                }`}
              >
                <div className="w-0.5 h-8 rounded-full bg-[#444] group-hover:bg-white transition-colors" />
              </div>
            )}

            {/* Right Column - Chat Assistant */}
            <div 
              style={{ width: isChatOpen ? `${chatWidth}px` : undefined }}
              className={`
                h-full min-w-0 shrink-0 overflow-hidden relative transition-[width] duration-75
                ${isChatOpen ? 'lg:flex lg:flex-col' : 'hidden'}
                ${mobileActiveTab === 'chat' ? 'flex flex-col flex-1 w-full' : 'hidden lg:flex'}
              `}
            >
              <ChatPanel contractId={contractId} onClose={toggleChat} />
            </div>

            {/* Toggle Button when Chat is Collapsed (Desktop) */}
            {!isChatOpen && (
              <button
                type="button"
                onClick={toggleChat}
                title="Open Ask LegalGPT Chat (Cmd/Ctrl + K)"
                className="hidden lg:flex items-center gap-2 absolute top-4 right-4 z-20 bg-[#121218] border border-[#2a2a38] hover:border-[#7c5cfc] text-white px-3.5 py-2 rounded-xl text-xs font-semibold shadow-xl hover:shadow-[0_0_20px_rgba(124,92,252,0.3)] transition-all cursor-pointer group"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#7c5cfc] group-hover:scale-110 transition-transform" />
                <span>Ask LegalGPT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              </button>
            )}

            {/* Mobile Floating Action Button to quickly jump to Chat when reviewing analysis */}
            {mobileActiveTab === 'analysis' && (
              <button
                type="button"
                onClick={() => setMobileActiveTab('chat')}
                aria-label="Open Chat with LegalGPT"
                className="lg:hidden fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-[#7c5cfc] hover:bg-[#6a4beb] text-white px-4 py-3 rounded-full shadow-2xl shadow-[#7c5cfc]/50 font-semibold text-xs tracking-wide transition-transform active:scale-95 focus-visible:ring-2 focus-visible:ring-white outline-none"
              >
                <MessageSquare size={17} />
                <span>Ask AI</span>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              </button>
            )}

          </div>
        </div>
      )}
    </WorkspaceLayout>
  );
}
