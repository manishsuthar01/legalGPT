import React from 'react';
import { SendHorizontal } from 'lucide-react';

export const ChatInput = () => {
  return (
    <div className="p-4 border-t border-[#222] bg-[#0a0a0a]">
      <div className="relative flex items-end bg-[#111] border border-[#222] rounded-xl overflow-hidden focus-within:border-[#7c5cfc]/50 transition-colors">
        <textarea 
          placeholder="Ask a question about this contract..."
          className="w-full bg-transparent text-sm text-white placeholder-[#555] p-4 resize-none focus:outline-none min-h-[56px] max-h-[120px]"
          rows={1}
        />
        <button className="absolute right-2 bottom-2 p-2 bg-[#7c5cfc] hover:bg-[#6a4beb] text-white rounded-lg transition-colors flex items-center justify-center">
          <SendHorizontal size={16} />
        </button>
      </div>
      <div className="text-center mt-3">
        <span className="text-[10px] text-[#555] uppercase tracking-widest font-bold">
          AI can make mistakes. Verify important info.
        </span>
      </div>
    </div>
  );
};
