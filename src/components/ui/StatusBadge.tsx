import React from 'react';

type RiskLevel = 'high' | 'medium' | 'low' | 'neutral';

interface StatusBadgeProps {
  level: RiskLevel;
  label: string;
}

const styles: Record<RiskLevel, string> = {
  high: 'bg-[#ef4444]/10 border-[#ef4444]/20 text-[#ef4444]',
  medium: 'bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]',
  low: 'bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]',
  neutral: 'bg-[#999999]/10 border-[#999999]/20 text-[#999999]',
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ level, label }) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${styles[level]}`}
    >
      {label}
    </span>
  );
};
