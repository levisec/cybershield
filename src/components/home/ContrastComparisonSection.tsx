import React, { useState } from 'react';
import { Card } from '../common/Card';
import { CheckCircle2, XCircle, ShieldCheck, ShieldAlert } from 'lucide-react';

export const ContrastComparisonSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'banking' | 'electricity' | 'upi'>('upi');

  const comparisons = {
    upi: {
      category: 'UPI & Marketplace Transactions',
      legitimate: {
        title: 'Authentic UPI Payment Received',
        sender: 'UPI Service / Bank Alert',
        message: 'Dear User, your A/C has been CREDITED with Rs 2,500 via UPI Ref 439120194821 from Priya Verma. No PIN was required to receive this payment. Available Balance: Rs 18,400.',
        markers: [
          'Money was credited automatically without entering any PIN',
          'No request to scan any QR code to "accept" funds',
          'Standard informational statement with transaction reference',
        ],
      },
      scam: {
        title: 'Deceptive QR Code / Reverse Mandate Trap',
        sender: 'Unknown Buyer on WhatsApp (+91 98XXX)',
        message: 'Sir I am sending Rs 2,500 advance. Open Google Pay, SCAN THIS QR CODE and ENTER YOUR 6-DIGIT UPI PIN to receive money into your account immediately.',
        markers: [
          'Asks you to enter your UPI PIN to "receive" money (entering PIN debits your account!)',
          'Uses urgency: "immediately approve request"',
          'Pretends QR codes are used to collect money',
        ],
      },
    },
    electricity: {
      category: 'Utility & Electricity Notices',
      legitimate: {
        title: 'Official Electricity Billing Notification',
        sender: 'DISCOM Official Shortcode (e.g., VM-TNEB)',
        message: 'Dear Consumer #981240, bill for cycle Nov-2026 is Rs 1,420 due on 28-Nov-2026. Pay safely through our official portal www.tnebnet.org or consumer app. Ignore if already paid.',
        markers: [
          'Clear due date allowing normal payment window (10+ days)',
          'Directs payment to verified government/discom official portal',
          'Sent from registered telecom alpha sender ID, not personal 10-digit mobile',
        ],
      },
      scam: {
        title: 'Urgent Disconnection Phishing SMS',
        sender: 'Personal 10-digit Mobile Number (+91 87XXX)',
        message: 'URGENT NOTICE: Dear consumer your electricity power will be DISCONNECTED TONIGHT AT 9:30 PM due to unpaid bill. Call electricity officer immediately at 98123-XXXXX or update app at http://power-bill.top.',
        markers: [
          'Creates panic deadline ("tonight at 9:30 PM")',
          'Directs calls to personal unknown mobile number',
          'Suspicious link with low-cost disposable TLD (.top)',
        ],
      },
    },
    banking: {
      category: 'Bank Account & KYC Alerts',
      legitimate: {
        title: 'Official Bank Security Guidance',
        sender: 'Bank Alpha Sender ID (e.g. AX-HDFCBK)',
        message: 'HDFC Bank never asks for your NetBanking password, OTP, or CVV. To update KYC, please visit your nearest home branch with your original documents or log in to the official NetBanking portal.',
        markers: [
          'Never contains direct clickable links to input passwords',
          'Explicitly advises visiting your physical branch or verified app',
          'Emphasizes secrecy of passwords and OTPs',
        ],
      },
      scam: {
        title: 'Fake Account Deactivation Link',
        sender: 'Unknown SMS / Unregistered Number',
        message: 'Dear Customer, your bank account XYZ has been BLOCKED due to expired PAN KYC. Click http://hdfc-pan-update.xyz to submit OTP within 12 hours to restore banking.',
        markers: [
          'Threatens immediate account block / suspension',
          'Contains lookalike domain (hdfc-pan-update.xyz instead of hdfcbank.com)',
          'Demands instant OTP and credential submission',
        ],
      },
    },
  };

  const current = comparisons[selectedCategory];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/20">
          <span>The Contrast Effect</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
          Spot the Difference: Real vs. Deceptive
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          Scammers prey on psychological triggers like fear, haste, and urgency. Compare real communications with common fraud templates side-by-side.
        </p>

        {/* Category Switcher Tabs */}
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setSelectedCategory('upi')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'upi'
                ? 'bg-emerald-500 text-midnight-950 font-semibold shadow-sm'
                : 'bg-midnight-850 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            UPI & Payments
          </button>
          <button
            onClick={() => setSelectedCategory('electricity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'electricity'
                ? 'bg-emerald-500 text-midnight-950 font-semibold shadow-sm'
                : 'bg-midnight-850 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Utility Disconnection
          </button>
          <button
            onClick={() => setSelectedCategory('banking')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              selectedCategory === 'banking'
                ? 'bg-emerald-500 text-midnight-950 font-semibold shadow-sm'
                : 'bg-midnight-850 text-slate-300 hover:text-white border border-slate-800'
            }`}
          >
            Bank KYC
          </button>
        </div>
      </div>

      {/* Side-by-Side Visual Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {/* Genuine Communication Card */}
        <Card className="p-6 bg-midnight-900 border-emerald-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-emerald-400">
                    {current.legitimate.title}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Sender: {current.legitimate.sender}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Safe Pattern
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-midnight-950 border border-slate-800 text-xs font-mono text-slate-200 leading-relaxed">
              "{current.legitimate.message}"
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">
                Why this is safe:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {current.legitimate.markers.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400/90 font-medium">
            Rule: Authentic institutions never rush you to disclose secrets.
          </div>
        </Card>

        {/* Deceptive Scam Communication Card */}
        <Card className="p-6 bg-midnight-900 border-rose-500/40 flex flex-col justify-between space-y-4 glow-danger">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-rose-400">
                    {current.scam.title}
                  </h3>
                  <span className="text-[10px] text-slate-400">
                    Sender: {current.scam.sender}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20">
                Malicious Red Flags
              </span>
            </div>

            <div className="mt-4 p-3.5 rounded-xl bg-midnight-950 border border-rose-900/50 text-xs font-mono text-rose-200 leading-relaxed">
              "{current.scam.message}"
            </div>

            <div className="mt-4 space-y-2">
              <h4 className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider">
                Deceptive Psychological Triggers:
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {current.scam.markers.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px]">
                    <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-rose-200/90">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-rose-400 font-medium">
            Warning: Entering a UPI PIN or clicking unverified links exposes credentials.
          </div>
        </Card>
      </div>
    </section>
  );
};
