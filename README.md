# 🎯 Delulu Detector

> **"Am I being delulu?" — finally, an honest answer.**

[![License: MIT](https://img.shields.io/badge/License-MIT-242321.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/weaion-labs/delulu-detector?style=flat-square&color=242321)](https://github.com/weaion-labs/delulu-detector)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-242321.svg?style=flat-square)](https://github.com/weaion-labs/delulu-detector/pulls)

---

## What is this?

You know that feeling when you're 90% sure you're being delusional about a situationship, a plan, or a "he said he'd change" moment — but you need someone to **actually tell you**?

That's the Delulu Detector.

Paste anything. Get rated 0-10 on the **delulu scale**. Get a **delulu type**. Get one **screenshot-worthy line** you can post. Get one **reality check** you already knew but didn't want to hear.

No therapy voice. No corporate bot. Just your brutally honest best friend who's available at 2am.

---

## 🎬 See it in action

```
Input:  "He said he's not ready for a relationship but he still texts
         me every day and likes all my posts. We're basically
         together right?"

Output: 🎯 Delulu Rating: 7/10 — Full Delulu
        🏷️ Type: Situationship Delulu

        He said the words "not ready for a relationship" out loud and
        you heard "we're basically together." That's not reading between
        the lines — that's writing a novel in the margins.

        📸 "He said 'not ready' and I heard 'we're basically together'
           and honestly the confidence is admirable."

        🧠 Someone who wants to be with you doesn't need you to
           interpret their behavior.

        👉 Ask him directly: "Are we exclusive?" Then believe him.
```

---

## ✨ Features

| Feature | What it does |
|---------|-------------|
| **0-10 Delulu Scale** | Honest scoring with labels from "Locked In" to "Beyond Delulu" |
| **8 Delulu Types** | Situationship · Hustle · Financial · Career · Friendship · Fitness · Creative · General |
| **Screenshot Line** | One quotable sentence. The meme. The thing you post. |
| **5 Modes** | Standard · Prevention · Re-rate · Group Chat · Crisis |
| **Gen-Z Voice** | Sounds like a friend, not a therapist or a bot |
| **Edge Cases** | Handles vague input, crisis situations, and "am I actually doing well?" moments |

---

## 🚀 Quick Start

### Option 1: Ask Claude to install it (easiest)

Tell Claude:

> "Install the Delulu Detector skill from https://github.com/weaion-labs/delulu-detector"

Claude will read `install.md` and set it up automatically. No manual file copying.

### Option 2: One-line install (Claude Code)

```bash
curl -sSL https://raw.githubusercontent.com/weaion-labs/delulu-detector/main/install.sh | bash
```

### Option 3: Manual install

**Claude Code:**
```bash
mkdir -p ~/.claude/skills/delulu-detector
curl -sL https://raw.githubusercontent.com/weaion-labs/delulu-detector/main/skills/delulu-detector/SKILL.md \
  -o ~/.claude/skills/delulu-detector/SKILL.md
```

**Claude Desktop / Claude.ai:**
1. Create a new Project
2. Paste the contents of [`SKILL.md`](./skills/delulu-detector/SKILL.md) into Project instructions
3. Save and start chatting

---

## 🎮 Try the web demo

Don't want to install anything? Try it in your browser:

👉 **[Live Demo](https://weaion-labs.github.io/delulu-detector/)** *(coming soon)*

Or run it locally:
```bash
cd packages/web
npx serve . -p 3000
# → http://localhost:3000
```

---

## 📸 Content hooks (for creators)

This skill is built to be **shared**. Every output is screenshot-ready.

- **"I ran X through the delulu detector"** — show input → rating reveal (Reels)
- **"Delulu of the week"** — recurring segment, pick the funniest submission
- **"Rate my delulu"** — engagement bait: "Drop your situationship, I'll rate 10"
- **"Screenshot dumps"** — anonymized funny outputs as carousels
- **"Prevention mode"** — "I asked before I texted my ex" (proactive use)
- **"Re-rate"** — "I came back after doing the thing. New score." (growth narrative)
- **"0/10 Locked In"** — celebrating people who are actually doing well

---

## 🏗️ What's inside

```
delulu-detector/
├── skills/delulu-detector/
│   ├── SKILL.md              # The skill (persona, modes, triggers, examples)
│   ├── triggers.json         # Machine-readable trigger config
│   └── types.json            # Machine-readable type config
├── packages/
│   ├── core/                 # TypeScript scoring engine + 23 tests
│   └── web/                  # Interactive web demo (HTML/CSS/JS)
├── install.md                # AI-readable install guide
├── install.sh                # One-line installer
├── docs/ARCHITECTURE.md      # Full architecture docs
├── examples/                 # Usage examples for all modes
└── config/                   # Environment configs
```

---

## 🤝 Contributing

Got a new delulu type? A better screenshot line? A trigger we missed?

PRs are welcome. See [CONTRIBUTING](./docs/ARCHITECTURE.md) for guidelines.

---

## 📄 License

MIT © [WEAION Labs](https://weaionlabs.com)

---

<p align="center">
  <b>Built by a tech guy at a firm. For everyone who's ever been a 7/10.</b>
</p>