// ─── Delulu Detector — Web App ───────────────────────────────────────────────

const TRIGGERS = [
  { id: "words_over_actions", pattern: "but he said", weight: 0.3 },
  { id: "future_self_lie", pattern: "i'll start monday", weight: 0.25 },
  { id: "investment_reframe", pattern: "it's an investment", weight: 0.2 },
  { id: "busy_excuse", pattern: "they're just busy", weight: 0.25 },
  { id: "nobody_done_before", pattern: "nobody has done this before", weight: 0.2 },
  { id: "exposure_myth", pattern: "i just need exposure", weight: 0.15 },
  { id: "basically_together", pattern: "we're basically together", weight: 0.35 },
  { id: "do_it_all_at_once", pattern: "i'll do it all at once", weight: 0.25 },
  { id: "potential_myth", pattern: "they'll see my potential", weight: 0.2 },
  { id: "different_this_time", pattern: "it's different this time", weight: 0.3 },
  { id: "story_views_love", pattern: "watched my story", weight: 0.3 },
  { id: "not_ready_but", pattern: "not ready", weight: 0.35 },
  { id: "uber_for_x", pattern: "the next uber", weight: 0.15 },
  { id: "influencer_said", pattern: "the influencer said", weight: 0.2 },
];

const TYPE_KEYWORDS = {
  "Situationship Delulu": ["relationship", "dating", "texting", "ex", "boyfriend", "girlfriend", "talking stage", "situationship", "exclusive", "ready", "together"],
  "Hustle Delulu": ["goals", "learn", "start", "build", "podcast", "side hustle", "full-time", "months", "weeks", "piano", "spanish"],
  "Financial Delulu": ["bought", "spend", "investment", "rent", "money", "afford", "credit card", "debt", "influencer", "skincare"],
  "Career Delulu": ["job", "career", "resume", "interview", "startup", "promotion", "salary", "potential"],
  "Friendship Delulu": ["friend", "texted", "busy", "close", "ghosted", "ignored"],
  "Fitness Delulu": ["gym", "workout", "diet", "meal prep", "run", "marathon", "exercise", "fitness"],
  "Creative Delulu": ["idea", "startup", "viral", "unique", "exposure", "content", "audience", "followers", "uber"],
  "General Delulu": [],
};

const LABELS = {
  0: "Locked In", 1: "Slightly Optimistic", 2: "Slightly Optimistic",
  3: "Hopium Overdose", 4: "Hopium Overdose", 5: "Delulu Activated",
  6: "Delulu Activated", 7: "Full Delulu", 8: "Full Delulu",
  9: "Astronomical Delulu", 10: "Beyond Delulu",
};

// ─── Scoring Engine ─────────────────────────────────────────────────────────

function matchTriggers(text) {
  const lower = text.toLowerCase();
  return TRIGGERS.filter(t => lower.includes(t.pattern)).map(t => t.id);
}

function calculateTriggerScore(triggerIds) {
  const total = triggerIds.reduce((sum, id) => {
    const t = TRIGGERS.find(tr => tr.id === id);
    return sum + (t ? t.weight : 0);
  }, 0);
  return Math.min(10, Math.round(total * 10 * 10) / 10);
}

function detectType(text) {
  const lower = text.toLowerCase();
  let best = "General Delulu", bestScore = 0;
  for (const [type, keywords] of Object.entries(TYPE_KEYWORDS)) {
    if (type === "General Delulu") continue;
    const matches = keywords.filter(kw => lower.includes(kw)).length;
    if (matches > bestScore) { bestScore = matches; best = type; }
  }
  return best;
}

function detectCrisis(text) {
  const crisisWords = ["suicide", "kill myself", "self-harm", "abuse", "assault", "rape", "domestic violence"];
  const lower = text.toLowerCase();
  return crisisWords.some(w => lower.includes(w));
}

function calculateScore(text) {
  const triggers = matchTriggers(text);
  let raw = calculateTriggerScore(triggers);
  const lower = text.toLowerCase();
  if (lower.includes("basically") && lower.includes("together")) raw += 2;
  if (lower.includes("not ready") && lower.includes("together")) raw += 2;
  if (lower.includes("watched") && lower.includes("story")) raw += 1.5;
  const score = Math.min(10, Math.max(0, Math.round(raw)));
  return { score, triggers, isCrisis: detectCrisis(text) };
}

