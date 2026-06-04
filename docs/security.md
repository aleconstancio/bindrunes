# Security

## Auth Token Storage

The default `createAuth` stores tokens in **plaintext localStorage** (`bindrunes_token`). This is convenient for development but vulnerable to XSS-based token theft in production.

**Recommended for production:** Use `httpOnly` cookies via a custom `AuthStorage`:

```ts
const auth = createAuth({
  storage: {
    getToken: () => getCookie('session_token'),  // server-set httpOnly cookie
    setToken: () => {},  // no-op — server sets the cookie
    clearToken: () => deleteCookie('session_token'),
  },
  onLogout: () => { window.location.href = '/login'; },
});
```

## Open Redirect Protection

`AuthGuard` validates `fallback` and `unauthorizedFallback` props to ensure they are relative paths (starting with `/`). Absolute URLs and protocol-relative URLs are blocked and fall back to `/login` / `/403`.

```svelte
<!-- Safe -->
<AuthGuard fallback="/login">
  <ProtectedContent />
</AuthGuard>

<!-- Blocked — falls back to /login -->
<AuthGuard fallback="https://evil.com">
  <ProtectedContent />
</AuthGuard>
```

## SSE Connections

`RealtimeClient` sends a Bearer token in the `Authorization` header. Ensure your SSE endpoint is served over **HTTPS** to prevent token interception.

> `DEFAULT_SSE_ROUTES` is deprecated — these were application-specific routes from VICO. Pass your own routes when configuring the SSE client.

## Reporting Vulnerabilities

Report issues via GitHub Security Advisories rather than opening a public issue.
