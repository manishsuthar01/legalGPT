import React, { useState, KeyboardEvent } from 'react';
import { SendHorizontal, ShieldAlert } from 'lucide-react';

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
    <div className="p-3 border-t border-[#1E2532] bg-[#0D1117] pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0">
      <div className="relative flex items-end bg-[#141A24] border border-[#1E2532] rounded-xl overflow-hidden focus-within:border-[#818CF8] transition-colors">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this contract... (Enter to send)"
          aria-label="Contract question input"
          className="w-full bg-transparent text-xs sm:text-[13px] text-[#F1F5F9] placeholder-[#64748B] p-2.5 sm:p-3 pr-11 resize-none focus:outline-none min-h-[44px] max-h-[120px] leading-relaxed"
          rows={1}
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send message"
          disabled={isLoading || !message.trim()}
          className="absolute right-1.5 bottom-1.5 p-2 bg-[#583AFE] hover:bg-[#4E32E8] disabled:opacity-30 disabled:hover:bg-[#583AFE] text-white rounded-lg transition-colors flex items-center justify-center outline-none cursor-pointer"
        >
          <SendHorizontal size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

