<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From Material UI</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    React to Svelte, sx prop to Tailwind, and MUI themes to OKLCH tokens.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Material UI</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">urupe-ui</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Button</td>
              <td class="py-2 pr-4">Button</td>
              <td class="py-2">Similar API; variant prop</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Card, CardContent</td>
              <td class="py-2 pr-4">Card</td>
              <td class="py-2">Single component with slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">TextField</td>
              <td class="py-2 pr-4">Input</td>
              <td class="py-2">Simpler API</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">Single component with named slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Drawer</td>
              <td class="py-2 pr-4">Sheet or Drawer</td>
              <td class="py-2">Sheet for side panels</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Table</td>
              <td class="py-2 pr-4">DataTable</td>
              <td class="py-2">Higher-level with column config</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Snackbar</td>
              <td class="py-2 pr-4">useToast()</td>
              <td class="py-2">Composable-based</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Chip</td>
              <td class="py-2 pr-4">Badge</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Grid</td>
              <td class="py-2 pr-4">Tailwind grid classes</td>
              <td class="py-2">Utility-first</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Stack</td>
              <td class="py-2 pr-4">Tailwind flex classes</td>
              <td class="py-2">Utility-first</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Box</td>
              <td class="py-2 pr-4">div with Tailwind</td>
              <td class="py-2">No wrapper needed</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Typography</td>
              <td class="py-2 pr-4">text-display-*, text-body-*</td>
              <td class="py-2">Token-based typography</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">LinearProgress</td>
              <td class="py-2 pr-4">Progress</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">CircularProgress</td>
              <td class="py-2 pr-4">Spinner</td>
              <td class="py-2">Different name</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">sx Prop to Tailwind</h2>
      <p class="text-body text-muted-foreground mb-4">
        MUI's sx prop is a powerful styling API. Replace every sx object with Tailwind utility classes.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (MUI sx prop)</p>
          <CodeSnippet language="tsx">
{`<Box sx={{
  display: "flex",
  gap: 2,
  mt: 4,
  alignItems: "center",
  bgcolor: "background.paper",
  borderRadius: 2,
  p: 3,
}}>
  Content
</Box>`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (Tailwind)</p>
          <CodeSnippet language="svelte">
{`<div class="flex gap-4 mt-4 items-center
     bg-card-solid rounded-lg p-6">
  Content
</div>`}
          </CodeSnippet>
        </div>
      </div>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Common sx to Tailwind Mappings</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">MUI sx</th>
              <th class="text-left py-2 font-medium text-foreground">Tailwind</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">display: "flex"</td>
              <td class="py-2">flex</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">gap: 2</td>
              <td class="py-2">gap-4</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">mt: 4</td>
              <td class="py-2">mt-8</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">textAlign: "center"</td>
              <td class="py-2">text-center</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">color: "text.secondary"</td>
              <td class="py-2">text-muted-foreground</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">bgcolor: "background.paper"</td>
              <td class="py-2">bg-card-solid</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">display: {'{ xs: "none", md: "block" }'}</td>
              <td class="py-2">hidden md:block</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme Migration</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (MUI createTheme)</p>
          <CodeSnippet language="ts">
{`const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    error: { main: "#d32f2f" },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
  },
  shape: { borderRadius: 8 },
});`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (urupe-ui defineTheme)</p>
          <CodeSnippet language="ts">
{`import { defineTheme } from "urupe-ui";

const myBrand = defineTheme("my-brand", {
  "--primary": "oklch(0.48 0.18 260)",
  "--primary-foreground": "oklch(0.99 0 0)",
  "--destructive": "oklch(0.52 0.22 25)",
  "--background": "oklch(0.98 0.005 260)",
  "--card-solid": "oklch(1 0 0)",
  "--border": "oklch(0.88 0.005 260)",
});

myBrand.apply();`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Key Differences</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Aspect</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Material UI</th>
              <th class="text-left py-2 font-medium text-foreground">urupe-ui</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Framework</td>
              <td class="py-2 pr-4">React</td>
              <td class="py-2">Svelte 5</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Styling</td>
              <td class="py-2 pr-4">sx prop, styled-components</td>
              <td class="py-2">Tailwind CSS utilities</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theming</td>
              <td class="py-2 pr-4">createTheme (JS object)</td>
              <td class="py-2">defineTheme (OKLCH tokens)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Typography</td>
              <td class="py-2 pr-4">Typography component</td>
              <td class="py-2">Tailwind text tokens</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Layout</td>
              <td class="py-2 pr-4">Grid, Stack, Box</td>
              <td class="py-2">Tailwind flex/grid utilities</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Icons</td>
              <td class="py-2 pr-4">@mui/icons-material</td>
              <td class="py-2">lucide-svelte</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Forms</td>
              <td class="py-2 pr-4">Controller + react-hook-form</td>
              <td class="py-2">createForm + Valibot</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Migration Steps</h2>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Set up SvelteKit: Initialize a SvelteKit project if migrating from React</li>
        <li>Install urupe-ui: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install urupe-ui</code></li>
        <li>Install Valibot: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install valibot</code></li>
        <li>Install lucide-svelte: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install lucide-svelte</code></li>
        <li>Update app.css: Replace MUI styles with urupe-ui imports</li>
        <li>Add AppProvider: Wrap your root layout</li>
        <li>Replace theme: Swap MUI's createTheme with defineTheme() and OKLCH tokens</li>
        <li>Rewrite components: Replace React JSX with Svelte syntax</li>
        <li>Replace sx props: Convert all sx objects to Tailwind utility classes</li>
        <li>Replace Typography: Swap MUI Typography for text-display-*/text-body-* tokens</li>
        <li>Replace Grid/Stack/Box: Swap for Tailwind flex/grid utilities</li>
        <li>Replace icons: Swap @mui/icons-material for lucide-svelte</li>
        <li>Replace Snackbar: Swap MUI Snackbar for createToast() composable</li>
        <li>Remove MUI: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm uninstall @mui/material @mui/icons-material @emotion/styled @emotion/react</code></li>
        <li>Test: Verify all components render correctly</li>
      </ol>
    </section>
  </div>
</div>
