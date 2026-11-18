import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Textarea } from '../common/Input';
import { DetectionResultsView } from './DetectionResultsView';
import { analyzeMessage } from '@/lib/detectionEngine';
import { ScamAnalysisResult } from '@/lib/types';
import { LocalStore } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { SYNTHETIC_SCAM_EXAMPLES, SyntheticExample } from '@/lib/syntheticScamData';
import {
  Search,
  MessageSquare,
  Mail,
  Smartphone,
  Sparkles,
  Trash2,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';

interface ScamDetectorViewProps {
  onReportScam?: () => void;
  onSwitchToOcr?: () => void;
}

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
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Search className="w-3.5 h-3.5" />
          <span>Scam Message Analysis Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Analyze Suspicious Communications
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          Paste any suspicious WhatsApp chat, SMS alert, job offer, or email. The engine parses urgency triggers, payment coercion, and impersonation indicators.
        </p>
      </div>

      {/* Input or Results Area */}
      {!analysisResult ? (
        <Card variant="elevated" className="p-6 bg-navy-900 border-slate-800 space-y-5">
          {/* Input Type Selector Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setInputType('sms_whatsapp')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  inputType === 'sms_whatsapp'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>WhatsApp / SMS</span>
              </button>
              <button
                type="button"
                onClick={() => setInputType('email')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  inputType === 'email'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email / Letter</span>
              </button>
              <button
                type="button"
                onClick={() => setInputType('text')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                  inputType === 'text'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>General Offer</span>
              </button>
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

          {/* Text Input Area */}
          <div className="space-y-2">
            <Textarea
              label="Paste suspicious message or conversation below:"
              placeholder="e.g. 'Dear Customer, your electricity will be disconnected tonight at 9:30 PM. Call officer at 98123-XXXXX or download QuickSupport app...'"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[160px] text-xs sm:text-sm font-sans"
              error={errorMsg}
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>{inputText.length} characters</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Client-safe processing • Consent-governed storage
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={handleAnalyze}
                isLoading={isAnalyzing}
                leftIcon={<Search className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs font-semibold px-6"
              >
                Analyze Message
              </Button>
              {inputText && (
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

          {/* Synthetic Examples Carousel / Quick Pick */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Try Real-World Synthetic Test Scenarios:
              </span>
              <span className="text-[11px] text-slate-500">Click to load</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {SYNTHETIC_SCAM_EXAMPLES.map((ex) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleLoadExample(ex)}
                  className="p-2.5 rounded-lg bg-navy-950/80 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-left transition-all group"
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-medium text-slate-200 group-hover:text-emerald-300 truncate">
                      {ex.title}
                    </span>
                    <span
                      className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                        ex.expectedRisk === 'HIGH_RISK'
                          ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                          : ex.expectedRisk === 'MEDIUM_RISK'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      }`}
                    >
                      {ex.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-[11px] line-clamp-1">
                    {ex.text}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </Card>
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
