import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type {
  RecoveryStage,
  TrackLevel,
  XPRule,
  XPLedgerItem,
  PersonalBadge,
  RecoveryChallenge,
  BeforeVsNowMetric,
  CumulativeProofCounter,
} from '@/types/progress';

interface ProgressContextValue {
  currentStageId: number;
  currentLevel: number;
  totalXp: number;
  nextLevelXp: number;
  xpNeeded: number;
  progressPercent: number;
  mindfulStreakDays: number;
  freezesBanked: number;
  attentionScore: number;
  stages: RecoveryStage[];
  levels: TrackLevel[];
  xpRules: XPRule[];
  xpLedger: XPLedgerItem[];
  badges: PersonalBadge[];
  challenges: RecoveryChallenge[];
  beforeVsNow: BeforeVsNowMetric[];
  proofCounters: CumulativeProofCounter;
  awardXp: (amount: number, actionType: string, description: string) => Promise<void>;
  joinChallenge: (challengeId: string) => Promise<void>;
  advanceChallenge: (challengeId: string) => Promise<void>;
  logInterceptReflection: () => Promise<void>;
  saveWeeklyReflection: (text: string) => Promise<void>;
  refreshProgress: () => Promise<void>;
}

const INITIAL_STAGES: RecoveryStage[] = [
  {
    id: 1,
    name: 'Awareness',
    tagline: 'Completed · Verified 14d ago',
    description: 'Understand your subconscious triggers, reflex app launches, and the emotional states preceding impulse scrolling.',
    status: 'completed',
    completionPercent: 100,
    verifiedAgo: 'Verified 14d ago',
  },
  {
    id: 2,
    name: 'Awareness & Control',
    tagline: 'Current Stage · 64% Completed',
    description: 'Start making intentional choices around digital consumption. Practice pausing for 5 seconds before reflex unlocks.',
    status: 'current',
    completionPercent: 64,
    checklist: [
      { id: 'c1', label: 'Daily Awareness Check-ins', current: 14, target: 14, unit: 'days', isComplete: true },
      { id: 'c2', label: 'Phone-Free Focused Sessions', current: 8, target: 10, unit: 'sessions', isComplete: false, statusNote: '2 left' },
      { id: 'c3', label: 'Impulse Trigger Logs', current: 12, target: 12, unit: 'logs', isComplete: true },
      { id: 'c4', label: 'Stage 2 Synthesis & Reflection', current: 0, target: 1, unit: 'reflection', isComplete: false, statusNote: 'Pending session completion' },
    ],
  },
  {
    id: 3,
    name: 'Focus Building',
    tagline: 'Up Next · Unlocks at Level 8',
    description: 'Build sustained periods of deep offline immersion, extended work intervals, and effortless flow without dopamine nudges.',
    status: 'locked',
    completionPercent: 0,
    unlockRequirement: 'Unlocks at Level 8',
  },
  {
    id: 4,
    name: 'Healthy Digital Habits',
    tagline: 'Upcoming Stage',
    description: 'Develop sustainable evening rituals, non-reactive message consumption, and phone-free rest protocols.',
    status: 'locked',
    completionPercent: 0,
    unlockRequirement: 'Upcoming',
  },
  {
    id: 5,
    name: 'Independence',
    tagline: 'Ultimate Destination · Autonomy',
    description: 'Maintain unassisted attention composure. "The strongest sign of progress is needing this app less."',
    status: 'destination',
    completionPercent: 0,
    unlockRequirement: 'Autonomy',
  },
];

