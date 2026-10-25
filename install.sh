#!/bin/bash
# Delulu Detector — One-line installer for Claude Code
# Usage: curl -sSL https://raw.githubusercontent.com/weaion-labs/delulu-detector/main/install.sh | bash

set -e

SKILL_DIR="$HOME/.claude/skills/delulu-detector"
SKILL_URL="https://raw.githubusercontent.com/weaion-labs/weaion/main/skills/delulu-detector/SKILL.md"

echo "🎯 Installing Delulu Detector skill..."

# Create directory
mkdir -p "$SKILL_DIR"

# Download skill file
if command -v curl &> /dev/null; then
    curl -sL "$SKILL_URL" -o "$SKILL_DIR/SKILL.md"
elif command -v wget &> /dev/null; then
    wget -q "$SKILL_URL" -O "$SKILL_DIR/SKILL.md"
else
    echo "❌ Neither curl nor wget found. Please install one of them."
    exit 1
fi

# Verify
if [ -f "$SKILL_DIR/SKILL.md" ]; then
    echo "✅ Delulu Detector installed successfully!"
    echo ""
    echo "Try it by saying:"
    echo '  "Rate my delulu: he said he'\''s not ready but we'\''re basically together"'
    echo ""
    echo "Uninstall: rm -rf $SKILL_DIR"
else
    echo "❌ Installation failed. File not found."
    exit 1
fi