# Styling integration and component contracts

Load for Tailwind integration or component implementation.

## Version-aware integration

Inspect installed Tailwind and framework versions before using utilities/configuration. Retain a working v3 setup unless migration is requested; v4 syntax is not a universal requirement.

For an existing v4 setup, follow its CSS-first theme conventions and map semantic roles to utilities. Verify installed compiler/editor support before replacing utility names or adding directives. Do not infer validity from a class-name list.

Prefer existing variants and merge helpers instead of adding dependencies. Check generated styles, not just editor warnings. Any styling tool remains optional; no external service is required by this skill.

## Component contract

- Use native buttons for actions and links for destinations.
- Give icon controls accessible names; hide decorative icons.
- Provide visible focus, disabled/pending behavior, error feedback, and appropriate target size.
- Use installed accessible primitives where available; verify assembled behavior rather than assuming the library guarantees it.
- Separate layout, role tokens, and component state. Avoid duplicated raw values when an existing token fits.
- Test logical spacing, shrinking grid/flex content, overflow, and supported themes.

Ground acceptance in [WCAG 2.2](https://www.w3.org/TR/WCAG22/) keyboard, focus, name/role/value, contrast, and target criteria. A successful CSS build or zero editor warnings cannot prove accessibility.

For a migration, record before/after output on representative components and preserve rollback. Run affected project-wide checks so unopened consumers are included.
