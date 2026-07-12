import React from 'react';
import { useState, useRef } from 'react';
import { Loader, Loader2, UploadCloud } from 'lucide-react';
import { uploadContract } from '@/utils/supabase/storage';

interface UploadDropzoneProps {
  onUpload: (path: string) => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isuploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUplaodClick = async () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  }

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError(null);
    const mockUserId = "user-123";

    const result = await uploadContract(file, mockUserId);
    setIsUploading(false);
    if (result.success && result.path) {
      onUpload(result.path);
    }
    else {
      setError('Failed to upload contract');
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-6">
      <button
        onClick={handleUplaodClick}
        disabled={isuploading}
        aria-label="Upload document for analysis"
        className="w-full bg-[#0a0a0a] border-2 border-dashed border-[#222] hover:border-[#7c5cfc]/50 rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group focus-visible:ring-4 focus-visible:ring-[#7c5cfc]/50 outline-none"
      >
        <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">

          {isuploading ? (
            <Loader2 size={40} className="text-[#7c5cfc] animate-spin" aria-hidden="true" />
          ) : (
            <UploadCloud size={40} className="text-[#7c5cfc]" aria-hidden="true" />
          )}
        </div>

        <h2 className="text-white text-2xl font-bold mb-3 text-center tracking-tight">
          {isuploading ? 'Uploading contract...' : 'Analyze a Legal Contract'}
        </h2>

        <p className="text-[#666] text-center mb-8 max-w-sm">
          {error ? <span className='text-red-600'>Error: {error}</span> : "Drag and drop your PDF, DOCX or TXT file, or click to browse your files."}
        </p>

        <span className="bg-[#7c5cfc] group-hover:bg-[#111] group-hover:border-[#333] border border-[#222] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 group-hover:scale-[1.02] inline-block pointer-events-none">
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

      <p className="mt-8 text-xs text-[#444] uppercase tracking-widest font-bold text-center" aria-live="polite">
        Supported Formats: PDF, DOCX, TXT
      </p>
    </div>
  );
};
