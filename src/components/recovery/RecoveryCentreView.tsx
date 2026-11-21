import React, { useState } from 'react';
import { RECOVERY_GUIDES } from '@/lib/recoveryData';
import { RecoveryGuide } from '@/lib/types';
import { Card } from '../common/Card';
import {
  PhoneCall,
  Clock,
  ExternalLink,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Circle,
  FileText,
} from 'lucide-react';
import { ActiveTab } from '../common/Navbar';

interface RecoveryCentreViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

export const RecoveryCentreView: React.FC<RecoveryCentreViewProps> = () => {
  const [selectedGuide, setSelectedGuide] = useState<RecoveryGuide>(RECOVERY_GUIDES[0]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (stepName: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepName]: !prev[stepName],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Emergency Urgent Golden Hour Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-950/60 via-midnight-900 to-midnight-900 border-2 border-rose-500/50 p-6 sm:p-8 space-y-4 glow-danger">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>India Emergency Cyber Fraud Response</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Financial Cybercrime Emergency Helpline: Dial 1930
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              If money has been transferred fraudulently via UPI or NetBanking, calling <strong>1930</strong> within the <em>Golden Hour (first 2 hours)</em> gives law enforcement and banks the opportunity to freeze funds in the recipient's account before it is withdrawn.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:1930"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-xl shadow-rose-950/60 transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 1930 Now</span>
            </a>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-midnight-950 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all duration-200"
            >
              <span>cybercrime.gov.in</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Guide Navigation & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Guides List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
            Incident Scenarios
          </h3>

          <div className="space-y-2">
            {RECOVERY_GUIDES.map((guide) => (
              <button
                key={guide.id}
                type="button"
                onClick={() => setSelectedGuide(guide)}
                className={`w-full p-4 rounded-xl border text-left transition-all ${
                  selectedGuide.id === guide.id
                    ? 'bg-midnight-800 border-rose-500/40 shadow-lg glow-danger'
                    : 'bg-midnight-900/80 border-slate-800 hover:border-slate-700 hover:bg-midnight-850'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {guide.category}
                  </span>
                  <span
                    className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded border ${
                      guide.severity === 'immediate'
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {guide.severity}
                  </span>
                </div>
                <h4 className="font-semibold text-white text-sm mt-1">{guide.title}</h4>
                <p className="text-slate-400 text-xs line-clamp-2 mt-1">
                  {guide.description}
                </p>
              </button>
            ))}
          </div>

          {/* Quick Notice */}
          <Card className="p-4 bg-midnight-900 border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              RBI 3-Day Liability Clause
            </span>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Under RBI circular DBR.No.Leg.BC.78/09.07.005/2017-18, if an unauthorized transaction occurs through third-party breach and you report it within 3 working days, customer liability is zero. Always obtain written acknowledgement from your bank branch.
            </p>
          </Card>
        </div>

        {/* Right: Selected Guide Action Plan */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-6 sm:p-8 bg-midnight-900 border-slate-800 space-y-6">
            <div className="space-y-2 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  {selectedGuide.category}
                </span>
                <span className="text-xs text-slate-400">
                  Priority: {selectedGuide.severity.toUpperCase()}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedGuide.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedGuide.description}
              </p>
            </div>

            {/* First 15 Minutes Box */}
            <div className="p-5 rounded-xl bg-rose-950/30 border border-rose-500/40 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400" />
                Immediate Action: First 15 Minutes Checklist
              </h4>
              <ul className="space-y-2">
                {selectedGuide.first15Minutes.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-rose-100/90 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step-by-Step Action Plan */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                Detailed Recovery Steps
              </h4>
              <div className="space-y-2.5">
                {selectedGuide.stepByStepAction.map((step, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 text-xs text-slate-300 leading-relaxed"
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Official Resources */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Verified Official Portals & Numbers
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedGuide.officialResources.map((res, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-midnight-950 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-200">{res.name}</span>
                      {res.isIndianAuthority && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          Official Gov
                        </span>
                      )}
                    </div>
                    <p className="text-slate-400 text-[11px]">{res.description}</p>
                    <div className="pt-1">
                      {res.phone && (
                        <a
                          href={`tel:${res.phone}`}
                          className="inline-flex items-center gap-1.5 text-rose-400 font-bold hover:underline"
                        >
                          <PhoneCall className="w-3 h-3" /> Dial {res.phone}
                        </a>
                      )}
                      {res.url && (
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-cyan-400 font-medium hover:underline"
                        >
                          Visit Portal <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Recovery Progress Tracker */}
            <div className="p-5 rounded-xl bg-midnight-950/80 border border-slate-800 space-y-3 pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Track Your Recovery Tasks
              </h4>
              <div className="space-y-2">
                {selectedGuide.recoveryChecklist.map((task, i) => {
                  const isDone = !!completedSteps[task];
                  return (
                    <div
                      key={i}
                      onClick={() => toggleStep(task)}
                      className={`p-2.5 rounded-lg border cursor-pointer text-xs flex items-center gap-2.5 transition-colors select-none ${
                        isDone
                          ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-midnight-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                      )}
                      <span className={isDone ? 'line-through text-slate-300' : ''}>
                        {task}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
