import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  hoverable = false,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-xl border border-outline-variant/40 transition-all duration-200 ${
        elevated
          ? 'bg-surface-container-lowest dark:bg-surface-container shadow-xs'
          : 'bg-surface-container-lowest/80 dark:bg-surface-container/60'
      } ${
        hoverable ? 'hover:border-primary/40 hover:bg-surface-container-lowest' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
