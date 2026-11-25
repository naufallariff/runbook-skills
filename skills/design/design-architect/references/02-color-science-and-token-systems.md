# Color and token contracts

Load when defining palettes, themes, or component token schemas.

## Token matrix

| Layer | Example identifier | Contract |
|---|---|---|
| Primitive | --neutral-950 | Raw color/spacing/type value |
| Semantic | --surface, --text, --danger | Role; theme maps to primitives |
| Component | --button-bg | Optional local override referencing roles |

Reuse the existing system rather than duplicating it. Keep component usage semantic; preserve exceptions needed for charts or externally specified brand assets. Add only roles used by the requested scope.

[CSS Color 4](https://www.w3.org/TR/css-color-4/#ok-lab) defines Oklab/OKLCH. Perceptual lightness helps palette construction but does not guarantee equal apparent brightness or accessible contrast. Check gamut and rendered color pairs.

## Contrast verification

Use [WCAG 2.2](https://www.w3.org/TR/WCAG22/) 1.4.3: normal text >= 4.5:1; large text >= 3:1. Large text means at least 18 pt regular (24 CSS px) or 14 pt bold (about 18.67 CSS px). Use criterion 1.4.11 for applicable non-text information at >= 3:1.

Measure text against its actual background in each theme and interaction state. Account for alpha, overlays, disabled exceptions, and focus appearance. Do not use OKLCH L differences as a substitute for the contrast calculation.

## Theme acceptance

Verify default, hover, active, focus, selected, error, and disabled states where applicable. Provide non-color status cues. Test light/dark and forced-color behavior.

Palette counts, tinted neutrals, dark surface steps, and 60/30/10 distribution are optional art-direction heuristics. Preserve user-defined black/white or brand colors when they meet the task and contrast requirements.
