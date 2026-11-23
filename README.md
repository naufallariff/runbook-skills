<div align="center">

# Fyuraa Agent Skills

**Modular, production-grade AI Agent Skills built on the [Agent Skills Open Standard](https://agentskills.io).**

Engineered for Staff-level software architecture, full-stack web performance & security, anti-slop UI/UX systems, and tactile motion physics.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)
[![Standard: Agent Skills](https://img.shields.io/badge/Standard-Agent%20Skills-111827?style=flat-square)](https://agentskills.io)
[![Skills Count](https://img.shields.io/badge/Skills-4%20Modules-059669?style=flat-square)](#skill-catalog)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-6366f1?style=flat-square)](CONTRIBUTING.md)

[Skill Catalog](#skill-catalog) • [How It Works](#architecture--progressive-disclosure) • [Quick Start](#quick-start) • [Contributing](#contributing)

</div>

---

## Why Fyuraa Agent Skills?

Most system prompts bloat the context window with thousands of lines of irrelevant rules on every turn. **Fyuraa Agent Skills** solves this through **Progressive Disclosure**:

1. **Lightweight Routing (`SKILL.md`)** — Each skill exposes crisp frontmatter triggers (`name` + `description`) and core decision frameworks so agents activate the right expertise only when needed.
2. **On-Demand Deep References (`references/`)** — Heavy architectural blueprints, OKLCH token scales, Tailwind CSS v4+ mappings, and security checklists live in modular sub-files loaded strictly when the task requires them.
3. **Cross-Platform Portability** — Works seamlessly across **Gemini**, **Google Antigravity**, **VS Code** (`.github/skills/` & `.agents/skills/`), **Cursor**, and CLI agents.

---

## Skill Catalog

| Skill | Domain | Core Capabilities | Footprint |
| :--- | :--- | :--- | :--- |
| [**`software-architecture-lead`**](skills/software-architecture-lead) | Engineering & SDLC | JS/TS/Node.js standards, repository architecture, ADRs, forward-thinking checklists, and long-term planning. | `SKILL.md` |
| [**`fullstack-web-playbook`**](skills/fullstack-web-playbook) | Full-Stack Web | Rendering strategies, modern CSS, database modeling, Core Web Vitals, Passkeys/CSP security, and CI/CD. | `SKILL.md` + `4` refs |
| [**`design-architect`**](skills/design-architect) | UI/UX & Systems | Anti-slop UI architecture, Golden Ratio typography, OKLCH color systems, Tailwind CSS v4+, and UX laws. | `SKILL.md` + `6` refs |
| [**`ui-motion-craft`**](skills/ui-motion-craft) | Motion & Polish | Spring physics, custom easing curves, interruptible transitions, gesture damping, and GPU performance. | `SKILL.md` |

### Explore Each Skill

<details>
<summary><strong>1. <code>software-architecture-lead</code></strong> — Staff/Principal Engineering & Repo Architecture</summary>
<br>

- **Best for:** Designing new repositories, writing production TypeScript/Node.js, enforcing strict typing (`verbatimModuleSyntax`, `noUncheckedIndexedAccess`), drafting Architecture Decision Records (ADRs), and structuring CI/CD gates.
- **Key Guardrails:** Zero `any`, runtime boundary validation, `node:` built-in prefixes, reversible design decisions, and international-standard repo layouts.
- **Source:** [`skills/software-architecture-lead/SKILL.md`](skills/software-architecture-lead/SKILL.md)

</details>

<details>
<summary><strong>2. <code>fullstack-web-playbook</code></strong> — End-to-End Web Platform Engineering</summary>
<br>

- **Best for:** Full-stack web applications from initial architecture to production deployment, database indexing, Core Web Vitals optimization, and security hardening.
- **Progressive Reference Modules:**
  - `01-architecture-and-design.md` — Rendering selection (SSG/ISR/Streaming SSR/SPA), `:has()`, `@container`, `@starting-style`, and WCAG 2.2 AA+.
  - `02-frontend-ui-and-behaviors.md` — Native `<dialog>` / `popover`, View Transitions API, autofill-ready forms, Built-in AI, and WebMCP.
  - `03-backend-database-and-performance.md` — RFC 9457 error contracts, `UUIDv7`, cursor pagination, LCP/INP scheduling (`scheduler.yield()`), and WASM workers.
  - `04-security-privacy-testing-deploy.md` — Passkeys (WebAuthn), Trusted Types CSP, Sanitizer API, PWA caching, and Canary rollouts.
- **Source:** [`skills/fullstack-web-playbook/SKILL.md`](skills/fullstack-web-playbook/SKILL.md)

</details>

<details>
<summary><strong>3. <code>design-architect</code></strong> — Unified Product Design & Tailwind CSS v4+ System</summary>
<br>

- **Best for:** Designing interfaces, design token architectures, brand/logography systems, honest analytics dashboards, and auditing UI against generic AI templates.
- **Progressive Reference Modules:**
  - `01-design-ratios-typography-and-copy.md` — Golden Ratio (`1.618`), modular scales, `tabular-nums`, and authentic product copywriting.
  - `02-color-science-and-token-systems.md` — Perceptual OKLCH palettes, `60-30-10` balance, WCAG contrast floors, and 3-tier CSS tokens.
  - `03-graphic-3d-and-logography.md` — Swap Test discipline, glass/glow dose caps, crisp SVG geometry, and Three.js/R3F lighting.
  - `04-ux-laws-and-functional-flows.md` — Fitts, Hick, Miller, Doherty Threshold, mobile thumb zones, and complete 6-state UI resilience.
  - `05-tailwind-v4-and-component-craft.md` — Canonical Tailwind CSS v4+ syntax table (`bg-linear-to-r`, `shadow-xs`, `outline-hidden`, `@theme`) and accessible primitives.
  - `06-dashboard-data-viz-and-motion.md` — Quiet & Wordless dashboard rules, visual encoding hierarchy, and pitch deck storytelling.
- **Source:** [`skills/design-architect/SKILL.md`](skills/design-architect/SKILL.md)

</details>

<details>
<summary><strong>4. <code>ui-motion-craft</code></strong> — Tactile UI Polish & Interaction Physics</summary>
<br>

- **Best for:** Tuning component micro-interactions, popover origin scaling, spring physics, gesture velocity thresholds, and `clip-path` reveals.
- **Key Guardrails:** Never animate `scale(0)` or high-frequency keyboard shortcuts (`Cmd+K`), restrict animations to compositor properties (`transform`, `opacity`, `clip-path`), and enforce `prefers-reduced-motion`.
- **Source:** [`skills/ui-motion-craft/SKILL.md`](skills/ui-motion-craft/SKILL.md)

</details>

---

## Architecture & Progressive Disclosure

```text
fyuraa-agent-skills/
├── README.md
├── LICENSE
├── AGENTS.md                         # Global conventions for AI contributors
├── CONTRIBUTING.md                   # PR guidelines & commit standards
├── CHANGELOG.md
├── scripts/
│   └── package-skills.sh             # Cross-platform .zip packager (Linux/macOS/Windows)
└── skills/
    ├── software-architecture-lead/
    │   └── SKILL.md
    ├── fullstack-web-playbook/
    │   ├── SKILL.md
    │   └── references/ (4 modules)
    ├── design-architect/
    │   ├── SKILL.md
    │   └── references/ (6 modules)
    └── ui-motion-craft/
        └── SKILL.md
```

---

## Quick Start

### Option A: Import `.zip` Archives into Gemini

1. Clone this repository and run the cross-platform packaging script:

```bash
git clone https://github.com/naufallariff/fyuraa-agent-skills.git
cd fyuraa-agent-skills
chmod +x scripts/package-skills.sh
./scripts/package-skills.sh
```

2. Upload the generated `.zip` files from `dist/` into **Gemini Skill Management Settings**.

### Option B: Symlink into Local IDE / CLI Projects

Link individual skills directly into your project's `.agents/skills/` or `.github/skills/` folder so local coding agents pick them up automatically:

```bash
# Example: Link design-architect and software-architecture-lead into your app
mkdir -p /path/to/your-project/.agents/skills
ln -s "$(pwd)/skills/design-architect" /path/to/your-project/.agents/skills/design-architect
ln -s "$(pwd)/skills/software-architecture-lead" /path/to/your-project/.agents/skills/software-architecture-lead
```

---

## Credits & Attribution

The skills in this repository are independently curated, synthesized, and structured into progressive-disclosure agent modules by [Muhammad Naufal Arif](https://github.com/naufallariff). They distill established industry standards, open-source documentation, and community best practices across modern web platform engineering, TypeScript/Node.js architecture, perceptual color/design systems, and interaction physics.

## Contributing

Contributions, refinements, and new modular skills are welcome. Please review [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) before opening a pull request.

## License

Released under the [MIT License](LICENSE) © 2026 [Muhammad Naufal Arif](https://github.com/naufallariff).