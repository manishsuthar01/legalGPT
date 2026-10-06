'use client';

import React, { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompt } from './SuggestedPrompt';
import { ChatInput } from './ChatInput';
import { mockChatData } from '../mock/chatData';
import useContractChat from '../hooks/useContractChat';
import { Scale, PanelRightClose, MessageSquare, ShieldCheck, Loader2 } from 'lucide-react';

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
    <div className="flex flex-col h-full bg-[#0B0E14] lg:border-l border-[#1C222E] min-h-0 relative select-text">
      {/* Contract Chat Header */}
      <div className="px-4 py-3 border-b border-[#1C222E] flex items-center justify-between bg-[#0F1218] shrink-0 select-none">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded bg-[#161B23] border border-[#263143] flex items-center justify-center shrink-0">
            <Scale size={13} className="text-[#C49B55]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-[#F1F4F8] font-semibold text-xs tracking-tight">Contract Counsel Assistant</h3>
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            </div>
            {documentName && (
              <span className="text-[10px] text-[#636F83] font-mono truncate">
                Context: {documentName}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              title="Collapse assistant panel (Ctrl+K)"
              aria-label="Collapse assistant panel"
              className="p-1.5 text-[#636F83] hover:text-[#F1F4F8] hover:bg-[#161B23] rounded-md transition-colors cursor-pointer focus-ring"
            >
              <PanelRightClose size={15} />
            </button>
          )}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-3">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role as any}
            content={msg.content}
            timestamp={msg.created_at || new Date().toISOString()}
          />
        ))}

        {/* Suggested Legal Inquiries when conversation is empty */}
        {messages.length === 0 && (
          <div className="my-auto flex flex-col gap-2.5 py-4">
            <div className="flex items-center gap-1.5 px-1">
              <MessageSquare size={13} className="text-[#4B72C2]" />
              <span className="text-[10px] text-[#7E8B9F] font-bold uppercase tracking-wider font-mono">
                Suggested Legal Inquiries
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
            <div className="mt-2 text-center">
              <span className="text-[10px] text-[#636F83] font-mono">
                Questions are grounded in retrieved contract clauses & statutory standards.
              </span>
            </div>
          </div>
        )}

        {/* Legal Reasoning Indicator */}
        {loading && (
          <div className="flex items-center gap-2 text-xs text-[#9DA8B9] bg-[#10141E] border border-[#1C2536] rounded-md p-3 my-1">
            <Loader2 size={14} className="text-[#4B72C2] animate-spin shrink-0" />
            <span className="font-mono text-[11px]">Evaluating contract clauses & cross-referencing law...</span>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="text-xs text-red-400 bg-red-950/30 border border-red-500/20 rounded-md p-2.5 my-1 font-mono">
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
