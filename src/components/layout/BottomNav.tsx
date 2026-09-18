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
    { id: 'dashboard', label: 'Home', icon: 'home' },
    { id: 'progress', label: 'Stages', icon: 'spa' },
    { id: 'focus', label: 'Focus', icon: 'play_arrow', isPill: true },
    { id: 'analytics', label: 'Stats', icon: 'monitoring' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 dark:bg-surface-container/95 backdrop-blur-md border-t border-outline-variant/40 px-2 py-1 shadow-lg transition-colors"
    >
      <div className="flex items-center justify-around w-full max-w-md mx-auto">
        {items.map((item) => {
          const isActive = activeTab === item.id;
          if (item.isPill) {
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center -mt-3 shadow-md">
                  <span className="material-symbols-outlined text-lg">play_arrow</span>
                </div>
                <span className="text-[10px] mt-0.5 text-on-surface font-medium">Focus</span>
              </button>
            );
          }

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
