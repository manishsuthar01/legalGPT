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
    <div className="p-3 border-t border-[#1C222E] bg-[#0B0E14] pb-[max(0.75rem,env(safe-area-inset-bottom))] shrink-0">
      <div className="relative flex items-end bg-[#10141D] border border-[#222B3B] rounded-lg overflow-hidden focus-within:border-[#4B72C2] transition-colors">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this contract... (Enter to send, Shift+Enter for newline)"
          aria-label="Legal counsel inquiry message"
          className="w-full bg-transparent text-xs sm:text-[13px] text-[#F1F4F8] placeholder-[#636F83] p-2.5 sm:p-3 pr-11 resize-none focus:outline-none min-h-[44px] max-h-[120px] leading-relaxed"
          rows={1}
        />
        <button
          type="button"
          onClick={handleSend}
          aria-label="Send inquiry"
          disabled={isLoading || !message.trim()}
          className="absolute right-1.5 bottom-1.5 p-1.5 bg-[#2B5EA7] hover:bg-[#356FBF] disabled:opacity-30 disabled:hover:bg-[#2B5EA7] text-white rounded-md transition-colors flex items-center justify-center focus-ring outline-none cursor-pointer"
        >
          <SendHorizontal size={14} aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-center justify-center gap-1.5 text-center mt-1.5 select-none">
        <ShieldAlert size={10} className="text-[#636F83]" />
        <span className="text-[9px] text-[#636F83] font-mono">
          Advisory AI Model • Grounded in contract text. Verify critical indemnities.
        </span>
      </div>
    </div>
  );
};
