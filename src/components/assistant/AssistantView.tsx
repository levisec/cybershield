import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ActiveTab } from '../common/Navbar';
import {
  Sparkles,
  Send,
  Bot,
  User,
} from 'lucide-react';

interface AssistantViewProps {
  onNavigate?: (tab: ActiveTab) => void;
}

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  recommendations?: string[];
  actionLink?: { label: string; tab: ActiveTab };
}

const KNOWLEDGE_BASE: Array<{
  triggers: string[];
  reply: string;
  recommendations: string[];
  actionTab?: ActiveTab;
  actionLabel?: string;
}> = [
  {
    triggers: ['upi', 'qr code', 'pin', 'receive money', 'gpay', 'phonepe', 'paytm'],
    reply:
      'Golden Rule of UPI: You NEVER need to enter your UPI PIN to receive money. Entering your UPI PIN is only and strictly for DEBITING (sending money from) your bank account.',
    recommendations: [
      'If someone sends a QR code claiming it will "deposit" or "refund" money into your account, reject it immediately.',
      'Beware of OLX/Quikr buyers claiming to be military personnel or courier agents.',
      'If you already entered your PIN and lost money, immediately call 1930 to freeze the transaction.',
    ],
    actionTab: 'recovery',
    actionLabel: 'Open 1930 Recovery Guide',
  },
  {
    triggers: ['electricity', 'power', 'cut', 'tonight', 'disconnection', 'bill', 'officer'],
    reply:
      'This is a widespread electricity bill disconnection phishing scam. State power discoms (electricity boards) NEVER send SMS alerts from 10-digit personal mobile numbers threatening immediate disconnection tonight.',
    recommendations: [
      'Do not call the phone number provided in the SMS.',
      'Never download APKs or remote tools like AnyDesk / QuickSupport.',
      'Check your actual bill status by visiting your official DISCOM web portal or authorized electricity payment app.',
    ],
    actionTab: 'detector',
    actionLabel: 'Analyze the SMS text',
  },
  {
    triggers: ['job', 'internship', 'telegram', 'youtube', 'like', 'work from home', 'deposit'],
    reply:
      'This is a classic "task-based advance fee scam". Scammers promise ₹50 to ₹100 for liking YouTube videos or Google reviews, pay small sums initially to gain trust, and then demand large "security deposits" to unlock VIP tasks.',
    recommendations: [
      'Legitimate employers and corporate hiring managers never conduct formal hiring exclusively via Telegram groups.',
      'Never pay any upfront security deposit, registration charge, or task unlocking fee for any job or internship.',
      'Exit the Telegram group and block the recruiter.',
    ],
    actionTab: 'detector',
    actionLabel: 'Scan the Offer Letter',
  },
  {
    triggers: ['link', 'url', 'domain', 'website', 'click', 'fake site'],
    reply:
      'Scammers register lookalike domains using typos (e.g., sbi-kyc-verify.xyz, hdfc-netbank.online) to steal your banking credentials and PAN card details.',
    recommendations: [
      'Never click banking or KYC links received via SMS, WhatsApp, or email.',
      'Inspect the top-level domain (.xyz, .top, .online are frequently abused).',
      'Use CyberShield URL Checker to evaluate domain structures safely without visiting the page.',
    ],
    actionTab: 'url-checker',
    actionLabel: 'Inspect Link with Zero-Visit Engine',
  },
  {
    triggers: ['anydesk', 'teamviewer', 'quicksupport', 'screen', 'remote', 'customer care'],
    reply:
      'Remote desktop tools allow someone else complete visual and tap access to your smartphone or laptop. Scammers posing as bank support or courier delivery executives trick victims into installing these apps to view banking OTPs in real-time.',
    recommendations: [
      'Never install remote screen-sharing tools based on an inbound phone call.',
      'If already installed, turn off Wi-Fi/Mobile Data immediately and uninstall the app.',
      'Call your bank helpline (from the back of your card) to temporarily block netbanking.',
    ],
    actionTab: 'recovery',
    actionLabel: 'Follow Incident Recovery Steps',
  },
];

