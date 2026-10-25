import {
  DeluluResult,
  DeluluScore,
  DeluluLabel,
  DeluluType,
  SkillMode,
  VERSION,
} from "./types.js";

// ─── Output Formatter ────────────────────────────────────────────────────────

export function formatOutput(result: DeluluResult): string {
  if (result.mode === "crisis") {
    return formatCrisisOutput(result);
  }

  const lines = [
    `🎯 Delulu Rating: ${result.score}/10 — ${result.label}`,
    `🏷️ Type: ${result.type}`,
    "",
    result.verdict,
    "",
    `📸 Screenshot line: "${result.screenshotLine}"`,
    "",
    `🧠 Reality check: ${result.realityCheck}`,
    "",
    `👉 Next step: ${result.nextStep}`,
  ];

  return lines.join("\n");
}

export function formatCrisisOutput(result: DeluluResult): string {
  return [
    "This isn't delulu. This is something else.",
    "",
    result.realityCheck,
    "",
    "👉 " + result.nextStep,
  ].join("\n");
}

export function formatCompact(result: DeluluResult): string {
  return `${result.score}/10 ${result.label} — ${result.type} | "${result.screenshotLine}"`;
}

export function formatJson(result: DeluluResult): string {
  return JSON.stringify(result, null, 2);
}

// ─── Result Builder ──────────────────────────────────────────────────────────

export function buildResult(params: {
  score: DeluluScore;
  label: DeluluLabel;
  type: DeluluType;
  verdict: string;
  screenshotLine: string;
  realityCheck: string;
  nextStep: string;
  triggers: string[];
  mode: SkillMode;
  inputLength: number;
  processingTimeMs: number;
}): DeluluResult {
  return {
    score: params.score,
    label: params.label,
    type: params.type,
    verdict: params.verdict,
    screenshotLine: params.screenshotLine,
    realityCheck: params.realityCheck,
    nextStep: params.nextStep,
    triggers: params.triggers,
    mode: params.mode,
    timestamp: new Date().toISOString(),
    metadata: {
      inputLength: params.inputLength,
      processingTimeMs: params.processingTimeMs,
      version: VERSION,
    },
  };
}