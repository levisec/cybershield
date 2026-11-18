import React from 'react';
import { ShieldAlert, ShieldCheck, AlertTriangle, HelpCircle } from 'lucide-react';
import { RiskClassification } from '@/lib/types';
import { cn } from '@/lib/utils';

interface RiskBadgeProps {
  level: RiskClassification;
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({
  level,
  showIcon = true,
  size = 'md',
  className,
}) => {
  const configs: Record<
    RiskClassification,
    { label: string; bg: string; text: string; border: string; icon: React.ReactNode }
  > = {
    LOW_RISK: {
      label: 'Low Risk',
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    MEDIUM_RISK: {
      label: 'Medium Risk',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      icon: <AlertTriangle className="w-4 h-4 text-amber-400" />,
    },
    HIGH_RISK: {
      label: 'High Risk',
      bg: 'bg-rose-500/10',
      text: 'text-rose-400',
      border: 'border-rose-500/30',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400" />,
    },
    UNABLE_TO_DETERMINE: {
      label: 'Unable to Determine',
      bg: 'bg-slate-500/10',
      text: 'text-slate-400',
      border: 'border-slate-500/30',
      icon: <HelpCircle className="w-4 h-4 text-slate-400" />,
    },
  };

  const config = configs[level] || configs.UNABLE_TO_DETERMINE;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-sm px-2.5 py-1 gap-1.5',
    lg: 'text-base px-3.5 py-1.5 gap-2 font-semibold',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium border transition-colors',
        config.bg,
        config.text,
        config.border,
        sizeClasses[size],
        className
      )}
    >
      {showIcon && config.icon}
      <span>{config.label}</span>
    </span>
  );
};
