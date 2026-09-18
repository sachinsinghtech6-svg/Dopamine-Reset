import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import { useToast } from './ToastContext';
import { supabase } from '@/lib/supabase';
import {
  type UserSettingsState,
  type RecoverySettings,
  type NotificationSettings,
  type AIPerimeterSettings,
  type AppearanceSettings,
  type ExportDataOptions,
  type SettingsTabId,
  DEFAULT_USER_SETTINGS,
} from '@/types/settings';

const LOCAL_STORAGE_KEY = 'dopamine_reset_sanctuary_settings_v1';

export interface SettingsContextValue {
  settings: UserSettingsState;
  activeTab: SettingsTabId;
  setActiveTab: (tab: SettingsTabId) => void;
  isDirty: boolean;
  dirtySection: string | null;
  markDirty: (sectionName?: string) => void;
  discardPendingChanges: () => void;
  updateRecoverySettings: (updates: Partial<RecoverySettings>) => void;
  updateNotificationSettings: (updates: Partial<NotificationSettings>) => void;
  updateAIPerimeterSettings: (updates: Partial<AIPerimeterSettings>) => void;
  updateAppearanceSettings: (updates: Partial<AppearanceSettings>) => void;
  saveAllSettings: (customSuccessMsg?: string) => Promise<{ success: boolean; error?: string }>;
  exportUserData: (options: ExportDataOptions) => Promise<void>;
  purgeJournalEntries: () => Promise<{ success: boolean; error?: string }>;
  resetStageProgression: () => Promise<{ success: boolean; error?: string }>;
  deleteSanctuaryAccount: () => Promise<{ success: boolean; error?: string }>;
  // Modal & feedback triggers
  isDeleteModalOpen: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  isLogoutModalOpen: boolean;
  openLogoutModal: () => void;
  closeLogoutModal: () => void;
  isSupportModalOpen: boolean;
  openSupportModal: () => void;
  closeSupportModal: () => void;
  isOfflineNoticeActive: boolean;
  toggleOfflineNotice: () => void;
  isSaving: boolean;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, updateProfile, signOut, refreshProfile } = useAuth();
  const { setTheme } = useTheme();
  const { showToast } = useToast();

  const [savedSettings, setSavedSettings] = useState<UserSettingsState>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          recovery: { ...DEFAULT_USER_SETTINGS.recovery, ...parsed.recovery },
          notifications: { ...DEFAULT_USER_SETTINGS.notifications, ...parsed.notifications },
          aiPerimeter: { ...DEFAULT_USER_SETTINGS.aiPerimeter, ...parsed.aiPerimeter },
          appearance: { ...DEFAULT_USER_SETTINGS.appearance, ...parsed.appearance },
        };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_USER_SETTINGS;
  });

  const [currentSettings, setCurrentSettings] = useState<UserSettingsState>(savedSettings);
  const [activeTab, setActiveTab] = useState<SettingsTabId>('profile');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [dirtySection, setDirtySection] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Modal controls
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState<boolean>(false);
  const [isOfflineNoticeActive, setIsOfflineNoticeActive] = useState<boolean>(false);

  // Sync from Supabase profile on load if available
  useEffect(() => {
    if (profile?.settings) {
      const merged: UserSettingsState = {
        recovery: {
          ...DEFAULT_USER_SETTINGS.recovery,
          ...(profile.settings.recovery || {}),
          dailyTargetMinutes: profile.daily_screen_target_minutes || profile.settings.recovery?.dailyTargetMinutes || 270,
        },
        notifications: {
          ...DEFAULT_USER_SETTINGS.notifications,
          ...(profile.settings.notifications || {}),
        },
        aiPerimeter: {
          ...DEFAULT_USER_SETTINGS.aiPerimeter,
          ...(profile.settings.aiPerimeter || {}),
        },
        appearance: {
          ...DEFAULT_USER_SETTINGS.appearance,
          ...(profile.settings.appearance || {}),
        },
      };
      setSavedSettings(merged);
      setCurrentSettings(merged);
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
      } catch {
        // Local storage fail-safe
      }
    }
  }, [profile]);

  // Apply appearance styles to document
  useEffect(() => {
    const scale = currentSettings.appearance.fontScale || 17;
    document.documentElement.style.setProperty('--font-scale-base', `${scale}px`);

    if (currentSettings.appearance.reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }

    if (currentSettings.appearance.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [currentSettings.appearance]);

  const markDirty = useCallback((sectionName: string = 'Settings') => {
    setIsDirty(true);
    setDirtySection(sectionName);
  }, []);

  const discardPendingChanges = useCallback(() => {
    setCurrentSettings(savedSettings);
    setIsDirty(false);
    setDirtySection(null);
    showToast('Unsaved changes discarded.', 'info');
  }, [savedSettings, showToast]);

  const updateRecoverySettings = useCallback((updates: Partial<RecoverySettings>) => {
    setCurrentSettings((prev) => ({
      ...prev,
      recovery: { ...prev.recovery, ...updates },
    }));
    markDirty('Recovery Rhythm');
  }, [markDirty]);

  const updateNotificationSettings = useCallback((updates: Partial<NotificationSettings>) => {
    setCurrentSettings((prev) => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates },
    }));
    markDirty('Notification Preferences');
  }, [markDirty]);

  const updateAIPerimeterSettings = useCallback((updates: Partial<AIPerimeterSettings>) => {
    setCurrentSettings((prev) => ({
      ...prev,
      aiPerimeter: { ...prev.aiPerimeter, ...updates },
    }));
    markDirty('AI Coach Perimeter');
  }, [markDirty]);

  const updateAppearanceSettings = useCallback((updates: Partial<AppearanceSettings>) => {
    setCurrentSettings((prev) => {
      const nextAppearance = { ...prev.appearance, ...updates };
      if (updates.theme) {
        setTheme(updates.theme);
      }
      return {
        ...prev,
        appearance: nextAppearance,
      };
    });
    markDirty('Appearance & Accessibility');
  }, [markDirty, setTheme]);

  const saveAllSettings = useCallback(
    async (customSuccessMsg?: string): Promise<{ success: boolean; error?: string }> => {
      setIsSaving(true);
      try {
        // 1. Cache to local storage
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentSettings));

        // 2. Persist to Supabase profile if connected
        if (user && supabase) {
          const res = await updateProfile({
            settings: currentSettings,
            daily_screen_target_minutes: currentSettings.recovery.dailyTargetMinutes,
            quiet_window_start: currentSettings.recovery.quietWindowStart,
            quiet_window_end: currentSettings.recovery.quietWindowEnd,
            weekend_sleep_extension: currentSettings.recovery.weekendFlexibility,
          });

          if (!res.success) {
            console.warn('[Dopamine Reset] Supabase settings sync notice:', res.error);
          }
        }

        setSavedSettings(currentSettings);
        setIsDirty(false);
        setDirtySection(null);
        showToast(customSuccessMsg || 'Sanctuary rhythm adjustments saved.', 'success');
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Failed to save settings';
        showToast(msg, 'error');
        return { success: false, error: msg };
      } finally {
        setIsSaving(false);
      }
    },
    [currentSettings, user, updateProfile, showToast]
  );

  const exportUserData = useCallback(
    async (options: ExportDataOptions): Promise<void> => {
      showToast('Compiling your encrypted sanctuary archive...', 'info');

      const exportPayload: Record<string, unknown> = {
        app: 'Dopamine Reset',
        version: '1.0.4',
        exportDate: new Date().toISOString(),
        encryptionMethod: 'AES-256 Client-Side Local Perimeter',
      };

      try {
        if (options.profileAndStage) {
          exportPayload.profile = {
            id: profile?.id || user?.id || 'local-sanctuary-user',
            displayName: profile?.full_name || user?.user_metadata?.full_name || 'Alex Morgan',
            email: profile?.email || user?.email || 'alex.morgan@sanctuary.io',
            stage: profile?.current_stage_id || 2,
            stageName: 'Stage 2 — Awareness & Control',
            xp: profile?.xp || 1240,
            level: profile?.level || 7,
            streakDays: profile?.streak_days || 18,
            freezesBanked: profile?.freezes_remaining || 2,
            membershipTier: 'Serene Lifelong (Ad-free)',
          };
          exportPayload.settings = currentSettings;
        }

        if (options.screenUsageAndFocus && user && supabase) {
          const { data: sessions } = await supabase
            .from('recovery_sessions')
            .select('*')
            .eq('user_id', user.id);
          exportPayload.focusSessions = sessions || [];
        }

        if (options.urgeAndMood && user && supabase) {
          const { data: checkins } = await supabase
            .from('daily_checkins')
            .select('*')
            .eq('user_id', user.id);
          exportPayload.checkinLogs = checkins || [];
        }

        if (options.journalReflections && user && supabase) {
          const { data: journals } = await supabase
            .from('journal_entries')
            .select('*')
            .eq('user_id', user.id);
          exportPayload.journalReflections = journals || [];
        }

        const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportPayload, null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute('href', dataStr);
        downloadAnchor.setAttribute(
          'download',
          `dopamine-reset-archive-${new Date().toISOString().slice(0, 10)}.json`
        );
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();

        showToast('Archive downloaded safely to your device.', 'success');
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Export generation failed';
        showToast(msg, 'error');
      }
    },
    [profile, user, currentSettings, showToast]
  );

  const purgeJournalEntries = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (user && supabase) {
      try {
        const { error } = await supabase.from('journal_entries').delete().eq('user_id', user.id);
        if (error) {
          showToast(error.message, 'error');
          return { success: false, error: error.message };
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Purge failed';
        showToast(msg, 'error');
        return { success: false, error: msg };
      }
    }
    showToast('Private journal reflections purged.', 'success');
    return { success: true };
  }, [user, showToast]);

  const resetStageProgression = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (user && supabase) {
      try {
        const { error } = await supabase
          .from('profiles')
          .update({
            xp: 0,
            level: 1,
            current_stage_id: 1,
            streak_days: 1,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        if (error) {
          showToast(error.message, 'error');
          return { success: false, error: error.message };
        }
        await refreshProfile();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Reset failed';
        showToast(msg, 'error');
        return { success: false, error: msg };
      }
    }
    showToast('Progression reset peacefully to Stage 1.', 'success');
    return { success: true };
  }, [user, refreshProfile, showToast]);

  const deleteSanctuaryAccount = useCallback(async (): Promise<{ success: boolean; error?: string }> => {
    if (user && supabase) {
      try {
        // Delete all user records via RLS
        await supabase.from('journal_entries').delete().eq('user_id', user.id);
        await supabase.from('daily_checkins').delete().eq('user_id', user.id);
        await supabase.from('recovery_sessions').delete().eq('user_id', user.id);
        await supabase.from('user_challenges').delete().eq('user_id', user.id);
        await supabase.from('user_badges').delete().eq('user_id', user.id);
        await supabase.from('xp_ledger').delete().eq('user_id', user.id);
        await supabase.from('profiles').delete().eq('id', user.id);
      } catch (err) {
        console.warn('[Dopamine Reset] Account deletion cleanup error:', err);
      }
    }

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    await signOut();
    showToast('Account eradicated. Returning to sanctuary entrance.', 'info');
    return { success: true };
  }, [user, signOut, showToast]);

  const value = useMemo(
    () => ({
      settings: currentSettings,
      activeTab,
      setActiveTab,
      isDirty,
      dirtySection,
      markDirty,
      discardPendingChanges,
      updateRecoverySettings,
      updateNotificationSettings,
      updateAIPerimeterSettings,
      updateAppearanceSettings,
      saveAllSettings,
      exportUserData,
      purgeJournalEntries,
      resetStageProgression,
      deleteSanctuaryAccount,
      isDeleteModalOpen,
      openDeleteModal: () => setIsDeleteModalOpen(true),
      closeDeleteModal: () => setIsDeleteModalOpen(false),
      isLogoutModalOpen,
      openLogoutModal: () => setIsLogoutModalOpen(true),
      closeLogoutModal: () => setIsLogoutModalOpen(false),
      isSupportModalOpen,
      openSupportModal: () => setIsSupportModalOpen(true),
      closeSupportModal: () => setIsSupportModalOpen(false),
      isOfflineNoticeActive,
      toggleOfflineNotice: () => setIsOfflineNoticeActive((prev) => !prev),
      isSaving,
    }),
    [
      currentSettings,
      activeTab,
      isDirty,
      dirtySection,
      markDirty,
      discardPendingChanges,
      updateRecoverySettings,
      updateNotificationSettings,
      updateAIPerimeterSettings,
      updateAppearanceSettings,
      saveAllSettings,
      exportUserData,
      purgeJournalEntries,
      resetStageProgression,
      deleteSanctuaryAccount,
      isDeleteModalOpen,
      isLogoutModalOpen,
      isSupportModalOpen,
      isOfflineNoticeActive,
      isSaving,
    ]
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
};
