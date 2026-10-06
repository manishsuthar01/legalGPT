import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, ShieldAlert } from 'lucide-react';

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low' | 'neutral';

interface StatusBadgeProps {
  level: RiskLevel;
  label: string;
  size?: 'sm' | 'md';
  showIcon?: boolean;
}

const config: Record<RiskLevel, { bg: string; border: string; text: string; icon: React.FC<{ size?: number; className?: string }> }> = {
  critical: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/25',
    text: 'text-red-400',
    icon: ShieldAlert,
  },
  high: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/25',
    text: 'text-rose-400',
    icon: AlertCircle,
  },
  medium: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    text: 'text-amber-400',
    icon: AlertTriangle,
  },
  low: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    text: 'text-emerald-400',
    icon: CheckCircle2,
  },
  neutral: {
    bg: 'bg-[#181D27]',
    border: 'border-[#2A3446]',
    text: 'text-[#9DA8B9]',
    icon: Info,
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  level, 
  label, 
  size = 'md',
  showIcon = true 
}) => {
  const current = config[level] || config.neutral;
  const IconComponent = current.icon;
  const iconSize = size === 'sm' ? 10 : 12;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold uppercase tracking-wider border select-none ${current.bg} ${current.border} ${current.text} ${
        size === 'sm' 
          ? 'px-2 py-0.5 text-[9px]' 
          : 'px-2.5 py-1 text-[10px]'
      }`}
    >
      {showIcon && <IconComponent size={iconSize} className="shrink-0" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
};
