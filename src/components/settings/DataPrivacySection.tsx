import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

export const DataPrivacySection: React.FC = () => {
  const {
    exportUserData,
    purgeJournalEntries,
    resetStageProgression,
    openDeleteModal,
  } = useSettings();

  const [exportOptions, setExportOptions] = useState({
    profileAndStage: true,
    screenUsageAndFocus: true,
    urgeAndMood: true,
    journalReflections: true,
  });

  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportUserData(exportOptions);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section className="space-y-6 animate-fadeIn" id="view-data">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Portability & Archive */}
        <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-medium text-on-surface">Data Sovereignty &amp; Portability</h3>
              <span className="text-xs text-secondary dark:text-inverse-primary font-medium">Full Ownership</span>
            </div>
            <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
              Export your complete Dopamine Reset history in non-proprietary formats (JSON &amp; CSV). Your data is your property.
            </p>

            <div className="space-y-2.5 mb-6 text-xs">
              <label className="flex items-center gap-2 text-on-surface cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={exportOptions.profileAndStage}
                  onChange={(e) => setExportOptions({ ...exportOptions, profileAndStage: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>Account Profile &amp; Stage History</span>
              </label>
              <label className="flex items-center gap-2 text-on-surface cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={exportOptions.screenUsageAndFocus}
                  onChange={(e) => setExportOptions({ ...exportOptions, screenUsageAndFocus: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>Daily Screen Usage &amp; Focus Block Timestamps</span>
              </label>
              <label className="flex items-center gap-2 text-on-surface cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={exportOptions.urgeAndMood}
                  onChange={(e) => setExportOptions({ ...exportOptions, urgeAndMood: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>Urge &amp; Mood Check-in Archives</span>
              </label>
              <label className="flex items-center gap-2 text-on-surface cursor-pointer min-h-[36px]">
                <input
                  type="checkbox"
                  checked={exportOptions.journalReflections}
                  onChange={(e) => setExportOptions({ ...exportOptions, journalReflections: e.target.checked })}
                  className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
                />
                <span>Decrypted Journal Reflections (AES-256)</span>
              </label>
            </div>

            {/* Ready Download State Card */}
            <div className="p-3 bg-surface-container-low dark:bg-surface rounded-lg border border-outline-variant/30 dark:border-outline/20 flex items-center justify-between text-xs mb-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary dark:text-inverse-primary" aria-hidden="true">
                  folder_zip
                </span>
                <div>
                  <span className="font-medium text-on-surface block">dopamine-reset-archive.zip</span>
                  <span className="text-[11px] text-on-surface-variant">Non-proprietary • Prepared today</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="px-2.5 py-1 text-xs font-medium text-primary dark:text-inverse-primary hover:underline flex items-center gap-1 min-h-[36px]"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="w-full py-2.5 px-3 rounded-lg border border-outline-variant/40 dark:border-outline/20 bg-surface-container-lowest dark:bg-surface text-on-surface text-xs font-medium hover:bg-surface-container transition-colors min-h-[44px] flex items-center justify-center gap-1.5"
          >
            {isExporting && <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            <span>Prepare New Full Export</span>
          </button>
        </div>

        {/* Danger Zone & Account Eradication */}
        <div className="bg-surface-container-lowest dark:bg-surface-container border border-error/30 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-error mb-2">
              <span className="material-symbols-outlined text-base" aria-hidden="true">
                warning
              </span>
              <h3 className="text-base font-medium text-error">Danger Zone &amp; Eradication</h3>
            </div>
            <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
              We uphold the Right to be Forgotten. Deleting your account will immediately wipe all cryptographic keys, offline logs, and stage progression.
            </p>

            <div className="space-y-4">
              <div className="p-3.5 rounded-lg bg-surface-container-low dark:bg-surface border border-outline-variant/20 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-on-surface">Purge Journal Reflections Only</div>
                  <div className="text-[11px] text-on-surface-variant">
                    Clears subjective text while keeping recovery metrics.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={purgeJournalEntries}
                  className="text-xs text-on-surface-variant hover:text-error min-h-[36px] px-2"
                >
                  Clear
                </button>
              </div>

              <div className="p-3.5 rounded-lg bg-surface-container-low dark:bg-surface border border-outline-variant/20 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-on-surface">Reset Usage &amp; Stage Progression</div>
                  <div className="text-[11px] text-on-surface-variant">
                    Start fresh from Stage 1 without deleting credentials.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={resetStageProgression}
                  className="text-xs text-on-surface-variant hover:text-error min-h-[36px] px-2"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="button"
              onClick={openDeleteModal}
              className="w-full py-2.5 px-3 rounded-lg bg-error-container/40 hover:bg-error-container text-error text-xs font-medium transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-sm">delete_forever</span>
              <span>Permanently Delete My Sanctuary Account</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
