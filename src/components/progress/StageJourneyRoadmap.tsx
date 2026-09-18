import React from 'react';
import { useProgress } from '@/context/ProgressContext';

export const StageJourneyRoadmap: React.FC = () => {
  const { stages, logInterceptReflection } = useProgress();

  const stage1 = stages.find((s) => s.id === 1);
  const stage2 = stages.find((s) => s.id === 2);
  const stage3 = stages.find((s) => s.id === 3);
  const stage4 = stages.find((s) => s.id === 4);
  const stage5 = stages.find((s) => s.id === 5);

  return (
    <section className="scroll-mt-24 space-y-6" id="stages-section" aria-label="The 5 Recovery Stages">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-outline">
            Framework &amp; Milestones
          </span>
          <h2 className="text-2xl font-medium text-primary dark:text-inverse-primary mt-1">
            The 5 Recovery Stages
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-outline">
            A deliberate progression from reflexive reacting to complete digital autonomy.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-on-surface-variant dark:text-outline">Stage Completion Rule:</span>
          <span className="text-xs font-medium text-primary dark:text-inverse-primary bg-surface-container-low dark:bg-tertiary-container px-2.5 py-1 rounded-md">
            100% Verified Self-Pacing
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Vertical Roadmap */}
        <div className="lg:col-span-7 space-y-4 relative">
          {/* Continuous Hairline Connector Line */}
          <div className="absolute left-6 top-8 bottom-8 w-[1px] bg-outline-variant/60 dark:bg-outline/30 -z-0" />

          {/* Stage 1 (Completed) */}
          <div className="relative z-10 bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 flex gap-4 transition-all shadow-xs">
            <div className="w-10 h-10 rounded-full bg-secondary-container/60 dark:bg-tertiary-container border border-secondary/30 flex items-center justify-center shrink-0 text-secondary dark:text-inverse-primary">
              <span className="material-symbols-outlined text-lg">check</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tracking-wide uppercase text-secondary dark:text-inverse-primary">
                  Stage 1 · Completed
                </span>
                <span className="text-xs text-outline">{stage1?.verifiedAgo || 'Verified 14d ago'}</span>
              </div>
              <h3 className="text-base font-medium text-on-surface">{stage1?.name || 'Awareness'}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                {stage1?.description}
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-secondary font-medium">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">done_all</span>
                  Baseline audit complete
                </span>
                <span>·</span>
                <span className="text-outline">100% Verified</span>
              </div>
            </div>
          </div>

          {/* Stage 2 (Current Active Focus) */}
          <div className="relative z-10 bg-surface-container-lowest dark:bg-surface p-6 rounded-xl border-2 border-primary/30 dark:border-inverse-primary/30 shadow-sm space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-container dark:bg-primary text-on-primary-container dark:text-on-primary flex items-center justify-center shrink-0 ring-4 ring-primary-container/20">
                <span className="material-symbols-outlined text-lg">fiber_manual_record</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wide uppercase text-primary dark:text-inverse-primary">
                    Stage 2 · Current Stage
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-primary-container/10 dark:bg-tertiary-container text-primary dark:text-inverse-primary">
                    {stage2?.completionPercent || 64}% Completed
                  </span>
                </div>
                <h3 className="text-lg font-medium text-primary dark:text-inverse-primary mt-0.5">
                  {stage2?.name || 'Awareness & Control'}
                </h3>
                <p className="text-sm text-on-surface-variant dark:text-outline mt-1 leading-relaxed">
                  {stage2?.description}
                </p>
              </div>
            </div>

            {/* Stage Requirements Checklist */}
            <div className="bg-surface-container-low dark:bg-surface-container p-4 rounded-lg space-y-3">
              <div className="text-xs font-medium uppercase tracking-wider text-outline flex justify-between">
                <span>Stage Advancement Checklist</span>
                <span className="text-primary dark:text-inverse-primary font-medium">3 of 4 Ready</span>
              </div>
              <div className="space-y-2 text-xs sm:text-sm">
                {stage2?.checklist?.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-2 rounded bg-surface-container-lowest dark:bg-surface border border-outline-variant/40 dark:border-outline/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`material-symbols-outlined text-base ${
                          item.isComplete
                            ? 'text-primary dark:text-inverse-primary'
                            : item.current > 0
                            ? 'text-secondary'
                            : 'text-outline'
                        }`}
                      >
                        {item.isComplete ? 'check_circle' : item.current > 0 ? 'pending' : 'radio_button_unchecked'}
                      </span>
                      <span className={item.isComplete ? 'text-on-surface font-medium' : 'text-on-surface-variant dark:text-outline'}>
                        {item.label}
                      </span>
                    </div>
                    <span
                      className={`text-xs ${
                        item.isComplete
                          ? 'font-medium text-primary dark:text-inverse-primary'
                          : 'text-outline'
                      }`}
                    >
                      {item.isComplete
                        ? `${item.target} / ${item.target} ${item.unit} ✓`
                        : `${item.current} / ${item.target} ${item.unit} (${item.statusNote})`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-1 gap-3">
              <span className="text-xs text-on-surface-variant dark:text-outline">
                Estimated stage completion: ~4 days at present pace
              </span>
              <button
                type="button"
                onClick={logInterceptReflection}
                className="w-full sm:w-auto px-4 py-2 rounded-lg bg-primary-container hover:bg-primary dark:bg-primary-fixed dark:text-on-primary-fixed text-surface font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Continue Stage Actions</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Stage 3 (Locked Next) */}
          <div className="relative z-10 bg-surface-container-lowest/70 dark:bg-surface/70 p-5 rounded-xl border border-outline-variant/30 dark:border-outline/20 flex gap-4 opacity-85">
            <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-tertiary-container text-outline flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase text-outline">Stage 3 · Up Next</span>
                <span className="text-xs text-outline">Unlocks at Level 8</span>
              </div>
              <h3 className="text-base font-medium text-on-surface">{stage3?.name || 'Focus Building'}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                {stage3?.description}
              </p>
            </div>
          </div>

          {/* Stage 4 (Locked) */}
          <div className="relative z-10 bg-surface-container-lowest/60 dark:bg-surface/60 p-5 rounded-xl border border-outline-variant/30 dark:border-outline/20 flex gap-4 opacity-75">
            <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-tertiary-container text-outline flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">lock</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase text-outline">Stage 4 · Upcoming</span>
              </div>
              <h3 className="text-base font-medium text-on-surface">{stage4?.name || 'Healthy Digital Habits'}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                {stage4?.description}
              </p>
            </div>
          </div>

          {/* Stage 5 (Ultimate Destination) */}
          <div className="relative z-10 bg-surface-container-lowest/60 dark:bg-surface/60 p-5 rounded-xl border border-outline-variant/30 dark:border-outline/20 flex gap-4 opacity-70">
            <div className="w-10 h-10 rounded-full bg-surface-container dark:bg-tertiary-container text-outline flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-base">eco</span>
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase text-outline">
                  Stage 5 · Ultimate Destination
                </span>
                <span className="text-xs text-secondary font-medium">Autonomy</span>
              </div>
              <h3 className="text-base font-medium text-on-surface">{stage5?.name || 'Independence'}</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                {stage5?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Philosophy & Today's Stage Action Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-surface-container-low dark:bg-surface-container p-6 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-4">
            <div className="flex items-center gap-2 text-primary dark:text-inverse-primary text-xs font-medium uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">psychology</span>
              <span>Stage 2 Deep Dive</span>
            </div>
            <h4 className="text-lg font-medium text-on-surface">The 5-Second Friction Window</h4>
            <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
              When muscle memory drives your thumb toward high-stimulus apps, the neural trigger fires
              before executive control wakes up. In Stage 2, your only goal is introducing breath into that gap.
            </p>

            <div className="bg-surface-container-lowest dark:bg-surface p-4 rounded-lg border border-outline-variant/40 dark:border-outline/20 space-y-2.5">
              <span className="text-xs font-medium text-on-surface block">Recommended Ritual Today:</span>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-lg mt-0.5">
                  hourglass_empty
                </span>
                <div className="text-xs sm:text-sm text-on-surface-variant dark:text-outline">
                  <span className="font-medium text-on-surface">One Conscious Intercept</span>
                  <p className="text-xs text-outline mt-0.5">
                    When feeling the impulse to unlock, take three cycles of breath before entering your passcode.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={logInterceptReflection}
                className="w-full py-2.5 px-4 rounded-lg bg-surface-container-highest dark:bg-tertiary-container hover:bg-outline-variant/40 text-on-surface dark:text-inverse-primary text-xs font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span className="material-symbols-outlined text-sm">edit_note</span>
                <span>Log an Intercept Reflection (+15 XP)</span>
              </button>
            </div>
          </div>

          {/* Non-Punitive Commitment Guarantee */}
          <div className="p-5 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/40 dark:border-outline/20 space-y-2 shadow-xs">
            <div className="flex items-center gap-2 text-secondary text-xs font-medium">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span>Non-Punitive Recovery Guarantee</span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-outline leading-relaxed">
              You will never be demoted a stage or docked XP for taking breaks. Life has natural fluctuations;
              your progress is cumulative and permanent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
