import React from 'react';
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
} from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ActiveTab } from '../common/Navbar';

interface HomeViewProps {
  onNavigate: (tab: ActiveTab) => void;
  onQuickScanExample?: (sampleText: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const scamCategories = [
    {
      title: 'Phishing & Impersonation',
      desc: 'Messages pretending to be from banks, tax authorities, courier services or streaming companies.',
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      tag: 'Very Common',
    },
    {
      title: 'UPI & Payment Fraud',
      desc: 'QR codes to "receive money", fake refund links, or urgent requests to approve UPI collect mandates.',
      icon: <Smartphone className="w-5 h-5 text-amber-400" />,
      tag: 'High Impact',
    },
    {
      title: 'Fake Jobs & Internships',
      desc: 'Work-from-home offers demanding upfront security deposits, Telegram task scams, or fake offer letters.',
      icon: <Briefcase className="w-5 h-5 text-blue-400" />,
      tag: 'Targeting Youth',
    },
    {
      title: 'Fake Tech & Bank Support',
      desc: 'Callers claiming your account is blocked or requesting AnyDesk / TeamViewer remote access.',
      icon: <HelpCircle className="w-5 h-5 text-rose-400" />,
      tag: 'Social Engineering',
    },
    {
      title: 'Lottery & Prize Schemes',
      desc: 'Unexpected congratulations for contests you never entered, demanding processing fees.',
      icon: <AlertTriangle className="w-5 h-5 text-purple-400" />,
      tag: 'Classic Scam',
    },
    {
      title: 'Deceptive Investment Offers',
      desc: 'Guaranteed high returns on cryptocurrency, forex trading groups, or unregulated lending apps.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      tag: 'Financial Risk',
    },
  ];

  const faqs = [
    {
      q: 'Can CyberShield guarantee 100% scam detection?',
      a: 'No automated tool can ever guarantee 100% protection. CyberShield analyzes indicators, linguistic patterns, known scam templates, and domain risks to provide an educational risk score. Always verify suspicious communications through independent, verified channels.',
    },
    {
      q: 'Do you store my personal messages or private conversations?',
      a: 'By default, your analyzed text is processed in your current browser session and is not stored permanently unless you are signed in and explicitly choose to save your scan history. You can clear your history or delete your account at any time.',
    },
    {
      q: 'Does reporting a scam here file an official police complaint?',
      a: 'No. CyberShield reports are internal community reports used to improve detection and warn other users. For legal action or monetary recovery in India, you must contact Helpline 1930 or submit a complaint on the official National Cyber Crime Reporting Portal (cybercrime.gov.in).',
    },
    {
      q: 'How does CyberShield evaluate URLs without visiting them?',
      a: 'We evaluate URLs statically—inspecting domain structures, homoglyphs (lookalike characters), suspicious top-level domains, IP literals, and entropy. We do not trigger arbitrary web navigation from our servers, keeping your environment safe from server-side security vulnerabilities (SSRF).',
    },
    {
      q: 'Can I use CyberShield without creating an account?',
      a: 'Yes. All public tools—including text scam detection, URL security checking, cyber recovery guides, and educational modules—are completely open and accessible without registration.',
    },
  ];

  return (
    <div className="space-y-24 py-8 md:py-16">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Background glow ornament */}
        <div className="absolute inset-0 -top-24 max-w-3xl mx-auto h-96 bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative space-y-6 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-slate-700/80 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Accessible Cybersecurity Intelligence for Everyone</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Spot scams before they cost you. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-200">
              Detect. Understand. Protect.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            CyberShield helps students, families, seniors, and small businesses identify suspicious messages, deceptive offers, and fake links with transparent risk analysis and step-by-step guidance.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('detector')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Check for Scams Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('awareness')}
              rightIcon={<BookOpen className="w-4 h-4 text-emerald-400" />}
              className="w-full sm:w-auto"
            >
              Explore Cyber Safety
            </Button>
          </div>

          {/* Honest reassurance */}
          <p className="text-xs text-slate-400 pt-2 flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Free to use • No mandatory registration • Privacy-first design</span>
          </p>
        </div>

