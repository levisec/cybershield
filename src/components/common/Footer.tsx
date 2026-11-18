import React from 'react';
import { Shield, PhoneCall, ExternalLink, Heart, AlertCircle, FileText, Lock } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800 bg-navy-950 text-slate-400 text-xs">
      {/* Top Disclaimer Band */}
      <div className="bg-navy-900/60 border-b border-slate-800/80 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Ethical Notice:</strong> CyberShield provides educational risk assessments based on common scam patterns. It does not replace official law enforcement, cybersecurity forensic investigation, or banking fraud response.
            </span>
          </div>
          <div className="flex items-center gap-2 text-rose-300 font-medium">
            <span>India Cyber Fraud Emergency:</span>
            <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
              Dial 1930
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => onSelectTab('home')}
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                Cyber<span className="text-emerald-400">Shield</span>
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              Accessible, human-first cybersecurity intelligence designed for students, parents, seniors, freelancers, and small businesses. Empowering everyday users to safely navigate digital communications.
            </p>
            <div className="pt-2 text-slate-400 text-[11px]">
              <span className="inline-block px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                Detect • Understand • Protect
              </span>
            </div>
          </div>

          {/* Core Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase">
              Core Capabilities
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('detector')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Scam Message Detector
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('url-checker')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Suspicious URL Checker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('report-scam')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Report Scam Experience
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('awareness')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Interactive Quizzes
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Official Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase">
              Emergency Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('recovery')}
                  className="text-rose-400 hover:text-rose-300 font-medium transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  Helpline 1930 Guide
                </button>
              </li>
              <li>
                <a
                  href="https://cybercrime.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  National Cyber Crime Portal
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sancharsaathi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  DoT Chakshu (Fraud SMS)
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://sachet.rbi.org.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  RBI Sachet (Banking Safety)
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase">
              Trust & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectTab('privacy')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-slate-500" />
                  Privacy Policy & Data Rights
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('terms')}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3 h-3 text-slate-500" />
                  Terms of Service & Disclaimer
                </button>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px] pt-1">
                  Zero automatic text logging without user consent. Safe client-side OCR.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} CyberShield Platform. Built for digital public defense.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              Defensive Open Architecture <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
