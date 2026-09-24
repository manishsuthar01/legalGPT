import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
}

export const ChatInput = ({ onSubmit, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || isLoading) return;
    onSubmit(message);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 sm:p-4 border-t border-[#222] bg-[#0a0a0a] pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0">
      <div className="relative flex items-end bg-[#121212] border border-[#262626] rounded-xl overflow-hidden focus-within:border-[#7c5cfc]/60 transition-colors">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this contract... (Enter to send)"
          aria-label="Chat input message"
          className="w-full bg-transparent text-sm sm:text-[15px] text-white placeholder-[#555] p-3 sm:p-3.5 pr-12 resize-none focus:outline-none min-h-[48px] sm:min-h-[54px] max-h-[120px] leading-relaxed"
          rows={1}
        />
        <button
          onClick={handleSend}
          aria-label="Send message"
          disabled={isLoading || !message.trim()}
          className="absolute right-2 bottom-2 p-2 bg-[#7c5cfc] hover:bg-[#6a4beb] disabled:opacity-40 disabled:hover:bg-[#7c5cfc] text-white rounded-lg transition-colors flex items-center justify-center focus-visible:ring-2 focus-visible:ring-white outline-none active:scale-95"
        >
          <SendHorizontal size={16} aria-hidden="true" />
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[9px] sm:text-[10px] text-[#555] uppercase tracking-wider font-semibold">
          AI can make mistakes. Verify important legal info.
        </span>
      </div>
    </div>
  );
};

