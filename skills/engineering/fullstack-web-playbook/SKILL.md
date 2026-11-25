---
name: fullstack-web-playbook
description: >-
  Use when building or repairing a full-stack web feature. Trace the user journey through runtime schemas, authorization, database transactions, and browser states to ship a tested vertical slice with accessibility and performance evidence.
---

# Fullstack Web Playbook

## Core Constraints

- Input: user journey, repository, acceptance criteria, supported browsers/runtime, and data sensitivity. Output: a working vertical slice or scoped findings, changed files, and executed-check evidence.
- Follow installed framework and package versions. Prefer existing primitives and scripts; verify browser support before introducing platform APIs. No automatic stack replacement.
- Ground type narrowing in the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/narrowing.html), security checks in [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/), and accessibility in [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Record applicable versions/criteria; do not infer compliance from a single scanner.
- Validate untrusted data on the server, enforce authorization per resource, parameterize queries, and keep secrets out of clients, logs, and fixtures. Client validation improves feedback but cannot enforce trust.
- Use only authorized local tools and writes. Keep production deployment, destructive migrations, external transfers, and new dependencies within explicit task scope.
- Load only the relevant reference: [architecture/rendering](references/01-architecture-and-design.md), [frontend states/forms](references/02-frontend-ui-and-behaviors.md), [data/performance](references/03-backend-database-and-performance.md), or [security/testing/delivery](references/04-security-privacy-testing-deploy.md).

## Execution Protocol

1. Trace one acceptance journey from UI -> API -> domain -> database and back. Inspect existing contracts, scripts, auth, and schema. If requirements conflict, resolve the conflict before affected writes; otherwise proceed with stated reversible assumptions.
2. Define request/response schemas, failure codes, ownership, and transaction boundaries. Specify loading, empty, success, validation error, server error, and retry behavior. Distinguish missing data from zero.
3. Implement the smallest complete slice. Use semantic controls, explicit labels, visible focus, and keyboard operation. Keep authoritative state on the server; reconcile optimistic UI after rejection.
4. Handle expected errors explicitly. Return stable error codes without internal details. Bound network timeouts and retries; reconcile unknown mutation outcomes before retrying. Use idempotency keys or uniqueness constraints where duplicate submission matters.
5. Add integration coverage for valid, malformed, unauthorized, duplicate, and conflicting requests. Run the whole affected TypeScript project, not only editor-open files. If storage or browser tools are unavailable, record the missing checks as BLOCKED.
6. Measure the changed route. Per [Core Web Vitals guidance](https://web.dev/articles/vitals), good field thresholds at the 75th percentile are LCP <= 2.5 s, INP <= 200 ms, and CLS <= 0.1, segmented by mobile/desktop. Label lab results separately; missing field data remains unverified.
7. Run existing lint/typecheck/test/build scripts and applicable security/accessibility checks. Inspect final diffs and keep deployment artifacts local unless release execution was requested. Stop after two repair cycles on the same failure and report its evidence.

## Failure Modes / What NOT to Do

| Trigger | Required response |
|---|---|
| A numeric input arrives as a string | Validate the declared schema; permit explicit conversion only under a documented contract. |
| Shared types change but unopened consumers fail | Run project-wide typecheck; repair consumers instead of broad suppressions. |
| A mutation times out and the UI offers retry | Read the operation outcome or use a stable idempotency key before repeating it. |
| A development database cannot start | Mark integration verification BLOCKED; never substitute mocked persistence claims. |
| A new CSS/browser API is unsupported | Use feature detection and a tested static/native fallback. |
| A score or screenshot looks correct | Verify keyboard behavior, failure states, and real data flow before claiming completion. |

The numeric-schema mismatch, hidden project errors, and Docker startup cases reflect supplied 2026-11-25 anecdotes; their reported scores do not establish prevalence.

## Verification Gate

- Demonstrate the acceptance journey, malformed input rejection, resource authorization, duplicate handling, and rollback/recovery behavior relevant to the change.
- Verify keyboard-only operation, names/labels, focus order, error announcements, contrast, and reduced-motion behavior where motion changes.
- Record commands, exit status, target runtime/browser, and lab versus field measurements. Run a second submission to confirm no duplicate durable effect where applicable.
- PASS requires all required checks; FAIL identifies an observed defect; BLOCKED identifies missing evidence or tooling. Never label skipped checks as passing or a local build as deployed.