const SUGGESTED_QUESTIONS = [
  'Is it safe to enter my UPI PIN to receive money?',
  'Received SMS: electricity will be disconnected tonight. Is this fake?',
  'Someone on Telegram offered ₹3,000/day for liking YouTube videos.',
  'How do I identify a fake banking website or phishing link?',
  'A caller asked me to install AnyDesk to verify KYC.',
];

export const AssistantView: React.FC<AssistantViewProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text:
        'Hello! I am your CyberShield Safety Advisor. You can ask me questions about suspicious messages, UPI payment rules, fake job offers, or how to recover if you shared information.',
      timestamp: 'Just now',
      recommendations: [
        'Ask about suspicious SMS, WhatsApp, or email messages',
        'Learn why you should never enter your UPI PIN to receive funds',
        'Find verified emergency response procedures for online fraud',
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: trimmed,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      const matched = KNOWLEDGE_BASE.find((k) =>
        k.triggers.some((t) => lower.includes(t))
      );

      let assistantReply: Message;
      if (matched) {
        assistantReply = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text: matched.reply,
          timestamp: 'Just now',
          recommendations: matched.recommendations,
          actionLink:
            matched.actionTab && matched.actionLabel
              ? { label: matched.actionLabel, tab: matched.actionTab }
              : undefined,
        };
      } else {
        assistantReply = {
          id: 'msg-' + (Date.now() + 1),
          sender: 'assistant',
          text:
            'Cyber threats often rely on manufactured urgency, payment coercion, or impersonation. For specific text or link verification, use our dedicated heuristic detection tools below.',
          timestamp: 'Just now',
          recommendations: [
            'Never share OTPs, passwords, or CVVs over phone or chat',
            'Cross-check caller identity by reaching official bank portals directly',
            'If you transferred funds to a fraudulent party, call 1930 immediately',
          ],
          actionLink: onNavigate
            ? { label: 'Analyze suspicious text in Detector', tab: 'detector' }
            : undefined,
        };
      }

      setMessages((prev) => [...prev, assistantReply]);
      setIsTyping(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Cyber Advisor</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">AI Cyber Safety Assistant</h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
          Ask conversational questions regarding online safety, payment verification, and scam prevention techniques.
        </p>
      </div>

      {/* Suggested Prompts (Smart Defaults UX principle) */}
      <div className="space-y-2">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block px-1">
          Common Cyber Safety Inquiries:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(q)}
              className="px-3 py-1.5 rounded-lg bg-midnight-900 border border-slate-800 hover:border-emerald-500/40 text-left transition-all text-xs text-slate-300 hover:text-emerald-300"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread Container */}
      <Card variant="elevated" className="p-4 sm:p-6 bg-midnight-900 border-slate-800 space-y-5">
        <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-3 ${
                m.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {m.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`rounded-2xl p-4 text-xs sm:text-sm max-w-xl space-y-2.5 ${
                  m.sender === 'user'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-midnight-950 border border-slate-800 text-slate-200'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>

                {m.recommendations && m.recommendations.length > 0 && (
                  <div className="pt-2 border-t border-slate-800 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                      Key Defensive Takeaways:
                    </span>
                    <ul className="space-y-1">
                      {m.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-300">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {m.actionLink && onNavigate && (
                  <div className="pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onNavigate(m.actionLink!.tab)}
                      className="text-xs text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/10"
                    >
                      {m.actionLink.label} →
                    </Button>
                  </div>
                )}
              </div>

              {m.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-slate-400 pl-11">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Analyzing safety heuristics...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputQuery);
          }}
          className="flex items-center gap-2 pt-3 border-t border-slate-800"
        >
          <input
            type="text"
            placeholder="Type your cybersecurity question or paste suspicious phrase..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-midnight-950 border border-slate-700/80 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
          />
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputQuery.trim() || isTyping}
            rightIcon={<Send className="w-3.5 h-3.5" />}
            className="text-xs font-semibold px-4"
          >
            Ask
          </Button>
        </form>
      </Card>
    </div>
  );
};
