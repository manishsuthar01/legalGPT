'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompt } from './SuggestedPrompt';
import { ChatInput } from './ChatInput';
import { mockChatData } from '../mock/chatData';
import useContractChat from '../hooks/useContractChat';
import { PanelRightClose, MessageSquare, Loader2 } from 'lucide-react';

interface ChatPanelProps {
  contractId?: string;
  documentName?: string;
  onClose?: () => void;
}

export const ChatPanel: React.FC<ChatPanelProps> = ({ contractId, documentName, onClose }) => {
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
    <div className="flex flex-col h-full bg-[#0D1117] lg:border-l border-[#1E2532] min-h-0 relative select-text">
      {/* Contract Chat Header */}
      <div className="px-4 py-3 border-b border-[#1E2532] flex items-center justify-between bg-[#0D1117] shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex flex-col min-w-0">
            <h3 className="text-[#F1F5F9] font-semibold text-xs sm:text-sm">Contract Assistant</h3>
            {documentName && (
              <span className="text-[11px] text-[#94A3B8] truncate">
                {documentName}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Close panel"
              aria-label="Close assistant panel"
              className="p-1.5 text-[#64748B] hover:text-[#F1F5F9] hover:bg-[#1E2532] rounded-md transition-colors cursor-pointer"
            >
              <PanelRightClose size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-3 bg-[#0A0D12]">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role as any}
            content={msg.content}
            timestamp={msg.created_at || new Date().toISOString()}
          />
        ))}

        {/* Suggested Inquiries when conversation is empty */}
        {messages.length === 0 && (
          <div className="my-auto flex flex-col gap-2.5 py-4">
            <div className="flex items-center gap-1.5 px-1">
              <MessageSquare size={14} className="text-[#64748B]" />
              <span className="text-xs font-semibold text-[#F1F5F9]">
                Suggested Questions
              </span>
            </div>
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

        {/* Loading Indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#CBD5E1] bg-[#141A24] border border-[#1E2532] rounded-lg p-3 my-1 shadow-xs">
            <Loader2 size={14} className="text-[#818CF8] animate-spin shrink-0" />
            <span>Analyzing contract context...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-xs text-rose-300 bg-rose-500/15 border border-rose-500/30 rounded-lg p-2.5 my-1">
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

