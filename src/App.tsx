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

const TAB_TITLES: Record<ActiveTab, string> = {
  home: 'CyberShield Threat Intelligence',
  detector: 'AI Scam Detection Console',
  'url-checker': 'Zero-Visit URL Security Inspector',
  awareness: 'Cyber Awareness & Interactive Academy',
  recovery: 'Emergency Helpline 1930 & Recovery',
  dashboard: 'Personal Cyber Defense Command',
  assistant: 'CyberShield AI Safety Advisor',
  'scan-history': 'Your Threat Scan History',
  'my-reports': 'Community Incident Reports',
  admin: 'Incident Command & Operations Center',
  about: 'About CyberShield Mission',
  privacy: 'Privacy & Data Governance Policy',
  terms: 'Terms of Service',
  'report-scam': 'Community Threat Reporting',
};

// ── Inner app that can safely call useAuth() ──────────────────────────────────
const AppInner: React.FC = () => {
  const { currentUser, signOut, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [preloadedDetectorText, setPreloadedDetectorText] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [transitionTargetTitle, setTransitionTargetTitle] = useState('CyberShield Intelligence');

  /** Smooth navigation with transition loader and smooth scroll */
  const handleNavigate = (tab: ActiveTab) => {
    const protectedTabs: ActiveTab[] = ['dashboard', 'scan-history'];
    if (protectedTabs.includes(tab) && !currentUser) {
      setIsAuthModalOpen(true);
      return; // stay on current tab
    }

    if (tab === activeTab) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Smooth scroll to top immediately
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show brief cyber transition state
    setTransitionTargetTitle(TAB_TITLES[tab] || 'Security Console');
    setIsPageTransitioning(true);

    setTimeout(() => {
      setActiveTab(tab);
      window.scrollTo({ top: 0, behavior: 'auto' });
      setTimeout(() => {
        setIsPageTransitioning(false);
      }, 100);
    }, 280);
  };

  /** Quick scan helper to jump from homepage chips straight to detector with text filled */
  const handleQuickScanExample = (sampleText: string) => {
    setPreloadedDetectorText(sampleText);
    handleNavigate('detector');
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

      {/* ── Main content with spacious layout and smooth transition ─────── */}
      <main className="flex-1 min-h-[calc(100vh-8rem)]">
        {isPageTransitioning ? (
          <div className="min-h-[60vh] flex items-center justify-center p-6 animate-in fade-in duration-200">
            <div className="flex flex-col items-center gap-6 p-8 sm:p-10 rounded-2xl glass-panel-elevated border border-emerald-500/20 max-w-md w-full text-center shadow-2xl shadow-black/40">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center glow-emerald">
                  <ShieldAlert className="w-8 h-8 text-emerald-400 animate-pulse" />
                </div>
                <div className="absolute inset-0 rounded-2xl border-2 border-emerald-400/30 animate-ping pointer-events-none" />
              </div>
              <div className="space-y-2">
                <h4 className="text-base font-bold text-white tracking-wide">
                  {transitionTargetTitle}
                </h4>
                <p className="text-xs text-slate-400 flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Verifying secure connection & loading module…
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {activeTab === 'home' && (
              <HomeView
                onNavigate={handleNavigate}
                onQuickScanExample={handleQuickScanExample}
              />
            )}

            {activeTab === 'about' && <AboutView onNavigate={handleNavigate} />}

            {activeTab === 'privacy' && (
              <PrivacyPolicyView onClearLocalHistory={handleClearLocalHistory} />
            )}

            {activeTab === 'terms' && <TermsOfServiceView />}

            {activeTab === 'detector' && (
              <ScamDetectorView
                onNavigate={handleNavigate}
                onReportScam={() => handleNavigate('report-scam')}
                initialText={preloadedDetectorText}
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
          </div>
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
