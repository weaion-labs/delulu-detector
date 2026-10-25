import { describe, it, expect } from "vitest";
import {
  matchTriggers,
  getTriggerWeight,
  calculateTriggerScore,
  TRIGGERS,
} from "../src/triggers.js";

describe("Triggers", () => {
  it("should match 'basically together' trigger", () => {
    const result = matchTriggers("we're basically together right");
    expect(result).toContain("basically_together");
  });

  it("should match 'not ready' trigger", () => {
    const result = matchTriggers("he said he's not ready for a relationship");
    expect(result).toContain("not_ready_but");
  });

  it("should match multiple triggers", () => {
    const result = matchTriggers(
      "he said he's not ready but we're basically together"
    );
    expect(result).toContain("not_ready_but");
    expect(result).toContain("basically_together");
    expect(result.length).toBeGreaterThanOrEqual(2);
  });

  it("should return empty for no triggers", () => {
    const result = matchTriggers("I went to the store today");
    expect(result).toHaveLength(0);
  });

  it("should have weights between 0 and 1", () => {
    for (const trigger of TRIGGERS) {
      expect(trigger.weight).toBeGreaterThan(0);
      expect(trigger.weight).toBeLessThanOrEqual(1);
    }
  });

  it("should calculate score from triggers", () => {
    const score = calculateTriggerScore(["basically_together", "not_ready_but"]);
    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(10);
  });

  it("should cap score at 10", () => {
    const allIds = TRIGGERS.map((t) => t.id);
    const score = calculateTriggerScore(allIds);
    expect(score).toBeLessThanOrEqual(10);
  });

  it("should return 0 for no triggers", () => {
    const score = calculateTriggerScore([]);
    expect(score).toBe(0);
  });
});