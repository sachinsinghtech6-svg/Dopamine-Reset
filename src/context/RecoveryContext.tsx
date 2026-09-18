import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import type {
  DailyCheckIn,
  RecoverySession,
  IntentionalTask,
  RecoveryViewKey,
  MoodType,
  EnergyType,
  UrgeLevel,
  SessionType,
} from '@/types/recovery';

export interface RecoveryContextValue {
  todayCheckIn: DailyCheckIn | null;
  recentSessions: RecoverySession[];
  loading: boolean;
  submitting: boolean;
  error: string | null;
  tasks: IntentionalTask[];
  completedCount: number;
  streakDays: number;
  freezesRemaining: number;
  mindspaceScore: number;
  screenUsageMinutes: number;
  screenTargetMinutes: number;
  activeView: RecoveryViewKey;
  setActiveView: (view: RecoveryViewKey) => void;
  submitCheckIn: (payload: {
    mood: MoodType;
    energy: EnergyType;
    urge_intensity: UrgeLevel;
    triggers_today: string[];
    intention_note: string;
  }) => Promise<{ success: boolean; error?: string }>;
  completeTask: (taskKey: 'checkin' | 'focus' | 'trigger' | 'evening' | 'walk') => Promise<void>;
  recordSession: (payload: {
    session_type: SessionType;
    duration_minutes: number;
    xp_earned: number;
    notes?: string;
  }) => Promise<void>;
  consumeFreeze: () => Promise<boolean>;
  refreshRecoveryState: () => Promise<void>;
}

const RecoveryContext = createContext<RecoveryContextValue | undefined>(undefined);

