'use client';

import React from 'react';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { UploadDropzone } from '@/features/contracts/components/UploadDropzone';
import { AnalysisProgress } from '@/features/analysis/components/AnalysisProgress';
import { DocumentMetadata } from '@/features/contracts/components/DocumentMetadata';
import { ExecutiveSummary } from '@/features/analysis/components/ExecutiveSummary';
import { RiskList } from '@/features/analysis/components/RiskList';
import { ClauseViewer } from '@/features/contracts/components/ClauseViewer';
import { ChatPanel } from '@/features/chat/components/ChatPanel';
import useContractAnalysis from '@/features/contracts/hooks/useContractAnalysis';

type UIState = 'empty' | 'analyzing' | 'complete';

export default function ContractWorkspacePage() {
  const {
    startAnalysis,
    isAnalysing,
    error,
    completedNodes,
    currentNode,
    analysisResult,
  } = useContractAnalysis();

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
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
          <UploadDropzone onUpload={handleUpload} />
          {error && (
            <div className="absolute bottom-12 bg-red-950/80 border border-red-500/30 text-red-300 text-sm px-4 py-2 rounded-xl shadow-lg">
              {error}
            </div>
          )}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none" />
        </div>
      )}

      {/* State 2: Analyzing */}
      {uiState === 'analyzing' && (
        <div className="h-full w-full flex items-center justify-center bg-[#050505]">
          <AnalysisProgress completedNodes={completedNodes} currentNode={currentNode} />
        </div>
      )}

      {/* State 3: Analysis Complete */}
      {uiState === 'complete' && analysisResult && (
        <div className="h-full flex flex-col lg:flex-row overflow-hidden overflow-y-auto lg:overflow-y-hidden">

          {/* Left Column - Main Workspace (65%) */}
          <div className="flex-none lg:flex-[65] flex flex-col h-auto lg:h-full p-4 lg:p-8 overflow-y-visible lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#222]">
            <DocumentMetadata 
              clauseCount={analysisResult.clauses?.length || 0}
              riskScore={analysisResult.riskScore}
            />

            <div className="flex-1 flex flex-col min-h-[400px] mt-2">
              <ExecutiveSummary 
                summary={analysisResult.summary}
                overallRisk={analysisResult.overallRisk}
                riskScore={analysisResult.riskScore}
                riskScoreBreakdown={analysisResult.riskScoreBreakdown}
                positiveFindings={analysisResult.positiveFindings}
                missingClauses={analysisResult.missingClauses}
              />

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4 text-lg">Identified Risks</h3>
                <RiskList risks={analysisResult.riskCards || []} />
              </div>

              <ClauseViewer 
                advisorFeedback={analysisResult.advisorFeedback || []}
                reviewerFeedback={analysisResult.reviewerFeedback || []}
              />
            </div>
          </div>

          {/* Right Column - Chat Assistant (35%) */}
          <div className="flex-none lg:flex-[35] h-[500px] lg:h-full min-w-0 lg:min-w-[320px]">
            <ChatPanel />
          </div>

        </div>
      )}
    </WorkspaceLayout>
  );
}