const RAW_LEVELS: { level: number; title: string; requiredXp: number; tier: 1 | 2 | 3 | 4 }[] = [
  { level: 1, title: 'Starting Point', requiredXp: 100, tier: 1 },
  { level: 2, title: 'Noticing', requiredXp: 250, tier: 1 },
  { level: 3, title: 'Awareness', requiredXp: 450, tier: 1 },
  { level: 4, title: 'Intentional', requiredXp: 650, tier: 1 },
  { level: 5, title: 'Consistent', requiredXp: 850, tier: 1 },
  { level: 6, title: 'Control', requiredXp: 1050, tier: 2 },
  { level: 7, title: 'Focused', requiredXp: 1240, tier: 2 },
  { level: 8, title: 'Resilient', requiredXp: 1500, tier: 2 },
  { level: 9, title: 'Balanced', requiredXp: 1800, tier: 2 },
  { level: 10, title: 'Strong Habits', requiredXp: 2150, tier: 2 },
  { level: 11, title: 'Deep Focus', requiredXp: 2500, tier: 3 },
  { level: 12, title: 'Intentional Living', requiredXp: 2900, tier: 3 },
  { level: 13, title: 'Digital Balance', requiredXp: 3350, tier: 3 },
  { level: 14, title: 'Self-Aware', requiredXp: 3850, tier: 3 },
  { level: 15, title: 'Sustainable', requiredXp: 4400, tier: 3 },
  { level: 16, title: 'Independent', requiredXp: 5000, tier: 4 },
  { level: 17, title: 'Resilient Mindset', requiredXp: 5650, tier: 4 },
  { level: 18, title: 'Focus Mastery', requiredXp: 6350, tier: 4 },
  { level: 19, title: 'Digital Freedom', requiredXp: 7100, tier: 4 },
  { level: 20, title: 'Independent Attention', requiredXp: 8000, tier: 4 },
];

const INITIAL_XP_RULES: XPRule[] = [
  { action: 'Daily Mindful Check-in', xp: 10 },
  { action: 'Phone-Free Deep Work Session (45m+)', xp: 20 },
  { action: 'Trigger Reflection Journal Entry', xp: 15 },
  { action: 'Weekly Restorative Milestone', xp: 50 },
];

const INITIAL_XP_LEDGER: XPLedgerItem[] = [
  {
    id: 'ledger-1',
    actionType: 'wind_down',
    description: 'Evening Wind-down (30m screen-free)',
    xp: 20,
    timestamp: 'Yesterday · 10:45 PM',
    icon: 'bedtime',
  },
  {
    id: 'ledger-2',
    actionType: 'focus',
    description: '45-Minute Focus Session Completed',
    xp: 20,
    timestamp: 'Yesterday · 2:15 PM',
    icon: 'self_improvement',
  },
  {
    id: 'ledger-3',
    actionType: 'journal',
    description: 'Boredom Impulse Journal Note',
    xp: 15,
    timestamp: 'Yesterday · 11:30 AM',
    icon: 'menu_book',
  },
  {
    id: 'ledger-4',
    actionType: 'checkin',
    description: 'Morning Check-in logged',
    xp: 10,
    timestamp: 'Today · 8:10 AM',
    icon: 'check_circle',
  },
];

const INITIAL_BADGES: PersonalBadge[] = [
  { id: 'b1', title: 'First Step', description: 'Acknowledged digital fatigue and logged your initial baseline audit.', emoji: '🌱', status: 'unlocked', unlockedLabel: 'Unlocked · Day 1' },
  { id: 'b2', title: 'Consistency', description: 'Maintained 7 consecutive days of honest self-reflection.', emoji: '🔥', status: 'unlocked', unlockedLabel: 'Unlocked · 7 Days' },
  { id: 'b3', title: 'Focus Builder', description: 'Complete 10 intentional phone-free focus sessions of 30m+.', emoji: '🎯', status: 'in_progress', progress: 7, target: 10 },
  { id: 'b4', title: 'Pattern Finder', description: 'Identified 5 recurring emotional cues behind reflexive unlocks.', emoji: '🧩', status: 'unlocked', unlockedLabel: 'Unlocked · 5 Triggers Named' },
  { id: 'b5', title: 'Evening Reset', description: 'Successfully put screens away 30 minutes before bed 7 times.', emoji: '🌙', status: 'unlocked', unlockedLabel: 'Unlocked · 7 Nights' },
  { id: 'b6', title: 'Calm Reset', description: 'Execute 5 guided somatic breathing resets during acute cravings.', emoji: '🧘', status: 'in_progress', progress: 4, target: 5 },
  { id: 'b7', title: 'Stage 1 Mastery', description: 'Completed all foundational awareness check-ins and self-evaluations.', emoji: '🏆', status: 'unlocked', unlockedLabel: 'Unlocked · Milestone' },
  { id: 'b8', title: 'Independent Attention', description: 'Complete Stage 5 and establish unassisted digital composure.', emoji: '🌿', status: 'locked', unlockedLabel: 'Locked · Stage 5 Finale' },
];

