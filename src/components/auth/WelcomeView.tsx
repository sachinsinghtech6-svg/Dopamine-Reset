import React from 'react';
import { Brandmark } from '../ui/Brandmark';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

export interface WelcomeViewProps {
  onStartSignup: () => void;
  onStartLogin: () => void;
  onStartMagicLink: () => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({
  onStartSignup,
  onStartLogin,
  onStartMagicLink,
}) => {
  return (
    <div className="max-w-md mx-auto text-center space-y-8 py-6 sm:py-10 animate-fadeIn">
      {/* Brandmark Header */}
      <div className="flex flex-col items-center space-y-3">
        <Brandmark size="lg" showSubtitle={false} />
        <span className="text-xs uppercase tracking-widest text-outline font-medium">
          Attention Recovery Platform
        </span>
      </div>

      {/* Welcoming Message */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary dark:text-inverse-primary">
          A sanctuary for conscious attention
        </h1>
        <p className="text-xs sm:text-sm text-outline leading-relaxed max-w-sm mx-auto">
          Step away from hyper-stimulating algorithms. Calibrate passive boundaries, observe impulses, and restore deep cognitive presence.
        </p>
      </div>

      {/* Calm Action Options */}
      <Card elevated className="p-6 space-y-3.5 text-left">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          icon="arrow_forward"
          iconPosition="end"
          onClick={onStartSignup}
        >
          Begin Recovery
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="w-full"
          onClick={onStartLogin}
        >
          I already have an account
        </Button>
        <div className="pt-2 border-t border-outline-variant/30 text-center">
          <button
            type="button"
            onClick={onStartMagicLink}
            className="text-xs text-secondary hover:text-primary transition-colors min-h-[44px] inline-flex items-center justify-center"
          >
            Sign in with Passwordless Magic Link
          </button>
        </div>
      </Card>

      {/* Quiet Security / Privacy Notice */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-outline">
        <span className="material-symbols-outlined text-[14px]">lock</span>
        <span>Zero tracking · Encrypted profiles · Private by design</span>
      </div>
    </div>
  );
};
