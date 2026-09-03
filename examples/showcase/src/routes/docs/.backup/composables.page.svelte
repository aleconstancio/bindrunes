<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Composables</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    All composables follow the useX() pattern using Svelte 5 runes.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Data Layer</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">useQuery & useMutation</h3>
          <p class="text-body text-muted-foreground mb-3">Manage server queries and state mutations with caching, retry strategies, and loading statuses.</p>
          <CodeSnippet language="ts">
{`import { useQuery, useMutation } from "urupe-ui";

const users = useQuery<User[]>({
  key: "/api/users",
  fetcher: () => fetch("/api/users").then(r => r.json()),
  staleTime: 30_000
});

const createUser = useMutation<User, NewUser>({
  mutator: (user) => api.post("/users", user),
  onSuccess: () => invalidateQuery("/api/users")
});`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">createAsyncState</h3>
          <p class="text-body text-muted-foreground mb-3">Reactive wrapper for async operations with loading, error, and data states.</p>
          <CodeSnippet language="ts">
{`import { createAsyncState } from "urupe-ui";

const user = createAsyncState(
  () => fetch("/api/users/1").then(r => r.json()),
  { immediate: true }
);
// user.isLoading, user.data, user.error`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">useTable</h3>
          <p class="text-body text-muted-foreground mb-3">State machine for sorting, pagination, and filtering in tables.</p>
          <CodeSnippet language="ts">
{`import { useTable } from "urupe-ui";

const table = useTable({ data: usersList, columns: [{ key: "name", sortable: true }] });`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Forms</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">useForm & useWizard</h3>
          <p class="text-body text-muted-foreground mb-3">Typesafe form and multi-step wizard state with Valibot schema validations.</p>
          <CodeSnippet language="ts">
{`import { useForm } from "urupe-ui";
import { string, minLength } from "valibot";

const form = useForm({
  schema: {
    name: string([minLength(1, "Name required")])
  },
  onSubmit: async (values) => api.post("/users", values)
});`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">validateWithSchema</h3>
          <p class="text-body text-muted-foreground mb-3">Standalone validation utility using Valibot schemas.</p>
          <CodeSnippet language="ts">
{`import { validateWithSchema } from "urupe-ui";

const errors = validateWithSchema(schema, values);`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Auth & RBAC</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">useAuth & useAccess</h3>
          <p class="text-body text-muted-foreground mb-3">Reactive authentication token handling and Role-Based Access Controls.</p>
          <CodeSnippet language="ts">
{`import { useAuth, useAccess } from "urupe-ui";

const auth = useAuth();
const access = useAccess(auth);

if (access.hasRole("admin") && access.hasPermission("users:write")) {
  // admin actions
}`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">hasRole / hasAnyRole / hasPermission</h3>
          <p class="text-body text-muted-foreground mb-3">Role-Based Access Control checks.</p>
          <CodeSnippet language="ts">
{`import { hasRole, hasAnyRole, hasPermission } from "urupe-ui";

hasRole(user, "admin");          // true if user has "admin" role
hasAnyRole(user, ["admin", "editor"]);
hasPermission(user, "users:write");`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Design System</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">useTheme / useAesthetic / useDensity</h3>
          <p class="text-body text-muted-foreground mb-3">Runtime switching of the three design axes.</p>
          <CodeSnippet language="ts">
{`import { useTheme, useAesthetic, useDensity } from "urupe-ui";

const theme = useTheme({ default: "editorial" });
const aesthetic = useAesthetic({ default: "glass" });
const density = useDensity({ default: "comfortable" });

theme.setTheme("dracula");
aesthetic.setAesthetic("bento");
density.setDensity("spacious");`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">useDarkMode</h3>
          <p class="text-body text-muted-foreground mb-3">Reactive dark mode toggling with system preference detection.</p>
          <CodeSnippet language="ts">
{`import { useDarkMode } from "urupe-ui";

const dark = useDarkMode();
dark.toggle();
// dark.isDark, dark.mode ("light" | "dark" | "system")`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Reactivity Composables</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useClickOutside</h3>
          <p class="text-body-sm text-muted-foreground">Detect clicks outside an element.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useDebounce / useThrottle</h3>
          <p class="text-body-sm text-muted-foreground">Debounce or throttle reactive values.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useClipboard</h3>
          <p class="text-body-sm text-muted-foreground">Copy to clipboard with success/error feedback.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">createMediaQuery</h3>
          <p class="text-body-sm text-muted-foreground">Reactive media query matching.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useResizeObserver</h3>
          <p class="text-body-sm text-muted-foreground">Observe element size changes.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useIntersectionObserver</h3>
          <p class="text-body-sm text-muted-foreground">Detect element visibility for lazy loading.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useEventListener</h3>
          <p class="text-body-sm text-muted-foreground">Generic event listener with auto-cleanup.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useLocalStorage</h3>
          <p class="text-body-sm text-muted-foreground">Reactive localStorage wrapper.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useCounter / useToggle</h3>
          <p class="text-body-sm text-muted-foreground">Simple state helpers.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useInterval / useTimeout</h3>
          <p class="text-body-sm text-muted-foreground">Timer composables with auto-cleanup.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useInfiniteScroll</h3>
          <p class="text-body-sm text-muted-foreground">Triggers callback when sentinel enters viewport.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useVirtualList</h3>
          <p class="text-body-sm text-muted-foreground">Virtual list for rendering large datasets.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useReducedMotion</h3>
          <p class="text-body-sm text-muted-foreground">Detect prefers-reduced-motion.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">useUrlParams</h3>
          <p class="text-body-sm text-muted-foreground">Sync state with URL search parameters.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">General Utilities</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">cn(...classes)</code> — Merge class names with Tailwind conflict resolution</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">shortcut(element, options)</code> — Svelte action for keyboard shortcut binding</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createApiClient(config)</code> — Fetch client wrapping JSON parsing and headers</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createStorage(prefix)</code> — LocalStorage wrapper with key prefixing</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createEnv(config)</code> — Env variables reader with fallback defaults</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">formatDate / formatNumber / formatBytes</code> — Locale-aware formatters</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">hexToOklch / oklchToHex</code> — Color space conversion utilities</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">RealtimeClient(config)</code> — SSE client with reconnection behaviors</li>
      </ul>
    </section>
  </div>
</div>
