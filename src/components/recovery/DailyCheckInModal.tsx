import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useRecovery } from '@/context/RecoveryContext';
import type { MoodType, EnergyType, UrgeLevel } from '@/types/recovery';

export interface DailyCheckInModalProps {
  onClose: () => void;
  onCompleted?: () => void;
}

export const DailyCheckInModal: React.FC<DailyCheckInModalProps> = ({ onClose }) => {
  const { submitCheckIn, submitting, todayCheckIn } = useRecovery();

  const [mood, setMood] = useState<MoodType>(todayCheckIn?.mood || 'good');
  const [energy, setEnergy] = useState<EnergyType>(todayCheckIn?.energy || 'medium');
  const [urge, setUrge] = useState<UrgeLevel>((todayCheckIn?.urge_intensity as UrgeLevel) || 3);
  const [triggers, setTriggers] = useState<string[]>(
    todayCheckIn?.triggers_today || ['Work Stress / Burnout', 'Fatigue / Late Night']
  );
  const [intention, setIntention] = useState<string>(
    todayCheckIn?.intention_note || ''
  );

  const moodOptions: { value: MoodType; emoji: string; label: string }[] = [
    { value: 'great', emoji: '🌿', label: 'Great' },
    { value: 'good', emoji: '🌱', label: 'Good' },
    { value: 'okay', emoji: '⛅', label: 'Okay' },
    { value: 'low', emoji: '🍂', label: 'Low' },
    { value: 'difficult', emoji: '🌧️', label: 'Difficult' },
  ];

  const energyOptions: { value: EnergyType; title: string; sub: string }[] = [
    { value: 'high', title: 'High Vitality', sub: 'Ready for friction' },
    { value: 'medium', title: 'Balanced / Steady', sub: 'Normal pacing' },
    { value: 'low', title: 'Depleted', sub: 'Gentle protections' },
  ];

  const triggerOptions = [
    'Work Stress / Burnout',
    'Boredom / Waiting',
    'Fatigue / Late Night',
    'Anxiety / News FOMO',
    'Procrastination',
  ];

  const urgeLabels: Record<number, string> = {
    1: 'Very Low',
    2: 'Mild',
    3: 'Moderate (3/5)',
    4: 'Elevated',
    5: 'Intense',
  };

  const toggleTrigger = (name: string) => {
    if (triggers.includes(name)) {
      setTriggers(triggers.filter((t) => t !== name));
    } else {
      setTriggers([...triggers, name]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCheckIn({
      mood,
      energy,
      urge_intensity: urge,
      triggers_today: triggers,
      intention_note: intention.trim() || 'Leave phone in another room while pausing.',
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-4">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-4">
        <div>
          <span className="text-xs font-medium text-secondary">Step 1 of 2</span>
          <h2 className="text-xl font-medium text-on-surface">Daily Mindset Check-in</h2>
          <p className="text-xs text-outline mt-0.5">
            Non-judgmental assessment of your current cognitive state.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-surface-container text-outline hover:text-on-surface min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
          aria-label="Close Check-in"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
      </div>

      <Card elevated className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selector */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-on-surface block">
              How is your mental baseline today?
            </label>
            <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Mood options">
              {moodOptions.map((opt) => {
                const isSelected = mood === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setMood(opt.value)}
                    className={`p-3 text-center rounded-xl border transition-all min-h-[64px] flex flex-col items-center justify-center ${
                      isSelected
                        ? 'border-secondary bg-secondary-container/30 shadow-xs'
                        : 'border-outline-variant/40 bg-surface-container-low/50 hover:bg-surface-container-low'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <div className="text-xl mb-1">{opt.emoji}</div>
                    <span className="text-xs font-medium text-on-surface">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Energy Level */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-on-surface block">
              Available Cognitive Energy
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" role="radiogroup" aria-label="Energy levels">
              {energyOptions.map((opt) => {
                const isSelected = energy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setEnergy(opt.value)}
                    className={`p-3 text-center rounded-xl border transition-all min-h-[56px] ${
                      isSelected
                        ? 'border-primary bg-surface-container-high dark:bg-tertiary-container/60 shadow-xs'
                        : 'border-outline-variant/40 hover:bg-surface-container-low'
                    }`}
                    role="radio"
                    aria-checked={isSelected}
                  >
                    <span className="text-xs font-medium text-on-surface block">{opt.title}</span>
                    <span className="text-[11px] text-outline mt-0.5 block">{opt.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scroll Urge Scale */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-medium text-on-surface">Subconscious Scroll Urge Intensity</label>
              <span className="text-secondary font-medium">{urgeLabels[urge]}</span>
            </div>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={urge}
              onChange={(e) => setUrge(Number(e.target.value) as UrgeLevel)}
              className="w-full accent-primary h-2 bg-surface-container rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-outline">
              <span>Grounding (No pull)</span>
              <span>Compulsive loop felt</span>
            </div>
          </div>

          {/* Trigger Influences Today */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-on-surface block">
              Triggers present today (select all that apply):
            </label>
            <div className="flex flex-wrap gap-2">
              {triggerOptions.map((t) => {
                const isSelected = triggers.includes(t);
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTrigger(t)}
                    className={`px-3 py-1.5 rounded-lg border text-xs min-h-[36px] transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary border-primary font-medium'
                        : 'border-outline-variant/40 text-on-surface-variant hover:border-outline'
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spontaneous Intention Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-on-surface block">
              One non-digital intention for this afternoon:
            </label>
            <textarea
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              placeholder="e.g. Leave phone on the kitchen counter while brewing coffee and looking out the window."
              rows={2}
              className="w-full bg-surface-container-low border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl text-xs p-3 text-on-surface placeholder:text-outline resize-none"
            />
          </div>

          {/* Submit & Cancel */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              loading={submitting}
              icon="arrow_forward"
              iconPosition="end"
            >
              Complete Check-in
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
