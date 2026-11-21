import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input, Textarea } from '../common/Input';
import { LocalStore } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { ScamCategory, ScamReport } from '@/lib/types';
import { ActiveTab } from '../common/Navbar';
import {
  FileWarning,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  Send,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface ReportScamViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

const SCAM_CATEGORIES: Array<{ id: ScamCategory; label: string }> = [
  { id: 'upi_fraud', label: 'UPI / Payment QR Fraud' },
  { id: 'phishing', label: 'Bank / Phishing Impersonation' },
  { id: 'fake_job', label: 'Fake Job / Telegram Task' },
  { id: 'fake_support', label: 'Fake Tech Support / AnyDesk' },
  { id: 'lottery_prize', label: 'Lottery / Prize Scam' },
  { id: 'investment_scam', label: 'Crypto / Investment Scam' },
  { id: 'account_verification', label: 'Electricity / KYC Suspension' },
  { id: 'other', label: 'Other Cyber Fraud' },
];

const PLATFORMS = [
  'WhatsApp',
  'SMS / Text Message',
  'Telegram',
  'Phone Call',
  'Instagram / Facebook',
  'Email',
  'OLX / Quikr',
  'Website / Web Link',
  'Other',
];

export const ReportScamView: React.FC<ReportScamViewProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();

  const [category, setCategory] = useState<ScamCategory>('upi_fraud');
  const [platform, setPlatform] = useState<string>('WhatsApp');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [suspectContact, setSuspectContact] = useState('');
  const [reporterEmail] = useState(currentUser?.email || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<ScamReport | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Please enter a brief summary or title for this incident.');
      return;
    }
    if (!description.trim() || description.length < 20) {
      setErrorMsg('Please provide a detailed description (at least 20 characters).');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const referenceId = `CS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newReport: ScamReport = {
          id: 'rep-' + Math.random().toString(36).substring(2, 9),
          reference_id: referenceId,
          user_id: currentUser?.id,
          reporter_email: reporterEmail || undefined,
          category,
          title: title.trim(),
          description: description.trim(),
          platform_involved: platform,
          suspect_contact: suspectContact.trim() || undefined,
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        LocalStore.saveScamReport(newReport);
        LocalStore.addAuditLog({
          actor_id: currentUser?.id || 'anonymous',
          actor_email: currentUser?.email || reporterEmail || 'anonymous@community',
          action: 'REPORT_SUBMITTED',
          resource_type: 'SCAM_REPORT',
          resource_id: referenceId,
          details: `Community scam reported: ${title.trim()}`,
        });

        setSubmittedReport(newReport);
      } catch (err: any) {
        setErrorMsg('Failed to record report: ' + (err.message || 'Unknown error'));
      } finally {
        setIsSubmitting(false);
      }
    }, 450);
  };

  const handleReset = () => {
    setTitle('');
    setDescription('');
    setSuspectContact('');
    setSubmittedReport(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
          <FileWarning className="w-3.5 h-3.5" />
          <span>Community Threat Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Report a Suspicious Incident or Scam
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl leading-relaxed">
          Warn fellow citizens and strengthen the CyberShield community heuristic engine. Your report is evaluated by safety analysts to identify emerging cyber fraud campaigns.
        </p>
      </div>

      {/* Emergency Advisory Callout */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/40 via-midnight-900 to-midnight-900 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5 text-rose-400" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
              Did you lose money just now?
            </span>
            <p className="text-xs text-slate-200">
              Filing a report here helps the community, but for immediate fund freezing dial{' '}
              <strong className="text-rose-400 font-mono">1930</strong> right away.
            </p>
          </div>
        </div>
        {onNavigate && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onNavigate('recovery')}
            className="text-xs whitespace-nowrap self-start sm:self-auto"
          >
            Emergency Guide
          </Button>
        )}
      </div>

      {submittedReport ? (
        /* Submission Success Confirmation */
        <Card className="p-8 bg-midnight-900 border-emerald-500/40 space-y-6 glow-emerald">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="text-center space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white">Report Successfully Received</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Thank you for contributing to collective cyber safety. Your incident has been catalogued for heuristic review.
            </p>
            <div className="pt-2">
              <span className="inline-block px-3.5 py-1.5 rounded-lg bg-midnight-950 border border-slate-700 font-mono text-xs text-emerald-400 font-bold">
                Reference ID: {submittedReport.reference_id}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Incident Category:</span>
              <span className="text-slate-200 font-semibold capitalize">{submittedReport.category.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-slate-400">Platform Involved:</span>
              <span className="text-slate-200 font-semibold">{submittedReport.platform_involved}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Status:</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase font-bold text-[10px]">
                Under Review
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleReset}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="text-xs"
            >
              Submit Another Report
            </Button>
            {onNavigate && (
              <Button
                variant="secondary"
                size="md"
                onClick={() => onNavigate('my-reports')}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="text-xs"
              >
                View Community Feed
              </Button>
            )}
          </div>
        </Card>
      ) : (
        /* Report Form */
        <Card variant="elevated" className="p-6 sm:p-8 bg-midnight-900 border-slate-800 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                1. Select Scam Category
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SCAM_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2.5 rounded-xl border text-xs text-left transition-all ${
                      category === cat.id
                        ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300 font-semibold shadow-sm'
                        : 'bg-midnight-950/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Platform & Suspect Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-slate-300">
                  Platform / Channel Involved
                </label>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-lg bg-midnight-950/80 border border-slate-700 text-slate-100 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="Suspect Contact Info (Phone / UPI ID / Link)"
                placeholder="e.g. +91 98765 43210 or user@okhdfcbank"
                value={suspectContact}
                onChange={(e) => setSuspectContact(e.target.value)}
                className="text-xs sm:text-sm font-mono"
              />
            </div>

            {/* Title */}
            <Input
              label="Brief Incident Title"
              placeholder="e.g. Buyer sent QR code on WhatsApp asking to enter PIN to receive money"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xs sm:text-sm"
              required
            />

            {/* Description */}
            <Textarea
              label="Detailed Incident Description"
              placeholder="Describe what occurred: what they said, what links or QR codes they provided, any instructions they gave you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[140px] text-xs sm:text-sm font-sans"
              error={errorMsg}
              required
            />

            {/* Privacy Notice */}
            <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800/80 flex items-center gap-2.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                Personal identifiers (passwords, bank account numbers, OTPs) are strictly scrubbed. Never include real OTPs or passwords in your report.
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500">
                Anonymous submission available
              </span>
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-4 h-4" />}
                className="text-xs font-semibold px-6"
              >
                Submit Incident Report
              </Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
};
