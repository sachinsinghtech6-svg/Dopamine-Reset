import React from 'react';
import { Button } from '../ui/Button';

export interface StepTriggersProps {
  selectedTriggers: string[];
  interruptionFrequency: string;
  onTriggersChange: (triggers: string[]) => void;
  onFrequencyChange: (freq: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepTriggers: React.FC<StepTriggersProps> = ({
  selectedTriggers,
  interruptionFrequency,
  onTriggersChange,
  onFrequencyChange,
  onNext,
  onBack,
}) => {
  const triggers = [
    { name: 'Boredom & Stillness', sub: 'Difficulty sitting with pauses', icon: 'sentiment_dissatisfied' },
    { name: 'Workplace Stress', sub: 'Escaping mental overwhelm', icon: 'psychology_alt' },
    { name: 'Vibration Urges', sub: 'Phantom alerts & pings', icon: 'notifications_active' },
    { name: 'Automatic Habit', sub: 'Muscle memory picking up device', icon: 'replay' },
    { name: 'Quiet Loneliness', sub: 'Seeking pseudo-connection', icon: 'person_off' },
    { name: 'FOMO / Information Panic', sub: 'Fear of missing discourse', icon: 'visibility' },
  ];

  const frequencies = ['Rarely (<2x/hr)', 'Sometimes (3-5x/hr)', 'Often (>6x/hr)'];

  const toggleTrigger = (name: string) => {
    if (selectedTriggers.includes(name)) {
      onTriggersChange(selectedTriggers.filter((t) => t !== name));
    } else {
      onTriggersChange([...selectedTriggers, name]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          What triggers your involuntary scrolling?
        </h2>
        <p className="text-xs text-outline leading-relaxed">
          Every impulse is an emotional signal. Identifying the origin lets us replace compulsion with ease.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {triggers.map((trig) => {
          const isSelected = selectedTriggers.includes(trig.name);
          return (
            <button
              key={trig.name}
              type="button"
              onClick={() => toggleTrigger(trig.name)}
              className={`p-3 rounded-xl border text-left transition-all min-h-[56px] ${
                isSelected
                  ? 'border-secondary bg-secondary-container/20 shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-lowest dark:bg-surface-container hover:border-outline'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] ${
                  isSelected ? 'text-secondary' : 'text-outline'
                }`}
              >
                {trig.icon}
              </span>
              <div className="text-xs font-medium text-on-surface mt-1 truncate">{trig.name}</div>
              <div className="text-[10px] text-outline truncate">{trig.sub}</div>
            </button>
          );
        })}
      </div>

      {/* Adaptive Follow-up question */}
      <div className="p-4 rounded-xl bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/40 space-y-2.5">
        <span className="text-[10px] font-semibold text-secondary uppercase tracking-wider block">
          Adaptive Inquiry
        </span>
        <h4 className="text-xs font-medium text-on-surface leading-tight">
          When focus interrupts study or complex work, how frequently does it occur?
        </h4>
        <div className="flex gap-2 pt-1">
          {frequencies.map((f) => {
            const isSelected = interruptionFrequency === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => onFrequencyChange(f)}
                className={`flex-1 py-2 px-2 text-xs rounded-lg border min-h-[44px] transition-all ${
                  isSelected
                    ? 'border-secondary bg-secondary-container/20 text-primary font-medium'
                    : 'border-outline-variant/40 hover:border-outline text-outline'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button variant="ghost" size="md" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={onNext}
          icon="arrow_forward"
          iconPosition="end"
          disabled={selectedTriggers.length === 0 || !interruptionFrequency}
        >
          Next: Quiet Hours
        </Button>
      </div>
    </div>
  );
};
