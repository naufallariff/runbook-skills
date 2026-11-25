# Standards, browser support, and profiling

Load when selecting APIs, reviewing accessibility, or investigating dropped frames.

## Source ledger

| Primary source | Supported claim |
|---|---|
| [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/) | Property transitions, interruption/reversal, events |
| [CSS Easing Functions Level 1](https://www.w3.org/TR/css-easing-1/) | Easing syntax and interpolation progress |
| [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | User motion-preference query |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | Keyboard/focus, pause/stop, flashing, interaction animation criteria |
| [Core Web Vitals](https://web.dev/articles/vitals) | Field INP/CLS/LCP assessment |

Draft specifications do not establish browser availability. Check the supported browser/version and feature detection before adopting optional APIs.

## Accessibility distinctions

WCAG 2.2 criterion 2.3.3 addresses disabling nonessential interaction-triggered animation at AAA. Criteria 2.2.2 and 2.3.1 address applicable pause/stop/hide and flashing constraints. Do not reduce all accessibility checks to a media query.

Reduced motion can use immediate state changes. Avoid assuming opacity/color motion is always harmless. Keep focus and status feedback independent of animation callbacks.

## Profiling procedure

1. Record component, browser/version, viewport, content size, CPU conditions, and baseline.
2. Capture a performance trace during activation and rapid reversal; inspect long tasks, layout, paint, and compositing.
3. Compare the changed trace under the same conditions. Inspect focus and layout stability.
4. Use slow playback for visual inspection, then restore normal timing for input tests.
5. Report the observed result and device limits; distinguish real-device tests from emulation.

Transform/opacity can be composited in suitable conditions. CSS, JavaScript, WAAPI, clip-path, blur, and motion-library shorthand have no blanket acceleration guarantee. Avoid unnecessary layer promotion and verify actual rendering.

A local trace is not field INP. Assess field Core Web Vitals at the 75th percentile, segmented by mobile/desktop, when such data is available.
