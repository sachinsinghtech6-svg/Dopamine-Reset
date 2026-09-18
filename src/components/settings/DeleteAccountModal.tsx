import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

export const DeleteAccountModal: React.FC = () => {
  const { isDeleteModalOpen, closeDeleteModal, deleteSanctuaryAccount } = useSettings();
  const [confirmText, setConfirmText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isDeleteModalOpen) return null;

  const handleConfirm = async () => {
    if (confirmText.trim() !== 'DELETE') {
      setErrorMsg('Please type DELETE exactly in capital letters to confirm erasure.');
      return;
    }

    setIsDeleting(true);
    setErrorMsg(null);
    try {
      await deleteSanctuaryAccount();
      closeDeleteModal();
    } catch {
      setErrorMsg('Failed to eradicate account data. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-dialog-title"
      className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl max-w-md w-full p-6 border border-outline-variant/40 dark:border-outline/30 shadow-2xl space-y-4">
        <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            delete_forever
          </span>
        </div>

        <div>
          <h3 id="delete-dialog-title" className="text-base font-medium text-on-surface">
            Eradicate Account &amp; Data?
          </h3>
          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
            This will permanently delete your profile, 1,240 XP milestone, Stage 2 progress, and AES-256 local encrypted keys. This action cannot be reversed.
          </p>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="delete-confirm-input" className="text-[11px] text-on-surface-variant block">
            To confirm, please type <span className="font-semibold text-error">DELETE</span> below:
          </label>
          <input
            id="delete-confirm-input"
            type="text"
            value={confirmText}
            onChange={(e) => {
              setConfirmText(e.target.value);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="DELETE"
            className="w-full text-xs rounded-lg border border-outline-variant/40 bg-surface-container-low dark:bg-surface p-2.5 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-error focus:border-error"
          />
          {errorMsg && <p className="text-[11px] text-error mt-1">{errorMsg}</p>}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={closeDeleteModal}
            disabled={isDeleting}
            className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface rounded-lg min-h-[44px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isDeleting || confirmText.trim() !== 'DELETE'}
            className="px-4 py-2 text-xs font-medium bg-error text-on-error rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 min-h-[44px] flex items-center gap-1.5"
          >
            {isDeleting && <span className="w-3 h-3 border-2 border-on-error border-t-transparent rounded-full animate-spin" />}
            <span>{isDeleting ? 'Eradicating...' : 'Permanently Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
