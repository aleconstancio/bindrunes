<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Kit</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Getting Started</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Create a new SvelteKit project with urupe-ui.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Installation</h2>
      <CodeSnippet language="bash" title="Terminal">
{`npx create-bindrunes my-app`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">End-to-End Tutorial</h2>

      <h3 class="text-title-2 text-foreground mb-3">1. Scaffold</h3>
      <p class="text-body text-muted-foreground mb-3">
        Run the CLI and follow the prompts:
      </p>
      <CodeSnippet language="bash" title="Scaffold">
{`$ npx create-bindrunes my-app
✔ What do you want to name your project? my-app
✔ Which mode? (full-stack / spa) full-stack
✔ Enable authentication? (yes / no) yes
✔ Enable i18n? (yes / no) yes
✔ Package manager? bun`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        The CLI generates a SvelteKit project with urupe-ui pre-configured.
      </p>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">2. Install & Run</h3>
      <CodeSnippet language="bash" title="Terminal">
{`cd my-app
bun install
bun run dev`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        The dev server starts at <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">http://localhost:5173</code>. Open it in your browser.
      </p>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">3. Edit a Page</h3>
      <p class="text-body text-muted-foreground mb-3">
        Open <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">src/routes/+page.svelte</code> and start building:
      </p>
      <CodeSnippet language="svelte" title="src/routes/+page.svelte">
{`<script lang="ts">
  import { Button, Card, Input, PageSection } from "urupe-ui";
</script>

<PageSection size="2xl" spacing="wide" reveal={false}>
  <Card variant="glass" interactive padding>
    <Input placeholder="Enter text..." />
    <Button variant="primary">Submit</Button>
  </Card>
</PageSection>`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">4. Build & Deploy</h3>
      <CodeSnippet language="bash" title="Terminal">
{`bun run build    # Build for production
bun run preview  # Preview production build`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-3">
        Deploy to Vercel, Netlify, Cloudflare Pages, or any Node.js hosting provider.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Project Structure</h2>
      <CodeSnippet language="text" title="Generated project">
{`my-app/
  src/
    routes/          # File-based routing
    lib/             # Shared code
    app.css          # Global styles (Tailwind + urupe-ui)
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
        bindrunes-kit includes the full urupe-ui design system. The generated <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">app.css</code> imports Tailwind with the urupe-ui plugin:
      </p>
      <CodeSnippet language="css" title="app.css">
{`@import "tailwindcss";
@plugin "urupe-ui/tailwind";
@import "urupe-ui/styles/global.css";`}
      </CodeSnippet>

      <p class="text-body text-muted-foreground mt-4 mb-4">Use components in your Svelte files:</p>
      <CodeSnippet language="svelte">
{`<script lang="ts">
  import { Button, Card, Input, PageSection } from "urupe-ui";
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
  import { AppProvider } from "urupe-ui";

  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>`}
      </CodeSnippet>
    </section>
  </div>
</div>
