# Security

## 1. Auth Token Storage
By default, `createAuth` utilizes `localStorage` (`bindrunes_token`). For production, override the default storage logic to employ `httpOnly` secure cookies:

```ts
const auth = createAuth({
  storage: {
    getToken: () => getCookie("session_token"),
    setToken: () => {}, // Handled server-side
    clearToken: () => deleteCookie("session_token"),
    getUser: () => JSON.parse(getCookie("user") || "null"),
    setUser: (u) => setCookie("user", JSON.stringify(u)),
    clearUser: () => deleteCookie("user"),
  }
});
```

## 2. Open Redirect Mitigation
`AuthGuard` checks `fallback` and `unauthorizedFallback` links to guarantee they are relative paths (beginning with `/`). External URLs are rejected and defaulted to `/login`.

## 3. SSE Transport Security
Ensure all `RealtimeClient` connections are established over **HTTPS** to shield auth headers.

## 4. CSRF Protection
This library does not include built-in CSRF protection. For state-changing operations:

- Use the `createApiClient` with `credentials: "same-origin"` (the default) so the browser sends cookies only to same-origin requests.
- For API endpoints that accept JSON, verify `Content-Type: application/json` on the server — browsers cannot set this header via simple cross-origin form submissions.
- Consider implementing a custom header check (e.g., `X-Requested-With`) on your API server as an additional CSRF layer.

## 5. XSS Prevention
- All component props are rendered as text content by default, which Svelte escapes automatically.
- Avoid using `{@html}` with user-provided content. If you must render raw HTML, sanitize it first (e.g., with DOMPurify).
- The `SEO` component sets `document.title` and meta tags via `useHead`, which does not use `innerHTML`.
- User data from `createAuth.getUser()` is validated with Valibot's `safeParse` before use, preventing prototype pollution from tampered localStorage.

## 6. Content Security Policy (CSP)
When deploying with a CSP header:

- `style-src`: Allow `unsafe-inline` for Svelte component styles, or use nonces. The `global.css` token sheet uses `@property` declarations which require `style-src 'unsafe-inline'` or `style-src-elem`.
- `script-src`: No inline scripts are used by the library.
- `connect-src`: Required if using `RealtimeClient` (SSE) or `createApiClient` to configure allowed API origins.

## 7. Input Validation
- Use `createForm` with Valibot schemas for client-side validation. All validation runs via `safeParse`, which does not throw on invalid input.
- Never rely solely on client-side validation — always validate on the server.
- The `PinInput` and `TagInput` components accept user text input. Sanitize or validate server-side before processing.

## 8. Dependency Considerations
- This library ships with `bits-ui` (accessible primitives) and `valibot` (lightweight validation) as runtime dependencies.
- Optional dependencies (`chart.js`, `prosemirror-*`, `localforage`) are only loaded when you import their respective components.
- Run `npm audit` / `bun audit` regularly to check for vulnerable transitive dependencies.

## 9. Reports
Disclose security matters using GitHub Security Advisories rather than public issues.
