export type MoodClarity = 'Great' | 'Good' | 'Okay' | 'Low' | 'Difficult';

export interface JournalEntry {
  id: string;
  user_id: string;
  content: string;
  mood: MoodClarity;
  clarity_level?: string;
  tags: string[];
  shared_with_ai: boolean;
  created_at: string;
  updated_at?: string;
}

export interface AnalyticsMetrics {
  dailyUsageMinutes: number;
  dailyUsageChangePercent: number;
  recoveryScore: number;
  recoveryScoreChange: number;
  mindfulStreakDays: number;
  streakGoalDays: number;
  goalProgressPercent: number;
  dailyCeilingMinutes: number;
  weeklyAverageMinutes: number;
  pastAverageMinutes: number;
}

export interface ExposureDayData {
  day: string;
  hours: number;
  targetHours: number;
}

export interface TriggerStat {
  trigger: string;
  percentage: number;
  barClass: string;
}

export interface PeakWindowSegment {
  period: string;
  timeDesc?: string;
  durationLabel: string;
  isPeak?: boolean;
  bgClass: string;
  textClass: string;
}

export interface PlatformStat {
  code: string;
  name: string;
  durationLabel: string;
  percentage: number;
  barClass: string;
}

export interface RecoveryHabitStat {
  phoneFreeSessions: number;
  avgPhoneFreeMinutes: number;
  reflectiveCheckins: number;
  patternInsight: string;
}

export interface CoachExperiment {
  id: string;
  title: string;
  description: string;
  committed?: boolean;
}

export interface CoachMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  categoryTag?: string;
  experiment?: CoachExperiment;
}

export interface CoachPrivacySettings {
  includeDailyAnalytics: boolean;
  shareJournalEntries: boolean;
  localMemoryPurgeOnExit: boolean;
}

export interface RecoveryContextInfo {
  phase: string;
  streakDays: number;
  cognitiveScore: number;
  primaryObjective: string;
  dominantTrigger: string;
}

export type Phase4TabKey = 'analytics' | 'journal' | 'coach' | 'edge';
