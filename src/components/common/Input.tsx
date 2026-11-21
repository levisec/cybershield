import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-lg bg-midnight-950/80 border border-slate-700/80 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-slate-300">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-lg bg-midnight-950/80 border border-slate-700/80 text-slate-100 placeholder:text-slate-500 transition-all duration-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed min-h-[120px] resize-y',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 focus:shadow-[0_0_15px_rgba(244,63,94,0.15)]',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-rose-400">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-slate-400">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';
