import React from 'react';

export const LevelUpModal: React.FC = () => {
  return (
    <section className="scroll-mt-24 space-y-4 pt-4 border-t border-outline-variant/40" id="edge-states" aria-label="Edge States and Gentle Modals">
      <div className="space-y-1">
        <span className="text-xs font-medium uppercase tracking-widest text-outline">
          Design System Composure
        </span>
        <h3 className="text-base font-medium text-on-surface">
          Gentle Level-Up &amp; Pause Previews
        </h3>
        <p className="text-xs text-on-surface-variant dark:text-outline">
          Notice how milestones are celebrated: grounded mineral tones, dignified affirmations, zero confetti or flashing bells.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Gentle Milestone / Level Up Preview Card */}
        <div className="bg-surface-container-low dark:bg-surface-container p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-primary dark:text-inverse-primary tracking-wider">
              Level-Up Modal Preview
            </span>
            <span className="text-[10px] text-outline">Calm Sanctuary UX</span>
          </div>

          <div className="bg-surface-container-lowest dark:bg-surface p-4 rounded-lg border border-outline-variant/40 dark:border-outline/20 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container/60 dark:bg-tertiary-container text-secondary dark:text-inverse-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-base">spa</span>
            </div>
            <div>
              <div className="text-sm font-medium text-primary dark:text-inverse-primary">
                Level 8 — Resilient
              </div>
              <div className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
                You've built another continuous layer of cognitive space. (+260 XP verified)
              </div>
            </div>
            <p className="text-[11px] text-outline italic">
              "Restraint is not deprivation; it is the deliberate choice of clarity."
            </p>
          </div>
        </div>

        {/* Pause Day / Freeze State Card */}
        <div className="bg-surface-container-low dark:bg-surface-container p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase text-on-surface-variant dark:text-outline tracking-wider">
              Pause Protection Preview
            </span>
            <span className="text-[10px] text-outline">Guilt-Free Mechanics</span>
          </div>

          <div className="bg-surface-container-lowest dark:bg-surface p-4 rounded-lg border border-outline-variant/40 dark:border-outline/20 space-y-2.5">
            <div className="w-8 h-8 rounded-full bg-surface-container dark:bg-tertiary-container text-on-surface dark:text-inverse-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-base">ac_unit</span>
            </div>
            <div>
              <div className="text-sm font-medium text-on-surface">
                Streak Freeze Applied Gracefully
              </div>
              <div className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
                Yesterday was recorded as a rest day. Your 18-day cadence remains intact.
              </div>
            </div>
            <p className="text-[11px] text-outline italic">
              No streaks are broken by life events. Recovery is cumulative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
