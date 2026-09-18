import React from 'react';
import { Button } from './Button';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something unexpected occurred',
  message = 'We encountered an issue loading this section. Please try again.',
  onRetry,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-xl border border-error/30 bg-error-container/20 max-w-md mx-auto ${className}`}
      role="alert"
    >
      <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center text-error mb-3">
        <span className="material-symbols-outlined text-[20px]">error</span>
      </div>
      <h5 className="text-sm font-medium text-on-surface mb-1">{title}</h5>
      <p className="text-xs text-on-surface-variant leading-relaxed max-w-xs mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" icon="refresh" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
