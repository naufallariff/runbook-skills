# Repository Conventions (AGENTS.md)

This repository maintains modular AI Agent Skills following the Agent Skills Open Standard.

## Rules for Modifying or Adding Skills

1. **Folder & Frontmatter Match:** Every skill directory under `skills/<skill-name>/` must contain a `SKILL.md` whose YAML frontmatter `name` matches `<skill-name>` in `kebab-case`.
2. **Actionable Trigger Descriptions:** Write `description` in YAML frontmatter to clearly define *what* the skill does and *when* it should activate.
3. **Progressive Disclosure:** Keep `SKILL.md` concise and scannable. Move deep reference tables, code blueprints, and extended checklists into `skills/<skill-name>/references/` and link to them explicitly from `SKILL.md`.
4. **Zero Secrets or Personal Data:** Never commit API keys, personal account identifiers, private URLs, or credentials to this repository.
5. **Packaging Verification:** Run `./scripts/package-skills.sh` before committing changes to ensure every skill packages cleanly without nested root folders.