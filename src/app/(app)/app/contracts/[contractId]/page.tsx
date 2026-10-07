'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { WorkspaceLayout } from '@/components/layout/WorkspaceLayout';
import { UploadDropzone } from '@/features/contracts/components/UploadDropzone';
import { AnalysisProgress } from '@/features/analysis/components/AnalysisProgress';
import { DocumentMetadata } from '@/features/contracts/components/DocumentMetadata';
import { ExecutiveSummary } from '@/features/analysis/components/ExecutiveSummary';
import { RiskList } from '@/features/analysis/components/RiskList';
import { ClauseViewer } from '@/features/contracts/components/ClauseViewer';
import { ChatPanel } from '@/features/chat/components/ChatPanel';
import useContractAnalysis from '@/features/contracts/hooks/useContractAnalysis';
import { FileText, MessageSquare, Loader2, Scale } from 'lucide-react';
import { AnalysisResult } from '@/ai/types/analysis';

type UIState = 'empty' | 'analyzing' | 'complete';
type MobileTab = 'analysis' | 'chat';

const SAMPLE_ANALYSIS_DATA: AnalysisResult = {
  summary: "This Master Services Agreement & Mutual NDA governs bilateral proprietary evaluations. While mutual confidentiality covenants are structured reasonably, the agreement contains severe liability exposure in Section 8 (Uncapped Consequential Indemnity), Section 3 (Perpetual Non-Disclosure Obligation), and Section 12 (Unilateral Fee Shifting). Recommended curative redlines must be inserted prior to signing.",
  overallRisk: 'HIGH',
  riskScore: 78,
  riskScoreBreakdown: {
    contractQuality: 68,
    clauseRisk: 82,
    jurisdictionCompliance: 74,
  },
  riskCards: [
    {
      id: 'risk-1',
      severity: 'critical',
      clauseTitle: 'Section 8.2 • Uncapped Consequential Indemnity',
      explanation: 'The indemnity clause lacks any monetary liability cap, creating open-ended financial exposure for indirect disclosures or third-party claims.',
      suggestedFix: 'Insert an aggregate monetary liability cap tied to fees paid or $100,000, and explicitly exclude consequential, punitive, and incidental damages.',
      likelihood: 4,
      impact: 5,
      whyItMatters: 'Uncapped indemnities expose corporate assets to catastrophic uninsured liability beyond ordinary commercial bounds.',
    },
    {
      id: 'risk-2',
      severity: 'high',
      clauseTitle: 'Section 3.1 • Perpetual Non-Disclosure Term',
      explanation: 'Confidentiality obligations are specified to survive indefinitely without expiration, rather than terminating after standard 2-to-3-year commercial windows.',
      suggestedFix: 'Limit standard business confidentiality obligations to 36 months following termination, reserving perpetual protection strictly for proven trade secrets.',
      likelihood: 5,
      impact: 4,
      whyItMatters: 'Indefinite obligations create permanent enterprise compliance burdens and risk unenforceability under trade secret common law.',
    },
    {
      id: 'risk-3',
      severity: 'medium',
      clauseTitle: 'Section 12.4 • Unilateral Attorneys Fees',
      explanation: 'Prevailing party attorney fee shifting is written asymmetrically, permitting only the disclosing party to recover legal defense costs in litigation.',
      suggestedFix: 'Draft as a bilateral fee-shifting provision where the prevailing party in any enforcement proceeding recovers reasonable counsel costs.',
      likelihood: 3,
      impact: 3,
      whyItMatters: 'One-sided fee clauses incentivize aggressive litigious posturing while depriving your team of reciprocal recovery rights.',
    },
  ],
  advisorFeedback: [
    {
      clauseId: 1,
      clauseTitle: 'Section 8.2 • Indemnification',
      risk: 'CRITICAL',
      likelihood: 4,
      impact: 5,
      whyItMatters: 'Exposes party to catastrophic uncapped indemnification for third-party subcontractor claims.',
      suggestedFix: 'Add liability cap of 12 months fees and mutualize indemnification scope.',
      replacementLanguage: "Each party's maximum aggregate liability arising out of or related to this Agreement, whether in contract, tort, or under any statutory indemnification theory, shall not exceed One Hundred Thousand Dollars ($100,000). In no event shall either party be liable for any indirect, incidental, punitive, or consequential damages.",
      rationale: 'Establishes standard commercial limitation of liability consistent with ABA Model Contract Guidelines.',
      priority: 'CRITICAL',
    },
    {
      clauseId: 2,
      clauseTitle: 'Section 3.1 • Term & Survival',
      risk: 'HIGH',
      likelihood: 5,
      impact: 4,
      whyItMatters: 'Perpetual confidentiality without trade secret carve-outs triggers excessive audit exposure.',
      suggestedFix: 'Limit confidentiality term to three (3) years post-termination.',
      replacementLanguage: 'The obligations of non-disclosure and non-use set forth herein shall commence on the Effective Date and terminate exactly three (3) years following the termination or expiration of this Agreement; provided, however, that with respect to Information qualifying as a Trade Secret under the Uniform Trade Secrets Act, such obligations shall survive until such information no longer qualifies as a trade secret under applicable law.',
      rationale: 'Brings duration into alignment with Delaware Chancery Court enforceability baselines.',
      priority: 'HIGH',
    },
    {
      clauseId: 3,
      clauseTitle: 'Section 12.4 • Dispute Resolution & Fees',
      risk: 'MEDIUM',
      likelihood: 3,
      impact: 3,
      whyItMatters: 'Asymmetrical fee recovery creates an unlevel litigation playing field.',
      suggestedFix: 'Make fee shifting mutual for the prevailing party.',
      replacementLanguage: 'In the event of any arbitration, suit, or proceeding brought to enforce the terms of this Agreement, the prevailing party shall be entitled to recover from the non-prevailing party all reasonable attorneys fees, costs, and necessary disbursements incurred in connection therewith.',
      rationale: 'Neutralizes unilateral litigation leverage.',
      priority: 'MEDIUM',
    },
  ],
  reviewerFeedback: [
    {
      clauseId: 1,
      clauseText: 'Recipient shall defend, indemnify, and hold harmless Discloser and its officers, directors, and affiliates from and against any and all claims, damages, liabilities, losses, costs, and expenses (including attorneys fees) arising out of or resulting from any unauthorized use or disclosure of Confidential Information by Recipient, without monetary limitation.',
      researchTopic: 'Uncapped Consequential Indemnity',
      strictReview: {
        risk: 'CRITICAL',
        summary: 'Clause creates open-ended, uncapped strict indemnification liability for any disclosure, including inadvertent employee breaches.',
        observations: [
          'No aggregate cap on liability or fee multiplier.',
          'Failure to exclude indirect, consequential, or punitive damages.',
          'Missing prompt notice requirements and control of defense carve-outs.'
        ],
        evidence: [
          'UCC § 2-719 allows contractual limitation of remedy unless unconscionable.',
          'Restatement (Second) of Contracts § 351 on foreseeability of damages.'
        ],
        applicableLaw: ['Del. Code Ann. tit. 6 § 2-719', 'Restatement (Second) Contracts § 351'],
        internalReasoning: 'Uncapped indemnification in an NDA is highly non-standard and represents extreme asymmetry.'
      }
    },
    {
      clauseId: 2,
      clauseText: 'The confidentiality obligations herein shall remain in full force and effect in perpetuity following the disclosure of Confidential Information or the termination of business discussions between the parties.',
      researchTopic: 'Perpetual Confidentiality Term',
      strictReview: {
        risk: 'HIGH',
        summary: 'Perpetual duration for standard commercial information is disfavored under common law and creates permanent enterprise compliance risk.',
        observations: [
          'Lacks standard 2 to 3 year sunset clause.',
          'Fails to distinguish general business confidential information from statutory trade secrets.'
        ],
        evidence: [
          'Delaware Uniform Trade Secrets Act (DUTSA) 6 Del. C. § 2001.',
          'Silicon Image, Inc. v. Analogix Semiconductor, Inc. regarding overbroad duration.'
        ],
        applicableLaw: ['6 Del. C. § 2001', 'DUTSA'],
        internalReasoning: 'Courts will frequently strike down perpetual NDAs as unreasonable restraints on trade unless limited to statutory trade secrets.'
      }
    },
    {
      clauseId: 3,
      clauseText: 'In the event Discloser initiates legal action to enforce any provision hereof, Recipient shall reimburse Discloser for all legal fees, costs, and investigative expenses incurred.',
      researchTopic: 'Unilateral Attorney Fee Shifting',
      strictReview: {
        risk: 'MEDIUM',
        summary: 'Unilateral attorney fee provision allows Discloser to litigate without cost risk while burdening Recipient.',
        observations: [
          'Reimbursement is triggered upon initiation rather than judgment.',
          'No reciprocal fee protection for Recipient if Discloser files an unfounded suit.'
        ],
        evidence: [
          'Delaware default American Rule requires express bilateral agreement for fee shifting.'
        ],
        applicableLaw: ['Delaware American Rule Exception Doctrine'],
        internalReasoning: 'Unilateral fee shifting clauses create moral hazard and should always be negotiated to mutual prevailing-party terms.'
      }
    }
  ],
  clauses: [
    { text: 'Clause 1: Confidentiality definition and exclusions.', source: 'Section 1', chunk_index: 0 },
    { text: 'Clause 2: Obligations of non-disclosure.', source: 'Section 2', chunk_index: 1 },
    { text: 'Clause 3: Perpetual duration.', source: 'Section 3', chunk_index: 2 },
  ],
  positiveFindings: [
    {
      clauseTitle: 'Section 2.3 • Standard Permitted Disclosures',
      explanation: 'Includes standard safe harbor for legal process, court orders, and regulatory subpoena disclosures with prior notice obligations.',
    },
    {
      clauseTitle: 'Section 5.1 • Mutual Non-Solicitation Carve-out',
      explanation: 'Explicitly excludes general job advertisements and non-targeted recruiting from solicitation restrictions.',
    },
  ],
  missingClauses: [
    {
      title: 'Residual Knowledge Carve-Out (Unaided Memory)',
      explanation: 'Agreement lacks standard protection permitting engineers and consultants to retain generalized concepts, ideas, and techniques retained in unaided memory.',
      severity: 'high',
      suggestedLanguage: 'Notwithstanding anything to the contrary, neither party shall be restricted in the use of general concepts, techniques, or know-how retained in the unaided memory of personnel who have had authorized access to Confidential Information, provided such personnel do not intentionally memorize such information.',
    },
    {
      title: 'Injunctive Relief Balance & Bond Requirement',
      explanation: 'Discloser is granted unilateral immediate injunctive relief without the obligation to post bond or demonstrate irreparable financial harm.',
      severity: 'medium',
      suggestedLanguage: 'In the event of a breach or threatened breach, the non-breaching party shall be entitled to seek injunctive relief from a court of competent jurisdiction upon demonstrating irreparable harm and posting a reasonable bond.',
    },
  ]
};

