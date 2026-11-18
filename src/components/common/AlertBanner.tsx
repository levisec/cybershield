import React from 'react';
import { AlertTriangle, Info, CheckCircle2, XCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AlertBannerProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  className?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  type = 'info',
  title,
  children,
  onDismiss,
  className,
}) => {
  const configs = {
    info: {
      bg: 'bg-cyan-950/30 border-cyan-500/30 text-cyan-200',
      icon: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-950/30 border-amber-500/30 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    },
    error: {
      bg: 'bg-rose-950/30 border-rose-500/30 text-rose-200',
      icon: <XCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    },
    success: {
      bg: 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
  };

  const config = configs[type];

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm text-sm',
        config.bg,
        className
      )}
      role="alert"
    >
      {config.icon}
      <div className="flex-1 space-y-0.5">
        {title && <h4 className="font-semibold text-slate-100">{title}</h4>}
        <div className="text-slate-300 leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
