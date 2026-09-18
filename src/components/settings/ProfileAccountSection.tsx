import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSettings } from '@/context/SettingsContext';
import { useToast } from '@/context/ToastContext';

export const ProfileAccountSection: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const { openLogoutModal } = useSettings();
  const { showToast } = useToast();

  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || 'Alex Morgan');
  const [isSavingName, setIsSavingName] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'AM';
  };

  const handleSaveName = async () => {
    if (!fullName.trim()) return;
    setIsSavingName(true);
    try {
      const res = await updateProfile({ full_name: fullName.trim() });
      if (res.success) {
        showToast('Profile identity updated.', 'success');
        setIsEditingName(false);
      } else {
        showToast(res.error || 'Failed to update name', 'error');
      }
    } finally {
      setIsSavingName(false);
    }
  };

  const displayEmail = profile?.email || user?.email || 'alex.morgan@sanctuary.io';
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'September 14, 2024';

  return (
    <section className="space-y-8 animate-fadeIn" id="view-profile">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Identity & Monogram Avatar Card */}
        <div className="lg:col-span-1 bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                Identity
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-secondary bg-secondary-container/40 dark:bg-secondary-container/20 px-2.5 py-0.5 rounded-full">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                <span>Verified Rhythm</span>
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="relative group">
                <div className="w-20 h-20 rounded-2xl bg-surface-container-high dark:bg-surface-container-highest border-2 border-surface-container-highest flex items-center justify-center text-primary dark:text-inverse-primary text-2xl font-medium tracking-tight shadow-xs">
                  {getInitials(fullName)}
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-sm hover:bg-primary-container transition-colors"
                  title="Change identity"
                  aria-label="Edit display name"
                >
                  <span className="material-symbols-outlined text-xs">edit</span>
                </button>
              </div>

              <div className="flex-1 min-w-0">
                {isEditingName ? (
                  <div className="space-y-1.5">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full text-xs font-medium px-2 py-1 rounded border border-primary bg-surface-container-lowest dark:bg-surface text-on-surface focus:ring-1 focus:ring-primary"
                      placeholder="Display Name"
                    />
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleSaveName}
                        disabled={isSavingName}
                        className="text-[11px] px-2 py-0.5 rounded bg-primary text-on-primary font-medium hover:bg-primary-container"
                      >
                        {isSavingName ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setFullName(profile?.full_name || 'Alex Morgan');
                          setIsEditingName(false);
                        }}
                        className="text-[11px] px-2 py-0.5 text-outline hover:text-on-surface"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg font-medium text-on-surface truncate">{fullName}</h2>
                    <p className="text-xs text-on-surface-variant truncate">{displayEmail}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingName(true)}
                        className="text-[11px] text-primary dark:text-inverse-primary hover:underline min-h-[36px] flex items-center"
                      >
                        Update name
                      </button>
                      <span className="text-outline-variant text-[10px]">•</span>
                      <span className="text-[11px] text-outline">Auth Managed</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-4 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Joined Sanctuary</span>
                <span className="font-medium text-on-surface">{joinedDate}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Membership Tier</span>
                <span className="font-medium text-secondary dark:text-inverse-primary">Serene Lifelong (Ad-free)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Data Residency</span>
                <span className="font-medium text-on-surface">Local Client Perimeter (AES-256)</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-outline-variant/20">
            <button
              type="button"
              onClick={openLogoutModal}
              className="w-full py-2.5 px-3 text-xs font-medium text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary rounded-lg border border-outline-variant/40 dark:border-outline/20 hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>End Active Session</span>
            </button>
          </div>
        </div>

        {/* Center & Right: Current Stage & Composure Metrics Bento */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-medium text-on-surface-variant uppercase tracking-wider">
                  Recovery Milestone
                </span>
                <h3 className="text-base font-medium text-on-surface mt-0.5">
                  Stage {profile?.current_stage_id || 2} — Awareness &amp; Control
                </h3>
              </div>
              <span className="text-xs text-primary dark:text-inverse-primary font-medium bg-primary-fixed/40 dark:bg-primary-container/40 px-2.5 py-1 rounded-md">
                {profile?.xp || 1240} Total XP
              </span>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed mb-6">
              You are steadily transitioning from reactive impulse mitigation into proactive attention architecture. Noticeable reduction in impulsive phone unlocking during deep-work blocks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-surface-container-low dark:bg-surface p-3.5 rounded-lg border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block mb-1">Mindful Rhythm</span>
                <span className="text-lg font-medium text-primary dark:text-inverse-primary">
                  {profile?.streak_days || 18} Days
                </span>
                <span className="text-[11px] text-secondary dark:text-inverse-primary block mt-0.5">
                  Continuous continuity
                </span>
              </div>

              <div className="bg-surface-container-low dark:bg-surface p-3.5 rounded-lg border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block mb-1">Recovery Score</span>
                <span className="text-lg font-medium text-on-surface">
                  {profile?.mindspace_score || 78} <span className="text-xs font-normal text-on-surface-variant">/ 100</span>
                </span>
                <span className="text-[11px] text-secondary dark:text-inverse-primary block mt-0.5">
                  +4 pts this week
                </span>
              </div>

              <div className="bg-surface-container-low dark:bg-surface p-3.5 rounded-lg border border-outline-variant/20">
                <span className="text-[11px] text-on-surface-variant block mb-1">Banked Freezes</span>
                <span className="text-lg font-medium text-on-surface">
                  {profile?.freezes_remaining || 2} Pauses
                </span>
                <span className="text-[11px] text-on-surface-variant block mt-0.5">Protected peace</span>
              </div>
            </div>

            {/* Gentle Progress Bar */}
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-on-surface-variant">Progression to Stage 3 (Focus Deepening)</span>
                <span className="font-medium text-primary dark:text-inverse-primary">74%</span>
              </div>
              <div className="w-full h-2 bg-surface-container-high dark:bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary dark:bg-inverse-primary rounded-full transition-all duration-500"
                  style={{ width: '74%' }}
                />
              </div>
            </div>
          </div>

          {/* Account Security & Devices */}
          <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-on-surface">Security &amp; Local Perimeter</h3>
              <span className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                Passkey enabled
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">laptop_mac</span>
                  <div>
                    <div className="font-medium text-on-surface">MacBook Pro 14" — macOS Sequoia</div>
                    <div className="text-[11px] text-on-surface-variant">
                      Last active: Today, 8:15 AM • Sanctuary App (Current Client)
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-secondary font-medium px-2 py-0.5 bg-secondary-container/40 rounded">
                  This Device
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-outline">smartphone</span>
                  <div>
                    <div className="font-medium text-on-surface">iPhone 15 Pro — iOS 18</div>
                    <div className="text-[11px] text-on-surface-variant">
                      Last synced: Yesterday, 10:45 PM • Local Peer Sync
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Peer sync session revoked.', 'info')}
                  className="text-[11px] text-outline hover:text-error min-h-[36px] px-2 flex items-center"
                >
                  Revoke
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
