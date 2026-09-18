import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecovery } from '@/context/RecoveryContext';

export interface AllDoneViewProps {
  onRevisitDashboard: () => void;
}

export const AllDoneView: React.FC<AllDoneViewProps> = ({ onRevisitDashboard }) => {
  const { streakDays, tasks } = useRecovery();

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fadeIn py-12 text-center">
      <div className="w-20 h-20 rounded-full bg-secondary-container/50 text-secondary mx-auto flex items-center justify-center">
        <span className="text-4xl">🌱</span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-medium text-secondary uppercase tracking-wider">
          Day {streakDays} Sanctuary Complete
        </span>
        <h2 className="text-3xl font-medium text-on-surface">You're done for today.</h2>
        <p className="text-sm text-outline max-w-sm mx-auto leading-relaxed">
          There are no more tasks, metrics to maximize, or notifications to check. Close this app and
          enjoy your evening offline.
        </p>
      </div>

      <Card elevated className="p-5 space-y-3 text-left text-xs text-on-surface-variant">
        <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
          <span className="font-medium text-on-surface">Today's Calibrated Summary</span>
          <span className="text-secondary font-medium">✓ All Actions Complete</span>
        </div>
        <div className="space-y-2 text-outline">
          {tasks.map((t) => (
            <div key={t.id} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
              <span className="text-on-surface">{t.title}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="pt-2">
        <Button variant="outline" size="md" onClick={onRevisitDashboard}>
          Revisit Sanctuary Dashboard
        </Button>
      </div>
    </div>
  );
};
