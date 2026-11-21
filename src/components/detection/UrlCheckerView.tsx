import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { DetectionResultsView } from './DetectionResultsView';
import { analyzeUrl } from '@/lib/urlCheckerEngine';
import { UrlCheckResult } from '@/lib/types';
import { LocalStore } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import {
  Globe,
  Search,
  Trash2,
  Sparkles,
  Lock,
} from 'lucide-react';
import { ActiveTab } from '../common/Navbar';

interface UrlCheckerViewProps {
  onReportScam?: () => void;
  onNavigate?: (tab: ActiveTab) => void;
}

export const UrlCheckerView: React.FC<UrlCheckerViewProps> = ({ onReportScam }) => {
  const { currentUser } = useAuth();
  const [inputUrl, setInputUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [checkResult, setCheckResult] = useState<UrlCheckResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const sampleUrls = [
    {
      label: 'Bank Phishing Fake TLD',
      url: 'https://sbi-kyc-reactivate.xyz/login/verify-pan',
      type: 'High Risk',
    },
    {
      label: 'Lookalike Brand Squatting',
      url: 'http://paypa1-security-verification.top/update',
      type: 'High Risk',
    },
    {
      label: 'Private RFC1918 / SSRF Probe',
      url: 'http://192.168.1.1/admin/router',
      type: 'Blocked / High',
    },
    {
      label: 'Deep Subdomain Masking',
      url: 'http://login.security.account.update.hdfcbank.security-portal.online/auth',
      type: 'High Risk',
    },
    {
      label: 'Authentic Official Site',
      url: 'https://www.cybercrime.gov.in',
      type: 'Safe Benchmark',
    },
  ];

  const handleAnalyze = () => {
    setErrorMsg('');
    if (!inputUrl.trim()) {
      setErrorMsg('Please enter a web address or domain to analyze.');
      return;
    }

    setIsAnalyzing(true);

    setTimeout(() => {
      try {
        const result = analyzeUrl(inputUrl);
        setCheckResult(result);

        if (currentUser && currentUser.save_history_consent) {
          LocalStore.saveUrlCheck(result);
        }
      } catch (err: any) {
        setErrorMsg('Error evaluating URL: ' + (err.message || 'Unknown error'));
      } finally {
        setIsAnalyzing(false);
      }
    }, 350);
  };

  const handleClear = () => {
    setInputUrl('');
    setCheckResult(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
          <Globe className="w-3.5 h-3.5" />
          <span>Web Link & Domain Security Inspection</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Suspicious URL & Phishing Link Checker
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          Paste any link received in an email, message, or social media post. CyberShield checks for lookalike brand names, deceptive homoglyphs, suspicious domain extensions, and private SSRF routing without navigating or visiting the target site.
        </p>
      </div>

      {!checkResult ? (
        <Card variant="elevated" className="p-6 bg-navy-900 border-slate-800 space-y-5">
          <div className="space-y-3">
            <Input
              label="Enter suspicious URL or website link:"
              placeholder="e.g. https://sbi-kyc-reactivate.xyz/login"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              error={errorMsg}
              className="text-xs sm:text-sm font-mono"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                Zero-Visit Architecture: Safe from server-side exploits & malicious scripts
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleAnalyze}
              isLoading={isAnalyzing}
              leftIcon={<Search className="w-4 h-4" />}
              className="text-xs font-semibold px-6"
            >
              Inspect Link
            </Button>
            {inputUrl && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                className="text-xs text-slate-400"
              >
                Clear
              </Button>
            )}
          </div>

          {/* Quick Test Samples */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Quick Synthetic Test Addresses:
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {sampleUrls.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputUrl(s.url);
                    setErrorMsg('');
                    setCheckResult(null);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-navy-950 border border-slate-800 hover:border-slate-700 text-left transition-colors text-xs flex items-center gap-2 group"
                >
                  <span className="font-mono text-slate-300 group-hover:text-emerald-300 text-[11px]">
                    {s.label}
                  </span>
                  <span
                    className={`text-[9px] uppercase font-bold px-1.5 py-0.2 rounded border ${
                      s.type.includes('High')
                        ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                        : s.type.includes('Blocked')
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                    }`}
                  >
                    {s.type}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Card>
      ) : (
        <DetectionResultsView
          urlCheck={checkResult}
          onReset={handleClear}
          onReportScam={onReportScam}
        />
      )}
    </div>
  );
};