const INITIAL_CHALLENGES: RecoveryChallenge[] = [
  {
    id: '7_day_evening_reset',
    title: '7-Day Evening Reset',
    category: 'Screen Time',
    sprintType: 'Active · Day 4 of 7',
    description: 'Protect your melatonin production by keeping the final 30 minutes before sleep completely phone-free.',
    status: 'active',
    progressDays: 3,
    targetDays: 7,
    xpReward: 100,
    ritualTitle: "Today's Ritual (Day 4)",
    ritualDescription: '3 of 7 nights successfully recorded without pre-sleep screens.',
    actionButtonText: "Begin Tonight's 30m Wind-down",
    icon: 'bedtime',
  },
  {
    id: 'distraction_free_morning',
    title: 'Distraction-Free Morning',
    category: 'Focus',
    sprintType: '3-Day Sprint · Light',
    description: 'Avoid looking at email or social feeds for the first 30 minutes after waking up. Hydrate and observe natural daylight first.',
    status: 'available',
    progressDays: 0,
    targetDays: 3,
    xpReward: 50,
    ritualTitle: 'Morning Dopamine Guard',
    ritualDescription: 'Proven to diminish acute midday anxiety spikes by 34%.',
    actionButtonText: 'Join 3-Day Sprint',
    icon: 'wb_sunny',
  },
  {
    id: 'mindful_phone_free_meal',
    title: 'Mindful Phone-Free Meal',
    category: 'Lifestyle',
    sprintType: 'Weekend Ritual · Easy',
    description: 'Eat one sit-down meal with zero screens in the room. Enjoy the texture, smell, and quiet rhythm of unhurried nourishment.',
    status: 'available',
    progressDays: 0,
    targetDays: 1,
    xpReward: 30,
    ritualTitle: 'Sensory Anchoring',
    ritualDescription: 'Replaces reflexive consumption with mindful sensory engagement.',
    actionButtonText: 'Commit for This Weekend',
    icon: 'restaurant',
  },
];

const BEFORE_VS_NOW: BeforeVsNowMetric[] = [
  {
    label: 'Average Daily Screen Time',
    baselineValue: '5h 10m',
    currentValue: '3h 42m',
    reclaimedBadge: '1 hour 28 minutes reclaimed daily',
    icon: 'south_east',
  },
  {
    label: 'Recovery Composure Score',
    baselineValue: '52 / 100',
    currentValue: '78 / 100',
    reclaimedBadge: '+26 points in conscious control',
    icon: 'north_east',
  },
  {
    label: 'Late-Night Screen Window',
    baselineValue: '2h 05m',
    currentValue: '1h 18m',
    reclaimedBadge: 'Deeper restorative sleep intervals',
    icon: 'bedtime',
  },
];

const PROOF_COUNTERS: CumulativeProofCounter = {
  phoneFreeSessions: 18,
  dailyCheckins: 17,
  triggersMapped: 12,
  reclaimedHours: '41h',
};

