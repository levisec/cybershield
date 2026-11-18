import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  ScamAnalysisResult,
  UrlCheckResult,
  ScamReport,
  AuditLogEntry,
} from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.startsWith('https://') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 20
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl as string, supabaseAnonKey as string, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      },
    })
  : null;

// ==========================================
// LOCAL HYBRID STORAGE ENGINE
// Provides guaranteed offline & demo capability
// ==========================================

const LOCAL_STORAGE_KEYS = {
  CURRENT_USER: 'cybershield_current_user',
  ANALYSES: 'cybershield_scans',
  URL_CHECKS: 'cybershield_urls',
  REPORTS: 'cybershield_reports',
  AUDIT_LOGS: 'cybershield_audit_logs',
};

// Initial synthetic audit log seeds
const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-seed-1',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actor_id: 'admin-001',
    actor_email: 'admin@cybershield.org',
    action: 'STATUS_UPDATE',
    resource_type: 'SCAM_REPORT',
    resource_id: 'CS-8472-9102',
    details: 'Verified fake electricity bill disconnection scam pattern',
  },
  {
    id: 'log-seed-2',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    actor_id: 'system',
    actor_email: 'system@cybershield.org',
    action: 'SYSTEM_BOOT',
    resource_type: 'ENGINE',
    details: 'Detection rules and Punycode homoglyph heuristic engines active',
  },
];

// Initial synthetic community scam reports
const SEED_SCAM_REPORTS: ScamReport[] = [
  {
    id: 'rep-001',
    reference_id: 'CS-4821-9921',
    reporter_email: 'community_member@example.com',
    category: 'upi_fraud',
    title: 'OLX buyer sending QR code claiming to "send money"',
    description:
      'Buyer said they are sending an army officer courier, asked me to scan QR code on Google Pay to accept advance payment. The QR code actually had a payment debit request for Rs 15,000.',
    platform_involved: 'OLX / WhatsApp',
    suspect_contact: '+91 98765 43210',
    status: 'verified_scam',
    admin_notes: 'Classic UPI reverse-charge QR collect fraud. Warned community.',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'rep-002',
    reference_id: 'CS-9182-3341',
    reporter_email: 'student_tester@example.com',
    category: 'fake_job',
    title: 'Telegram Part-time YouTube Video Liking Job',
    description:
      'Offered Rs 50 per YouTube like. After paying Rs 150 for first 3 likes, they added me to a VIP group and asked for Rs 5,000 security deposit for crypto task.',
    platform_involved: 'Telegram',
    suspect_contact: '@HR_Global_Talent',
    status: 'under_review',
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'rep-003',
    reference_id: 'CS-2194-5582',
    reporter_email: 'user_alert@example.com',
    category: 'urgent_payment',
    title: 'Electricity Power Disconnection SMS at 9:30 PM',
    description:
      'SMS said electricity will be disconnected tonight at 9:30 PM due to unpaid bill. Provided a mobile number to contact electricity officer immediately.',
    platform_involved: 'SMS (Shortcode)',
    suspect_contact: '+91 81234 56789',
    status: 'verified_scam',
    admin_notes: 'Well known discom phishing format. Confirmed bogus number.',
    created_at: new Date(Date.now() - 86400000 * 7).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

export const LocalStore = {
  // Analyses
  getAnalyses(): ScamAnalysisResult[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.ANALYSES);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  saveAnalysis(analysis: ScamAnalysisResult): void {
    const list = this.getAnalyses();
    list.unshift(analysis);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANALYSES, JSON.stringify(list.slice(0, 50)));
  },
  deleteAnalysis(id: string): void {
    const list = this.getAnalyses().filter((a) => a.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANALYSES, JSON.stringify(list));
  },
  clearAnalyses(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ANALYSES);
  },

  // URL Checks
  getUrlChecks(): UrlCheckResult[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.URL_CHECKS);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },
  saveUrlCheck(check: UrlCheckResult): void {
    const list = this.getUrlChecks();
    list.unshift(check);
    localStorage.setItem(LOCAL_STORAGE_KEYS.URL_CHECKS, JSON.stringify(list.slice(0, 50)));
  },
  deleteUrlCheck(id: string): void {
    const list = this.getUrlChecks().filter((u) => u.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEYS.URL_CHECKS, JSON.stringify(list));
  },
  clearUrlChecks(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.URL_CHECKS);
  },

  // Scam Reports
  getScamReports(): ScamReport[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.REPORTS);
      if (!raw) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.REPORTS, JSON.stringify(SEED_SCAM_REPORTS));
        return SEED_SCAM_REPORTS;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_SCAM_REPORTS;
    }
  },
  saveScamReport(report: ScamReport): void {
    const list = this.getScamReports();
    list.unshift(report);
    localStorage.setItem(LOCAL_STORAGE_KEYS.REPORTS, JSON.stringify(list));
  },
  updateScamReportStatus(
    id: string,
    status: ScamReport['status'],
    adminNotes?: string
  ): void {
    const list = this.getScamReports().map((r) => {
      if (r.id === id) {
        return {
          ...r,
          status,
          admin_notes: adminNotes !== undefined ? adminNotes : r.admin_notes,
          updated_at: new Date().toISOString(),
        };
      }
      return r;
    });
    localStorage.setItem(LOCAL_STORAGE_KEYS.REPORTS, JSON.stringify(list));
  },

  // Audit Logs
  getAuditLogs(): AuditLogEntry[] {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEYS.AUDIT_LOGS);
      if (!raw) {
        localStorage.setItem(LOCAL_STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(SEED_AUDIT_LOGS));
        return SEED_AUDIT_LOGS;
      }
      return JSON.parse(raw);
    } catch {
      return SEED_AUDIT_LOGS;
    }
  },
  addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): void {
    const list = this.getAuditLogs();
    const newEntry: AuditLogEntry = {
      ...entry,
      id: 'log-' + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
    };
    list.unshift(newEntry);
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(list.slice(0, 100)));
  },
};
