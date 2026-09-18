import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Brandmark } from '../ui/Brandmark';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export interface SignUpViewProps {
  onSuccess?: () => void;
  onSwitchToLogin: () => void;
  onSwitchToMagic: () => void;
}

export const SignUpView: React.FC<SignUpViewProps> = ({
  onSwitchToLogin,
  onSwitchToMagic,
}) => {
  const { signUpWithEmail } = useAuth();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    try {
      const res = await signUpWithEmail(email, password, fullName);
      if (res.success) {
        showToast('Registration successful! Welcome to your recovery journey.', 'success');
      } else {
        setError(res.error || 'Failed to create account.');
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
          Create your sanctuary
        </h2>
        <p className="text-xs text-outline">
          Establish your private, calibrated attention profile.
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
            label="Your Name"
            placeholder="e.g. Julian Vance"
            icon="person"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="focus@dopaminereset.app"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password (min 6 characters)"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            loading={loading}
            icon="arrow_forward"
            iconPosition="end"
          >
            Begin Calibration Onboarding
          </Button>
        </form>

        <div className="pt-3 border-t border-outline-variant/30 flex flex-col items-center gap-2 text-xs">
          <button
            type="button"
            onClick={onSwitchToMagic}
            className="text-secondary hover:underline min-h-[44px] flex items-center"
          >
            Or sign in with Passwordless Magic Link
          </button>
          <div className="text-outline">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-medium text-primary dark:text-inverse-primary hover:underline ml-1 min-h-[44px] inline-flex items-center"
            >
              Sign In
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
