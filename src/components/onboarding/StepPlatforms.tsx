import React from 'react';
import { Button } from '../ui/Button';

export interface StepPlatformsProps {
  selected: string[];
  onChange: (platforms: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepPlatforms: React.FC<StepPlatformsProps> = ({
  selected,
  onChange,
  onNext,
  onBack,
}) => {
  const platforms = [
    { name: 'Instagram', subtitle: 'Reels & Stories', icon: 'photo_camera' },
    { name: 'YouTube', subtitle: 'Shorts & Feeds', icon: 'smart_display' },
    { name: 'TikTok', subtitle: 'Infinite Loop', icon: 'music_note' },
    { name: 'X (Twitter)', subtitle: 'Realtime Stream', icon: 'tag' },
    { name: 'Reddit', subtitle: 'Community Feeds', icon: 'forum' },
    { name: 'News Aggregators', subtitle: 'Headlines & Tabs', icon: 'newspaper' },
  ];

  const togglePlatform = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((p) => p !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-xl mx-auto w-full">
      <div className="space-y-1">
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          Which channels fragment your attention?
        </h2>
        <p className="text-xs text-outline leading-relaxed">
          Select all applications you instinctively open during cognitive drift. Dopamine Reset helps de-intensify them.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {platforms.map((p) => {
          const isSelected = selected.includes(p.name);
          return (
            <button
              key={p.name}
              type="button"
              onClick={() => togglePlatform(p.name)}
              className={`p-3 rounded-xl border text-left transition-all min-h-[56px] flex items-center gap-2.5 ${
                isSelected
                  ? 'border-secondary bg-secondary-container/20 shadow-xs'
                  : 'border-outline-variant/40 bg-surface-container-lowest dark:bg-surface-container hover:border-outline'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[20px] shrink-0 ${
                  isSelected ? 'text-secondary' : 'text-outline'
                }`}
              >
                {p.icon}
              </span>
              <div className="overflow-hidden">
                <div className="text-xs font-medium text-on-surface truncate">{p.name}</div>
                <div className="text-[10px] text-outline truncate">{p.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-lg bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-xs text-on-surface-variant flex items-center gap-2.5">
        <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
        <span>
          Selected {selected.length} high-intensity target{selected.length === 1 ? '' : 's'} for gentle tapering.
        </span>
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
          disabled={selected.length === 0}
        >
          Next: Current Usage
        </Button>
      </div>
    </div>
  );
};
