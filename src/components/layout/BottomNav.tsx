import React from 'react';

export interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab = 'dashboard',
  onTabChange = () => {},
}) => {
  const items = [
    { id: 'dashboard', label: 'Canvas', icon: 'spa' },
    { id: 'checkin', label: 'Check-in', icon: 'timer' },
    { id: 'focus', label: 'Focus', icon: 'lens_blur' },
    { id: 'journal', label: 'Journal', icon: 'edit_note' },
    { id: 'coach', label: 'Coach', icon: 'psychology' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 dark:bg-surface-container/95 backdrop-blur-md border-t border-outline-variant/40 px-2 py-1 shadow-lg transition-colors"
    >
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-lg transition-all ${
                isActive
                  ? 'text-primary dark:text-inverse-primary font-medium'
                  : 'text-outline hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