const ProgressContext = createContext<ProgressContextValue | undefined>(undefined);

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, isMockMode } = useAuth();
  const { showToast } = useToast();

  const [totalXp, setTotalXp] = useState<number>(profile?.xp ?? 1240);
  const [currentLevel, setCurrentLevel] = useState<number>(profile?.level ?? 7);
  const [currentStageId] = useState<number>(profile?.current_stage_id ?? 2);
  const [stages, setStages] = useState<RecoveryStage[]>(INITIAL_STAGES);
  const [challenges, setChallenges] = useState<RecoveryChallenge[]>(INITIAL_CHALLENGES);
  const [badges, setBadges] = useState<PersonalBadge[]>(INITIAL_BADGES);
  const [xpLedger, setXpLedger] = useState<XPLedgerItem[]>(INITIAL_XP_LEDGER);

  const mindfulStreakDays = profile?.streak_days ?? 18;
  const freezesBanked = profile?.freezes_remaining ?? 2;
  const attentionScore = profile?.mindspace_score ?? 78;

  // Derive Level Information
  const nextLevelDef = RAW_LEVELS.find((l) => l.level === currentLevel + 1) || RAW_LEVELS[RAW_LEVELS.length - 1];
  const nextLevelXp = nextLevelDef.requiredXp;
  const xpNeeded = Math.max(0, nextLevelXp - totalXp);
  const prevLevelXp = currentLevel > 1 ? RAW_LEVELS[currentLevel - 2].requiredXp : 0;
  const progressPercent = Math.min(
    100,
    Math.round(((totalXp - prevLevelXp) / Math.max(1, nextLevelXp - prevLevelXp)) * 100)
  );

  const levels: TrackLevel[] = RAW_LEVELS.map((lvl) => ({
    ...lvl,
    tierName: lvl.tier === 1 ? 'Tier I' : lvl.tier === 2 ? 'Tier II' : lvl.tier === 3 ? 'Tier III' : 'Tier IV',
    isCompleted: lvl.level < currentLevel,
    isCurrent: lvl.level === currentLevel,
    isTarget: lvl.level === currentLevel + 1,
  }));

  const fetchProgressData = useCallback(async () => {
    if (isMockMode || !isSupabaseConfigured || !supabase || !user) {
      return;
    }

    try {
      // 1. Fetch user challenges
      const { data: userChalls } = await supabase
        .from('user_challenges')
        .select('*')
        .eq('user_id', user.id);

      if (userChalls && userChalls.length > 0) {
        setChallenges((prev) =>
          prev.map((c) => {
            const match = userChalls.find((uc) => uc.challenge_id === c.id);
            if (match) {
              return {
                ...c,
                status: match.status,
                progressDays: match.progress_days,
                targetDays: match.target_days,
              };
            }
            return c;
          })
        );
      }

      // 2. Fetch user badges
      const { data: userBadgesData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (userBadgesData && userBadgesData.length > 0) {
        setBadges((prev) =>
          prev.map((b) => {
            const match = userBadgesData.find((ub) => ub.badge_id === b.id);
            if (match) {
              return {
                ...b,
                status: match.unlocked ? 'unlocked' : 'in_progress',
                progress: match.progress,
              };
            }
            return b;
          })
        );
      }

      // 3. Fetch XP ledger
      const { data: ledgerData } = await supabase
        .from('xp_ledger')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (ledgerData && ledgerData.length > 0) {
        const formatted: XPLedgerItem[] = ledgerData.map((item) => ({
          id: item.id,
          actionType: item.action_type,
          description: item.description,
          xp: item.xp_amount,
          timestamp: new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          icon: item.action_type === 'wind_down' ? 'bedtime' : item.action_type === 'focus' ? 'self_improvement' : 'check_circle',
        }));
        setXpLedger(formatted);
      }
    } catch (err) {
      console.warn('[ProgressContext] Failed to load Supabase progress:', err);
    }
  }, [user, isMockMode]);

  useEffect(() => {
    fetchProgressData();
  }, [fetchProgressData]);

  const awardXp = async (amount: number, actionType: string, description: string) => {
    const nextXp = totalXp + amount;
    setTotalXp(nextXp);

    // Calculate if level upgraded
    const nextLvl = RAW_LEVELS.slice().reverse().find((l) => nextXp >= l.requiredXp)?.level || currentLevel;
    if (nextLvl > currentLevel) {
      setCurrentLevel(nextLvl);
      showToast(`🌱 Milestone Reached: Level ${nextLvl} unlocked (+${amount} XP)`, 'success');
    } else {
      showToast(`+${amount} XP verified · ${description}`, 'success');
    }

    const newLedgerItem: XPLedgerItem = {
      id: `led-${Date.now()}`,
      actionType,
      description,
      xp: amount,
      timestamp: 'Just now',
      icon: 'stars',
    };
    setXpLedger((prev) => [newLedgerItem, ...prev]);

    if (!isMockMode && isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('xp_ledger').insert({
          user_id: user.id,
          action_type: actionType,
          xp_amount: amount,
          description,
        });

        await supabase
          .from('profiles')
          .update({
            xp: nextXp,
            level: nextLvl,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      } catch (err) {
        console.warn('Failed to record XP in Supabase:', err);
      }
    }
  };

  const joinChallenge = async (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, status: 'active', progressDays: 0 } : c))
    );
    showToast('Challenge joined with quiet commitment.', 'info');

    if (!isMockMode && isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('user_challenges').upsert(
          {
            user_id: user.id,
            challenge_id: challengeId,
            title: challengeId.replace(/_/g, ' '),
            status: 'active',
            progress_days: 0,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,challenge_id' }
        );
      } catch (err) {
        console.warn('Failed to join challenge in Supabase:', err);
      }
    }
  };

  const advanceChallenge = async (challengeId: string) => {
    const target = challenges.find((c) => c.id === challengeId);
    if (!target) return;

    const nextDays = target.progressDays + 1;
    const isFinished = nextDays >= target.targetDays;

    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === challengeId) {
          return {
            ...c,
            progressDays: nextDays,
            status: isFinished ? 'completed' : 'active',
          };
        }
        return c;
      })
    );

    if (isFinished) {
      await awardXp(target.xpReward, 'challenge', `Completed challenge: ${target.title}`);
    } else {
      showToast(`Challenge step recorded: ${nextDays}/${target.targetDays} days.`, 'success');
    }

    if (!isMockMode && isSupabaseConfigured && supabase && user) {
      try {
        await supabase.from('user_challenges').upsert(
          {
            user_id: user.id,
            challenge_id: challengeId,
            title: target.title,
            status: isFinished ? 'completed' : 'active',
            progress_days: nextDays,
            completed_at: isFinished ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id,challenge_id' }
        );
      } catch (err) {
        console.warn('Failed to update challenge in Supabase:', err);
      }
    }
  };

  const logInterceptReflection = async () => {
    // Check off item in stage checklist
    setStages((prev) =>
      prev.map((s) => {
        if (s.id === 2 && s.checklist) {
          const updated = s.checklist.map((item) =>
            item.id === 'c4' ? { ...item, isComplete: true, statusNote: 'Completed ✓' } : item
          );
          return { ...s, checklist: updated, completionPercent: 88 };
        }
        return s;
      })
    );

    await awardXp(15, 'intercept', 'Conscious 5-Second Friction Intercept logged');
  };

  const saveWeeklyReflection = async (text: string) => {
    if (!text.trim()) return;
    await awardXp(15, 'journal', 'Stage 2 Weekly Reflection saved');
  };

  return (
    <ProgressContext.Provider
      value={{
        currentStageId,
        currentLevel,
        totalXp,
        nextLevelXp,
        xpNeeded,
        progressPercent,
        mindfulStreakDays,
        freezesBanked,
        attentionScore,
        stages,
        levels,
        xpRules: INITIAL_XP_RULES,
        xpLedger,
        badges,
        challenges,
        beforeVsNow: BEFORE_VS_NOW,
        proofCounters: PROOF_COUNTERS,
        awardXp,
        joinChallenge,
        advanceChallenge,
        logInterceptReflection,
        saveWeeklyReflection,
        refreshProgress: fetchProgressData,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};
