import React from 'react';
import { ScreenExposureChart } from './ScreenExposureChart';
import type { PlatformStat, TriggerStat, PeakWindowSegment } from '@/types/analytics';

interface AnalyticsHubProps {
  onAskCoach?: (prompt: string) => void;
}

export const AnalyticsHub: React.FC<AnalyticsHubProps> = ({ onAskCoach }) => {
  const triggers: TriggerStat[] = [
    { trigger: 'Boredom / In-between moments', percentage: 42, barClass: 'bg-primary-container dark:bg-primary-fixed-dim' },
    { trigger: 'Procrastination / Work friction', percentage: 28, barClass: 'bg-secondary dark:bg-secondary-fixed-dim' },
    { trigger: 'Auditory/Visual Notifications', percentage: 18, barClass: 'bg-outline' },
    { trigger: 'Acute Stress or Anxiety', percentage: 12, barClass: 'bg-tertiary-container dark:bg-tertiary-fixed-dim' },
  ];

  const heatmapSegments: PeakWindowSegment[] = [
    { period: 'Morning', durationLabel: '18m', bgClass: 'bg-surface-container-low dark:bg-surface-container', textClass: 'text-outline' },
    { period: 'Midday', durationLabel: '34m', bgClass: 'bg-surface-container-low dark:bg-surface-container', textClass: 'text-outline' },
    { period: 'Afternoon', durationLabel: '45m', bgClass: 'bg-surface-container-low dark:bg-surface-container', textClass: 'text-outline' },
    { period: 'Late Dusk', durationLabel: '52m', bgClass: 'bg-primary-fixed-dim/60 dark:bg-primary-container', textClass: 'text-on-primary-fixed-variant dark:text-inverse-primary font-medium' },
    { period: 'Peak 8-10', durationLabel: '1h 13m', isPeak: true, bgClass: 'bg-secondary-container text-on-secondary-container font-semibold', textClass: 'text-on-secondary-container' },
    { period: 'Night', durationLabel: '10m', bgClass: 'bg-surface-container-low dark:bg-surface-container', textClass: 'text-outline' },
  ];

  const platforms: PlatformStat[] = [
    { code: 'IG', name: 'Instagram', durationLabel: '1h 42m', percentage: 46, barClass: 'bg-primary dark:bg-inverse-primary' },
    { code: 'YT', name: 'YouTube', durationLabel: '1h 05m', percentage: 29, barClass: 'bg-secondary dark:bg-secondary-fixed-dim' },
    { code: 'WA', name: 'WhatsApp', durationLabel: '32m', percentage: 14, barClass: 'bg-outline' },
    { code: 'RD', name: 'Reddit', durationLabel: '23m', percentage: 11, barClass: 'bg-outline-variant' },
  ];

  return (
    <section className="space-y-8 animate-fadeIn" aria-label="Quiet Analytics Dashboard">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-medium text-on-surface">Quiet Analytics</h1>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary bg-secondary-container/40 dark:bg-tertiary-container px-2.5 py-0.5 rounded-full">
              <span className="material-symbols-outlined text-[12px]">verified</span>
              Verified Baseline
            </span>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant dark:text-outline mt-1">
            Reflective patterns without gamified pressure. Rooted in objective self-awareness.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onAskCoach && onAskCoach('Ask Coach about my 8PM-10PM peak usage trigger')}
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-primary-container text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed rounded-lg text-xs font-medium hover:opacity-90 transition-opacity min-h-[44px]"
          >
            <span className="material-symbols-outlined text-[16px]">psychology</span>
            <span>Ask Coach About This</span>
          </button>
          <div className="text-xs text-outline bg-surface-container-low dark:bg-surface px-3 py-2 rounded-lg border border-outline-variant/30">
            Past 7 Days
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid (Level 1 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Daily Usage */}
        <div className="p-5 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>Daily Usage</span>
            <span className="text-secondary flex items-center font-medium">↓ 18% vs last wk</span>
          </div>
          <div className="text-2xl font-medium text-on-surface">3h 42m</div>
          <div className="mt-3 w-full bg-surface-container-high dark:bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary-container dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
              style={{ width: '62%' }}
            />
          </div>
          <p className="text-[11px] text-outline mt-2">Paced beneath your daily ceiling (4h 30m)</p>
        </div>

        {/* Metric 2: Recovery Score */}
        <div className="p-5 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>Recovery Score</span>
            <span className="text-secondary flex items-center font-medium">+6 steady</span>
          </div>
          <div className="text-2xl font-medium text-on-surface">
            78<span className="text-sm text-outline font-normal"> / 100</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5">
            <div className="h-1.5 flex-1 rounded-full bg-primary-fixed dark:bg-secondary-fixed-dim" />
            <div className="h-1.5 flex-1 rounded-full bg-primary-fixed dark:bg-secondary-fixed-dim" />
            <div className="h-1.5 flex-1 rounded-full bg-primary-fixed dark:bg-secondary-fixed-dim" />
            <div className="h-1.5 flex-1 rounded-full bg-surface-container-high dark:bg-surface-container" />
          </div>
          <p className="text-[11px] text-outline mt-2">Mindful regulation & rest compliance</p>
        </div>

        {/* Metric 3: Mindful Streak */}
        <div className="p-5 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>Mindful Streak</span>
            <span className="text-outline">Day 18 of 30</span>
          </div>
          <div className="text-2xl font-medium text-on-surface">18 Days</div>
          <div className="mt-3 flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
            <span className="w-2.5 h-2.5 rounded-full bg-outline-variant/50" />
          </div>
          <p className="text-[11px] text-outline mt-2">No punishment or countdown anxiety</p>
        </div>

        {/* Metric 4: Goal Progress */}
        <div className="p-5 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <div className="flex items-center justify-between text-outline text-xs mb-2">
            <span>Goal Progress</span>
            <span className="text-secondary font-medium">On Track</span>
          </div>
          <div className="text-2xl font-medium text-on-surface">64%</div>
          <div className="mt-3 w-full bg-surface-container-high dark:bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-secondary h-full rounded-full transition-all duration-500"
              style={{ width: '64%' }}
            />
          </div>
          <p className="text-[11px] text-outline mt-2">Target: -30% evening screen reliance</p>
        </div>
      </div>

      {/* Bento Grid: Main Usage Chart & Triggers */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Usage Area Chart (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <ScreenExposureChart />
        </div>

        {/* Triggers Distribution & Time Heatmap (1 Col) */}
        <div className="space-y-6">
          {/* Common Triggers Card */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
            <h3 className="text-sm md:text-base font-medium text-on-surface">Reported Triggers</h3>
            <p className="text-xs text-outline mb-4">
              Underlying emotional drivers logged during reflex opens
            </p>
            <div className="space-y-3 text-xs">
              {triggers.map((item) => (
                <div key={item.trigger}>
                  <div className="flex justify-between mb-1">
                    <span className="text-on-surface">{item.trigger}</span>
                    <span className="font-medium text-primary dark:text-inverse-primary">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-high dark:bg-surface-container h-2 rounded-full overflow-hidden">
                    <div
                      className={`${item.barClass} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time-of-day Peak Exposure Mini-Heatmap */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-on-surface">Peak Friction Window</h3>
              <span className="text-[11px] text-error font-medium px-2 py-0.5 rounded bg-error-container/30">
                8:00 PM – 10:00 PM
              </span>
            </div>
            <p className="text-xs text-outline mb-3">
              Evening transition period accounts for 51% of aimless browsing.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 text-center text-[10px]">
              {heatmapSegments.map((seg) => (
                <div
                  key={seg.period}
                  className={`p-2 rounded ${seg.bgClass} ${seg.textClass} flex flex-col items-center justify-center`}
                >
                  <span>{seg.period}</span>
                  <span className="mt-0.5">{seg.durationLabel}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Breakdown & Recovery Activity Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Breakdown */}
        <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <h3 className="text-sm md:text-base font-medium text-on-surface mb-1">Platform Breakdown</h3>
          <p className="text-xs text-outline mb-4">Measured via zero-friction accessibility logs</p>
          <div className="space-y-4 text-xs">
            {platforms.map((p) => (
              <div key={p.code} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low dark:bg-surface-container flex items-center justify-center font-bold text-on-surface">
                  {p.code}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium text-on-surface">{p.name}</span>
                    <span>{p.durationLabel} ({p.percentage}%)</span>
                  </div>
                  <div className="w-full bg-surface-container-high dark:bg-surface-container h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`${p.barClass} h-full rounded-full transition-all duration-500`}
                      style={{ width: `${p.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recovery Activity Analysis */}
        <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <h3 className="text-sm md:text-base font-medium text-on-surface mb-1">
            Recovery Activity Analysis
          </h3>
          <p className="text-xs text-outline mb-4">Grounded habits logged during impulse pauses</p>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20">
              <div className="text-2xl font-medium text-secondary">12</div>
              <div className="text-xs font-medium text-on-surface mt-1">Phone-Free Sessions</div>
              <div className="text-[11px] text-outline mt-0.5">Avg 48 mins in nature / reading</div>
            </div>
            <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/20">
              <div className="text-2xl font-medium text-primary dark:text-inverse-primary">17</div>
              <div className="text-xs font-medium text-on-surface mt-1">Reflective Check-ins</div>
              <div className="text-[11px] text-outline mt-0.5">Pauses taken before app launch</div>
            </div>
          </div>
          <div className="mt-5 p-3.5 rounded-lg bg-secondary-container/20 dark:bg-tertiary-container/30 border border-secondary-container/40 flex items-start gap-3">
            <span className="material-symbols-outlined text-secondary text-lg mt-0.5">lightbulb</span>
            <div className="text-xs text-on-surface-variant dark:text-inverse-on-surface">
              <strong className="text-on-surface">Grounded Pattern Identified:</strong> Users who replace the
              8:00 PM Instagram check with 10 slow breaths reduce session duration by 42 minutes.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
