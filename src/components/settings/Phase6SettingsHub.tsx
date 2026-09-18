import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { type SettingsTabId } from '@/types/settings';
import { UnsavedChangesBanner } from './UnsavedChangesBanner';
import { ProfileAccountSection } from './ProfileAccountSection';
import { RecoveryScheduleSection } from './RecoveryScheduleSection';
import { NotificationsSection } from './NotificationsSection';
import { AICoachPerimeterSection } from './AICoachPerimeterSection';
import { DataPrivacySection } from './DataPrivacySection';
import { AppearanceSection } from './AppearanceSection';
import { HelpSupportSection } from './HelpSupportSection';
import { SystemFeedbackBench } from './SystemFeedbackBench';
import { EthicalManifestoBanner } from './EthicalManifestoBanner';
import { DeleteAccountModal } from './DeleteAccountModal';
import { LogoutConfirmModal } from './LogoutConfirmModal';
import { SupportInquiryModal } from './SupportInquiryModal';

export const Phase6SettingsHub: React.FC = () => {
  const { activeTab, setActiveTab, saveAllSettings, isSaving } = useSettings();

  const tabs: Array<{ id: SettingsTabId; label: string; icon: string }> = [
    { id: 'profile', label: 'Profile & Account', icon: 'person' },
    { id: 'recovery', label: 'Recovery & Schedule', icon: 'timelapse' },
    { id: 'notifications', label: 'Notifications & Rhythms', icon: 'notifications_paused' },
    { id: 'aicoach', label: 'AI Coach Perimeter', icon: 'psychology' },
    { id: 'data', label: 'Data Export & Privacy', icon: 'download_for_offline' },
    { id: 'appearance', label: 'Appearance & Access', icon: 'contrast' },
    { id: 'help', label: 'Help & FAQ', icon: 'support' },
    { id: 'modals', label: 'System Feedback', icon: 'desktop_windows' },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Sub-Navigation / Scenario Switcher Tabs */}
      <div className="bg-surface-container-low/80 dark:bg-surface-container/60 border-b border-outline-variant/30 px-4 sm:px-6 py-2 sticky top-[64px] z-30 backdrop-blur-md -mx-4 sm:-mx-6 -mt-6 rounded-b-xl">
        <div className="max-w-[1440px] mx-auto overflow-x-auto no-scrollbar flex items-center gap-1 sm:gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`scenario-tab px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 shrink-0 min-h-[38px] ${
                  isActive
                    ? 'bg-surface-container-highest dark:bg-surface text-primary dark:text-inverse-primary shadow-xs font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Unsaved Changes Ambient Banner */}
      <UnsavedChangesBanner />

      {/* Header Hero Unit */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-secondary dark:text-inverse-primary text-xs font-medium mb-1">
            <span className="material-symbols-outlined text-sm" aria-hidden="true">
              tune
            </span>
            <span className="tracking-wide uppercase">Preferences &amp; Ethical Governance</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-headline font-medium text-on-surface tracking-tight">
            System &amp; Account Sanctuary
          </h1>
          <p className="text-sm text-on-surface-variant mt-1.5 max-w-2xl leading-relaxed">
            Fine-tune your cognitive stamina goals, quiet perimeter boundaries, and encrypted local data storage. Designed with zero dark patterns or artificial urgency.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container dark:bg-surface text-xs text-on-surface-variant border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <span>v1.0.4 Calm Sanctuary</span>
          </span>
          <button
            type="button"
            onClick={() => saveAllSettings('Synchronized with local storage and database.')}
            disabled={isSaving}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-outline-variant/40 bg-surface-container-lowest dark:bg-surface text-on-surface hover:bg-surface-container-low transition-colors min-h-[36px] flex items-center gap-1.5"
          >
            {isSaving && <span className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />}
            <span>Sync Parameters</span>
          </button>
        </div>
      </div>

      {/* Active Tab Panes */}
      <main className="w-full">
        {activeTab === 'profile' && <ProfileAccountSection />}
        {activeTab === 'recovery' && <RecoveryScheduleSection />}
        {activeTab === 'notifications' && <NotificationsSection />}
        {activeTab === 'aicoach' && <AICoachPerimeterSection />}
        {activeTab === 'data' && <DataPrivacySection />}
        {activeTab === 'appearance' && <AppearanceSection />}
        {activeTab === 'help' && <HelpSupportSection />}
        {activeTab === 'modals' && <SystemFeedbackBench />}
      </main>

      {/* Ethical UX Manifesto Footer Banner */}
      <EthicalManifestoBanner />

      {/* Modals */}
      <DeleteAccountModal />
      <LogoutConfirmModal />
      <SupportInquiryModal />
    </div>
  );
};
