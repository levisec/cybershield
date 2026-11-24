import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { LocalStore } from '@/lib/supabase';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { RiskBadge } from '../common/RiskBadge';
import { PersonalSecurityChecklist } from './PersonalSecurityChecklist';
import { ActiveTab } from '../common/Navbar';
import { formatDate } from '@/lib/utils';
import {
  LayoutDashboard,
  Search,
  Globe,
  FileWarning,
  History,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface UserDashboardViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const analyses = LocalStore.getAnalyses();
  const urlChecks = LocalStore.getUrlChecks();

  // Compute stats from real stored user items (never fabricated!)
  const totalScans = analyses.length + urlChecks.length;
  const highRiskCount =
    analyses.filter((a) => a.risk_level === 'HIGH_RISK').length +
    urlChecks.filter((u) => u.risk_level === 'HIGH_RISK').length;

  const mediumRiskCount =
    analyses.filter((a) => a.risk_level === 'MEDIUM_RISK').length +
    urlChecks.filter((u) => u.risk_level === 'MEDIUM_RISK').length;

  const lowRiskCount =
    analyses.filter((a) => a.risk_level === 'LOW_RISK').length +
    urlChecks.filter((u) => u.risk_level === 'LOW_RISK').length;

  const recentScans = analyses.slice(0, 3);
  const recentUrls = urlChecks.slice(0, 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-14 animate-fade-in">
      {/* Welcome Banner with Generous Whitespace */}
      <div className="rounded-3xl bg-gradient-to-r from-midnight-850 via-midnight-900 to-midnight-900 border border-slate-700/80 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8 shadow-2xl shadow-black/40">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <LayoutDashboard className="w-4 h-4" />
            <span>Cyber Defense Command</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome back, {currentUser?.display_name || currentUser?.email.split('@')[0] || 'User'}
          </h1>
          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            Monitor your personal scans, track your cyber defense readiness checklist, and quickly verify any suspicious incoming messages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={() => onNavigate('detector')}
            leftIcon={<Search className="w-4 h-4" />}
            className="text-xs font-semibold px-5 py-2.5 shadow-lg shadow-emerald-500/20"
          >
            New Scam Scan
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={() => onNavigate('url-checker')}
            leftIcon={<Globe className="w-4 h-4 text-emerald-400" />}
            className="text-xs px-5 py-2.5"
          >
            Check URL
          </Button>
        </div>
      </div>

      {/* Real Statistics Cards with Generous Spacing */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-midnight-900 border-slate-800 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Total Inquiries
          </span>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-white">
              {totalScans}
            </span>
            <span className="text-xs text-slate-500">inspected</span>
          </div>
        </Card>

        <Card className="p-6 bg-midnight-900 border-rose-500/30 space-y-2">
          <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            High Risk Blocked
          </span>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-rose-400">
              {highRiskCount}
            </span>
            <span className="text-xs text-rose-300/70">threats spotted</span>
          </div>
        </Card>

        <Card className="p-6 bg-midnight-900 border-amber-500/30 space-y-2">
          <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
            Medium Caution
          </span>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-amber-400">
              {mediumRiskCount}
            </span>
            <span className="text-xs text-amber-300/70">suspicious flags</span>
          </div>
        </Card>

        <Card className="p-6 bg-midnight-900 border-emerald-500/30 space-y-2">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            Safe Benchmarks
          </span>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-emerald-400">
              {lowRiskCount}
            </span>
            <span className="text-xs text-emerald-300/70">low risk</span>
          </div>
        </Card>
      </div>

      {/* Main Grid with Generous Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
        {/* Left Column: Personal Security Readiness Checklist (IKEA & Goal Gradient Effects) */}
        <div className="lg:col-span-7 space-y-6">
          <PersonalSecurityChecklist />

          {/* Emergency 1930 Helpline Quick Card */}
          <Card className="p-5 bg-gradient-to-r from-rose-950/30 to-midnight-900 border border-rose-500/30 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-300 px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/30">
                Helpline 1930
              </span>
              <h4 className="text-sm font-bold text-white">
                Fallen for an online scam or banking fraud?
              </h4>
              <p className="text-xs text-slate-300">
                Access step-by-step incident recovery guides and the Golden Hour emergency response checklist.
              </p>
            </div>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onNavigate('recovery')}
              className="text-xs whitespace-nowrap"
            >
              Open Recovery
            </Button>
          </Card>
        </div>

        {/* Right Column: Recent Activity & Quick Tools */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Scans Box */}
          <Card className="p-6 bg-midnight-900 border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-400" />
                Recent Analyses
              </h3>
              <button
                onClick={() => onNavigate('scan-history')}
                className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-medium"
              >
                View all ({totalScans}) <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {totalScans === 0 ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-12 h-12 rounded-xl bg-midnight-950 border border-slate-800 text-slate-500 mx-auto flex items-center justify-center">
                  <Search className="w-5 h-5" />
                </div>
                <p className="text-xs text-slate-400">No scans recorded yet.</p>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => onNavigate('detector')}
                  className="text-xs"
                >
                  Start Your First Scan
                </Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="p-3 rounded-xl bg-midnight-950/80 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <RiskBadge level={scan.risk_level} size="sm" />
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatDate(scan.created_at)}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] line-clamp-1 font-mono">
                      "{scan.content_preview}"
                    </p>
                  </div>
                ))}

                {recentUrls.map((url) => (
                  <div
                    key={url.id}
                    className="p-3 rounded-xl bg-midnight-950/80 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <RiskBadge level={url.risk_level} size="sm" />
                      <span className="text-[10px] text-slate-500 font-mono">
                        {formatDate(url.created_at)}
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] truncate font-mono">
                      🌐 {url.submitted_url}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Quick Shortcuts */}
          <Card className="p-6 bg-midnight-900 border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-sm">Quick Safety Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => onNavigate('awareness')}
                className="p-3 rounded-xl bg-midnight-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-left transition-colors space-y-1"
              >
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-slate-200 block">Safety Quizzes</span>
                <span className="text-[10px] text-slate-400 block">Test instincts</span>
              </button>
              <button
                onClick={() => onNavigate('report-scam')}
                className="p-3 rounded-xl bg-midnight-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 text-left transition-colors space-y-1"
              >
                <FileWarning className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-slate-200 block">Report Scam</span>
                <span className="text-[10px] text-slate-400 block">Warn others</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
