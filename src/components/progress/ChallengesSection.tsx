import React, { useState } from 'react';
import { useProgress } from '@/context/ProgressContext';
import type { ChallengeCategory } from '@/types/progress';

export const ChallengesSection: React.FC = () => {
  const { challenges, joinChallenge, advanceChallenge } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState<ChallengeCategory>('All');
  const [showPhilosophy, setShowPhilosophy] = useState<boolean>(false);

  const categories: ChallengeCategory[] = ['All', 'Focus', 'Screen Time', 'Awareness', 'Lifestyle'];

  const filteredChallenges =
    selectedCategory === 'All'
      ? challenges
      : challenges.filter((c) => c.category === selectedCategory);

  return (
    <section className="scroll-mt-24 space-y-6" id="challenges-section" aria-label="Active Recovery Challenges">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-outline">
            Rituals &amp; Sprints
          </span>
          <h2 className="text-2xl font-medium text-primary dark:text-inverse-primary mt-1">
            Active Recovery Challenges
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-outline">
            Low-pressure behavioral experiments designed to rebuild neurochemical balance.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pb-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors min-h-[36px] ${
                  isActive
                    ? 'bg-primary text-surface dark:bg-primary-fixed dark:text-on-primary-fixed shadow-xs'
                    : 'bg-surface-container-low dark:bg-surface-container hover:bg-surface-container text-on-surface-variant dark:text-outline'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge) => {
          const isActive = challenge.status === 'active';
          const isCompleted = challenge.status === 'completed';

          return (
            <div
              key={challenge.id}
              className={`p-6 rounded-xl flex flex-col justify-between space-y-5 transition-all shadow-xs ${
                isActive
                  ? 'bg-surface-container-lowest dark:bg-surface border-2 border-primary/30 dark:border-inverse-primary/30'
                  : 'bg-surface-container-lowest dark:bg-surface border border-outline-variant/40 dark:border-outline/20'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${
                      isActive
                        ? 'bg-primary/10 text-primary dark:bg-primary-fixed/20 dark:text-inverse-primary'
                        : isCompleted
                        ? 'bg-secondary-container/50 text-secondary'
                        : 'bg-surface-container text-on-surface-variant dark:text-outline'
                    }`}
                  >
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-inverse-primary" />}
                    {isCompleted ? 'Completed ✓' : challenge.sprintType}
                  </span>
                  <span className="text-xs font-medium text-primary dark:text-inverse-primary">
                    +{challenge.xpReward} XP
                  </span>
                </div>

                <h3 className="text-lg font-medium text-on-surface">{challenge.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant dark:text-outline leading-relaxed">
                  {challenge.description}
                </p>

                <div className="p-3 bg-surface-container-low dark:bg-surface-container rounded-lg space-y-2">
                  <div className="flex justify-between text-xs text-on-surface-variant dark:text-outline">
                    <span>{challenge.ritualTitle}</span>
                    <span className="font-medium text-primary dark:text-inverse-primary">
                      {isActive ? `${challenge.progressDays} / ${challenge.targetDays} days` : challenge.category}
                    </span>
                  </div>
                  {isActive && (
                    <div className="w-full bg-surface-container-highest dark:bg-surface-container rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-primary dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${(challenge.progressDays / challenge.targetDays) * 100}%` }}
                      />
                    </div>
                  )}
                  <div className="text-[11px] text-outline leading-snug">
                    {challenge.ritualDescription}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                {isActive ? (
                  <button
                    type="button"
                    onClick={() => advanceChallenge(challenge.id)}
                    className="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-container dark:bg-primary-fixed dark:text-on-primary-fixed text-surface text-xs font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <span className="material-symbols-outlined text-sm">{challenge.icon}</span>
                    <span>{challenge.actionButtonText}</span>
                  </button>
                ) : isCompleted ? (
                  <div className="w-full py-2 px-4 rounded-lg bg-secondary-container/40 text-secondary text-xs font-medium text-center flex items-center justify-center gap-1.5 min-h-[44px]">
                    <span className="material-symbols-outlined text-sm">verified</span>
                    <span>Challenge Completed</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => joinChallenge(challenge.id)}
                    className="w-full py-2.5 px-4 rounded-lg bg-surface-container-high hover:bg-outline-variant/50 text-on-surface text-xs font-medium transition-colors flex items-center justify-center gap-1.5 min-h-[44px]"
                  >
                    <span>{challenge.actionButtonText}</span>
                    <span className="material-symbols-outlined text-sm">add</span>
                  </button>
                )}

                {isActive && (
                  <div className="text-center">
                    <span className="text-[11px] text-outline">
                      Leave challenge without penalty at any time
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gentle Non-Punitive Reassurance Banner */}
      <div className="bg-surface-container-low dark:bg-surface-container p-4 sm:p-5 rounded-xl border border-outline-variant/40 dark:border-outline/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-secondary-container/50 text-secondary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-base">favorite</span>
          </div>
          <div>
            <div className="text-sm font-medium text-on-surface">
              Missed a scheduled check-in or challenge day?
            </div>
            <p className="text-xs text-on-surface-variant dark:text-outline mt-0.5">
              That is completely okay. You never lose earned XP or drop stages. Simply pick up where you left off tomorrow.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setShowPhilosophy(!showPhilosophy)}
          className="shrink-0 px-3 py-1.5 rounded-lg border border-outline-variant/60 bg-surface-container-lowest dark:bg-surface text-on-surface text-xs font-medium hover:bg-surface-container-low transition-colors min-h-[36px]"
        >
          {showPhilosophy ? 'Hide Note' : 'Learn Our Philosophy'}
        </button>
      </div>

      {showPhilosophy && (
        <div className="p-4 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 text-xs text-on-surface-variant dark:text-outline leading-relaxed space-y-2 animate-fadeIn">
          <h4 className="font-medium text-on-surface">The Serene Reset Anti-Guilt Principle:</h4>
          <p>
            Habit research proves that shame and panic triggers provoke dopamine-seeking relapses. By eliminating punitive streak breaks and countdown stress, Dopamine Reset builds resilience grounded in intrinsic autonomy.
          </p>
        </div>
      )}
    </section>
  );
};
