import React, { createContext, useContext, useState } from 'react';
import type {
  CoachMessage,
  CoachPrivacySettings,
  RecoveryContextInfo,
  CoachExperiment,
} from '@/types/analytics';
import { useAuth } from './AuthContext';

interface CoachContextType {
  messages: CoachMessage[];
  isThinking: boolean;
  privacySettings: CoachPrivacySettings;
  recoveryContext: RecoveryContextInfo;
  updatePrivacySettings: (settings: Partial<CoachPrivacySettings>) => void;
  sendMessage: (text: string) => Promise<void>;
  commitExperiment: (experimentId: string) => void;
  clearSession: () => void;
}

const INITIAL_EXPERIMENT: CoachExperiment = {
  id: 'exp-1',
  title: 'Suggested Micro-Experiment for Tonight:',
  description:
    '"Before touching your phone after 8:00 PM, wait exactly 5 intentional minutes. Place both feet firmly on the floor, inhale for 4 seconds, exhale for 6 seconds. If you still choose to open the app afterward, do so with conscious permission."',
  committed: false,
};

const INITIAL_MESSAGES: CoachMessage[] = [
  {
    id: 'msg-1',
    sender: 'ai',
    text: "Welcome back. Looking at your 7-day pattern, your overall screen time has decreased by 18%, though you noticed a habitual reflex around 8:00 PM yesterday.\n\nThat pattern makes complete sense. When cognitive stamina wears thin after a day's work, seeking low-effort stimulation is natural human adaptation—not a failure of discipline.",
    timestamp: '10:42 AM',
    categoryTag: 'Non-judgmental Observation',
    experiment: INITIAL_EXPERIMENT,
  },
  {
    id: 'msg-2',
    sender: 'user',
    text: "I often feel like if I slip up at 8 PM, the whole week's progress is ruined.",
    timestamp: '10:44 AM',
  },
  {
    id: 'msg-3',
    sender: 'ai',
    text: 'Limit exceeded ≠ recovery failure.\n\nNeuroplasticity is iterative. A single reflex does not erase 18 days of rewiring your dopamine pathways. You noticed it—that act of noticing is the exact muscle we are building.',
    timestamp: '10:45 AM',
    categoryTag: 'Cognitive Reframing',
  },
];

const CoachContext = createContext<CoachContextType | undefined>(undefined);

export const CoachProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<CoachMessage[]>(INITIAL_MESSAGES);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [privacySettings, setPrivacySettings] = useState<CoachPrivacySettings>({
    includeDailyAnalytics: true,
    shareJournalEntries: false,
    localMemoryPurgeOnExit: true,
  });

  const recoveryContext: RecoveryContextInfo = {
    phase: profile?.stage || 'Stage 1: Awareness',
    streakDays: profile?.streak_days || 18,
    cognitiveScore: profile?.mindspace_score || 78,
    primaryObjective: profile?.primary_goal || 'Improve Deep Focus',
    dominantTrigger: 'Boredom at 8:00 PM',
  };

  const updatePrivacySettings = (settings: Partial<CoachPrivacySettings>) => {
    setPrivacySettings((prev) => ({ ...prev, ...settings }));
  };

  const commitExperiment = (experimentId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.experiment && msg.experiment.id === experimentId) {
          return {
            ...msg,
            experiment: { ...msg.experiment, committed: true },
          };
        }
        return msg;
      })
    );
  };

  const clearSession = () => {
    setMessages([]);
  };

  // Generate ACT (Acceptance and Commitment Theory) based response
  const generateACTResponse = (userInput: string): { text: string; tag: string; experiment?: CoachExperiment } => {
    const lower = userInput.toLowerCase();

    if (lower.includes('journal reflection:') || lower.includes('sharing my journal')) {
      return {
        text: 'Thank you for sharing this with presence. Notice how simply putting language to the urge creates a gap between stimulus and automatic reaction.\n\nTonight, allow the boredom or tiredness to just exist in the room without trying to immediately fix or numb it. How does that feel to contemplate?',
        tag: 'Grounded Coaching',
      };
    }

    if (lower.includes('tired') || lower.includes('exhausted') || lower.includes('stimulation')) {
      return {
        text: "When executive function depletes, our nervous system searches for effortless dopamine to feel 'replenished.' It is not lack of willpower—it is physiological fatigue signaling a need for genuine non-screen rest, like closing your eyes or listening to ambient audio for 10 minutes.",
        tag: 'Compassionate Psychoeducation',
        experiment: {
          id: `exp-${Date.now()}`,
          title: 'Restorative Experiment:',
          description: 'Lie down flat on your back for 7 minutes with zero screens. Let your visual field soften into optic flow.',
          committed: false,
        },
      };
    }

    if (lower.includes('bedtime') || lower.includes('wind-down') || lower.includes('routine')) {
      return {
        text: "A peaceful wind-down isn't about rigid rules; it's about diminishing sensory bombardment. Consider creating a 'digital twilight': placing your phone on the charger at 9:00 PM and switching to a warm lamp with an analog book or quiet tea.",
        tag: 'Habit Architecture',
      };
    }

    if (lower.includes('right now') || lower.includes('instead of scrolling') || lower.includes('urge')) {
      return {
        text: "Right now in this moment: gently take your fingers off the screen. Roll your shoulders back twice, and look at the furthest physical object in your room for 15 seconds. Let your brain acknowledge that you are safe in physical space.",
        tag: 'Immediate Somatic Grounding',
      };
    }

    if (lower.includes('trigger') || lower.includes('8pm') || lower.includes('8:00')) {
      return {
        text: 'The 8:00 PM – 10:00 PM window represents the daily friction boundary between duty and decompression. Because you identified this pattern, you already took away its reflexive power. We can step through this window with gentle pacing rather than avoidance.',
        tag: 'Pattern Illumination',
      };
    }

    return {
      text: 'I hear you. Every moment of friction you observe without harsh judgment strengthens your neural sovereignty. What feels like the kindest next step for your mind right now?',
      tag: 'Mindful Inquiry',
    };
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: CoachMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    // Simulate thoughtful non-rushed reflection delay (600ms)
    setTimeout(() => {
      const response = generateACTResponse(text);
      const aiMsg: CoachMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        categoryTag: response.tag,
        experiment: response.experiment,
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <CoachContext.Provider
      value={{
        messages,
        isThinking,
        privacySettings,
        recoveryContext,
        updatePrivacySettings,
        sendMessage,
        commitExperiment,
        clearSession,
      }}
    >
      {children}
    </CoachContext.Provider>
  );
};

export const useCoach = (): CoachContextType => {
  const context = useContext(CoachContext);
  if (!context) {
    throw new Error('useCoach must be used within a CoachProvider');
  }
  return context;
};
