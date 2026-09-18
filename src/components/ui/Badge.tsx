import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
  size?: 'sm' | 'md';
  icon?: string;
  onClick?: () => void;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  onClick,
  className = '',
}) => {
  const variantStyles = {
    default: 'bg-surface-container text-on-surface-variant border-outline-variant/40',
    primary: 'bg-secondary-container/60 text-on-secondary-container border-secondary-container',
    secondary: 'bg-surface-container-high text-secondary border-outline-variant/40',
    success: 'bg-calm-green/15 text-calm-green border-calm-green/30',
    warning: 'bg-calm-amber/15 text-calm-amber border-calm-amber/30',
    error: 'bg-error-container/60 text-error border-error-container',
    neutral: 'bg-surface-container text-outline border-outline-variant/30',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-[14px]">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
