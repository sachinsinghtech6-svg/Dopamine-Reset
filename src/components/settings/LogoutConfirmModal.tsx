import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export const LogoutConfirmModal: React.FC = () => {
  const { isLogoutModalOpen, closeLogoutModal } = useSettings();
  const { signOut } = useAuth();
  const { showToast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  if (!isLogoutModalOpen) return null;

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      closeLogoutModal();
      showToast('Session safely concluded. Take deep breaths.', 'info');
    } catch {
      showToast('Sign out error. Please try again.', 'error');
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
      className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="bg-surface-container-lowest dark:bg-surface-container rounded-2xl max-w-sm w-full p-6 border border-outline-variant/40 dark:border-outline/30 shadow-xl space-y-4 text-center">
        <div className="w-12 h-12 rounded-full bg-surface-container-high dark:bg-surface-container-highest text-primary dark:text-inverse-primary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            logout
          </span>
        </div>

        <div>
          <h3 id="logout-dialog-title" className="text-base font-medium text-on-surface">
            Conclude Today's Session?
          </h3>
          <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
            Your offline timers and streak freeze protections remain safely guarded locally.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={closeLogoutModal}
            disabled={isSigningOut}
            className="px-4 py-2 text-xs text-on-surface-variant hover:text-on-surface rounded-lg min-h-[44px]"
          >
            Stay
          </button>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="px-4 py-2 text-xs font-medium bg-primary dark:bg-inverse-primary text-on-primary dark:text-primary rounded-lg hover:bg-primary-container transition-colors min-h-[44px] flex items-center gap-1.5"
          >
            {isSigningOut && <span className="w-3 h-3 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />}
            <span>Confirm Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
