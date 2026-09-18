import React, { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';

export const CumulativeProofSection: React.FC = () => {
  const { beforeVsNow, proofCounters, saveWeeklyReflection } = useProgress();
  const [reflectionText, setReflectionText] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  const handleSaveReflection = async () => {
    if (!reflectionText.trim()) return;
    await saveWeeklyReflection(reflectionText);
    setSavedStatus(true);
    setTimeout(() => {
      setSavedStatus(false);
      setReflectionText('');
    }, 2500);
  };

  return (
    <section className="scroll-mt-24 space-y-6" id="milestones-reflections" aria-label="Cumulative Proof and Reflections">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-outline">
            Cumulative Proof
          </span>
          <h2 className="text-2xl font-medium text-primary dark:text-inverse-primary mt-1">
            When You Started vs. Now
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-outline">
            Objective comparisons of how your attention span and time have returned to you.
          </p>
        </div>
        <span className="text-xs text-outline bg-surface-container-low dark:bg-tertiary-container px-3 py-1.5 rounded-lg border border-outline-variant/30">
          Measured over 28 days
        </span>
      </div>

      {/* Before vs Now Comparison Card */}
      <div className="bg-surface-container-lowest dark:bg-surface p-6 sm:p-8 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
          {beforeVsNow.map((metric, index) => (
            <div
              key={metric.label}
              className={`pt-4 md:pt-0 space-y-3 ${
                index === 0 ? 'md:pr-6' : index === 1 ? 'md:px-6' : 'md:pl-6'
              }`}
            >
              <span className="text-xs font-medium text-outline uppercase tracking-wider">
                {metric.label}
              </span>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-outline block">Baseline</span>
                  <span className="text-lg text-on-surface-variant/80 dark:text-outline font-normal line-through">
                    {metric.baselineValue}
                  </span>
                </div>
                <span className="material-symbols-outlined text-secondary">arrow_forward</span>
                <div className="text-right">
                  <span className="text-xs text-secondary font-medium block">Current</span>
                  <span className="text-2xl font-medium text-primary dark:text-inverse-primary">
                    {metric.currentValue}
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded bg-secondary-container/30 dark:bg-tertiary-container/30 text-on-secondary-container dark:text-inverse-primary text-xs flex items-center gap-1.5 font-medium">
                <span className="material-symbols-outlined text-sm">{metric.icon}</span>
                <span>{metric.reclaimedBadge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Cumulative Proof Counter Bar */}
        <div className="pt-4 border-t border-outline-variant/30 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-surface-container-low dark:bg-surface-container rounded-lg">
            <div className="text-xl font-medium text-on-surface">{proofCounters.phoneFreeSessions}</div>
            <div className="text-[11px] text-on-surface-variant dark:text-outline mt-0.5">
              Phone-Free Sessions
            </div>
          </div>
          <div className="p-3 bg-surface-container-low dark:bg-surface-container rounded-lg">
            <div className="text-xl font-medium text-on-surface">{proofCounters.dailyCheckins}</div>
            <div className="text-[11px] text-on-surface-variant dark:text-outline mt-0.5">
              Daily Check-ins
            </div>
          </div>
          <div className="p-3 bg-surface-container-low dark:bg-surface-container rounded-lg">
            <div className="text-xl font-medium text-on-surface">{proofCounters.triggersMapped}</div>
            <div className="text-[11px] text-on-surface-variant dark:text-outline mt-0.5">
              Impulse Triggers Mapped
            </div>
          </div>
          <div className="p-3 bg-surface-container-low dark:bg-surface-container rounded-lg">
            <div className="text-xl font-medium text-on-surface">{proofCounters.reclaimedHours}</div>
            <div className="text-[11px] text-on-surface-variant dark:text-outline mt-0.5">
              Total Time Reclaimed
            </div>
          </div>
        </div>
      </div>

      {/* Qualitative Journal & Reflection Module */}
      <div className="bg-surface-container-lowest dark:bg-surface p-6 sm:p-8 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-4 shadow-xs">
        <div className="flex items-center gap-2 text-primary dark:text-inverse-primary text-xs font-medium uppercase tracking-wider">
          <span className="material-symbols-outlined text-base">edit_note</span>
          <span>Stage 2 Weekly Reflection Prompt</span>
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-on-surface">
            What feels different about your relationship with your phone?
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline">
            Write without judgment. Even noticing subtle irritability or fleeting stillness is valuable recovery data.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <textarea
            rows={3}
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="e.g. I notice I no longer check my lock screen automatically while waiting in elevator lines. It felt quiet rather than awkward..."
            className="w-full bg-surface-container-low dark:bg-surface-container border border-outline-variant/50 dark:border-outline/20 rounded-lg p-3.5 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary transition-colors resize-none"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-outline">
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>Encrypted on-device · Private to you</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-secondary font-medium">+15 XP upon saving</span>
              <button
                type="button"
                onClick={handleSaveReflection}
                disabled={!reflectionText.trim()}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container dark:bg-primary-fixed dark:text-on-primary-fixed text-surface text-xs font-medium transition-colors flex items-center gap-1.5 disabled:opacity-50 min-h-[44px]"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                <span>{savedStatus ? 'Saved Privately ✓' : 'Save to Journal'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
