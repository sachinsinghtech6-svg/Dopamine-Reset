import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { useRecovery } from '@/context/RecoveryContext';

export interface FocusSessionViewProps {
  onConclude: () => void;
  onExit: () => void;
}

export const FocusSessionView: React.FC<FocusSessionViewProps> = ({ onExit }) => {
  const { recordSession } = useRecovery();
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30 * 60); // 30 minutes
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [completing, setCompleting] = useState<boolean>(false);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleComplete = async () => {
    setCompleting(true);
    try {
      const elapsedMinutes = Math.max(1, Math.round((30 * 60 - secondsRemaining) / 60));
      await recordSession({
        session_type: 'focus',
        duration_minutes: elapsedMinutes,
        xp_earned: 20,
      });
    } finally {
      setCompleting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-fadeIn py-6 text-center">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/60 text-secondary text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          In-Progress Mindful Session
        </span>
        <h2 className="text-2xl sm:text-3xl font-medium text-on-surface">Phone-Free Deep Work</h2>
        <p className="text-xs text-outline max-w-sm mx-auto">
          Phone physically parked in the other room. Let your mind embrace the quiet.
        </p>
      </div>

      {/* Soft Ambient Breathing Circle & Timer */}
      <div className="relative w-64 h-64 mx-auto flex items-center justify-center select-none">
        <div className="absolute inset-0 rounded-full bg-secondary-container/20 border border-secondary/30 animate-calm-pulse" />
        <div className="absolute inset-4 rounded-full bg-surface-container-low dark:bg-tertiary-container/40" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-4xl sm:text-5xl font-semibold tracking-tight text-on-surface font-mono">
            {formatTime(secondsRemaining)}
          </span>
          <span className="text-xs text-outline mt-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-secondary">air</span>
            <span>{isPaused ? 'Session paused' : 'Inhale gently · 4s cycle'}</span>
          </span>
        </div>
      </div>

      {/* Focus Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          icon={isPaused ? 'play_arrow' : 'pause'}
          onClick={() => setIsPaused(!isPaused)}
        >
          {isPaused ? 'Resume Session' : 'Pause Session'}
        </Button>
        <Button
          variant="primary"
          size="md"
          icon="check_circle"
          loading={completing}
          onClick={handleComplete}
        >
          Complete Session (+20 XP)
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={onExit}
        >
          End Quietly
        </Button>
      </div>

      <Card className="p-4 bg-surface-container-low/70 text-xs text-outline max-w-md mx-auto text-left leading-relaxed">
        If an urge to check notifications arises, notice the subtle sensation in your fingers
        without judging it. Neuroplastic research shows dopamine urges peak and subside in approximately 90 seconds.
      </Card>
    </div>
  );
};
