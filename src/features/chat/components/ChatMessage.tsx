'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check, Sparkles, User } from 'lucide-react';

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

/**
 * Preprocesses markdown text returned by LLMs:
 * 1. Unescapes literal "\n" strings into real line breaks
 * 2. Formats collapsed table rows (e.g. "||" or "| |") into proper markdown newlines
 */
function preprocessMarkdown(raw: string): string {
  if (!raw) return '';
  let text = raw.replace(/\\n/g, '\n');
  // If the model collapsed rows with || or | |, separate them with newline
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
    <div className={`flex flex-col mb-4 w-full ${isAssistant ? 'items-start' : 'items-end'}`}>
      <div
        className={`flex items-start gap-2.5 w-full ${
          isAssistant ? 'flex-row max-w-full' : 'flex-row-reverse max-w-[85%]'
        }`}
      >
        {/* Avatar */}
        {isAssistant ? (
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#7c5cfc] to-[#9b7bfa] shrink-0 flex items-center justify-center shadow-md mt-1">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-lg bg-[#22222a] border border-[#333342] shrink-0 flex items-center justify-center text-xs text-[#aaa] mt-1">
            <User className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Message Bubble */}
        <div
          className={`flex-1 min-w-0 rounded-2xl text-sm leading-relaxed ${
            isAssistant
              ? 'bg-[#101016] border border-[#22222e] text-[#ddd] rounded-tl-sm p-4 sm:p-5 shadow-lg'
              : 'bg-gradient-to-r from-[#7c5cfc] to-[#6a48eb] text-white rounded-tr-sm px-4 py-3 shadow-md'
          }`}
        >
          {isAssistant ? (
            <div className="markdown-chat-content text-sm space-y-2">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ ...props }) => (
                    <div className="my-3.5 w-full overflow-x-auto rounded-xl border border-[#272733] bg-[#0b0b10] shadow-sm">
                      <table className="w-full text-left text-xs border-collapse min-w-[400px]" {...props} />
                    </div>
                  ),
                  thead: ({ ...props }) => (
                    <thead className="bg-[#171722] text-white font-semibold border-b border-[#272733]" {...props} />
                  ),
                  th: ({ ...props }) => (
                    <th className="px-3.5 py-2.5 font-semibold text-white tracking-wider text-[11px] uppercase border-r border-[#22222e] last:border-r-0 whitespace-nowrap" {...props} />
                  ),
                  td: ({ ...props }) => (
                    <td className="px-3.5 py-2.5 border-t border-[#1e1e28] border-r border-[#1e1e28] last:border-r-0 text-[#ccc] leading-relaxed align-top" {...props} />
                  ),
                  tr: ({ ...props }) => (
                    <tr className="hover:bg-white/[0.02] transition-colors odd:bg-transparent even:bg-[#12121a]/40" {...props} />
                  ),
                  strong: ({ ...props }) => (
                    <strong className="text-white font-semibold" {...props} />
                  ),
                  h1: ({ ...props }) => (
                    <h1 className="text-base font-bold text-white mt-4 mb-2 first:mt-0 flex items-center gap-1.5" {...props} />
                  ),
                  h2: ({ ...props }) => (
                    <h2 className="text-sm font-bold text-white mt-3.5 mb-1.5 first:mt-0" {...props} />
                  ),
                  h3: ({ ...props }) => (
                    <h3 className="text-xs font-semibold text-[#a78bfa] mt-3 mb-1 first:mt-0 uppercase tracking-wider" {...props} />
                  ),
                  p: ({ ...props }) => (
                    <p className="mb-2 last:mb-0 leading-relaxed text-[#ccc]" {...props} />
                  ),
                  ul: ({ ...props }) => (
                    <ul className="my-2 ml-4 list-disc space-y-1 text-[#ccc]" {...props} />
                  ),
                  ol: ({ ...props }) => (
                    <ol className="my-2 ml-4 list-decimal space-y-1 text-[#ccc]" {...props} />
                  ),
                  li: ({ ...props }) => (
                    <li className="leading-relaxed pl-1" {...props} />
                  ),
                  blockquote: ({ ...props }) => (
                    <blockquote className="my-2.5 border-l-2 border-[#7c5cfc] bg-[#7c5cfc]/5 pl-3 py-1.5 rounded-r-lg text-xs italic text-[#bbb]" {...props} />
                  ),
                  code: ({ inline, children, ...props }: any) => {
                    return inline ? (
                      <code className="bg-[#191924] text-[#a78bfa] border border-[#2a2a38] px-1.5 py-0.5 rounded text-xs font-mono" {...props}>
                        {children}
                      </code>
                    ) : (
                      <div className="my-2.5 overflow-x-auto rounded-xl bg-[#09090d] border border-[#22222e] p-3 text-xs font-mono text-[#ddd]">
                        <pre>{children}</pre>
                      </div>
                    );
                  },
                }}
              >
                {preprocessMarkdown(content)}
              </ReactMarkdown>

              {/* Message Footer / Copy Action */}
              <div className="mt-3 pt-2 border-t border-[#1a1a24] flex items-center justify-between text-[11px] text-[#666]">
                <span>LegalGPT Assistant {formattedTime ? `• ${formattedTime}` : ''}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-[#888] hover:text-white px-2 py-0.5 rounded-md hover:bg-white/[0.05] transition-colors cursor-pointer"
                  title="Copy response"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400 text-[10px]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span className="text-[10px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
};
