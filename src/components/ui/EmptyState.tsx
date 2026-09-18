import React from 'react';
import { Button } from './Button';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon = 'spa',
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-outline-variant/60 bg-surface-container-lowest/40 dark:bg-surface-container/20 max-w-md mx-auto ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-4">
        <span className="material-symbols-outlined text-[24px]">{icon}</span>
      </div>
      <h4 className="text-base font-medium text-on-surface mb-1.5">{title}</h4>
      <p className="text-xs text-outline max-w-xs leading-relaxed mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
