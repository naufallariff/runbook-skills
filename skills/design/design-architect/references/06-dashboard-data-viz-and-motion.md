# Dashboard, slide, and motion contracts

Load for data-dense screens, presentations, or motion planning.

## Data honesty

Record each metric's source, units, period, aggregation, freshness, and comparison baseline. Display missing values distinctly from zero. Label synthetic fixtures; do not imply production measurements.

Choose encodings by the comparison task: aligned positions/bars for magnitude, lines for ordered time, and tables for exact values. Explain truncated axes, filters, and sampling; avoid ornamental encodings that obscure the comparison.

Make charts usable through labels, summaries, or accessible tables as appropriate. Use text/shape alongside color under [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 1.1.1 and 1.4.1.

## Layout and slides

Place the primary task or highest-priority question first. Keep filters and date ranges visible and scoped. Dense views need overflow and narrow-layout behavior, not arbitrary card counts.

For requested slides, use one supported claim per focal view with source and units. Do not invent traction, funding, customer logos, or projections.

## Motion

Keep actions immediately available. Use motion for state continuity; suppress nonessential travel/loops for reduced-motion users. Test interruption and focus, not just the final frame.

Use [CSS Easing Level 1](https://www.w3.org/TR/css-easing-1/) and [CSS Transitions Level 1](https://www.w3.org/TR/css-transitions-1/) for timing/reversal semantics. Local durations are design defaults. Transform and opacity are profiling candidates; clip-path/blur may paint, and no property guarantees hardware acceleration.

Reserve media space and measure [Core Web Vitals](https://web.dev/articles/vitals) where route performance is affected. Screenshots do not establish INP or CLS.
