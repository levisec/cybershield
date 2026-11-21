import React, { useState, useEffect } from 'react';
import { AWARENESS_MODULES } from '@/lib/quizData';
import { AwarenessModule } from '@/lib/types';
import { QuizComponent } from './QuizComponent';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import {
  BookOpen,
  HelpCircle,
  AlertTriangle,
  ShieldCheck,
  Clock,
  ArrowRight,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { ActiveTab } from '../common/Navbar';

interface CyberAwarenessViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

const MILESTONES = [
  { id: 'milestone-1', label: 'Understand Suspicious Messages', desc: 'Recognize urgency & linguistic traps' },
  { id: 'milestone-2', label: 'Identify Phishing Links', desc: 'Spot lookalike domains & fake TLDs' },
  { id: 'milestone-3', label: 'Recognize Payment Fraud', desc: 'Master UPI reverse-mandate rules' },
  { id: 'milestone-4', label: 'Understand Account Recovery', desc: '1930 Golden Hour emergency response' },
];

export const CyberAwarenessView: React.FC<CyberAwarenessViewProps> = () => {
  const [selectedModule, setSelectedModule] = useState<AwarenessModule>(AWARENESS_MODULES[0]);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz'>('content');
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem('cybershield_awareness_milestones');
      return stored ? JSON.parse(stored) : { 'milestone-1': true };
    } catch {
      return { 'milestone-1': true };
    }
  });

  // Collect all questions for a comprehensive master quiz
  const allQuestions = AWARENESS_MODULES.flatMap((m) => m.quizzes);

  useEffect(() => {
    // When viewing a module, mark corresponding milestone as achieved
    const mapping: Record<string, string> = {
      'phishing-101': 'milestone-1',
      'url-domain-safety': 'milestone-2',
      'upi-payment-safety': 'milestone-3',
      'job-internship-scams': 'milestone-1',
    };
    const milestoneId = mapping[selectedModule.slug];
    if (milestoneId && !completedMilestones[milestoneId]) {
      const updated = { ...completedMilestones, [milestoneId]: true };
      setCompletedMilestones(updated);
      try {
        localStorage.setItem('cybershield_awareness_milestones', JSON.stringify(updated));
      } catch {
        // Ignore
      }
    }
  }, [selectedModule]);

  const completedCount = Object.values(completedMilestones).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / MILESTONES.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Practical Cybersecurity Education</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">
          Cyber Safety Knowledge Hub & Quizzes
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          Learn how online scams operate without needing any technical jargon. Read bite-sized breakdowns of common attack tactics and test your instincts in realistic synthetic quizzes.
        </p>
      </div>

      {/* Goal Gradient Effect: Learning Journey Progress Bar */}
      <Card className="p-5 bg-gradient-to-r from-midnight-850 via-midnight-900 to-midnight-850 border border-slate-700/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                Cyber Defense Learning Journey
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {completedCount} of {MILESTONES.length} Milestones
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                You're making steady progress toward full scam defense literacy.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-bold text-emerald-400 font-mono">
              {progressPercent}%
            </span>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2 rounded-full bg-midnight-950 border border-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
          {MILESTONES.map((m, idx) => {
            const isDone = !!completedMilestones[m.id];
            return (
              <div
                key={m.id}
                className={`p-2.5 rounded-xl border text-xs transition-all ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                    : 'bg-midnight-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-600 flex items-center justify-center text-[9px] text-slate-500 shrink-0">
                      {idx + 1}
                    </span>
                  )}
                  <span className={isDone ? 'text-white' : 'text-slate-400'}>{m.label}</span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 pl-5 truncate">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Module Navigation & Master Quiz Shortcut */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Learning Modules
          </h3>

          <div className="space-y-2">
            {AWARENESS_MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                onClick={() => {
                  setSelectedModule(mod);
                  setActiveTab('content');
                }}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedModule.id === mod.id && activeTab === 'content'
                    ? 'bg-midnight-800 border-emerald-500/40 shadow-lg glow-emerald'
                    : 'bg-midnight-900/80 border-slate-800 hover:border-slate-700 hover:bg-midnight-850'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {mod.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {mod.readingTime}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-sm mt-1">{mod.title}</h4>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                  {mod.summary}
                </p>
              </button>
            ))}
          </div>

          {/* Quick Quiz Card */}
          <Card className="p-4 bg-gradient-to-br from-midnight-850 to-midnight-900 border-cyan-500/30 space-y-3 mt-4">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
              <HelpCircle className="w-4 h-4" />
              <span>Full Synthetic Challenge Quiz</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Ready to test your reflexes across all {allQuestions.length} real-world scam scenarios?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab('quiz')}
              className="w-full text-xs font-semibold text-cyan-300 border-cyan-500/40 hover:bg-cyan-950/30"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Launch Master Quiz
            </Button>
          </Card>
        </div>

        {/* Right Column: Module Content or Quiz View */}
        <div className="lg:col-span-8">
          {activeTab === 'quiz' ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-400" />
                  Comprehensive Scam Spotting Challenge
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveTab('content')}
                  className="text-xs text-slate-400"
                >
                  Back to Modules
                </Button>
              </div>
              <QuizComponent questions={allQuestions} />
            </div>
          ) : (
            <Card className="p-6 sm:p-8 bg-midnight-900 border-slate-800 space-y-6">
              {/* Module Header */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedModule.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedModule.readingTime} read • {selectedModule.difficulty}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {selectedModule.title}
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedModule.overview}
                </p>
              </div>

              {/* Red Flags Card */}
              <div className="p-5 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  Primary Scam Indicators & Red Flags
                </h4>
                <ul className="space-y-2">
                  {selectedModule.redFlags.map((flag, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Defensive Rules Card */}
              <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Golden Defensive Rules
                </h4>
                <ul className="space-y-2">
                  {selectedModule.defensiveRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Real World Scenario Case Study */}
              <div className="p-5 rounded-xl bg-midnight-950 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Case Example
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  {selectedModule.realWorldScenario}
                </p>
              </div>

              {/* Module Quiz */}
              <div className="pt-4 border-t border-slate-800 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-400" />
                  Quick Check: Test What You Just Learned ({selectedModule.quizzes.length} Questions)
                </h4>
                <QuizComponent questions={selectedModule.quizzes} />
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
