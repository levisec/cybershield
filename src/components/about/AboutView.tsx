import React from 'react';
import { Shield, Target, HeartHandshake, BookOpen } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ActiveTab } from '../common/Navbar';

interface AboutViewProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate }) => {
  const audiences = [
    {
      title: 'Students & Job Seekers',
      desc: 'Protecting students from fake remote internships, Part-time Telegram task frauds, and high-fee recruitment scams.',
      icon: '🎓',
    },
    {
      title: 'Parents & Families',
      desc: 'Guarding family savings against digital arrest hoaxes, emergency impersonation calls, and school fee phishing.',
      icon: '👨‍👩‍👦',
    },
    {
      title: 'Seniors & Elderly Internet Users',
      desc: 'Providing simple, clear language with zero jargon so seniors can verify banking SMS, pension alerts, and WhatsApp messages.',
      icon: '👵',
    },
    {
      title: 'Everyday Netizens & Freelancers',
      desc: 'Spotting deceptive client payment requests, crypto investments, fake refund portals, and suspicious QR codes.',
      icon: '💻',
    },
    {
      title: 'Small Business Owners',
      desc: 'Assisting small shops and enterprises to verify vendor invoices, supplier links, and tax authority notices.',
      icon: '🏪',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      {/* Intro Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Shield className="w-3.5 h-3.5" />
          <span>About CyberShield</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Democratizing Cybersecurity for Everyday People
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Most cybersecurity tools are built for enterprise SOC teams, network engineers, and corporations. CyberShield was created with a different vision: to give everyday individuals, students, parents, and seniors the tools to defend themselves online.
        </p>
      </div>

      {/* Product Vision & Core Principle */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Detect</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fast, accessible analysis of messages, links, and screenshots using multi-layered pattern detection and rules heuristics.
          </p>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Understand</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Eliminating technical jargon. Explaining the psychological triggers (urgency, fear, greed) behind every deceptive attack.
          </p>
        </Card>

        <Card className="p-6 bg-navy-900/80 border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Protect</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Guiding victims through step-by-step account recovery, official portal links (such as India's 1930 Helpline), and bank notifications.
          </p>
        </Card>
      </div>

      {/* Who We Build For */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Designed for Real People
          </h2>
          <h3 className="text-2xl font-bold text-white">Who CyberShield Serves</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((aud, i) => (
            <Card key={i} className="p-5 bg-navy-900/60 border-slate-800 space-y-2">
              <span className="text-2xl">{aud.icon}</span>
              <h4 className="text-sm font-semibold text-white">{aud.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{aud.desc}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-navy-900 border border-emerald-500/20 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">Have a message you want to check?</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Try the scam detector now or test your instincts in the cyber awareness section.
        </p>
        <div className="flex justify-center gap-3">
          <Button variant="primary" size="md" onClick={() => onNavigate('detector')}>
            Launch Scam Detector
          </Button>
          <Button variant="secondary" size="md" onClick={() => onNavigate('awareness')}>
            Take Safety Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
