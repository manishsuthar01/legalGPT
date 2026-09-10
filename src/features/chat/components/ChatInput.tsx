import React, { useState } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}


export const ChatInput = ({ onSubmit, isLoading }: ChatInputProps) => {

  const [message, setMessage] = useState('')

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSubmit(message)
    setMessage("")
  }

  return (
    <div className="p-4 border-t border-[#222] bg-[#0a0a0a]">
      <div className="relative flex items-end bg-[#111] border border-[#222] rounded-xl overflow-hidden focus-within:border-[#7c5cfc]/50 transition-colors">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask a question about this contract..."
          aria-label="Chat input message"
          className="w-full bg-transparent text-sm text-white placeholder-[#555] p-4 resize-none focus:outline-none min-h-[56px] max-h-[120px]"
          rows={1}
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          disabled={isLoading}
          className="absolute right-2 bottom-2 p-2 bg-[#7c5cfc] hover:bg-[#6a4beb] text-white rounded-lg transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white outline-none"
        >
          <SendHorizontal size={16} aria-hidden="true" />
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
