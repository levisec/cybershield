import React from 'react';
import { Shield, Lock, Trash2, Eye, Server } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface PrivacyPolicyViewProps {
  onClearLocalHistory?: () => void;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
  onClearLocalHistory,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy & Data Protection Principles</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Privacy Policy & Data Sovereignty
        </h1>
        <p className="text-slate-400 text-sm">
          Last updated: November 2026 • We practice data minimization by design.
        </p>
      </div>

      <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            1. What Information We Collect (and What We Don't)
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <p>
              <strong>Anonymous Users:</strong> You can use the Scam Detector, URL Checker, Cyber Awareness modules, and Recovery Guides without registering an account. Scans performed anonymously are evaluated in memory and discarded. No private message text is retained on our servers.
            </p>
            <p>
              <strong>Registered Users:</strong> If you choose to create an account, we collect only your email address and authentication credentials (securely hashed by Supabase Auth). Display name is strictly optional.
            </p>
            <p>
              <strong>Scan Content:</strong> We do <em>not</em> build advertising profiles from your analyzed messages. Submitted texts and extracted screenshot contents are processed solely to calculate scam indicators and risk classifications.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-emerald-400" />
            2. How Information is Stored & Retained
          </h2>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <p>
              When database integration is active, data is stored in PostgreSQL secured by Row Level Security (RLS) policies. Only the authenticated owner can read, query, or delete their scans or reports.
            </p>
            <p>
              In offline or client-only mode, scan history is saved exclusively in your browser’s `localStorage` and never leaves your device.
            </p>
          </div>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-rose-400" />
            3. Your Right to Delete Data
          </h2>
          <div className="space-y-3 text-xs sm:text-sm text-slate-300">
            <p>
              You maintain complete control over your data at all times.
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-400 text-xs">
              <li>You can delete individual scan records from your Scan History.</li>
              <li>You can clear all local or saved scan logs in one click.</li>
              <li>You can delete your user account and all associated profile records directly from your Profile settings.</li>
            </ul>

            {onClearLocalHistory && (
              <div className="pt-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={onClearLocalHistory}
                  leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                >
                  Clear Browser Local Scan History
                </Button>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-400" />
            4. Limitations of Automated Analysis
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Automated heuristic and AI-assisted scanning is an educational defense layer. CyberShield does not guarantee that every scam will be caught (false negatives) or that every flagged item is malicious (false positives). Users must never rely solely on an automated score to authorize large financial transfers or reveal sensitive credentials.
          </p>
        </Card>
      </div>
    </div>
  );
};
