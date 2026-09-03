# Security Policy

## Supported Versions

urupe-ui follows [semantic versioning](https://semver.org/). Security fixes are
backported to the current minor release and the immediately previous minor
release. Older versions are not patched.

| Version | Supported          |
| ------- | ------------------ |
| 4.x.x   | :white_check_mark: |
| 3.x.x   | :white_check_mark: |
| < 3.0   | :x:                |

## Reporting a Vulnerability

**Please do not file a public issue for security vulnerabilities.**

Report privately via one of the following channels:

1. **GitHub Security Advisories** (preferred):
   <https://github.com/aleconstancio/urupe-ui/security/advisories/new>
2. **Email**: open a draft security advisory on GitHub; the maintainer email
   is listed in the response.

Include in your report:

- A description of the vulnerability and its impact
- Reproduction steps or a minimal proof of concept
- The affected version(s)
- Your assessment of severity (CVSS if known)

You should receive an acknowledgement within **72 hours**. We aim to:

- Triage and confirm within **7 days**
- Ship a fix or mitigation within **30 days** for high/critical issues

We will coordinate disclosure timing with you and credit you in the release
notes (unless you prefer to remain anonymous).

## Scope

In-scope targets include:

- The published npm package `urupe-ui` and all its subpath exports
- The TypeScript / Svelte source in `src/`
- Build, lint, and test scripts that ship to npm
- GitHub Actions workflows in this repository

Out of scope:

- Examples under `examples/` (treat as demos, not production)
- The `dist/` build output (audit `src/` instead)
- Dependencies (report upstream)

## Security-Relevant Defaults

- `createAuth()` stores tokens in **plaintext `localStorage`** by default. This
  is documented in `docs/security.md`. Use a custom `AuthStorage` adapter with
  `httpOnly` cookies for production deployments.
- `RealtimeClient` transmits a Bearer token. Always serve the SSE endpoint over
  **HTTPS**.
- `AuthGuard` validates `fallback` URLs against open-redirect attacks using
  `isSafeRedirect()`. Do not bypass this check.

## Disclosure Timeline

We follow a **90-day coordinated disclosure** window. After 90 days from
acknowledgement — or sooner if a fix is published — the report may be made
public regardless of resolution status.
