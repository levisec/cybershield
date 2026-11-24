import React, { useState } from 'react';
import {
  Search,
  Globe,
  BookOpen,
  LifeBuoy,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Smartphone,
  Briefcase,
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  Info,
  TrendingUp,
  ChevronDown,
  PhoneCall,
  Zap,
  Star,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ActiveTab } from '../common/Navbar';
import { InteractiveShieldGraphic } from './InteractiveShieldGraphic';
import { ContrastComparisonSection } from './ContrastComparisonSection';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onQuickScanExample?: (sampleText: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onQuickScanExample }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* ─────────────────────────── DATA ─────────────────────────── */

  const scamCategories = [
    {
      title: 'Phishing & Impersonation',
      desc: 'Messages pretending to be from banks, tax authorities, courier services, or streaming companies asking you to "verify" before logging in.',
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      tag: 'Very Common',
      tagColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    },
    {
      title: 'UPI Payment Fraud',
      desc: 'QR codes to "receive money," fake refund links, or urgent requests to approve UPI collect mandates before the offer expires.',
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      tag: 'High Impact',
      tagColor: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    },
    {
      title: 'Fake Jobs & Internships',
      desc: 'Work-from-home offers demanding upfront security deposits, Telegram task scams, or fake offer letters targeting students.',
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
      iconBg: 'bg-blue-500/10 border-blue-500/20',
      tag: 'Targeting Youth',
      tagColor: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    },
    {
      title: 'Tech Support Fraud',
      desc: 'Callers claiming your device or account is blocked, requesting AnyDesk / TeamViewer remote access to "fix" the problem.',
      icon: <HelpCircle className="w-5 h-5 text-rose-400" />,
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      tag: 'Social Engineering',
      tagColor: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
    },
    {
      title: 'Lottery & Prize Scams',
      desc: 'Unexpected congratulations for contests you never entered, demanding processing fees before the "prize" is released to you.',
      icon: <Star className="w-5 h-5 text-purple-400" />,
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      tag: 'Classic Scam',
      tagColor: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    },
    {
      title: 'Investment Scams',
      desc: 'Guaranteed high returns on crypto, forex trading Telegram groups, or unregulated lending apps that vanish after collecting deposits.',
      icon: <TrendingUp className="w-5 h-5 text-cyan-400" />,
      iconBg: 'bg-cyan-500/10 border-cyan-500/20',
      tag: 'Financial Risk',
      tagColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
    },
  ];

  const faqs = [
    {
      q: 'Can CyberShield guarantee 100% scam detection?',
      a: 'No automated tool can guarantee 100% protection. CyberShield analyses linguistic patterns, urgency signals, known scam templates, and domain risks to produce an educational risk score. Always verify suspicious communications through independent, official channels.',
    },
    {
      q: 'Do you store my personal messages or conversations?',
      a: 'By default, analyzed text is processed within your browser session and is not stored permanently unless you are signed in and explicitly choose to save scan history. You can clear history or delete your account at any time.',
    },
    {
      q: 'Does reporting a scam here file an official police complaint?',
      a: 'No. CyberShield reports are internal community signals used to improve detection and warn other users. For legal action or monetary recovery in India, contact Helpline 1930 or file on the official National Cyber Crime Reporting Portal (cybercrime.gov.in).',
    },
    {
      q: 'How does CyberShield check URLs without visiting them?',
      a: 'We evaluate URLs statically—inspecting domain structures, homoglyphs (lookalike characters), suspicious TLDs, IP literals, and entropy scores. We never trigger arbitrary web navigation from our servers, eliminating SSRF risk entirely.',
    },
    {
      q: 'Can I use CyberShield without an account?',
      a: 'Yes. All public tools—text scam detection, URL checking, cyber recovery guides, and educational modules—are fully accessible without registration. Free, always.',
    },
  ];

  /* ──────────────────────── COMPONENT ──────────────────────── */

  return (
    <div className="space-y-28 sm:space-y-36 py-12 md:py-20">

      {/* ══════════════════════════════════════════════════════
          SECTION 1 · HERO
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient glow */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-20 w-[700px] h-72 bg-emerald-500/8 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 sm:gap-20 items-center">
          {/* ── Left: Copy ── */}
          <div className="space-y-6">
            {/* Top Alert Bar + Badge */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-xs text-emerald-300 font-semibold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>AI-Powered Cybersecurity for Everyday Netizens</span>
              </div>

              {/* High-Tech Live Scam Radar */}
              <div className="relative overflow-hidden rounded-2xl p-3 bg-gradient-to-r from-rose-950/50 via-midnight-900 to-amber-950/40 border border-rose-500/40 flex items-center justify-between gap-3 shadow-lg shadow-rose-950/30">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 relative shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
                  </span>
                  <span className="font-mono text-[10px] font-extrabold text-rose-300 uppercase tracking-widest bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40 shrink-0">
                    LIVE THREAT RADAR
                  </span>
                  <span className="text-xs text-slate-200 truncate max-w-[200px] sm:max-w-xs">
                    Electricity Bill Power Cutoff SMS & Telegram Task Scams active today
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-midnight-950/90 px-2.5 py-0.5 rounded-lg border border-amber-500/40 shrink-0 hidden sm:inline">
                  DEFCON: ELEVATED
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Spot scams before they cost you.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
                Detect. Understand. Protect.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg">
              Every day, families, seniors, and students in India lose money to digital scams — often before they realise something is wrong.{' '}
              <span className="text-slate-200 font-medium">
                CyberShield gives you instant, free threat analysis so you can verify any message or link before sharing personal info or making a payment.
              </span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('detector')}
                rightIcon={<Search className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg shadow-emerald-500/20"
              >
                Check a Suspicious Message
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('url-checker')}
                rightIcon={<Globe className="w-4 h-4 text-emerald-400" />}
                className="w-full sm:w-auto"
              >
                Inspect a Web Link
              </Button>
            </div>

            {/* Trust line */}
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Free • No registration required • Privacy-first</span>
            </p>

            {/* Smart default example chips */}
            <div className="pt-1 space-y-2">
              <p className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">Try a real scam sample →</p>
              <div className="flex flex-wrap gap-2">
                {[
                  {
                    label: '"Urgent: Electricity bill unpaid..."',
                    hint: 'Fake disconnection',
                    text: 'Dear consumer, your electricity power will be disconnected tonight at 9.30 PM from the power office because your previous month bill was not updated. Please immediately contact our electricity officer Rahul Sharma at 9876543210. Thank you.',
                  },
                  {
                    label: '"Scan QR to receive ₹5,000..."',
                    hint: 'UPI collect fraud',
                    text: 'Congratulations! You have received a cashback refund of ₹5,000 for your recent transaction. Scan this QR code and enter your UPI PIN to instantly receive the amount in your bank account.',
                  },
                  {
                    label: '"Work from home – ₹800/task..."',
                    hint: 'Telegram task scam',
                    text: 'Earn ₹2,000 to ₹8,000 daily working from home! Simple YouTube video liking and Google reviews task. Join our official Telegram channel @fast_cash_india to start receiving payments immediately.',
                  },
                ].map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (onQuickScanExample) {
                        onQuickScanExample(chip.text);
                      } else {
                        onNavigate('detector');
                      }
                    }}
                    className="group flex items-center gap-2 px-3 py-1.5 rounded-lg glass-panel border border-slate-700/60 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-xs text-left cursor-pointer"
                  >
                    <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="text-slate-300 group-hover:text-emerald-300 transition-colors truncate max-w-[180px]">{chip.label}</span>
                    <span className="text-slate-500 text-[10px] hidden sm:inline shrink-0">{chip.hint}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Interactive Shield Graphic ── */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <InteractiveShieldGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 · HOW IT WORKS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-xs uppercase font-extrabold tracking-widest text-emerald-300 shadow-sm shadow-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Operational Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Three simple steps to digital safety
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            CyberShield translates complex threat signals into clear, actionable guidance that anyone can follow — no technical knowledge needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 01 · Detect */}
          <div className="relative group rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-emerald-950/60 via-midnight-900 to-midnight-950 border-2 border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] space-y-6 overflow-hidden">
            {/* Top scanning neon beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_rgba(16,185,129,0.9)]" />
            
            {/* Ambient radial glow orb */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/30 transition-all" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/25 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.45)] group-hover:scale-110 transition-transform">
                <Search className="w-7 h-7 text-emerald-300" />
              </div>
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-emerald-300 via-teal-300 to-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)] select-none">
                01
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                  Detect
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                  Active Parser
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Paste any suspicious message, enter a URL, or describe an offer. Our engine scans for urgency language, impersonation signals, deceptive domains, and known scam templates — all before you share a single detail.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-emerald-500/25 text-xs">
              <span className="font-mono text-emerald-300 font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                EMERALD · HEURISTIC LAYER
              </span>
              <span className="text-emerald-400 font-semibold group-hover:underline">
                Zero-Visit Safe →
              </span>
            </div>
          </div>

          {/* Step 02 · Understand */}
          <div className="relative group rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-amber-950/60 via-midnight-900 to-midnight-950 border-2 border-amber-500/40 hover:border-amber-400 transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] space-y-6 overflow-hidden">
            {/* Top scanning neon beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.9)]" />
            
            {/* Ambient radial glow orb */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/30 transition-all" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/25 border-2 border-amber-400/60 flex items-center justify-center text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.45)] group-hover:scale-110 transition-transform">
                <Info className="w-7 h-7 text-amber-300" />
              </div>
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-amber-300 via-yellow-300 to-orange-500 drop-shadow-[0_0_25px_rgba(245,158,11,0.7)] select-none">
                02
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  Understand
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm">
                  Threat Scoring
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Receive a transparent risk rating — Low, Medium, or High — with specific highlighted evidence explaining <em>exactly why</em> something is suspicious, so you can make an informed decision.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-amber-500/25 text-xs">
              <span className="font-mono text-amber-300 font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                AMBER · ANALYSIS ENGINE
              </span>
              <span className="text-amber-400 font-semibold group-hover:underline">
                Transparent Evidence →
              </span>
            </div>
          </div>

          {/* Step 03 · Protect */}
          <div className="relative group rounded-3xl p-7 sm:p-8 bg-gradient-to-b from-cyan-950/60 via-midnight-900 to-midnight-950 border-2 border-cyan-500/40 hover:border-cyan-400 transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] space-y-6 overflow-hidden">
            {/* Top scanning neon beam */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.9)]" />
            
            {/* Ambient radial glow orb */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/30 transition-all" />

            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/25 border-2 border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.45)] group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-cyan-300" />
              </div>
              <span className="text-5xl sm:text-6xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-sky-300 to-blue-500 drop-shadow-[0_0_25px_rgba(6,182,212,0.7)] select-none">
                03
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                  Protect
                </h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm">
                  Safety Protocol
                </span>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Follow concrete next steps: how to verify independently, what not to click, how to block senders, and how to recover quickly if you have already responded or shared credentials.
              </p>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-cyan-500/25 text-xs">
              <span className="font-mono text-cyan-300 font-bold tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                CYAN · DEFENSE PROTOCOL
              </span>
              <span className="text-cyan-400 font-semibold group-hover:underline">
                Helpline 1930 Guide →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 · SCAM CATEGORY CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <p className="text-xs uppercase font-bold tracking-widest text-emerald-400">Threat Landscape</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Common Scam Categories in India
            </h2>
            <p className="text-slate-400 text-sm max-w-xl leading-relaxed">
              Familiarise yourself with the tactics scammers use daily across WhatsApp, SMS, email, and job boards — knowledge is your first line of defence.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('awareness')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            className="shrink-0"
          >
            Full Awareness Hub
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scamCategories.map((cat, i) => (
            <div
              key={i}
              onClick={() => onNavigate('detector')}
              className="p-6 rounded-2xl bg-midnight-900 border border-slate-800 hover:border-emerald-500/50 hover:bg-midnight-850 hover:shadow-[0_0_30px_rgba(16,185,129,0.18)] transition-all duration-300 cursor-pointer space-y-4 group relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl border ${cat.iconBg} group-hover:scale-110 transition-transform shadow-md`}>
                  {cat.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${cat.tagColor}`}>
                  {cat.tag}
                </span>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{cat.desc}</p>
              </div>
              <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-800/80">
                <span className="text-emerald-400 font-semibold group-hover:underline flex items-center gap-1">
                  Analyze this pattern <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="text-[10px] font-mono text-slate-500">REAL-TIME THREAT</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 · CONTRAST COMPARISON
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 space-y-2">
          <p className="text-xs uppercase font-bold tracking-widest text-emerald-400">See the Difference</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Spot what scammers try to hide
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Side-by-side comparisons of real vs. fake messages — training your eye before a real scam arrives.
          </p>
        </div>
        <ContrastComparisonSection />
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 · CYBER AWARENESS PROMO
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left: Copy */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Education Hub</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Test your scam-spotting instincts{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                before real threats strike.
              </span>
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We provide free, jargon-free quizzes and practical guides covering password safety, two-factor authentication, phishing link recognition, and digital payment security. No registration, no pressure.
            </p>
            <ul className="space-y-2.5">
              {[
                'Beginner-friendly explanations without heavy cybersecurity jargon',
                'Realistic scenarios based on current WhatsApp, SMS, and UPI scams targeting India',
                'Instant feedback on why each option was safe or dangerous',
                'Self-paced modules designed for seniors, students, and families',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-1">
              <Button
                variant="secondary"
                onClick={() => onNavigate('awareness')}
                rightIcon={<ArrowRight className="w-4 h-4 text-emerald-400" />}
              >
                Start Safety Quiz — Free
              </Button>
            </div>
          </div>

          {/* Right: Interactive Quiz Sample Card */}
          <Card variant="elevated" className="p-6 space-y-4 border-blue-500/20">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                Sample Safety Scenario
              </span>
              <span className="text-blue-400 text-[11px] font-medium">Question 1 of 5</span>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">Message Received</p>
              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 italic">
                "Dear customer, your bank account XYZ has been suspended due to pending KYC.
                Click <span className="text-rose-400 not-italic font-semibold">http://hdfc-kyc-update.me</span> to verify your PAN card within 24 hours or your account will be permanently blocked."
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] text-slate-500 uppercase font-semibold tracking-wider">What should you do?</p>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400">
                  A) Click the link immediately to prevent account suspension
                </div>
                <div className="p-2.5 rounded-lg border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 font-medium flex items-center justify-between gap-2">
                  <span>B) Spot the fake domain (.me), do not click, verify through the official bank app or helpline</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                </div>
                <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/40 text-slate-400">
                  C) Reply with your PAN and OTP to speed up verification
                </div>
              </div>
            </div>

            <div className="pt-1 p-3 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-xs text-emerald-300 leading-relaxed">
              <span className="font-semibold">Why B is correct:</span> Real banks never send links to unverified domains like <code>.me</code>. The sense of urgency ("24 hours") is a classic pressure tactic designed to bypass rational thinking.
            </div>
          </Card>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 · EMERGENCY RECOVERY BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden border border-rose-500/30">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-950/60 via-slate-900/80 to-slate-900/90" />
          <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-rose-900/20 to-transparent pointer-events-none" />

          <div className="relative z-10 p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            {/* Left content */}
            <div className="flex-1 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Cyber Incident Recovery Centre</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                Already fallen victim to fraud?
                <br />
                <span className="text-rose-300">Time is critical — act within hours.</span>
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                The first 2–4 hours determine whether fraudulent banking transactions can be frozen. Access official Indian emergency contacts, step-by-step account recovery checklists, and legal reporting guides — all in one place.
              </p>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30">
                  <PhoneCall className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <p className="text-[10px] text-rose-400/70 uppercase font-semibold tracking-wider">National Cyber Helpline</p>
                    <p className="text-2xl font-black text-rose-300 tracking-tight leading-none">1930</p>
                  </div>
                </div>
                <p className="text-xs text-slate-400 max-w-xs">
                  Available 24×7. Report financial cyber fraud immediately to freeze transactions.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="shrink-0">
              <Button
                variant="danger"
                size="lg"
                onClick={() => onNavigate('recovery')}
                leftIcon={<LifeBuoy className="w-5 h-5" />}
                className="bg-rose-600 hover:bg-rose-500 text-white border-rose-500/50 shadow-lg shadow-rose-950/50 whitespace-nowrap"
              >
                Open Recovery Guides
              </Button>
              <p className="text-[10px] text-rose-400/60 text-center mt-2">Free · No login required</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 · FAQ ACCORDION
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <p className="text-xs uppercase font-bold tracking-widest text-emerald-400">Got Questions?</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Honest answers about our capabilities, privacy standards, and limitations.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`glass-panel rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-slate-800/60 hover:border-slate-700/80'
                }`}
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                >
                  <span className="flex items-start gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className={`text-sm font-semibold transition-colors ${isOpen ? 'text-emerald-300' : 'text-white'}`}>
                      {faq.q}
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`}
                  />
                </button>

                {/* Accordion body */}
                <div
                  className={`transition-all duration-200 ease-in-out ${
                    isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <p className="px-5 pb-5 pl-12 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 · BOTTOM CTA
      ══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-slate-900/90 to-slate-900" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          {/* Decorative orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-20 bg-emerald-500/15 blur-[60px] pointer-events-none rounded-full" />

          <div className="relative z-10 py-14 px-6 sm:px-12 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Free · Instant · No login required</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
              Inspect any suspicious communication
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                before it costs you.
              </span>
            </h2>

            <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
              Paste any email, WhatsApp message, SMS, or offer — receive a detailed risk breakdown in seconds. Completely free and private.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => onNavigate('detector')}
                rightIcon={<Search className="w-4 h-4" />}
                className="w-full sm:w-auto shadow-lg shadow-emerald-500/20"
              >
                Analyse a Message Now
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onNavigate('url-checker')}
                rightIcon={<Globe className="w-4 h-4 text-emerald-400" />}
                className="w-full sm:w-auto"
              >
                Check a Web Link
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
