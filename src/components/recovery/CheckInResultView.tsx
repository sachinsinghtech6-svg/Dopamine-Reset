import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecovery } from '@/context/RecoveryContext';
import { useAuth } from '@/context/AuthContext';

export interface CheckInResultViewProps {
  onBackToDashboard: () => void;
  onStartFocus: () => void;
}

export const CheckInResultView: React.FC<CheckInResultViewProps> = ({
  onBackToDashboard,
  onStartFocus,
}) => {
  const { todayCheckIn, streakDays } = useRecovery();
  const { user, profile } = useAuth();
  const userName = profile?.full_name || user?.user_metadata?.full_name || 'Friend';

  const triggersList = todayCheckIn?.triggers_today?.length
    ? todayCheckIn.triggers_today.join(' and ')
    : 'Work Stress';

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-4">
      <Card elevated className="p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">psychology</span>
          </div>
          <div>
            <span className="text-xs font-medium text-secondary">
              Check-in Processed · Day {streakDays}
            </span>
            <h3 className="text-lg font-medium text-on-surface">Your Nervous System Synthesis</h3>
          </div>
        </div>

        <div className="space-y-3 bg-surface-container-lowest dark:bg-tertiary-container/30 p-4 rounded-xl border border-outline-variant/30 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          <p>
            "{userName}, thank you for being honest about your{' '}
            <strong className="text-on-surface font-medium">{triggersList}</strong> trigger today.
            When mental fatigue peaks in the evening, subconscious seeking often spikes toward
            short-form feeds."
          </p>
          <p className="text-primary dark:text-inverse-primary font-medium">
            → Gentle Suggestion: We've scheduled a supportive friction shield starting at 7:45 PM. No
            guilt, just a peaceful offline harbor.
          </p>
        </div>

        {/* 3 Recommended Mindful Substitutes */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-medium text-outline uppercase tracking-wider">
            Suggested Mindful Substitutes
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-left">
              <span className="material-symbols-outlined text-secondary text-lg mb-1">
                directions_walk
              </span>
              <p className="text-xs font-medium text-on-surface">10-Min Optic Flow</p>
              <p className="text-[11px] text-outline mt-0.5">Reset gaze horizontally.</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-left">
              <span className="material-symbols-outlined text-secondary text-lg mb-1">
                menu_book
              </span>
              <p className="text-xs font-medium text-on-surface">Fiction Reading</p>
              <p className="text-[11px] text-outline mt-0.5">15 min analog chapter.</p>
            </div>
            <div className="p-3 rounded-xl bg-surface-container border border-outline-variant/30 text-left">
              <span className="material-symbols-outlined text-secondary text-lg mb-1">
                self_improvement
              </span>
              <p className="text-xs font-medium text-on-surface">Box Breathing</p>
              <p className="text-[11px] text-outline mt-0.5">4s inhale, 4s hold.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <Button variant="ghost" size="md" onClick={onBackToDashboard}>
            ← Back to Dashboard
          </Button>
          <Button
            variant="primary"
            size="md"
            icon="play_arrow"
            iconPosition="end"
            onClick={onStartFocus}
          >
            Begin 30-Min Phone-Free Focus
          </Button>
        </div>
      </Card>
    </div>
  );
};
