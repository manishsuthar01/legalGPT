import React, { useState, useRef, DragEvent } from 'react';
import { Loader2, UploadCloud, FileText, ShieldCheck, Scale, CheckCircle2 } from 'lucide-react';
import { uploadContract } from '@/utils/supabase/storage';
import { useAuthStore } from '@/features/auth/store/useAuthstore';
import { createClient } from '@/lib/supabase/client';

interface UploadDropzoneProps {
  onUpload: (path: string, country: string, fileName?: string) => Promise<void> | void;
}

const INTAKE_STEPS = [
  { step: '01', title: 'Upload & Parse', desc: 'Text & metadata extraction' },
  { step: '02', title: 'Clause Splitting', desc: 'Atomic clause indexing' },
  { step: '03', title: 'Statutory Audit', desc: 'Flag liability & exposure' },
  { step: '04', title: 'Advisory Redline', desc: 'Attorney-grade remediation' },
];

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isuploading, setIsUploading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('US');
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const handleUploadClick = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };

  const processFile = async (file: File) => {
    let activeUserId = userId;

    // Resilient auth fallback in case Zustand store has not hydrated yet
    if (!activeUserId) {
      try {
        const supabase = await createClient();
        const { data: { user: sbUser } } = await supabase.auth.getUser();
        if (sbUser) {
          activeUserId = sbUser.id;
        }
      } catch {
        // ignore
      }
    }

    if (!activeUserId) {
      setError('Authentication required: please log in to analyze contracts.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const result = await uploadContract(file, activeUserId);
    if (result.success && result.path) {
      await onUpload(result.path, country, file.name);
    } else {
      setError(result.error instanceof Error ? result.error.message : 'Failed to ingest contract file');
      setIsUploading(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (e: DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (isuploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto px-4 py-8">
      {/* Editorial Header */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#161B23] border border-[#263143] text-[#C49B55] text-[10px] font-bold uppercase tracking-widest mb-3">
          <Scale size={12} className="text-[#C49B55]" />
          <span>Statutory Intake & Document Analysis</span>
        </div>
        <h2 className="text-[#F1F4F8] text-xl sm:text-2xl font-semibold tracking-tight mb-2">
          Contract Audit Workspace
        </h2>
        <p className="text-[#9DA8B9] text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
          Upload any commercial contract, MSA, NDA, or vendor agreement for automated clause segmentation, liability detection, and statutory review.
        </p>
      </div>

      {/* Audit Pipeline Steps */}
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {INTAKE_STEPS.map((s, idx) => (
          <div 
            key={idx} 
            className="bg-[#0F1218] border border-[#1E2533] rounded-lg p-2.5 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-mono text-[#4B72C2] font-semibold">{s.step}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2B5EA7]" />
            </div>
            <span className="text-xs font-medium text-[#F1F4F8] leading-tight">{s.title}</span>
            <span className="text-[10px] text-[#636F83] mt-0.5 truncate">{s.desc}</span>
          </div>
        ))}
      </div>

      {/* Target Jurisdiction Selector */}
      <div className="w-full max-w-sm mb-4">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <label 
            htmlFor="country-select" 
            className="text-[10px] font-bold uppercase tracking-wider text-[#7E8B9F]"
          >
            Governing Jurisdiction
          </label>
          <span className="text-[10px] text-[#636F83] font-mono">Applies statutory law</span>
        </div>
        <select
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={isuploading}
          className="w-full bg-[#121620] border border-[#242D3E] text-[#F1F4F8] text-xs rounded-md px-3 py-2 focus:border-[#4B72C2] focus:ring-1 focus:ring-[#4B72C2] transition-colors outline-none cursor-pointer"
        >
          <option value="US">United States (Federal & Delaware Common Law)</option>
          <option value="UK">United Kingdom (England & Wales Law)</option>
          <option value="EU">European Union (Civil Law Standards & GDPR)</option>
          <option value="IN">India (Indian Contract Act 1872)</option>
          <option value="AU">Australia (Commonwealth & State Common Law)</option>
          <option value="CA">Canada (Common Law & Quebec Civil Code)</option>
        </select>
      </div>

      {/* Main Drag & Drop Zone */}
      <button
        type="button"
        onClick={handleUploadClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isuploading}
        aria-label="Upload legal agreement for analysis"
        className={`w-full border border-dashed rounded-xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors outline-none group focus-ring ${
          isDragOver
            ? 'bg-[#141C2A] border-[#4B72C2]'
            : 'bg-[#0E1219] border-[#222B3B] hover:border-[#384863] hover:bg-[#111621]'
        }`}
      >
        <div className="w-12 h-12 rounded-lg bg-[#161C26] border border-[#273244] flex items-center justify-center mb-4 transition-colors group-hover:border-[#4B72C2]">
          {isuploading ? (
            <Loader2 size={22} className="text-[#4B72C2] animate-spin" aria-hidden="true" />
          ) : (
            <UploadCloud size={22} className="text-[#9DA8B9] group-hover:text-[#F1F4F8] transition-colors" aria-hidden="true" />
          )}
        </div>

        <h3 className="text-[#F1F4F8] text-sm sm:text-base font-medium mb-1.5 text-center">
          {isuploading ? 'Ingesting and parsing document...' : 'Select or drag agreement to audit'}
        </h3>

        <p className="text-[#636F83] text-xs text-center mb-4 max-w-sm px-2">
          {error ? (
            <span className="text-red-400 font-medium">Error: {error}</span>
          ) : (
            'Supports PDF, DOCX, or plain TXT files up to 25MB.'
          )}
        </p>

        <span className="inline-flex items-center gap-2 bg-[#2B5EA7] hover:bg-[#356FBF] text-white text-xs font-medium px-4 py-2 rounded-md shadow-sm transition-colors pointer-events-none">
          <FileText size={14} />
          <span>{isuploading ? 'Parsing...' : 'Browse Document Files'}</span>
        </span>
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.docx,.txt"
        className="hidden"
        aria-label="Upload document file"
      />

      {/* Security & Confidentiality Notice */}
      <div className="mt-5 flex items-center gap-2 text-[11px] text-[#636F83]">
        <ShieldCheck size={13} className="text-[#16A34A] shrink-0" />
        <span>Confidential & Attorney-Client Protected • Zero training on uploaded contract corpora</span>
      </div>
    </div>
  );
};
