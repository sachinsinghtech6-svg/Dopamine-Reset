export interface RecoverySettings {
  dailyTargetMinutes: number; // 120 - 480 mins (2h to 8h)
  defaultFocusDuration: 15 | 30 | 45 | 60;
  morningReflectionTime: string;
  quietWindowStart: string;
  quietWindowEnd: string;
  autoFreezeSick: boolean;
  weekendFlexibility: boolean;
  notifyBeforeFreeze: boolean;
}

export interface NotificationSettings {
  dailyCheckin: boolean;
  eveningWinddown: boolean;
  weeklySummary: boolean;
  middayNudge: boolean;
  breakingNewsIntercept: boolean;
}

export interface AIPerimeterSettings {
  recoveryProgress: boolean;
  usageDurations: boolean;
  moodLogs: boolean;
  journalReflections: boolean;
  browsingHistory: boolean;
}

export interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  reducedMotion: boolean;
  highContrast: boolean;
  screenReaderLabels: boolean;
  fontScale: number; // 15, 17, 19, 21
}

export interface UserSettingsState {
  recovery: RecoverySettings;
  notifications: NotificationSettings;
  aiPerimeter: AIPerimeterSettings;
  appearance: AppearanceSettings;
}

export interface ExportDataOptions {
  profileAndStage: boolean;
  screenUsageAndFocus: boolean;
  urgeAndMood: boolean;
  journalReflections: boolean;
}

export type SettingsTabId =
  | 'profile'
  | 'recovery'
  | 'notifications'
  | 'aicoach'
  | 'data'
  | 'appearance'
  | 'help'
  | 'modals';

export const DEFAULT_USER_SETTINGS: UserSettingsState = {
  recovery: {
    dailyTargetMinutes: 270, // 4h 30m
    defaultFocusDuration: 30,
    morningReflectionTime: '08:30 AM',
    quietWindowStart: '10:30 PM',
    quietWindowEnd: '07:00 AM',
    autoFreezeSick: true,
    weekendFlexibility: true,
    notifyBeforeFreeze: true,
  },
  notifications: {
    dailyCheckin: true,
    eveningWinddown: true,
    weeklySummary: true,
    middayNudge: false,
    breakingNewsIntercept: true,
  },
  aiPerimeter: {
    recoveryProgress: true,
    usageDurations: true,
    moodLogs: true,
    journalReflections: false,
    browsingHistory: false,
  },
  appearance: {
    theme: 'system',
    reducedMotion: false,
    highContrast: false,
    screenReaderLabels: true,
    fontScale: 17,
  },
};
