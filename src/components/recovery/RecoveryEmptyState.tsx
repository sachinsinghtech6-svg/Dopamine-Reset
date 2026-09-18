import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface RecoveryEmptyStateProps {
  onStartCheckin: () => void;
  onViewDashboard: () => void;
}

export const RecoveryEmptyState: React.FC<RecoveryEmptyStateProps> = ({
  onStartCheckin,
  onViewDashboard,
}) => {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-8">
      <Card elevated className="p-8 space-y-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary mx-auto flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">spa</span>
        </div>

        <div className="space-y-1.5 max-w-md mx-auto">
          <span className="text-xs font-medium text-secondary">Stage 1 · Day 1 Orientation</span>
          <h2 className="text-2xl font-medium text-on-surface">Welcome to Dopamine Reset</h2>
          <p className="text-xs sm:text-sm text-outline leading-relaxed">
            We don't do sudden cold turkey or shame-based locks. We gently re-sensitize your attention through micro-friction and calm offline rituals.
          </p>
        </div>

        {/* Day 1 Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-2">
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
            <span className="text-xs font-semibold text-primary dark:text-inverse-primary">1. Awareness</span>
            <h4 className="text-xs font-medium text-on-surface">Take Baseline Check-in</h4>
            <p className="text-[11px] text-outline">Learn your current urge triggers.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
            <span className="text-xs font-semibold text-secondary">2. Soft Guard</span>
            <h4 className="text-xs font-medium text-on-surface">Set Gentle Ceiling</h4>
            <p className="text-[11px] text-outline">Set daily screen target with a 45m buffer.</p>
          </div>
          <div className="p-4 rounded-xl bg-surface-container border border-outline-variant/30 space-y-1">
            <span className="text-xs font-semibold text-outline">3. First Step</span>
            <h4 className="text-xs font-medium text-on-surface">15-Min Phone Pause</h4>
            <p className="text-[11px] text-outline">A quiet evening warmup ritual.</p>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            icon="arrow_forward"
            iconPosition="end"
            onClick={onStartCheckin}
          >
            Begin Day 1 Orientation
          </Button>
          <Button
            variant="ghost"
            size="md"
            onClick={onViewDashboard}
          >
            View Active Dashboard Demo
          </Button>
        </div>
      </Card>
    </div>
  );
};
