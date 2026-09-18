import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useRecovery } from '@/context/RecoveryContext';
import { useAuth } from '@/context/AuthContext';

export interface RecoveryDashboardProps {
  onNavigate: (view: 'checkin' | 'focus' | 'insight' | 'limit' | 'reset' | 'empty') => void;
}

export const RecoveryDashboard: React.FC<RecoveryDashboardProps> = ({ onNavigate }) => {
  const {
    tasks,
    completedCount,
    streakDays,
    freezesRemaining,
    mindspaceScore,
    screenUsageMinutes,
    screenTargetMinutes,
    completeTask,
  } = useRecovery();
  const { user, profile } = useAuth();

  const userName = profile?.full_name?.split(' ')[0] || user?.user_metadata?.full_name?.split(' ')[0] || 'Friend';
  const stageName = profile?.stage || 'Stage 1: Awareness';
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const usageHours = Math.floor(screenUsageMinutes / 60);
  const usageMins = screenUsageMinutes % 60;
  const targetHours = Math.floor(screenTargetMinutes / 60);
  const targetMins = screenTargetMinutes % 60;
  const remainingMins = Math.max(0, screenTargetMinutes - screenUsageMinutes);

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto w-full">
      {/* Welcome Header & Daily Intention */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-secondary mb-1">
            <span className="material-symbols-outlined text-base">spa</span>
            <span>Day {streakDays} of 28 · {stageName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-on-surface">
            Good morning, {userName}.
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1.5 max-w-xl leading-relaxed">
            "Let's focus on one intentional step today." No urgency, no dopamine guilt—only mindful return to reality.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon="rate_review"
            onClick={() => onNavigate('checkin')}
          >
            Daily Check-in
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon="play_arrow"
            onClick={() => onNavigate('focus')}
          >
            Start Focus (30m)
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon="nature_people"
            onClick={() => onNavigate('reset')}
          >
            10m Walk
          </Button>
        </div>
      </div>

      {/* Top Hero Card: Today's Recovery */}
      <Card elevated className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>{stageName} & Friction Building</span>
            </div>
            <h2 className="text-xl font-medium text-on-surface">
              Today's Recovery — Day {streakDays}
            </h2>
            <p className="text-xs sm:text-sm text-outline leading-relaxed">
              You have achieved{' '}
              <strong className="font-medium text-on-surface">
                {completedCount} of {tasks.length} intentional tasks
              </strong>. Your nervous system is settling into lower digital reactivity.
            </p>

            {/* Progress Bar */}
            <div className="pt-2">
              <div className="flex justify-between text-xs font-medium mb-1.5 text-outline">
                <span>Daily Rhythm Progress</span>
                <span className="text-primary dark:text-inverse-primary">{progressPercent}% completed</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <Button
              variant="primary"
              size="md"
              icon="play_circle"
              onClick={() => onNavigate('focus')}
            >
              Continue Today
            </Button>
            <Button
              variant="secondary"
              size="md"
              icon="insights"
              onClick={() => onNavigate('insight')}
            >
              View Stage Plan
            </Button>
          </div>
        </div>
      </Card>

      {/* Bento Row 1: 3 Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Recovery Score (Circular Gauge) */}
        <Card elevated className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-outline uppercase tracking-wider">
                Mindspace Rebuilding
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-secondary font-medium bg-secondary-container/40 px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-xs">arrow_upward</span> +6 vs last wk
              </span>
            </div>

            <div className="flex items-center gap-5 my-2">
              <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-container stroke-current"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeWidth="3.2"
                  />
                  <path
                    className="text-secondary stroke-current"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    strokeDasharray={`${mindspaceScore}, 100`}
                    strokeLinecap="round"
                    strokeWidth="3.2"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-semibold leading-none text-on-surface">
                    {mindspaceScore}
                  </span>
                  <span className="text-[10px] text-outline mt-0.5">/ 100</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface">Steadily Improving</p>
                <p className="text-xs text-outline leading-snug mt-0.5">
                  Subtle friction is easing subconscious app launches.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 text-xs text-outline flex items-center justify-between">
            <span>Non-punitive metric</span>
            <button
              type="button"
              onClick={() => onNavigate('insight')}
              className="text-secondary font-medium hover:underline min-h-[36px] flex items-center"
            >
              Analysis →
            </button>
          </div>
        </Card>

        {/* 2. Today's Screen Exposure */}
        <Card elevated className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-outline uppercase tracking-wider">
                Screen Exposure
              </span>
              <span className="text-xs font-medium text-secondary">
                Remaining: {remainingMins}m
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-1">
              <h3 className="text-2xl font-semibold text-on-surface">
                {usageHours}h {usageMins}m
              </h3>
              <span className="text-xs text-outline">
                / Target {targetHours}h {targetMins}m
              </span>
            </div>
            <p className="text-xs text-secondary flex items-center gap-1 mb-4">
              <span className="material-symbols-outlined text-xs">trending_down</span>
              <span>18% lower than your pre-reset baseline</span>
            </p>

            {/* App Distribution Bar */}
            <div className="w-full h-2 rounded-full flex overflow-hidden gap-0.5 bg-surface-container mb-3">
              <div className="bg-primary h-full" style={{ width: '46%' }} title="Instagram 1h 42m" />
              <div className="bg-secondary h-full" style={{ width: '29%' }} title="YouTube 1h 05m" />
              <div className="bg-outline-variant h-full" style={{ width: '14%' }} title="WhatsApp 32m" />
              <div className="bg-surface-container-high h-full" style={{ width: '11%' }} title="Other 23m" />
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-y-1.5 text-xs text-outline">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Instagram <strong className="text-on-surface font-normal">1h 42m</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span>YouTube <strong className="text-on-surface font-normal">1h 05m</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-outline-variant" />
                <span>WhatsApp <strong className="text-on-surface font-normal">32m</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-surface-container-high" />
                <span>Other <strong className="text-on-surface font-normal">23m</strong></span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <span className="text-secondary font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>Verified Screen Sync</span>
            </span>
            <button
              type="button"
              onClick={() => onNavigate('limit')}
              className="text-outline hover:text-on-surface min-h-[36px] flex items-center"
            >
              Simulate Exceeded
            </button>
          </div>
        </Card>

        {/* 3. Deliberate Rhythm & Streak */}
        <Card elevated className="p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-outline uppercase tracking-wider">
                Deliberate Rhythm
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-primary dark:text-inverse-primary font-medium bg-surface-container px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-xs">ac_unit</span>
                <span>{freezesRemaining} Freezes left</span>
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-3">
              <h3 className="text-2xl font-semibold text-on-surface">{streakDays} Day Streak</h3>
              <span className="text-xs text-outline">unbroken focus</span>
            </div>

            {/* 7-Day Compact Week Bar (M T W T F S S) */}
            <div className="grid grid-cols-7 gap-1.5 mb-4 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => {
                const isFreezeDay = idx === 2;
                return (
                  <div key={day + idx} className="flex flex-col items-center gap-1">
                    <span className="text-[10px] text-outline">{day}</span>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isFreezeDay
                          ? 'bg-surface-container text-outline'
                          : 'bg-secondary-container/60 text-secondary'
                      }`}
                      title={isFreezeDay ? 'Mindfully Protected' : 'Completed'}
                    >
                      <span className="material-symbols-outlined text-xs">
                        {isFreezeDay ? 'ac_unit' : 'check'}
                      </span>
                    </div>
                  </div>
                );
              })}

              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-primary dark:text-inverse-primary font-semibold">Today</span>
                <div className="w-8 h-8 rounded-lg border-2 border-dashed border-secondary text-secondary flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                </div>
              </div>
            </div>

            <p className="text-xs text-outline leading-relaxed">
              Life happens. A freeze protects your streak when you need a mindful pause—never punitive.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 text-xs text-outline flex items-center justify-between">
            <span>Freeze banked: Mindful Rest</span>
            <span className="text-secondary font-medium">Safe from reset</span>
          </div>
        </Card>
      </div>

      {/* Bento Row 2: Daily Intentional Tasks & AI Recovery Coach */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Tasks List (2 cols on large screen) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">checklist</span>
              <h2 className="text-lg font-medium text-on-surface">Daily Intentional Rhythm</h2>
            </div>
            <span className="text-xs text-outline">Day {streakDays} Focus Schedule</span>
          </div>

          <div className="space-y-3">
            {tasks.map((task) => {
              const isDone = task.status === 'completed';

              const handleTaskClick = () => {
                if (task.actionKey === 'checkin') onNavigate('checkin');
                else if (task.actionKey === 'focus') onNavigate('focus');
                else if (task.actionKey === 'trigger') onNavigate('checkin');
                else if (task.actionKey === 'walk') onNavigate('reset');
                else if (task.actionKey === 'evening') completeTask('evening');
              };

              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isDone
                      ? 'bg-surface-container-low/70 border-outline-variant/30 opacity-90'
                      : 'bg-surface-container-lowest dark:bg-surface border-outline-variant/40 hover:border-outline'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center mt-0.5 shrink-0 ${
                        isDone
                          ? 'bg-secondary-container text-secondary'
                          : 'bg-surface-container text-outline'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm font-bold">
                        {isDone ? 'check' : task.icon}
                      </span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4
                          className={`text-sm font-medium ${
                            isDone ? 'line-through text-outline' : 'text-on-surface'
                          }`}
                        >
                          {task.title}
                        </h4>
                        {task.badgeLabel && (
                          <Badge
                            variant={task.badgeVariant || 'default'}
                            size="sm"
                          >
                            {task.badgeLabel}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-outline leading-relaxed">{task.desc}</p>
                    </div>
                  </div>

                  <div className="self-end sm:self-center shrink-0">
                    <Button
                      variant={isDone ? 'ghost' : 'secondary'}
                      size="sm"
                      onClick={handleTaskClick}
                    >
                      {task.actionText || (isDone ? 'Review' : 'Open')}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI Recovery Coach & Quick Shortcut */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            <h2 className="text-lg font-medium text-on-surface">AI Coach Insight</h2>
          </div>

          <Card elevated className="p-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center text-xs font-semibold">
                AI
              </div>
              <div>
                <h4 className="text-sm font-medium text-on-surface">Behavioral Pattern Detected</h4>
                <p className="text-[11px] text-outline">Analyzed from {streakDays} days of logs</p>
              </div>
            </div>

            <blockquote className="text-xs sm:text-sm text-outline italic border-l-2 border-secondary pl-3 py-1 leading-relaxed">
              "Your usage tends to increase between 8 PM and 10 PM on weekdays. Try moving your
              phone-free routine to 7:45 PM today before fatigue sets in."
            </blockquote>

            <div className="space-y-2 pt-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full"
                icon="tune"
                onClick={() => onNavigate('insight')}
              >
                Apply Recommendation
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={() => onNavigate('reset')}
              >
                Explore Offline Alternatives
              </Button>
            </div>

            <div className="pt-3 border-t border-outline-variant/30 text-[11px] text-outline flex items-center justify-between">
              <span>{stageName}</span>
              <span className="text-secondary font-medium">Confidence: 94%</span>
            </div>
          </Card>

          {/* Emergency Gentle Urge Shortcut */}
          <Card className="p-4 bg-surface-container-low flex items-center justify-between">
            <div>
              <h5 className="text-xs font-medium text-on-surface">Urge Surfing Right Now?</h5>
              <p className="text-[11px] text-outline mt-0.5">Take a non-judgmental 3-minute pause.</p>
            </div>
            <Button
              variant="primary"
              size="sm"
              icon="air"
              onClick={() => onNavigate('reset')}
            >
              Breathe
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
