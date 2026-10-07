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
    bg: 'bg-red-500/15',
    border: 'border-red-500/30',
    text: 'text-red-300',
    icon: ShieldAlert,
  },
  high: {
    bg: 'bg-rose-500/15',
    border: 'border-rose-500/30',
    text: 'text-rose-300',
    icon: AlertCircle,
  },
  medium: {
    bg: 'bg-amber-500/15',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    icon: AlertTriangle,
  },
  low: {
    bg: 'bg-emerald-500/15',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    icon: CheckCircle2,
  },
  neutral: {
    bg: 'bg-[#1E2533]',
    border: 'border-[#2D384D]',
    text: 'text-[#94A3B8]',
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
  const iconSize = size === 'sm' ? 11 : 13;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium border select-none ${current.bg} ${current.border} ${current.text} ${
        size === 'sm' 
          ? 'px-2 py-0.5 text-[10px]' 
          : 'px-2.5 py-1 text-xs'
      }`}
    >
      {showIcon && <IconComponent size={iconSize} className="shrink-0" aria-hidden="true" />}
      <span>{label}</span>
    </span>
  );
};


