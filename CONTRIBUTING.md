# Contributing to Fyuraa Agent Skills

Thank you for helping improve this skill collection!

## Skill Structure Standard

Every skill lives inside `skills/<skill-name>/` and follows this layout:

```text
skills/<skill-name>/
├── SKILL.md          # Required: YAML frontmatter (name, description) + core instructions
├── references/       # Optional: Deep reference modules loaded on demand
├── scripts/          # Optional: Deterministic helper scripts
└── assets/           # Optional: Templates or static examples
```

## Pull Request Checklist

- [ ] Folder name under `skills/` matches the `name` field in `SKILL.md` YAML frontmatter (`kebab-case`).
- [ ] `SKILL.md` stays focused on a single clear responsibility without bloating context.
- [ ] Any external code blocks inside Markdown files avoid unescaped nested backtick collisions.
- [ ] No proprietary, personal, or sensitive credentials are included.
- [ ] Tested packaging locally via `./scripts/package-skills.sh`.

## Commit Message Style

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(design-architect): add container query layout rules`
- `fix(fullstack-web-playbook): clarify passkey conditional mediation snippet`
- `docs: update installation guide in README`