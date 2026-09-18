export interface StageChecklistItem {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  isComplete: boolean;
  statusNote?: string;
}

export interface RecoveryStage {
  id: number;
  name: string;
  tagline: string;
  description: string;
  status: 'completed' | 'current' | 'locked' | 'destination';
  completionPercent: number;
  verifiedAgo?: string;
  unlockRequirement?: string;
  checklist?: StageChecklistItem[];
}

export interface TrackLevel {
  level: number;
  title: string;
  requiredXp: number;
  tier: 1 | 2 | 3 | 4;
  tierName: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isTarget: boolean;
}

export interface XPRule {
  action: string;
  xp: number;
  description?: string;
}

export interface XPLedgerItem {
  id: string;
  actionType: string;
  description: string;
  xp: number;
  timestamp: string;
  icon: string;
}

export interface PersonalBadge {
  id: string;
  title: string;
  description: string;
  emoji: string;
  status: 'unlocked' | 'in_progress' | 'locked';
  progress?: number;
  target?: number;
  unlockedLabel?: string;
}

export type ChallengeCategory = 'All' | 'Focus' | 'Screen Time' | 'Awareness' | 'Lifestyle';

export interface RecoveryChallenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  sprintType: string;
  description: string;
  status: 'available' | 'active' | 'completed';
  progressDays: number;
  targetDays: number;
  xpReward: number;
  ritualTitle: string;
  ritualDescription: string;
  actionButtonText: string;
  icon: string;
}

export interface BeforeVsNowMetric {
  label: string;
  baselineValue: string;
  currentValue: string;
  reclaimedBadge: string;
  icon: string;
}

export interface CumulativeProofCounter {
  phoneFreeSessions: number;
  dailyCheckins: number;
  triggersMapped: number;
  reclaimedHours: string;
}

export type Phase5SectionId =
  | 'stages-section'
  | 'xp-level-track'
  | 'challenges-section'
  | 'milestones-reflections'
  | 'edge-states';
