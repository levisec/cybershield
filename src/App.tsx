import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Navbar, ActiveTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { AboutView } from './components/about/AboutView';
import { PrivacyPolicyView } from './components/legal/PrivacyPolicyView';
import { TermsOfServiceView } from './components/legal/TermsOfServiceView';
import { ScamDetectorView } from './components/detection/ScamDetectorView';
import { UrlCheckerView } from './components/detection/UrlCheckerView';
import { CyberAwarenessView } from './components/awareness/CyberAwarenessView';
import { RecoveryCentreView } from './components/recovery/RecoveryCentreView';
import { UserDashboardView } from './components/dashboard/UserDashboardView';
import { ScanHistoryView } from './components/dashboard/ScanHistoryView';
import { ReportScamView } from './components/reporting/ReportScamView';
import { MyReportsView } from './components/reporting/MyReportsView';
import { AssistantView } from './components/assistant/AssistantView';
import { AdminDashboardView } from './components/admin/AdminDashboardView';
import { AuthModal } from './components/auth/AuthModal';
import { UserProfileModal } from './components/auth/UserProfileModal';

// ── Inner app that can safely call useAuth() ──────────────────────────────────
const AppInner: React.FC = () => {
  const { currentUser, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  /** Navigate, but guard protected tabs behind auth */
  const handleNavigate = (tab: ActiveTab) => {
    const protectedTabs: ActiveTab[] = ['dashboard', 'scan-history'];
    if (protectedTabs.includes(tab) && !currentUser) {
      setIsAuthModalOpen(true);
      return; // stay on current tab
    }
    setActiveTab(tab);
  };

  const handleClearLocalHistory = () => {
    localStorage.removeItem('cybershield_scans');
    localStorage.removeItem('cybershield_urls');
    alert('Local browser scan history has been cleared.');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-midnight-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
            <ShieldAlert className="w-6 h-6 text-emerald-400" />
          </div>
          <p className="text-sm text-slate-400">Loading CyberShield…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-midnight-950 text-slate-100">
      {/* ── Navbar ───────────────────────────────────────────────────────── */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleNavigate}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onSignOut={signOut}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView onNavigate={handleNavigate} />}

        {activeTab === 'about' && <AboutView onNavigate={handleNavigate} />}

        {activeTab === 'privacy' && (
          <PrivacyPolicyView onClearLocalHistory={handleClearLocalHistory} />
        )}

        {activeTab === 'terms' && <TermsOfServiceView />}

        {activeTab === 'detector' && (
          <ScamDetectorView
            onNavigate={handleNavigate}
            onReportScam={() => handleNavigate('report-scam')}
          />
        )}

        {activeTab === 'url-checker' && (
          <UrlCheckerView
            onNavigate={handleNavigate}
            onReportScam={() => handleNavigate('report-scam')}
          />
        )}

        {activeTab === 'awareness' && (
          <CyberAwarenessView onNavigate={handleNavigate} />
        )}

        {activeTab === 'recovery' && (
          <RecoveryCentreView onNavigate={handleNavigate} />
        )}

        {activeTab === 'dashboard' && currentUser && (
          <UserDashboardView onNavigate={handleNavigate} />
        )}

        {activeTab === 'scan-history' && currentUser && (
          <ScanHistoryView onNavigate={handleNavigate} />
        )}

        {/* ── Report a Scam ────────────────────────────────────────────── */}
        {activeTab === 'report-scam' && (
          <ReportScamView onNavigate={handleNavigate} />
        )}

        {/* ── AI Assistant ──────────────────────────────────────────────── */}
        {activeTab === 'assistant' && (
          <AssistantView onNavigate={handleNavigate} />
        )}

        {/* ── My Reports / Community Feed ───────────────────────────────── */}
        {activeTab === 'my-reports' && (
          <MyReportsView onNavigate={handleNavigate} />
        )}

        {/* ── Admin Dashboard ───────────────────────────────────────────── */}
        {activeTab === 'admin' && (
          <AdminDashboardView onNavigate={handleNavigate} />
        )}
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <Footer onSelectTab={handleNavigate} />

      {/* ── Modal overlays ───────────────────────────────────────────────── */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};

// ── Root export wrapped in AuthProvider ──────────────────────────────────────
export const App: React.FC = () => (
  <ThemeProvider>
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  </ThemeProvider>
);

export default App;
