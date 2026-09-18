import React, { forwardRef } from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
  icon?: string;
  iconPosition?: 'start' | 'end';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'start',
      disabled,
      className = '',
      ...props
    },
    ref
  ) => {
    // Base styles: Minimum comfortable touch target (min-h-[44px] for standard interactive controls)
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none';

    const variantStyles = {
      primary:
        'bg-primary text-on-primary hover:bg-primary-container dark:bg-primary-container dark:hover:bg-primary shadow-xs active:scale-[0.99]',
      secondary:
        'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/40 active:scale-[0.99]',
      ghost:
        'bg-transparent text-primary dark:text-inverse-primary hover:bg-surface-container-low active:scale-[0.99]',
      outline:
        'bg-transparent border border-outline-variant/60 text-on-surface hover:bg-surface-container-low active:scale-[0.99]',
      danger:
        'bg-error text-on-error hover:opacity-90 shadow-xs active:scale-[0.99]',
    };

    const sizeStyles = {
      sm: 'text-xs min-h-[36px] px-3 py-1.5 gap-1.5',
      md: 'text-sm min-h-[44px] px-4 py-2 gap-2',
      lg: 'text-base min-h-[48px] px-6 py-2.5 gap-2.5',
      icon: 'min-h-[44px] min-w-[44px] p-2 aspect-square',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {loading ? (
          <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
        ) : (
          <>
            {icon && iconPosition === 'start' && (
              <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'end' && (
              <span className="material-symbols-outlined text-[18px] shrink-0">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
