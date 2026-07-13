'use client';

import React, { useState } from 'react';
import { WorkspaceLayout } from '../../../../components/layout/WorkspaceLayout';
import { UploadDropzone } from '../../../../features/contracts/components/UploadDropzone';
import { AnalysisProgress } from '../../../../features/analysis/components/AnalysisProgress';
import { DocumentMetadata } from '../../../../features/contracts/components/DocumentMetadata';
import { ExecutiveSummary } from '../../../../features/analysis/components/ExecutiveSummary';
import { RiskList } from '../../../../features/analysis/components/RiskList';
import { ClauseViewer } from '../../../../features/contracts/components/ClauseViewer';
import { ChatPanel } from '../../../../features/chat/components/ChatPanel';
import { mockContractData } from '../../../../features/contracts/mock/contractData';

import useContractAnalysis from '@/features/contracts/hooks/useContractAnalysis';

type UIState = 'empty' | 'analyzing' | 'complete';

export default function ContractWorkspacePage({ params }: { params: { contractId: string } }) {
  const [uiState, setUiState] = useState<UIState>('empty');
  const { startAnalysis, isAnalysing, error } = useContractAnalysis()

  // Temporary function to simulate the flow
  const handleUpload = async (path: string) => {
    await startAnalysis(path);
    if (!error) {
      setUiState('analyzing');
    }
    if (!isAnalysing) {
      setUiState('complete');
    }
  };

  return (
    <WorkspaceLayout
      documentName={mockContractData.title}
      status={uiState}
    >
      {/* State 1: Empty */}
      {uiState === 'empty' && (
        <div className="h-full w-full flex items-center justify-center relative overflow-hidden">
          <UploadDropzone onUpload={handleUpload} />

          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c5cfc]/5 rounded-full blur-[100px] pointer-events-none"></div>
        </div>
      )}

      {/* State 2: Analyzing */}
      {uiState === 'analyzing' && (
        <div className="h-full w-full flex items-center justify-center bg-[#050505]">
          <AnalysisProgress />
        </div>
      )}

      {/* State 3: Analysis Complete */}
      {uiState === 'complete' && (
        <div className="h-full flex flex-col lg:flex-row overflow-hidden overflow-y-auto lg:overflow-y-hidden">

          {/* Left Column - Main Workspace (65%) */}
          <div className="flex-none lg:flex-[65] flex flex-col h-auto lg:h-full p-4 lg:p-8 overflow-y-visible lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#222]">
            <DocumentMetadata />

            <div className="flex-1 flex flex-col min-h-[400px] mt-2">
              <ExecutiveSummary />

              <div className="mb-6">
                <h3 className="text-white font-semibold mb-4 text-lg">Identified Risks</h3>
                <RiskList />
              </div>

              <ClauseViewer />
            </div>
          </div>

          {/* Right Column - Chat Assistant (35%) */}
          <div className="flex-none lg:flex-[35] h-[500px] lg:h-full min-w-0 lg:min-w-[320px]">
            <ChatPanel />
          </div>

        </div>
      )}

      {/* Dev Tool: State Toggle for Reviewing */}
      <div className="fixed bottom-4 left-4 lg:left-[280px] flex gap-2 bg-[#111] p-2 rounded-xl border border-[#222] z-50">
        <button onClick={() => setUiState('empty')} className={`px-3 py-1 text-xs rounded-lg ${uiState === 'empty' ? 'bg-[#7c5cfc] text-white' : 'text-[#999] hover:bg-[#222]'}`}>Empty</button>
        <button onClick={() => setUiState('analyzing')} className={`px-3 py-1 text-xs rounded-lg ${uiState === 'analyzing' ? 'bg-[#7c5cfc] text-white' : 'text-[#999] hover:bg-[#222]'}`}>Analyzing</button>
        <button onClick={() => setUiState('complete')} className={`px-3 py-1 text-xs rounded-lg ${uiState === 'complete' ? 'bg-[#7c5cfc] text-white' : 'text-[#999] hover:bg-[#222]'}`}>Complete</button>
      </div>
    </WorkspaceLayout>
  );
}
