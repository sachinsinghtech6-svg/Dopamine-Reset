import React from 'react';
import { useSettings } from '@/context/SettingsContext';

export const UnsavedChangesBanner: React.FC = () => {
  const { isDirty, dirtySection, discardPendingChanges, saveAllSettings, isSaving } = useSettings();

  if (!isDirty) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="bg-tertiary-fixed dark:bg-tertiary-container border-b border-outline-variant/40 dark:border-outline/30 px-6 py-2.5 transition-all duration-300 sticky top-[97px] z-20 shadow-xs"
    >
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-on-tertiary-fixed dark:text-inverse-on-surface">
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
          <span>You have pending parameter refinements in {dirtySection || 'Settings'}.</span>
        </div>
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={discardPendingChanges}
            disabled={isSaving}
            className="text-on-tertiary-fixed-variant dark:text-inverse-on-surface hover:underline min-h-[36px] px-2 py-1 text-xs transition-colors"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={() => saveAllSettings()}
            disabled={isSaving}
            className="px-3.5 py-1.5 rounded-lg bg-primary dark:bg-inverse-primary text-on-primary dark:text-primary font-medium text-xs hover:bg-primary-container transition-colors min-h-[36px] flex items-center gap-1.5 shadow-xs"
          >
            {isSaving && <span className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />}
            <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
