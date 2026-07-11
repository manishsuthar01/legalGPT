import React from 'react';
import { UploadCloud } from 'lucide-react';

interface UploadDropzoneProps {
  onUpload: () => void;
}

export const UploadDropzone: React.FC<UploadDropzoneProps> = ({ onUpload }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl mx-auto px-6">
      <div 
        onClick={onUpload}
        className="w-full bg-[#0a0a0a] border-2 border-dashed border-[#222] hover:border-[#7c5cfc]/50 rounded-2xl p-16 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group"
      >
        <div className="w-20 h-20 bg-[#111] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
          <UploadCloud size={40} className="text-[#7c5cfc]" />
        </div>
        
        <h2 className="text-white text-2xl font-bold mb-3 text-center tracking-tight">
          Analyze a Legal Contract
        </h2>
        
        <p className="text-[#666] text-center mb-8 max-w-sm">
          Drag and drop your PDF, DOCX or TXT file, or click to browse your files.
        </p>
        
        <button className="bg-[#7c5cfc] hover:bg-[#111] hover:border-[#333] border border-[#222] text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]">
          Browse Files
        </button>
      </div>

      <p className="mt-8 text-xs text-[#444] uppercase tracking-widest font-bold text-center">
        Supported Formats: PDF, DOCX, TXT
      </p>
    </div>
  );
};
