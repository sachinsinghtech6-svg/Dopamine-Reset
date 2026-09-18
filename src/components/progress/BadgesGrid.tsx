import React from 'react';
import { useProgress } from '@/context/ProgressContext';

export const BadgesGrid: React.FC = () => {
  const { badges } = useProgress();

  const unlockedCount = badges.filter((b) => b.status === 'unlocked').length;

  return (
    <section className="space-y-6" aria-label="Personal Badges and Quiet Achievements">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-outline-variant/40 pb-4">
        <div>
          <span className="text-xs font-medium uppercase tracking-widest text-outline">
            Personal Badges
          </span>
          <h2 className="text-2xl font-medium text-primary dark:text-inverse-primary mt-1">
            Quiet Achievements
          </h2>
          <p className="text-sm text-on-surface-variant dark:text-outline">
            Private markers of personal discipline. Zero competitive rankings or public comparisons.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant dark:text-outline">
          <span>Unlocked:</span>
          <span className="font-medium text-primary dark:text-inverse-primary bg-surface-container-low dark:bg-tertiary-container px-2.5 py-1 rounded-md">
            {unlockedCount} of {badges.length} Badges
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge) => {
          const isUnlocked = badge.status === 'unlocked';
          const isInProgress = badge.status === 'in_progress';
          const isLocked = badge.status === 'locked';

          return (
            <div
              key={badge.id}
              className={`p-5 rounded-xl border flex flex-col justify-between space-y-3 transition-all ${
                isUnlocked
                  ? 'bg-surface-container-lowest dark:bg-surface border-outline-variant/40 dark:border-outline/20 shadow-xs'
                  : isInProgress
                  ? 'bg-surface-container-lowest dark:bg-surface border-2 border-primary/20 dark:border-inverse-primary/20 shadow-xs'
                  : 'bg-surface-container-lowest/60 dark:bg-surface/60 border-outline-variant/30 opacity-65'
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${
                    isUnlocked
                      ? 'bg-secondary-container/40 dark:bg-tertiary-container text-on-secondary-container'
                      : isInProgress
                      ? 'bg-primary-container/20 text-primary dark:text-inverse-primary'
                      : 'bg-surface-container text-outline'
                  }`}
                >
                  {badge.emoji}
                </div>
                {isUnlocked && (
                  <span className="material-symbols-outlined text-xs text-secondary">
                    verified
                  </span>
                )}
                {isLocked && (
                  <span className="material-symbols-outlined text-xs text-outline">
                    lock
                  </span>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h3
                    className={`font-medium text-sm ${
                      isUnlocked
                        ? 'text-on-surface'
                        : isInProgress
                        ? 'text-primary dark:text-inverse-primary'
                        : 'text-outline'
                    }`}
                  >
                    {badge.title}
                  </h3>
                  {isInProgress && badge.progress !== undefined && badge.target !== undefined && (
                    <span className="text-[11px] font-medium text-primary dark:text-inverse-primary">
                      {badge.progress} / {badge.target}
                    </span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant dark:text-outline mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>

              <div>
                {isUnlocked && (
                  <span className="text-[11px] text-secondary font-medium">
                    {badge.unlockedLabel || 'Unlocked'}
                  </span>
                )}

                {isInProgress && badge.progress !== undefined && badge.target !== undefined && (
                  <div className="space-y-1">
                    <div className="w-full bg-surface-container-high dark:bg-surface-container h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary dark:bg-inverse-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-outline">
                      {badge.target - badge.progress} remaining
                    </span>
                  </div>
                )}

                {isLocked && (
                  <span className="text-[11px] text-outline">
                    {badge.unlockedLabel || 'Locked'}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
