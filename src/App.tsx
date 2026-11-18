import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomeView } from './components/home/HomeView';
import { AboutView } from './components/about/AboutView';
import { PrivacyPolicyView } from './components/legal/PrivacyPolicyView';
import { TermsOfServiceView } from './components/legal/TermsOfServiceView';
import { UserProfile } from './lib/types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleClearLocalHistory = () => {
    localStorage.removeItem('cybershield_scans');
    localStorage.removeItem('cybershield_urls');
    alert('Local browser scan history has been cleared.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100">
      <Navbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuthModal={() => {}}
        onOpenProfileModal={() => {}}
        onSignOut={() => setCurrentUser(null)}
      />

      <main className="flex-1">
        {activeTab === 'home' && <HomeView onNavigate={setActiveTab} />}
        {activeTab === 'about' && <AboutView onNavigate={setActiveTab} />}
        {activeTab === 'privacy' && (
          <PrivacyPolicyView onClearLocalHistory={handleClearLocalHistory} />
        )}
        {activeTab === 'terms' && <TermsOfServiceView />}
        {/* Placeholder for phases 2-8 views */}
        {['detector', 'url-checker', 'report-scam', 'awareness', 'recovery', 'dashboard', 'assistant', 'scan-history', 'my-reports', 'admin'].includes(activeTab) && (
          <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
            <h2 className="text-2xl font-bold text-white capitalize">{activeTab.replace('-', ' ')}</h2>
            <p className="text-slate-400 text-sm">Component is being loaded in current phase...</p>
          </div>
        )}
      </main>

      <Footer onSelectTab={setActiveTab} />
    </div>
  );
};

export default App;
