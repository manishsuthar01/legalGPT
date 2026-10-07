import React, { useState, useRef, DragEvent } from 'react';
import { Loader2, UploadCloud, FileText, Lock } from 'lucide-react';
import { uploadContract } from '@/utils/supabase/storage';
import { useAuthStore } from '@/features/auth/store/useAuthstore';
import { createClient } from '@/lib/supabase/client';

interface UploadDropzoneProps {
  onUpload: (path: string, country: string, fileName?: string) => Promise<void> | void;
}

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
      setError('Please sign in to analyze contracts.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const result = await uploadContract(file, activeUserId);
    if (result.success && result.path) {
      await onUpload(result.path, country, file.name);
    } else {
      setError(result.error instanceof Error ? result.error.message : 'Failed to upload contract');
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
    <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="w-full text-center mb-6">
        <h2 className="text-[#F1F5F9] text-xl sm:text-2xl font-semibold tracking-tight mb-2">
          Upload Contract for Analysis
        </h2>
        <p className="text-[#94A3B8] text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
          Upload any agreement to detect liability risks, review problematic clauses, and generate redlines.
        </p>
      </div>

      {/* Target Jurisdiction Selector */}
      <div className="w-full max-w-sm mb-4">
        <label 
          htmlFor="country-select" 
          className="text-xs font-medium text-[#94A3B8] block mb-1.5"
        >
          Governing Jurisdiction
        </label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={isuploading}
          className="w-full bg-[#141A24] border border-[#1E2532] text-[#F1F5F9] text-xs rounded-lg px-3 py-2.5 focus:border-[#818CF8] transition-colors outline-none cursor-pointer"
        >
          <option value="US">United States (Federal & Delaware Law)</option>
          <option value="UK">United Kingdom (England & Wales)</option>
          <option value="EU">European Union</option>
          <option value="IN">India (Contract Act)</option>
          <option value="AU">Australia</option>
          <option value="CA">Canada</option>
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
        aria-label="Upload contract"
        className={`w-full border border-dashed rounded-2xl p-8 sm:p-12 flex flex-col items-center justify-center cursor-pointer transition-colors outline-none group ${
          isDragOver
            ? 'bg-[#182232] border-[#818CF8]'
            : 'bg-[#0F1319] border-[#1E2532] hover:border-[#2D3C54] hover:bg-[#141A24]'
        }`}
      >
        <div className="w-12 h-12 rounded-xl bg-[#141A24] border border-[#1E2532] flex items-center justify-center mb-4 text-[#818CF8] group-hover:scale-105 transition-transform">
          {isuploading ? (
            <Loader2 size={22} className="animate-spin text-[#818CF8]" aria-hidden="true" />
          ) : (
            <UploadCloud size={22} aria-hidden="true" />
          )}
        </div>

        <h3 className="text-[#F1F5F9] text-sm sm:text-base font-medium mb-1 text-center">
          {isuploading ? 'Uploading and parsing document...' : 'Choose or drop a contract file'}
        </h3>

        <p className="text-[#64748B] text-xs text-center mb-4">
          {error ? (
            <span className="text-rose-400 font-medium">{error}</span>
          ) : (
            'PDF, DOCX, or TXT up to 25MB'
          )}
        </p>

        <span className="inline-flex items-center gap-2 bg-[#583AFE] hover:bg-[#4E32E8] text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm transition-colors pointer-events-none">
          <FileText size={14} />
          <span>{isuploading ? 'Processing...' : 'Select File'}</span>
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

      {/* Security notice */}
      <div className="mt-4 flex items-center gap-1.5 text-xs text-[#64748B]">
        <Lock size={12} className="text-[#64748B]" />
        <span>End-to-end encrypted document handling</span>
      </div>
    </div>
  );
};

