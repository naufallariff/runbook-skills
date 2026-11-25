# Frontend state and interaction contracts

Load for components, forms, navigation, or browser behavior.

## Form contract

1. Use native input types, explicit labels, appropriate autocomplete, and buttons with explicit submission intent.
2. Keep user input after a recoverable error. Associate field errors programmatically and announce submission outcomes.
3. Validate on the server even when the client validates. Do not silently coerce a numeric string unless the declared schema permits conversion and rejects ambiguous values.
4. Disable duplicate submission only while pending; reconcile uncertain server outcomes before retrying.
5. Avoid interfering with IME composition or automatically changing focus while the user types.

## Interaction matrix

| Component | Required behavior |
|---|---|
| Link | Real destination and keyboard activation |
| Button | Action, pending/error feedback, accessible name |
| Dialog | Appropriate initial focus, modal isolation where applicable, Escape/close path, restored focus |
| Tabs | Named controls, selected state, keyboard navigation consistent with chosen pattern |
| Toast/status | Useful announcement without stealing focus |
| Data view | Loading, empty, success, stale, partial, error, and overflow where applicable |

Libraries provide primitives, not proof that an assembled component is accessible. Exercise keyboard, focus, and names in the actual page.

## Motion and optional APIs

Use explicit transition properties and a reduced-motion branch. Content must remain operable if animation fails or is cancelled. Check optional API availability before use and provide a static/native fallback. Never depend on animation completion to authorize an operation.

Use native platform behavior where it meets the task; add Web Components, View Transitions, or browser integrations only with verified support and a clear requirement.

Ground interaction acceptance in [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 2.1.1, 2.4.3, 2.4.7, 3.3.1, 3.3.2, and 4.1.3. Use [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/) for transition semantics; motion timings remain local choices.
