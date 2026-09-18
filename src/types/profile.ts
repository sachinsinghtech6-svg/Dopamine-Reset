export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  primary_goal: string | null;
  target_platforms: string[];
  daily_screen_time: string | null;
  peak_vulnerability_time: string | null;
  triggers: string[];
  interruption_frequency: string | null;
  evening_reflection_time: string;
  quiet_window_start: string;
  quiet_window_end: string;
  weekend_sleep_extension: boolean;
  baseline_confidence: number;
  onboarding_completed: boolean;
  streak_days?: number;
  freezes_remaining?: number;
  mindspace_score?: number;
  stage?: string;
  daily_screen_target_minutes?: number;
  xp?: number;
  level?: number;
  current_stage_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingState {
  primaryGoal: string;
  targetPlatforms: string[];
  dailyScreenTime: string;
  peakVulnerabilityTime: string;
  triggers: string[];
  interruptionFrequency: string;
  eveningReflectionTime: string;
  quietWindowStart: string;
  quietWindowEnd: string;
  weekendSleepExtension: boolean;
}
