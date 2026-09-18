import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export const SupportInquiryModal: React.FC = () => {
  const { isSupportModalOpen, closeSupportModal } = useSettings();
  const { showToast } = useToast();
  const [reflection, setReflection] = useState('');
  const [category, setCategory] = useState('Ethical UX & Restraint');

  if (!isSupportModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflection.trim()) return;

    showToast('Thank you for helping us nurture digital restraint. Inquiry submitted.', 'success');
    setReflection('');
    closeSupportModal();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-dialog-title"
      className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl max-w-md w-full p-6 border border-outline-variant/40 dark:border-outline/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 id="support-dialog-title" className="text-sm font-medium text-on-surface">
            Sanctuary Support &amp; Feedback
          </h3>
          <button
            type="button"
            onClick={closeSupportModal}
            className="text-outline hover:text-on-surface p-1.5 rounded-lg min-w-[36px] min-h-[36px] flex items-center justify-center transition-colors"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label htmlFor="inquiry-category" className="block text-on-surface-variant mb-1 font-medium">
              Topic
            </label>
            <select
              id="inquiry-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs rounded-lg border border-outline-variant/40 bg-surface-container-low dark:bg-surface p-2 text-on-surface"
            >
              <option value="Ethical UX & Restraint">Ethical UX &amp; Restraint</option>
              <option value="Recovery Stages & Milestones">Recovery Stages &amp; Milestones</option>
              <option value="Data Sovereignty & Encryption">Data Sovereignty &amp; Encryption</option>
              <option value="Somatic Grounding & Intercepts">Somatic Grounding &amp; Intercepts</option>
            </select>
          </div>

          <div>
            <label htmlFor="inquiry-reflection" className="block text-on-surface-variant mb-1 font-medium">
              Your Question or Reflection
            </label>
            <textarea
              id="inquiry-reflection"
              rows={4}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Describe where you need support or thoughts on digital restraint..."
              className="w-full text-xs rounded-lg border border-outline-variant/40 bg-surface-container-low dark:bg-surface p-2.5 text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:border-primary"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeSupportModal}
              className="px-3.5 py-2 text-xs text-on-surface-variant hover:text-on-surface rounded-lg min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!reflection.trim()}
              className="px-4 py-2 text-xs font-medium bg-primary dark:bg-inverse-primary text-on-primary dark:text-primary rounded-lg hover:bg-primary-container disabled:opacity-50 transition-colors min-h-[44px]"
            >
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
