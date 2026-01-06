#!/bin/bash

# Re-format staged files only

INCLUDE_EXTENSIONS="ts,tsx"

git diff --name-only --cached | while read -r file; do
  if [ -f "$file" ]; then
    # Get file extension
    extension="${file##*.}"

    # Check if extension exactly matches one in INCLUDE_EXTENSIONS
    if echo "$INCLUDE_EXTENSIONS" | tr ',' '\n' | grep -Fx "$extension" > /dev/null; then
      echo "Formatting $file"
      bunx prettier --write "$file" --ignore-path .gitignore
    fi
  fi
done

# Regenerate JSON schema if resume types changed
if git diff --cached --name-only | grep -q "lib/types/resume.ts"; then
  echo "Regenerating JSON schema from Zod types..."
  bun run schema:generate
  git add public/resume.schema.json
fi

git update-index --again