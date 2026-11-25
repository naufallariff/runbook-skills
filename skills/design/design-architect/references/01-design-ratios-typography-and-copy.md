# Typography, spacing, and copy

Load when setting content hierarchy or writing interface text.

## Local design choices

Choose a small spacing scale matching the existing product; a 4/8 px rhythm is an optional starting point. Select type sizes by hierarchy and actual content. Golden ratios, fixed line lengths, and a prescribed whitespace percentage are not accessibility standards.

Use relative text units where appropriate, test 200% zoom, and prevent clipped text. Use tabular numerals for values compared vertically. Let labels wrap and verify localized strings.

## Copy contract

- Use verb + object for actions when it clarifies the outcome.
- Describe empty states with the next useful action.
- Explain recovery beside an error; preserve user input.
- Give destructive actions a clear consequence and the product's required confirmation.
- Use supplied evidence for metrics/testimonials; label synthetic examples and never ship them as real customer data.
- Preserve the user's language and brand voice. Remove promotional filler rather than inventing claims.

## Acceptance

Test the longest supported labels, missing data, zoom, and narrow layouts. Confirm headings express hierarchy rather than visual size alone; controls retain accessible names.

Ground text resizing/reflow and labels in [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 1.4.4, 1.4.10, 2.4.6, and 3.3.2. A modular scale is a design heuristic, not proof of conformance.
