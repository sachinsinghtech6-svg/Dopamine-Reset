import React, { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { AppShell } from '@/components/layout/AppShell';
import { AppPlaceholder } from '@/pages/AppPlaceholder';
import { DesignSystemShowcase } from '@/pages/DesignSystemShowcase';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'app' | 'showcase'>('app');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  return (
    <ErrorBoundary fallbackTitle="Dopamine Reset Application Error">
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <AppShell
              currentView={currentView}
              onViewChange={setCurrentView}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            >
              {currentView === 'app' ? <AppPlaceholder /> : <DesignSystemShowcase />}
            </AppShell>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
