export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'difficult';
export type EnergyType = 'high' | 'medium' | 'low';
export type UrgeLevel = 1 | 2 | 3 | 4 | 5;
export type SessionType = 'focus' | 'offline_reset' | 'walk' | 'breathe';

export interface DailyCheckIn {
  id: string;
  user_id: string;
  log_date: string;
  mood: MoodType;
  energy: EnergyType;
  urge_intensity: UrgeLevel;
  triggers_today: string[];
  intention_note: string | null;
  completed_tasks: string[];
  created_at: string;
  updated_at: string;
}

export interface RecoverySession {
  id: string;
  user_id: string;
  session_type: SessionType;
  duration_minutes: number;
  completed: boolean;
  xp_earned: number;
  notes: string | null;
  created_at: string;
}

export interface IntentionalTask {
  id: string;
  title: string;
  desc: string;
  status: 'completed' | 'ready' | 'pending' | 'scheduled' | 'optional';
  badgeLabel?: string;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'default' | 'neutral';
  metaLabel?: string;
  actionText?: string;
  actionKey: 'checkin' | 'focus' | 'trigger' | 'evening' | 'walk';
  icon: string;
}

export type RecoveryViewKey =
  | 'dashboard'
  | 'checkin'
  | 'insight'
  | 'focus'
  | 'completion'
  | 'limit'
  | 'reset'
  | 'done'
  | 'empty'
  | 'skeleton'
  | 'analytics'
  | 'journal'
  | 'coach'
  | 'edge';
