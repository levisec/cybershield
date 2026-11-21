import React, { useState } from 'react';
import { Button } from '../common/Button';
import { Textarea } from '../common/Input';
import { DetectionResultsView } from './DetectionResultsView';
import { analyzeMessage } from '@/lib/detectionEngine';
import { ScamAnalysisResult } from '@/lib/types';
import { LocalStore } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { SYNTHETIC_SCAM_EXAMPLES, SyntheticExample } from '@/lib/syntheticScamData';
import { cn } from '@/lib/utils';
import { ActiveTab } from '../common/Navbar';
import {
  Search,
  MessageSquare,
  Mail,
  Smartphone,
  Sparkles,
  Trash2,
  ShieldCheck,
  Image as ImageIcon,
  Lock,
  Cpu,
  Zap,
} from 'lucide-react';

interface ScamDetectorViewProps {
  onReportScam?: () => void;
  onSwitchToOcr?: () => void;
  onNavigate?: (tab: ActiveTab) => void;
}

const PLACEHOLDERS: Record<string, string> = {
  sms_whatsapp:
    "Paste WhatsApp or SMS message here…\n\ne.g. 'Dear Customer, your electricity will be disconnected tonight at 9:30 PM. Call officer at 98123-XXXXX or download QuickSupport app immediately to avoid disconnection.'",
  email:
    "Paste the email body or subject + body here…\n\ne.g. 'Subject: URGENT: Your account has been compromised. Dear User, We have detected unusual activity...'",
  text: "Paste any suspicious job offer, social media message, or general text here…\n\ne.g. 'Work from home and earn ₹5000/day — no experience required. Click here to register now.'",
};

const TRUST_BADGES = [
  { icon: Cpu, label: 'Client-side processing' },
  { icon: Lock, label: 'No data stored without consent' },
  { icon: Zap, label: 'Zero external API calls' },
];

const INPUT_TABS = [
  { id: 'sms_whatsapp' as const, label: 'WhatsApp / SMS', icon: Smartphone },
  { id: 'email' as const, label: 'Email', icon: Mail },
  { id: 'text' as const, label: 'General Text', icon: MessageSquare },
];

export const ScamDetectorView: React.FC<ScamDetectorViewProps> = ({
  onReportScam,
  onSwitchToOcr,
}) => {
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');
  const [inputType, setInputType] = useState<'text' | 'email' | 'sms_whatsapp'>('sms_whatsapp');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<ScamAnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAnalyze = () => {
    setErrorMsg('');
    if (!inputText.trim()) {
      setErrorMsg('Please paste or type the suspicious message before analyzing.');
      return;
    }

    setIsAnalyzing(true);

    // Simulate realistic analysis time for user feedback & state rendering
    setTimeout(() => {
      try {
        const result = analyzeMessage(inputText, inputType);
        setAnalysisResult(result);

        // Save to user scan history if consented and user exists
        if (currentUser && currentUser.save_history_consent) {
          LocalStore.saveAnalysis(result);
        }
      } catch (err: any) {
        setErrorMsg('An error occurred during analysis: ' + (err.message || 'Unknown error'));
      } finally {
        setIsAnalyzing(false);
      }
    }, 400);
  };

  const handleLoadExample = (example: SyntheticExample) => {
    setInputText(example.text);
    setErrorMsg('');
    setAnalysisResult(null);
  };

  const handleClear = () => {
    setInputText('');
    setAnalysisResult(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* ── Header ── */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Search className="w-3.5 h-3.5" />
          <span>AI Scam Detection Engine</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Check a{' '}
            <span className="text-gradient-emerald">Suspicious Message</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
            Paste any WhatsApp message, SMS, email, or job offer. We'll analyze it for scam
            patterns, urgency tactics, and impersonation signals — instantly.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-400 border border-slate-700/60 bg-slate-800/40"
            >
              <Icon className="w-3 h-3 text-emerald-400" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Input or Results ── */}
      {!analysisResult ? (
        <div className="space-y-6">
          {/* Input Card */}
          <div className="glass-panel-elevated rounded-2xl p-6 space-y-5 border border-slate-700/50">
            {/* Type tabs + OCR toggle */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800/60 border border-slate-700/40">
                {INPUT_TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setInputType(id)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200',
                      inputType === id
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                ))}
              </div>

              {onSwitchToOcr && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onSwitchToOcr}
                  leftIcon={<ImageIcon className="w-3.5 h-3.5 text-emerald-400" />}
                  className="text-xs"
                >
                  Upload Screenshot (OCR)
                </Button>
              )}
            </div>

            {/* Textarea with scanning overlay */}
            <div className="space-y-2 relative">
              {isAnalyzing && (
                <div className="absolute inset-0 z-10 rounded-xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-emerald-500/5 animate-pulse" />
                  <div className="scan-beam absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                </div>
              )}
              <Textarea
                label="Paste suspicious message or conversation below:"
                placeholder={PLACEHOLDERS[inputType]}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[180px] text-sm font-sans resize-y"
                error={errorMsg}
              />
              <div className="flex items-center justify-between text-[11px] text-slate-500 px-1">
                <span
                  className={cn(
                    'transition-colors',
                    inputText.length > 0 ? 'text-slate-400' : 'text-slate-600'
                  )}
                >
                  {inputText.length.toLocaleString()} characters
                </span>
                <span className="flex items-center gap-1 text-emerald-500/80">
                  <ShieldCheck className="w-3 h-3" />
                  Processed locally · consent-governed storage
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                isLoading={isAnalyzing}
                leftIcon={<Search className="w-4 h-4" />}
                className="font-semibold px-7"
              >
                {isAnalyzing ? 'Analyzing…' : 'Analyze Message'}
              </Button>
              {inputText && !isAnalyzing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  className="text-xs text-slate-400 hover:text-slate-200"
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Example Scenarios */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Try Real-World Examples
              </h2>
              <span className="text-[11px] text-slate-500">Click any card to load</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SYNTHETIC_SCAM_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleLoadExample(ex)}
                  className={cn(
                    'group text-left p-4 rounded-xl border transition-all duration-200',
                    'bg-slate-900/60 border-slate-800',
                    'hover:border-emerald-500/30 hover:bg-slate-800/60',
                    'hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]'
                  )}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-1">
                      {ex.title}
                    </span>
                    <span
                      className={cn(
                        'shrink-0 text-[9px] uppercase font-bold px-1.5 py-0.5 rounded border',
                        ex.expectedRisk === 'HIGH_RISK'
                          ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                          : ex.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                          : 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                      )}
                    >
                      {ex.tag}
                    </span>
                  </div>
                  <p className="text-[12px] text-slate-400 line-clamp-2 leading-relaxed">
                    {ex.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Render Analysis Report */
        <DetectionResultsView
          analysis={analysisResult}
          onReset={handleClear}
          onReportScam={onReportScam}
        />
      )}
    </div>
  );
};
