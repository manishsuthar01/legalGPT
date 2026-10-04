import React, { useState, useRef, DragEvent } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { uploadContract } from '@/utils/supabase/storage';
import { useAuthStore } from '@/features/auth/store/useAuthstore';
import { createClient } from '@/lib/supabase/client';

interface UploadDropzoneProps {
  onUpload: (path: string, country: string) => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isuploading, setIsUploading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('US');
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;

  const handleUplaodClick = () => {
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
      setError('You must be logged in to upload a contract.');
      return;
    }

    setIsUploading(true);
    setError(null);

    const result = await uploadContract(file, activeUserId);
    setIsUploading(false);
    if (result.success && result.path) {
      onUpload(result.path, country);
    } else {
      setError(result.error instanceof Error ? result.error.message : 'Failed to upload contract');
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
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-4 sm:px-6 py-6">

      <div className="mb-4 sm:mb-6 w-full max-w-xs flex flex-col items-center">
        <label htmlFor="country-select" className="text-xs sm:text-sm text-[#999] font-medium mb-1.5 sm:mb-2 uppercase tracking-wider">Target Jurisdiction</label>
        <select
          id="country-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={isuploading}
          className="w-full bg-[#111] border border-[#333] text-white text-xs sm:text-sm rounded-lg px-3.5 sm:px-4 py-2 focus:outline-none focus:border-[#7c5cfc] transition-colors"
        >
          <option value="US">United States (US)</option>
          <option value="UK">United Kingdom (UK)</option>
          <option value="EU">European Union (EU)</option>
          <option value="IN">India (IN)</option>
          <option value="AU">Australia (AU)</option>
          <option value="CA">Canada (CA)</option>
        </select>
      </div>

      <button
        type="button"
        onClick={handleUplaodClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        disabled={isuploading}
        aria-label="Upload document for analysis"
        className={`w-full border-2 border-dashed rounded-2xl p-6 sm:p-12 md:p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group focus-visible:ring-4 focus-visible:ring-[#7c5cfc]/50 outline-none ${
          isDragOver
            ? 'bg-[#7c5cfc]/10 border-[#7c5cfc] scale-[1.01]'
            : 'bg-[#0a0a0a] border-[#222] hover:border-[#7c5cfc]/50'
        }`}
      >
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-[#111] rounded-full flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">

          {isuploading ? (
            <Loader2 size={28} className="text-[#7c5cfc] animate-spin sm:w-10 sm:h-10" aria-hidden="true" />
          ) : (
            <UploadCloud size={28} className="text-[#7c5cfc] sm:w-10 sm:h-10" aria-hidden="true" />
          )}
        </div>

        <h2 className="text-white text-lg sm:text-2xl font-bold mb-2 sm:mb-3 text-center tracking-tight">
          {isuploading ? 'Uploading contract...' : 'Analyze a Legal Contract'}
        </h2>

        <p className="text-[#666] text-xs sm:text-sm text-center mb-6 sm:mb-8 max-w-sm px-2">
          {error ? <span className='text-red-400'>Error: {error}</span> : "Drag and drop your PDF, DOCX or TXT file, or click to browse your files."}
        </p>

        <span className="bg-[#7c5cfc] group-hover:bg-[#111] group-hover:border-[#333] border border-[#222] text-white font-semibold text-xs sm:text-sm px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition-all duration-300 group-hover:scale-[1.02] inline-block pointer-events-none">
          {isuploading ? "uploading..." : "browse files"}
        </span>
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isuploading}
        className="hidden"
        accept=".pdf,.docx,.txt"
      />

      <p className="mt-4 sm:mt-8 text-[10px] sm:text-xs text-[#444] uppercase tracking-widest font-bold text-center" aria-live="polite">
        Supported Formats: PDF, DOCX, TXT
      </p>
    </div>
  );

};
