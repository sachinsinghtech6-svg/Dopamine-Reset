import React from 'react';
import { useProgress } from '@/context/ProgressContext';

export const XPProgressionTrack: React.FC = () => {
  const {
    currentLevel,
    totalXp,
    nextLevelXp,
    xpNeeded,
    progressPercent,
    levels,
    xpRules,
    xpLedger,
  } = useProgress();

  const currentLevelInfo = levels.find((l) => l.level === currentLevel);
  const nextLevelInfo = levels.find((l) => l.level === currentLevel + 1);

  const tier1Levels = levels.filter((l) => l.tier === 1);
  const tier3Levels = levels.filter((l) => l.tier === 3);
  const tier4Levels = levels.filter((l) => l.tier === 4);

  return (
    <section className="scroll-mt-24 space-y-6" id="xp-level-track" aria-label="20-Level Progression and Verified XP">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-outline">
            Intrinsic Feedback Architecture
          </span>
          <h2 className="text-2xl font-medium text-primary dark:text-inverse-primary mt-1">
            20-Level Progression &amp; Verified XP
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-outline">
            Points reflect tangible presence in the physical world, never passive screen time.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-low dark:bg-tertiary-container border border-outline-variant/40 dark:border-outline/20 text-xs text-on-surface-variant dark:text-inverse-primary">
          <span className="material-symbols-outlined text-sm text-primary dark:text-inverse-primary">
            info
          </span>
          <span>Zero XP rewarded for screen retention</span>
        </div>
      </div>

      {/* XP Verification Banner */}
      <div className="bg-surface-container-low dark:bg-surface-container border border-outline-variant/40 dark:border-outline/20 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary text-surface dark:bg-primary-fixed dark:text-on-primary-fixed flex items-center justify-center font-medium text-lg shrink-0">
            {currentLevel}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-on-surface">
                Level {currentLevel}: {currentLevelInfo?.title || 'Focused'}
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary-container/60 dark:bg-tertiary-container text-on-secondary-container dark:text-inverse-primary font-medium">
                {currentLevelInfo?.tierName || 'Tier II'}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
              {totalXp.toLocaleString()} Total XP Earned · Next milestone:{' '}
              <strong className="font-medium text-on-surface">
                Level {nextLevelInfo?.level} ({nextLevelInfo?.title})
              </strong>{' '}
              at {nextLevelXp.toLocaleString()} XP
            </p>
          </div>
        </div>

        <div className="w-full md:w-64 space-y-1.5">
          <div className="flex justify-between text-xs text-on-surface-variant dark:text-outline">
            <span>Progress to Level {nextLevelInfo?.level}</span>
            <span className="font-medium text-primary dark:text-inverse-primary">
              {xpNeeded} XP Needed
            </span>
          </div>
          <div className="w-full bg-surface-container-highest dark:bg-surface-container rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-primary-container dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 20-Level Horizontal Scrollable Track */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-outline px-1">
          <span className="font-medium uppercase tracking-wider text-[11px] text-outline">
            The 20 Mindful Milestones
          </span>
          <span className="text-outline">Scroll horizontally to explore tiers</span>
        </div>

        <div className="overflow-x-auto pb-4 pt-1 custom-scrollbar">
          <div className="flex items-center gap-3 min-w-[1280px]">
            {/* Tier 1 (Levels 1 - 5) */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/40 dark:border-outline/20">
              {tier1Levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="w-24 p-2.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-center space-y-1 opacity-90"
                >
                  <span className="text-[10px] text-outline uppercase font-medium">
                    Lvl {lvl.level}
                  </span>
                  <div className="text-xs font-medium text-on-surface truncate">{lvl.title}</div>
                  <div className="text-[10px] text-secondary font-medium">
                    {lvl.requiredXp} XP ✓
                  </div>
                </div>
              ))}
            </div>

            {/* Tier 2 (Levels 6 - 10) Active Zone */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest dark:bg-surface border-2 border-primary/40 dark:border-inverse-primary/40">
              {/* Level 6 */}
              <div className="w-24 p-2.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-center space-y-1">
                <span className="text-[10px] text-outline uppercase font-medium">Lvl 6</span>
                <div className="text-xs font-medium text-on-surface truncate">Control</div>
                <div className="text-[10px] text-secondary font-medium">1,050 XP ✓</div>
              </div>

              {/* Level 7 (Active Focus) */}
              <div className="w-28 p-2.5 rounded-lg bg-primary text-surface dark:bg-primary-fixed dark:text-on-primary-fixed text-center space-y-1 ring-2 ring-primary/20 shadow-sm">
                <div className="flex justify-between items-center text-[10px] opacity-80 uppercase">
                  <span>Current</span>
                  <span className="font-bold">Lvl 7</span>
                </div>
                <div className="text-xs font-medium truncate">Focused</div>
                <div className="text-[10px] font-medium opacity-90">{totalXp} XP</div>
              </div>

              {/* Level 8 (Target) */}
              <div className="w-28 p-2.5 rounded-lg bg-surface-container-lowest dark:bg-surface border border-dashed border-primary dark:border-inverse-primary text-center space-y-1">
                <div className="flex justify-between items-center text-[10px] text-primary dark:text-inverse-primary uppercase">
                  <span>Target</span>
                  <span>Lvl 8</span>
                </div>
                <div className="text-xs font-medium text-primary dark:text-inverse-primary truncate">
                  Resilient
                </div>
                <div className="text-[10px] text-outline">1,500 XP</div>
              </div>

              {/* Level 9 */}
              <div className="w-24 p-2.5 rounded-lg bg-surface-container-low/60 dark:bg-surface-container text-center space-y-1 opacity-70">
                <span className="text-[10px] text-outline uppercase font-medium">Lvl 9</span>
                <div className="text-xs font-medium text-on-surface truncate">Balanced</div>
                <div className="text-[10px] text-outline">1,800 XP</div>
              </div>

              {/* Level 10 */}
              <div className="w-24 p-2.5 rounded-lg bg-surface-container-low/60 dark:bg-surface-container text-center space-y-1 opacity-70">
                <span className="text-[10px] text-outline uppercase font-medium">Lvl 10</span>
                <div className="text-xs font-medium text-on-surface truncate">Strong Habits</div>
                <div className="text-[10px] text-outline">2,150 XP</div>
              </div>
            </div>

            {/* Tier 3 (Levels 11 - 15) Upcoming */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest/60 dark:bg-surface border border-outline-variant/30 dark:border-outline/20 opacity-70">
              {tier3Levels.map((lvl) => (
                <div
                  key={lvl.level}
                  className="w-24 p-2.5 rounded-lg bg-surface-container-low/50 dark:bg-surface-container text-center space-y-1"
                >
                  <span className="text-[10px] text-outline uppercase font-medium">
                    Lvl {lvl.level}
                  </span>
                  <div className="text-xs font-medium text-outline truncate">{lvl.title}</div>
                  <div className="text-[10px] text-outline">{lvl.requiredXp} XP</div>
                </div>
              ))}
            </div>

            {/* Tier 4 (Levels 16 - 20) Independence */}
            <div className="flex items-center gap-2 p-2 rounded-xl bg-surface-container-lowest/50 dark:bg-surface border border-outline-variant/30 dark:border-outline/20 opacity-60">
              {tier4Levels.slice(0, 4).map((lvl) => (
                <div
                  key={lvl.level}
                  className="w-24 p-2.5 rounded-lg bg-surface-container-low/40 dark:bg-surface-container text-center space-y-1"
                >
                  <span className="text-[10px] text-outline uppercase font-medium">
                    Lvl {lvl.level}
                  </span>
                  <div className="text-xs font-medium text-outline truncate">{lvl.title}</div>
                  <div className="text-[10px] text-outline">{lvl.requiredXp} XP</div>
                </div>
              ))}

              {/* Level 20 Final */}
              <div className="w-28 p-2.5 rounded-lg bg-surface-container-high dark:bg-tertiary-container text-center space-y-1">
                <span className="text-[10px] text-primary dark:text-inverse-primary uppercase font-bold">
                  Lvl 20 Final
                </span>
                <div className="text-xs font-medium text-primary dark:text-inverse-primary truncate">
                  Independent Attn
                </div>
                <div className="text-[10px] text-outline">8,000 XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* XP Rules & Recent Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* XP Source Rules */}
        <div className="md:col-span-5 bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-4 shadow-xs">
          <h4 className="text-xs font-medium text-outline uppercase tracking-wider">
            How You Earn XP
          </h4>
          <div className="space-y-2.5 text-xs sm:text-sm">
            {xpRules.map((rule) => (
              <div
                key={rule.action}
                className="flex items-center justify-between py-2 border-b border-outline-variant/20"
              >
                <span className="text-on-surface">{rule.action}</span>
                <span className="font-medium text-primary dark:text-inverse-primary bg-surface-container-low dark:bg-tertiary-container px-2 py-0.5 rounded">
                  +{rule.xp} XP
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-outline italic leading-relaxed">
            "We deliberately avoid micro-rewards for simple screen taps. Progress is tethered to actual real-world behavioral changes."
          </p>
        </div>

        {/* Recent Actions Ledger */}
        <div className="md:col-span-7 bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-medium text-outline uppercase tracking-wider">
              Recent Recovery Actions
            </h4>
            <span className="text-xs text-outline">Last 48 Hours</span>
          </div>

          <div className="space-y-2 text-xs sm:text-sm">
            {xpLedger.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low/50 dark:bg-surface-container border border-outline-variant/20"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-base">
                    {item.icon}
                  </span>
                  <div>
                    <div className="font-medium text-on-surface">{item.description}</div>
                    <div className="text-[11px] text-outline">{item.timestamp}</div>
                  </div>
                </div>
                <span className="font-medium text-primary dark:text-inverse-primary">
                  +{item.xp} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
