import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecovery } from '@/context/RecoveryContext';

export interface OfflineResetViewProps {
  onFinish: () => void;
}

export const OfflineResetView: React.FC<OfflineResetViewProps> = ({ onFinish }) => {
  const { recordSession } = useRecovery();
  const [seconds, setSeconds] = useState<number>(10 * 60); // 10 minutes
  const [promptIndex, setPromptIndex] = useState<number>(0);

  const prompts = [
    'Look at the farthest physical object across your room or out the window. Soften your eye focus for 30 seconds.',
    'Notice 3 distinct sounds occurring in your immediate environment right now without judging them.',
    'Place one hand over your diaphragm. Take 3 deep diaphragmatic breaths, letting exhalations be longer than inhalations.',
    'Feel your feet firmly in contact with the ground. Sense gravitational weight and grounding stability.',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    const promptInterval = setInterval(() => {
      setPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 45000); // cycle prompts every 45s

    return () => {
      clearInterval(timer);
      clearInterval(promptInterval);
    };
  }, [prompts.length]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleFinish = async () => {
    const elapsedMinutes = Math.max(1, Math.round((10 * 60 - seconds) / 60));
    await recordSession({
      session_type: 'offline_reset',
      duration_minutes: elapsedMinutes,
      xp_earned: 10,
    });
    onFinish();
  };

  return (
    <div className="max-w-lg mx-auto space-y-6 animate-fadeIn py-6 text-center">
      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/60 text-secondary text-xs font-medium">
          <span className="material-symbols-outlined text-sm">nature_people</span>
          Offline Sensory Return
        </span>
        <h2 className="text-2xl font-medium text-on-surface">10-Minute Reset Sanctuary</h2>
        <p className="text-xs text-outline max-w-sm mx-auto">
          Step away from all backlit glass. Notice ambient sounds, room temperature, and your feet touching the earth.
        </p>
      </div>

      <Card elevated className="p-6 space-y-6">
        {/* Animated Soft Ring */}
        <div className="w-40 h-40 rounded-full border-4 border-secondary/30 flex items-center justify-center mx-auto relative select-none">
          <div
            className="absolute inset-2 rounded-full border-2 border-dashed border-secondary/60 animate-spin"
            style={{ animationDuration: '40s' }}
          />
          <div className="text-center z-10">
            <span className="text-3xl font-mono font-medium text-on-surface">
              {formatTime(seconds)}
            </span>
            <span className="block text-[10px] text-outline mt-0.5">reset remaining</span>
          </div>
        </div>

        {/* Sensory prompts sequence */}
        <div className="text-xs text-on-surface-variant space-y-1.5 bg-surface-container-low dark:bg-surface-container p-4 rounded-xl text-left border border-outline-variant/30">
          <p className="font-medium text-on-surface flex items-center gap-1.5">
            <span className="material-symbols-outlined text-secondary text-sm">spa</span>
            <span>Current Somatic Cue:</span>
          </p>
          <p className="text-outline leading-relaxed">{prompts[promptIndex]}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-center border border-outline-variant/20">
            <span className="block font-medium text-on-surface">No Phone</span>
            <span className="text-[10px] text-outline">Out of reach</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-center border border-outline-variant/20">
            <span className="block font-medium text-on-surface">Soft Gaze</span>
            <span className="text-[10px] text-outline">Optic Flow</span>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-center border border-outline-variant/20">
            <span className="block font-medium text-on-surface">Breathe</span>
            <span className="text-[10px] text-outline">Slow exhales</span>
          </div>
        </div>

        <div className="flex items-center justify-center pt-2">
          <Button
            variant="primary"
            size="md"
            icon="check"
            onClick={handleFinish}
          >
            I Feel Grounded (Finish Early)
          </Button>
        </div>
      </Card>
    </div>
  );
};
