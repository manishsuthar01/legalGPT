'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Scale, User } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at?: string;
}

function preprocessMarkdown(raw: string): string {
  if (!raw) return '';
  let text = raw.replace(/\\n/g, '\n');
  text = text.replace(/\|\s*\|\s*/g, '|\n| ');
  return text;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, timestamp }) => {
  const isAssistant = role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const formattedTime = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className={`flex flex-col mb-3 w-full ${isAssistant ? 'items-start' : 'items-end'}`}>
      <div
        className={`flex items-start gap-2.5 w-full ${
          isAssistant ? 'flex-row max-w-full' : 'flex-row-reverse max-w-[88%]'
        }`}
      >
        {/* Avatar */}
        {isAssistant ? (
          <div className="w-6 h-6 rounded-md bg-[#583AFE]/15 border border-[#583AFE]/30 shrink-0 flex items-center justify-center mt-1">
            <Scale className="w-3.5 h-3.5 text-[#818CF8]" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-md bg-[#1E2532] border border-[#2B3547] shrink-0 flex items-center justify-center text-[#94A3B8] mt-1">
            <User className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`flex-1 min-w-0 rounded-xl text-xs leading-relaxed ${
            isAssistant
              ? 'bg-[#111722] border border-[#1E2532] text-[#E2E8F0] p-3.5 sm:p-4 shadow-xs'
              : 'bg-[#1E2533] border border-[#2D3C54] text-white px-3.5 py-2.5 shadow-xs'
          }`}
        >
          {isAssistant ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#1E2532] mb-2 select-none">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#94A3B8]">
                  LegalGPT Analysis
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[10px] font-mono text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <Check size={11} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-xs space-y-2 select-text leading-relaxed">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ ...props }) => (
                      <div className="my-2.5 w-full overflow-x-auto rounded border border-[#1E2532] bg-[#0A0D12]">
                        <table className="w-full text-left text-xs border-collapse min-w-[320px]" {...props} />
                      </div>
                    ),
                    thead: ({ ...props }) => (
                      <thead className="bg-[#141A24] text-[#F1F5F9] font-semibold border-b border-[#1E2532]" {...props} />
                    ),
                    th: ({ ...props }) => (
                      <th className="px-3 py-2 font-semibold text-[#F1F5F9] text-[10px] uppercase font-mono border-r border-[#1E2532] last:border-r-0" {...props} />
                    ),
                    td: ({ ...props }) => (
                      <td className="px-3 py-2 border-t border-[#1E2532] border-r border-[#1E2532] last:border-r-0 text-[#CBD5E1] align-top" {...props} />
                    ),
                    h1: ({ ...props }) => (
                      <h4 className="text-xs font-semibold text-[#F1F5F9] mt-3 mb-1 first:mt-0 font-mono uppercase tracking-wider" {...props} />
                    ),
                    h2: ({ ...props }) => (
                      <h4 className="text-xs font-semibold text-[#F1F5F9] mt-2 mb-1 first:mt-0" {...props} />
                    ),
                    h3: ({ ...props }) => (
                      <h5 className="text-[11px] font-semibold text-[#818CF8] mt-2 mb-1 first:mt-0 font-mono" {...props} />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-1.5 last:mb-0 leading-relaxed text-[#CBD5E1]" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul className="my-1.5 ml-3.5 list-disc space-y-1 text-[#CBD5E1]" {...props} />
                    ),
                    ol: ({ ...props }) => (
                      <ol className="my-1.5 ml-3.5 list-decimal space-y-1 text-[#CBD5E1]" {...props} />
                    ),
                    blockquote: ({ ...props }) => (
                      <blockquote className="border-l-2 border-[#818CF8] pl-3 my-2 text-[#94A3B8] italic font-legal-clause bg-[#0A0D12] py-1 rounded-r" {...props} />
                    ),
                    code: ({ ...props }) => (
                      <code className="bg-[#0A0D12] text-[#86EFAC] px-1.5 py-0.5 rounded text-[11px] font-mono border border-[#1E2532]" {...props} />
                    ),
                  }}
                >
                  {preprocessMarkdown(content)}
                </ReactMarkdown>
              </div>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{content}</p>
          )}

          {formattedTime && (
            <div className={`mt-1.5 text-[9px] font-mono ${isAssistant ? 'text-[#64748B]' : 'text-slate-300 text-right'}`}>
              {formattedTime}
            </div>
          )}
        </div>
      </div>
    </div>
  );

};
