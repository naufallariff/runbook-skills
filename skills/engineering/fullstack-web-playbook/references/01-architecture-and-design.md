# Architecture, rendering, and layout

Load for rendering selection, responsive layout, or feature planning.

## Rendering decisions

| Constraint | Candidate | Verify |
|---|---|---|
| Mostly static public content | Static generation | Freshness and rebuild cost |
| Personalized initial content | Server rendering | Auth isolation and cache keys |
| Interactive application state | Client components within existing architecture | Bundle cost and hydration |
| Slow independent data sources | Streaming where supported | Error boundaries and loading order |

Choose the smallest change to the existing rendering model. Do not introduce streaming, PWA support, browser AI, or a new framework unless the user journey requires it.

## Feature contract

Record actor, entrypoint, authorized resource, request schema, response schema, transaction, duplicate policy, loading/error/recovery states, and observable acceptance test. Interfaces describe types; a runtime parser enforces input shape.

## Responsive and accessible layout

- Use semantic landmarks and native controls. Design for content growth, not fixed screenshot dimensions.
- Set min-width: 0 on shrinking flex/grid content where necessary. Use logical properties for direction-dependent spacing.
- Test narrow/wide containers, long strings, zoom, and reflow. Use container queries only when target support is verified.
- Feature-detect optional CSS; keep readable content and controls without it. Do not assume draft color/animation APIs are implemented.
- Reserve image/video dimensions and avoid delayed layout insertions above active content.
- Measure text contrast; visible focus must remain visible and unobscured.

Ground checks in [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 1.4.3, 1.4.10, 1.4.11, 2.1.1, 2.4.7, and 2.4.11. [Core Web Vitals](https://web.dev/articles/vitals) supplies performance measurement guidance, not a guarantee from these design choices.
