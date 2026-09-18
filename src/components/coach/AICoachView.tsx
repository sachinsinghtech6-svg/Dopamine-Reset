import React, { useState, useRef, useEffect } from 'react';
import { useCoach } from '@/context/CoachContext';

interface AICoachViewProps {
  initialPrompt?: string;
}

export const AICoachView: React.FC<AICoachViewProps> = ({ initialPrompt = '' }) => {
  const {
    messages,
    isThinking,
    privacySettings,
    recoveryContext,
    updatePrivacySettings,
    sendMessage,
    commitExperiment,
    clearSession,
  } = useCoach();

  const [inputVal, setInputVal] = useState<string>(initialPrompt);
  const streamEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInputVal(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    streamEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const handleSend = () => {
    if (!inputVal.trim() || isThinking) return;
    sendMessage(inputVal);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="space-y-8 animate-fadeIn" aria-label="AI Recovery Coach">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-medium text-on-surface">AI Recovery Coach</h1>
            <span className="text-xs px-2.5 py-0.5 rounded bg-surface-container-high dark:bg-tertiary-container text-outline font-normal">
              Non-directive • Safe Horizon
            </span>
          </div>
          <p className="text-xs md:text-sm text-on-surface-variant dark:text-outline mt-1">
            A compassionate mirror for cognitive loops. No artificial urgency, no clinical guilt.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-outline bg-surface-container-low dark:bg-surface px-3 py-1.5 rounded-lg border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Coach Active: Deep Calm Mode
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chat Conversation Canvas (2 Cols) */}
        <div className="lg:col-span-2 flex flex-col h-[640px] rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs overflow-hidden">
          {/* Conversation Header */}
          <div className="p-4 border-b border-outline-variant/30 dark:border-outline/20 flex items-center justify-between bg-surface-container-low/40 dark:bg-surface">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">psychology</span>
              </div>
              <div>
                <div className="text-xs font-medium text-on-surface">Calm Recovery Companion</div>
                <div className="text-[11px] text-outline">Grounded in Acceptance and Commitment Theory</div>
              </div>
            </div>
            <button
              type="button"
              onClick={clearSession}
              className="text-xs text-outline hover:text-primary dark:hover:text-inverse-primary min-h-[36px] transition-colors"
            >
              Clear Session
            </button>
          </div>

          {/* Dialogue Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5 text-sm custom-scrollbar" role="log" aria-live="polite">
            {messages.length === 0 ? (
              <div className="text-center py-16 text-xs text-outline space-y-2">
                <span className="material-symbols-outlined text-3xl">spa</span>
                <p>Dialogue session cleared. No conversation logs preserved.</p>
                <p className="text-[11px]">Type a note below whenever you need calm reflection.</p>
              </div>
            ) : (
              messages.map((msg) => {
                if (msg.sender === 'user') {
                  return (
                    <div key={msg.id} className="flex justify-end animate-fadeIn">
                      <div className="max-w-[80%] p-3.5 rounded-xl bg-primary text-on-primary text-xs leading-relaxed shadow-xs">
                        {msg.text}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="space-y-3 animate-fadeIn">
                    <div className="flex gap-3 max-w-[88%]">
                      <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5 text-xs">
                        <span className="material-symbols-outlined text-[14px]">psychology</span>
                      </div>
                      <div className="space-y-2">
                        <div className="p-4 rounded-xl bg-surface-container-low dark:bg-surface-container text-on-surface leading-relaxed border border-outline-variant/20 text-xs sm:text-sm whitespace-pre-line">
                          {msg.text}
                        </div>
                        {msg.categoryTag && (
                          <div className="text-[10px] text-outline px-1">
                            {msg.timestamp} • {msg.categoryTag}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Actionable Micro-Experiment Card */}
                    {msg.experiment && (
                      <div className="ml-10 max-w-[85%] p-4 rounded-xl bg-secondary-container/30 dark:bg-tertiary-container/40 border border-secondary-container text-xs space-y-2 animate-fadeIn">
                        <div className="flex items-center gap-2 font-medium text-secondary dark:text-inverse-primary">
                          <span className="material-symbols-outlined text-[16px]">nature_people</span>
                          <span>{msg.experiment.title}</span>
                        </div>
                        <p className="text-on-surface-variant dark:text-on-tertiary-container leading-normal">
                          {msg.experiment.description}
                        </p>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => commitExperiment(msg.experiment!.id)}
                            disabled={msg.experiment.committed}
                            className={`px-3 py-1 rounded text-[11px] font-medium transition-colors min-h-[32px] ${
                              msg.experiment.committed
                                ? 'bg-secondary text-on-secondary'
                                : 'bg-primary text-on-primary dark:bg-primary-fixed dark:text-on-primary-fixed hover:opacity-90'
                            }`}
                          >
                            {msg.experiment.committed ? '✓ Experiment Committed' : "I'll try this"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {isThinking && (
              <div className="flex gap-3 max-w-[80%] animate-pulse">
                <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/20 text-xs text-outline flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span>Reflecting calmly...</span>
                </div>
              </div>
            )}

            <div ref={streamEndRef} />
          </div>

          {/* Suggested Prompts / Chips */}
          <div className="px-4 py-2 border-t border-outline-variant/20 bg-surface-container-low/20 flex flex-wrap gap-2 text-xs">
            <span className="text-[11px] text-outline self-center">Ask:</span>
            <button
              type="button"
              onClick={() => sendMessage('Why do I crave stimulation most when I am tired?')}
              className="px-2.5 py-1 rounded-full bg-surface-container-low dark:bg-surface hover:bg-surface-container text-on-surface-variant dark:text-outline border border-outline-variant/30 transition-colors text-[11px] min-h-[30px]"
            >
              "Why crave stimulation when tired?"
            </button>
            <button
              type="button"
              onClick={() => sendMessage('Help me create a peaceful bedtime wind-down routine.')}
              className="px-2.5 py-1 rounded-full bg-surface-container-low dark:bg-surface hover:bg-surface-container text-on-surface-variant dark:text-outline border border-outline-variant/30 transition-colors text-[11px] min-h-[30px]"
            >
              "Help me design a peaceful wind-down routine"
            </button>
            <button
              type="button"
              onClick={() => sendMessage('What should I do right now instead of scrolling?')}
              className="px-2.5 py-1 rounded-full bg-surface-container-low dark:bg-surface hover:bg-surface-container text-on-surface-variant dark:text-outline border border-outline-variant/30 transition-colors text-[11px] min-h-[30px]"
            >
              "What to do right now instead of scrolling?"
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-outline-variant/30 dark:border-outline/20 flex items-center gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type what you are feeling or struggling with..."
              className="flex-1 px-4 py-2.5 bg-surface-container-low dark:bg-surface-container border border-outline-variant/40 dark:border-outline/20 rounded-lg text-xs text-on-surface placeholder:text-outline focus:ring-1 focus:ring-primary min-h-[44px]"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!inputVal.trim() || isThinking}
              className="px-4 py-2.5 rounded-lg bg-primary text-on-primary dark:bg-inverse-primary dark:text-primary text-xs font-medium hover:bg-primary-container transition-colors shrink-0 disabled:opacity-50 min-h-[44px]"
            >
              Send Note
            </button>
          </div>
        </div>

        {/* Right: Recovery Context & AI Privacy Panel (1 Col) */}
        <div className="space-y-6">
          {/* Recovery Context Panel */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
            <h3 className="text-sm md:text-base font-medium text-on-surface mb-1">
              Your Recovery Context
            </h3>
            <p className="text-xs text-outline mb-4">
              Grounded parameters shared with your local session
            </p>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-outline">Current Phase:</span>
                <span className="font-medium text-on-surface">{recoveryContext.phase}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-outline">Active Streak:</span>
                <span className="font-medium text-secondary">
                  Day {recoveryContext.streakDays} Mindful
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-outline">Cognitive Score:</span>
                <span className="font-medium text-on-surface">
                  {recoveryContext.cognitiveScore} / 100
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-outline-variant/20">
                <span className="text-outline">Primary Objective:</span>
                <span className="font-medium text-on-surface">
                  {recoveryContext.primaryObjective}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-outline">Dominant Trigger:</span>
                <span className="font-medium text-primary dark:text-inverse-primary">
                  {recoveryContext.dominantTrigger}
                </span>
              </div>
            </div>
          </div>

          {/* AI Data Controls & Granular Privacy Toggle */}
          <div className="p-6 rounded-xl bg-surface-container-lowest dark:bg-surface border border-outline-variant/30 dark:border-outline/20 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-secondary text-base">
                verified_user
              </span>
              <h3 className="text-sm md:text-base font-medium text-on-surface">
                Data Privacy Controls
              </h3>
            </div>
            <p className="text-xs text-outline mb-4">
              You maintain absolute authority over what context the model inspects.
            </p>
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-on-surface">Include Daily Analytics</div>
                  <div className="text-[11px] text-outline">Anonymous screen minutes</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.includeDailyAnalytics}
                  onChange={(e) =>
                    updatePrivacySettings({ includeDailyAnalytics: e.target.checked })
                  }
                  className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-on-surface">Share Private Journal Entries</div>
                  <div className="text-[11px] text-outline">Disabled by default</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.shareJournalEntries}
                  onChange={(e) =>
                    updatePrivacySettings({ shareJournalEntries: e.target.checked })
                  }
                  className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4"
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-on-surface">Local Memory Purge on Exit</div>
                  <div className="text-[11px] text-outline">Forget current dialogue session</div>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.localMemoryPurgeOnExit}
                  onChange={(e) =>
                    updatePrivacySettings({ localMemoryPurgeOnExit: e.target.checked })
                  }
                  className="rounded text-primary focus:ring-primary border-outline-variant w-4 h-4"
                />
              </div>
            </div>
          </div>

          {/* Setback Support Card */}
          <div className="p-5 rounded-xl bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 text-xs space-y-2">
            <div className="font-medium text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-700 text-sm">spa</span>
              <span>Setback First-Aid</span>
            </div>
            <p className="text-on-surface-variant dark:text-outline leading-relaxed">
              If you find yourself in a 2-hour loop right now: Gently lock the device, set it in
              another room, and drink one full glass of cold water.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
