import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecovery } from '@/context/RecoveryContext';

export interface SupportiveGuardViewProps {
  onStartWalk: () => void;
  onStartBreathing: () => void;
  onDismiss: () => void;
  onStartReset: () => void;
}

export const SupportiveGuardView: React.FC<SupportiveGuardViewProps> = ({
  onStartWalk,
  onStartBreathing,
  onDismiss,
  onStartReset,
}) => {
  const { consumeFreeze, freezesRemaining } = useRecovery();

  const handleApplyFreeze = async () => {
    const ok = await consumeFreeze();
    if (ok) {
      onDismiss();
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 animate-fadeIn py-6">
      <Card elevated className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">shield_moon</span>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300">
              Compassionate Intervention
            </span>
            <h3 className="text-lg font-medium text-on-surface mt-0.5">
              You're 35 minutes over today's target
            </h3>
            <p className="text-xs text-outline mt-1 leading-relaxed">
              Primary app: <strong className="text-on-surface font-medium">Instagram (1h 42m)</strong> · Likely Trigger: Boredom after dinner.
            </p>
          </div>
        </div>

        {/* Non-punitive affirmation banner */}
        <div className="p-4 rounded-xl bg-surface-container text-xs sm:text-sm text-on-surface-variant leading-relaxed border-l-4 border-secondary">
          <p className="font-medium text-on-surface mb-1">Limit exceeded ≠ Recovery failure.</p>
          <p className="text-xs text-outline">
            Recovery is not an unbroken straight line. Neural pathways take deliberate time to re-route.
            What matters is catching the autopilot now with warmth and grace.
          </p>
        </div>

        {/* 4 Compassionate Reset Options */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-medium text-outline uppercase tracking-wider">
            Choose a gentle off-ramp:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={onStartWalk}
              className="p-3 text-left rounded-xl border border-outline-variant/40 hover:border-secondary hover:bg-surface-container-low transition-all min-h-[56px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-base">directions_walk</span>
                <span className="text-xs font-medium text-on-surface">10-Min Walk</span>
              </div>
              <p className="text-[11px] text-outline">Change physical room or step outside without devices.</p>
            </button>

            <button
              type="button"
              onClick={onStartBreathing}
              className="p-3 text-left rounded-xl border border-outline-variant/40 hover:border-secondary hover:bg-surface-container-low transition-all min-h-[56px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-base">air</span>
                <span className="text-xs font-medium text-on-surface">Box Breathing</span>
              </div>
              <p className="text-[11px] text-outline">Downregulate parasympathetic response in 3 minutes.</p>
            </button>

            <button
              type="button"
              onClick={onDismiss}
              className="p-3 text-left rounded-xl border border-outline-variant/40 hover:border-secondary hover:bg-surface-container-low transition-all min-h-[56px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-base">local_cafe</span>
                <span className="text-xs font-medium text-on-surface">Drink Water / Tea</span>
              </div>
              <p className="text-[11px] text-outline">Physical somatic grounding ritual.</p>
            </button>

            <button
              type="button"
              onClick={handleApplyFreeze}
              className="p-3 text-left rounded-xl border border-outline-variant/40 hover:border-secondary hover:bg-surface-container-low transition-all min-h-[56px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-base">ac_unit</span>
                <span className="text-xs font-medium text-on-surface">
                  Use Mindful Freeze ({freezesRemaining} left)
                </span>
              </div>
              <p className="text-[11px] text-outline">Protect today's streak without any guilt.</p>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-outline-variant/30 text-xs">
          <Button variant="ghost" size="sm" onClick={onDismiss}>
            Dismiss & Return to Dashboard
          </Button>
          <Button
            variant="primary"
            size="md"
            icon="nature_people"
            iconPosition="end"
            onClick={onStartReset}
          >
            Start 10-Min Offline Reset →
          </Button>
        </div>
      </Card>
    </div>
  );
};
