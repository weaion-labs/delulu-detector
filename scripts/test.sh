#!/bin/bash
set -e

echo "🧪 Running WEAION tests..."

# Core tests
echo ""
echo "📦 Core engine tests..."
cd packages/core
npm test
cd ../..

# Web tests (placeholder)
echo ""
echo "🌐 Web app tests..."
cd packages/web
npm test
cd ../..

echo ""
echo "✅ All tests passed!"