<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Architecture</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Four-layer component hierarchy, design principles, and export structure.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Directory Structure</h2>
      <CodeSnippet language="text" title="packages/bindrunes/src/">
{`├── index.ts                    # Barrel exports (root entry point)
├── shared-types.ts             # Global shared types
├── primitives/                 # Layer 1: Low-level UI components
├── layouts/                    # Layer 2: Structural layout components
│   ├── dashboard/              # Dashboard shell variants
│   ├── sidebar/                # Sidebar component hierarchy
│   └── tabs/                   # Tabs re-exports
├── domains/                    # Layer 3: Domain-specific components & composables
│   ├── admin/                  # Admin dashboard
│   ├── auth/                   # Authentication forms & context
│   ├── calendar/               # Calendar components
│   ├── chat/                   # Chat components
│   ├── dashboard/              # Dashboard feature components
│   ├── data/                   # CRUD, tables, forms, charts
│   ├── ecommerce/              # Product, cart, checkout
│   ├── landing/                # Hero, features, pricing, etc.
│   ├── marketing/              # Blog, changelog, comments
│   ├── media/                  # Image, video, audio
│   ├── portfolio/              # Project showcase
│   ├── settings/               # Settings pages
│   └── types/                  # Domain-specific type definitions
├── templates/                  # Layer 4: Pre-composed full-page templates
├── actions/                    # Svelte actions (e.g., shortcut)
├── utils/                      # Composables, context helpers, API clients, formatters
│   └── agentic/                # Agentic subsystem (LLM tool calling, agent loops)
├── helpers/                    # Test helpers, mocks, polyfills
├── i18n/                       # Translation dictionaries
├── styles/                     # Global styles, token sheets, & presets
├── types/                      # Shared type definitions
├── test/                       # Test configuration
├── test-utils.ts               # Test utility helpers
├── test-fixtures/              # Test fixture data
└── playground/                 # Dev playground components`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Four-Layer Component Hierarchy</h2>
      <p class="text-body text-muted-foreground mb-4">
        The v2.0 architecture organizes components into four distinct layers with strict dependency direction — each layer may only depend on layers below it:
      </p>
      <CodeSnippet language="text">
{`Templates (Layer 4)
  └── Domains (Layer 3)
       └── Layouts (Layer 2)
            └── Primitives (Layer 1)`}
      </CodeSnippet>

      <div class="space-y-6 mt-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Layer 1: Primitives (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes</code>)</h3>
          <p class="text-body text-muted-foreground">
            Low-level, reusable UI components with no domain knowledge. These are the building blocks of the design system.
          </p>
          <p class="text-body-sm text-muted-foreground mt-2">
            <strong>Import path:</strong> <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes</code><br/>
            <strong>Examples:</strong> Button, Card, Input, Dialog, Select, Badge, Tabs, Switch, DataGrid, ThemeStudio
          </p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Layer 2: Layouts (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/layouts</code>)</h3>
          <p class="text-body text-muted-foreground">
            Structural components that define page zones, containers, and navigation shells.
          </p>
          <p class="text-body-sm text-muted-foreground mt-2">
            <strong>Import path:</strong> <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/layouts</code><br/>
            <strong>Examples:</strong> PageShell, PageSection, MetaLayout, DashboardShell, Sidebar, PageHeader, SEO
          </p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Layer 3: Domains (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/domains</code>)</h3>
          <p class="text-body text-muted-foreground">
            Domain-specific components and composables that compose primitives and layouts into feature areas.
          </p>
          <p class="text-body-sm text-muted-foreground mt-2">
            <strong>Import path:</strong> <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/domains</code> (all) or <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/domains/auth</code> (single domain)<br/>
            <strong>Examples:</strong> LoginForm, AdvancedTable, ProductGrid, ChatThread, EventCalendar
          </p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Layer 4: Templates (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/templates</code>)</h3>
          <p class="text-body text-muted-foreground">
            Pre-composed full-page templates that combine all layers into ready-to-use page layouts.
          </p>
          <p class="text-body-sm text-muted-foreground mt-2">
            <strong>Import path:</strong> <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes/templates</code><br/>
            <strong>Examples:</strong> DashboardTemplate, AuthTemplate, CrudTemplate, SettingsTemplate, ChatTemplate
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Design Principles</h2>
      <div class="space-y-6">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">1. The useX() Composable Pattern</h3>
          <p class="text-body text-muted-foreground mb-3">
            All state containers and context getters are exported as composable functions leveraging Svelte 5 runes. Read-only getters are returned for consumer-facing reactive properties. State changes are driven through explicit returned action functions.
          </p>
          <CodeSnippet language="ts" title="Composable patterns">
{`// Reactive composable (useX pattern)
export function useCounter() {
  let count = $state(0);
  return {
    get count() { return count; },
    increment() { count++; }
  };
}

// Factory function (createX pattern)
export function createApiClient(options: ApiClientOptions) {
  return { get, post, put, delete };
}`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">2. Context Isolation Pattern</h3>
          <p class="text-body text-muted-foreground mb-3">
            Subsystem states share information using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">createMetaContext</code> and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useMetaContext</code> wrapping Symbol keys.
          </p>
          <CodeSnippet language="ts">
{`const KEY = Symbol("subsystem");
export function createSubsystemState() {
  return createMetaContext(KEY, () => { /* state */ });
}
export function useSubsystemContext() {
  return useMetaContext(KEY);
}`}
          </CodeSnippet>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">3. Orthogonal Design Axes</h3>
          <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
            <li><strong>Themes</strong> override color custom properties exclusively (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-theme</code>)</li>
            <li><strong>Aesthetics</strong> override corner radius, shadows, and easing scales exclusively (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-aesthetic</code>)</li>
            <li><strong>Density</strong> overrides spacing margins and paddings exclusively (<code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-density</code>)</li>
          </ul>
        </div>

        <div>
          <h3 class="text-title-2 text-foreground mb-2">4. Page Composition Architecture</h3>
          <p class="text-body text-muted-foreground mb-3">
            Pages are composed from four layers: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">PageShell</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">PageSection</code>, and Templates.
          </p>
          <CodeSnippet language="text">
{`Template (DashboardTemplate, AuthTemplate, CrudTemplate, ...)
  └── Domain Components (LoginForm, AdvancedTable, etc.)
       └── Layouts (PageShell, PageSection, MetaLayout)
            └── Primitives (Button, Card, Input, Badge, ...)`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Export Structure</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Import Path</th>
              <th class="text-left py-2 font-medium text-foreground">Contents</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes</td>
              <td class="py-2">Primitives, shared components, composables, types, utilities, templates</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/layouts</td>
              <td class="py-2">Layout components (PageShell, sidebar, dashboard shell, etc.)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/domains</td>
              <td class="py-2">All domain components and composables</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/domains/&lt;name&gt;</td>
              <td class="py-2">Individual domain (e.g., bindrunes/domains/auth)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/templates</td>
              <td class="py-2">Pre-composed full-page templates</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/agentic</td>
              <td class="py-2">Agentic subsystem (LLM tool calling, agent loops)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/tailwind</td>
              <td class="py-2">Tailwind CSS plugin</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">bindrunes/styles/*</td>
              <td class="py-2">Global styles and token sheets</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Testing Convention</h2>
      <p class="text-body text-muted-foreground mb-3">
        Composable tests use the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.svelte.test.ts</code> extension to ensure they run within Svelte's reactive context. Co-locate tests next to their source files:
      </p>
      <CodeSnippet language="text">
{`src/utils/useAuth.svelte.ts
src/utils/useAuth.svelte.test.ts
src/primitives/Button.svelte
src/primitives/Button.svelte.test.ts`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Bundling & Exports</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>Build:</strong> Built using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">@sveltejs/package</code> outputting to the <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">dist/</code> directory.</li>
        <li><strong>Vite Integration:</strong> Consumers must exclude <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes</code> in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">optimizeDeps</code> to prevent duplicate Svelte compilation instances.</li>
      </ul>
    </section>
  </div>
</div>
