import React, { useState } from 'react';

export const EthicalManifestoBanner: React.FC = () => {
  const [showFullManifesto, setShowFullManifesto] = useState(false);

  return (
    <div className="mt-12 bg-surface-container-low dark:bg-surface-container border border-outline-variant/30 dark:border-outline/20 rounded-xl p-6 transition-colors">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-medium tracking-wider text-secondary dark:text-inverse-primary uppercase block">
            Ethical UX Manifesto
          </span>
          <h4 className="text-sm font-medium text-on-surface mt-0.5">
            "The ultimate success of Dopamine Reset is when you no longer need us."
          </h4>
          <p className="text-xs text-on-surface-variant mt-1">
            Awareness → Friction &amp; Control → Focus Building → Healthy Digital Habits → Complete Digital Independence.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-xs">
          <button
            type="button"
            onClick={() => setShowFullManifesto(!showFullManifesto)}
            className="text-primary dark:text-inverse-primary font-medium hover:underline min-h-[36px] flex items-center"
          >
            {showFullManifesto ? 'Collapse Manifesto' : 'Read Manifesto'}
          </button>
          <span className="text-outline-variant">•</span>
          <span className="text-on-surface-variant">Non-Proprietary &amp; Ad-Free</span>
        </div>
      </div>

      {showFullManifesto && (
        <div className="mt-4 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant leading-relaxed space-y-2 animate-fadeIn">
          <p>
            1. <strong>Zero Artificial Urgency:</strong> We never employ red notification badges, manipulative countdowns, or deceptive friction to demand your immediate attention.
          </p>
          <p>
            2. <strong>Permanent Cumulative Progress:</strong> Breaks and rested days never dock XP or demote your stage. Cognitive recovery is cumulative.
          </p>
          <p>
            3. <strong>Absolute Data Sovereignty:</strong> You own 100% of your reflections, timestamps, and metrics. We never sell or inspect private telemetry.
          </p>
        </div>
      )}
    </div>
  );
};
