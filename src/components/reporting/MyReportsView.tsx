import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LocalStore } from '@/lib/supabase';
import { ScamReport } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ActiveTab } from '../common/Navbar';
import {
  FileWarning,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from 'lucide-react';

interface MyReportsViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

export const MyReportsView: React.FC<MyReportsViewProps> = ({ onNavigate }) => {
  const [reports] = useState<ScamReport[]>(() => LocalStore.getScamReports());
  const [statusFilter, setStatusFilter] = useState<'all' | ScamReport['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = reports.filter((r) => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.reference_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.platform_involved?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ScamReport['status']) => {
    switch (status) {
      case 'verified_scam':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30">
            <ShieldAlert className="w-3 h-3 text-rose-400" />
            Verified Scam
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Clock className="w-3 h-3 text-amber-400" />
            Under Review
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Resolved
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <FileWarning className="w-3.5 h-3.5" />
            <span>Community Feed & Incident Registry</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Scam Incident Reports</h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Browse verified scam patterns reported by community members and track ongoing investigations.
          </p>
        </div>

        {onNavigate && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => onNavigate('report-scam')}
            leftIcon={<Plus className="w-4 h-4" />}
            className="text-xs font-semibold self-start sm:self-auto"
          >
            Report New Scam
          </Button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-2 rounded-xl bg-midnight-900 border border-slate-800">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 text-xs">
          {(['all', 'verified_scam', 'under_review', 'pending'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all capitalize whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-slate-800 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search reports or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-midnight-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-midnight-900 border border-slate-800 space-y-3">
            <FileWarning className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No reports match your filter</h3>
            <p className="text-xs text-slate-400">Try adjusting your search query or status filter.</p>
          </div>
        ) : (
          filteredReports.map((report) => (
            <Card
              key={report.id}
              className="p-5 sm:p-6 bg-midnight-900/90 border-slate-800 hover:border-slate-700 transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {getStatusBadge(report.status)}
                  <span className="font-mono text-xs text-emerald-400 font-semibold bg-midnight-950 px-2 py-0.5 rounded border border-slate-800">
                    {report.reference_id}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/60">
                    {report.category.replace('_', ' ')}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">
                  Reported {formatDate(report.created_at)}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-white leading-snug">
                  {report.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {report.description}
                </p>
              </div>

              {/* Suspect & Platform Metadata */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                {report.platform_involved && (
                  <span className="px-2.5 py-1 rounded-lg bg-midnight-950 border border-slate-800 text-slate-300 text-[11px]">
                    Channel: <strong className="text-slate-100">{report.platform_involved}</strong>
                  </span>
                )}
                {report.suspect_contact && (
                  <span className="px-2.5 py-1 rounded-lg bg-rose-950/20 border border-rose-500/30 text-rose-300 font-mono text-[11px]">
                    Suspect info: <strong>{report.suspect_contact}</strong>
                  </span>
                )}
              </div>

              {/* Admin Note if verified */}
              {report.admin_notes && (
                <div className="p-3 rounded-xl bg-midnight-950 border border-slate-800 text-xs space-y-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                    Verified Analysis Note:
                  </span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {report.admin_notes}
                  </p>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
