import React from 'react';
import { Button } from '../ui/Button';

export interface StepUsageProps {
  dailyUsage: string;
  peakTime: string;
  onUsageChange: (val: string) => void;
  onPeakTimeChange: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepUsage: React.FC<StepUsageProps> = ({
  dailyUsage,
  peakTime,
  onUsageChange,
  onPeakTimeChange,
  onNext,
  onBack,
}) => {
  const usageRanges = [
    { label: '< 2 hours', sub: 'Light ambient' },
    { label: '2 - 4 hours', sub: 'Moderate flow' },
    { label: '4 - 6 hours', sub: 'Frequent pull' },
    { label: '6+ hours', sub: 'Heavy immersion' },
  ];

  const peakTimes = [
    'Morning waking (first 30m)',
    'Late afternoon fatigue',
    'In bed before sleeping',
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          Estimate your current daily screen time
        </h2>
        <p className="text-xs text-outline leading-relaxed">
          There is zero judgment here. Accurate baselines allow the quiet algorithm to formulate realistic tapering.
        </p>
      </div>

      {/* Usage selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {usageRanges.map((u) => {
          const isSelected = dailyUsage === u.label;
          return (
            <button
              key={u.label}
              type="button"
              onClick={() => onUsageChange(u.label)}
              className={`p-3 rounded-xl border text-center transition-all min-h-[56px] ${
                isSelected
                  ? 'border-secondary bg-secondary-container/25 text-primary font-bold shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-lowest dark:bg-surface-container hover:border-outline'
              }`}
            >
              <span className="text-xs sm:text-sm font-medium block text-on-surface">{u.label}</span>
              <span className="text-[10px] text-outline mt-0.5 block">{u.sub}</span>
            </button>
          );
        })}
      </div>

      {/* Peak vulnerability time */}
      <div className="p-4 rounded-xl bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/40 space-y-3">
        <label className="text-xs font-medium text-on-surface block">
          When is your attention most easily pulled?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {peakTimes.map((t) => {
            const isSelected = peakTime === t;
            return (
              <label
                key={t}
                onClick={() => onPeakTimeChange(t)}
                className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center gap-2 min-h-[44px] transition-colors ${
                  isSelected
                    ? 'border-secondary bg-secondary-container/15 font-medium text-primary dark:text-inverse-primary'
                    : 'border-outline-variant/30 hover:bg-surface-container-low'
                }`}
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline'
                  }`}
                >
                  {isSelected && <div className="w-1 h-1 rounded-full bg-white" />}
                </div>
                <span className="text-[11px] leading-tight">{t}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Context reflection banner */}
      <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/20 flex gap-3 text-xs text-on-surface-variant">
        <span className="material-symbols-outlined text-secondary shrink-0 text-[18px]">eco</span>
        <p className="text-[11px] leading-relaxed">
          At 4-6 daily hours, approximately 38 days per year are spent inside high-dopamine loops. Dopamine Reset gently returns 18 of those days to creative presence in Month 1.
        </p>
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
          disabled={!dailyUsage || !peakTime}
        >
          Next: Trigger Assessment
        </Button>
      </div>
    </div>
  );
};
