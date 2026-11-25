# Task flows and recovery states

Load for navigation, forms, data screens, or interaction audits.

## State matrix

| State | Required behavior |
|---|---|
| Loading | Explain progress without duplicate submissions |
| Empty | Distinguish no records from failure; offer useful action |
| Success | Show actual result and next task |
| Stale | Identify freshness and refresh behavior |
| Error | Explain recovery; retain useful input |
| Partial | Identify available/missing portions |
| Overflow | Preserve access to long or dense content |

Use only applicable states. Do not fabricate data to hide incomplete backend integration.

## Flow acceptance

1. Identify actor, starting state, primary action, authorized outcome, and recovery path.
2. Use native actions/navigation semantics and names matching the result.
3. Verify keyboard order, visible/unobscured focus, dismissal, and focus restoration.
4. Test labels, validation announcements, long content, 200% zoom, narrow reflow, and RTL where supported.
5. Verify every displayed control; label static prototypes so they cannot be mistaken for functioning integrations.

[WCAG 2.2](https://www.w3.org/TR/WCAG22/) 2.5.8 uses a 24 CSS px minimum target with exceptions/spacing provisions. A 44 px default is a larger local usability choice, not the AA minimum.

Avoid presenting simplified UX maxims as fixed laws or evidence of audience behavior. Prefer observed task performance and product constraints. When browser access is missing, mark interaction checks BLOCKED and provide test steps.

## Supplied field evidence

The 2026-11-25 intake supplied [HN item 50383228](https://news.ycombinator.com/item?id=50383228) about context limits, [VS Code issue 13953](https://github.com/microsoft/vscode/issues/13953) about project diagnostics, and [HN item 50339913](https://news.ycombinator.com/item?id=50339913) about QA agents exploring user flows. These anecdotes motivate bounded reference loading and complete flow checks; they are not empirical design studies.
