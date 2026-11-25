# Repository conventions

Maintain vendor-neutral, modular agent skills. Welcome external contributions under the same review rules.

1. Store skills in `skills/<domain>/<slug>/`. Use lowercase kebab-case domain and slug names, with globally unique slugs.
2. Start `SKILL.md` at byte zero with YAML frontmatter containing only `name` and `description`. Match `name` to the directory slug; describe capability and activation in 1-1024 characters.
3. Include populated level-two headings: `Core Constraints`, `Execution Protocol`, `Failure Modes / What NOT to Do`, and `Verification Gate`.
4. Keep task-specific references in the skill directory and load them on demand. Preserve relative links when moving files.
5. Exclude secrets, private URLs, personal account identifiers, and private personal data. Use synthetic examples. Retain legally required copyright and attribution notices.
6. Cite primary sources and verify redistribution rights for included material. Do not claim certification or endorsements.
7. Run `node --test scripts/validate-skills.test.mjs` and `node scripts/validate-skills.mjs` before submitting. Static scanning is a heuristic; manually inspect the full diff for secrets and personal data.
8. Keep ZIP packaging, distributions, paid products, and marketplace operations outside this public repository.
9. Keep the README catalog, skill count, contribution contract, attribution ledger, and Unreleased changelog consistent with the source tree. Use direct language and checkable claims.
10. Scope every Git command with `git -C <repo>`. The sibling private factory has an independent history and remote. Use concise Conventional Commit messages without AI co-author or agent trailers.
