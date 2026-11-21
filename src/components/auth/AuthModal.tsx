import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '@/context/AuthContext';
import { User, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

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
          setErrorMsg(res.error || 'Failed to sign in. Please verify your credentials.');
        }
      } else if (tab === 'signup') {
        const res = await signUp(email, password, displayName);
        if (res.success) {
          if (res.needsConfirmation) {
            setSuccessMsg(
              'Account created! Supabase has sent a confirmation link to your email. Please verify it to sign in (or turn off "Confirm email" in your Supabase Auth settings to enable instant sign-in).'
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
          setSuccessMsg('Password reset instructions sent to your email.');
        } else {
          setErrorMsg(res.error || 'Unable to send reset email.');
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
      title={
        tab === 'signin'
          ? 'Sign in to CyberShield'
          : tab === 'signup'
          ? 'Create a CyberShield Account'
          : 'Reset Your Password'
      }
      description={
        tab === 'signup'
          ? 'Start tracking your scans and managing security reports.'
          : 'Access your private scan dashboard and history.'
      }
      maxWidth="md"
    >
      <div className="space-y-5">
        {/* Tab switch */}
        <div className="flex border-b border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => {
              setTab('signin');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'signin'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
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
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'signup'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('forgot');
              setErrorMsg('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-center border-b-2 transition-colors ${
              tab === 'forgot'
                ? 'border-emerald-500 text-emerald-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Forgot Password
          </button>
        </div>

        {/* Error / Success messages */}
        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'signup' && (
            <Input
              label="Display Name (Optional)"
              placeholder="e.g. Alex"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {tab !== 'forgot' && (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full text-xs font-semibold mt-2"
            isLoading={isLoading}
          >
            {tab === 'signin'
              ? 'Sign In to Dashboard'
              : tab === 'signup'
              ? 'Create Account'
              : 'Send Reset Instructions'}
          </Button>
        </form>

        {/* Demo Fast Login for Reviewers */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Quick Testing Access:</span>
            <span className="text-emerald-400 font-mono">One-Click Demo</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin('user')}
              leftIcon={<User className="w-3.5 h-3.5 text-emerald-400" />}
              className="text-xs"
            >
              Test as User
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => handleDemoLogin('admin')}
              leftIcon={<ShieldAlert className="w-3.5 h-3.5 text-purple-400" />}
              className="text-xs text-purple-300 border-purple-500/30 hover:bg-purple-950/30"
            >
              Test as Admin
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
