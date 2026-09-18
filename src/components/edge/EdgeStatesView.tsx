import React, { useState } from 'react';

export const EdgeStatesView: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [showBaselineExplainer, setShowBaselineExplainer] = useState<boolean>(false);

  return (
    <section className="space-y-8 animate-fadeIn" aria-label="Responsive Viewports and Edge States">
      <div>
        <h1 className="text-xl md:text-2xl font-medium text-on-surface">
          Responsive Viewports &amp; Edge States
        </h1>
        <p className="text-xs md:text-sm text-on-surface-variant dark:text-outline mt-1">
          Verification of calm visual degradation across constrained form factors and incomplete telemetry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* MOBILE VIEWPORT PREVIEW (Simulated Frame) */}
        <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-medium text-on-surface">
                Mobile 375px Single-Column Shell
              </h3>
              <p className="text-xs text-outline">Bottom navigation active; top-bar simplified</p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container-high dark:bg-tertiary-container text-outline">
              Viewport: Mobile
            </span>
          </div>

          {/* Mobile Mockup Frame */}
          <div className="mx-auto max-w-[340px] rounded-2xl border-2 border-outline-variant/40 dark:border-outline/20 bg-background overflow-hidden flex flex-col h-[520px] shadow-sm">
            {/* Mobile Mini Header */}
            <div className="px-4 py-3 bg-surface-container-lowest dark:bg-surface border-b border-outline-variant/20 flex items-center justify-between">
              <span className="font-medium text-xs text-primary dark:text-inverse-primary">
                Dopamine Reset
              </span>
              <span className="material-symbols-outlined text-[16px] text-outline">dark_mode</span>
            </div>

            {/* Mobile Scrollable Body */}
            <div className="flex-1 p-3 space-y-3 overflow-y-auto text-xs">
              <div className="p-3 rounded-lg bg-surface-container-lowest dark:bg-surface border border-outline-variant/20">
                <div className="text-[11px] text-outline">Daily Screen Time</div>
                <div className="text-lg font-medium text-on-surface">3h 42m</div>
                <div className="text-[10px] text-secondary">↓ 18% vs past week</div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-lowest dark:bg-surface border border-outline-variant/20">
                <div className="text-[11px] text-outline">Intention Note</div>
                <p className="text-[11px] text-on-surface-variant dark:text-outline mt-1">
                  "Stepping out into evening cold before phone check."
                </p>
              </div>

              <div className="p-3 rounded-lg bg-secondary-container/20 border border-secondary-container/30 text-[11px] text-on-surface">
                <strong className="text-secondary dark:text-inverse-primary">Coach:</strong> "Remember that 5-minute pause tonight."
              </div>
            </div>

            {/* Mobile Bottom Nav Shell */}
            <div className="px-4 py-2 bg-surface-container-lowest dark:bg-surface border-t border-outline-variant/30 flex justify-between items-center text-outline">
              <div className="flex flex-col items-center text-primary dark:text-inverse-primary">
                <span className="material-symbols-outlined text-[18px]">monitoring</span>
                <span className="text-[9px] mt-0.5">Stats</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px]">self_improvement</span>
                <span className="text-[9px] mt-0.5">Journal</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
                <span className="text-[9px] mt-0.5">Coach</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="material-symbols-outlined text-[18px]">settings</span>
                <span className="text-[9px] mt-0.5">Settings</span>
              </div>
            </div>
          </div>
        </div>

        {/* EDGE STATES: EMPTY & LOADING & ERROR */}
        <div className="space-y-6">
          {/* Empty State */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs text-center">
            <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-tertiary-container mx-auto flex items-center justify-center text-outline mb-3">
              <span className="material-symbols-outlined text-2xl">eco</span>
            </div>
            <h3 className="text-sm font-medium text-on-surface">Your patterns are still forming</h3>
            <p className="text-xs text-outline max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
              We need 48 hours of continuous, quiet observation to generate objective reflection cards
              without jumping to hasty assumptions.
            </p>
            <button
              type="button"
              onClick={() => setShowBaselineExplainer(!showBaselineExplainer)}
              className="px-4 py-1.5 rounded-lg bg-surface-container-high dark:bg-tertiary-container text-on-surface dark:text-inverse-primary text-xs font-medium hover:bg-surface-container-highest transition-colors min-h-[44px]"
            >
              {showBaselineExplainer ? 'Hide Details' : 'Learn About Baseline Days'}
            </button>
            {showBaselineExplainer && (
              <div className="mt-3 text-xs text-on-surface-variant dark:text-outline p-3 rounded-lg bg-surface-container-low dark:bg-surface-container text-left animate-fadeIn">
                During the baseline window, the app does not lock apps or interrupt your reflexes. It simply observes the natural distribution of your focus hours to personalize recovery thresholds.
              </div>
            )}
          </div>

          {/* Loading Shimmer Skeleton */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs space-y-3">
            <div className="flex items-center justify-between text-xs text-outline mb-1">
              <span>Telemetry Ingestion</span>
              <span className="animate-pulse text-secondary">Synthesizing...</span>
            </div>
            <div className="h-5 w-1/3 bg-surface-container-high dark:bg-tertiary-container rounded animate-pulse" />
            <div className="h-20 w-full bg-surface-container-low dark:bg-surface-container rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="h-3 w-1/4 bg-surface-container-high dark:bg-tertiary-container rounded animate-pulse" />
              <div className="h-3 w-1/4 bg-surface-container-high dark:bg-tertiary-container rounded animate-pulse" />
            </div>
          </div>

          {/* Error Recovery Fallback */}
          <div className="p-5 rounded-xl bg-error-container/20 border border-error-container text-xs flex items-start gap-3">
            <span className="material-symbols-outlined text-error text-lg mt-0.5 shrink-0">
              {permissionGranted ? 'check_circle' : 'report_problem'}
            </span>
            <div className="space-y-1">
              <div className="font-medium text-on-surface">
                {permissionGranted
                  ? 'Screen Recording Accessibility Permission Active'
                  : 'Screen Recording Accessibility Permission Revoked'}
              </div>
              <p className="text-on-surface-variant dark:text-outline">
                {permissionGranted
                  ? 'Telemetry is actively measuring evening transition boundaries locally.'
                  : 'We cannot calculate evening triggers without local OS read permission. Your data remains stored exclusively on your disk.'}
              </p>
              {!permissionGranted ? (
                <button
                  type="button"
                  onClick={() => setPermissionGranted(true)}
                  className="text-primary dark:text-inverse-primary font-medium hover:underline pt-1 inline-block min-h-[36px]"
                >
                  Re-grant System Permission
                </button>
              ) : (
                <span className="text-secondary font-medium inline-block pt-1">
                  ✓ System Connected
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
