import React from 'react';
import { Button } from '../ui/Button';

export interface StepGoalProps {
  value: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

export const StepGoal: React.FC<StepGoalProps> = ({ value, onChange, onNext }) => {
  const goals = [
    {
      id: 'focus',
      title: 'Improve Deep Focus & Attention Span',
      desc: 'Restore sustained cognitive flow for complex thinking and intentional creation.',
      icon: 'center_focus_strong',
    },
    {
      id: 'screentime',
      title: 'Reduce Compulsive Screen Time',
      desc: 'Taper daily phone usage by 40% using passive structural boundaries.',
      icon: 'timer',
    },
    {
      id: 'stress',
      title: 'Reduce Stress Scrolling & Micro-escapes',
      desc: 'Break involuntary phone grabs triggered by workplace or emotional strain.',
      icon: 'self_improvement',
    },
    {
      id: 'sleep',
      title: 'Improve Sleep Quality & Late Night Browsing',
      desc: 'Eliminate blue-light hyperarousal within 90 minutes of bedtime.',
      icon: 'bedtime',
    },
    {
      id: 'study',
      title: 'Study & Academic Productivity',
      desc: 'Build uninterrupted study sessions free from algorithmic notification loops.',
      icon: 'menu_book',
    },
    {
      id: 'presence',
      title: 'Real-World Social Presence',
      desc: 'Be attentively present with loved ones and physical life without vibration anxiety.',
      icon: 'groups',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          What brings you to Dopamine Reset?
        </h2>
        <p className="text-xs text-outline leading-relaxed">
          Select the primary intention anchoring your recovery journey. You can adjust this anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-2.5" role="radiogroup" aria-label="Recovery Goals">
        {goals.map((g) => {
          const isSelected = value === g.id;
          return (
            <div
              key={g.id}
              onClick={() => onChange(g.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 min-h-[44px] select-none ${
                isSelected
                  ? 'border-secondary bg-secondary-container/20 shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-lowest dark:bg-surface-container hover:border-outline'
              }`}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onChange(g.id);
                }
              }}
            >
              <div className="pt-0.5">
                <div
                  className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>

              <div className="flex-1 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[18px]">
                    {g.icon}
                  </span>
                  <span className="text-xs font-medium text-on-surface">{g.title}</span>
                </div>
                <p className="text-[11px] text-outline leading-relaxed pl-6">{g.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          variant="primary"
          size="md"
          onClick={onNext}
          icon="arrow_forward"
          iconPosition="end"
          disabled={!value}
        >
          Next: Target Vectors
        </Button>
      </div>
    </div>
  );
};