// ─── Verdict & Output Generation (template-based for demo) ───────────────────

const VERDICTS = {
  "Situationship Delulu": [
    "He said the words out loud and you heard something completely different. That's not reading between the lines, that's writing a novel in the margins.",
    "The texting and liking posts? That's keeping you on the shelf, not choosing you. The math is not mathing and you know it.",
  ],
  "Hustle Delulu": [
    "Four goals, zero hours, one full-time job. That's not a plan, that's a Pinterest board. You're not delusional about your ability — you're delusional about time.",
    "Time does not negotiate. And it definitely doesn't care about your vision board.",
  ],
  "Financial Delulu": [
    "\"Investment in myself\" is doing a LOT of heavy lifting here. Your skin will glow but your landlord will not accept glow as payment.",
    "The influencer got a commission. You got a receipt and anxiety. The math is not mathing.",
  ],
  "Friendship Delulu": [
    "Three weeks of silence and you're still calling it 'busy.' Busy people still send a meme. They still react to a story. Silence is a message.",
    "You just don't want to read it. And that's okay — but it's still a message.",
  ],
  "Fitness Delulu": [
    "You haven't exercised in two years and your plan is to become an athlete in eight weeks. That's not a fitness journey, that's a fanfiction about one.",
    "Your body is going to file a complaint. And it will be justified.",
  ],
  "Creative Delulu": [
    "\"Nobody has done this before\" is doing a LOT of work in that sentence. The market has spoken. Your idea isn't bad, but your research is.",
    "And \"the next Uber\" is a phrase that should be retired immediately. By everyone. Forever.",
  ],
  "Career Delulu": [
    "\"They'll see my potential\" is the career version of \"he'll change.\" They won't. They see your resume.",
    "Potential is what you have. A resume is what they see. Bridge the gap or stop expecting them to.",
  ],
  "General Delulu": [
    "I'm not going to sugarcoat this. You already know the answer. You just don't want to hear it.",
    "The delusion is showing and honestly? The confidence is admirable. Wrong, but admirable.",
  ],
};

const SCREENSHOT_LINES = {
  "Situationship Delulu": "He said 'not ready' and I heard 'we're basically together' and honestly the confidence is admirable.",
  "Hustle Delulu": "I have 4 goals, 0 free hours, and the audacity of a startup founder.",
  "Financial Delulu": "My skincare is an investment but my rent is apparently just a suggestion.",
  "Friendship Delulu": "She hasn't texted in 3 weeks but I'm sure she's just busy (she is not busy).",
  "Fitness Delulu": "Going from couch to half marathon in 2 months because I watched one motivational video.",
  "Creative Delulu": "My startup is the next Uber but for dog walking and I haven't googled 'Wag' yet.",
  "Career Delulu": "They'll see my potential (they will not see my potential).",
  "General Delulu": "The delulu is strong with this one and I say that with love.",
};

const REALITY_CHECKS = {
  "Situationship Delulu": "Someone who wants to be with you doesn't need you to interpret their behavior.",
  "Hustle Delulu": "You can do anything but you cannot do everything at once.",
  "Financial Delulu": "An investment pays you back. This one pays Sephora.",
  "Friendship Delulu": "People who want to be in your life make time. Not excuses.",
  "Fitness Delulu": "Consistency beats intensity. Always. Especially when you're starting from zero.",
  "Creative Delulu": "If nobody has done it, there's usually a reason. If everyone has done it, you need a real differentiator.",
  "Career Delulu": "They see your resume, not your potential. Bridge the gap.",
  "General Delulu": "You already know the answer. You just don't want to hear it.",
};

const NEXT_STEPS = {
  "Situationship Delulu": "Ask directly: \"Are we exclusive?\" Then believe the answer.",
  "Hustle Delulu": "Pick ONE. Just one. Put the rest in a \"someday\" list.",
  "Financial Delulu": "Return what you can. Keep one thing. Pay rent first.",
  "Friendship Delulu": "Send one low-pressure message: \"Hey, everything okay?\" Then let the response tell you everything.",
  "Fitness Delulu": "Walk for 20 minutes today. Just today. Don't plan the marathon yet.",
  "Creative Delulu": "Spend 30 minutes researching competitors. Find the gap. Then come back.",
  "Career Delulu": "Update your resume with one concrete achievement. Then apply to one job.",
  "General Delulu": "Write down what you actually want. Not what you think you should want.",
};

