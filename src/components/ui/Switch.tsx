import React from 'react';

export interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  description,
  disabled = false,
  className = '',
}) => {
  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={`inline-flex items-center justify-between gap-4 min-h-[44px] py-1 select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      role="switch"
      aria-checked={checked}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onChange(!checked);
        }
      }}
    >
      {(label || description) && (
        <div className="flex flex-col text-sm">
          {label && <span className="font-medium text-on-surface">{label}</span>}
          {description && <span className="text-xs text-outline">{description}</span>}
        </div>
      )}
      <div
        className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 shrink-0 ${
          checked ? 'bg-primary' : 'bg-surface-container-highest dark:bg-surface-container'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </div>
  );
};
