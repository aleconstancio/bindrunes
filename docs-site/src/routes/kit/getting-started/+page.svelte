<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Getting Started</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Create a new SvelteKit project with bindrunes.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Installation</h2>
      <CodeSnippet language="bash" title="Terminal">
{`npx create-bindrunes my-app`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Project Structure</h2>
      <CodeSnippet language="text" title="Generated project">
{`my-app/
  src/
    routes/          # File-based routing
    lib/             # Shared code
    app.css          # Global styles (Tailwind + bindrunes)
    app.html         # HTML template
  svelte.config.js   # SvelteKit config
  vite.config.ts     # Vite config
  tsconfig.json      # TypeScript config`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Development</h2>
      <CodeSnippet language="bash" title="Commands">
{`bun run dev     # Start dev server
bun run build   # Build for production
bun run preview # Preview production build`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Design System</h2>
      <p class="text-body text-muted-foreground mb-4">
        bindrunes-kit includes the full bindrunes design system. The generated <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">app.css</code> imports Tailwind with the bindrunes plugin:
      </p>
      <CodeSnippet language="css" title="app.css">
{`@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";`}
      </CodeSnippet>

      <p class="text-body text-muted-foreground mt-4 mb-4">Use components in your Svelte files:</p>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { Button, Card, Input, PageSection } from "bindrunes";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <Card>
    <Input placeholder="Enter text..." />
    <Button>Submit</Button>
  </Card>
</PageSection>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Layout</h2>
      <p class="text-body text-muted-foreground mb-4">
        The generated layout wraps your app with <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">AppProvider</code>:
      </p>
      <CodeSnippet language="svelte" title="+layout.svelte">
{`<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";

  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>`}
      </CodeSnippet>
    </section>
  </div>
</div>
