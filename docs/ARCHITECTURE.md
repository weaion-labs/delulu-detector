# Architecture

## Overview

WEAION is structured as a monorepo with three main packages and a skill definition layer.

```
weaion/
├── packages/
│   ├── core/          # TypeScript core engine (scoring, triggers, modes, types)
│   ├── web/           # Interactive web demo (vanilla HTML/CSS/JS)
│   └── cli/           # Command-line interface (planned)
├── skills/            # Skill definitions (SKILL.md + JSON configs)
├── docs/              # Documentation
├── config/            # Environment configs
├── examples/          # Usage examples
└── scripts/           # Build, test, deploy scripts
```

## Core Engine (`packages/core`)

The core engine is a TypeScript library that provides:

- **Types** — All shared types (scores, labels, types, modes, config)
- **Triggers** — Pattern matching library (15+ delulu triggers with weights)
- **Scorer** — Score calculation, type detection, crisis detection
- **Modes** — Mode detection (standard, prevention, rerate, groupchat, crisis)
- **Output** — Result formatting (text, compact, JSON, crisis)

### Data Flow

```
Input → Mode Detection → Trigger Matching → Score Calculation → Type Detection → Result Building → Output Formatting
```

### Key Design Decisions

1. **Triggers are data, not code.** They're defined in a JSON-like array, making them easy to add/remove without touching logic.
2. **Scoring is deterministic.** Same input always produces same score. The LLM layer (skill) adds personality on top.
3. **Crisis detection is separate.** It runs first and overrides everything. Safety > humor.
4. **Modes are composable.** A request can be standard + prevention + crisis-checked simultaneously.

## Skill Layer (`skills/`)

Skills are defined as SKILL.md files with YAML frontmatter. They contain:

- Persona definition
- Voice guidelines
- Scoring rubric
- Output format
- Edge cases
- Examples
- Content hooks

The skill layer is what the LLM (Claude, etc.) actually uses. The core engine provides the structured logic; the skill provides the personality.

## Web Demo (`packages/web`)

A vanilla HTML/CSS/JS interactive demo. No framework dependencies. Designed to be:

- Fast (no build step)
- Shareable (single URL)
- Mobile-friendly
- Screenshot-worthy (outputs look good on social)

## Configuration

Environment configs in `config/`:

- `default.json` — Development defaults
- `production.json` — Production overrides

Config is loaded at runtime and merged with defaults.