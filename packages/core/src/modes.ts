import { SkillMode, DeluluInput } from "./types.js";

// ─── Mode Detection ──────────────────────────────────────────────────────────

export function detectMode(input: DeluluInput): SkillMode {
  if (input.mode) return input.mode;

  const text = input.text.toLowerCase();

  // Crisis keywords take priority
  const crisisWords = ["suicide", "kill myself", "self-harm", "abuse", "assault"];
  if (crisisWords.some((w) => text.includes(w))) return "crisis";

  // Prevention mode: asking before doing
  const preventionPatterns = [
    "should i",
    "thinking about",
    "going to",
    "planning to",
    "about to",
    "rate my plan",
    "before i",
  ];
  if (preventionPatterns.some((p) => text.includes(p))) return "prevention";

  // Re-rate mode: coming back after action
  const reratePatterns = [
    "re-rate",
    "rerate",
    "i did the thing",
    "i did it",
    "update",
    "came back",
    "after",
  ];
  if (reratePatterns.some((p) => text.includes(p))) return "rerate";

  // Group chat mode: rating for someone else
  const groupPatterns = [
    "my friend",
    "my sister",
    "my brother",
    "rate this for",
    "rate her",
    "rate him",
    "for my",
  ];
  if (groupPatterns.some((p) => text.includes(p))) return "groupchat";

  return "standard";
}

export function getModeDescription(mode: SkillMode): string {
  const descriptions: Record<SkillMode, string> = {
    standard: "Standard rating mode",
    prevention: "Prevention mode — rating before acting",
    rerate: "Re-rate mode — checking progress after action",
    groupchat: "Group chat mode — rating for someone else",
    crisis: "Crisis mode — humor disabled, resources provided",
  };
  return descriptions[mode];
}

export function getModeInstructions(mode: SkillMode): string {
  const instructions: Record<SkillMode, string> = {
    standard: "Rate the situation as-is. Give verdict, screenshot line, reality check, and next step.",
    prevention:
      "The user hasn't acted yet. Rate the PLAN. Next step should be 'do it' or 'don't do it' with a clear reason.",
    rerate:
      "The user took action since last time. Compare before/after. Acknowledge growth or call out backsliding.",
    groupchat:
      "Rating for someone else. Address verdict to the user (giving them ammo). Screenshot line should be shareable to the friend.",
    crisis:
      "Drop humor entirely. Be direct, kind, provide resources. No scoring, no screenshot line.",
  };
  return instructions[mode];
}