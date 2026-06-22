<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Getting Started</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Install bindrunes, configure Tailwind, and start building.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Installation</h2>
      <CodeSnippet language="bash" title="Terminal">
{`bun add bindrunes
bun add svelte tailwindcss lucide-svelte mode-watcher svelte-sonner`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Optional Feature Dependencies</h3>
      <CodeSnippet language="bash" title="Terminal">
{`# RichTextEditor
bun add prosemirror-commands prosemirror-history prosemirror-keymap \\
        prosemirror-markdown prosemirror-model prosemirror-state prosemirror-view

# RealtimeClient (SSE)
bun add @microsoft/fetch-event-source localforage

# DataChart
bun add chart.js svelte-chartjs`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Tailwind Integration</h2>
      <p class="text-body text-muted-foreground mb-4">
        Include the Tailwind CSS v4 plugin and global CSS in your entry stylesheet (e.g., <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">app.css</code>):
      </p>
      <CodeSnippet language="css" title="app.css">
{`@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";`}
      </CodeSnippet>

      <p class="text-body text-muted-foreground mt-4 mb-4">
        Exclude <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">bindrunes</code> from Vite's pre-bundling in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">vite.config.ts</code> to prevent duplicate Svelte instances:
      </p>
      <CodeSnippet language="ts" title="vite.config.ts">
{`import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: { exclude: ['bindrunes'] },
});`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Quick Start</h2>
      <p class="text-body text-muted-foreground mb-4">
        Wrap your application in <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">&lt;AppProvider&gt;</code> to initialize dark mode, notifications, and spacing:
      </p>
      <CodeSnippet language="svelte" title="+layout.svelte">
{`<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider
  themeDefault="editorial"
  aestheticDefault="minimal"
  densityDefault="comfortable"
>
  {@render children()}
</AppProvider>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Font Loading</h2>
      <p class="text-body text-muted-foreground mb-4">
        bindrunes uses three font families that you should load for the best experience:
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Token</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Font</th>
              <th class="text-left py-2 font-medium text-foreground">Fallback</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">--font-sans</td>
              <td class="py-2 pr-4">Inter</td>
              <td class="py-2">system-ui, sans-serif</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">--font-display</td>
              <td class="py-2 pr-4">Inter Display</td>
              <td class="py-2">Inter, system-ui, sans-serif</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-mono text-xs">--font-mono</td>
              <td class="py-2 pr-4">JetBrains Mono</td>
              <td class="py-2">ui-monospace, SF Mono, monospace</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="text-body text-muted-foreground mt-4 mb-4">
        <strong>Recommended:</strong> Use Google Fonts or self-host. Add to your HTML <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">&lt;head&gt;</code> or CSS:
      </p>
      <CodeSnippet language="html" title="index.html">
{`<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
  rel="stylesheet"
/>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Troubleshooting</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">"Multiple Svelte instances"</h3>
          <p class="text-body text-muted-foreground">
            Ensure <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">vite.config.ts</code> includes <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">optimizeDeps: { '{' } exclude: ['bindrunes'] { '}' }</code>.
          </p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Tailwind classes not applying</h3>
          <p class="text-body text-muted-foreground">
            Verify that your entry CSS file imports <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">@plugin "bindrunes/tailwind"</code>.
          </p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">SSR Hydration Warnings</h3>
          <p class="text-body text-muted-foreground">
            Ensure browser-only APIs are run within Svelte <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">$effect</code> blocks or check if <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">typeof window !== 'undefined'</code>.
          </p>
        </div>
      </div>
    </section>
  </div>
</div>
