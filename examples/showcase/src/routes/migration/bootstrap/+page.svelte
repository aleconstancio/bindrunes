<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From Bootstrap</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Class-based components to Svelte components, jQuery to composables, and Sass variables to OKLCH tokens.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Bootstrap</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">btn, btn-primary</td>
              <td class="py-2 pr-4">Button variant="primary"</td>
              <td class="py-2">CSS classes become components</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">card, card-body</td>
              <td class="py-2 pr-4">Card</td>
              <td class="py-2">Single component with slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">form-control</td>
              <td class="py-2 pr-4">Input</td>
              <td class="py-2">CSS class becomes component</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">form-select</td>
              <td class="py-2 pr-4">Select</td>
              <td class="py-2">CSS class becomes component</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">modal</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">CSS/JS becomes component</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">offcanvas</td>
              <td class="py-2 pr-4">Sheet or Drawer</td>
              <td class="py-2">Sheet for side panels, Drawer for bottom</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">nav, nav-tabs</td>
              <td class="py-2 pr-4">Tabs, TabsList, TabsTrigger</td>
              <td class="py-2">Component-based tabs</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">alert</td>
              <td class="py-2 pr-4">Alert</td>
              <td class="py-2">CSS class becomes component</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">toast</td>
              <td class="py-2 pr-4">createToast()</td>
              <td class="py-2">Composable-based</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">spinner</td>
              <td class="py-2 pr-4">Spinner</td>
              <td class="py-2">Direct mapping</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Grid System Migration</h2>
      <p class="text-body text-muted-foreground mb-4">
        Bootstrap uses a 12-column float-based grid. bindrunes uses Tailwind's utility-first grid system.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (Bootstrap)</p>
          <CodeSnippet language="html">
{`<div class="container">
  <div class="row">
    <div class="col-md-6">Left</div>
    <div class="col-md-6">Right</div>
  </div>
</div>`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (Tailwind)</p>
          <CodeSnippet language="html">
{`<div class="container mx-auto">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>Left</div>
    <div>Right</div>
  </div>
</div>`}
          </CodeSnippet>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Color System Migration</h2>
      <p class="text-body text-muted-foreground mb-4">
        Bootstrap uses Sass variables with a 10-step color scale. bindrunes uses OKLCH CSS custom properties with a role-based token system.
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Bootstrap Color</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes Token</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$primary</td>
              <td class="py-2 pr-4">--primary</td>
              <td class="py-2 font-sans">Main brand color</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$secondary</td>
              <td class="py-2 pr-4">--accent</td>
              <td class="py-2 font-sans">Secondary emphasis</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$success</td>
              <td class="py-2 pr-4">--success</td>
              <td class="py-2 font-sans">Positive state</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$danger</td>
              <td class="py-2 pr-4">--destructive</td>
              <td class="py-2 font-sans">Error/negative state</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$warning</td>
              <td class="py-2 pr-4">--warning</td>
              <td class="py-2 font-sans">Caution state</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$body-bg</td>
              <td class="py-2 pr-4">--background</td>
              <td class="py-2 font-sans">Page background</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">$body-color</td>
              <td class="py-2 pr-4">--foreground</td>
              <td class="py-2 font-sans">Default text color</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Key Differences</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Aspect</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Bootstrap</th>
              <th class="text-left py-2 font-medium text-foreground">bindrunes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Approach</td>
              <td class="py-2 pr-4">CSS classes on HTML elements</td>
              <td class="py-2">Svelte components with props</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">JS interactivity</td>
              <td class="py-2 pr-4">jQuery + Bootstrap JS</td>
              <td class="py-2">Svelte components and composables</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theming</td>
              <td class="py-2 pr-4">Sass variables, 10-step scales</td>
              <td class="py-2">OKLCH tokens, role-based</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Dark mode</td>
              <td class="py-2 pr-4">Manual `.dark` class toggle</td>
              <td class="py-2">Automatic via `data-theme` attribute</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Grid</td>
              <td class="py-2 pr-4">Float-based 12-column</td>
              <td class="py-2">Tailwind flex/grid utilities</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Forms</td>
              <td class="py-2 pr-4">Native HTML5 validation</td>
              <td class="py-2">Valibot schema-based validation</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Migration Steps</h2>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Install bindrunes: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install bindrunes</code></li>
        <li>Remove Bootstrap: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm uninstall bootstrap</code> and remove CSS imports</li>
        <li>Update app.css: Replace Bootstrap imports with bindrunes imports</li>
        <li>Add AppProvider: Wrap your root layout</li>
        <li>Replace Bootstrap grid: Swap row/col-* for Tailwind grid/col-span-*</li>
        <li>Replace components: Swap btn, card, form-control for Button, Card, Input</li>
        <li>Replace JS plugins: Swap bootstrap.Modal etc. for bindrunes components</li>
        <li>Migrate forms: Install Valibot, replace native validation with createForm()</li>
        <li>Replace colors: Map Bootstrap Sass variables to OKLCH custom properties</li>
        <li>Remove jQuery: If no longer needed, remove it</li>
        <li>Test: Verify all components render correctly</li>
      </ol>
    </section>
  </div>
</div>
