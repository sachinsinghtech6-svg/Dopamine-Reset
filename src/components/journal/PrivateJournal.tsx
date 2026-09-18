import React, { useState } from 'react';
import { useJournal } from '@/context/JournalContext';
import { AIPermissionModal } from './AIPermissionModal';
import type { MoodClarity } from '@/types/analytics';

interface PrivateJournalProps {
  onReflectWithAi?: (content: string) => void;
}

const MOODS: { label: MoodClarity; emoji: string }[] = [
  { label: 'Great', emoji: '🌿' },
  { label: 'Good', emoji: '🌱' },
  { label: 'Okay', emoji: '🌾' },
  { label: 'Low', emoji: '🍂' },
  { label: 'Difficult', emoji: '🌑' },
];

const AVAILABLE_TAGS = [
  '#Boredom',
  '#EveningWalk',
  '#Focus',
  '#LateNightWork',
  '#PhysicalTiredness',
  '#Reading',
  '#Pacing',
];

export const PrivateJournal: React.FC<PrivateJournalProps> = ({ onReflectWithAi }) => {
  const { entries, saveEntry, loading } = useJournal();

  const [selectedMood, setSelectedMood] = useState<MoodClarity>('Okay');
  const [content, setContent] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['#Boredom', '#Focus']);
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<boolean>(false);
  const [showAllLogs, setShowAllLogs] = useState<boolean>(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const insertPrompt = (promptText: string) => {
    setContent((prev) => (prev ? `${prev}\n\n${promptText}\n` : `${promptText}\n`));
  };

  const handleSave = async () => {
    if (!content.trim()) return;

    await saveEntry({
      content,
      mood: selectedMood,
      tags: selectedTags,
      sharedWithAi: false,
    });

    setSaveStatus(true);
    setTimeout(() => {
      setSaveStatus(false);
    }, 2500);
  };

  const handleResetDraft = () => {
    setContent('');
    setSelectedMood('Okay');
    setSelectedTags(['#Boredom', '#Focus']);
  };

  const handleOpenAiConsent = () => {
    setShowConsentModal(true);
  };

  const handleConfirmAiConsent = async () => {
    setShowConsentModal(false);
    const reflectionText = content.trim() || 'Reflected on impulse trigger around 8:30 PM.';

    // Save with consent noted
    if (content.trim()) {
      await saveEntry({
        content,
        mood: selectedMood,
        tags: selectedTags,
        sharedWithAi: true,
      });
    }

    if (onReflectWithAi) {
      onReflectWithAi(reflectionText);
    }
  };

  const displayedEntries = showAllLogs ? entries : entries.slice(0, 3);

  return (
    <section className="space-y-8 animate-fadeIn" aria-label="Private Journal Sanctuary">
      {/* Header & Privacy Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-medium text-on-surface">Private Journal</h1>
            <span className="inline-flex items-center gap-1.5 text-xs text-primary dark:text-inverse-primary bg-primary-fixed/40 dark:bg-tertiary-container px-3 py-0.5 rounded-full font-medium">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Private to you - Never shared without explicit consent
            </span>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant dark:text-outline mt-1">
            Zero surveillance. Raw thoughts remain solely within your local device memory.
          </p>
        </div>
        <button
          type="button"
          onClick={handleResetDraft}
          className="text-xs text-outline hover:text-primary dark:hover:text-inverse-primary px-3 py-1.5 rounded-lg border border-outline-variant/30 min-h-[44px] transition-colors"
        >
          Reset Draft
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Reflection Form (2 Cols) */}
        <div className="lg:col-span-2 p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-on-surface">
              Today's Distraction-Free Reflection
            </div>
            <div className="text-xs text-outline">Stored in local isolated storage</div>
          </div>

          {/* Optional Prompts Helper */}
          <div className="space-y-2">
            <span className="text-xs text-outline">Need gentle inspiration?</span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  insertPrompt('What subtle emotion led to the reflexive grab today?')
                }
                className="text-xs px-2.5 py-1.5 rounded-lg bg-surface-container-low dark:bg-surface-container hover:bg-surface-container-high text-on-surface-variant dark:text-outline transition-colors text-left min-h-[36px]"
              >
                "What subtle emotion led to the reflexive grab today?"
              </button>
              <button
                type="button"
                onClick={() =>
                  insertPrompt('How did stepping away feel today?')
                }
                className="text-xs px-2.5 py-1.5 rounded-lg bg-surface-container-low dark:bg-surface-container hover:bg-surface-container-high text-on-surface-variant dark:text-outline transition-colors text-left min-h-[36px]"
              >
                "How did stepping away feel today?"
              </button>
            </div>
          </div>

          {/* Mood State Selector */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-2">
              How was your cognitive clarity today?
            </label>
            <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Cognitive Clarity Mood">
              {MOODS.map((m) => {
                const isSelected = selectedMood === m.label;
                return (
                  <button
                    key={m.label}
                    type="button"
                    onClick={() => setSelectedMood(m.label)}
                    className={`flex flex-col items-center py-2.5 px-2 rounded-lg text-xs transition-all min-h-[48px] ${
                      isSelected
                        ? 'border-2 border-primary dark:border-inverse-primary bg-primary-fixed/20 dark:bg-tertiary-container font-medium text-primary dark:text-inverse-primary shadow-xs'
                        : 'border border-outline-variant/40 hover:border-primary text-on-surface-variant dark:text-outline'
                    }`}
                  >
                    <span className="text-base mb-1">{m.emoji}</span>
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Freeform Text Area */}
          <div>
            <label
              htmlFor="journal-entry"
              className="block text-xs font-medium text-on-surface mb-1.5"
            >
              Write without evaluation or judgment:
            </label>
            <textarea
              id="journal-entry"
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="I noticed an impulse to open Instagram around 8:30 PM when the work proposal felt stuck. Instead of scrolling, I walked onto the balcony for 3 minutes..."
              className="w-full p-4 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 text-sm leading-relaxed text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Tag Chips Selection */}
          <div>
            <label className="block text-xs font-medium text-on-surface mb-2">
              Associate Context Tags:
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {AVAILABLE_TAGS.map((tag) => {
                const isActive = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1 rounded-full border text-xs transition-all min-h-[32px] ${
                      isActive
                        ? 'border-primary text-primary dark:text-inverse-primary bg-primary-fixed/30 dark:bg-tertiary-container font-medium'
                        : 'border-outline-variant/40 text-on-surface-variant dark:text-outline bg-surface-container-low dark:bg-surface-container hover:border-outline'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-outline-variant/30 dark:border-outline/20 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={!content.trim()}
                className="px-5 py-2 rounded-lg bg-primary text-on-primary dark:bg-inverse-primary dark:text-primary text-xs font-medium hover:bg-primary-container transition-colors disabled:opacity-50 min-h-[44px] shadow-xs"
              >
                Save to Local Vault
              </button>
              {saveStatus && (
                <span className="text-xs text-secondary flex items-center gap-1 animate-fadeIn">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Saved privately
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleOpenAiConsent}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container-high dark:bg-tertiary-container hover:bg-surface-container-highest text-primary dark:text-inverse-primary text-xs font-medium transition-colors min-h-[44px]"
            >
              <span className="material-symbols-outlined text-[16px]">psychology</span>
              <span>Reflect with AI</span>
              <span className="text-[10px] text-outline ml-1">(Requires Consent)</span>
            </button>
          </div>
        </div>

        {/* Recent Reflections History (1 Col) */}
        <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm md:text-base font-medium text-on-surface">Recent Reflections</h3>
            <span className="text-xs text-outline flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">lock</span>
              Encrypted
            </span>
          </div>

          {loading ? (
            <div className="space-y-3">
              <div className="h-20 bg-surface-container-low dark:bg-surface-container rounded-lg animate-pulse" />
              <div className="h-20 bg-surface-container-low dark:bg-surface-container rounded-lg animate-pulse" />
            </div>
          ) : (
            <div className="space-y-3">
              {displayedEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3.5 rounded-lg bg-surface-container-low dark:bg-surface-container border border-outline-variant/20 hover:border-outline-variant transition-colors"
                >
                  <div className="flex items-center justify-between text-xs text-outline mb-1.5">
                    <span className="font-medium text-on-surface">
                      {new Date(entry.created_at).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <span
                      className={`font-medium ${
                        entry.mood === 'Great' || entry.mood === 'Good'
                          ? 'text-secondary'
                          : entry.mood === 'Difficult'
                          ? 'text-error'
                          : 'text-outline'
                      }`}
                    >
                      {entry.clarity_level || `${entry.mood} Clarity`}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant dark:text-outline line-clamp-2">
                    "{entry.content}"
                  </p>
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {entry.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-outline bg-surface-container-highest/60 dark:bg-tertiary-container/40 px-2 py-0.5 rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {entries.length > 3 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAllLogs(!showAllLogs)}
                className="text-xs text-outline hover:text-primary dark:hover:text-inverse-primary font-medium min-h-[36px]"
              >
                {showAllLogs
                  ? 'Show Less'
                  : `View All ${entries.length} Archived Logs`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Explicit Consent Modal */}
      <AIPermissionModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onConfirm={handleConfirmAiConsent}
      />
    </section>
  );
};