        {/* Interactive Quick Try Card */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card
            variant="accent"
            className="text-left border-emerald-500/30 p-5 sm:p-6 shadow-2xl bg-navy-900/90"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5" />
                Interactive Scam Detector Preview
              </span>
              <span className="text-slate-400 text-[11px]">Instant Analysis</span>
            </div>

            <div className="mt-4 space-y-3">
              <p className="text-xs text-slate-300">
                Received a suspicious WhatsApp message, SMS, email, or job offer? Try our detector with synthetic real-world examples:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => onNavigate('detector')}
                  className="p-2.5 rounded-lg bg-navy-950/70 border border-slate-800 hover:border-emerald-500/40 text-left transition-all hover:bg-navy-800 group"
                >
                  <p className="font-medium text-slate-200 group-hover:text-emerald-300 truncate">
                    "Urgent: Electricity bill unpaid..."
                  </p>
                  <span className="text-[10px] text-slate-400">Fake disconnection scam</span>
                </button>
                <button
                  onClick={() => onNavigate('detector')}
                  className="p-2.5 rounded-lg bg-navy-950/70 border border-slate-800 hover:border-emerald-500/40 text-left transition-all hover:bg-navy-800 group"
                >
                  <p className="font-medium text-slate-200 group-hover:text-emerald-300 truncate">
                    "Scan QR to receive ₹5,000 refund..."
                  </p>
                  <span className="text-[10px] text-slate-400">UPI collect mandate fraud</span>
                </button>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigate('detector')}
                  className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  Launch Full Detector <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How CyberShield Works: 3 Simple Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            How It Works
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Three simple steps to digital safety
          </h3>
          <p className="text-slate-400 text-sm">
            CyberShield translates complex threat patterns into clear, actionable advice that anyone can understand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-4 bg-navy-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
              01
            </div>
            <h4 className="text-lg font-bold text-white">1. Detect</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Paste suspicious messages, enter URLs, or upload screenshots. The engine parses linguistic urgency, suspicious keywords, impersonation signals, and deceptive domain indicators.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-navy-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-lg">
              02
            </div>
            <h4 className="text-lg font-bold text-white">2. Understand</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Receive a transparent risk rating (Low, Medium, High, or Unable to Determine) along with specific highlighted evidence explaining <em>why</em> something is suspicious.
            </p>
          </Card>

          <Card className="p-6 space-y-4 bg-navy-900/60 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-lg">
              03
            </div>
            <h4 className="text-lg font-bold text-white">3. Protect</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Follow concrete, safe actions: how to verify independently, what not to click, how to block senders, and how to recover if you have already shared credentials or money.
            </p>
          </Card>
        </div>
      </section>

      {/* Common Scam Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Threat Landscape
            </h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Common Online Scam Categories
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Familiarize yourself with the common tactics scammers use every day across chat apps, SMS, emails, and job boards.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onNavigate('awareness')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Learn More in Awareness Hub
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {scamCategories.map((cat, i) => (
            <Card
              key={i}
              variant="interactive"
              onClick={() => onNavigate('detector')}
              className="p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-navy-950 border border-slate-800">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {cat.tag}
                </span>
              </div>
              <h4 className="text-base font-semibold text-white">{cat.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{cat.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Cyber Recovery Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-rose-950/40 via-navy-900 to-navy-900 border border-rose-500/30 p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Cyber Incident Recovery Centre</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Fallen victim to an online scam or financial fraud?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Time is critical. The first 2 to 4 hours determine whether fraudulent banking transactions can be frozen. Access official Indian emergency contacts (Helpline 1930) and step-by-step account recovery checklists.
              </p>
            </div>
            <Button
              variant="danger"
              size="lg"
              onClick={() => onNavigate('recovery')}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold whitespace-nowrap shadow-lg shadow-rose-950/50"
              leftIcon={<LifeBuoy className="w-4 h-4" />}
            >
              Open Recovery Guides
            </Button>
          </div>
        </div>
      </section>

      {/* Cyber Awareness & Interactive Quiz Promo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Interactive Education</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Test your scam-spotting instincts before real threats strike.
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              We provide synthetic real-world quizzes and easy guides covering password safety, two-factor authentication, phishing links, and digital payments. Learn at your own pace without registration.
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Beginner-friendly explanations without heavy cybersecurity jargon</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Realistic scenarios based on recent WhatsApp, SMS, and UPI scams</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant feedback on why an option was safe or dangerous</span>
              </div>
            </div>
            <div className="pt-2">
              <Button
                variant="secondary"
                onClick={() => onNavigate('awareness')}
                rightIcon={<ArrowRight className="w-4 h-4 text-emerald-400" />}
              >
                Start Safety Quiz
              </Button>
            </div>
          </div>

          {/* Synthetic Interactive Card Preview */}
          <Card className="p-6 bg-navy-900 border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-800">
              <span className="font-semibold text-slate-200">Sample Safety Quiz Scenario</span>
              <span className="text-emerald-400 text-[11px]">Question 1 of 5</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-navy-950 p-3 rounded-lg border border-slate-800/80">
              "Dear customer, your bank account XYZ has been suspended due to pending KYC. Click http://hdfc-kyc-update.me to verify your PAN card within 24 hours."
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg border border-slate-800 bg-navy-950 text-slate-400">
                A) Click the link immediately to prevent suspension
              </div>
              <div className="p-2.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 font-medium flex items-center justify-between">
                <span>B) Recognize fake domain (.me), do not click, check official app</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-2.5 rounded-lg border border-slate-800 bg-navy-950 text-slate-400">
                C) Reply with your PAN and OTP to speed up verification
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Got Questions?
          </h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm">
            Honest answers about our capabilities, limitations, and privacy standards.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Card key={idx} className="p-5 bg-navy-900/60 border-slate-800">
              <h4 className="text-sm font-semibold text-white mb-2 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed pl-6">{faq.a}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-2xl bg-gradient-to-b from-navy-850 to-navy-900 border border-slate-700/80 p-8 sm:p-12 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to inspect a suspicious communication?
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mx-auto">
            Paste any email, WhatsApp chat, or offer in our detector. You'll receive a detailed breakdown in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onNavigate('detector')}
              rightIcon={<Search className="w-4 h-4" />}
            >
              Analyze Message Now
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onNavigate('url-checker')}
              rightIcon={<Globe className="w-4 h-4" />}
            >
              Check a Web Link
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
