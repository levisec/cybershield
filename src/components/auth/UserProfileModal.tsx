import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/lib/utils';
import { Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentUser, updateProfile, deleteAccount } = useAuth();
  const [displayName, setDisplayName] = useState(currentUser?.display_name || '');
  const [saveConsent, setSaveConsent] = useState(currentUser?.save_history_consent ?? true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!currentUser) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg(null);
    const res = await updateProfile(displayName, saveConsent);
    if (res.success) {
      setMsg({ type: 'success', text: 'Profile updated successfully.' });
    } else {
      setMsg({ type: 'error', text: res.error || 'Failed to update profile.' });
    }
    setIsSaving(false);
  };

  const handleDeleteAccount = async () => {
    const res = await deleteAccount();
    if (res.success) {
      onClose();
    } else {
      setMsg({ type: 'error', text: res.error || 'Failed to delete account.' });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Profile & Privacy Preferences"
      description="Manage your identity, consent, and security settings."
      maxWidth="md"
    >
      <div className="space-y-6">
        {msg && (
          <div
            className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
              msg.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/40 border border-rose-500/30 text-rose-300'
            }`}
          >
            {msg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="flex items-center gap-3 p-3.5 rounded-xl bg-navy-950 border border-slate-800">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-lg">
            {currentUser.display_name?.charAt(0).toUpperCase() ||
              currentUser.email.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-white text-sm">
                {currentUser.display_name || 'CyberShield User'}
              </h4>
              <span
                className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                    : 'bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Member since {formatDate(currentUser.created_at)}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name or handle"
          />

          {/* Privacy Consent Checkbox */}
          <div className="p-3.5 rounded-xl bg-navy-950/80 border border-slate-800 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={saveConsent}
                onChange={(e) => setSaveConsent(e.target.checked)}
                className="mt-0.5 rounded border-slate-700 bg-navy-900 text-emerald-500 focus:ring-emerald-500"
              />
              <div className="text-xs space-y-0.5">
                <span className="font-medium text-slate-200 block">
                  Consent to Save Scan History
                </span>
                <span className="text-slate-400 text-[11px] block leading-relaxed">
                  When enabled, your scam analyses and URL checks are saved to your private dashboard. You can delete individual scans or clear history anytime.
                </span>
              </div>
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={isSaving}
              className="text-xs font-semibold"
            >
              Save Preferences
            </Button>
          </div>
        </form>

        {/* Account Deletion Area */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
            Danger Zone
          </h4>

          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-300">Delete Account & Data</p>
                <p className="text-[11px] text-slate-500">
                  Permanently remove your account, profile, and scan logs.
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                Delete Account
              </Button>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-3">
              <p className="text-xs text-rose-300 leading-relaxed">
                <strong>Are you sure?</strong> This action is permanent and cannot be undone. All your saved scans, reports, and profile records will be wiped immediately.
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteAccount}
                  className="bg-rose-600 hover:bg-rose-500 text-white text-xs"
                >
                  Yes, Permanently Delete Everything
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
