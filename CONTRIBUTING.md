# Contributing to runbook-skills

External pull requests are welcome. Propose a bounded workflow with an observable trigger and verifiable result. Discuss broad changes or new domains in an issue before implementation.

## First contribution

1. Pick a skill from the [catalog](README.md#skill-catalog), or open an issue describing a missing workflow.
2. Fork the repository and create a focused branch. Keep source changes in this public hub; contributors need no private factory access.
3. Update the skill and any affected catalog or attribution entries. Record user-visible changes under [Unreleased](CHANGELOG.md#unreleased).
4. Run both CI checks with Node.js 22 or newer:

   ```sh
   node --test scripts/validate-skills.test.mjs
   node scripts/validate-skills.mjs
   ```

5. Open a pull request using the [template](.github/PULL_REQUEST_TEMPLATE.md). Include the trigger, expected result, and actual verification evidence.

## Directory and metadata contract

Use `skills/<domain>/<slug>/SKILL.md` with optional `references/`, `scripts/`, or `assets/` that the skill actually uses. Slugs must be globally unique lowercase kebab-case, 1-64 characters. Keep references relative and within the skill directory.

Frontmatter supports only string `name` and `description` fields. Use plain or quoted single-line scalars, or indented `>`/`>-`/`|`/`|-` blocks. Use consistent spaces for block indentation. Complex YAML, anchors, tags, extra fields, and duplicate keys are rejected intentionally. Descriptions must be nonempty and at most 1024 Unicode characters.

Include populated `## Core Constraints`, `## Execution Protocol`, `## Failure Modes / What NOT to Do`, and `## Verification Gate` sections. Keep required authorization and safety rules inline. Move optional detail to references.

## Review and validation

1. Explain the problem, intended user, trigger, output, and overlap with existing skills.
2. Cite primary specifications or official documentation for material claims. Follow [ATTRIBUTION.md](ATTRIBUTION.md); retain required notices and avoid copied third-party workflows.
3. Use synthetic fixtures. Exclude credentials, private endpoints, and personal data; inspect the entire diff manually.
4. Run both checks above. The dependency-free validator checks layout, supported YAML, names, description limits, populated headings, and common secret/PII patterns across repository files. It cannot prove the absence of secrets or personal data.
5. Provide relevant positive, malformed-input, boundary, and failure-case evidence for behavior changes. State unavailable checks explicitly.
6. Submit a focused PR using the template. CI must pass; maintainers review scope, safety, provenance, and evidence before merge. Do not include ZIP files or distribution folders.

Use concise Conventional Commits, for example `fix(fresh-context-recovery): clarify missing-state fallback`. Contributions are reviewed under the repository MIT license; third-party material keeps its own terms.

## Writing and review scope

Use direct instructions, concrete failure cases, and observable checks. Keep workflows vendor-neutral; host-specific installation belongs in the README. Avoid promotional filler and unsupported compatibility or performance claims. A maintainer may request a narrower scope or source evidence before merging. Report suspected security issues without posting credentials or private data in a public issue.
