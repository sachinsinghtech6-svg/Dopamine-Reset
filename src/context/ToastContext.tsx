import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = 'info', duration: number = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Overlay */}
      <aside
        aria-label="Notifications"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-[calc(100%-3rem)] pointer-events-none"
      >
        {toasts.map((t) => {
          let icon = 'info';
          let borderClass = 'border-outline-variant/50';
          let bgClass = 'bg-surface-container-highest dark:bg-surface-container text-on-surface';

          if (t.type === 'success') {
            icon = 'check_circle';
            borderClass = 'border-calm-green/40';
          } else if (t.type === 'error') {
            icon = 'error';
            borderClass = 'border-error/40';
          } else if (t.type === 'warning') {
            icon = 'warning';
            borderClass = 'border-calm-amber/40';
          }

          return (
            <div
              key={t.id}
              role="status"
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border shadow-sm transition-all duration-200 ${borderClass} ${bgClass}`}
            >
              <span className="material-symbols-outlined text-[18px] shrink-0 text-primary mt-0.5" aria-hidden="true">
                {icon}
              </span>
              <p className="text-xs leading-relaxed flex-1 break-words font-medium">{t.message}</p>
              <button
                type="button"
                onClick={() => removeToast(t.id)}
                className="shrink-0 text-outline hover:text-on-surface transition-colors p-1 -mr-1 -mt-1 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                aria-label="Close notification"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
          );
        })}
      </aside>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return ctx;
};
