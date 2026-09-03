<script lang="ts">
import { Badge, Button, Card, CodeSnippet, PageSection } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Blog</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Why urupe-ui</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    The case for a full-stack Svelte design system.
  </p>
  <p class="mt-2 text-body-sm text-muted-foreground">
    <time datetime="2026-06-23">June 23, 2026</time>
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">The Problem</h2>
      <p class="text-body text-muted-foreground mb-4">
        Building SaaS UIs from scratch is painful. Component libraries like shadcn-svelte or Melt UI give you well-crafted primitives — a button, a dialog, a dropdown. But a button isn't a dashboard. A dialog isn't a data table with filters, sorting, pagination, and inline editing.
      </p>
      <p class="text-body text-muted-foreground mb-4">
        You still need to wire up authentication flows, CRUD operations, landing pages, theming systems, internationalization, and deployment. Every project starts by reimplementing the same scaffolding: layout shells, sidebar navigation, form validation, toast notifications, data fetching patterns.
      </p>
      <p class="text-body text-muted-foreground">
        Most libraries leave you at the primitives layer. The gap between "I have a button" and "I have a working product" is enormous — and it's the same gap for every team.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">What urupe-ui Provides</h2>
      <p class="text-body text-muted-foreground mb-4">
        urupe-ui is 234 components organized across four layers, not one:
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Layer</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Examples</th>
              <th class="text-left py-2 font-medium text-foreground">Purpose</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Primitives</td>
              <td class="py-2 pr-4">Button, Input, Select, Switch</td>
              <td class="py-2">Atomic building blocks</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Layouts</td>
              <td class="py-2 pr-4">AppShell, Sidebar, PageSection, Container</td>
              <td class="py-2">Page structure and composition</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Domains</td>
              <td class="py-2 pr-4">DataTable, Form, Chat, Auth, Navigation</td>
              <td class="py-2">10 pre-composed categories</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-medium">Templates</td>
              <td class="py-2 pr-4">Dashboard, Landing, Settings, Error</td>
              <td class="py-2">Full-page starting points</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-body text-muted-foreground mt-4">
        On top of that, SvelteKit integration is built in: auth, i18n, API routes, and deployment adapters for Vercel, Netlify, Cloudflare, and Node.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">The 3-Axis Design System</h2>
      <p class="text-body text-muted-foreground mb-4">
        Most design systems give you a single theme. urupe-ui gives you three independent axes:
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card variant="glass" padding>
          <h3 class="text-title-2">Theme</h3>
          <p class="text-body-sm text-muted-foreground mt-1">Color identity — editorial, dracula, nord, catppuccin, rose-pine, github. 6 presets.</p>
        </Card>
        <Card variant="glass" padding>
          <h3 class="text-title-2">Aesthetic</h3>
          <p class="text-body-sm text-muted-foreground mt-1">Form — radius, shadow, motion, texture. minimal, glass, bento, expressive, neon, brutalist, organic. 7 presets.</p>
        </Card>
        <Card variant="glass" padding>
          <h3 class="text-title-2">Density</h3>
          <p class="text-body-sm text-muted-foreground mt-1">Spacing scale — compact, comfortable, spacious. 3 presets.</p>
        </Card>
      </div>
      <p class="text-body text-muted-foreground">
        6 × 7 × 3 = <strong>126 valid combinations</strong>. Any combination works because the axes are truly orthogonal: themes never touch spacing, aesthetics never modify colors. All colors use OKLCH for perceptual uniformity. Switching themes is as simple as changing a <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-theme</code> attribute.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Agentic AI Built-In</h2>
      <p class="text-body text-muted-foreground mb-4">
        urupe-ui is the only component library with an LLM orchestration kernel. The <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">AICore</code> composable handles the hard parts of building copilot UIs:
      </p>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside mb-4">
        <li><strong>Token budgeting</strong> — automatic context window management</li>
        <li><strong>Conversation branching</strong> — fork, rewind, and explore alternative paths</li>
        <li><strong>Context compaction</strong> — compress history without losing coherence</li>
        <li><strong>Persistence</strong> — survive page refreshes with localforage or server sync</li>
      </ul>
      <p class="text-body text-muted-foreground">
        Pre-built copilot UI components (CopilotPanel, MessageList, PromptInput, ToolCallRenderer) let you ship an AI assistant in hours, not weeks.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Getting Started</h2>
      <CodeSnippet language="bash" title="Install & scaffold">
{`npx create-bindrunes my-app
cd my-app
bun run dev`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4 mb-4">
        Or add to an existing SvelteKit project:
      </p>
      <CodeSnippet language="bash" title="Add urupe-ui">
{`bun add urupe-ui`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4 mb-4">
        Set up your layout:
      </p>
      <CodeSnippet language="svelte" title="+layout.svelte">
{`<script lang="ts">
  import "../app.css";
  import { AppProvider } from "urupe-ui";
  let { children } = $props();
</script>

<AppProvider
  themeDefault="editorial"
  aestheticDefault="glass"
  densityDefault="comfortable"
>
  {@render children()}
</AppProvider>`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4">
        Build your first page with full-stack features, auth, and i18n already wired up. See the <a href="/docs/getting-started" class="text-foreground underline hover:text-primary transition-colors">Getting Started</a> guide for details.
      </p>
    </section>
  </div>
</div>
