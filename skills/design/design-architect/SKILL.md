---
name: design-architect
description: >-
  Use when creating or auditing a product interface or design system. Map user tasks to complete UI states, semantic OKLCH tokens, and WCAG 2.2 checks to deliver responsive components with working controls and traceable design decisions.
---

# Design Architect

## Core Constraints

- Input: product task, audience, brand assets, existing interface, delivery format, and target viewports. Output: scoped design or implemented components, state/token definitions, and verification evidence.
- Build on the user's product and installed styling system. Treat spacing scales, effect limits, and visual references as design choices; never present aesthetic preferences as standards.
- Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) criteria 1.4.3, 1.4.11, 2.1.1, 2.4.7, 2.4.11, and 2.5.8 for contrast, keyboard access, focus, and target size. The AA minimum target is 24 CSS px subject to exceptions; a 44 px target is an optional larger design default.
- Define primitive -> semantic -> component tokens. [CSS Color 4](https://www.w3.org/TR/css-color-4/#ok-lab) defines OKLCH; equal lightness does not guarantee contrast. Measure rendered foreground/background pairs in each theme.
- Use real supplied data or clearly labeled synthetic fixtures. Never invent adoption metrics, testimonials, affiliations, or compliance claims.
- Use authorized repository edits and local previews; do not publish or transmit private assets without authorization. Load only one or two relevant references initially; load another only when a task branch requires it.

## Execution Protocol

1. Infer build versus audit from the request. Inspect existing components, tokens, content, and constraints; identify the primary task and measurable completion condition. Ask only for missing information that prevents correct work.
2. Map the task into navigation, content hierarchy, and state transitions. Define success, empty, loading, stale, error, partial, and overflow states where data exists. For audits, identify reproducible findings and severity before targeted fixes.
3. Select spacing, type hierarchy, density, and expressive detail for the audience. Use [typography/copy](references/01-design-ratios-typography-and-copy.md) for content hierarchy and [tokens](references/02-color-science-and-token-systems.md) for theme schemas. Preserve brand constraints; avoid unnecessary visual reinvention.
4. Implement semantic responsive components with real control behavior. Use [flows](references/04-ux-laws-and-functional-flows.md) for error/recovery contracts and [component craft](references/05-tailwind-v4-and-component-craft.md) only when integrating styling or interactive primitives.
5. For requested brand/vector/3D assets, load [graphic assets](references/03-graphic-3d-and-logography.md); verify rights and provide appropriate alternatives to nonessential canvas content. For dashboards, slides, or motion planning, load [data and motion](references/06-dashboard-data-viz-and-motion.md).
6. Verify representative narrow/wide layouts, long text, 200% zoom, keyboard operation, theme contrast, and data edge states. Reserve media dimensions and assess layout shifts using [Core Web Vitals guidance](https://web.dev/articles/vitals); visual polish alone is not performance evidence.
7. Reinspect current files before revising to preserve concurrent changes and reuse existing tokens. Complete authorized work without requiring an arbitrary continuation prompt. On context exhaustion, checkpoint delivered files and remaining checks. Stop after two repair cycles for the same defect.

## Failure Modes / What NOT to Do

| Trigger | Required response |
|---|---|
| A static mockup hides a broken user journey | Exercise each control and error/recovery path; label intentional prototypes explicitly. |
| Token edits create errors beyond the open file | Run the project build/typecheck and inspect affected consumers; avoid broad suppressions. |
| Context pressure invites loading every reference | Read by task branch; checkpoint evidence and pending work instead. |
| Unknown data is rendered as zero | Show a missing/stale state and preserve units, period, and comparison baseline. |
| A color scale looks uniform | Measure contrast in both themes; do not use OKLCH lightness as a compliance test. |
| A decorative animation delays interaction | Make the control immediately usable and provide a reduced-motion alternative. |

Context budgets, project-wide diagnostics, and autonomous QA requests are grounded in supplied 2026-11-25 field reports. They motivate bounded reads and flow checks; they do not establish design defect prevalence.

## Verification Gate

- Confirm primary task, responsive hierarchy, working controls, and every applicable data state against acceptance criteria.
- Measure text/non-text contrast; test keyboard focus, accessible names, target spacing, long content, and zoom. Distinguish automated findings from manual checks.
- Run relevant existing lint/typecheck/build checks for code output; compare token names and component consumers. Repeat application without duplicate tokens or controls.
- Return files or audit findings with PASS, FAIL, or BLOCKED evidence and specific limitations. Missing browser access blocks visual/interaction verification, not production of a clearly labeled design draft.
