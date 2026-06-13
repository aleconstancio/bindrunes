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

## 4. Reports
Disclose security matters using GitHub Security Advisories rather than public issues.
