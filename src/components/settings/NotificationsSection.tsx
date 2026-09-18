import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export const NotificationsSection: React.FC = () => {
  const { settings, updateNotificationSettings } = useSettings();
  const { notifications } = settings;
  const { showToast } = useToast();

  const [permissionState, setPermissionState] = useState<string>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermissionState(Notification.permission);
    } else {
      setPermissionState('unsupported');
    }
  }, []);

  const requestBrowserPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const result = await Notification.requestPermission();
        setPermissionState(result);
        if (result === 'granted') {
          showToast('Gentle notification channel opened.', 'success');
        } else {
          showToast('Notifications remain muted per your preference.', 'info');
        }
      } catch {
        // Silent fallthrough
      }
    } else {
      showToast('System notifications are not supported in this browser.', 'info');
    }
  };

  return (
    <section className="space-y-6 animate-fadeIn" id="view-notifications">
      {/* Philosophy Banner */}
      <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 flex items-start gap-3 shadow-xs">
        <span className="material-symbols-outlined text-primary dark:text-inverse-primary text-lg mt-0.5" aria-hidden="true">
          do_not_disturb_on
        </span>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-sm font-medium text-on-surface">The Digital Restraint Mandate</h3>
            {permissionState === 'default' && (
              <button
                type="button"
                onClick={requestBrowserPermission}
                className="text-[11px] px-2.5 py-1 rounded-md bg-surface-container-high dark:bg-surface-container-highest text-primary dark:text-inverse-primary font-medium hover:bg-surface-container transition-colors self-start sm:self-auto min-h-[32px]"
              >
                Enable Calm Web Alerts
              </button>
            )}
            {permissionState === 'granted' && (
              <span className="text-[11px] text-secondary dark:text-inverse-primary font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Browser alerts authorized
              </span>
            )}
            {permissionState === 'denied' && (
              <span className="text-[11px] text-outline">Browser alerts muted</span>
            )}
          </div>
          <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
            Dopamine Reset is built to free your cognitive bandwidth. We do not use unread counts, red badges, fear of missing out (FOMO) alerts, or synthetic urgency prompts. Every notification is respectful, calm, and predictable.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Granular Toggles */}
        <div className="lg:col-span-2 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 divide-y divide-outline-variant/20 shadow-xs">
          {/* Item 1 */}
          <div className="pb-4 flex items-center justify-between gap-4">
            <div className="pr-4">
              <div className="text-xs font-medium text-on-surface">Daily Morning Check-in Reminder</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Dispatches at 08:30 AM only if you haven't opened the morning journal.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
              <input
                type="checkbox"
                checked={notifications.dailyCheckin}
                onChange={(e) => updateNotificationSettings({ dailyCheckin: e.target.checked })}
                className="sr-only peer"
                aria-label="Daily Morning Check-in Reminder"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-inverse-primary" />
            </label>
          </div>

          {/* Item 2 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="pr-4">
              <div className="text-xs font-medium text-on-surface">Evening Rest &amp; Screen Wind-down</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                A quiet tone at 08:30 PM offering gentle permission to disconnect.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
              <input
                type="checkbox"
                checked={notifications.eveningWinddown}
                onChange={(e) => updateNotificationSettings({ eveningWinddown: e.target.checked })}
                className="sr-only peer"
                aria-label="Evening Rest and Screen Wind-down"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-inverse-primary" />
            </label>
          </div>

          {/* Item 3 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="pr-4">
              <div className="text-xs font-medium text-on-surface">Weekly Composure Summary</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Sundays at 10:00 AM. Digest of offline hours regained and quiet metrics.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
              <input
                type="checkbox"
                checked={notifications.weeklySummary}
                onChange={(e) => updateNotificationSettings({ weeklySummary: e.target.checked })}
                className="sr-only peer"
                aria-label="Weekly Composure Summary"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-inverse-primary" />
            </label>
          </div>

          {/* Item 4 */}
          <div className="py-4 flex items-center justify-between gap-4">
            <div className="pr-4">
              <div className="text-xs font-medium text-on-surface">Recovery Task Midday Nudge</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Gentle cue if you experience an urge friction peak during lunchtime.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
              <input
                type="checkbox"
                checked={notifications.middayNudge}
                onChange={(e) => updateNotificationSettings({ middayNudge: e.target.checked })}
                className="sr-only peer"
                aria-label="Recovery Task Midday Nudge"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-inverse-primary" />
            </label>
          </div>

          {/* Item 5 */}
          <div className="pt-4 flex items-center justify-between gap-4">
            <div className="pr-4">
              <div className="text-xs font-medium text-on-surface">Urgent Breaking News Intercept</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">
                Buffers sudden push notifications during designated focus blocks.
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px] min-w-[44px] justify-center">
              <input
                type="checkbox"
                checked={notifications.breakingNewsIntercept}
                onChange={(e) => updateNotificationSettings({ breakingNewsIntercept: e.target.checked })}
                className="sr-only peer"
                aria-label="Urgent Breaking News Intercept"
              />
              <div className="w-9 h-5 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-inverse-primary" />
            </label>
          </div>
        </div>

        {/* Tone of Voice Comparison Card */}
        <div className="lg:col-span-1 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 space-y-4 shadow-xs">
          <h4 className="text-xs font-medium text-on-surface uppercase tracking-wider">
            Sanctuary Tone Contrast
          </h4>
          <div className="space-y-3">
            <div className="p-3.5 rounded-lg bg-surface-container-low dark:bg-surface border border-outline-variant/20">
              <div className="flex items-center gap-1.5 text-secondary dark:text-inverse-primary text-[11px] font-medium mb-1">
                <span className="material-symbols-outlined text-xs">check_circle</span>
                <span>Our Restorative Copy</span>
              </div>
              <p className="text-xs text-on-surface italic leading-relaxed">
                "Your evening reset is ready when you are. Sleep is the bedrock of neuroplasticity."
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-error-container/30 dark:bg-error-container/10 border border-error-container/50">
              <div className="flex items-center gap-1.5 text-error text-[11px] font-medium mb-1">
                <span className="material-symbols-outlined text-xs">cancel</span>
                <span>Prohibited Manipulation</span>
              </div>
              <p className="text-xs text-on-surface-variant italic leading-relaxed">
                "⚠️ Hurry! Don't break your 18-day streak! Check in now before midnight!"
              </p>
            </div>
          </div>

          <p className="text-[11px] text-on-surface-variant leading-relaxed pt-2">
            Notice the lack of guilt-trips. Your relationship with this application should be calm, grounded, and non-obligatory.
          </p>
        </div>
      </div>
    </section>
  );
};
