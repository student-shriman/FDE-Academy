#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -o errexit

echo "==> Installing Python dependencies..."
pip install -r requirements.txt

echo "==> Building React Frontend..."
cd web
npm install
npm run build
cd ..

echo "==> Build complete! Dist ready for FastAPI."
