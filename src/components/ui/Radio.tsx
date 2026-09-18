import React, { forwardRef } from 'react';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, id, className = '', checked, disabled, onChange, ...props }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);

    return (
      <label
        htmlFor={inputId}
        className={`inline-flex items-start gap-3 min-h-[44px] py-1 select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        } ${className}`}
      >
        <div className="relative flex items-center justify-center mt-0.5 shrink-0">
          <input
            ref={ref}
            id={inputId}
            type="radio"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 rounded-full border border-outline-variant/80 bg-surface-container-lowest dark:bg-surface-container transition-all peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40 flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-primary opacity-0 peer-checked:opacity-100 transition-opacity" />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col text-sm leading-tight pt-0.5">
            {label && <span className="font-medium text-on-surface">{label}</span>}
            {description && <span className="text-xs text-outline mt-0.5">{description}</span>}
          </div>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';