export default function ContractWorkspacePage() {
  const router = useRouter();
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
    resetAnalysis,
    setAnalysisResult,
  } = useContractAnalysis();

  const [documentName, setDocumentName] = useState<string>('Upload a Contract');
  const [isLoadingExisting, setIsLoadingExisting] = useState<boolean>(false);
  const [mobileActiveTab, setMobileActiveTab] = useState<MobileTab>('analysis');
  const [loadError, setLoadError] = useState<string | null>(null);

  // Dedicated function to load any contract by ID
  const loadContract = useCallback(async (targetId: string) => {
    if (!targetId || targetId === 'new' || targetId === 'default-contract') {
      setContractId('');
      setDocumentName('Upload a Contract');
      setLoadError(null);
      resetAnalysis();
      return;
    }

    // Interactive Demo / Sample contract mode fallback
    if (targetId === 'mock-id' || targetId === 'sample-contract') {
      setContractId(targetId);
      setDocumentName('Commercial_Services_Agreement_v2.pdf');
      setLoadError(null);
      setAnalysisResult(SAMPLE_ANALYSIS_DATA);
      setIsLoadingExisting(false);
      return;
    }

    try {
      setIsLoadingExisting(true);
      setLoadError(null);
      setContractId(targetId);
      setAnalysisResult(null);

      const res = await fetch(`/api/contracts/${targetId}`);
      if (!res.ok) {
        throw new Error('Contract not found or unavailable');
      }
      const json = await res.json();
      if (json.success && json.data) {
        const { contract, analysisResult: report } = json.data;
        if (contract?.file_name) {
          setDocumentName(contract.file_name);
        }
        if (report) {
          setAnalysisResult(report);
        } else if (contract?.status === 'failed') {
          setLoadError('Analysis failed for this contract. You may re-upload or analyze again.');
        } else if (contract?.status === 'processing' || contract?.status === 'pending') {
          setLoadError('Analysis is currently processing for this contract.');
        }
      }
    } catch (err) {
      console.warn('Could not fetch existing contract, falling back to sample if mock-id:', err);
      // Fallback to sample analysis if mock-id was requested
      if (targetId === 'mock-id') {
        setDocumentName('Commercial_Services_Agreement_v2.pdf');
        setAnalysisResult(SAMPLE_ANALYSIS_DATA);
      } else {
        setLoadError('Failed to load contract details. Please try again.');
      }
    } finally {
      setIsLoadingExisting(false);
    }
  }, [resetAnalysis, setAnalysisResult]);

  const handleSelectContract = useCallback((targetId: string) => {
    if (!targetId || targetId === 'new') {
      setContractId('');
      setDocumentName('Upload a Contract');
      setLoadError(null);
      resetAnalysis();
      router.push('/app/contracts/new');
      return;
    }

    if (contractId === targetId && analysisResult && !isAnalysing) {
      router.push(`/app/contracts/${targetId}`);
      return;
    }

    loadContract(targetId);
    router.push(`/app/contracts/${targetId}`);
  }, [contractId, analysisResult, isAnalysing, resetAnalysis, router, loadContract]);

  useEffect(() => {
    const rawId = params?.contractId;
    if (!rawId || rawId === 'new' || rawId === 'default-contract') {
      if (isAnalysing || contractId) {
        return;
      }
      setContractId('');
      setDocumentName('Upload a Contract');
      setLoadError(null);
      resetAnalysis();
      return;
    }

    if (isAnalysing && contractId === rawId) {
      return;
    }

    if (contractId === rawId && analysisResult) {
      return;
    }

    loadContract(rawId);
  }, [params?.contractId, isAnalysing, contractId, analysisResult, loadContract, resetAnalysis]);

  // Resizable and toggleable chat layout state
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);
  const [chatWidth, setChatWidth] = useState<number>(440);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleUpload = async (path: string, country: string, fileName?: string) => {
    const targetId = crypto.randomUUID();
    setContractId(targetId);
    setLoadError(null);
    if (fileName) {
      setDocumentName(fileName);
    }

    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/app/contracts/${targetId}`);
    }

    await startAnalysis(path, country, targetId, fileName);
    router.replace(`/app/contracts/${targetId}`, { scroll: false });
  };

  const uiState: UIState = analysisResult
    ? 'complete'
    : isAnalysing || isLoadingExisting
    ? 'analyzing'
    : 'empty';

  return (
    <WorkspaceLayout
      documentName={documentName}
      status={uiState}
      overallRisk={analysisResult?.overallRisk || null}
      activeContractId={contractId || params?.contractId}
      onSelectContract={handleSelectContract}
    >
      {/* State 1: Empty Intake */}
      {uiState === 'empty' && (
        <div className="h-full w-full flex items-center justify-center relative overflow-y-auto p-4 sm:p-6 bg-[#0A0D12]">
          <UploadDropzone onUpload={handleUpload} />
          {(error || loadError) && (
            <div className="absolute bottom-6 sm:bottom-10 bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg max-w-sm text-center">
              {error || loadError}
            </div>
          )}
        </div>
      )}

      {/* State 2: Analyzing or Loading Existing */}
      {uiState === 'analyzing' && (
        <div className="h-full w-full flex items-center justify-center bg-[#0A0D12] p-4 sm:p-6 overflow-y-auto">
          {isLoadingExisting ? (
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div className="w-12 h-12 rounded-xl bg-[#141A24] border border-[#1E2532] flex items-center justify-center shadow-xs">
                <Loader2 className="w-6 h-6 text-[#818CF8] animate-spin" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <h2 className="text-[#F1F5F9] font-medium text-sm sm:text-base">Loading Contract</h2>
                <p className="text-[#94A3B8] text-xs max-w-sm px-4">
                  Fetching clauses and previous analysis report...
                </p>
              </div>
            </div>
          ) : (
            <AnalysisProgress 
              documentName={documentName} 
              completedNodes={completedNodes} 
              currentNode={currentNode} 
            />
          )}
        </div>
      )}

      {/* State 3: Analysis Complete */}
      {uiState === 'complete' && analysisResult && (
        <div className="h-full flex flex-col overflow-hidden relative bg-[#0A0D12]">
          
          {/* Mobile & Tablet Segmented View Switcher */}
          <div className="lg:hidden flex items-center justify-between px-3 py-2 bg-[#0D1117] border-b border-[#1E2532] shrink-0 z-20">
            <div className="grid grid-cols-2 gap-1 w-full bg-[#141A24] p-1 rounded-xl border border-[#1E2532]">
              <button
                type="button"
                onClick={() => setMobileActiveTab('analysis')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors outline-none cursor-pointer ${
                  mobileActiveTab === 'analysis'
                    ? 'bg-[#1E2533] text-white border border-[#2D3C54] shadow-xs'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <FileText size={14} />
                <span>Document Analysis</span>
              </button>

              <button
                type="button"
                onClick={() => setMobileActiveTab('chat')}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium transition-colors outline-none cursor-pointer ${
                  mobileActiveTab === 'chat'
                    ? 'bg-[#1E2533] text-white border border-[#2D3C54] shadow-xs'
                    : 'text-[#94A3B8] hover:text-[#F1F5F9]'
                }`}
              >
                <MessageSquare size={14} />
                <span>Ask Assistant</span>
              </button>
            </div>
          </div>

          {/* Core Workspace Body */}
          <div ref={containerRef} className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 relative">
            
            {/* Left Column - Main Legal Workspace (Expands when chat is collapsed) */}
            <div 
              className={`
                flex-1 flex flex-col h-full overflow-y-auto p-3.5 sm:p-5 lg:p-6 
                border-b lg:border-b-0 min-w-0 transition-all duration-150
                ${mobileActiveTab === 'analysis' ? 'flex' : 'hidden lg:flex'}
              `}
            >
              <DocumentMetadata 
                clauseCount={analysisResult.clauses?.length || analysisResult.riskCards?.length || 0}
                riskScore={analysisResult.riskScore}
              />

              <div className="flex-1 flex flex-col min-h-0 mt-1">
                <ExecutiveSummary 
                  summary={analysisResult.summary}
                  overallRisk={analysisResult.overallRisk}
                  riskScore={analysisResult.riskScore}
                  riskScoreBreakdown={analysisResult.riskScoreBreakdown}
                  positiveFindings={analysisResult.positiveFindings}
                  missingClauses={analysisResult.missingClauses}
                />

                <div className="mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[#F1F5F9] font-semibold text-xs sm:text-sm">
                      Identified Risk Areas
                    </h3>
                    <span className="text-xs text-[#94A3B8]">
                      {analysisResult.riskCards?.length || 0} flagged
                    </span>
                  </div>
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
                onDoubleClick={() => handleSetChatWidth(440)}
                title="Drag to resize assistant • Double-click to reset"
                className={`hidden lg:flex w-1.5 hover:w-2 hover:bg-[#583AFE] cursor-col-resize relative group transition-all duration-150 z-20 items-center justify-center shrink-0 border-l border-r border-[#1E2532] ${
                  isDragging ? 'bg-[#583AFE] w-2' : 'bg-[#0D1117] hover:bg-[#583AFE]/50'
                }`}
              >
                <div className="w-0.5 h-6 rounded-full bg-[#2E3B50] group-hover:bg-white transition-colors" />
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
              <ChatPanel 
                contractId={contractId} 
                documentName={documentName}
                onClose={toggleChat} 
              />
            </div>

            {/* Toggle Button when Chat is Collapsed on Desktop */}
            {!isChatOpen && (
              <button
                type="button"
                onClick={toggleChat}
                title="Open Assistant"
                className="hidden lg:flex items-center gap-2 absolute top-4 right-5 z-20 bg-[#141A24] border border-[#1E2532] hover:border-[#818CF8] text-[#F1F5F9] px-3 py-1.5 rounded-lg text-xs font-medium shadow-sm transition-colors cursor-pointer group"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#818CF8]" />
                <span>Ask Assistant</span>
                <span className="text-[10px] text-[#64748B] font-mono ml-1">Ctrl+K</span>
              </button>
            )}

            {/* Mobile Floating Action Button to quickly jump to Chat */}
            {mobileActiveTab === 'analysis' && (
              <button
                type="button"
                onClick={() => setMobileActiveTab('chat')}
                aria-label="Open Contract Assistant"
                className="lg:hidden fixed bottom-5 right-5 z-30 flex items-center gap-2 bg-[#583AFE] hover:bg-[#4E32E8] text-white px-4 py-2.5 rounded-full shadow-lg font-medium text-xs tracking-wide transition-transform active:scale-95"
              >
                <MessageSquare size={15} />
                <span>Ask AI</span>
              </button>
            )}

          </div>
        </div>
      )}

    </WorkspaceLayout>
  );
}
