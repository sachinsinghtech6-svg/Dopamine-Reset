import React, { useState } from 'react';
import { useSettings } from '@/context/SettingsContext';

export const HelpSupportSection: React.FC = () => {
  const { openSupportModal } = useSettings();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const faqs = [
    {
      category: 'Recovery Stages',
      question: 'What happens if I miss a day or exceed my target?',
      answer:
        'Zero penalty. Recovery is cumulative and permanent. Your brain’s neurochemical adaptation does not disappear simply because you had a long day on a laptop. Our banked Streak Freezes preserve your continuity so you never feel punitive pressure.',
    },
    {
      category: 'Data Privacy',
      question: 'Is my journal truly private from everyone, including AI?',
      answer:
        'Yes. Stored locally with client-side AES-256 encryption. By default, our AI Coach perimeter switch has "Private Journal Reflections" disabled. Unless you manually toggle consent on an individual reflection, no algorithm ever parses your raw thoughts.',
    },
    {
      category: 'AI Ethics',
      question: "Why doesn't Dopamine Reset have social feeds or leaderboards?",
      answer:
        'Social comparison triggers social validation seeking, which is the exact neurological pathway dopamine addiction exploits. Our metric of success is the time you spend present in the physical world, not the time you spend comparing stats with strangers.',
    },
    {
      category: 'Getting Started',
      question: 'How do the 5 Recovery Stages unlock?',
      answer:
        'Stages represent gradual cognitive rewiring. Stage 1 focuses on noticing unconscious habits, Stage 2 introduces gentle friction windows, Stage 3 builds sustained deep-work stamina, Stage 4 integrates healthy daily digital boundaries, and Stage 5 is complete digital autonomy.',
    },
    {
      category: 'Streak Freezes',
      question: 'How are Banked Freezes replenished?',
      answer:
        'Freezes are naturally replenished every 7 days of conscious engagement. They protect your peace during vacations, illness, or high-stress work periods without resetting your continuity.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.category === activeFilter;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterChips = ['All', 'Getting Started', 'Recovery Stages', 'Streak Freezes', 'Data Privacy', 'AI Ethics'];

  return (
    <section className="space-y-6 animate-fadeIn" id="view-help">
      {/* Searchable Knowledge Header */}
      <div className="bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 text-center max-w-3xl mx-auto shadow-xs">
        <span className="w-10 h-10 rounded-full bg-surface-container-low dark:bg-surface text-primary dark:text-inverse-primary flex items-center justify-center mx-auto mb-3">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            help_center
          </span>
        </span>
        <h3 className="text-lg font-medium text-on-surface">How can we support your reset?</h3>
        <p className="text-xs text-on-surface-variant mt-1 mb-4">
          Quiet explanations of our philosophy, mechanisms, and recovery milestones.
        </p>

        <div className="relative max-w-md mx-auto">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-base" aria-hidden="true">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search answers, stages, privacy guarantees..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-outline-variant/40 dark:border-outline/20 bg-surface-container-low dark:bg-surface text-on-surface focus:bg-surface-container-lowest focus:border-primary focus:ring-0 placeholder:text-outline"
          />
        </div>

        {/* Quick Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {filterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => setActiveFilter(chip)}
              className={`px-3 py-1 rounded-full text-[11px] transition-colors min-h-[32px] ${
                activeFilter === chip
                  ? 'bg-primary dark:bg-inverse-primary text-on-primary dark:text-primary font-medium'
                  : 'bg-surface-container hover:bg-surface-container-high dark:bg-surface text-on-surface-variant'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq) => (
          <details
            key={faq.question}
            className="group bg-surface-container-lowest dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-4 [&_summary::-webkit-details-marker]:hidden shadow-xs"
          >
            <summary className="flex items-center justify-between cursor-pointer text-xs font-medium text-on-surface select-none">
              <span>{faq.question}</span>
              <span className="material-symbols-outlined text-outline text-sm transition-transform group-open:rotate-180" aria-hidden="true">
                expand_more
              </span>
            </summary>
            <p className="mt-3 text-xs text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
              {faq.answer}
            </p>
          </details>
        ))}

        {filteredFaqs.length === 0 && (
          <div className="p-6 text-center text-xs text-outline bg-surface-container-low rounded-xl">
            No matching guidance found. Feel free to submit an inquiry below.
          </div>
        )}

        {/* Direct Support Ticket Trigger */}
        <div className="pt-4 text-center">
          <span className="text-xs text-on-surface-variant">
            Need to talk to our human ethics and support team?
          </span>
          <button
            type="button"
            onClick={openSupportModal}
            className="ml-2 text-xs text-primary dark:text-inverse-primary font-medium hover:underline min-h-[44px] inline-flex items-center"
          >
            Submit a Compassionate Inquiry
          </button>
        </div>
      </div>
    </section>
  );
};
