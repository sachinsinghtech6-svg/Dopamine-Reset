import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export const SystemFeedbackBench: React.FC = () => {
  const {
    markDirty,
    openDeleteModal,
    isOfflineNoticeActive,
    toggleOfflineNotice,
  } = useSettings();
  const { showToast } = useToast();

  return (
    <section className="space-y-6 animate-fadeIn" id="view-modals">
      <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 shadow-xs">
        <h3 className="text-base font-medium text-on-surface mb-1">
          Feedback States &amp; Micro-Interaction Sandbox
        </h3>
        <p className="text-xs text-on-surface-variant mb-6">
          Phase 6 interactive evaluation harness. Test modals, ambient toasts, and non-punitive state notifications.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => showToast('Parameters saved quietly to local device.', 'success')}
            className="p-3.5 rounded-lg border border-outline-variant/30 dark:border-outline/20 bg-surface-container-low dark:bg-surface hover:bg-surface-container text-xs font-medium text-on-surface text-center min-h-[44px] transition-all"
          >
            <span className="material-symbols-outlined text-base text-secondary dark:text-inverse-primary block mb-1" aria-hidden="true">
              check_circle
            </span>
            <span>Success Toast</span>
          </button>

          <button
            type="button"
            onClick={toggleOfflineNotice}
            className="p-3.5 rounded-lg border border-outline-variant/30 dark:border-outline/20 bg-surface-container-low dark:bg-surface hover:bg-surface-container text-xs font-medium text-on-surface text-center min-h-[44px] transition-all"
          >
            <span className="material-symbols-outlined text-base text-outline block mb-1" aria-hidden="true">
              cloud_off
            </span>
            <span>{isOfflineNoticeActive ? 'Hide Offline Notice' : 'Simulate Offline State'}</span>
          </button>

          <button
            type="button"
            onClick={() => markDirty('Recovery Rhythm Sandbox')}
            className="p-3.5 rounded-lg border border-outline-variant/30 dark:border-outline/20 bg-surface-container-low dark:bg-surface hover:bg-surface-container text-xs font-medium text-on-surface text-center min-h-[44px] transition-all"
          >
            <span className="material-symbols-outlined text-base text-on-surface-variant block mb-1" aria-hidden="true">
              flag
            </span>
            <span>Unsaved Changes Bar</span>
          </button>

          <button
            type="button"
            onClick={openDeleteModal}
            className="p-3.5 rounded-lg border border-error/30 bg-error-container/20 hover:bg-error-container/40 text-xs font-medium text-error text-center min-h-[44px] transition-all"
          >
            <span className="material-symbols-outlined text-base text-error block mb-1" aria-hidden="true">
              delete_forever
            </span>
            <span>Destructive Delete Modal</span>
          </button>
        </div>

        {/* Offline notice demo container */}
        {isOfflineNoticeActive && (
          <div className="mt-6 p-4 rounded-xl bg-surface-container dark:bg-surface border border-outline-variant/40 flex items-center justify-between gap-4 animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-outline" aria-hidden="true">
                cloud_off
              </span>
              <div>
                <span className="text-xs font-medium text-on-surface">Offline Sanctuary Mode Active</span>
                <p className="text-[11px] text-on-surface-variant">
                  All check-ins and timers continue functioning uninterrupted on local storage.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={toggleOfflineNotice}
              className="text-xs text-on-surface-variant hover:text-on-surface min-h-[36px] px-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
