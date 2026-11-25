# Architecture contracts

Load the relevant subsection for a structural decision, compiler audit, or migration.

## Decision record

Record: objective; non-goals; observed paths/versions; assumptions; constraints; current design; alternative; choice and rationale; security boundaries; compatibility; operating cost; acceptance tests; rollback; owner; revisit trigger. Omit speculative scale estimates unless supplied or measured.

Prefer a single package for one deployment unit. Introduce workspaces for actual shared ownership or independently deployed packages. Document allowed dependency direction and public entrypoints; check for cycles after moves.

## Compiler and runtime review

1. Inspect the installed TypeScript/runtime, module mode, package exports, and project references.
2. Prefer strict checking for new TypeScript projects. For existing projects, stage stricter options with consumer fixes instead of silently changing the baseline.
3. Review noUncheckedIndexedAccess and exactOptionalPropertyTypes against the installed compiler and project semantics.
4. Match module/moduleResolution to the actual Node or bundler host. Do not assume development resolution proves emitted imports work.
5. Runtime type stripping does not perform typechecking. Run the compiler across affected projects, including unopened consumers.
6. Use unknown plus runtime validation for external values; preserve discriminated error results and awaited/cancellable I/O.

These mechanisms follow the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) and its [narrowing chapter](https://www.typescriptlang.org/docs/handbook/2/narrowing.html). Compiler options are project decisions, not universal defaults.

## Migration acceptance matrix

| Scenario | Expected result |
|---|---|
| Current consumers use expanded contract | Existing behavior preserved |
| New consumers use new contract | New behavior verified |
| Malformed external input | Rejected at boundary |
| Missing runtime/service | Explicit failure; no partial success claim |
| Backfill resumed | Reconcile completed records; no duplicates |
| Rollback before contract removal | Old readers/writers remain compatible |
| Contract removal proposed | Consumer migration evidence required first |

Use expand -> migrate -> contract for incompatible schemas/contracts. Never remove compatibility before usage evidence supports it. Apply stable operation identifiers and bounded retries to side effects; reconcile unknown outcomes before retrying.

Map selected [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) requirements to authentication, resource authorization, validation, and logging at affected boundaries. Record edition/IDs and evidence; a checklist is not certification.

For deployable services, use [Twelve-Factor configuration guidance](https://12factor.net/config) as methodology, with validated configuration and secret-safe diagnostics. Loading application configuration does not authorize exporting credentials.

## Portable execution

Use available repository search, compiler, test runner, and shell capabilities. If a named integration is missing, use equivalent local tools or mark the dependent check BLOCKED. Installation/discovery differs by agent host; do not claim tested compatibility without a host run.

## Supplied field evidence

The 2026-11-25 intake supplied these public report identifiers and excerpts. Treat them as anecdotes; the underlying threads were not independently revalidated.

- [VS Code issue 13953](https://github.com/microsoft/vscode/issues/13953): project errors outside opened files motivate whole-project checking.
- [TypeScript issue 19573](https://github.com/microsoft/TypeScript/issues/19573): requested wider suppression scope motivates repairing boundaries rather than masking broad errors.
- [VS Code issue 43188](https://github.com/microsoft/vscode/issues/43188): workspace organization friction motivates explicit root ownership.
- [Docker for Mac issue 7520](https://github.com/docker/for-mac/issues/7520): startup failure motivates honest missing-service gates.
- [HN item 49702887](https://news.ycombinator.com/item?id=49702887): lost session context motivates compact decision checkpoints.
