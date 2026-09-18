import React from 'react';
import { useSettings } from '@/context/SettingsContext';
import { useTheme } from '@/context/ThemeContext';

export const AppearanceSection: React.FC = () => {
  const { settings, updateAppearanceSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  const { appearance } = settings;

  const currentTheme = theme || appearance.theme;

  const handleSelectTheme = (selected: 'light' | 'dark' | 'system') => {
    setTheme(selected);
    updateAppearanceSettings({ theme: selected });
  };

  const getFontLabel = (val: number) => {
    if (val <= 15) return 'Small (15px)';
    if (val <= 17) return 'Default (17px)';
    if (val <= 19) return 'Comfortable (19px)';
    return 'Expanded (21px)';
  };

  return (
    <section className="space-y-6 animate-fadeIn" id="view-appearance">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visual Theme Selection */}
        <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 shadow-xs">
          <h3 className="text-base font-medium text-on-surface mb-1">Color Ambiance</h3>
          <p className="text-xs text-on-surface-variant mb-4">
            Low-stimulation palettes designed to minimize optical nerve fatigue.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {/* Daylight Sanctuary */}
            <button
              type="button"
              onClick={() => handleSelectTheme('light')}
              className={`theme-choice-btn p-3 rounded-lg text-left transition-all min-h-[44px] ${
                currentTheme === 'light'
                  ? 'border-2 border-primary dark:border-inverse-primary bg-background shadow-xs'
                  : 'border border-outline-variant/40 dark:border-outline/20 bg-surface-container-lowest hover:bg-surface-container-low'
              }`}
            >
              <div className="w-full h-12 rounded bg-surface-container border border-outline-variant/30 mb-2 flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-primary" />
              </div>
              <span className="block text-xs font-medium text-on-surface">Daylight</span>
              <span className="text-[10px] text-on-surface-variant">Serene #f9f9fc</span>
            </button>

            {/* Midnight Rest */}
            <button
              type="button"
              onClick={() => handleSelectTheme('dark')}
              className={`theme-choice-btn p-3 rounded-lg text-left transition-all min-h-[44px] ${
                currentTheme === 'dark'
                  ? 'border-2 border-primary dark:border-inverse-primary bg-inverse-surface shadow-xs'
                  : 'border border-outline-variant/40 dark:border-outline/20 bg-inverse-surface hover:opacity-90'
              }`}
            >
              <div className="w-full h-12 rounded bg-inverse-surface/80 border border-outline/30 mb-2 flex items-center justify-center">
                <span className="w-3.5 h-3.5 rounded-full bg-secondary-fixed" />
              </div>
              <span className="block text-xs font-medium text-inverse-on-surface">Midnight</span>
              <span className="text-[10px] text-outline-variant">Deep #16181a</span>
            </button>

            {/* System Sync */}
            <button
              type="button"
              onClick={() => handleSelectTheme('system')}
              className={`theme-choice-btn p-3 rounded-lg text-left transition-all min-h-[44px] ${
                currentTheme === 'system'
                  ? 'border-2 border-primary dark:border-inverse-primary bg-surface-container-low dark:bg-surface shadow-xs'
                  : 'border border-outline-variant/40 dark:border-outline/20 bg-surface-container-low hover:bg-surface-container'
              }`}
            >
              <div className="w-full h-12 rounded bg-surface-container-high dark:bg-surface-container-highest border border-outline-variant/30 mb-2 flex items-center justify-center">
                <span className="material-symbols-outlined text-sm text-outline">devices</span>
              </div>
              <span className="block text-xs font-medium text-on-surface">Match OS</span>
              <span className="text-[10px] text-on-surface-variant">Automated</span>
            </button>
          </div>
        </div>

        {/* Sensory & Accessibility Controls */}
        <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 space-y-4 shadow-xs">
          <h3 className="text-base font-medium text-on-surface">Sensory Comfort &amp; Accessibility</h3>

          <div className="space-y-3 divide-y divide-outline-variant/20 text-xs">
            <label className="pt-2 flex items-center justify-between cursor-pointer min-h-[44px]">
              <div>
                <span className="font-medium text-on-surface block">Reduced Motion</span>
                <span className="text-[11px] text-on-surface-variant">
                  Disables ambient pulses and fluid tab transitions.
                </span>
              </div>
              <input
                type="checkbox"
                checked={appearance.reducedMotion}
                onChange={(e) => updateAppearanceSettings({ reducedMotion: e.target.checked })}
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
              />
            </label>

            <label className="pt-3 flex items-center justify-between cursor-pointer min-h-[44px]">
              <div>
                <span className="font-medium text-on-surface block">High Contrast Grayscale</span>
                <span className="text-[11px] text-on-surface-variant">
                  Increases stroke thickness and meets WCAG AAA standards.
                </span>
              </div>
              <input
                type="checkbox"
                checked={appearance.highContrast}
                onChange={(e) => updateAppearanceSettings({ highContrast: e.target.checked })}
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
              />
            </label>

            <label className="pt-3 flex items-center justify-between cursor-pointer min-h-[44px]">
              <div>
                <span className="font-medium text-on-surface block">Screen Reader Semantic Labels</span>
                <span className="text-[11px] text-on-surface-variant">
                  Expanded aria descriptors for screen reading tools.
                </span>
              </div>
              <input
                type="checkbox"
                checked={appearance.screenReaderLabels}
                onChange={(e) => updateAppearanceSettings({ screenReaderLabels: e.target.checked })}
                className="rounded border-outline-variant text-primary focus:ring-primary h-4 w-4"
              />
            </label>
          </div>

          {/* Typography Size Slider */}
          <div className="pt-4 border-t border-outline-variant/20">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-medium text-on-surface">Reading Typography Scale</span>
              <span className="text-on-surface-variant font-medium" id="fontScaleLabel">
                {getFontLabel(appearance.fontScale)}
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="21"
              step="2"
              value={appearance.fontScale}
              onChange={(e) => updateAppearanceSettings({ fontScale: Number(e.target.value) })}
              className="w-full h-1.5 bg-surface-container-high dark:bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary dark:accent-inverse-primary"
              aria-label="Reading Typography Scale Slider"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
