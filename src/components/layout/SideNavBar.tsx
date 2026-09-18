import React from 'react';
import { useAuth } from '@/context/AuthContext';

export interface SideNavBarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const SideNavBar: React.FC<SideNavBarProps> = ({
  activeTab = 'dashboard',
  onTabChange = () => {},
}) => {
  const { isMockMode, toggleMockMode } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Recovery Canvas', icon: 'spa', badge: 'Core' },
    { id: 'checkin', label: 'Urge Check-In', icon: 'timer', badge: 'Phase 3' },
    { id: 'focus', label: 'Quiet Session', icon: 'lens_blur', badge: 'Phase 3' },
    { id: 'journal', label: 'Reflections', icon: 'edit_note', badge: 'Phase 4' },
    { id: 'coach', label: 'AI Coach', icon: 'psychology', badge: 'Phase 4' },
    { id: 'stages', label: 'Stages & Growth', icon: 'trending_up', badge: 'Phase 5' },
    { id: 'settings', label: 'Preferences', icon: 'tune', badge: 'Phase 6' },
  ];

  return (
    <aside
      aria-label="Application Navigation"
      className="w-64 shrink-0 border-r border-outline-variant/30 sticky top-16 h-[calc(100vh-4rem)] flex flex-col justify-between p-4 bg-surface-container-low/50 dark:bg-surface-container/30"
    >
      <div className="space-y-6 overflow-y-auto custom-scrollbar">
        {/* Navigation Section */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-semibold text-outline uppercase tracking-wider mb-2">
            Attention Sanctuary
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all min-h-[44px] ${
                  isActive
                    ? 'bg-surface-container-lowest dark:bg-surface text-primary dark:text-inverse-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isActive ? 'text-primary dark:text-inverse-primary' : 'text-outline'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                      item.badge === 'Core'
                        ? 'bg-secondary-container/60 text-on-secondary-container'
                        : 'bg-surface-container text-outline'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t border-outline-variant/30 space-y-3">
        <div className="p-3 rounded-xl bg-surface-container-lowest/80 dark:bg-surface-container border border-outline-variant/30 text-xs space-y-1.5">
          <div className="flex items-center justify-between font-medium text-on-surface">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-calm-green animate-calm-pulse" />
              Serene Reset v1.0
            </span>
            <span className="text-[10px] text-outline">Phase 1</span>
          </div>
          <p className="text-[11px] text-outline leading-snug">
            Anti-gamified digital wellness architecture.
          </p>
        </div>

        {import.meta.env.DEV && (
          <button
            type="button"
            onClick={toggleMockMode}
            className="w-full py-2 px-3 text-[11px] text-outline hover:text-on-surface hover:bg-surface-container rounded-lg border border-dashed border-outline-variant/60 transition-colors flex items-center justify-center gap-1.5 min-h-[36px]"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isMockMode ? 'toggle_on' : 'toggle_off'}
            </span>
            <span>{isMockMode ? 'Dev Mock User Active' : 'Toggle Dev Mock User'}</span>
          </button>
        )}
      </div>
    </aside>
  );
};
