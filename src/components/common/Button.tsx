import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.97]';

  const variants = {
    primary:
      'bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-semibold shadow-sm hover:shadow-emerald-500/20 shadow-emerald-500/10',
    secondary:
      'bg-navy-800 hover:bg-navy-750 text-slate-100 border border-slate-700/60 hover:border-slate-600',
    outline:
      'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:text-white',
    ghost:
      'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white',
    danger:
      'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:border-rose-500/50',
    cyber:
      'bg-transparent border border-emerald-500/60 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 hover:shadow-glow-sm',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-6 py-2.5 gap-2.5 font-semibold',
    xl: 'text-base px-8 py-3.5 gap-3 font-semibold',
  };

  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
};
