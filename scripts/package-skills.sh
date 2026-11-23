#!/usr/bin/env bash
set -euo pipefail

DIST_DIR="dist"
rm -rf "$DIST_DIR"
mkdir -p "$DIST_DIR"

find skills -mindepth 2 -maxdepth 2 -name "SKILL.md" -print0 | while IFS= read -r -d '' skill_md; do
  skill_dir=$(dirname "$skill_md")
  skill_name=$(basename "$skill_dir")
  out_zip="$(pwd)/$DIST_DIR/${skill_name}.zip"

  if command -v zip >/dev/null 2>&1; then
    (
      cd "$skill_dir"
      zip -rq "$out_zip" . -x "*.DS_Store"
    )
  elif command -v python3 >/dev/null 2>&1 || command -v python >/dev/null 2>&1; then
    py_cmd=$(command -v python3 || command -v python)
    "$py_cmd" -c "
import os, zipfile
src = '$skill_dir'
with zipfile.ZipFile('$out_zip', 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, _, files in os.walk(src):
        for f in files:
            if f == '.DS_Store': continue
            full = os.path.join(root, f)
            zf.write(full, os.path.relpath(full, src))
"
  elif command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -NoProfile -Command "Compress-Archive -Path '$skill_dir\*' -DestinationPath '$out_zip' -Force"
  else
    echo "Error: No zip utility (zip, python, or powershell) found." >&2
    exit 1
  fi

  echo "Packaged: $DIST_DIR/${skill_name}.zip"
done