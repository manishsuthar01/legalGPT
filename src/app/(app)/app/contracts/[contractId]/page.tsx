'use client';

import React, { useState } from 'react';
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
  const {
    startAnalysis,
    isAnalysing,
    error,
    completedNodes,
    currentNode,
    analysisResult,
  } = useContractAnalysis();

  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTab>('analysis');

  const handleUpload = async (path: string, country: string) => {
    await startAnalysis(path, country);
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
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 relative">
            
            {/* Left Column - Main Workspace (65% on Desktop, 100% on Mobile when active) */}
            <div 
              className={`
                flex-1 lg:flex-[65] flex flex-col h-full overflow-y-auto p-3.5 sm:p-6 lg:p-8 
                border-b lg:border-b-0 lg:border-r border-[#222]
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

            {/* Right Column - Chat Assistant (35% on Desktop, 100% on Mobile when active) */}
            <div 
              className={`
                flex-1 lg:flex-[35] h-full min-w-0 lg:min-w-[320px]
                ${mobileActiveTab === 'chat' ? 'flex flex-col' : 'hidden lg:flex lg:flex-col'}
              `}
            >
              <ChatPanel />
            </div>

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

