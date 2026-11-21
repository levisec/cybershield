import React, { useState } from 'react';
import {
  Shield,
  Search,
  Globe,
  FileWarning,
  BookOpen,
  LifeBuoy,
  LayoutDashboard,
  History,
  ShieldAlert,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  PhoneCall,
  Sparkles,
} from 'lucide-react';
import { Button } from './Button';
import { UserProfile } from '@/lib/types';

export type ActiveTab =
  | 'home'
  | 'detector'
  | 'url-checker'
  | 'report-scam'
  | 'awareness'
  | 'recovery'
  | 'about'
  | 'dashboard'
  | 'assistant'
  | 'scan-history'
  | 'my-reports'
  | 'admin'
  | 'privacy'
  | 'terms';

interface NavbarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  currentUser: UserProfile | null;
  onOpenAuthModal: () => void;
  onOpenProfileModal: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  currentUser,
  onOpenAuthModal,
  onOpenProfileModal,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (tab: ActiveTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'admin';

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'border-b border-slate-800 bg-midnight-950/95 backdrop-blur-xl shadow-xl shadow-black/50'
          : 'border-b border-slate-800/80 bg-midnight-950/80 backdrop-blur-md'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-navy-800 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/60 transition-colors shadow-sm">
              <Shield className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white font-sans">
                  Cyber<span className="text-emerald-400">Shield</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI Safe
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Detect • Understand • Protect
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {!isAuthenticated ? (
              // Public Navigation
              <>
                <button
                  onClick={() => handleNavClick('home')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'home'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('detector')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'detector'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  Scam Detector
                </button>
                <button
                  onClick={() => handleNavClick('url-checker')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'url-checker'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  URL Checker
                </button>
                <button
                  onClick={() => handleNavClick('report-scam')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'report-scam'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <FileWarning className="w-3.5 h-3.5" />
                  Report Scam
                </button>
                <button
                  onClick={() => handleNavClick('awareness')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'awareness'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Awareness
                </button>
                <button
                  onClick={() => handleNavClick('recovery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'recovery'
                      ? 'bg-rose-950/40 text-rose-300 border border-rose-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-rose-400" />
                  Recovery Centre
                </button>
              </>
            ) : (
              // Authenticated Navigation
              <>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'dashboard'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavClick('detector')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'detector'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  Scam Detector
                </button>
                <button
                  onClick={() => handleNavClick('url-checker')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'url-checker'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  URL Checker
                </button>
                <button
                  onClick={() => handleNavClick('assistant')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'assistant'
                      ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  AI Assistant
                </button>
                <button
                  onClick={() => handleNavClick('scan-history')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'scan-history'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <History className="w-3.5 h-3.5" />
                  Scan History
                </button>
                <button
                  onClick={() => handleNavClick('my-reports')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'my-reports'
                      ? 'bg-slate-800 text-emerald-400'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <FileWarning className="w-3.5 h-3.5" />
                  My Reports
                </button>
                <button
                  onClick={() => handleNavClick('recovery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                    activeTab === 'recovery'
                      ? 'bg-rose-950/40 text-rose-300'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <LifeBuoy className="w-3.5 h-3.5 text-rose-400" />
                  Recovery
                </button>
              </>
            )}

            {/* Admin link if administrator */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  activeTab === 'admin'
                    ? 'bg-purple-900/40 text-purple-300 border border-purple-500/30'
                    : 'text-purple-400 hover:text-purple-200 hover:bg-purple-950/40'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
                Admin Panel
              </button>
            )}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-3">
            {/* Quick emergency button */}
            <button
              onClick={() => handleNavClick('recovery')}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-lg transition-all"
              title="Immediate emergency help & 1930 Helpline guide"
            >
              <PhoneCall className="w-3 h-3 text-rose-400" />
              <span>Helpline 1930</span>
            </button>

            {!isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                onClick={onOpenAuthModal}
                className="text-xs"
              >
                Sign In
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenProfileModal}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-navy-850 border border-slate-700/80 hover:border-slate-600 text-xs text-slate-200 transition-colors"
                  title="Profile & Settings"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                    {currentUser.display_name?.charAt(0).toUpperCase() ||
                      currentUser.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate hidden md:inline">
                    {currentUser.display_name || currentUser.email.split('@')[0]}
                  </span>
                </button>
                <button
                  onClick={onSignOut}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-navy-900/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('detector')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            Scam Detector
          </button>
          <button
            onClick={() => handleNavClick('url-checker')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
            URL Checker
          </button>
          {isAuthenticated && (
            <>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                User Dashboard
              </button>
              <button
                onClick={() => handleNavClick('assistant')}
                className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                AI Assistant
              </button>
              <button
                onClick={() => handleNavClick('scan-history')}
                className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
              >
                <History className="w-4 h-4 text-emerald-400" />
                Scan History
              </button>
            </>
          )}
          <button
            onClick={() => handleNavClick('report-scam')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <FileWarning className="w-4 h-4 text-amber-400" />
            Report a Scam
          </button>
          <button
            onClick={() => handleNavClick('awareness')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-slate-200 hover:bg-slate-800 flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            Cyber Awareness
          </button>
          <button
            onClick={() => handleNavClick('recovery')}
            className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-rose-300 hover:bg-rose-950/30 flex items-center gap-2"
          >
            <LifeBuoy className="w-4 h-4 text-rose-400" />
            Cyber Recovery Centre (1930)
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full text-left px-3 py-2 text-sm font-medium rounded-lg text-purple-300 hover:bg-purple-950/30 flex items-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-purple-400" />
              Admin Portal
            </button>
          )}

          <div className="pt-3 border-t border-slate-800">
            {!isAuthenticated ? (
              <Button
                variant="primary"
                className="w-full text-sm"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuthModal();
                }}
              >
                Sign In / Register
              </Button>
            ) : (
              <div className="space-y-2">
                <Button
                  variant="secondary"
                  className="w-full text-xs justify-start"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenProfileModal();
                  }}
                  leftIcon={<UserIcon className="w-4 h-4" />}
                >
                  Profile & Preferences
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-xs justify-start text-rose-400 hover:text-rose-300"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  leftIcon={<LogOut className="w-4 h-4" />}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
