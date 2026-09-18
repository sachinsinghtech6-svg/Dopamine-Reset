import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Checkbox } from '../components/ui/Checkbox';
import { Radio } from '../components/ui/Radio';
import { Switch } from '../components/ui/Switch';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Progress } from '../components/ui/Progress';
import { Tooltip } from '../components/ui/Tooltip';
import { Modal } from '../components/ui/Modal';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { ErrorState } from '../components/ui/ErrorState';
import { Brandmark } from '../components/ui/Brandmark';
import { useToast } from '@/context/ToastContext';

export const DesignSystemShowcase: React.FC = () => {
  const { showToast } = useToast();

  const [viewportWidth, setViewportWidth] = useState<'100%' | '1440px' | '1200px' | '768px' | '375px'>('100%');
  const [modalOpen, setModalOpen] = useState(false);
  const [switchVal, setSwitchVal] = useState(true);
  const [checkboxVal, setCheckboxVal] = useState(true);
  const [radioVal, setRadioVal] = useState('mindful');
  const [progressVal, setProgressVal] = useState(65);

  const colors = [
    { name: 'Primary Sage', hex: '#134235', role: 'Main calming brand accent' },
    { name: 'Primary Container', hex: '#2d5a4c', role: 'Deep sage focus surface' },
    { name: 'Secondary Forest', hex: '#2b6957', role: 'Subtle interactive states' },
    { name: 'Secondary Container', hex: '#b0f0d8', role: 'Calm restorative badge fill' },
    { name: 'Tertiary Container', hex: '#44564e', role: 'Muted structural element' },
    { name: 'Eucalyptus Success', hex: '#4a7c59', role: 'Attuned natural feedback' },
    { name: 'Warm Amber Warning', hex: '#c28b47', role: 'Gentle caution signal' },
    { name: 'Terracotta Error', hex: '#ba1a1a', role: 'Non-punitive notification' },
    { name: 'Background Canvas', hex: '#f9f9fc', role: 'Light mode restful substrate' },
    { name: 'Dark Slate Background', hex: '#191b1d', role: 'Dark mode deep slate canvas' },
  ];

  return (
    <div className="space-y-12 animate-fadeIn max-w-6xl mx-auto w-full">
      {/* Header & Viewport Simulator Controller */}
      <div className="space-y-4 pb-6 border-b border-outline-variant/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="primary" size="sm">Stitch MCP Phase 1 Match</Badge>
              <span className="text-xs text-outline">Living Specification & QA Playground</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-on-surface">
              Dopamine Reset — Design System (Serene Reset)
            </h1>
            <p className="text-xs sm:text-sm text-outline mt-1 max-w-2xl">
              Warm minimalism, low cognitive load, anti-gamified visual foundation set exclusively in Geist and Material Symbols Outlined.
            </p>
          </div>

          {/* Viewport Simulation Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-xs self-start">
            <span className="px-2 py-1 text-outline font-medium">Viewport:</span>
            {(['100%', '1440px', '1200px', '768px', '375px'] as const).map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setViewportWidth(w)}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  viewportWidth === w
                    ? 'bg-surface-container-lowest dark:bg-surface text-primary dark:text-inverse-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {w === '100%' ? 'Full' : w}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Wrapper */}
      <div
        className="transition-all duration-300 mx-auto w-full space-y-12"
        style={{ maxWidth: viewportWidth }}
      >
        {/* Section 1: Brand & Philosophy */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">nature_people</span>
            Brand Philosophy & Identity
          </h2>
          <Card elevated className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Brandmark size="lg" />
              <p className="text-xs sm:text-sm text-outline leading-relaxed">
                A calm, restorative digital sanctuary designed to counteract overstimulation, cognitive fatigue, and fractured attention. Interfaces prioritize ample whitespace, breathable hierarchy, soft mineral surfaces, and zero artificial urgency triggers.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-medium text-on-surface block mb-1">Warm Minimalism</span>
                <span className="text-outline leading-snug">Neutral-first foundation without sterile whites or harsh contrasts.</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-medium text-on-surface block mb-1">Quiet Utility</span>
                <span className="text-outline leading-snug">Zero flashing timers, neon badges, or gamified stress loops.</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-medium text-on-surface block mb-1">Tonal Depth</span>
                <span className="text-outline leading-snug">Whisper ambient diffusion replaces aggressive drop shadows.</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-medium text-on-surface block mb-1">Accessible Flow</span>
                <span className="text-outline leading-snug">Comfortable 44px touch targets and full reduced-motion support.</span>
              </div>
            </div>
          </Card>
        </section>

        {/* Section 2: Color Palette Tokens */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">palette</span>
            Color Palette & Tokens
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {colors.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-3 space-y-2 shadow-2xs"
              >
                <div
                  className="w-full h-14 rounded-lg border border-black/5 shadow-inner"
                  style={{ backgroundColor: c.hex }}
                />
                <div className="text-xs leading-tight">
                  <span className="font-medium text-on-surface block truncate">{c.name}</span>
                  <span className="font-mono text-outline text-[11px]">{c.hex}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Typography Ladder */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">format_size</span>
            Geist Typography Scale
          </h2>
          <Card elevated className="p-6 divide-y divide-outline-variant/30">
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-outline w-32">display-lg (40px)</span>
              <span className="text-display-lg text-on-surface font-medium flex-1">Mindful Recovery</span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-outline w-32">headline-lg (28px)</span>
              <span className="text-headline-lg text-on-surface font-medium flex-1">Reclaim Attention Sovereignty</span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-outline w-32">headline-md (22px)</span>
              <span className="text-headline-md text-on-surface font-medium flex-1">Conscious Equilibrium & Calm Focus</span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-outline w-32">body-lg (17px)</span>
              <span className="text-body-lg text-on-surface flex-1">
                Observe the urge without reaction. Let the impulse settle through deep breathing pauses.
              </span>
            </div>
            <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <span className="text-[11px] font-mono text-outline w-32">body-sm (13px)</span>
              <span className="text-body-sm text-outline flex-1">
                Secondary supportive context and metadata metrics tuned for readability.
              </span>
            </div>
          </Card>
        </section>

        {/* Section 4: Interactive UI Primitives */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">widgets</span>
            Interactive UI Primitives
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons & Actions */}
            <Card elevated className="p-6 space-y-5">
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider text-outline">
                Buttons & Action States
              </h3>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" onClick={() => showToast('Primary button triggered', 'info')}>
                  Primary Action
                </Button>
                <Button variant="secondary" onClick={() => showToast('Secondary button triggered', 'info')}>
                  Secondary
                </Button>
                <Button variant="outline" onClick={() => showToast('Outline button triggered', 'info')}>
                  Outline
                </Button>
                <Button variant="ghost" onClick={() => showToast('Ghost button triggered', 'info')}>
                  Ghost
                </Button>
                <Button variant="danger" size="sm" onClick={() => showToast('Danger action initiated', 'error')}>
                  Danger
                </Button>
                <Button variant="primary" size="icon" icon="spa" aria-label="Calm action" />
                <Button variant="primary" loading>
                  Loading
                </Button>
              </div>

              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-xs text-outline">Modal & Dialog Overlay:</span>
                <Button variant="outline" size="sm" icon="open_in_new" onClick={() => setModalOpen(true)}>
                  Launch Test Modal
                </Button>
              </div>
            </Card>

            {/* Inputs & Form Controls */}
            <Card elevated className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider text-outline">
                Form & Input Primitives
              </h3>
              <Input
                label="Quiet Focus Target"
                placeholder="e.g. Read 20 pages without checking phone"
                icon="check_circle"
                helperText="Form fields feature comfortable 44px mobile touch targets."
              />
              <Input
                label="Protected Credential"
                type="password"
                placeholder="Password input with reveal"
              />
              <Select
                label="Notification Cadence"
                options={[
                  { value: 'quiet', label: 'Quiet (Morning & Evening only)' },
                  { value: 'hourly', label: 'Hourly Gentle Pulse' },
                  { value: 'silent', label: 'Completely Silent Sanctuary' },
                ]}
              />
              <Textarea
                label="Mindful Intention Reflection (Quiet Mode)"
                quiet
                rows={2}
                placeholder="Observe impulse without reaction..."
              />
            </Card>

            {/* Selection Controls */}
            <Card elevated className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider text-outline">
                Selection & Toggles
              </h3>
              <div className="space-y-2">
                <Checkbox
                  label="Attentive Morning Protocol"
                  description="No screen interaction for 45 minutes after waking."
                  checked={checkboxVal}
                  onChange={(e) => setCheckboxVal(e.target.checked)}
                />
                <Radio
                  name="reflection-mode"
                  label="Mindful Non-Punitive Mode"
                  description="Focus on positive progress rather than broken streaks."
                  checked={radioVal === 'mindful'}
                  onChange={() => setRadioVal('mindful')}
                />
                <Radio
                  name="reflection-mode"
                  label="Deep Digital Sabbath"
                  description="Full 24-hour periodic disconnect."
                  checked={radioVal === 'sabbath'}
                  onChange={() => setRadioVal('sabbath')}
                />
                <Switch
                  label="Ambient Whisper Mode"
                  description="Subdued color schemes with soft transitions."
                  checked={switchVal}
                  onChange={setSwitchVal}
                />
              </div>
            </Card>

            {/* Badges, Avatars & Progress */}
            <Card elevated className="p-6 space-y-4">
              <h3 className="text-sm font-semibold text-on-surface uppercase tracking-wider text-outline">
                Badges, Tooltips & Progress
              </h3>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge variant="primary" icon="spa">Calm</Badge>
                <Badge variant="success" icon="check">Restored</Badge>
                <Badge variant="warning" icon="schedule">Impulse</Badge>
                <Badge variant="error" icon="priority_high">Tension</Badge>
                <Badge variant="secondary">Mineral</Badge>
                <Badge variant="default">Neutral</Badge>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <Avatar name="Serene Explorer" size="lg" />
                <Avatar name="Attention Reset" size="md" />
                <Avatar name="Guest User" size="sm" />
                <Tooltip content="Serene Reset is deliberately anti-gamified">
                  <Badge variant="primary" className="cursor-help">Hover for Tooltip</Badge>
                </Tooltip>
              </div>

              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between text-xs text-outline">
                  <span>Interactive Progress Bar:</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high"
                      onClick={() => setProgressVal((p) => Math.max(p - 10, 0))}
                    >
                      -10%
                    </button>
                    <button
                      type="button"
                      className="px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high"
                      onClick={() => setProgressVal((p) => Math.min(p + 10, 100))}
                    >
                      +10%
                    </button>
                  </div>
                </div>
                <Progress value={progressVal} showValue label="Dopamine baseline alignment" />
              </div>
            </Card>
          </div>
        </section>

        {/* Section 5: Loading, Empty & Error States */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">error_outline</span>
            Feedback, Loading & Empty States
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Skeleton Loading Card */}
            <Card elevated className="p-5 space-y-3">
              <span className="text-xs font-semibold text-outline uppercase tracking-wider block mb-2">
                Shimmer Loading Skeleton
              </span>
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" width={36} height={36} />
                <div className="space-y-1.5 flex-1">
                  <Skeleton variant="text" className="w-3/4" />
                  <Skeleton variant="text" className="w-1/2" />
                </div>
              </div>
              <Skeleton variant="rect" height={64} className="mt-2" />
            </Card>

            {/* Empty State Component */}
            <Card elevated className="p-5">
              <EmptyState
                icon="spa"
                title="No Urges Logged Today"
                description="Your dopamine baseline remains tranquil and undisturbed."
                actionLabel="Log First Reflection"
                onAction={() => showToast('Reflection flow initiated', 'success')}
              />
            </Card>

            {/* Error State Component */}
            <Card elevated className="p-5">
              <ErrorState
                title="Sync Temporarily Paused"
                message="Could not reach network node. Offline cache remains preserved."
                onRetry={() => showToast('Retrying synchronization...', 'info')}
              />
            </Card>
          </div>
        </section>
      </div>

      {/* Modal Demo */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Mindful Pause Block"
        description="Take three measured breaths before continuing this action."
      >
        <div className="space-y-3 py-2">
          <p className="text-xs text-on-surface-variant leading-relaxed">
            This accessible modal incorporates backdrop blur diffusion, focus containment, and escape key termination without jarring urgency animations.
          </p>
          <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">self_improvement</span>
            <div className="text-xs">
              <span className="font-medium text-on-surface block">Serene Pacing Principle</span>
              <span className="text-outline">Inhale for 4 seconds, hold for 4 seconds, exhale for 6 seconds.</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
