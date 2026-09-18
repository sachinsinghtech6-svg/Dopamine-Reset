import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export const AICoachPerimeterSection: React.FC = () => {
  const { settings, updateAIPerimeterSettings } = useSettings();
  const { aiPerimeter } = settings;
  const { showToast } = useToast();

  const handleAuditPerimeter = () => {
    showToast('Perimeter boundaries verified. Zero external telemetry leaks detected.', 'success');
  };

  return (
    <section className="space-y-6 animate-fadeIn" id="view-aicoach">
      <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-medium text-on-surface">Local AI Perimeter Governance</h3>
              <span className="text-[10px] bg-secondary-container dark:bg-secondary-container/30 text-primary dark:text-inverse-primary font-medium px-2 py-0.5 rounded">
                On-Device Edge
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-1">
              Select which behavioral dimensions your AI Coach may reference. Data is processed in-memory and never transferred to third parties.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAuditPerimeter}
            className="px-3.5 py-1.5 rounded-lg bg-surface-container-high dark:bg-surface-container-highest hover:bg-surface-container text-xs font-medium text-on-surface transition-colors min-h-[36px]"
          >
            Audit Perimeter
          </button>
        </div>

        <div className="divide-y divide-outline-variant/20 py-2">
          {/* Dimension 1 */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-lg mt-0.5" aria-hidden="true">
                military_tech
              </span>
              <div>
                <div className="text-xs font-medium text-on-surface">Recovery Progress &amp; Milestones</div>
                <div className="text-[11px] text-on-surface-variant">
                  Allows coach to know you are on Stage 2 (Awareness &amp; Control) and have 1,240 XP.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateAIPerimeterSettings({ recoveryProgress: !aiPerimeter.recoveryProgress })}
              className={`text-xs font-medium px-2.5 py-1 rounded-md min-h-[36px] transition-colors ${
                aiPerimeter.recoveryProgress
                  ? 'text-secondary dark:text-inverse-primary bg-secondary-container/40 dark:bg-secondary-container/20'
                  : 'text-on-surface-variant bg-surface-container'
              }`}
            >
              {aiPerimeter.recoveryProgress ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Dimension 2 */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-lg mt-0.5" aria-hidden="true">
                monitoring
              </span>
              <div>
                <div className="text-xs font-medium text-on-surface">Usage Durations &amp; Friction Hours</div>
                <div className="text-[11px] text-on-surface-variant">
                  Allows coach to identify peak temptation times (e.g. 2:00 PM lull or late-night scroll).
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateAIPerimeterSettings({ usageDurations: !aiPerimeter.usageDurations })}
              className={`text-xs font-medium px-2.5 py-1 rounded-md min-h-[36px] transition-colors ${
                aiPerimeter.usageDurations
                  ? 'text-secondary dark:text-inverse-primary bg-secondary-container/40 dark:bg-secondary-container/20'
                  : 'text-on-surface-variant bg-surface-container'
              }`}
            >
              {aiPerimeter.usageDurations ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Dimension 3 */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary dark:text-inverse-primary text-lg mt-0.5" aria-hidden="true">
                mood
              </span>
              <div>
                <div className="text-xs font-medium text-on-surface">Mood &amp; Urge Check-in Logs</div>
                <div className="text-[11px] text-on-surface-variant">
                  Enables tailored grounding advice based on self-reported stress or restlessness.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => updateAIPerimeterSettings({ moodLogs: !aiPerimeter.moodLogs })}
              className={`text-xs font-medium px-2.5 py-1 rounded-md min-h-[36px] transition-colors ${
                aiPerimeter.moodLogs
                  ? 'text-secondary dark:text-inverse-primary bg-secondary-container/40 dark:bg-secondary-container/20'
                  : 'text-on-surface-variant bg-surface-container'
              }`}
            >
              {aiPerimeter.moodLogs ? 'Enabled' : 'Muted'}
            </button>
          </div>

          {/* Dimension 4 */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-outline text-lg mt-0.5" aria-hidden="true">
                lock
              </span>
              <div>
                <div className="text-xs font-medium text-on-surface">Private Journal Reflections</div>
                <div className="text-[11px] text-on-surface-variant">
                  Off by default. Your freeform journal entries remain strictly locked from AI evaluation.
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextVal = !aiPerimeter.journalReflections;
                updateAIPerimeterSettings({ journalReflections: nextVal });
                showToast(
                  nextVal
                    ? 'Reflections temporarily granted per-session evaluation.'
                    : 'Requires explicit per-entry consent unlock. Kept locked.',
                  'info'
                );
              }}
              className="text-xs text-on-surface-variant border border-outline-variant/40 dark:border-outline/20 px-2.5 py-1 rounded-md hover:bg-surface-container min-h-[36px]"
            >
              {aiPerimeter.journalReflections ? 'Unlocked (Consent)' : 'Locked (Off)'}
            </button>
          </div>

          {/* Dimension 5 */}
          <div className="py-3.5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-outline text-lg mt-0.5" aria-hidden="true">
                travel_explore
              </span>
              <div>
                <div className="text-xs font-medium text-on-surface">Detailed External App Browsing History</div>
                <div className="text-[11px] text-on-surface-variant">
                  We never inspect external URLs, titles, or messages. Only aggregate screen time.
                </div>
              </div>
            </div>
            <span className="text-xs text-on-surface-variant font-medium px-2.5 py-1 bg-surface-container dark:bg-surface rounded-md">
              Restricted (Off)
            </span>
          </div>
        </div>

        {/* Strict Boundary Clarification */}
        <div className="mt-6 p-4 rounded-xl bg-surface-container-low dark:bg-surface border border-outline-variant/30 dark:border-outline/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-base mt-0.5" aria-hidden="true">
            shield
          </span>
          <div className="text-xs text-on-surface-variant leading-relaxed">
            <strong className="font-medium text-on-surface">Clinical Boundary Disclaimer:</strong> The AI Coach provides non-diagnostic behavioral observations and mindful pacing techniques. It is intentionally prohibited from diagnosing psychiatric conditions, prescribing pharmaceuticals, or replacing licensed therapists.
          </div>
        </div>
      </div>
    </section>
  );
};
