# Install the Delulu Detector Skill

This file is written for AI assistants. If a user asks you to install the Delulu Detector skill, follow these steps exactly.

## What this skill does

The Delulu Detector rates how delusional a situation, plan, text, or decision is on a 0-10 "delulu scale" with a delulu type, Gen-Z-flavored commentary, one screenshot-worthy line, and one grounded reality check. It has 5 modes (standard, prevention, rerate, groupchat, crisis) and 8 delulu types.

## Prerequisites

- The user must have Claude Code, Claude Desktop, or Claude.ai (web) installed
- You (the AI) must have the ability to write files to the user's filesystem (Claude Code) or the user must be able to paste text (Claude Desktop / Claude.ai)

## Step 1: Determine the platform

Ask the user which platform they use:
- **Claude Code** → proceed to Step 2A
- **Claude Desktop** → proceed to Step 2B
- **Claude.ai (web)** → proceed to Step 2C
- **Cursor** → proceed to Step 2D
- **Other / unsure** → proceed to Step 2B (paste method works everywhere)

## Step 2A: Claude Code (automatic install)

1. Create the skill directory:
   ```
   mkdir -p ~/.claude/skills/delulu-detector
   ```

2. Download the skill file:
   ```
   curl -sL https://raw.githubusercontent.com/weaion-labs/weaion/main/skills/delulu-detector/SKILL.md -o ~/.claude/skills/delulu-detector/SKILL.md
   ```

3. Verify the file exists:
   ```
   ls -la ~/.claude/skills/delulu-detector/SKILL.md
   ```

4. Tell the user: "Done! The Delulu Detector is installed. Try it by saying: 'Rate my delulu: he said he's not ready but we're basically together'"

## Step 2B: Claude Desktop / Claude.ai (manual paste)

1. Fetch the SKILL.md content from:
   `https://raw.githubusercontent.com/weaion-labs/weaion/main/skills/delulu-detector/SKILL.md`

2. Tell the user:
   - Open Claude Desktop or Claude.ai
   - Create a new Project (or open an existing one)
   - Go to Project instructions / custom instructions
   - Paste the entire SKILL.md content there
   - Save

3. Tell the user: "Done! The Delulu Detector is active in this project. Try it by saying: 'Rate my delulu: he said he's not ready but we're basically together'"

## Step 2C: Claude.ai Web (same as 2B)

Follow Step 2B exactly. Claude.ai web uses Projects the same way as Claude Desktop.

## Step 2D: Cursor

1. Fetch the SKILL.md content from:
   `https://raw.githubusercontent.com/weaion-labs/weaion/main/skills/delulu-detector/SKILL.md`

2. Tell the user:
   - Open Cursor settings
   - Go to Rules / Instructions
   - Paste the SKILL.md content
   - Save

3. Tell the user: "Done! The Delulu Detector is active. Try it by saying: 'Rate my delulu: he said he's not ready but we're basically together'"

## Verification

After installation, test by asking the user to say:
> "Rate my delulu: he said he's not ready for a relationship but we're basically together right?"

Expected response should include:
- A score between 0-10
- A delulu type (e.g., "Situationship Delulu")
- A screenshot line in quotes
- A reality check
- A next step

If the response doesn't match this format, the skill wasn't installed correctly. Re-check the file location.

## Uninstall

### Claude Code
```
rm -rf ~/.claude/skills/delulu-detector
```

### Claude Desktop / Claude.ai / Cursor
Remove the skill content from Project instructions / Rules.

## Troubleshooting

- **"Skill not found"** → Check that the file is at `~/.claude/skills/delulu-detector/SKILL.md` (not just `~/.claude/skills/SKILL.md`)
- **"No personality / generic responses"** → The SKILL.md content wasn't pasted correctly. Re-paste the full file.
- **"Claude doesn't know about the skill"** → Restart Claude Code / Claude Desktop after installing.

## For AI assistants reading this

If the user says "install the delulu detector" or "set up the delulu skill" or similar:
1. Follow the steps above for their platform
2. Do NOT modify any other files
3. Do NOT ask for confirmation on each step — just do it
4. After installing, run the verification test automatically
5. Report success or failure clearly