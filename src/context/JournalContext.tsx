import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { JournalEntry, MoodClarity } from '@/types/analytics';

interface JournalContextType {
  entries: JournalEntry[];
  loading: boolean;
  saveEntry: (data: {
    content: string;
    mood: MoodClarity;
    tags: string[];
    sharedWithAi?: boolean;
  }) => Promise<{ success: boolean; error?: string }>;
  deleteEntry: (id: string) => Promise<{ success: boolean; error?: string }>;
  refreshEntries: () => Promise<void>;
}

const INITIAL_MOCK_ENTRIES: JournalEntry[] = [
  {
    id: 'mock-1',
    user_id: 'mock-user',
    content: 'Read 24 pages of the philosophy essay instead of opening video reels. Mind settled down significantly quicker.',
    mood: 'Good',
    clarity_level: '🌿 Good Clarity',
    tags: ['#EveningWalk', '#Reading'],
    shared_with_ai: false,
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'mock-2',
    user_id: 'mock-user',
    content: 'Felt the dopamine lull right after lunch. Replaced the urge to browse by preparing ceremonial green tea.',
    mood: 'Okay',
    clarity_level: '🌾 Okay',
    tags: ['#Boredom', '#Pacing'],
    shared_with_ai: false,
    created_at: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'mock-3',
    user_id: 'mock-user',
    content: 'Stayed in Reddit comments for 45 minutes past bedtime. Noticing that exhaustion paradoxically triggers craving.',
    mood: 'Difficult',
    clarity_level: '🍂 Difficult',
    tags: ['#LateNightWork'],
    shared_with_ai: false,
    created_at: new Date(Date.now() - 4 * 24 * 3600 * 1000).toISOString(),
  },
];

const LOCAL_STORAGE_KEY = 'dopamine_reset_journal_vault';

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const JournalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isMockMode } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEntries = useCallback(async () => {
    setLoading(true);

    if (isMockMode || !user || !isSupabaseConfigured || !supabase) {
      try {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setEntries(parsed.length > 0 ? parsed : INITIAL_MOCK_ENTRIES);
        } else {
          setEntries(INITIAL_MOCK_ENTRIES);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_MOCK_ENTRIES));
        }
      } catch {
        setEntries(INITIAL_MOCK_ENTRIES);
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setEntries(
          data.map((item) => ({
            id: item.id,
            user_id: item.user_id,
            content: item.content,
            mood: item.mood as MoodClarity,
            clarity_level: item.clarity_level || `${item.mood} Clarity`,
            tags: Array.isArray(item.tags) ? item.tags : [],
            shared_with_ai: item.shared_with_ai || false,
            created_at: item.created_at,
            updated_at: item.updated_at,
          }))
        );
      } else {
        // Fallback to local storage or defaults if user has no entries yet
        const stored = localStorage.getItem(`${LOCAL_STORAGE_KEY}_${user.id}`);
        if (stored) {
          setEntries(JSON.parse(stored));
        } else {
          setEntries(INITIAL_MOCK_ENTRIES);
        }
      }
    } catch (err) {
      console.warn('Supabase journal fetch failed, using local vault:', err);
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      setEntries(stored ? JSON.parse(stored) : INITIAL_MOCK_ENTRIES);
    } finally {
      setLoading(false);
    }
  }, [user, isMockMode]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const saveEntry = async (data: {
    content: string;
    mood: MoodClarity;
    tags: string[];
    sharedWithAi?: boolean;
  }): Promise<{ success: boolean; error?: string }> => {
    const newEntry: JournalEntry = {
      id: crypto.randomUUID ? crypto.randomUUID() : `entry-${Date.now()}`,
      user_id: user?.id || 'local-user',
      content: data.content,
      mood: data.mood,
      clarity_level: `${data.mood} Clarity`,
      tags: data.tags,
      shared_with_ai: data.sharedWithAi ?? false,
      created_at: new Date().toISOString(),
    };

    if (isMockMode || !user || !isSupabaseConfigured || !supabase) {
      const updated = [newEntry, ...entries];
      setEntries(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to save to localStorage:', e);
      }
      return { success: true };
    }

    try {
      const { data: inserted, error } = await supabase
        .from('journal_entries')
        .insert({
          user_id: user.id,
          content: data.content,
          mood: data.mood,
          clarity_level: `${data.mood} Clarity`,
          tags: data.tags,
          shared_with_ai: data.sharedWithAi ?? false,
        })
        .select()
        .single();

      if (error) throw error;

      const formatted: JournalEntry = {
        id: inserted.id,
        user_id: inserted.user_id,
        content: inserted.content,
        mood: inserted.mood,
        clarity_level: inserted.clarity_level,
        tags: Array.isArray(inserted.tags) ? inserted.tags : [],
        shared_with_ai: inserted.shared_with_ai,
        created_at: inserted.created_at,
      };

      setEntries((prev) => [formatted, ...prev]);
      return { success: true };
    } catch (err: any) {
      console.warn('Failed to insert journal entry to Supabase, saving to local vault:', err);
      // Resilience: save locally
      const updated = [newEntry, ...entries];
      setEntries(updated);
      try {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}_${user.id}`, JSON.stringify(updated));
      } catch {}
      return { success: true };
    }
  };

  const deleteEntry = async (id: string): Promise<{ success: boolean; error?: string }> => {
    if (isMockMode || !user || !isSupabaseConfigured || !supabase) {
      const updated = entries.filter((e) => e.id !== id);
      setEntries(updated);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return { success: true };
    }

    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;

      setEntries((prev) => prev.filter((e) => e.id !== id));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  return (
    <JournalContext.Provider
      value={{
        entries,
        loading,
        saveEntry,
        deleteEntry,
        refreshEntries: loadEntries,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
};

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};
