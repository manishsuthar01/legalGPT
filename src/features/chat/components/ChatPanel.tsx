'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompt } from './SuggestedPrompt';
import { ChatInput } from './ChatInput';
import { mockChatData } from '../mock/chatData';
import useContractChat from '../hooks/useContractChat';
import { Sparkles, PanelRightClose } from 'lucide-react';

interface ChatPanelProps {
  contractId?: string;
  onClose?: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ contractId, onClose }) => {
  const { sendMessage, error, loading, messages } = useContractChat(contractId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSubmit = (message: string) => {
    if (!message.trim()) return;
    sendMessage({ message });
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0e] lg:border-l border-[#22222e] min-h-0 relative select-text">
      {/* Chat Header */}
      <div className="px-4 py-3 sm:px-5 sm:py-3.5 border-b border-[#22222e] flex items-center justify-between bg-[#0e0e14] shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
          <h3 className="text-white font-semibold text-sm">Ask LegalGPT</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden xs:flex items-center gap-1.5 text-[11px] text-[#777] bg-[#14141c] border border-[#22222e] px-2.5 py-0.5 rounded-full">
            <Sparkles size={11} className="text-[#7c5cfc]" />
            <span>Clause Assistant</span>
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Collapse chat panel"
              aria-label="Collapse chat panel"
              className="p-1.5 text-[#888] hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors cursor-pointer"
            >
              <PanelRightClose size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-5 flex flex-col gap-2.5">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role as any}
            content={msg.content}
            timestamp={msg.created_at || new Date().toISOString()}
          />
        ))}

        {/* Suggested Prompts */}
        {messages.length === 0 && (
          <div className="mt-2 flex flex-col gap-2">
            <span className="text-[10px] text-[#666] font-bold uppercase tracking-wider px-1">Suggested Inquiries</span>
            <div className="flex flex-col gap-1.5">
              {mockChatData.suggestedPrompts.map((prompt, idx) => (
                <SuggestedPrompt
                  key={idx}
                  text={prompt}
                  onClick={() => { handleSubmit(prompt); }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Thinking Indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#888] pl-2 py-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#7c5cfc] animate-pulse" />
            <span>LegalGPT is reviewing the contract...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-xs text-red-400 bg-red-950/40 border border-red-500/20 rounded-lg p-2.5 my-1">
            {error}
          </div>
        )}

        {/* Auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};
