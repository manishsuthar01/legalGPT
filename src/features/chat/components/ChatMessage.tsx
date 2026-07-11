import React from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content }) => {
  const isAssistant = role === 'assistant';

  return (
    <div className={`flex flex-col mb-4 ${isAssistant ? 'items-start' : 'items-end'}`}>
      <div className={`flex items-end gap-2 max-w-[85%] ${isAssistant ? 'flex-row' : 'flex-row-reverse'}`}>
        {isAssistant && (
          <div className="w-8 h-8 rounded-lg bg-[#7c5cfc] flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-xs font-bold">✓</span>
          </div>
        )}
        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
          isAssistant 
            ? 'bg-[#111] border border-[#222] text-[#ccc] rounded-bl-sm' 
            : 'bg-[#7c5cfc] text-white rounded-br-sm'
        }`}>
          {content}
        </div>
      </div>
    </div>
  );
};
