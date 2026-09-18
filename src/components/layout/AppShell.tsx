import React, { useState } from 'react';
import { TopNavBar } from './TopNavBar';
import { SideNavBar } from './SideNavBar';
import { BottomNav } from './BottomNav';

export interface AppShellProps {
  children: React.ReactNode;
  currentView: 'app' | 'showcase';
  onViewChange: (view: 'app' | 'showcase') => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  currentView,
  onViewChange,
  activeTab = 'dashboard',
  onTabChange,
}) => {
  const [internalTab, setInternalTab] = useState(activeTab);

  const handleTabChange = (tab: string) => {
    setInternalTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface transition-colors duration-200">
      {/* Top Navigation */}
      <TopNavBar currentView={currentView} onViewChange={onViewChange} />

      {/* Main Area: Sidebar + Canvas */}
      <div className="flex-1 flex w-full max-w-7xl mx-auto min-w-0">
        {/* Desktop Sidebar (visible on lg+) */}
        {currentView === 'app' && (
          <div className="hidden lg:block">
            <SideNavBar activeTab={internalTab} onTabChange={handleTabChange} />
          </div>
        )}

        {/* Content Canvas */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-20 lg:pb-8 flex flex-col">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (visible < lg in app view) */}
      {currentView === 'app' && (
        <BottomNav activeTab={internalTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};
