import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { CheckCircle2, Circle, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  impact: 'High' | 'Critical' | 'Medium';
  completed: boolean;
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Inspected a suspicious communication with CyberShield',
    description: 'You have actively verified a message or link using our heuristic engine.',
    impact: 'High',
    completed: true, // Smart Default starting milestone!
  },
  {
    id: 'chk-2',
    title: 'Enabled Two-Factor Authentication (2FA / Authenticator App)',
    description: 'Secured primary email and banking credentials beyond just a password.',
    impact: 'Critical',
    completed: false,
  },
  {
    id: 'chk-3',
    title: 'Internalized UPI Safety: Never enter UPI PIN to receive money',
    description: 'UPI PINs only debit your bank account; receiving money requires zero PIN input.',
    impact: 'Critical',
    completed: false,
  },
  {
    id: 'chk-4',
    title: 'Saved India Cyber Helpline (1930) in phone contacts',
    description: 'Quick access to the National Cyber Crime Reporting Helpline within the golden hour.',
    impact: 'High',
    completed: false,
  },
  {
    id: 'chk-5',
    title: 'Audited installed apps & revoked SMS/Accessibility permissions',
    description: 'Removed unknown APKs, cleaners, or screen-sharing tools like AnyDesk.',
    impact: 'High',
    completed: false,
  },
  {
    id: 'chk-6',
    title: 'Verified official bank numbers from physical debit card',
    description: 'Refuse to call unknown numbers sent via SMS; use the back of your bank card.',
    impact: 'Medium',
    completed: false,
  },
];

const STORAGE_KEY = 'cybershield_user_security_checklist';

export const PersonalSecurityChecklist: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST;
    } catch {
      return DEFAULT_CHECKLIST;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Ignore
    }
  }, [items]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter((i) => i.completed).length;
  const progressPercent = Math.round((completedCount / items.length) * 100);

  return (
    <Card className="p-7 sm:p-8 bg-midnight-900 border-slate-800 space-y-7">
      {/* Header & Goal Gradient Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-base sm:text-lg">
              Personal Cyber Defense Readiness
            </h3>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Interactive Checklist
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Build and own your security defense posture step by step.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-base font-bold text-emerald-400 font-mono">
              {progressPercent}%
            </span>
            <span className="text-[11px] text-slate-500 block">
              {completedCount} of {items.length} secured
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-midnight-950 border border-slate-800 flex items-center justify-center text-emerald-400">
            {progressPercent === 100 ? (
              <Award className="w-6 h-6 text-emerald-400" />
            ) : (
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar Visual (Goal Gradient Effect) */}
      <div className="w-full bg-midnight-950 rounded-full h-2.5 border border-slate-800 overflow-hidden">
        <div
          className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Checklist Items with Spacious Gaps */}
      <div className="space-y-3.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
              item.completed
                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                : 'bg-midnight-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {item.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400 transition-colors" />
              )}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`text-xs sm:text-sm font-semibold ${
                    item.completed ? 'text-white line-through opacity-80' : 'text-slate-100'
                  }`}
                >
                  {item.title}
                </span>
                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded border shrink-0 ${
                    item.impact === 'Critical'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                      : item.impact === 'High'
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-blue-500/10 text-blue-300 border-blue-500/20'
                  }`}
                >
                  {item.impact}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
                >
                  {item.impact} Priority
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/40 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            Outstanding! You have completed all foundational cyber defense milestones.
          </span>
        </div>
      )}
    </Card>
  );
};
