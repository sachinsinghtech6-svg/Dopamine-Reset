import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabaseUrl } from '@/lib/supabase';

export const AppPlaceholder: React.FC = () => {
  const { user, profile, isConfigured, isMockMode, signOut } = useAuth();
  const { showToast } = useToast();

  const goalTitleMap: Record<string, string> = {
    focus: 'Improve Deep Focus & Attention Span',
    screentime: 'Reduce Compulsive Screen Time',
    stress: 'Reduce Stress Scrolling & Micro-escapes',
    sleep: 'Improve Sleep Quality & Late Night Browsing',
    study: 'Study & Academic Productivity',
    presence: 'Real-World Social Presence',
  };

  const activeGoal = profile?.primary_goal ? goalTitleMap[profile.primary_goal] || profile.primary_goal : 'Conscious Deep Focus';
  const platforms = profile?.target_platforms?.length ? profile.target_platforms.join(', ') : 'Instagram, YouTube, TikTok';

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto w-full">
      {/* Welcome & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="success" size="sm" icon="verified">
              Calibration Active
            </Badge>
            <span className="text-xs text-outline">Stage 1: Observational Awareness</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-on-surface">
            Welcome back, {profile?.full_name || user?.user_metadata?.full_name || 'Friend'}
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1 max-w-xl">
            Today's sole objective is observing your first reach for the phone. Notice the subtle impulse before your thumb moves.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            icon="refresh"
            onClick={() => showToast('Syncing state with Supabase...', 'info')}
          >
            Sync State
          </Button>
          <Button variant="outline" size="sm" icon="logout" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Grid: Calibrated Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Daily Screen Baseline</span>
            <span className="material-symbols-outlined text-[18px] text-primary">timer</span>
          </div>
          <div className="text-3xl font-medium text-on-surface">
            {profile?.daily_screen_time || '4 - 6 hours'}
          </div>
          <p className="text-xs text-outline leading-snug">
            Target: 2.5 hours daily ceiling by Month 1.
          </p>
          <Progress value={68} label="Daily calm quota" showValue />
        </Card>

        {/* Metric 2 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Target Channels</span>
            <span className="material-symbols-outlined text-[18px] text-secondary">photo_camera</span>
          </div>
          <div className="text-sm font-medium text-on-surface truncate">
            {platforms}
          </div>
          <p className="text-xs text-outline leading-snug">
            4-second gentle micro-pause armed before feeds open.
          </p>
          <Progress value={100} label="Boundary protection active" />
        </Card>

        {/* Metric 3 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Sanctuary Window</span>
            <span className="material-symbols-outlined text-[18px] text-calm-amber">bedtime</span>
          </div>
          <div className="text-xl sm:text-2xl font-medium text-on-surface">
            {profile?.quiet_window_start || '22:30'} — {profile?.quiet_window_end || '07:00'}
          </div>
          <p className="text-xs text-outline leading-snug">
            Screen softens to gentle monochrome during dusk hours.
          </p>
          <Progress value={94} label="Circadian alignment" showValue />
        </Card>
      </div>

      {/* Active Interventions Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Calibrated User Plan */}
        <Card elevated className="p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
            <div>
              <h2 className="text-base font-medium text-on-surface">Calibrated Reset Strategy</h2>
              <p className="text-xs text-outline mt-0.5">
                Synthesized during Phase 2 baseline onboarding.
              </p>
            </div>
            <Badge variant="primary" size="sm">
              Week 1 Active
            </Badge>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                center_focus_strong
              </span>
              <div>
                <div className="font-medium text-on-surface">Primary Intention</div>
                <div className="text-outline leading-relaxed mt-0.5">{activeGoal}</div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                sentiment_dissatisfied
              </span>
              <div>
                <div className="font-medium text-on-surface">Identified Triggers</div>
                <div className="text-outline leading-relaxed mt-0.5">
                  {profile?.triggers?.length ? profile.triggers.join(' · ') : 'Boredom & Stillness · Workplace Stress'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">
                spa
              </span>
              <div>
                <div className="font-medium text-on-surface">Daily Evening Clarity Log</div>
                <div className="text-outline leading-relaxed mt-0.5">
                  Scheduled at {profile?.evening_reflection_time || '21:00'} nightly.
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Right: Supabase Data & Profile Verification */}
        <Card elevated className="p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h2 className="text-base font-medium text-on-surface">Supabase Profile Status</h2>
                <p className="text-xs text-outline mt-0.5">
                  Real-time synchronization with public.profiles table.
                </p>
              </div>
              <Badge variant={isConfigured ? 'success' : 'warning'} size="sm" icon="cloud_done">
                {isMockMode ? 'Dev Mock Mode' : 'Live GoTrue Auth'}
              </Badge>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">User UUID</span>
                <span className="font-mono font-medium text-on-surface text-[11px] truncate max-w-[200px]">
                  {user?.id}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Account Email</span>
                <span className="font-medium text-on-surface">{user?.email}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Onboarding Status</span>
                <span className="font-medium text-calm-green">
                  {profile?.onboarding_completed ? 'Completed & Persisted' : 'Pending'}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Supabase Endpoint</span>
                <span className="font-mono text-primary text-[11px] truncate max-w-[200px]">
                  {supabaseUrl}
                </span>
              </div>
            </div>

            <p className="text-xs text-outline leading-relaxed pt-1">
              Your baseline profile is stored securely with Row Level Security (RLS) ensuring that only your authenticated account can view or update your data.
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3">
            <span className="text-[11px] text-outline">
              Antigravity Phase 2 Complete
            </span>
            <Button
              variant="ghost"
              size="sm"
              icon="open_in_new"
              iconPosition="end"
              onClick={() => window.open(supabaseUrl, '_blank')}
            >
              Supabase Dashboard
            </Button>
          </div>
        </Card>
      </div>

      {/* Roadmap Boundary Notice */}
      <Card className="p-5 bg-surface-container-low/60 border-dashed border-outline-variant/60 space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-on-surface">
          <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
          <span>Antigravity Phase Boundary</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 1
            <div className="text-[10px] mt-0.5">Foundation ✓</div>
          </div>
          <div className="p-2.5 rounded-lg bg-secondary-container/60 text-on-secondary-container font-medium border border-secondary-container">
            Phase 2
            <div className="text-[10px] text-primary mt-0.5">Auth & Onboarding ✓</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 3
            <div className="text-[10px] mt-0.5">Recovery Core</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 4
            <div className="text-[10px] mt-0.5">Analytics & AI</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 5
            <div className="text-[10px] mt-0.5">Stages & XP</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 6
            <div className="text-[10px] mt-0.5">Settings & Polish</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
