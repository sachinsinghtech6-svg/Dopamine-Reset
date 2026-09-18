import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { Brandmark } from '../ui/Brandmark';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export interface PasswordRecoveryViewProps {
  onBackToLogin: () => void;
}

export const PasswordRecoveryView: React.FC<PasswordRecoveryViewProps> = ({ onBackToLogin }) => {
  const { resetPasswordForEmail } = useAuth();
  const { showToast } = useToast();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await resetPasswordForEmail(email);
      if (res.success) {
        setDispatched(true);
        showToast('Password reset instructions sent.', 'success');
      } else {
        setError(res.error || 'Failed to send recovery email.');
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
          Recover Access
        </h2>
        <p className="text-xs text-outline">
          Enter your registered email to receive a password reset link.
        </p>
      </div>

      <Card elevated className="p-6 space-y-4">
        {dispatched ? (
          <div className="space-y-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-secondary-container/50 text-primary flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">mark_email_read</span>
            </div>
            <h3 className="text-base font-medium text-on-surface">Recovery Email Sent</h3>
            <p className="text-xs text-outline leading-relaxed max-w-xs mx-auto">
              Follow the instructions sent to <strong className="text-on-surface">{email}</strong> to set a new password.
            </p>
            <Button variant="outline" size="sm" onClick={onBackToLogin} className="w-full">
              Return to Sign In
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-error-container/40 border border-error/30 text-xs text-error flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] mt-0.5 shrink-0">error</span>
                <span>{error}</span>
              </div>
            )}

            <Input
              label="Account Email"
              type="email"
              placeholder="focus@dopaminereset.app"
              icon="mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              loading={loading}
              icon="lock_reset"
            >
              Send Reset Link
            </Button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-xs text-outline hover:text-on-surface transition-colors min-h-[44px] inline-flex items-center"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};