export const RecoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, isMockMode } = useAuth();
  const { showToast } = useToast();

  const [activeView, setActiveView] = useState<RecoveryViewKey>('dashboard');
  const [todayCheckIn, setTodayCheckIn] = useState<DailyCheckIn | null>(null);
  const [recentSessions, setRecentSessions] = useState<RecoverySession[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Local state for non-punitive metrics
  const [streakDays, setStreakDays] = useState<number>(profile?.streak_days ?? 18);
  const [freezesRemaining, setFreezesRemaining] = useState<number>(profile?.freezes_remaining ?? 2);
  const [mindspaceScore, setMindspaceScore] = useState<number>(profile?.mindspace_score ?? 78);
  const screenUsageMinutes = 222; // 3h 42m (18% below baseline)
  const screenTargetMinutes = profile?.daily_screen_target_minutes ?? 270; // 4h 30m

  const todayStr = new Date().toISOString().split('T')[0];

  const fetchTodayData = useCallback(async () => {
    if (isMockMode) {
      // Mock dev mode initial state
      setTodayCheckIn({
        id: 'mock-checkin-today',
        user_id: user?.id || 'mock-user',
        log_date: todayStr,
        mood: 'good',
        energy: 'medium',
        urge_intensity: 2,
        triggers_today: ['Work Stress / Burnout', 'Fatigue / Late Night'],
        intention_note: 'Leave phone on kitchen counter while brewing coffee.',
        completed_tasks: ['checkin'],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      setStreakDays(18);
      setFreezesRemaining(2);
      setMindspaceScore(78);
      setLoading(false);
      return;
    }

    if (!isSupabaseConfigured || !supabase || !user) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // 1. Fetch today's checkin
      const { data: checkinData, error: checkinErr } = await supabase
        .from('daily_checkins')
        .select('*')
        .eq('user_id', user.id)
        .eq('log_date', todayStr)
        .maybeSingle();

      if (checkinErr) {
        console.warn('[Dopamine Reset] Check-in fetch:', checkinErr.message);
      } else {
        setTodayCheckIn(checkinData as DailyCheckIn | null);
      }

      // 2. Fetch recent sessions
      const { data: sessionsData, error: sessionsErr } = await supabase
        .from('recovery_sessions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (sessionsErr) {
        console.warn('[Dopamine Reset] Sessions fetch:', sessionsErr.message);
      } else if (sessionsData) {
        setRecentSessions(sessionsData as RecoverySession[]);
      }

      if (profile) {
        if (profile.streak_days !== undefined) setStreakDays(profile.streak_days);
        if (profile.freezes_remaining !== undefined) setFreezesRemaining(profile.freezes_remaining);
        if (profile.mindspace_score !== undefined) setMindspaceScore(profile.mindspace_score);
      }
    } catch (err) {
      setError('Unable to load recovery data. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }, [user, profile, isMockMode, todayStr]);

  useEffect(() => {
    fetchTodayData();
  }, [fetchTodayData]);

  // Derive completed tasks list from todayCheckIn
  const completedTaskKeys = todayCheckIn?.completed_tasks || [];

  const defaultTasks: IntentionalTask[] = [
    {
      id: 'task-1',
      title: 'Morning Mindset Check-in',
      desc: 'Logged non-judgmental baseline and emotional triggers.',
      status: completedTaskKeys.includes('checkin') ? 'completed' : 'ready',
      badgeLabel: completedTaskKeys.includes('checkin') ? 'Done' : 'Start',
      badgeVariant: completedTaskKeys.includes('checkin') ? 'success' : 'primary',
      metaLabel: completedTaskKeys.includes('checkin') ? 'Logged 8:15 AM · Urge: Moderate' : 'Morning priority',
      actionText: completedTaskKeys.includes('checkin') ? 'Review' : 'Begin Check-in',
      actionKey: 'checkin',
      icon: 'check',
    },
    {
      id: 'task-2',
      title: '30-Min Phone-Free Focus',
      desc: 'Read, study, or create with phone physically parked in another room.',
      status: completedTaskKeys.includes('focus') ? 'completed' : 'ready',
      badgeLabel: completedTaskKeys.includes('focus') ? 'Done (+20 XP)' : 'Required · +20 XP',
      badgeVariant: completedTaskKeys.includes('focus') ? 'success' : 'primary',
      metaLabel: completedTaskKeys.includes('focus') ? 'Mindspace fortified' : '30 min duration',
      actionText: completedTaskKeys.includes('focus') ? 'Concluded' : 'Start Focus',
      actionKey: 'focus',
      icon: 'play_arrow',
    },
    {
      id: 'task-3',
      title: "Identify Today's Trigger",
      desc: 'Reflection prompt unlocked after afternoon usage review.',
      status: completedTaskKeys.includes('trigger') ? 'completed' : 'pending',
      badgeLabel: completedTaskKeys.includes('trigger') ? 'Done' : 'Pending',
      badgeVariant: completedTaskKeys.includes('trigger') ? 'success' : 'neutral',
      metaLabel: 'Reflection prompt',
      actionText: completedTaskKeys.includes('trigger') ? 'View' : 'Open',
      actionKey: 'trigger',
      icon: 'psychology_alt',
    },
    {
      id: 'task-4',
      title: 'Evening No-Scroll Routine',
      desc: 'Pre-sleep dopamine dampening (Screens placed out of bedroom).',
      status: completedTaskKeys.includes('evening') ? 'completed' : 'scheduled',
      badgeLabel: completedTaskKeys.includes('evening') ? 'Done' : '8:30 PM Scheduled',
      badgeVariant: completedTaskKeys.includes('evening') ? 'success' : 'neutral',
      metaLabel: 'Circadian protection',
      actionText: completedTaskKeys.includes('evening') ? 'Saved' : 'Mark Done',
      actionKey: 'evening',
      icon: 'schedule',
    },
    {
      id: 'task-5',
      title: '10-Minute Restorative Walk',
      desc: 'Gentle visual optic flow reset to dissolve mental fatigue.',
      status: completedTaskKeys.includes('walk') ? 'completed' : 'optional',
      badgeLabel: completedTaskKeys.includes('walk') ? 'Done' : 'Optional',
      badgeVariant: completedTaskKeys.includes('walk') ? 'success' : 'neutral',
      metaLabel: 'Optic flow reset',
      actionText: completedTaskKeys.includes('walk') ? 'Completed' : 'Start Timer',
      actionKey: 'walk',
      icon: 'directions_walk',
    },
  ];

  const completedCount = defaultTasks.filter((t) => t.status === 'completed').length;

  const submitCheckIn = async (payload: {
    mood: MoodType;
    energy: EnergyType;
    urge_intensity: UrgeLevel;
    triggers_today: string[];
    intention_note: string;
  }): Promise<{ success: boolean; error?: string }> => {
    if (submitting) return { success: false, error: 'Submission in progress' };
    setSubmitting(true);

    try {
      const updatedTasks = Array.from(new Set([...completedTaskKeys, 'checkin']));

      if (isMockMode || !supabase || !user) {
        const mockNew: DailyCheckIn = {
          id: 'mock-' + Date.now(),
          user_id: user?.id || 'mock-user',
          log_date: todayStr,
          mood: payload.mood,
          energy: payload.energy,
          urge_intensity: payload.urge_intensity,
          triggers_today: payload.triggers_today,
          intention_note: payload.intention_note,
          completed_tasks: updatedTasks,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setTodayCheckIn(mockNew);
        showToast('Daily check-in saved. Generating nervous system synthesis...', 'success');
        setActiveView('insight');
        return { success: true };
      }

      const row = {
        user_id: user.id,
        log_date: todayStr,
        mood: payload.mood,
        energy: payload.energy,
        urge_intensity: payload.urge_intensity,
        triggers_today: payload.triggers_today,
        intention_note: payload.intention_note,
        completed_tasks: updatedTasks,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('daily_checkins')
        .upsert(row, { onConflict: 'user_id,log_date' })
        .select()
        .single();

      if (error) {
        showToast(error.message, 'error');
        return { success: false, error: error.message };
      }

      setTodayCheckIn(data as DailyCheckIn);
      showToast('Daily check-in recorded peacefully.', 'success');
      setActiveView('insight');
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save check-in';
      showToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  };

  const completeTask = async (taskKey: 'checkin' | 'focus' | 'trigger' | 'evening' | 'walk') => {
    const updated = Array.from(new Set([...completedTaskKeys, taskKey]));

    if (isMockMode || !supabase || !user) {
      if (todayCheckIn) {
        setTodayCheckIn({ ...todayCheckIn, completed_tasks: updated });
      }
      showToast(`Task marked complete.`, 'success');
      if (updated.length >= 5) {
        setActiveView('done');
      }
      return;
    }

    try {
      const { error } = await supabase.from('daily_checkins').upsert(
        {
          user_id: user.id,
          log_date: todayStr,
          mood: todayCheckIn?.mood || 'good',
          energy: todayCheckIn?.energy || 'medium',
          urge_intensity: todayCheckIn?.urge_intensity || 3,
          completed_tasks: updated,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,log_date' }
      );

      if (!error) {
        setTodayCheckIn((prev) => (prev ? { ...prev, completed_tasks: updated } : null));
        showToast('Progress saved.', 'success');
        if (updated.length >= 5) {
          setActiveView('done');
        }
      }
    } catch (err) {
      console.warn('Failed to update task:', err);
    }
  };

  const recordSession = async (payload: {
    session_type: SessionType;
    duration_minutes: number;
    xp_earned: number;
    notes?: string;
  }) => {
    // Mark focus or walk task as completed
    const taskKey = payload.session_type === 'focus' ? 'focus' : 'walk';
    await completeTask(taskKey);

    if (isMockMode || !supabase || !user) {
      const mockSession: RecoverySession = {
        id: 'sess-' + Date.now(),
        user_id: user?.id || 'mock-user',
        session_type: payload.session_type,
        duration_minutes: payload.duration_minutes,
        completed: true,
        xp_earned: payload.xp_earned,
        notes: payload.notes || null,
        created_at: new Date().toISOString(),
      };
      setRecentSessions((prev) => [mockSession, ...prev]);
      if (payload.session_type === 'focus') {
        setActiveView('completion');
      }
      return;
    }

    try {
      const { data, error } = await supabase
        .from('recovery_sessions')
        .insert({
          user_id: user.id,
          session_type: payload.session_type,
          duration_minutes: payload.duration_minutes,
          completed: true,
          xp_earned: payload.xp_earned,
          notes: payload.notes || null,
        })
        .select()
        .single();

      if (!error && data) {
        setRecentSessions((prev) => [data as RecoverySession, ...prev]);
      }
      if (payload.session_type === 'focus') {
        setActiveView('completion');
      }
    } catch (err) {
      console.warn('Failed to record recovery session:', err);
    }
  };

  const consumeFreeze = async (): Promise<boolean> => {
    if (freezesRemaining <= 0) {
      showToast('No mindful freezes remaining this cycle.', 'warning');
      return false;
    }

    const nextFreezes = freezesRemaining - 1;
    setFreezesRemaining(nextFreezes);

    if (user && supabase && !isMockMode) {
      await supabase
        .from('profiles')
        .update({ freezes_remaining: nextFreezes })
        .eq('id', user.id);
    }

    showToast('🧊 Mindful Freeze Applied. Your streak is protected without guilt.', 'info');
    return true;
  };

  return (
    <RecoveryContext.Provider
      value={{
        todayCheckIn,
        recentSessions,
        loading,
        submitting,
        error,
        tasks: defaultTasks,
        completedCount,
        streakDays,
        freezesRemaining,
        mindspaceScore,
        screenUsageMinutes,
        screenTargetMinutes,
        activeView,
        setActiveView,
        submitCheckIn,
        completeTask,
        recordSession,
        consumeFreeze,
        refreshRecoveryState: fetchTodayData,
      }}
    >
      {children}
    </RecoveryContext.Provider>
  );
};

export const useRecovery = (): RecoveryContextValue => {
  const ctx = useContext(RecoveryContext);
  if (!ctx) {
    throw new Error('useRecovery must be used within a RecoveryProvider');
  }
  return ctx;
};
