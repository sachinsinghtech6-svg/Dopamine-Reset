import React, { useState } from 'react';
import { Brandmark } from '../ui/Brandmark';
import { StepGoal } from './StepGoal';
import { StepPlatforms } from './StepPlatforms';
import { StepUsage } from './StepUsage';
import { StepTriggers } from './StepTriggers';
import { StepSchedule } from './StepSchedule';
import { StepBaselineReview } from './StepBaselineReview';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import type { OnboardingState } from '@/types/profile';

export const OnboardingWizard: React.FC = () => {
  const { user, saveOnboardingData, signOut } = useAuth();
  const { showToast } = useToast();

  const [step, setStep] = useState<number>(1);
  const [submitting, setSubmitting] = useState(false);

  const [state, setState] = useState<OnboardingState>({
    primaryGoal: 'focus',
    targetPlatforms: ['Instagram', 'YouTube', 'TikTok'],
    dailyScreenTime: '4 - 6 hours',
    peakVulnerabilityTime: 'Late afternoon fatigue',
    triggers: ['Boredom & Stillness', 'Workplace Stress'],
    interruptionFrequency: 'Sometimes (3-5x/hr)',
    eveningReflectionTime: '21:00',
    quietWindowStart: '22:30',
    quietWindowEnd: '07:00',
    weekendSleepExtension: true,
  });

  const handleActivate = async () => {
    setSubmitting(true);
    try {
      const res = await saveOnboardingData({
        primary_goal: state.primaryGoal,
        target_platforms: state.targetPlatforms,
        daily_screen_time: state.dailyScreenTime,
        peak_vulnerability_time: state.peakVulnerabilityTime,
        triggers: state.triggers,
        interruption_frequency: state.interruptionFrequency,
        evening_reflection_time: state.eveningReflectionTime,
        quiet_window_start: state.quietWindowStart,
        quiet_window_end: state.quietWindowEnd,
        weekend_sleep_extension: state.weekendSleepExtension,
        baseline_confidence: 94,
        onboarding_completed: true,
      });

      if (res.success) {
        showToast('Your Reset Plan is active! Welcome to your sanctuary dashboard.', 'success');
      } else {
        showToast(res.error || 'Failed to persist calibration profile.', 'error');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const stepLabels = [
    'Primary Objective',
    'Target Vectors',
    'Baseline Metrics',
    'Emotional Anchors',
    'Temporal Sanctuary',
    'Calibration Complete',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface transition-colors duration-200">
      {/* Top Wizard Header */}
      <header className="w-full border-b border-outline-variant/40 bg-surface-container-lowest/80 dark:bg-surface-container/80 backdrop-blur-sm px-4 sm:px-8 py-3">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <Brandmark size="sm" showSubtitle={false} />
          <div className="flex items-center gap-3">
            <span className="text-xs text-outline hidden sm:inline">
              {user?.email || 'Calibrating'}
            </span>
            <button
              type="button"
              onClick={signOut}
              className="text-xs text-outline hover:text-on-surface min-h-[36px] px-2 rounded"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center px-4 py-8 sm:py-12">
        <div className="max-w-xl mx-auto w-full space-y-6">
          {/* Progress Bar & Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-on-surface-variant">
              <span>Step {step} of 6 · {stepLabels[step - 1]}</span>
              <span className="font-medium text-primary dark:text-inverse-primary">
                Baseline Calibration
              </span>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div
                className="bg-primary dark:bg-secondary h-full transition-all duration-300"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Active Step */}
          {step === 1 && (
            <StepGoal
              value={state.primaryGoal}
              onChange={(val) => setState((s) => ({ ...s, primaryGoal: val }))}
              onNext={() => setStep(2)}
            />
          )}

          {step === 2 && (
            <StepPlatforms
              selected={state.targetPlatforms}
              onChange={(platforms) => setState((s) => ({ ...s, targetPlatforms: platforms }))}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepUsage
              dailyUsage={state.dailyScreenTime}
              peakTime={state.peakVulnerabilityTime}
              onUsageChange={(val) => setState((s) => ({ ...s, dailyScreenTime: val }))}
              onPeakTimeChange={(val) => setState((s) => ({ ...s, peakVulnerabilityTime: val }))}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <StepTriggers
              selectedTriggers={state.triggers}
              interruptionFrequency={state.interruptionFrequency}
              onTriggersChange={(trigs) => setState((s) => ({ ...s, triggers: trigs }))}
              onFrequencyChange={(freq) => setState((s) => ({ ...s, interruptionFrequency: freq }))}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <StepSchedule
              eveningTime={state.eveningReflectionTime}
              quietStart={state.quietWindowStart}
              quietEnd={state.quietWindowEnd}
              weekendExtension={state.weekendSleepExtension}
              onEveningChange={(val) => setState((s) => ({ ...s, eveningReflectionTime: val }))}
              onQuietStartChange={(val) => setState((s) => ({ ...s, quietWindowStart: val }))}
              onQuietEndChange={(val) => setState((s) => ({ ...s, quietWindowEnd: val }))}
              onWeekendToggle={(val) => setState((s) => ({ ...s, weekendSleepExtension: val }))}
              onNext={() => setStep(6)}
              onBack={() => setStep(4)}
            />
          )}

          {step === 6 && (
            <StepBaselineReview
              state={state}
              onEditGoal={() => setStep(1)}
              onActivate={handleActivate}
              onBack={() => setStep(5)}
              loading={submitting}
            />
          )}
        </div>
      </main>
    </div>
  );
};
