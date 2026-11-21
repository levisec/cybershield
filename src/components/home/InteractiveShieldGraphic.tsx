import React, { useState } from 'react';
import { ShieldCheck, Lock, Smartphone, AlertTriangle, Activity, CheckCircle2 } from 'lucide-react';

export const InteractiveShieldGraphic: React.FC = () => {
  const [activeChip, setActiveChip] = useState<'upi' | 'kyc' | 'job' | null>('upi');

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center select-none">
      {/* Ambient background glow rings */}
      <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-[90px] animate-pulse-subtle pointer-events-none" />
      <div className="absolute inset-8 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />

      {/* Concentric Radar Grid Rings */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-slate-800/80 pointer-events-none" />
      <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full border border-emerald-500/10 pointer-events-none" />
      <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-cyan-500/15 pointer-events-none" />

      {/* Sweeping Scanner Radar Beam */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none overflow-hidden opacity-30">
        <div className="w-full h-1/2 bg-gradient-to-b from-transparent to-emerald-400/20 origin-bottom animate-spin [animation-duration:8s]" />
      </div>

      {/* Central Cybersecurity Shield Unit */}
      <div className="relative z-10 w-44 h-52 sm:w-56 sm:h-64 rounded-3xl bg-gradient-to-b from-midnight-800 via-midnight-850 to-midnight-950 border border-emerald-500/40 shadow-2xl shadow-emerald-950/40 p-5 flex flex-col items-center justify-center text-center">
        {/* Top Status LED */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>SHIELD_ONLINE</span>
        </div>

        {/* Dynamic SVG Shield Emblem */}
        <div className="relative mb-3">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/10 to-transparent border border-emerald-500/40 flex items-center justify-center glow-emerald">
            <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
          </div>
        </div>

        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
            Heuristic Threat Engine
          </h4>
          <p className="text-[10px] font-mono text-slate-400">Zero-Visit Safe Parser</p>
        </div>

        <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-300 bg-midnight-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>Analyzing Linguistic Triggers</span>
        </div>
      </div>

      {/* Floating Interactive Threat Chip 1: UPI Reverse Trap */}
      <div
        onClick={() => setActiveChip('upi')}
        className={`absolute -top-2 left-0 sm:left-2 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'upi'
            ? 'bg-rose-950/80 border-rose-500/50 text-rose-200 glow-danger scale-105'
            : 'bg-midnight-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Smartphone className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">UPI "Receive" Request</span>
        </div>
        <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
          "Scan QR code and enter UPI PIN to receive ₹15,000 refund"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-rose-400 font-bold uppercase">
          <AlertTriangle className="w-2.5 h-2.5" /> High Risk Detected
        </div>
      </div>

      {/* Floating Interactive Threat Chip 2: Bank KYC Phishing */}
      <div
        onClick={() => setActiveChip('kyc')}
        className={`absolute bottom-4 -left-2 sm:left-0 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'kyc'
            ? 'bg-amber-950/80 border-amber-500/50 text-amber-200 glow-cyan scale-105'
            : 'bg-midnight-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">Bank KYC Deactivation</span>
        </div>
        <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
          "Account blocked in 12h. Click http://sbi-kyc.xyz to update"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-amber-400 font-bold uppercase">
          <AlertTriangle className="w-2.5 h-2.5" /> Phishing Link Blocked
        </div>
      </div>

      {/* Floating Interactive Threat Chip 3: Legitimate Benchmark */}
      <div
        onClick={() => setActiveChip('job')}
        className={`absolute top-12 -right-2 sm:right-0 cursor-pointer z-20 p-2.5 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs shadow-lg max-w-[190px] sm:max-w-[210px] ${
          activeChip === 'job'
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200 glow-emerald scale-105'
            : 'bg-midnight-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="font-semibold text-[11px] truncate">Official Bank SMS</span>
        </div>
        <p className="text-[10px] text-slate-300 line-clamp-2 leading-tight">
          "A/C debited by INR 350 at Cafe. Avail bal: INR 14,290"
        </p>
        <div className="mt-1 flex items-center gap-1 text-[9px] text-emerald-400 font-bold uppercase">
          <ShieldCheck className="w-2.5 h-2.5" /> Low Risk Verified
        </div>
      </div>
    </div>
  );
};
