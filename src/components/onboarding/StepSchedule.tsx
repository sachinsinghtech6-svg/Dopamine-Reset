import React from 'react';
import { Button } from '../ui/Button';
import { Switch } from '../ui/Switch';

export interface StepScheduleProps {
  eveningTime: string;
  quietStart: string;
  quietEnd: string;
  weekendExtension: boolean;
  onEveningChange: (val: string) => void;
  onQuietStartChange: (val: string) => void;
  onQuietEndChange: (val: string) => void;
  onWeekendToggle: (val: boolean) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepSchedule: React.FC<StepScheduleProps> = ({
  eveningTime,
  quietStart,
  quietEnd,
  weekendExtension,
  onEveningChange,
  onQuietStartChange,
  onQuietEndChange,
  onWeekendToggle,
  onNext,
  onBack,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          Establish your daily quiet boundaries
        </h2>
        <p className="text-xs text-outline leading-relaxed">
          Scheduled sanctuaries during which Dopamine Reset silences all cognitive interruptions.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/40 space-y-5">
        {/* Evening reflection prompt */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-outline-variant/30">
          <div>
            <label className="text-xs font-medium text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">spa</span>
              <span>Daily 2-Minute Evening Reflection</span>
            </label>
            <p className="text-[11px] text-outline mt-0.5">
              Gentle prompt to record cognitive clarity before sleep.
            </p>
          </div>
          <input
            type="time"
            value={eveningTime}
            onChange={(e) => onEveningChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-outline-variant/50 bg-surface-container-low text-xs font-medium text-on-surface min-h-[44px]"
          />
        </div>

        {/* Quiet Window */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary text-[16px]">bedtime</span>
              <span>Digital Dusk & Dawn (Quiet Window)</span>
            </span>
            <span className="text-[11px] text-secondary font-medium">8.5 Hours Sanctuary</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-surface-container-low dark:bg-surface-container-highest rounded-xl border border-outline-variant/30">
              <span className="text-[10px] text-outline uppercase block font-medium">Sanctuary Begins</span>
              <input
                type="time"
                value={quietStart}
                onChange={(e) => onQuietStartChange(e.target.value)}
                className="mt-1 bg-transparent text-sm font-medium text-on-surface border-none p-0 focus:ring-0"
              />
              <span className="text-[10px] text-secondary mt-0.5 block">Screen softens to calm tone</span>
            </div>

            <div className="p-3 bg-surface-container-low dark:bg-surface-container-highest rounded-xl border border-outline-variant/30">
              <span className="text-[10px] text-outline uppercase block font-medium">Sanctuary Ends</span>
              <input
                type="time"
                value={quietEnd}
                onChange={(e) => onQuietEndChange(e.target.value)}
                className="mt-1 bg-transparent text-sm font-medium text-on-surface border-none p-0 focus:ring-0"
              />
              <span className="text-[10px] text-secondary mt-0.5 block">Gradual wake sequence</span>
            </div>
          </div>
        </div>

        {/* Weekend Extension Toggle */}
        <div className="pt-2 border-t border-outline-variant/30">
          <Switch
            label="Weekend gentle sleep extension (+60 min)"
            description="Softens schedule boundaries on Saturday and Sunday."
            checked={weekendExtension}
            onChange={onWeekendToggle}
          />
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
        >
          Next: Review Baseline
        </Button>
      </div>
    </div>
  );
};
