import React, { useState } from 'react';
import { JournalProvider } from '@/context/JournalContext';
import { CoachProvider } from '@/context/CoachContext';
import { AnalyticsHub } from './AnalyticsHub';
import { PrivateJournal } from '../journal/PrivateJournal';
import { AICoachView } from '../coach/AICoachView';
import { EdgeStatesView } from '../edge/EdgeStatesView';
import type { Phase4TabKey } from '@/types/analytics';

interface Phase4HubProps {
  initialTab?: Phase4TabKey;
  onTabChange?: (tab: Phase4TabKey) => void;
}

const Phase4Content: React.FC<{
  activeTab: Phase4TabKey;
  setActiveTab: (tab: Phase4TabKey) => void;
}> = ({ activeTab, setActiveTab }) => {
  const [coachInitialPrompt, setCoachInitialPrompt] = useState<string>('');

  const handleAskCoachFromAnalytics = (prompt: string) => {
    setCoachInitialPrompt(prompt);
    setActiveTab('coach');
  };

  const handleReflectWithAiFromJournal = (journalContent: string) => {
    setCoachInitialPrompt(`I am sharing my journal reflection: "${journalContent}"`);
    setActiveTab('coach');
  };

  const tabs: { id: Phase4TabKey; label: string; icon: string }[] = [
    { id: 'analytics', label: 'Analytics Hub', icon: 'monitoring' },
    { id: 'journal', label: 'Private Journal', icon: 'self_improvement' },
    { id: 'coach', label: 'AI Recovery Coach', icon: 'psychology' },
    { id: 'edge', label: 'Viewports & Edge States', icon: 'devices' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Sub-Header / Phase 4 Segmented State Switcher */}
      <div className="p-2.5 px-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-primary-fixed dark:bg-primary-container text-on-primary-fixed dark:text-inverse-primary font-semibold tracking-wide uppercase text-[10px]">
            Phase 4
          </span>
          <span className="font-medium text-on-surface">Calm Intelligence System</span>
        </div>

        {/* Segmented Tab Buttons */}
        <div
          className="inline-flex p-1 bg-surface-container-lowest dark:bg-surface rounded-xl border border-outline-variant/30 text-xs font-medium"
          role="tablist"
          aria-label="Phase 4 Views"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all min-h-[36px] ${
                  isActive
                    ? 'bg-surface-container-highest dark:bg-tertiary-container text-primary dark:text-inverse-primary shadow-xs'
                    : 'text-on-surface-variant dark:text-outline hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Local Isolation Badge */}
        <div className="hidden xl:flex items-center gap-2 text-xs text-outline">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          <span>Local Isolation: Active</span>
        </div>
      </div>

      {/* Main Tab Router */}
      <div className="w-full">
        {activeTab === 'analytics' && (
          <AnalyticsHub onAskCoach={handleAskCoachFromAnalytics} />
        )}
        {activeTab === 'journal' && (
          <PrivateJournal onReflectWithAi={handleReflectWithAiFromJournal} />
        )}
        {activeTab === 'coach' && (
          <AICoachView initialPrompt={coachInitialPrompt} />
        )}
        {activeTab === 'edge' && <EdgeStatesView />}
      </div>
    </div>
  );
};

export const Phase4Hub: React.FC<Phase4HubProps> = ({
  initialTab = 'analytics',
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState<Phase4TabKey>(initialTab);

  const handleTabChange = (tab: Phase4TabKey) => {
    setActiveTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <JournalProvider>
      <CoachProvider>
        <Phase4Content activeTab={activeTab} setActiveTab={handleTabChange} />
      </CoachProvider>
    </JournalProvider>
  );
};
