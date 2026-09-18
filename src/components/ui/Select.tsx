import React, { forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, id, className = '', ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label htmlFor={selectId} className="text-xs font-medium text-on-surface-variant">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          <select
            ref={ref}
            id={selectId}
            className={`w-full min-h-[44px] px-3.5 py-2.5 pr-10 text-sm rounded-lg bg-surface-container-lowest dark:bg-surface-container border appearance-none transition-colors duration-150 text-on-surface focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer ${
              error ? 'border-error' : 'border-outline-variant/60'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="material-symbols-outlined absolute right-3 pointer-events-none text-outline text-[20px]">
            arrow_drop_down
          </span>
        </div>
        {error && <p className="text-xs text-error font-medium">{error}</p>}
        {!error && helperText && <p className="text-xs text-outline">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
