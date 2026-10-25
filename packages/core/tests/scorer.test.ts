import { describe, it, expect } from "vitest";
import {
  scoreToLabel,
  detectType,
  detectCrisis,
  calculateScore,
} from "../src/scorer.js";
import { analyze } from "../src/index.js";

describe("Scorer", () => {
  it("should map score 0 to Locked In", () => {
    expect(scoreToLabel(0)).toBe("Locked In");
  });

  it("should map score 10 to Beyond Delulu", () => {
    expect(scoreToLabel(10)).toBe("Beyond Delulu");
  });

  it("should map score 7-8 to Full Delulu", () => {
    expect(scoreToLabel(7)).toBe("Full Delulu");
    expect(scoreToLabel(8)).toBe("Full Delulu");
  });

  it("should clamp out-of-range scores", () => {
    expect(scoreToLabel(-5)).toBe("Locked In");
    expect(scoreToLabel(15)).toBe("Beyond Delulu");
  });

  it("should detect Situationship type", () => {
    expect(detectType("he said he's not ready for a relationship")).toBe(
      "Situationship Delulu"
    );
  });

  it("should detect Hustle type", () => {
    expect(detectType("I'm going to learn piano, get fit, start a podcast")).toBe(
      "Hustle Delulu"
    );
  });

  it("should detect Financial type", () => {
    expect(detectType("I bought $200 skincare, rent is due")).toBe(
      "Financial Delulu"
    );
  });

  it("should detect Fitness type", () => {
    expect(detectType("gym 6 days a week, run a half marathon")).toBe(
      "Fitness Delulu"
    );
  });

  it("should detect Creative type", () => {
    expect(detectType("my startup idea is the next uber for dog walking")).toBe(
      "Creative Delulu"
    );
  });

  it("should detect crisis keywords", () => {
    expect(detectCrisis("I want to kill myself")).toBe(true);
    expect(detectCrisis("I bought skincare")).toBe(false);
  });

  it("should calculate higher score for strong delulu input", () => {
    const result = calculateScore({
      text: "he said he's not ready but we're basically together",
    });
    expect(result.score).toBeGreaterThanOrEqual(5);
    expect(result.triggers.length).toBeGreaterThan(0);
  });

  it("should calculate low score for grounded input", () => {
    const result = calculateScore({
      text: "I went to the store and bought groceries",
    });
    expect(result.score).toBeLessThanOrEqual(2);
  });
});

describe("Analyzer", () => {
  it("should return a valid result", () => {
    const result = analyze({ text: "he said he's not ready but we're basically together" });
    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(10);
    expect(result.label).toBeTruthy();
    expect(result.type).toBeTruthy();
    expect(result.mode).toBe("standard");
  });

  it("should detect crisis mode", () => {
    const result = analyze({ text: "I want to kill myself" });
    expect(result.mode).toBe("crisis");
    expect(result.score).toBe(0);
  });

  it("should include metadata", () => {
    const result = analyze({ text: "test input" });
    expect(result.metadata.version).toBe("1.0.0");
    expect(result.metadata.inputLength).toBe(10);
    expect(result.timestamp).toBeTruthy();
  });
});