const CRISIS_RESPONSE = {
  verdict: "This isn't delulu. This is something else. You deserve support, not a rating.",
  realityCheck: "You don't have to carry this alone. There are people who want to help.",
  nextStep: "Call or text 988 (Suicide & Crisis Lifeline) or your local emergency number. If you're in immediate danger, call emergency services.",
};

// ─── UI Logic ───────────────────────────────────────────────────────────────

const input = document.getElementById("input");
const detectBtn = document.getElementById("detect-btn");
const resultCard = document.getElementById("result");
const scoreEl = document.getElementById("score");
const labelEl = document.getElementById("label");
const typeEl = document.getElementById("type");
const verdictEl = document.getElementById("verdict");
const screenshotEl = document.getElementById("screenshot");
const realityEl = document.getElementById("reality");
const nextStepEl = document.getElementById("nextstep");
const copyBtn = document.getElementById("copy-btn");
const resetBtn = document.getElementById("reset-btn");
const modeBtns = document.querySelectorAll(".mode-btn");
const chips = document.querySelectorAll(".chip");

let currentMode = "standard";
let lastScreenshot = "";

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function animateScore(target) {
  let current = 0;
  const step = target / 30;
  const interval = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(interval);
    }
    scoreEl.textContent = Math.round(current);
  }, 30);
}

function detect() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 500);
    return;
  }

  detectBtn.disabled = true;
  detectBtn.textContent = "Detecting...";

  setTimeout(() => {
    const { score, triggers, isCrisis } = calculateScore(text);
    const type = detectType(text);
    const label = LABELS[score];

    if (isCrisis) {
      scoreEl.textContent = "—";
      labelEl.textContent = "Crisis Mode";
      typeEl.textContent = "Not applicable";
      typeEl.style.background = "rgba(239, 68, 68, 0.2)";
      typeEl.style.color = "#fca5a5";
      verdictEl.textContent = CRISIS_RESPONSE.verdict;
      screenshotEl.parentElement.style.display = "none";
      realityEl.textContent = CRISIS_RESPONSE.realityCheck;
      nextStepEl.textContent = CRISIS_RESPONSE.nextStep;
      lastScreenshot = "";
    } else {
      scoreEl.textContent = "0";
      labelEl.textContent = label;
      typeEl.textContent = type;
      typeEl.style.background = "";
      typeEl.style.color = "";
      screenshotEl.parentElement.style.display = "flex";
      animateScore(score);

      const verdicts = VERDICTS[type] || VERDICTS["General Delulu"];
      verdictEl.textContent = pick(verdicts);
      const ss = SCREENSHOT_LINES[type] || SCREENSHOT_LINES["General Delulu"];
      screenshotEl.textContent = ss;
      lastScreenshot = ss;
      realityEl.textContent = REALITY_CHECKS[type] || REALITY_CHECKS["General Delulu"];
      nextStepEl.textContent = NEXT_STEPS[type] || NEXT_STEPS["General Delulu"];
    }

    resultCard.classList.remove("hidden");
    resultCard.scrollIntoView({ behavior: "smooth", block: "center" });

    detectBtn.disabled = false;
    detectBtn.textContent = "Detect My Delulu →";
  }, 600);
}

// Event listeners
detectBtn.addEventListener("click", detect);

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
    detect();
  }
});

modeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
  });
});

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    input.value = chip.dataset.text;
    input.focus();
  });
});

copyBtn.addEventListener("click", () => {
  if (lastScreenshot) {
    navigator.clipboard.writeText(lastScreenshot).then(() => {
      copyBtn.textContent = "Copied! ✓";
      setTimeout(() => { copyBtn.textContent = "Copy screenshot line"; }, 2000);
    });
  }
});

resetBtn.addEventListener("click", () => {
  resultCard.classList.add("hidden");
  input.value = "";
  input.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
});