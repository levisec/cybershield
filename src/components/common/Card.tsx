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
    'rounded-xl border transition-all duration-200 text-slate-100 overflow-hidden';

  const variants = {
    default:
      'bg-navy-900/80 border-slate-800/80 backdrop-blur-sm',
    elevated:
      'bg-navy-850 border-slate-700/60 shadow-xl shadow-black/40',
    interactive:
      'bg-navy-900/90 border-slate-800 hover:border-slate-700 hover:bg-navy-850 cursor-pointer hover:shadow-lg hover:shadow-emerald-950/20',
    accent:
      'bg-gradient-to-b from-navy-850 to-navy-900 border-emerald-500/30 shadow-lg shadow-emerald-950/20',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
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
