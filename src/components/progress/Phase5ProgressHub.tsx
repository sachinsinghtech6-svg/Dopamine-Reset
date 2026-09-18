import React, { useState } from 'react';
import { ProgressProvider, useProgress } from '@/context/ProgressContext';
import { StageJourneyRoadmap } from './StageJourneyRoadmap';
import { XPProgressionTrack } from './XPProgressionTrack';
import { BadgesGrid } from './BadgesGrid';
import { ChallengesSection } from './ChallengesSection';
import { CumulativeProofSection } from './CumulativeProofSection';
import { LevelUpModal } from './LevelUpModal';
import type { Phase5SectionId } from '@/types/progress';

const Phase5ProgressContent: React.FC = () => {
  const {
    currentLevel,
    totalXp,
    nextLevelXp,
    mindfulStreakDays,
    freezesBanked,
    attentionScore,
  } = useProgress();

  const [activeSection, setActiveSection] = useState<Phase5SectionId>('stages-section');

  const scrollToSection = (sectionId: Phase5SectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navAnchors: { id: Phase5SectionId; label: string; number: string }[] = [
    { id: 'stages-section', label: 'Recovery Journey & Stages', number: '1.' },
    { id: 'xp-level-track', label: 'XP, 20-Level Track & Badges', number: '2.' },
    { id: 'challenges-section', label: 'Challenges & Active Rituals', number: '3.' },
    { id: 'milestones-reflections', label: 'Milestones, Before vs Now & Reflections', number: '4.' },
    { id: 'edge-states', label: 'Edge States & Gentle Check', number: '5.' },
  ];

  return (
    <div className="w-full space-y-10 animate-fadeIn">
      {/* Anchor Sub-Navigation Header matching Stitch Phase 5 */}
      <div className="p-2.5 px-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-inverse-primary font-semibold tracking-wide uppercase text-[10px]">
            Phase 5
          </span>
          <span className="font-medium text-on-surface">Recovery Track &amp; Growth</span>
        </div>

        {/* Anchor Links */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar max-w-full pb-1">
          {navAnchors.map((anchor) => {
            const isActive = activeSection === anchor.id;
            return (
              <button
                key={anchor.id}
                type="button"
                onClick={() => scrollToSection(anchor.id)}
                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                  isActive
                    ? 'bg-surface-container-lowest dark:bg-tertiary-container text-primary dark:text-inverse-primary shadow-xs'
                    : 'text-on-surface-variant dark:text-outline hover:text-on-surface'
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-inverse-primary" />}
                <span>
                  {anchor.number} {anchor.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero / Progress Header Section */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 dark:bg-tertiary-container/50 text-on-secondary-container dark:text-inverse-primary text-xs font-medium tracking-wide">
            <span className="material-symbols-outlined text-sm">spa</span>
            ATTENTION RESTORATION PROGRAM
          </div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-primary dark:text-inverse-primary">
            Your Recovery Journey
          </h1>
          <p className="text-base text-on-surface-variant dark:text-outline leading-relaxed">
            Small changes become meaningful when they become consistent. Dopamine Reset is intentionally
            engineered for your eventual independence, not perpetual app engagement.
          </p>
        </div>

        {/* Top Key Metric Bento Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Metric 1: Stage */}
          <div className="bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-outline">
              <span className="font-medium uppercase tracking-wider text-[11px] text-outline">
                Current Stage
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-low dark:bg-tertiary-container text-primary dark:text-inverse-primary font-medium">
                Stage 2 of 5
              </span>
            </div>
            <div>
              <div className="text-lg font-medium text-on-surface">Awareness &amp; Control</div>
              <div className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
                Practicing the conscious pause
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-on-surface-variant dark:text-outline">
                <span>Stage Completion</span>
                <span className="font-medium text-primary dark:text-inverse-primary">64%</span>
              </div>
              <div className="w-full bg-surface-container-high dark:bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary-container dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
                  style={{ width: '64%' }}
                />
              </div>
            </div>
          </div>

          {/* Metric 2: Level & XP */}
          <div className="bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-outline">
              <span className="font-medium uppercase tracking-wider text-[11px] text-outline">
                Track Level
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-low dark:bg-tertiary-container text-secondary dark:text-inverse-primary font-medium">
                Tier II Active
              </span>
            </div>
            <div>
              <div className="text-lg font-medium text-on-surface">Level {currentLevel} — Focused</div>
              <div className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
                {nextLevelXp - totalXp} XP to Level 8 (Resilient)
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-on-surface-variant dark:text-outline">
                <span>
                  {totalXp} / {nextLevelXp} XP
                </span>
                <span className="font-medium text-primary dark:text-inverse-primary">82%</span>
              </div>
              <div className="w-full bg-surface-container-high dark:bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
                  style={{ width: '82%' }}
                />
              </div>
            </div>
          </div>

          {/* Metric 3: Mindful Streak */}
          <div className="bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-outline">
              <span className="font-medium uppercase tracking-wider text-[11px] text-outline">
                Mindful Rhythm
              </span>
              <span className="flex items-center gap-1 text-[11px] text-primary dark:text-inverse-primary font-medium">
                <span className="material-symbols-outlined text-xs">ac_unit</span>
                {freezesBanked} Freezes Banked
              </span>
            </div>
            <div>
              <div className="text-2xl font-medium text-primary dark:text-inverse-primary">
                {mindfulStreakDays} Days
              </div>
              <div className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
                No punitive reset on pause days
              </div>
            </div>
            <p className="text-[11px] text-on-surface-variant/80 dark:text-outline italic leading-snug">
              "Streaks are observations of rhythm, not obligations."
            </p>
          </div>

          {/* Metric 4: Recovery Score */}
          <div className="bg-surface-container-lowest dark:bg-surface p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 space-y-3 flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between text-xs text-on-surface-variant dark:text-outline">
              <span className="font-medium uppercase tracking-wider text-[11px] text-outline">
                Attention Score
              </span>
              <span className="px-2 py-0.5 rounded bg-secondary-container/40 dark:bg-tertiary-container text-on-secondary-container dark:text-inverse-primary text-xs font-medium">
                +6 this month
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-medium text-primary dark:text-inverse-primary">
                {attentionScore}
              </span>
              <span className="text-sm text-outline">/ 100</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-secondary">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              <span>Steady cognitive restoration</span>
            </div>
          </div>
        </div>
      </section>

      {/* Part A: 5 Recovery Stages */}
      <StageJourneyRoadmap />

      {/* Part B & C: 20-Level XP Track & Ledger */}
      <XPProgressionTrack />

      {/* Part D: Personal Badges */}
      <BadgesGrid />

      {/* Part E & F: Active Recovery Challenges */}
      <ChallengesSection />

      {/* Part G & H: Before vs Now Proof & Reflections */}
      <CumulativeProofSection />

      {/* Edge States & Gentle Modals Preview */}
      <LevelUpModal />
    </div>
  );
};

export const Phase5ProgressHub: React.FC = () => {
  return (
    <ProgressProvider>
      <Phase5ProgressContent />
    </ProgressProvider>
  );
};
