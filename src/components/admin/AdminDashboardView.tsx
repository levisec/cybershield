import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { LocalStore } from '@/lib/supabase';
import { ScamReport, AuditLogEntry } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { ActiveTab } from '../common/Navbar';
import {
  ShieldAlert,
  Activity,
} from 'lucide-react';

interface AdminDashboardViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = () => {
  const [reports, setReports] = useState<ScamReport[]>(() => LocalStore.getScamReports());
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => LocalStore.getAuditLogs());
  const [activeTab, setActiveTab] = useState<'reports' | 'audit'>('reports');
  const [adminNote, setAdminNote] = useState('');

  const handleUpdateStatus = (id: string, newStatus: ScamReport['status']) => {
    LocalStore.updateScamReportStatus(id, newStatus, adminNote || undefined);
    LocalStore.addAuditLog({
      actor_id: 'admin',
      actor_email: 'admin@cybershield.org',
      action: 'STATUS_UPDATE',
      resource_type: 'SCAM_REPORT',
      resource_id: id,
      details: `Status set to ${newStatus}. Note: ${adminNote || 'None'}`,
    });

    setReports(LocalStore.getScamReports());
    setAuditLogs(LocalStore.getAuditLogs());
    setAdminNote('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold border border-purple-500/20">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Administrative Incident Command</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Threat Triage & Operations</h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Review submitted citizen scam reports, verify emerging indicators, and inspect audit trails.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-midnight-900 border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'reports'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Incident Reports ({reports.length})
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'audit'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Logs ({auditLogs.length})
          </button>
        </div>
      </div>

      {activeTab === 'reports' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((r) => (
              <Card
                key={r.id}
                className="p-5 bg-midnight-900 border-slate-800 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs text-purple-400 bg-purple-950/40 px-2 py-0.5 rounded border border-purple-500/30 font-bold">
                      {r.reference_id}
                    </span>
                    <span className="text-xs uppercase font-bold text-slate-300 px-2 py-0.5 rounded bg-slate-800">
                      {r.category.replace('_', ' ')}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                        r.status === 'verified_scam'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : r.status === 'under_review'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      {r.status.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {formatDate(r.created_at)}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-1">{r.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{r.description}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
                  {r.platform_involved && (
                    <span className="text-slate-400">Platform: <strong className="text-slate-200">{r.platform_involved}</strong></span>
                  )}
                  {r.suspect_contact && (
                    <span className="text-slate-400">Suspect: <strong className="text-rose-300 font-mono">{r.suspect_contact}</strong></span>
                  )}
                </div>

                {/* Triage Action Controls */}
                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleUpdateStatus(r.id, 'verified_scam')}
                      className="text-xs"
                    >
                      Mark Verified Scam
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleUpdateStatus(r.id, 'under_review')}
                      className="text-xs text-amber-300"
                    >
                      Set Under Review
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleUpdateStatus(r.id, 'resolved')}
                      className="text-xs text-emerald-400"
                    >
                      Resolve
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        /* Audit Trail View */
        <Card className="p-6 bg-midnight-900 border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Activity className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">System Security Audit Logs</h3>
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-midnight-950 border border-slate-800 text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400 font-bold">{log.action}</span>
                    <span className="text-slate-500">[{log.resource_type}]</span>
                    {log.resource_id && (
                      <span className="text-slate-400 font-bold">{log.resource_id}</span>
                    )}
                  </div>
                  <p className="text-slate-300 text-[11px] font-sans">{log.details}</p>
                </div>
                <div className="text-right text-[10px] text-slate-500">
                  <p>{formatDate(log.timestamp)}</p>
                  <p className="text-slate-600">{log.actor_email}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
