#!/bin/bash
set -eux # Exit immediately if a command exits with a non-zero status, and print commands and their arguments as they are executed.

echo "--- Debug Info from build-frontend.sh ---"
echo "Current directory: $(pwd)"
echo "PATH: $PATH"
echo "--- Environment Variables ---"
env | sort
echo "--- Running npm run build ---"

# Assuming npm is in the PATH, which it should be if previous steps worked
npm run build --loglevel verbose

echo "--- npm run build finished ---"
