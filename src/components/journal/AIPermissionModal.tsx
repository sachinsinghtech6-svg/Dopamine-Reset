import React from 'react';

interface AIPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AIPermissionModal: React.FC<AIPermissionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ai-permission-title"
    >
      <div className="bg-surface-container-lowest dark:bg-surface border border-outline-variant/40 dark:border-outline/20 rounded-xl p-6 max-w-md w-full shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-inverse-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">shield_person</span>
          </div>
          <div>
            <h3 id="ai-permission-title" className="text-base font-medium text-on-surface">
              Share this entry with AI?
            </h3>
            <p className="text-xs text-outline">Journal entries are strictly private by default.</p>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-surface-container-low dark:bg-surface-container text-xs text-on-surface-variant dark:text-outline leading-relaxed border border-outline-variant/20">
          If granted, this specific journal entry will be inspected in memory to suggest cognitive
          reframing exercises. It will <strong className="text-on-surface">never</strong> be logged into persistent AI training sets or
          third-party brokers.
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-on-surface hover:bg-surface-container rounded-lg transition-colors min-h-[44px]"
          >
            Keep Strictly Private
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-medium bg-primary text-on-primary dark:bg-inverse-primary dark:text-primary rounded-lg hover:bg-primary-container transition-colors min-h-[44px] shadow-xs"
          >
            Consent & Reflect
          </button>
        </div>
      </div>
    </div>
  );
};
