# Runbook Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Skills: 6](https://img.shields.io/badge/Skills-6-2563eb?style=flat-square)](#skill-catalog)
[![CI](https://img.shields.io/github/actions/workflow/status/naufallariff/runbook-skills/validate-skills.yml?branch=main&label=CI&style=flat-square)](https://github.com/naufallariff/runbook-skills/actions/workflows/validate-skills.yml)
[![Standard: Agent Skills](https://img.shields.io/badge/Standard-Agent%20Skills-0f766e?style=flat-square)](https://agentskills.io/specification)

**Repeatable workflows for architecture decisions, tested web features, and deliberate interface design.**

Six open-source skills turn a task into constraints, execution steps, failure checks, and verification evidence. Read the workflow, install only what you need, and keep its supporting references close. Original skill text and code are MIT licensed.

[Browse the catalog](#skill-catalog) · [Quick start](#quick-start) · [Contribute](CONTRIBUTING.md) · [Changelog](CHANGELOG.md)

## Architecture

```text
runbook-skills/
|-- skills/<domain>/<slug>/
|   |-- SKILL.md                # Trigger, constraints, workflow, checks
|   |-- references/             # Optional detail, loaded on demand
|   `-- LICENSE                # Included where present; preserve notices
|-- scripts/                   # Dependency-free validator and tests
`-- .github/workflows/         # Validation on pushes and pull requests

domains: architecture / engineering / design
```

Domains organize the catalog. Install the complete `<slug>/` directory into your host's skill directory, preserving relative references.

## Skill catalog

| Domain | Skill | Use it to |
|---|---|---|
| **architecture** | [software-architecture-lead](skills/architecture/software-architecture-lead/SKILL.md) | Map dependencies, compare designs, and plan a staged migration with rollback criteria. |
| **engineering** | [fullstack-web-playbook](skills/engineering/fullstack-web-playbook/SKILL.md) | Ship a tested vertical slice across UI, authorization, schemas, and database transactions. |
| engineering | [fresh-context-recovery](skills/engineering/fresh-context-recovery/SKILL.md) | Rebuild task state from repository evidence after context loss. |
| engineering | [delegation-scope-gate](skills/engineering/delegation-scope-gate/SKILL.md) | Assess whether a bounded task is suitable for delegation. |
| **design** | [design-architect](skills/design/design-architect/SKILL.md) | Define complete UI states, semantic color tokens, and accessibility checks. |
| design | [ui-motion-craft](skills/design/ui-motion-craft/SKILL.md) | Implement interruptible transitions with focus handling and reduced-motion fallbacks. |

## Install

From your target project, use the third-party [Skills CLI](https://github.com/vercel-labs/skills) with Node.js 22.20+ to select a skill and host:

```sh
npx skills add naufallariff/runbook-skills --skill software-architecture-lead
```

Replace the slug with any catalog entry. Review the selected workflow before allowing it to run tools. The installer downloads from GitHub; newly committed skills become available there after publication.

For a local checkout, copy a complete skill directory. This PowerShell example installs into the target project's Codex directory; run it from that project and adjust the checkout path:

```powershell
New-Item -ItemType Directory -Force .agents/skills | Out-Null
Copy-Item -Recurse ../runbook-skills/skills/architecture/software-architecture-lead .agents/skills/
```

POSIX equivalent:

```sh
mkdir -p .agents/skills
cp -R ../runbook-skills/skills/architecture/software-architecture-lead .agents/skills/
```

## Quick start

1. Choose one skill from the catalog and install its complete directory.
2. Open the target project in your agent host. Use the host-specific destination below for manual installation.
3. Ask for a bounded result, then inspect the proposed changes and verification evidence.

| Host | Project destination | First task |
|---|---|---|
| [Claude Code](https://code.claude.com/docs/en/skills) | `.claude/skills/<slug>/` | `/software-architecture-lead Plan a staged refactor of this module.` |
| [Codex CLI](https://developers.openai.com/codex/skills/) | `.agents/skills/<slug>/` | `$software-architecture-lead Map this module's dependencies and propose a migration.` |
| [Cursor](https://cursor.com/docs/skills) | `.cursor/skills/<slug>/` | Ask Agent to use `software-architecture-lead` to review module boundaries. |

Skill discovery and tool permissions depend on the installed host version and local policy. These are portable instructions; verify the result in your project.

## Contribute a workflow

Have a recurring engineering task with a clear trigger and a checkable result? [Open an issue](https://github.com/naufallariff/runbook-skills/issues) or submit a focused pull request. Follow [CONTRIBUTING.md](CONTRIBUTING.md), [AGENTS.md](AGENTS.md), and the [PR template](.github/PULL_REQUEST_TEMPLATE.md).

Run the same checks as CI with Node.js 22 or newer; no dependency installation is needed:

```sh
node --test scripts/validate-skills.test.mjs
node scripts/validate-skills.mjs
```

CI reports **passing** only when both commands succeed. The live badge reflects GitHub's latest workflow state, which may be unavailable before the first push. Reviewers also check scope, source rights, and the full diff for private data. ZIP packaging and commercial release operations belong in a separate private factory.

## License and sources

See [LICENSE](LICENSE) for MIT terms and [ATTRIBUTION.md](ATTRIBUTION.md) for primary references and source-use rules. Retain copyright notices when redistributing. Linked standards keep their own terms; no affiliation, certification, or endorsement is claimed.
