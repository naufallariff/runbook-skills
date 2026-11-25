---
name: ui-motion-craft
description: >-
  Use when implementing or reviewing UI transitions, drawers, popovers, or drag gestures. Define interruptible state transitions, easing tokens, and reduced-motion fallbacks to deliver responsive interactions with tested focus and cancellation behavior.
---

# UI Motion Craft

## Core Constraints

- Input: component, interaction/state graph, target browsers/devices, motion preferences, and acceptance criteria. Output: scoped implementation or Before/After/Why findings, motion contract, and verification evidence.
- Keep content and actions usable without animation. Motion may explain state or spatial continuity; it must not delay focus, input acceptance, or authorization decisions.
- Attribute timing-function semantics to [CSS Easing Functions Level 1](https://www.w3.org/TR/css-easing-1/) and transition/reversal semantics to [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/). Durations and gesture thresholds are local design choices.
- Follow [WCAG 2.2](https://www.w3.org/TR/WCAG22/) for keyboard access, focus, pause/stop controls, and flashing. Interaction animation criterion 2.3.3 is AAA; respect [prefers-reduced-motion](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) without claiming it alone proves conformance.
- Prefer transform/opacity for candidate compositor animations, then profile. Neither CSS, WAAPI, clip-path, nor a transform string guarantees GPU execution or smooth frames.
- Use existing motion libraries and installed APIs. Limit tools to authorized code edits, local browser inspection, and project checks. Do not add dependencies, publish, or send interaction recordings externally without task authorization.
- Load [motion contracts](references/motion-contracts.md) only for timing tables, gesture invariants, or acceptance fixtures. Load [standards and profiling](references/standards-and-profiling.md) when support or rendering behavior is in question.

## Execution Protocol

1. Inspect the component and consumers. Record initial/final states, entry/exit triggers, focus ownership, cancellation, cleanup, and the behavior with motion disabled. If no component or task exists, request the missing target; do not emit a scripted greeting.
2. Decide whether motion adds task information. Repeated navigation may use little or no travel. Keyboard input remains immediate; a short visual confirmation is acceptable when it adds information without blocking operation.
3. Define explicit properties, duration in ms, easing, origin, and a reduced-motion branch. Reuse existing tokens; begin with the reference's optional defaults only when no system exists. Do not use transition: all.
4. Implement retargeting from the current visual state. Transitions suit state toggles; use keyframes/WAAPI when their control fits the task. Handle rapid reversals and completion/cancellation explicitly; do not rely solely on transitionend to unmount or unlock a control.
5. For drag, track one pointer ID, use monotonic time and explicit px/ms units, guard zero elapsed time, handle pointercancel/lost capture, and preserve scrolling where appropriate. Provide a keyboard/button equivalent; destructive actions follow the same authorization contract for every input method.
6. Test enter, exit, rapid reopen, reversal, repeated activation, reduced motion, keyboard use, and unmount during motion. Record exact browser/device and unavailable checks. Profile under representative content and CPU load before making performance claims.
7. Inspect listeners, timers, focus restoration, and durable effects after repetition. Reuse existing tokens/listeners rather than adding duplicates. Stop after two repair cycles on the same defect; return the reproducible failure or missing capability.

## Failure Modes / What NOT to Do

| Trigger | Required response |
|---|---|
| A QA pass checks only a final screenshot | Test intermediate, interrupted, and cancelled states with input enabled. |
| Animation appears smooth on a quiet desktop | Profile representative load; do not infer device or field performance. |
| Rapid toggles leave a drawer stuck | Reconcile current state and cancel stale completion callbacks. |
| Reduced motion still causes travel or looping | Supply immediate/static state changes; preserve essential status text. |
| A swipe is the sole way to dismiss or act | Add an equivalent keyboard/button path and test focus restoration. |
| Context or tool budget runs out | Save authorized state/test references; mark unexecuted checks BLOCKED. |

The supplied 2026-11-25 QA-agent and context-budget reports motivate interaction fixtures and bounded inspection. They are anecdotal workflow evidence, not animation benchmarks.

## Verification Gate

- Record the state contract and normal/reduced branches. Confirm immediate input, accessible controls, focus placement, and cleanup.
- Execute positive, rapid-reversal, cancellation, zero-time gesture, missing-API fallback, and repeated-mount fixtures relevant to the component.
- Check [Core Web Vitals](https://web.dev/articles/vitals) when interaction/layout changes affect the route; distinguish local profiling from field INP/CLS evidence.
- Report PASS, FAIL, or BLOCKED per check. Review findings use a Before/After/Why table. Do not claim cross-browser, physical-device, or marketplace approval from local checks alone.
