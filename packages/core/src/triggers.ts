import { DeluluTrigger } from "./types.js";

// ─── Delulu Trigger Library ──────────────────────────────────────────────────
// These are the recurring patterns that indicate delulu. Each trigger has a
// weight (0-1) that contributes to the final score.

export const TRIGGERS: DeluluTrigger[] = [
  {
    id: "words_over_actions",
    pattern: "but he said",
    description: "Someone's words overrode their actions. Actions > words.",
    weight: 0.3,
  },
  {
    id: "future_self_lie",
    pattern: "i'll start monday",
    description: "Future self is always more disciplined. It's a lie.",
    weight: 0.25,
  },
  {
    id: "investment_reframe",
    pattern: "it's an investment",
    description: "Spending money you don't have on something that won't pay you back.",
    weight: 0.2,
  },
  {
    id: "busy_excuse",
    pattern: "they're just busy",
    description: "Busy people still send memes. Silence is a message.",
    weight: 0.25,
  },
  {
    id: "nobody_done_before",
    pattern: "nobody has done this before",
    description: "Usually means nobody wanted to, or someone tried and failed.",
    weight: 0.2,
  },
  {
    id: "exposure_myth",
    pattern: "i just need exposure",
    description: "Exposure doesn't pay rent.",
    weight: 0.15,
  },
  {
    id: "basically_together",
    pattern: "we're basically together",
    description: "If you have to say 'basically,' you're not.",
    weight: 0.35,
  },
  {
    id: "do_it_all_at_once",
    pattern: "i'll do it all at once",
    description: "You won't. You never do.",
    weight: 0.25,
  },
  {
    id: "potential_myth",
    pattern: "they'll see my potential",
    description: "They won't. They see your resume.",
    weight: 0.2,
  },
  {
    id: "different_this_time",
    pattern: "it's different this time",
    description: "It's not. It's the same thing with better lighting.",
    weight: 0.3,
  },
  {
    id: "story_views_love",
    pattern: "watched my story",
    description: "Story views are not a love language. They're an algorithm.",
    weight: 0.3,
  },
  {
    id: "not_ready_but",
    pattern: "not ready",
    description: "They said the words. Believe them.",
    weight: 0.35,
  },
  {
    id: "uber_for_x",
    pattern: "the next uber",
    description: "'The next Uber' is a phrase that should be retired.",
    weight: 0.15,
  },
  {
    id: "influencer_said",
    pattern: "the influencer said",
    description: "The influencer got a commission. You got a receipt.",
    weight: 0.2,
  },
  {
    id: "self_deprecating_fishing",
    pattern: "i'm so delusional",
    description: "Fishing for validation disguised as self-awareness.",
    weight: 0.1,
  },
];

export function matchTriggers(text: string): string[] {
  const lower = text.toLowerCase();
  return TRIGGERS.filter((t) =>
    lower.includes(t.pattern.toLowerCase())
  ).map((t) => t.id);
}

export function getTriggerById(id: string): DeluluTrigger | undefined {
  return TRIGGERS.find((t) => t.id === id);
}

export function getTriggerWeight(id: string): number {
  return getTriggerById(id)?.weight ?? 0;
}

export function calculateTriggerScore(triggerIds: string[]): number {
  const totalWeight = triggerIds.reduce(
    (sum, id) => sum + getTriggerWeight(id),
    0
  );
  // Normalize to 0-10 scale, capped at 10
  return Math.min(10, Math.round(totalWeight * 10 * 10) / 10);
}