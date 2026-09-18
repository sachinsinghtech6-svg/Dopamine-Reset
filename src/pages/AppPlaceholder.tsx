import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { supabaseUrl } from '@/lib/supabase';

export const AppPlaceholder: React.FC = () => {
  const { user, isConfigured, isMockMode, signInWithEmail, signUpWithEmail, signInWithMagicLink, signOut } = useAuth();
  const { showToast } = useToast();

  const [authTab, setAuthTab] = useState<'login' | 'signup' | 'magic'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Please enter your email address.', 'warning');
      return;
    }

    setAuthLoading(true);
    try {
      if (authTab === 'magic') {
        const res = await signInWithMagicLink(email);
        if (res.success) {
          showToast('Magic link dispatched! Check your email.', 'success');
        } else {
          showToast(res.error || 'Magic link failed.', 'error');
        }
      } else if (authTab === 'login') {
        const res = await signInWithEmail(email, password);
        if (res.success) {
          showToast('Welcome back to your recovery sanctuary.', 'success');
        } else {
          showToast(res.error || 'Sign in failed.', 'error');
        }
      } else {
        const res = await signUpWithEmail(email, password);
        if (res.success) {
          showToast('Account registered! Please check verification email.', 'success');
        } else {
          showToast(res.error || 'Registration failed.', 'error');
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto w-full">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/30">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" size="sm">Antigravity Phase 1 Foundation</Badge>
            <span className="text-xs text-outline">Living Sanctuary Substrate</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-on-surface">
            Serene Attention Canvas
          </h1>
          <p className="text-xs sm:text-sm text-outline mt-1 max-w-xl">
            Grounding workspace designed to mitigate digital overstimulation, built upon the Serene Reset design system.
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
          {user && (
            <Button variant="outline" size="sm" icon="logout" onClick={signOut}>
              Sign Out
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: Core metrics & Quick action */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Metric 1 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Mindful Equilibrium</span>
            <span className="material-symbols-outlined text-[18px] text-calm-green">eco</span>
          </div>
          <div className="text-3xl font-medium text-on-surface">3h 15m</div>
          <p className="text-xs text-outline leading-snug">
            Device-free time restored across daily cycles.
          </p>
          <Progress value={68} label="Daily calm quota" showValue />
        </Card>

        {/* Metric 2 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Urge Deflections</span>
            <span className="material-symbols-outlined text-[18px] text-primary">psychology</span>
          </div>
          <div className="text-3xl font-medium text-on-surface">7 / 8</div>
          <p className="text-xs text-outline leading-snug">
            Impulses redirected to conscious breathing pauses.
          </p>
          <Progress value={88} label="Intervention fidelity" showValue />
        </Card>

        {/* Metric 3 */}
        <Card elevated className="p-5 space-y-3">
          <div className="flex items-center justify-between text-outline text-xs">
            <span>Current Trajectory</span>
            <span className="material-symbols-outlined text-[18px] text-secondary">trending_up</span>
          </div>
          <div className="text-3xl font-medium text-on-surface">Stage 1</div>
          <p className="text-xs text-outline leading-snug">
            Conscious Pattern Recognition & Baseline Observation.
          </p>
          <Progress value={45} label="Stage calibration" showValue />
        </Card>
      </div>

      {/* Two Column Layout: Auth Foundation & Backend Verification */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Authentication Foundation Box */}
        <Card elevated className="p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
            <div>
              <h2 className="text-base font-medium text-on-surface">Authentication Substrate</h2>
              <p className="text-xs text-outline mt-0.5">
                Production auth verified via Supabase SDK.
              </p>
            </div>
            {user ? (
              <Badge variant="success" size="sm" icon="verified_user">
                Authenticated
              </Badge>
            ) : (
              <Badge variant="neutral" size="sm" icon="lock_open">
                Guest Session
              </Badge>
            )}
          </div>

          {user ? (
            <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container space-y-3 text-xs leading-relaxed">
              <div className="flex items-center justify-between">
                <span className="font-medium text-on-surface">Active Account</span>
                <span className="text-outline font-mono text-[11px]">{user.id}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline">Email</span>
                <span className="font-medium text-on-surface">{user.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-outline">Auth Provider</span>
                <span className="font-medium text-on-surface capitalize">
                  {isMockMode ? 'Dev Mock Environment' : 'Supabase GoTrue'}
                </span>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full" onClick={signOut}>
                  End Active Session
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {/* Auth Mode Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-lg bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-xs">
                <button
                  type="button"
                  onClick={() => setAuthTab('login')}
                  className={`flex-1 py-1.5 rounded font-medium transition-all ${
                    authTab === 'login'
                      ? 'bg-surface-container-lowest dark:bg-surface text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  Password Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('signup')}
                  className={`flex-1 py-1.5 rounded font-medium transition-all ${
                    authTab === 'signup'
                      ? 'bg-surface-container-lowest dark:bg-surface text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab('magic')}
                  className={`flex-1 py-1.5 rounded font-medium transition-all ${
                    authTab === 'magic'
                      ? 'bg-surface-container-lowest dark:bg-surface text-primary shadow-xs'
                      : 'text-outline hover:text-on-surface'
                  }`}
                >
                  Magic Link
                </button>
              </div>

              <Input
                label="Email Address"
                type="email"
                icon="mail"
                placeholder="focus@dopaminereset.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {authTab !== 'magic' && (
                <Input
                  label="Account Password"
                  type="password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                loading={authLoading}
                icon="arrow_forward"
                iconPosition="end"
              >
                {authTab === 'login' && 'Sign In to Recovery'}
                {authTab === 'signup' && 'Create Calibrated Account'}
                {authTab === 'magic' && 'Send Passwordless Link'}
              </Button>
            </form>
          )}
        </Card>

        {/* Right Column: Supabase & Infrastructure Health */}
        <Card elevated className="p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div>
                <h2 className="text-base font-medium text-on-surface">Backend Infrastructure</h2>
                <p className="text-xs text-outline mt-0.5">
                  Connected Supabase project verification.
                </p>
              </div>
              <Badge variant={isConfigured ? 'success' : 'warning'} size="sm" icon="database">
                {isConfigured ? 'Active Healthy' : 'Pending Key'}
              </Badge>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Supabase Project Endpoint</span>
                <span className="font-mono font-medium text-on-surface text-[11px] truncate max-w-[200px]">
                  {supabaseUrl}
                </span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Database Engine</span>
                <span className="font-medium text-on-surface">PostgreSQL 17 (ap-southeast-1)</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Schema State</span>
                <span className="font-medium text-on-surface">Phase 1 Clean Substrate</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-outline-variant/20">
                <span className="text-outline">Environment Config</span>
                <span className="font-mono text-primary text-[11px]">
                  VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY
                </span>
              </div>
            </div>

            <p className="text-xs text-outline leading-relaxed pt-1">
              Phase 1 maintains zero unneeded database tables and preserves the project structure. In future phases, schema migrations will be applied additively.
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between gap-3">
            <span className="text-[11px] text-outline">
              Connected via Supabase MCP
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

      {/* Future Roadmap Boundary Notification */}
      <Card className="p-5 bg-surface-container-low/60 border-dashed border-outline-variant/60 space-y-3">
        <div className="flex items-center gap-2 text-xs font-medium text-on-surface">
          <span className="material-symbols-outlined text-primary text-[18px]">timeline</span>
          <span>Antigravity Phase Boundary Governance</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 text-center text-xs">
          <div className="p-2.5 rounded-lg bg-secondary-container/50 text-on-secondary-container font-medium border border-secondary-container">
            Phase 1
            <div className="text-[10px] text-primary opacity-80 mt-0.5">Current Foundation</div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container text-outline opacity-60">
            Phase 2
            <div className="text-[10px] mt-0.5">Onboarding</div>
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
