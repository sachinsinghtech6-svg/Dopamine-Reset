import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';
import type { UserProfile } from '@/types/profile';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  loadingProfile: boolean;
  error: string | null;
  isConfigured: boolean;
  isMockMode: boolean;
  toggleMockMode: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName?: string) => Promise<{ success: boolean; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; error?: string }>;
  resetPasswordForEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  saveOnboardingData: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  updatePassword: (password: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingProfile, setLoadingProfile] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const isDev = import.meta.env.DEV;

  const fetchProfile = useCallback(async (userId: string) => {
    if (!supabase) return;
    setLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.warn('[Dopamine Reset] Profile fetch warning:', error.message);
      } else if (data) {
        setProfile(data as UserProfile);
      }
    } catch (err) {
      console.warn('[Dopamine Reset] Profile fetch error:', err);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  }, [user, fetchProfile]);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        setError(error.message);
      }
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const toggleMockMode = () => {
    if (!isDev) {
      console.warn('[Dopamine Reset] Mock auth cannot be activated in production.');
      return;
    }

    if (!isMockMode) {
      const mockUser = {
        id: 'dev-demo-user-108',
        email: 'serene.focus@dopaminereset.app',
        app_metadata: {},
        user_metadata: { full_name: 'Julian Vance' },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User;

      const mockProfile: UserProfile = {
        id: 'dev-demo-user-108',
        email: 'serene.focus@dopaminereset.app',
        full_name: 'Julian Vance',
        primary_goal: 'focus',
        target_platforms: ['Instagram', 'YouTube', 'TikTok'],
        daily_screen_time: '4 - 6 hours',
        peak_vulnerability_time: 'Late afternoon fatigue',
        triggers: ['Boredom & Stillness', 'Workplace Stress'],
        interruption_frequency: 'Sometimes (3-5x/hr)',
        evening_reflection_time: '21:00',
        quiet_window_start: '22:30',
        quiet_window_end: '07:00',
        weekend_sleep_extension: true,
        baseline_confidence: 94,
        onboarding_completed: false,
      };

      setUser(mockUser);
      setProfile(mockProfile);
      setIsMockMode(true);
    } else {
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsMockMode(false);
    }
  };

  const signInWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured || !supabase) {
      if (isDev) {
        return {
          success: false,
          error: 'Supabase credentials not set. Set VITE_SUPABASE_ANON_KEY in .env or toggle Dev Mock Mode.',
        };
      }
      return { success: false, error: 'Authentication service not configured.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      setUser(data.user);
      setSession(data.session);
      if (data.user) {
        await fetchProfile(data.user.id);
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const signUpWithEmail = async (
    email: string,
    password: string,
    fullName?: string
  ): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured.' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName || email.split('@')[0],
          },
        },
      });
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      // If Supabase didn't return an immediate session, sign in directly to acquire valid JWT
      if (data.user && !data.session) {
        const loginRes = await supabase.auth.signInWithPassword({ email, password });
        if (loginRes.data.session) {
          setUser(loginRes.data.user);
          setSession(loginRes.data.session);
          await fetchProfile(loginRes.data.user.id);
          return { success: true };
        } else if (loginRes.error) {
          setError(loginRes.error.message);
          return { success: false, error: loginRes.error.message };
        }
      }

      setUser(data.user);
      setSession(data.session);
      if (data.user) {
        await fetchProfile(data.user.id);
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign up failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const signInWithMagicLink = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured.' };
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Magic link request failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const resetPasswordForEmail = async (email: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured.' };
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Password reset request failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const saveOnboardingData = async (
    data: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (isMockMode) {
      setProfile((prev) => (prev ? { ...prev, ...data, onboarding_completed: true } : null));
      return { success: true };
    }

    if (!supabase) {
      return { success: false, error: 'Authentication service not configured.' };
    }

    // Verify session
    const { data: sessionData } = await supabase.auth.getSession();
    const activeUser = sessionData.session?.user || user;

    if (!activeUser) {
      return { success: false, error: 'User session not active. Please sign in to activate your plan.' };
    }

    try {
      const payload = {
        id: activeUser.id,
        email: activeUser.email,
        ...data,
        onboarding_completed: true,
        updated_at: new Date().toISOString(),
      };

      // 1. Try update first as profile row is pre-created on signup
      let { error } = await supabase
        .from('profiles')
        .update(payload)
        .eq('id', activeUser.id);

      // 2. Fall back to upsert if row was not yet created
      if (error) {
        const upsertRes = await supabase
          .from('profiles')
          .upsert(payload, { onConflict: 'id' });
        error = upsertRes.error;
      }

      if (error) {
        return { success: false, error: error.message };
      }

      // Optimistically update local profile state so dashboard renders immediately
      setProfile((prev) => ({
        ...(prev || {}),
        id: activeUser.id,
        email: activeUser.email || null,
        ...data,
        onboarding_completed: true,
      } as UserProfile));

      await fetchProfile(activeUser.id);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to persist calibration profile';
      return { success: false, error: msg };
    }
  };

  const updateProfile = async (
    data: Partial<UserProfile>
  ): Promise<{ success: boolean; error?: string }> => {
    if (isMockMode) {
      setProfile((prev) => (prev ? { ...prev, ...data } : null));
      return { success: true };
    }

    if (!user || !supabase) {
      return { success: false, error: 'User not authenticated.' };
    }

    try {
      const payload = {
        id: user.id,
        ...data,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(payload, { onConflict: 'id' });

      if (error) {
        return { success: false, error: error.message };
      }

      await fetchProfile(user.id);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile';
      return { success: false, error: msg };
    }
  };

  const updatePassword = async (
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (isMockMode) {
      return { success: true };
    }

    if (!user || !supabase) {
      return { success: false, error: 'User not authenticated.' };
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password';
      return { success: false, error: msg };
    }
  };

  const signOut = async (): Promise<void> => {
    if (isMockMode) {
      setUser(null);
      setProfile(null);
      setSession(null);
      setIsMockMode(false);
      return;
    }
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        loadingProfile,
        error,
        isConfigured: isSupabaseConfigured,
        isMockMode,
        toggleMockMode,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
        resetPasswordForEmail,
        saveOnboardingData,
        updateProfile,
        updatePassword,
        refreshProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
