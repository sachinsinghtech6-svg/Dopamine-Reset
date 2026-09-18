import React, { forwardRef } from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  quiet?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, quiet = false, id, className = '', ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-on-surface-variant">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`w-full p-3.5 text-sm rounded-lg transition-colors leading-relaxed placeholder:text-outline text-on-surface focus:outline-none focus:ring-1 focus:ring-primary ${
            quiet
              ? 'bg-surface-container-low border-none resize-none'
              : 'bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/60'
          } ${error ? 'border-error focus:ring-error' : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-outline">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
