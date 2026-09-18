import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Brandmark } from '../ui/Brandmark';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export interface SignInViewProps {
  onSwitchToSignUp: () => void;
  onSwitchToMagic: () => void;
  onSwitchToForgot: () => void;
}

export const SignInView: React.FC<SignInViewProps> = ({
  onSwitchToSignUp,
  onSwitchToMagic,
  onSwitchToForgot,
}) => {
  const { signInWithEmail } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await signInWithEmail(email, password);
      if (res.success) {
        showToast('Welcome back to your recovery sanctuary.', 'success');
      } else {
        setError(res.error || 'Invalid credentials or user does not exist.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6 py-6 sm:py-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <Brandmark size="md" />
        <h2 className="text-2xl font-medium tracking-tight text-primary dark:text-inverse-primary pt-2">
          Welcome back
        </h2>
        <p className="text-xs text-outline">
          Resume your calibrated attention recovery journey.
        </p>
      </div>

      <Card elevated className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-error-container/40 border border-error/30 text-xs text-error flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="focus@dopaminereset.app"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="space-y-1">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onSwitchToForgot}
                className="text-xs text-outline hover:text-primary transition-colors min-h-[36px] flex items-center"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
            icon="login"
          >
            Sign In
          </Button>
        </form>

        <div className="pt-3 border-t border-outline-variant/30 flex flex-col items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onSwitchToMagic}
            className="text-secondary hover:underline min-h-[44px] flex items-center"
          >
            Sign in with Passwordless Magic Link
          </button>
          <div className="text-outline">
            New to Dopamine Reset?{' '}
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="font-medium text-primary dark:text-inverse-primary hover:underline ml-1 min-h-[44px] inline-flex items-center"
            >
              Begin Recovery
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
