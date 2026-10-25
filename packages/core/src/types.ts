// ─── Core Types ───────────────────────────────────────────────────────────────

export type DeluluScore = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type DeluluLabel =
  | "Locked In"
  | "Slightly Optimistic"
  | "Hopium Overdose"
  | "Delulu Activated"
  | "Full Delulu"
  | "Astronomical Delulu"
  | "Beyond Delulu";

export type DeluluType =
  | "Situationship Delulu"
  | "Hustle Delulu"
  | "Financial Delulu"
  | "Career Delulu"
  | "Friendship Delulu"
  | "Fitness Delulu"
  | "Creative Delulu"
  | "General Delulu";

export type SkillMode =
  | "standard"
  | "prevention"
  | "rerate"
  | "groupchat"
  | "crisis";

export interface DeluluTrigger {
  id: string;
  pattern: string;
  description: string;
  weight: number; // 0-1, how much this trigger contributes to score
}

export interface DeluluInput {
  text: string;
  mode?: SkillMode;
  context?: Record<string, string>;
  previousScore?: DeluluScore;
}

export interface DeluluResult {
  score: DeluluScore;
  label: DeluluLabel;
  type: DeluluType;
  verdict: string;
  screenshotLine: string;
  realityCheck: string;
  nextStep: string;
  triggers: string[]; // IDs of matched triggers
  mode: SkillMode;
  timestamp: string;
  metadata: {
    inputLength: number;
    processingTimeMs: number;
    version: string;
  };
}

export interface SkillConfig {
  maxSlangPerResponse: number;
  maxEmojiCount: number;
  maxScreenshotLineWords: number;
  maxVerdictSentences: number;
  enableCrisisDetection: boolean;
  crisisKeywords: string[];
}

export const DEFAULT_CONFIG: SkillConfig = {
  maxSlangPerResponse: 2,
  maxEmojiCount: 2,
  maxScreenshotLineWords: 20,
  maxVerdictSentences: 4,
  enableCrisisDetection: true,
  crisisKeywords: [
    "suicide",
    "kill myself",
    "self-harm",
    "abuse",
    "domestic violence",
    "rape",
    "assault",
  ],
};

export const VERSION = "1.0.0";