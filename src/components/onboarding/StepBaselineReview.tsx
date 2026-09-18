import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import type { OnboardingState } from '@/types/profile';

export interface StepBaselineReviewProps {
  state: OnboardingState;
  onEditGoal: () => void;
  onActivate: () => Promise<void>;
  onBack: () => void;
  loading: boolean;
}

export const StepBaselineReview: React.FC<StepBaselineReviewProps> = ({
  state,
  onEditGoal,
  onActivate,
  onBack,
  loading,
}) => {
  const [subView, setSubView] = useState<'review' | 'preview'>('review');

  const goalTitleMap: Record<string, string> = {
    focus: 'Improve Deep Focus & Attention Span',
    screentime: 'Reduce Compulsive Screen Time',
    stress: 'Reduce Stress Scrolling & Micro-escapes',
    sleep: 'Improve Sleep Quality & Late Night Browsing',
    study: 'Study & Academic Productivity',
    presence: 'Real-World Social Presence',
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      {subView === 'review' ? (
        <>
          <div className="space-y-1">
            <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
              Your Baseline Summary
            </h2>
            <p className="text-xs text-outline leading-relaxed">
              Review your calibrated profile before our quiet intelligence synthesizes your adaptive reset pathway.
            </p>
          </div>

          <Card elevated className="p-5 space-y-4">
            {/* Primary intention */}
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline font-medium">Primary Intention</span>
                <h3 className="text-sm font-medium text-on-surface mt-0.5">
                  {goalTitleMap[state.primaryGoal] || 'Conscious Attention Recovery'}
                </h3>
              </div>
              <button
                type="button"
                onClick={onEditGoal}
                className="text-xs text-secondary hover:underline flex items-center gap-1 min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                <span>Edit</span>
              </button>
            </div>

            {/* Platforms & Screen time */}
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline font-medium">Target Vectors</span>
                <p className="text-xs text-on-surface font-medium mt-0.5 truncate">
                  {state.targetPlatforms.join(', ') || 'None selected'}
                </p>
                <span className="text-[10px] text-outline">{state.targetPlatforms.length} calibrated apps</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline font-medium">Daily Baseline</span>
                <p className="text-xs text-on-surface font-medium mt-0.5">{state.dailyScreenTime}</p>
                <span className="text-[10px] text-secondary">Target: 2.5h by Month 1</span>
              </div>
            </div>

            {/* Triggers & Quiet window */}
            <div className="grid grid-cols-2 gap-4 pb-3 border-b border-outline-variant/30">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline font-medium">Primary Triggers</span>
                <p className="text-xs text-on-surface font-medium mt-0.5 truncate">
                  {state.triggers.join(', ') || 'None'}
                </p>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-outline font-medium">Sanctuary Window</span>
                <p className="text-xs text-on-surface font-medium mt-0.5">
                  {state.quietWindowStart} — {state.quietWindowEnd}
                </p>
              </div>
            </div>

            {/* Confidence Meter */}
            <div className="p-3 bg-secondary-container/20 rounded-xl border border-secondary/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
                <div>
                  <div className="text-xs font-medium text-primary dark:text-inverse-primary">
                    Baseline Calibration: 94%
                  </div>
                  <div className="text-[10px] text-outline">
                    Sufficient clarity to design Stage 1: Observational Awareness
                  </div>
                </div>
              </div>
              <Badge variant="primary" size="sm">Calibrated</Badge>
            </div>
          </Card>

          <div className="flex items-center justify-between pt-2">
            <Button variant="ghost" size="md" onClick={onBack}>
              Back
            </Button>
            <Button
              variant="primary"
              size="md"
              icon="auto_awesome"
              iconPosition="end"
              onClick={() => setSubView('preview')}
            >
              Generate My Reset Plan
            </Button>
          </div>
        </>
      ) : (
        /* Reset Plan Preview */
        <>
          <div className="text-center space-y-1.5">
            <span className="text-xs font-medium text-secondary uppercase tracking-widest">
              Personalized Strategy Synthesized
            </span>
            <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
              Your Reset Plan is Ready
            </h2>
            <p className="text-xs text-outline max-w-md mx-auto">
              Tuned specifically to your cognitive presence goal and emotional triggers.
            </p>
          </div>

          <Card elevated className="p-6 space-y-5">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <Badge variant="primary" size="sm" icon="check_circle">
                  Starting Level · Week 1 of 4
                </Badge>
                <h3 className="text-base font-medium text-on-surface mt-1">
                  Stage 1: Observational Awareness
                </h3>
              </div>
              <span className="text-xs text-outline">Zero abrupt blocking</span>
            </div>

            <p className="text-xs text-outline leading-relaxed">
              We do not abruptly rip applications away. For the next 7 days, Dopamine Reset creates a gentle 4-second breathing space before apps open, giving your prefrontal cortex time to catch up.
            </p>

            {/* Interventions */}
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-outline uppercase tracking-wider block">
                Your First 3 Restorative Interventions:
              </span>
              <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">qr_code_2</span>
                <div className="text-xs">
                  <span className="font-medium text-on-surface block">4-Second Micro-Pause</span>
                  <span className="text-outline">A gentle breath ring before launching high-stimulus feeds.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">wb_twilight</span>
                <div className="text-xs">
                  <span className="font-medium text-on-surface block">{state.quietWindowStart} Grayscale Shift</span>
                  <span className="text-outline">Removes visual hyperstimulation 60 minutes before bedtime.</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">edit_note</span>
                <div className="text-xs">
                  <span className="font-medium text-on-surface block">2-Minute Evening Clarity Log</span>
                  <span className="text-outline">A non-judgmental prompt to record cognitive composure.</span>
                </div>
              </div>
            </div>

            {/* AI Observation Quote */}
            <div className="p-3.5 rounded-xl bg-surface-container dark:bg-surface-container-high border border-outline-variant/40 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">psychology</span>
              <div className="space-y-1 text-xs">
                <div className="font-medium text-primary dark:text-inverse-primary">Quiet AI Recovery Coach Observation</div>
                <p className="text-outline leading-relaxed text-[11px]">
                  "Because boredom is your primary trigger during focus blocks, we will swap involuntary scrolling with 90 seconds of tactile breathing. No punishment—only calm presence."
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button variant="ghost" size="md" onClick={() => setSubView('review')}>
                Back to Review
              </Button>
              <Button
                variant="primary"
                size="lg"
                loading={loading}
                icon="check"
                onClick={onActivate}
              >
                Activate Reset Plan
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};
