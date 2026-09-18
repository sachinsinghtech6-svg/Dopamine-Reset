import React from 'react';
import { useRecovery } from '@/context/RecoveryContext';
import { RecoveryDashboard } from './RecoveryDashboard';
import { DailyCheckInModal } from './DailyCheckInModal';
import { CheckInResultView } from './CheckInResultView';
import { FocusSessionView } from './FocusSessionView';
import { SessionCompletionView } from './SessionCompletionView';
import { SupportiveGuardView } from './SupportiveGuardView';
import { OfflineResetView } from './OfflineResetView';
import { AllDoneView } from './AllDoneView';
import { RecoveryEmptyState } from './RecoveryEmptyState';
import { RecoverySkeleton } from './RecoverySkeleton';
import type { RecoveryViewKey } from '@/types/recovery';

export const RecoveryHub: React.FC = () => {
  const { activeView, setActiveView, loading } = useRecovery();

  if (loading) {
    return <RecoverySkeleton />;
  }

  return (
    <div className="w-full space-y-6">
      {/* Stitch Simulator Quick Switcher Header */}
      <div className="p-2.5 px-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-medium text-primary dark:text-inverse-primary">
            Phase 3: Core Recovery Experience
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="phase3-view-select" className="text-outline font-medium">
            Active Subview:
          </label>
          <select
            id="phase3-view-select"
            value={activeView}
            onChange={(e) => setActiveView(e.target.value as RecoveryViewKey)}
            className="px-2.5 py-1 rounded-lg border border-outline-variant/40 bg-surface-container-lowest dark:bg-surface text-xs font-medium text-on-surface cursor-pointer focus:ring-1 focus:ring-primary"
          >
            <option value="dashboard">1. Recovery Dashboard (Day 18 / Dynamic)</option>
            <option value="checkin">2. Daily Check-in Modal Flow</option>
            <option value="insight">3. Check-in Result & AI Insight</option>
            <option value="focus">4. Focus Session (30m Phone-Free)</option>
            <option value="completion">5. Task Completion (+20 XP)</option>
            <option value="limit">6. Limit Exceeded / Supportive Guard</option>
            <option value="reset">7. 10-Min Offline Reset Sanctuary</option>
            <option value="done">8. All Tasks Completed ("You're done for today. 🌱")</option>
            <option value="empty">9. First-Day New User / Orientation</option>
            <option value="skeleton">10. Loading Skeletons</option>
          </select>
        </div>
      </div>

      {/* Main View Router */}
      <div className="w-full">
        {activeView === 'dashboard' && (
          <RecoveryDashboard onNavigate={(v) => setActiveView(v)} />
        )}

        {activeView === 'checkin' && (
          <DailyCheckInModal
            onClose={() => setActiveView('dashboard')}
            onCompleted={() => setActiveView('insight')}
          />
        )}

        {activeView === 'insight' && (
          <CheckInResultView
            onBackToDashboard={() => setActiveView('dashboard')}
            onStartFocus={() => setActiveView('focus')}
          />
        )}

        {activeView === 'focus' && (
          <FocusSessionView
            onConclude={() => setActiveView('completion')}
            onExit={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'completion' && (
          <SessionCompletionView
            onReturnDashboard={() => setActiveView('dashboard')}
            onTakeReset={() => setActiveView('reset')}
          />
        )}

        {activeView === 'limit' && (
          <SupportiveGuardView
            onStartWalk={() => setActiveView('reset')}
            onStartBreathing={() => setActiveView('focus')}
            onDismiss={() => setActiveView('dashboard')}
            onStartReset={() => setActiveView('reset')}
          />
        )}

        {activeView === 'reset' && (
          <OfflineResetView onFinish={() => setActiveView('dashboard')} />
        )}

        {activeView === 'done' && (
          <AllDoneView onRevisitDashboard={() => setActiveView('dashboard')} />
        )}

        {activeView === 'empty' && (
          <RecoveryEmptyState
            onStartCheckin={() => setActiveView('checkin')}
            onViewDashboard={() => setActiveView('dashboard')}
          />
        )}

        {activeView === 'skeleton' && (
          <RecoverySkeleton onExit={() => setActiveView('dashboard')} />
        )}
      </div>
    </div>
  );
};
