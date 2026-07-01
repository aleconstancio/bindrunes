# bindrunes-kit

## 1.0.0

### Major Changes

- **Stable release** — bindrunes-kit v1.0.0 with production-ready API surface.
- **AWS and GCP adapters** — Deploy to Lambda/API Gateway or Cloud Run with `awsConfig()` and `gcpConfig()`.
- **Drizzle and Prisma adapters** — Generate CRUD routes from bindrunes schemas with ORM integration.
- **Passkey/WebAuthn auth** — Passwordless authentication with `createPasskeyAuth()`.
- **Magic link auth** — Email-based passwordless login with `createMagicLinkAuth()`.
- **Rate limiting** — In-memory sliding window rate limiter with `createRateLimit()`.
- **Security headers** — CSP, HSTS, X-Frame-Options with `createSecurityHeaders()`.

## 0.1.1

### Patch Changes

- Updated dependencies []:
  - bindrunes@1.3.0

## 0.1.0

### Minor Changes

- Initial public release of bindrunes-kit — SvelteKit meta-framework powered by bindrunes. Includes server utilities (auth, API client, hooks, i18n), client composables (auth state, autosave, session, SSE, WebSocket), deployment adapters, and CLI project scaffolder.

### Patch Changes

- Updated dependencies [[`7006e07`](https://github.com/aleconstancio/bindrunes/commit/7006e07a6f8178cdc7323a968cc0bddca03bc174), [`7006e07`](https://github.com/aleconstancio/bindrunes/commit/7006e07a6f8178cdc7323a968cc0bddca03bc174), [`e0fb4de`](https://github.com/aleconstancio/bindrunes/commit/e0fb4dea2cc28cd108bd95248e07bf0b94404288), [`7006e07`](https://github.com/aleconstancio/bindrunes/commit/7006e07a6f8178cdc7323a968cc0bddca03bc174)]:
  - bindrunes@1.2.0
