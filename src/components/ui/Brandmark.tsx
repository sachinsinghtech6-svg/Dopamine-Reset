import React from 'react';

export interface BrandmarkProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Brandmark: React.FC<BrandmarkProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { height: 28, textClass: 'text-sm font-semibold', subClass: 'text-[9px]' },
    md: { height: 36, textClass: 'text-base font-semibold', subClass: 'text-[10px]' },
    lg: { height: 48, textClass: 'text-xl font-semibold', subClass: 'text-xs' },
  };

  const { height, textClass, subClass } = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <svg
        height={height}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" className="text-primary opacity-25" />
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="2.2" className="text-primary opacity-60" />
        <circle cx="20" cy="20" r="5" fill="currentColor" className="text-primary" />
        <path d="M20 2 A18 18 0 0 1 38 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-secondary" />
      </svg>
      <div className="flex flex-col">
        <span className={`${textClass} tracking-tight leading-tight text-on-surface flex items-center gap-1`}>
          <span>Dopamine</span>
          <span className="font-light text-primary dark:text-inverse-primary">Reset</span>
        </span>
        {showSubtitle && (
          <span className={`${subClass} font-medium tracking-widest text-outline uppercase leading-none mt-0.5`}>
            Attention Recovery
          </span>
        )}
      </div>
    </div>
  );
};
