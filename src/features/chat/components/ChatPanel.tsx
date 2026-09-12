import React, { useState } from 'react';
import { ChatMessage } from './ChatMessage';
import { SuggestedPrompt } from './SuggestedPrompt';
import { ChatInput } from './ChatInput';
import { mockChatData } from '../mock/chatData';
import useContractChat from '../hooks/useContractChat';

export const ChatPanel = () => {
  const { sendMessage, error, loading, messages } = useContractChat()

  const handleSubmit = (message: string) => {
    if (!message.trim()) return;
    console.log("message:", message)
    sendMessage({ message });
  }

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-l border-[#222]">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-[#222] flex items-center justify-between bg-[#111]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#22c55e]"></div>
          <h3 className="text-white font-semibold">Ask LegalGPT</h3>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-2">
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            role={msg.role as any}
            content={msg.content}
            timestamp={msg.created_at || new Date().toISOString()}
          />
        ))}

        {/* Suggested Prompts */}
        <div className="mt-4 flex flex-col gap-2">
          {messages.length === 0 && mockChatData.suggestedPrompts.map((prompt, idx) => (
            <SuggestedPrompt
              key={idx}
              text={prompt}
              onClick={() => { handleSubmit(prompt) }}
            />
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <ChatInput onSubmit={handleSubmit} isLoading={loading} />
    </div>
  );
};
