"use client";

import React from "react";
import { FileText } from "lucide-react";

interface MacWindowProps {
  title?: string;
  statusBadge?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export const MacWindow: React.FC<MacWindowProps> = ({
  title = "contract_analysis.pdf",
  statusBadge,
  children,
  className = "",
  headerClassName = "",
  bodyClassName = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-[#E5E7EB] bg-white shadow-xl overflow-hidden transition-all duration-200 ${className}`}
    >
      {/* Editorial Titlebar */}
      <div
        className={`px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between select-none ${headerClassName}`}
      >
        {/* Window controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]/80 hover:bg-[#EF4444] transition-colors inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]/80 hover:bg-[#F59E0B] transition-colors inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]/80 hover:bg-[#10B981] transition-colors inline-block" />
        </div>

        {/* Monospace File Name / Title */}
        <div className="flex items-center gap-1.5 font-mono text-xs text-[#0A0D14] font-medium tracking-tight truncate px-3">
          <FileText size={13} className="text-[#583AFE]" />
          <span className="truncate">{title}</span>
        </div>

        {/* Right side slot */}
        <div className="flex items-center justify-end shrink-0 text-xs">
          {statusBadge || (
            <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B7280]">
              AUDITED
            </span>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </div>
  );
};
