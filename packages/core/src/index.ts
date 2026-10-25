// ─── WEAION Core Engine ──────────────────────────────────────────────────────
// Public API for the Delulu Detector skill system.

export * from "./types.js";
export * from "./triggers.js";
export * from "./scorer.js";
export * from "./modes.js";
export * from "./output.js";

import { DeluluInput, DeluluResult, DeluluScore, DEFAULT_CONFIG } from "./types.js";
import { calculateScore } from "./scorer.js";
import { detectType } from "./scorer.js";
import { detectMode } from "./modes.js";
import { scoreToLabel } from "./scorer.js";
import { buildResult } from "./output.js";

// ─── Main Entry Point ────────────────────────────────────────────────────────

export function analyze(input: DeluluInput): DeluluResult {
  const startTime = Date.now();
  const mode = detectMode(input);
  const { score, triggers, isCrisis } = calculateScore(input);
  const type = detectType(input.text);
  const label = scoreToLabel(score);

  // Crisis override
  const effectiveMode = isCrisis ? "crisis" : mode;

  // For crisis mode, score is 0 (not applicable)
  const finalScore: DeluluScore = isCrisis ? 0 : score;

  return buildResult({
    score: finalScore,
    label: isCrisis ? "Locked In" : label,
    type: isCrisis ? "General Delulu" : type,
    verdict: "", // To be filled by the skill/LLM layer
    screenshotLine: "", // To be filled by the skill/LLM layer
    realityCheck: isCrisis
      ? "This isn't delulu. This is something else. Please reach out to someone you trust or a crisis line."
      : "",
    nextStep: isCrisis
      ? "Call or text 988 (Suicide & Crisis Lifeline) or your local emergency number."
      : "",
    triggers,
    mode: effectiveMode,
    inputLength: input.text.length,
    processingTimeMs: Date.now() - startTime,
  });
}

export function createAnalyzer(config = DEFAULT_CONFIG) {
  return {
    analyze: (input: DeluluInput) => analyze(input),
    config,
  };
}