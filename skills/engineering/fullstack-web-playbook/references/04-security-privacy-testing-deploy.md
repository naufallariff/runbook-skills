# Security, privacy, tests, and delivery

Load when modifying trust boundaries, auth, release preparation, or verification.

## Security contract

Select the [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) edition and requirement IDs applicable to the change. Verify server-side validation, per-resource authorization, session lifecycle, output encoding, and secret-safe logs.

- Use maintained authentication libraries and the existing identity model. Passkeys require a verified server-side ceremony; do not replace auth with handwritten cryptography.
- Scope session cookies and CSRF protection to the application threat model. SameSite alone is not a complete authorization or CSRF design.
- Prefer text rendering for untrusted content. If rich HTML is required, use a maintained allowlist sanitizer and test hostile markup. CSP is defense in depth.
- Configure CSP, framing, transport, and isolation headers against real integration needs. Do not enable HSTS preload or strict isolation blindly.
- Check exact message origins and expected payloads for cross-window communication.
- Minimize retained personal data; use synthetic fixtures and redact logs. Browser-local storage is not automatically secure or private.

## Verification matrix

| Case | Expected evidence |
|---|---|
| Valid user journey | UI -> API -> durable state -> response |
| Malformed input | Server rejection; no partial mutation |
| Unauthorized resource | Denial without disclosure or mutation |
| Duplicate/concurrent request | Documented conflict or single durable effect |
| Storage/network failure | Recoverable error and reconciled retry |
| Missing service/browser | BLOCKED check, not simulated success |
| Repeated verification | Isolated fixtures; no duplicated side effects |

Run existing lint, project-wide compiler, relevant tests, and build. Use available dependency/static security scans; record scope and findings. Automated accessibility checks need manual keyboard/focus checks under [WCAG 2.2](https://www.w3.org/TR/WCAG22/).

## Release boundary

Prepare a local artifact, migration compatibility evidence, smoke checks, and rollback criteria. Deployment requires task authorization. Record actual target and outcome if executed.

For requested offline/PWA behavior, exclude sensitive responses from inappropriate caches and test update/offline recovery. Do not claim an origin redirect migrates installed application storage.

Record real-user performance separately from local reports using [Core Web Vitals](https://web.dev/articles/vitals). Local test success does not establish production readiness across every host.

## Supplied field evidence

The 2026-11-25 intake supplied [Stack Overflow question 79935672](https://stackoverflow.com/questions/79935672) for a numeric-string schema mismatch, [VS Code issue 13953](https://github.com/microsoft/vscode/issues/13953) for errors beyond open files, and [Docker issue 7520](https://github.com/docker/for-mac/issues/7520) for unavailable local tooling. These supplied anecdotes motivate boundary tests and explicit blocked checks; no prevalence or causal claim is inferred.
