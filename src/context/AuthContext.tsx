import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isConfigured: boolean;
  isMockMode: boolean;
  toggleMockMode: () => void;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signInWithMagicLink: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMockMode, setIsMockMode] = useState<boolean>(false);

  const isDev = import.meta.env.DEV;

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
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

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
        user_metadata: { full_name: 'Serene Explorer' },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User;

      setUser(mockUser);
      setIsMockMode(true);
    } else {
      setUser(null);
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
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sign in failed';
      setError(msg);
      return { success: false, error: msg };
    }
  };

  const signUpWithEmail = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    setError(null);
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Authentication service not configured.' };
    }

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      setUser(data.user);
      setSession(data.session);
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
      const { error } = await supabase.auth.signInWithOtp({ email });
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

  const signOut = async (): Promise<void> => {
    if (isMockMode) {
      setUser(null);
      setSession(null);
      setIsMockMode(false);
      return;
    }
    if (supabase) {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        error,
        isConfigured: isSupabaseConfigured,
        isMockMode,
        toggleMockMode,
        signInWithEmail,
        signUpWithEmail,
        signInWithMagicLink,
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
