import React, { useState } from 'react';
import { WelcomeView } from './WelcomeView';
import { SignUpView } from './SignUpView';
import { SignInView } from './SignInView';
import { MagicLinkView } from './MagicLinkView';
import { PasswordRecoveryView } from './PasswordRecoveryView';
import { useAuth } from '@/context/AuthContext';

export type AuthScreen = 'welcome' | 'signup' | 'signin' | 'magic' | 'forgot';

export const AuthContainer: React.FC = () => {
  const [screen, setScreen] = useState<AuthScreen>('welcome');
  const { toggleMockMode, isMockMode } = useAuth();
  const isDev = import.meta.env.DEV;

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-8 bg-background text-on-surface transition-colors duration-200">
      {screen === 'welcome' && (
        <WelcomeView
          onStartSignup={() => setScreen('signup')}
          onStartLogin={() => setScreen('signin')}
          onStartMagicLink={() => setScreen('magic')}
        />
      )}

      {screen === 'signup' && (
        <SignUpView
          onSwitchToLogin={() => setScreen('signin')}
          onSwitchToMagic={() => setScreen('magic')}
        />
      )}

      {screen === 'signin' && (
        <SignInView
          onSwitchToSignUp={() => setScreen('signup')}
          onSwitchToMagic={() => setScreen('magic')}
          onSwitchToForgot={() => setScreen('forgot')}
        />
      )}

      {screen === 'magic' && (
        <MagicLinkView onBackToLogin={() => setScreen('signin')} />
      )}

      {screen === 'forgot' && (
        <PasswordRecoveryView onBackToLogin={() => setScreen('signin')} />
      )}

      {isDev && (
        <div className="max-w-md mx-auto w-full pt-4 text-center">
          <button
            type="button"
            onClick={toggleMockMode}
            className="text-[11px] text-outline hover:text-primary transition-colors px-2.5 py-1 rounded-full border border-outline-variant/40 bg-surface-container-low min-h-[36px]"
          >
            {isMockMode ? 'Disable Dev Mock Mode' : 'Dev Helper: Toggle Mock User Profile'}
          </button>
        </div>
      )}
    </div>
  );
};

