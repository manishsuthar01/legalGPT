"use client";

import React from "react";

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
      className={`rounded-2xl border border-edge bg-surface/90 backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_20px_rgba(124,92,252,0.05)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Mac Titlebar */}
      <div
        className={`px-4 py-3 bg-[#0e0e0e] border-b border-edge flex items-center justify-between select-none ${headerClassName}`}
      >
        {/* Window controls (traffic lights) */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 hover:bg-[#ef4444] transition-colors inline-block cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80 hover:bg-[#f59e0b] transition-colors inline-block cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 hover:bg-[#22c55e] transition-colors inline-block cursor-pointer" />
        </div>

        {/* Monospace File Name / Title */}
        <div className="flex items-center gap-2 font-mono text-xs text-silver tracking-tight truncate px-3">
          <span className="text-[#666] select-none">📄</span>
          <span className="truncate">{title}</span>
        </div>

        {/* Right side slot */}
        <div className="flex items-center justify-end shrink-0 text-xs">
          {statusBadge || (
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#666]">
              READY
            </span>
          )}
        </div>
      </div>

      {/* Window Body */}
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </div>
  );
};
