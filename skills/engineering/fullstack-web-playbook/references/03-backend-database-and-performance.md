# Data boundaries and performance

Load for APIs, storage, caching, or measured latency work.

## API and persistence

- Define request/response schemas and stable error codes. Narrow validated values according to the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html).
- Apply resource authorization on every protected operation; a valid identifier does not imply ownership.
- Parameterize queries; use constraints to protect uniqueness and referential integrity.
- Define transaction boundaries around invariants. An application-side existence check alone cannot prevent concurrent duplicates.
- Use a stable idempotency key for repeatable mutations where duplicate effects matter. Reconcile unknown outcomes before retrying.
- Select indexes from actual query predicates/order and inspect plans. Check N+1 behavior and connection budgets.
- Include identity/tenant boundaries in cache design; never place private responses in shared caches unintentionally.
- For HTTP errors, [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) defines an optional problem-details format. Do not expose internal traces or secrets.

## Core Web Vitals

Per [web.dev Core Web Vitals](https://web.dev/articles/vitals), assess good field thresholds at the 75th percentile separately for mobile and desktop:

| Metric | Good threshold | Investigation |
|---|---|---|
| LCP | <= 2.5 s | Server time, critical resource discovery, media bytes |
| INP | <= 200 ms | Event handlers, long tasks, rendering work |
| CLS | <= 0.1 | Media dimensions, font swaps, inserted content |

Record route, sample/time window, device segmentation, tool, and field versus lab origin. A lab run without user interaction does not establish field INP.

Prioritize the measured bottleneck. Avoid lazy-loading the actual LCP media; reserve dimensions; break long work into bounded tasks using supported scheduling tools. Confirm behavior under representative content and load.

Do not prescribe WebAssembly, workers, edge deployment, or a cache layer without evidence that it addresses the bottleneck. A compiler success or synthetic benchmark cannot establish production latency.
