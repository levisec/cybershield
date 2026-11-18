import React from 'react';
import { FileText, AlertTriangle, ShieldCheck, CheckCircle } from 'lucide-react';
import { Card } from '../common/Card';

export const TermsOfServiceView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
          <FileText className="w-3.5 h-3.5 text-emerald-400" />
          <span>Terms of Service & Disclaimer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Terms of Service & Disclaimer
        </h1>
        <p className="text-slate-400 text-sm">
          Please read these terms carefully before utilizing CyberShield services.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            1. No Guarantee of 100% Protection
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            CyberShield provides threat indicators, pattern recognition, and educational guidance. <strong>We do not, and cannot, guarantee 100% scam detection or complete immunity from cyber threats.</strong> Cybercriminals continually evolve their evasion techniques. The absence of detected red flags does not conclusively verify that a message or web domain is safe.
          </p>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            2. Not an Official Law Enforcement Authority
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            CyberShield is an independent educational cybersecurity platform. Submitting a report or scan on this platform does <strong>not</strong> constitute an official First Information Report (FIR) or formal complaint to any police department, cyber cell, or financial regulator. If you have been defrauded, you must promptly register a complaint with your bank and official government portals (e.g. cybercrime.gov.in or Helpline 1930 in India).
          </p>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-blue-400" />
            3. Permissible Use
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            You agree to use CyberShield exclusively for defensive, educational, and fraud verification purposes. You may not attempt to reverse engineer the detection engine to design bypass tools, exploit server infrastructure, generate denial-of-service loads, or probe internal networks.
          </p>
        </Card>
      </div>
    </div>
  );
};
