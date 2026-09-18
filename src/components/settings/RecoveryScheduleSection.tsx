import React from 'react';
import { useSettings } from '@/context/SettingsContext';

export const RecoveryScheduleSection: React.FC = () => {
  const { settings, updateRecoverySettings, saveAllSettings, isSaving } = useSettings();
  const { recovery } = settings;

  const formatMinutes = (val: number) => {
    const hours = Math.floor(val / 60);
    const mins = val % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  };

  const focusOptions: Array<{ duration: 15 | 30 | 45 | 60; label: string; sub: string }> = [
    { duration: 15, label: '15 min', sub: 'Micro-reset' },
    { duration: 30, label: '30 min', sub: 'Recommended' },
    { duration: 45, label: '45 min', sub: 'Deep session' },
    { duration: 60, label: '60 min', sub: 'Immersion' },
  ];

  return (
    <section className="space-y-6 animate-fadeIn" id="view-recovery">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Usage Stepper & Stamina Slider */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 space-y-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-on-surface">Daily Screen Usage Target</h3>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Calibrated to avoid aggressive drop-offs and prevent dopamine rebound.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xl font-medium text-primary dark:text-inverse-primary" id="targetValueBadge">
                {formatMinutes(recovery.dailyTargetMinutes)}
              </span>
              <span className="block text-[11px] text-on-surface-variant">Previous: 5h 10m</span>
            </div>
          </div>

          {/* Slider Range */}
          <div className="bg-surface-container-low dark:bg-surface p-4 rounded-lg space-y-3">
            <input
              id="usageSlider"
              type="range"
              min="120"
              max="480"
              step="15"
              value={recovery.dailyTargetMinutes}
              onChange={(e) => updateRecoverySettings({ dailyTargetMinutes: Number(e.target.value) })}
              className="w-full h-2 bg-surface-container-high dark:bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary dark:accent-inverse-primary"
              aria-label="Daily Screen Usage Target Slider"
            />
            <div className="flex justify-between text-[11px] text-on-surface-variant">
              <span>2h 00m (Intensive)</span>
              <span>4h 30m (Balanced)</span>
              <span>8h 00m (Permissive)</span>
            </div>
          </div>

          <div className="p-3.5 bg-surface-container-high/40 dark:bg-surface-container-highest/20 rounded-lg border border-outline-variant/30 dark:border-outline/20 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-base mt-0.5" aria-hidden="true">
              info
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              <strong className="font-medium text-on-surface">Mindful Adjustment Rule:</strong> Your target can be adjusted gradually as your cognitive stamina develops without sudden drops. Reducing by 15 minutes weekly yields sustainable neurological equilibrium.
            </p>
          </div>

          {/* Preferred Focus Block Duration Presets */}
          <div className="pt-4 border-t border-outline-variant/20 space-y-3">
            <label className="text-xs font-medium text-on-surface block">
              Default Focus Block Duration
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {focusOptions.map((opt) => {
                const isSelected = recovery.defaultFocusDuration === opt.duration;
                return (
                  <button
                    key={opt.duration}
                    type="button"
                    onClick={() => updateRecoverySettings({ defaultFocusDuration: opt.duration })}
                    className={`py-2.5 px-3 rounded-lg text-xs transition-all text-center min-h-[44px] ${
                      isSelected
                        ? 'border-2 border-primary dark:border-inverse-primary bg-primary/5 dark:bg-primary-container/20 text-primary dark:text-inverse-primary font-medium shadow-xs'
                        : 'border border-outline-variant/40 dark:border-outline/20 bg-surface-container-lowest dark:bg-surface text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <span className="block font-medium">{opt.label}</span>
                    <span className={`text-[10px] ${isSelected ? 'text-primary/70 dark:text-inverse-primary/80' : 'text-on-surface-variant'}`}>
                      {opt.sub}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Check-in & Quiet Hours */}
          <div className="pt-4 border-t border-outline-variant/20 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="morning-reflection-time" className="text-xs font-medium text-on-surface block mb-1.5">
                Morning Reflection Window
              </label>
              <div className="flex items-center gap-2 border border-outline-variant/40 dark:border-outline/20 rounded-lg p-2.5 bg-surface-container-lowest dark:bg-surface">
                <span className="material-symbols-outlined text-outline text-sm">wb_sunny</span>
                <input
                  id="morning-reflection-time"
                  type="text"
                  value={recovery.morningReflectionTime}
                  onChange={(e) => updateRecoverySettings({ morningReflectionTime: e.target.value })}
                  className="bg-transparent border-0 p-0 text-xs text-on-surface focus:ring-0 w-full"
                />
                <span className="text-[11px] text-on-surface-variant shrink-0">Local</span>
              </div>
            </div>

            <div>
              <label htmlFor="quiet-window-hours" className="text-xs font-medium text-on-surface block mb-1.5">
                Quiet Hours (Buffer Zone)
              </label>
              <div className="flex items-center gap-2 border border-outline-variant/40 dark:border-outline/20 rounded-lg p-2.5 bg-surface-container-lowest dark:bg-surface">
                <span className="material-symbols-outlined text-outline text-sm">bedtime</span>
                <input
                  id="quiet-window-hours"
                  type="text"
                  value={`${recovery.quietWindowStart} — ${recovery.quietWindowEnd}`}
                  onChange={(e) => {
                    const parts = e.target.value.split('—').map((s) => s.trim());
                    if (parts.length === 2) {
                      updateRecoverySettings({ quietWindowStart: parts[0], quietWindowEnd: parts[1] });
                    }
                  }}
                  className="bg-transparent border-0 p-0 text-xs text-on-surface focus:ring-0 w-full"
                />
                <span className="text-[11px] text-secondary dark:text-inverse-primary font-medium shrink-0">
                  Zero Pings
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Streak & Freeze Philosophy Module */}
        <div className="lg:col-span-1 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                Compassionate Streaks
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            </div>

            <div className="p-4 bg-secondary-container/20 dark:bg-secondary-container/10 rounded-xl border border-secondary-container/50 dark:border-secondary-container/30 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-secondary dark:text-inverse-primary">
                  pause_circle
                </span>
                <span className="text-sm font-medium text-primary dark:text-inverse-primary">
                  2 Freezes Banked
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Streaks reflect your personal rhythm, not robotic perfection. Taking mindful pauses preserves your momentum without shame or penalty.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between py-2 border-b border-outline-variant/20 cursor-pointer min-h-[44px]">
                <span className="text-on-surface">Auto-apply Freeze if sick</span>
                <input
                  type="checkbox"
                  checked={recovery.autoFreezeSick}
                  onChange={(e) => updateRecoverySettings({ autoFreezeSick: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between py-2 border-b border-outline-variant/20 cursor-pointer min-h-[44px]">
                <span className="text-on-surface">Weekend Flexibility Mode</span>
                <input
                  type="checkbox"
                  checked={recovery.weekendFlexibility}
                  onChange={(e) => updateRecoverySettings({ weekendFlexibility: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
              </label>

              <label className="flex items-center justify-between py-2 cursor-pointer min-h-[44px]">
                <span className="text-on-surface">Notify before Freeze consumes</span>
                <input
                  type="checkbox"
                  checked={recovery.notifyBeforeFreeze}
                  onChange={(e) => updateRecoverySettings({ notifyBeforeFreeze: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
              </label>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={() => saveAllSettings('Recovery schedule locked peacefully.')}
              disabled={isSaving}
              className="w-full py-2.5 px-3 rounded-lg bg-primary dark:bg-inverse-primary text-on-primary dark:text-primary text-xs font-medium hover:bg-primary-container transition-colors min-h-[44px] flex items-center justify-center gap-1.5 shadow-xs"
            >
              {isSaving && <span className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />}
              <span>Save Recovery Schedule</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
