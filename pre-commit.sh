# /bin/bash

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

git update-index --again