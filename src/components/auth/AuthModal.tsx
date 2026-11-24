import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '@/context/AuthContext';
import {
  User,
  Shield,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { signIn, signUp, resetPassword, loginAsDemo } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score; // 0 to 4
  };

  const passwordStrength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);

    if (!email || (!password && tab !== 'forgot')) {
      setErrorMsg('Please complete all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      if (tab === 'signin') {
        const res = await signIn(email, password);
        if (res.success) {
          onClose();
        } else {
          setErrorMsg(res.error || 'Failed to sign in. Please verify your email and password.');
        }
      } else if (tab === 'signup') {
        const cleanName = displayName.trim() || email.split('@')[0];
        // Cache display name immediately so it is never lost
        try {
          localStorage.setItem('cybershield_name_' + email.toLowerCase().trim(), cleanName);
        } catch {
          // Ignore
        }

        const res = await signUp(email, password, cleanName);
        if (res.success) {
          if (res.needsConfirmation) {
            setSuccessMsg(
              'Account created! Supabase requires email verification. Please check your inbox (or turn off "Confirm email" in Supabase Auth settings to enable immediate sign-in).'
            );
            setTab('signin');
          } else {
            onClose();
          }
        } else {
          setErrorMsg(res.error || 'Failed to create account.');
        }
      } else if (tab === 'forgot') {
        const res = await resetPassword(email);
        if (res.success) {
          setSuccessMsg('Password recovery instructions sent to your email.');
        } else {
          setErrorMsg(res.error || 'Unable to send recovery email.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role: 'user' | 'admin') => {
    loginAsDemo(role);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      className="p-6 sm:p-8"
    >
      <div className="space-y-6">
        {/* ── Security Header with Breathing Room ── */}
        <div className="text-center space-y-3 pb-2">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-emerald">
            <Shield className="w-7 h-7 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {tab === 'signin'
                ? 'Sign in to CyberShield'
                : tab === 'signup'
                ? 'Create Your Security Account'
                : 'Reset Account Password'}
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              {tab === 'signup'
                ? 'Register to track threat analyses, access your personal readiness checklist, and save incident history.'
                : tab === 'signin'
                ? 'Access your private threat dashboard and encrypted analysis history.'
                : 'Enter your email address to receive secure password recovery instructions.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-medium text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Client-side Zero-Knowledge Encryption</span>
          </div>
        </div>

        {/* ── Segmented Navigation Tabs with Generous Padding ── */}
        <div className="flex p-1 rounded-xl bg-midnight-950 border border-slate-800 text-xs font-semibold gap-1">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              tab === 'signin'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              tab === 'signup'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Account
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('forgot');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 rounded-lg transition-all text-center ${
              tab === 'forgot'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Reset
          </button>
        </div>

        {/* ── Feedback Notices ── */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-rose-200">Authentication Alert</p>
              <p className="leading-relaxed">{errorMsg}</p>
            </div>
          </div>
        )}

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-emerald-200">Confirmation Sent</p>
              <p className="leading-relaxed">{successMsg}</p>
            </div>
          </div>
        )}

        {/* ── Spacious Form ── */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {tab === 'signup' && (
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Full Name / Display Name
              </label>
              <div className="relative">
                <Input
                  placeholder="e.g. Rahul Sharma"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-9 text-sm"
                  required
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400">
                This name will appear on your personalized dashboard and scan reports.
              </p>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 text-sm"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          {tab !== 'forgot' && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-300">
                  Password
                </label>
                {tab === 'signin' && (
                  <button
                    type="button"
                    onClick={() => {
                      setTab('forgot');
                      setErrorMsg('');
                    }}
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 text-sm"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-200 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password strength meter for registration */}
              {tab === 'signup' && password.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Password Strength:</span>
                    <span
                      className={`font-semibold ${
                        passwordStrength <= 1
                          ? 'text-rose-400'
                          : passwordStrength <= 2
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {passwordStrength <= 1
                        ? 'Weak'
                        : passwordStrength <= 2
                        ? 'Moderate'
                        : 'Strong'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`rounded-full transition-all duration-300 ${
                          passwordStrength >= step
                            ? step <= 1
                              ? 'bg-rose-500'
                              : step <= 2
                              ? 'bg-amber-500'
                              : 'bg-emerald-400'
                            : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-xs font-bold py-3 shadow-lg shadow-emerald-500/20"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {tab === 'signin'
                ? 'Sign In to Dashboard'
                : tab === 'signup'
                ? 'Complete Registration'
                : 'Send Password Reset Email'}
            </Button>
          </div>
        </form>

        {/* ── Instant One-Click Reviewer Access with Generous Breathing Room ── */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              Quick Reviewer Access
            </span>
            <span className="text-[11px] font-mono text-emerald-400">Instant Demo</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoLogin('user')}
              className="flex items-center justify-between p-3 rounded-xl bg-midnight-950 border border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                    Citizen User
                  </p>
                  <p className="text-[10px] text-slate-400">Alex • Personal Dashboard</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              className="flex items-center justify-between p-3 rounded-xl bg-midnight-950 border border-purple-500/30 hover:border-purple-500/60 hover:bg-purple-950/20 transition-all text-left group"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white group-hover:text-purple-300 transition-colors">
                    Security Analyst
                  </p>
                  <p className="text-[10px] text-purple-300/70">Admin • Incident Command</p>
                </div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
