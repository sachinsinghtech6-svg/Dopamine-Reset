import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export interface SessionCompletionViewProps {
  onReturnDashboard: () => void;
  onTakeReset: () => void;
}

export const SessionCompletionView: React.FC<SessionCompletionViewProps> = ({
  onReturnDashboard,
  onTakeReset,
}) => {
  return (
    <div className="max-w-md mx-auto space-y-6 animate-fadeIn py-8 text-center">
      <div className="w-16 h-16 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
        <span className="material-symbols-outlined text-3xl">spa</span>
      </div>

      <div className="space-y-1.5">
        <span className="text-xs font-medium text-secondary tracking-wide uppercase">
          Session Mindfully Concluded
        </span>
        <h2 className="text-2xl font-medium text-on-surface">30 Minutes Reclaimed</h2>
        <p className="text-xs text-outline max-w-xs mx-auto">
          You gave your brain a peaceful respite from high-frequency dopamine spikes.
        </p>
      </div>

      {/* Calm Reward Token */}
      <Card elevated className="p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-outline">Mindspace Fortified</span>
          <span className="font-medium text-primary dark:text-inverse-primary">+20 Intentional XP</span>
        </div>
        <div className="w-full bg-surface-container-high rounded-full h-2 overflow-hidden">
          <div className="bg-secondary h-2 rounded-full transition-all duration-500" style={{ width: '82%' }} />
        </div>
        <p className="text-[11px] text-outline text-left leading-relaxed">
          Your brain's dopamine D2 receptor sensitivity gradually recalibrates with every completed unhurried block.
        </p>
      </Card>

      <div className="flex flex-col gap-2.5 pt-2">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          icon="dashboard"
          onClick={onReturnDashboard}
        >
          Return to Sanctuary Dashboard
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="w-full"
          icon="nature_people"
          onClick={onTakeReset}
        >
          Take a 10-Minute Offline Reset
        </Button>
      </div>
    </div>
  );
};
