import React, { forwardRef, useState } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, helperText, error, icon, type = 'text', className = '', id, disabled, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const resolvedType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-on-surface-variant flex items-center justify-between">
            <span>{label}</span>
          </label>
        )}
        <div className="relative flex items-center w-full">
          {icon && (
            <span className="material-symbols-outlined absolute left-3 text-outline text-[20px] pointer-events-none select-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            disabled={disabled}
            className={`w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-lg bg-surface-container-lowest dark:bg-surface-container border transition-colors duration-150 placeholder:text-outline text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:cursor-not-allowed ${
              icon ? 'pl-10' : ''
            } ${isPassword ? 'pr-11' : ''} ${
              error ? 'border-error focus:ring-error focus:border-error' : 'border-outline-variant/60'
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2.5 p-1.5 text-outline hover:text-on-surface transition-colors rounded focus:outline-none focus:ring-1 focus:ring-primary"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <span className="material-symbols-outlined text-[20px]">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          )}
        </div>
        {error && <p className="text-xs text-error font-medium leading-none">{error}</p>}
        {!error && helperText && <p className="text-xs text-outline leading-none">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
