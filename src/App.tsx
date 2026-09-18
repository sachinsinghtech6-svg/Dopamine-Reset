import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { AppShell } from '@/components/layout/AppShell';
import { AppPlaceholder } from '@/pages/AppPlaceholder';
import { DesignSystemShowcase } from '@/pages/DesignSystemShowcase';
import { AuthContainer } from '@/components/auth/AuthContainer';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { Brandmark } from '@/components/ui/Brandmark';

const MainNavigator: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [currentView, setCurrentView] = useState<'app' | 'showcase'>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Initial Auth Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-on-surface p-4">
        <div className="flex flex-col items-center gap-4 animate-fadeIn">
          <Brandmark size="lg" showSubtitle={false} />
          <div className="flex items-center gap-2 text-xs text-outline font-medium">
            <span className="w-2 h-2 rounded-full bg-primary animate-calm-pulse" />
            <span>Tuning into sanctuary...</span>
          </div>
        </div>
      </div>
    );
  }

  // Allow inspecting the Design System QA Showcase at any time
  if (currentView === 'showcase') {
    return (
      <AppShell
        currentView="showcase"
        onViewChange={setCurrentView}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <DesignSystemShowcase />
      </AppShell>
    );
  }

  // 1. Unauthenticated -> Auth Container (Welcome / SignUp / SignIn / MagicLink / Forgot)
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-background text-on-surface">
        <div className="w-full max-w-7xl mx-auto px-4 py-3 flex justify-end">
          <button
            type="button"
            onClick={() => setCurrentView('showcase')}
            className="text-xs text-outline hover:text-primary transition-colors flex items-center gap-1.5 min-h-[44px] px-2"
          >
            <span className="material-symbols-outlined text-[16px]">palette</span>
            <span>Design System QA</span>
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <AuthContainer />
        </div>
        <footer className="py-4 text-center text-[11px] text-outline">
          Dopamine Reset · Attention Sovereignty
        </footer>
      </div>
    );
  }

  // 2. Authenticated but Incomplete Onboarding -> 6-Step Calibration Wizard
  if (!profile || !profile.onboarding_completed) {
    return <OnboardingWizard />;
  }

  // 3. Authenticated & Onboarded -> Full Application Shell
  return (
    <AppShell
      currentView="app"
      onViewChange={setCurrentView}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <AppPlaceholder />
    </AppShell>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary fallbackTitle="Dopamine Reset Application Error">
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <MainNavigator />
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
