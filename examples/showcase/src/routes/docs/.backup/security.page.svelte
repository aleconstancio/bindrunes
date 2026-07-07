<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Security</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Security best practices for auth, XSS, CSP, CSRF, and input validation.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">1. Auth Token Storage</h2>
      <p class="text-body text-muted-foreground mb-4">
        By default, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createAuth</code> utilizes <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">localStorage</code>. For production, override the default storage logic to employ httpOnly secure cookies:
      </p>
      <CodeSnippet language="ts">
{`const auth = createAuth({
  storage: {
    getToken: () => getCookie("session_token"),
    setToken: () => {}, // Handled server-side
    clearToken: () => deleteCookie("session_token"),
    getUser: () => JSON.parse(getCookie("user") || "null"),
    setUser: (u) => setCookie("user", JSON.stringify(u)),
    clearUser: () => deleteCookie("user"),
  }
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">2. Open Redirect Mitigation</h2>
      <p class="text-body text-muted-foreground">
        <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">AuthGuard</code> checks <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">fallback</code> and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">unauthorizedFallback</code> links to guarantee they are relative paths (beginning with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/</code>). External URLs are rejected and defaulted to <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">/login</code>.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">3. SSE Transport Security</h2>
      <p class="text-body text-muted-foreground">
        Ensure all <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">RealtimeClient</code> connections are established over <strong>HTTPS</strong> to shield auth headers.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">4. CSRF Protection</h2>
      <p class="text-body text-muted-foreground mb-4">
        This library does not include built-in CSRF protection. For state-changing operations:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createApiClient</code> with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">credentials: "same-origin"</code> (the default) so the browser sends cookies only to same-origin requests.</li>
        <li>For API endpoints that accept JSON, verify <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">Content-Type: application/json</code> on the server.</li>
        <li>Consider implementing a custom header check (e.g., <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">X-Requested-With</code>) on your API server as an additional CSRF layer.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">5. XSS Prevention</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>All component props are rendered as text content by default, which Svelte escapes automatically.</li>
        <li>Avoid using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">{'{@html}'}</code> with user-provided content. If you must render raw HTML, sanitize it first (e.g., with DOMPurify).</li>
        <li>The SEO component sets <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">document.title</code> and meta tags via <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useHead</code>, which does not use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">innerHTML</code>.</li>
        <li>User data from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createAuth.getUser()</code> is validated with Valibot's <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">safeParse</code> before use.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">6. Content Security Policy (CSP)</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">style-src</code>: Allow <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">unsafe-inline</code> for Svelte component styles, or use nonces.</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">script-src</code>: No inline scripts are used by the library.</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">connect-src</code>: Required if using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">RealtimeClient</code> (SSE) or <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createApiClient</code>.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">7. Input Validation</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createForm</code> with Valibot schemas for client-side validation.</li>
        <li>Never rely solely on client-side validation — always validate on the server.</li>
        <li>The PinInput and TagInput components accept user text input. Sanitize or validate server-side before processing.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">8. Dependency Considerations</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>This library ships with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bits-ui</code> (accessible primitives) and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">valibot</code> (lightweight validation) as runtime dependencies.</li>
        <li>Optional dependencies are only loaded when you import their respective components.</li>
        <li>Run <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm audit</code> / <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bun audit</code> regularly.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">9. Reports</h2>
      <p class="text-body text-muted-foreground">
        Disclose security matters using GitHub Security Advisories rather than public issues.
      </p>
    </section>
  </div>
</div>
