import React, { useEffect, useRef } from 'react';
import { Button } from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg rounded-2xl bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/50 p-6 shadow-xl space-y-5 transition-transform animate-scaleUp"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 id="modal-title" className="text-lg font-medium tracking-tight text-on-surface">
              {title}
            </h3>
            {description && (
              <p className="text-xs text-outline mt-1 leading-relaxed">{description}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 -mr-1 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container transition-colors focus:outline-none focus:ring-1 focus:ring-primary"
            aria-label="Close dialog"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {children && <div className="text-sm text-on-surface leading-relaxed">{children}</div>}

        {footer ? (
          <div className="pt-2 flex items-center justify-end gap-3">{footer}</div>
        ) : (
          <div className="pt-2 flex items-center justify-end gap-3">
            <Button variant="outline" size="sm" onClick={onClose}>
              Dismiss
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
