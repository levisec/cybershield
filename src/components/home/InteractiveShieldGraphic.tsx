import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, AlertTriangle, Activity, CheckCircle2, Info } from 'lucide-react';

export const InteractiveShieldGraphic: React.FC = () => {
  const [activeChip, setActiveChip] = useState<'upi' | 'kyc' | 'job' | null>('upi');

  const chipDetails = {
    upi: {
      title: 'UPI Reverse-Charge Fraud',
      desc: 'Entering your UPI PIN is only used to SEND money, never to receive. Scammers trick sellers on OLX into scanning QR codes to "receive advance money".',
      verdict: 'High Risk • Malicious',
      color: 'text-rose-400',
    },
    kyc: {
      title: 'Bank KYC Phishing Link',
      desc: 'Banks never send SMS links with disposable .xyz / .top domains to update PAN or reactivate suspended NetBanking accounts.',
      verdict: 'High Risk • Impersonation',
      color: 'text-amber-400',
    },
    job: {
      title: 'Authentic Bank Transaction',
      desc: 'Standard debit SMS with reference ID, merchant name, and balance info. No request to click unknown links or reveal credentials.',
      verdict: 'Low Risk • Legitimate Benchmark',
      color: 'text-emerald-400',
    },
  };

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center select-none py-6">
      {/* Ambient background glow rings */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-[90px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute inset-8 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />

      {/* Concentric Radar Grid Rings */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-slate-700/50 dark:border-slate-800/80 pointer-events-none" />
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-emerald-500/15 pointer-events-none" />
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-cyan-500/20 pointer-events-none" />

      {/* Sweeping Scanner Radar Beam */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none overflow-hidden opacity-25">
        <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-emerald-400/20 origin-bottom animate-spin [animation-duration:8s]" />
      </div>

      {/* Central Cybersecurity Shield Unit */}
      <div className="relative z-10 w-48 h-56 sm:w-60 sm:h-68 rounded-3xl bg-white/90 dark:bg-gradient-to-b dark:from-midnight-800 dark:via-midnight-850 dark:to-midnight-950 border border-slate-200 dark:border-emerald-500/40 shadow-2xl shadow-slate-900/10 dark:shadow-emerald-950/40 p-5 flex flex-col items-center justify-center text-center backdrop-blur-md">
        {/* Top Status LED */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span>CYBER_SHIELD_V2</span>
        </div>

        {/* Dynamic SVG Shield Emblem */}
        <div className="relative mb-2">
          <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent border border-emerald-500/40 flex items-center justify-center glow-emerald">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>

        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-wide">
            Heuristic Threat Engine
          </h4>
          <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Zero-Visit Safe Parser</p>
        </div>

        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-midnight-950/80 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-800">
          <Activity className="w-3 h-3 text-emerald-500 dark:text-emerald-400 animate-pulse" />
          <span>Active Pattern Heuristics</span>
        </div>
      </div>

      {/* Floating Interactive Threat Chip 1: UPI Reverse Trap */}
      <div
        onClick={() => setActiveChip('upi')}
        className={`absolute -top-3 left-0 sm:left-2 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'upi'
            ? 'bg-rose-50/95 dark:bg-rose-950/85 border-rose-500/60 text-rose-900 dark:text-rose-200 glow-danger scale-105 ring-2 ring-rose-500/30'
            : 'bg-white/90 dark:bg-midnight-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Smartphone className="w-3.5 h-3.5 text-rose-500 dark:text-rose-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">UPI "Receive" Request</span>
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
          "Scan QR code and enter UPI PIN to receive ₹15,000"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-rose-600 dark:text-rose-400 font-bold uppercase">
          <AlertTriangle className="w-2.5 h-2.5" /> High Risk Detected
        </div>
      </div>

      {/* Floating Interactive Threat Chip 2: Bank KYC Phishing */}
      <div
        onClick={() => setActiveChip('kyc')}
        className={`absolute bottom-2 -left-2 sm:left-0 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'kyc'
            ? 'bg-amber-50/95 dark:bg-amber-950/85 border-amber-500/60 text-amber-900 dark:text-amber-200 glow-cyan scale-105 ring-2 ring-amber-500/30'
            : 'bg-white/90 dark:bg-midnight-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Lock className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">Bank KYC Deactivation</span>
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
          "Account blocked in 12h. Click http://sbi-kyc.xyz"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-amber-600 dark:text-amber-400 font-bold uppercase">
          <AlertTriangle className="w-2.5 h-2.5" /> Phishing Link Blocked
        </div>
      </div>

      {/* Floating Interactive Threat Chip 3: Legitimate Benchmark */}
      <div
        onClick={() => setActiveChip('job')}
        className={`absolute top-10 -right-2 sm:right-0 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'job'
            ? 'bg-emerald-50/95 dark:bg-emerald-950/85 border-emerald-500/60 text-emerald-900 dark:text-emerald-200 glow-emerald scale-105 ring-2 ring-emerald-500/30'
            : 'bg-white/90 dark:bg-midnight-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">Official Bank SMS</span>
        </div>
        <p className="text-[10px] text-slate-600 dark:text-slate-300 line-clamp-2 leading-tight">
          "A/C debited by INR 350. Avail bal: INR 14,290"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">
          <ShieldCheck className="w-2.5 h-2.5" /> Low Risk Verified
        </div>
      </div>

      {/* Selected Chip Explanatory Insight Footer */}
      {activeChip && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-sm text-center px-4 py-2 rounded-xl bg-white/90 dark:bg-midnight-900/90 border border-slate-200 dark:border-slate-800 text-[11px] shadow-md backdrop-blur-md animate-in fade-in duration-200">
          <span className="font-semibold text-slate-900 dark:text-white flex items-center justify-center gap-1">
            <Info className="w-3 h-3 text-emerald-500" />
            {chipDetails[activeChip].title}: <span className={chipDetails[activeChip].color}>{chipDetails[activeChip].verdict}</span>
          </span>
          <p className="text-slate-600 dark:text-slate-400 text-[10px] mt-0.5 line-clamp-2">
            {chipDetails[activeChip].desc}
          </p>
        </div>
      )}
    </div>
  );
};
