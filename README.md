# 🎯 WEAION

> **Gen-Z-flavored AI skills that are actually useful.**

[![CI](https://github.com/weaion-labs/weaion/actions/workflows/ci.yml/badge.svg)](https://github.com/weaion-labs/weaion/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/weaion-labs/weaion?style=social)](https://github.com/weaion-labs/weaion)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/weaion-labs/weaion/pulls)

WEAION is an open-source collection of AI skills, tools, and utilities built for real people — not just developers. Every skill ships with a personality, a scoring system, and a reason to screenshot it.

## 🚀 Quick Start

### Use a skill (Claude Code / Cursor / any agent)

```bash
# Clone the repo
git clone https://github.com/weaion-labs/weaion.git
cd weaion

# Install the Delulu Detector skill
cp -r skills/delulu-detector ~/.claude/skills/
```

### Run the web demo

```bash
cd packages/web
npm install
npm run dev
# → http://localhost:3000
```

### Run the CLI

```bash
npm install -g @weaion/cli
weaion delulu "he said he's not ready but we're basically together"
```

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| `@weaion/core` | Core scoring engine, triggers, modes, types | ✅ Stable |
| `@weaion/web` | Interactive web demo | ✅ Stable |
| `@weaion/cli` | Command-line interface | 🚧 Beta |
| `@weaion/skills` | Skill definitions (SKILL.md) | ✅ Stable |

## 🎯 Skills

### Delulu Detector

Rates how delusional a situation, plan, text, or decision is on a 0-10 "delulu scale" with a delulu type, Gen-Z commentary, and one grounded reality check.

**Modes:** Standard · Prevention · Re-rate · Group Chat · Crisis

**Delulu Types:** Situationship · Hustle · Financial · Career · Friendship · Fitness · Creative · General

[→ View skill](./skills/delulu-detector/SKILL.md) · [→ Try web demo](./packages/web)

## 🏗️ Architecture

```
weaion/
├── packages/
│   ├── core/          # TypeScript core engine
│   ├── web/           # React web app
│   └── cli/           # CLI tool
├── skills/            # Skill definitions (SKILL.md + JSON configs)
├── docs/              # Architecture, API, contributing
├── config/            # Environment configs
├── examples/          # Usage examples
└── scripts/           # Build, test, deploy
```

[→ Full architecture docs](./docs/ARCHITECTURE.md)

## 🧪 Testing

```bash
npm test                    # Run all tests
npm run test:core           # Core engine tests
npm run test:web            # Web app tests
npm run test:coverage       # With coverage report
```

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © WEAION

---

**Built by a tech guy at a firm, for everyone.**