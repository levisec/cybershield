import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '@/lib/types';
import { supabase, isSupabaseConfigured, LocalStore } from '@/lib/supabase';

interface AuthContextType {
  currentUser: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password?: string, displayName?: string) => Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (displayName: string, saveHistoryConsent: boolean) => Promise<{ success: boolean; error?: string }>;
  deleteAccount: () => Promise<{ success: boolean; error?: string }>;
  loginAsDemo: (role: 'user' | 'admin') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_STORAGE_KEY = 'cybershield_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      if (isSupabaseConfigured() && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profile) {
              setCurrentUser({
                id: profile.id,
                email: profile.email,
                display_name: profile.display_name,
                role: profile.role || 'user',
                created_at: profile.created_at,
                save_history_consent: profile.save_history_consent ?? true,
              });
            } else {
              setCurrentUser({
                id: session.user.id,
                email: session.user.email || 'user@cybershield.local',
                display_name: session.user.user_metadata?.display_name,
                role: 'user',
                created_at: session.user.created_at,
                save_history_consent: true,
              });
            }
          }
        } catch (err) {
          console.warn('Supabase session load error, falling back to local session', err);
        }
      } else {
        // Load local session from localStorage if present
        try {
          const cached = localStorage.getItem(LOCAL_USER_STORAGE_KEY);
          if (cached) {
            setCurrentUser(JSON.parse(cached));
          }
        } catch {
          // Ignore parse errors
        }
      }
      setIsLoading(false);
    };

    initAuth();

    // Listen to Supabase auth events if connected
    const sb = supabase;
    if (isSupabaseConfigured() && sb) {
      const { data: authListener } = sb.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            const { data: profile } = await sb
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            setCurrentUser({
              id: session.user.id,
              email: session.user.email || '',
              display_name: profile?.display_name || session.user.user_metadata?.display_name,
              role: profile?.role || 'user',
              created_at: session.user.created_at,
              save_history_consent: profile?.save_history_consent ?? true,
            });
          } else {
            setCurrentUser(null);
          }
        }
      );

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const saveLocalUser = (user: UserProfile | null) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem(LOCAL_USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LOCAL_USER_STORAGE_KEY);
    }
  };

  const signIn = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase && password) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          setIsLoading(false);
          if (error.message.toLowerCase().includes('email not confirmed')) {
            return {
              success: false,
              error:
                'Email not confirmed yet. Please check your inbox for the confirmation email from Supabase, or turn off "Confirm email" in Supabase Dashboard > Authentication > Providers > Email.',
            };
          }
          return { success: false, error: error.message };
        }
        setIsLoading(false);
        return { success: true };
      } else {
        // Fallback local authentication
        const demoUser: UserProfile = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          email,
          display_name: email.split('@')[0],
          role: email.toLowerCase().includes('admin') ? 'admin' : 'user',
          created_at: new Date().toISOString(),
          save_history_consent: true,
        };
        saveLocalUser(demoUser);
        LocalStore.addAuditLog({
          actor_id: demoUser.id,
          actor_email: demoUser.email,
          action: 'USER_LOGIN',
          resource_type: 'AUTH',
          details: 'User authenticated successfully',
        });
        setIsLoading(false);
        return { success: true };
      }
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e.message || 'Authentication error' };
    }
  };

  const signUp = async (
    email: string,
    password?: string,
    displayName?: string
  ): Promise<{ success: boolean; error?: string; needsConfirmation?: boolean }> => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured() && supabase && password) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName || email.split('@')[0] },
          },
        });
        if (error) {
          setIsLoading(false);
          return { success: false, error: error.message };
        }
        setIsLoading(false);
        const needsConfirmation = !data.session;
        return { success: true, needsConfirmation };
      } else {
        const newUser: UserProfile = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          email,
          display_name: displayName || email.split('@')[0],
          role: 'user',
          created_at: new Date().toISOString(),
          save_history_consent: true,
        };
        saveLocalUser(newUser);
        LocalStore.addAuditLog({
          actor_id: newUser.id,
          actor_email: newUser.email,
          action: 'USER_REGISTER',
          resource_type: 'AUTH',
          details: 'New user account created',
        });
        setIsLoading(false);
        return { success: true };
      }
    } catch (e: any) {
      setIsLoading(false);
      return { success: false, error: e.message || 'Sign up error' };
    }
  };

  const signOut = async () => {
    if (currentUser) {
      LocalStore.addAuditLog({
        actor_id: currentUser.id,
        actor_email: currentUser.email,
        action: 'USER_LOGOUT',
        resource_type: 'AUTH',
      });
    }
    if (isSupabaseConfigured() && supabase) {
      await supabase.auth.signOut();
    }
    saveLocalUser(null);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { success: false, error: error.message };
      return { success: true };
    }
    // Demo response
    return { success: true };
  };

  const updateProfile = async (
    displayName: string,
    saveHistoryConsent: boolean
  ): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    const updatedUser: UserProfile = {
      ...currentUser,
      display_name: displayName,
      save_history_consent: saveHistoryConsent,
    };

    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase
        .from('profiles')
        .update({
          display_name: displayName,
          save_history_consent: saveHistoryConsent,
        })
        .eq('id', currentUser.id);

      if (error) return { success: false, error: error.message };
    }

    saveLocalUser(updatedUser);
    LocalStore.addAuditLog({
      actor_id: currentUser.id,
      actor_email: currentUser.email,
      action: 'PROFILE_UPDATE',
      resource_type: 'USER_PROFILE',
      details: 'Updated profile preferences',
    });
    return { success: true };
  };

  const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    LocalStore.addAuditLog({
      actor_id: currentUser.id,
      actor_email: currentUser.email,
      action: 'ACCOUNT_DELETION',
      resource_type: 'USER_PROFILE',
      details: 'User requested account and data deletion',
    });

    if (isSupabaseConfigured() && supabase) {
      // In Supabase, account deletion can be invoked via RPC or Supabase Edge function
      await supabase.from('profiles').delete().eq('id', currentUser.id);
      await supabase.auth.signOut();
    }

    // Clear user data
    LocalStore.clearAnalyses();
    LocalStore.clearUrlChecks();
    saveLocalUser(null);
    return { success: true };
  };

  const loginAsDemo = (role: 'user' | 'admin') => {
    const demoUser: UserProfile = {
      id: role === 'admin' ? 'demo-admin-01' : 'demo-user-01',
      email: role === 'admin' ? 'admin@cybershield.org' : 'alex@example.com',
      display_name: role === 'admin' ? 'Security Admin' : 'Alex Johnson',
      role: role,
      created_at: new Date().toISOString(),
      save_history_consent: true,
    };
    saveLocalUser(demoUser);
    LocalStore.addAuditLog({
      actor_id: demoUser.id,
      actor_email: demoUser.email,
      action: 'DEMO_LOGIN',
      resource_type: 'AUTH',
      details: `Logged in as demo ${role}`,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        signIn,
        signUp,
        signOut,
        resetPassword,
        updateProfile,
        deleteAccount,
        loginAsDemo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
