# Motion contract and acceptance fixtures

Load for timing selection, gestures, or repeatable interaction checks.

## Contract fields

Record component/target; initial/final state; entry/exit/reversal triggers; property; duration_ms; easing; transform origin; reduced-motion behavior; focus owner; cancellation; cleanup; fallback; acceptance evidence.

Keep this record with the implementation only when the task needs documentation. Do not generate unused schemas.

## Optional starting tokens

| Purpose | Initial choice | Condition |
|---|---|---|
| Frequent navigation | Immediate or <= 120 ms | Never delay input/focus |
| Small feedback | 120-180 ms, ease-out | Adjust after target-device testing |
| Drawer/popover | 160-240 ms, ease-out | Retarget from current position |
| Reduced motion | Immediate state change | Retain status text and task feedback |

These are local starting points, not requirements from CSS or WCAG. Reuse product tokens first. Use explicit properties rather than transition: all.

## Gesture invariants

Track the initial pointerId and ignore others. Use performance.now() or another monotonic clock. Define displacement in CSS px and velocity in px/ms; compute only when elapsed_ms > 0. Select distance/velocity thresholds from component dimensions and target-device testing, not an unexplained universal number.

Capture the active pointer where needed; handle pointerup, pointercancel, lostpointercapture, and unmount. Restore a defined state after cancellation, clear timers/listeners, and preserve scroll intent. Provide equivalent keyboard/button actions. A completed animation is not authorization for a destructive operation.

## Fixtures

| Input | Expected result |
|---|---|
| Open -> close | Defined final state and correct focus |
| Open -> close -> reopen before completion | Current state wins; stale callbacks cannot remove it |
| Reduced motion enabled before/during interaction | No nonessential travel; action remains usable |
| Escape or alternate close button | Same semantic result as pointer action |
| Pointer cancel/lost capture | Defined recovery; no stuck drag |
| Zero elapsed gesture sample | No division by zero or accidental dismissal |
| Missing optional animation API | Static/native fallback works |
| Repeated mount/unmount | No duplicate handlers, timers, or durable effects |

Attribute transition/reversal behavior to [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/) and easing definitions to [CSS Easing Level 1](https://www.w3.org/TR/css-easing-1/). Test results must name the actual component/runtime; this table is a procedure, not executed evidence.

## Supplied field evidence

The 2026-11-25 intake supplied [HN item 50339913](https://news.ycombinator.com/item?id=50339913) about QA agents exploring controls/flows and [HN item 50383228](https://news.ycombinator.com/item?id=50383228) about context limits. They motivate bounded inspection and explicit interaction fixtures. Neither report establishes animation performance or motion-specific failure rates.
