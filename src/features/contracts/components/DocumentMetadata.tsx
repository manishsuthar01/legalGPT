import React from 'react';
import { FileCheck, ShieldAlert, Scale, Calendar } from 'lucide-react';

interface DocumentMetadataProps {
  clauseCount: number;
  riskScore: number;
}

export const DocumentMetadata: React.FC<DocumentMetadataProps> = ({ clauseCount, riskScore }) => {
  const getRiskStatus = (score: number) => {
    if (score >= 70) return { label: 'High Exposure', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' };
    if (score >= 40) return { label: 'Moderate Exposure', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    return { label: 'Low Exposure', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  };

  const riskStatus = getRiskStatus(riskScore);

  const stats = [
    { 
      label: 'Clauses Audited', 
      value: clauseCount, 
      unit: 'discrete obligations',
      icon: FileCheck,
      iconColor: 'text-[#4B72C2]'
    },
    { 
      label: 'Liability Index', 
      value: `${riskScore}`, 
      unit: '/ 100 max exposure',
      badge: riskStatus.label,
      badgeColor: riskStatus.color,
      icon: ShieldAlert,
      iconColor: riskScore >= 70 ? 'text-rose-400' : riskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'
    },
    { 
      label: 'Audit Timestamp', 
      value: 'Current Session', 
      unit: 'In-memory review',
      icon: Calendar,
      iconColor: 'text-[#C49B55]'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-5 select-none">
      {stats.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={idx} 
            className="bg-[#0F1218] border border-[#1E2533] hover:border-[#283244] rounded-lg p-3 sm:p-4 flex flex-col justify-between transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#636F83] text-[10px] font-bold uppercase tracking-wider">
                {stat.label}
              </span>
              <div className="w-6 h-6 rounded-md bg-[#161B23] border border-[#222938] flex items-center justify-center">
                <IconComponent size={13} className={stat.iconColor} aria-hidden="true" />
              </div>
            </div>

            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-[#F1F4F8] text-lg sm:text-xl font-semibold font-mono tracking-tight">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="text-[#636F83] text-xs font-mono">
                  {stat.unit}
                </span>
              )}
            </div>

            {stat.badge && (
              <div className="mt-2 pt-2 border-t border-[#181E29]">
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold uppercase tracking-wider font-mono border ${stat.badgeColor}`}>
                  {stat.badge}
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
