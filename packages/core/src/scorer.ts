import {
  DeluluScore,
  DeluluLabel,
  DeluluType,
  DeluluInput,
  SkillConfig,
  DEFAULT_CONFIG,
} from "./types.js";
import { matchTriggers, calculateTriggerScore } from "./triggers.js";

// ─── Score → Label Mapping ───────────────────────────────────────────────────

const SCORE_LABELS: Record<number, DeluluLabel> = {
  0: "Locked In",
  1: "Slightly Optimistic",
  2: "Slightly Optimistic",
  3: "Hopium Overdose",
  4: "Hopium Overdose",
  5: "Delulu Activated",
  6: "Delulu Activated",
  7: "Full Delulu",
  8: "Full Delulu",
  9: "Astronomical Delulu",
  10: "Beyond Delulu",
};

export function scoreToLabel(score: number): DeluluLabel {
  const clamped = Math.max(0, Math.min(10, Math.round(score)));
  return SCORE_LABELS[clamped];
}

// ─── Type Detection ──────────────────────────────────────────────────────────

const TYPE_KEYWORDS: Record<DeluluType, string[]> = {
  "Situationship Delulu": [
    "relationship", "dating", "texting", "ex", "boyfriend", "girlfriend",
    "talking stage", "situationship", "exclusive", "ready",
  ],
  "Hustle Delulu": [
    "goals", "learn", "start", "build", "podcast", "side hustle",
    "full-time", "months", "weeks",
  ],
  "Financial Delulu": [
    "bought", "spend", "investment", "rent", "money", "afford",
    "credit card", "debt", "influencer",
  ],
  "Career Delulu": [
    "job", "career", "resume", "interview", "startup", "promotion",
    "salary", "potential",
  ],
  "Friendship Delulu": [
    "friend", "texted", "busy", "close", "ghosted", "ignored",
  ],
  "Fitness Delulu": [
    "gym", "workout", "diet", "meal prep", "run", "marathon",
    "exercise", "fitness",
  ],
  "Creative Delulu": [
    "idea", "startup", "viral", "unique", "exposure", "content",
    "audience", "followers",
  ],
  "General Delulu": [],
};

export function detectType(text: string): DeluluType {
  const lower = text.toLowerCase();
  let bestType: DeluluType = "General Delulu";
  let bestScore = 0;

  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (type === "General Delulu") continue;
    const matches = keywords.filter((kw) => lower.includes(kw)).length;
    if (matches > bestScore) {
      bestScore = matches;
      bestType = type as DeluluType;
    }
  }

  return bestType;
}

// ─── Crisis Detection ─────────────────────────────────────────────────────────

export function detectCrisis(
  text: string,
  config: SkillConfig = DEFAULT_CONFIG
): boolean {
  if (!config.enableCrisisDetection) return false;
  const lower = text.toLowerCase();
  return config.crisisKeywords.some((kw) => lower.includes(kw));
}

// ─── Score Calculation ───────────────────────────────────────────────────────

export function calculateScore(input: DeluluInput): {
  score: DeluluScore;
  triggers: string[];
  isCrisis: boolean;
} {
  const text = input.text;
  const triggers = matchTriggers(text);
  const triggerScore = calculateTriggerScore(triggers);
  const isCrisis = detectCrisis(text);

  // Base score from triggers, with heuristics
  let rawScore = triggerScore;

  // Boost for strong delulu indicators
  const lower = text.toLowerCase();
  if (lower.includes("basically") && lower.includes("together")) rawScore += 2;
  if (lower.includes("not ready") && lower.includes("together")) rawScore += 2;
  if (lower.includes("watched") && lower.includes("story")) rawScore += 1.5;

  // Cap at 10
  const finalScore = Math.min(10, Math.max(0, Math.round(rawScore))) as DeluluScore;

  return {
    score: finalScore,
    triggers,
    isCrisis,
  };
}