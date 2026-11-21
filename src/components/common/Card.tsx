import React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'interactive' | 'accent';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  ...props
}) => {
  const baseClasses =
    'rounded-2xl transition-all duration-200 text-slate-100 overflow-hidden';

  const variants = {
    default:
      'glass-panel border-slate-800/60',
    elevated:
      'glass-panel-elevated',
    interactive:
      'glass-panel-interactive cursor-pointer',
    accent:
      'bg-gradient-to-b from-midnight-850 to-midnight-900 border border-emerald-500/30 shadow-xl shadow-emerald-950/20',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(baseClasses, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};
