import React from 'react';
import { Brandmark } from '../ui/Brandmark';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';

export interface TopNavBarProps {
  currentView: 'app' | 'showcase';
  onViewChange: (view: 'app' | 'showcase') => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ currentView, onViewChange }) => {
  const { theme, effectiveTheme, setTheme } = useTheme();
  const { user, isConfigured, isMockMode, toggleMockMode } = useAuth();

  const cycleTheme = () => {
    if (theme === 'system') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else setTheme('system');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return 'contrast';
    return effectiveTheme === 'dark' ? 'dark_mode' : 'light_mode';
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-container-lowest/90 dark:bg-surface-container/90 backdrop-blur-md border-b border-outline-variant/40 transition-colors duration-200">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brandmark & Search */}
        <div className="flex items-center gap-6 shrink-0">
          <Brandmark size="sm" onClick={() => onViewChange('app')} />

          <div className="hidden md:flex items-center relative pl-4 border-l border-outline-variant/40">
            <span className="material-symbols-outlined text-outline text-[18px] absolute left-6 pointer-events-none" aria-hidden="true">
              search
            </span>
            <input
              type="text"
              placeholder="Quick focus, pause (⌘K)..."
              className="bg-surface-container-low dark:bg-surface-container-highest border-none rounded-lg pl-9 pr-3 py-1.5 text-xs text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary w-52 transition-all"
              aria-label="Quick search"
            />
          </div>
        </div>

        {/* Center: Environment Navigation Toggle */}
        <nav aria-label="View Switcher" className="flex items-center bg-surface-container-low dark:bg-surface-container-highest p-1 rounded-lg border border-outline-variant/30">
          <button
            type="button"
            onClick={() => onViewChange('app')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] flex items-center gap-1.5 ${
              currentView === 'app'
                ? 'bg-surface-container-lowest dark:bg-surface text-primary dark:text-inverse-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">space_dashboard</span>
            <span>App Shell</span>
          </button>
          <button
            type="button"
            onClick={() => onViewChange('showcase')}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all min-h-[36px] flex items-center gap-1.5 ${
              currentView === 'showcase'
                ? 'bg-surface-container-lowest dark:bg-surface text-primary dark:text-inverse-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            <span>Design System QA</span>
          </button>
        </nav>

        {/* Right: Theme Toggle & User Info */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Theme switcher */}
          <button
            type="button"
            onClick={cycleTheme}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-outline hover:text-primary hover:bg-surface-container-low rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Current theme: ${theme}. Click to change.`}
            title={`Theme: ${theme.toUpperCase()} (Click to toggle)`}
          >
            <span className="material-symbols-outlined text-[20px]">{getThemeIcon()}</span>
          </button>

          {/* Supabase status indicator */}
          <div className="hidden sm:flex items-center">
            {isConfigured ? (
              <Badge variant="success" size="sm" icon="cloud_done">
                Supabase Connected
              </Badge>
            ) : isMockMode ? (
              <Badge variant="warning" size="sm" icon="science" className="cursor-pointer" onClick={toggleMockMode}>
                Dev Mock Mode
              </Badge>
            ) : (
              <button
                type="button"
                onClick={toggleMockMode}
                className="inline-flex items-center"
                title="Click to enable Dev Mock Auth"
              >
                <Badge variant="neutral" size="sm" icon="cloud_off">
                  Supabase Pending
                </Badge>
              </button>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-outline-variant/40">
            <Avatar size="sm" name={user?.user_metadata?.full_name || user?.email || 'Guest'} />
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-medium text-on-surface leading-tight max-w-[100px] truncate">
                {user?.user_metadata?.full_name || (user ? 'Active User' : 'Guest')}
              </span>
              <span className="text-[10px] text-outline leading-tight">
                {user ? 'Phase 4 Active' : 'Exploring'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
