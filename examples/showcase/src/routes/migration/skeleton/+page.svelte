<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From Skeleton</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Theme system migration, token mapping, and setup changes.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Skeleton UI</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">urupe-ui</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">button (Tailwind directive)</td>
              <td class="py-2 pr-4">Button</td>
              <td class="py-2">Skeleton uses classes; urupe-ui uses a component</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Card, CardHeader, CardBody, CardFooter</td>
              <td class="py-2 pr-4">Card</td>
              <td class="py-2">Single component with slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Modal</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">SlideToggle</td>
              <td class="py-2 pr-4">Switch</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">InputChip</td>
              <td class="py-2 pr-4">TagInput</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Toast, toastStore</td>
              <td class="py-2 pr-4">ToastProvider + createToast()</td>
              <td class="py-2">Composable-based</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme System Migration</h2>
      <p class="text-body text-muted-foreground mb-4">
        Skeleton uses a single-theme color palette with HSL and CSS layers. urupe-ui uses a 3-axis system (theme x aesthetic x density) with OKLCH color tokens.
      </p>

      <h3 class="text-title-2 text-foreground mb-3">Skeleton vs urupe-ui Token Comparison</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Skeleton Token</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">urupe-ui Token</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">--color-primary-50 to --color-primary-950</td>
              <td class="py-2 pr-4">--primary + --primary-foreground</td>
              <td class="py-2 font-sans">Single color, not 10-step scale</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">--color-surface-50 to --color-surface-950</td>
              <td class="py-2 pr-4">--background, --surface-1/2/3, --card-solid</td>
              <td class="py-2 font-sans">Surface hierarchy via named tokens</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">--color-error-*</td>
              <td class="py-2 pr-4">--destructive</td>
              <td class="py-2 font-sans">"error" renamed to "destructive"</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">--color-on-primary</td>
              <td class="py-2 pr-4">--primary-foreground</td>
              <td class="py-2 font-sans">Same purpose</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">--radius-container</td>
              <td class="py-2 pr-4">--radius-lg or --radius-xl</td>
              <td class="py-2 font-sans">Maps to larger radius tokens</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Key Theme Differences</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Aspect</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Skeleton</th>
              <th class="text-left py-2 font-medium text-foreground">urupe-ui</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Color space</td>
              <td class="py-2 pr-4">HSL (via Tailwind oklch)</td>
              <td class="py-2">OKLCH (native CSS)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Color scale</td>
              <td class="py-2 pr-4">50-950 per color</td>
              <td class="py-2">Single token per role</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Dark mode</td>
              <td class="py-2 pr-4">Toggle .dark class</td>
              <td class="py-2">data-theme attribute</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Custom themes</td>
              <td class="py-2 pr-4">Define full 50-950 scale</td>
              <td class="py-2">Define ~16 tokens via defineTheme()</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Migration Steps</h2>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Install urupe-ui: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install urupe-ui</code></li>
        <li>Update app.css: Replace Skeleton imports with urupe-ui imports</li>
        <li>Choose a theme: Start with editorial or map your Skeleton colors</li>
        <li>Add AppProvider: Wrap your root layout</li>
        <li>Replace button classes: Skeleton's btn/btn-* classes become &lt;Button&gt; components</li>
        <li>Replace card markup: Skeleton's multi-part Card becomes a single &lt;Card&gt; component</li>
        <li>Replace Modal: Skeleton's Modal becomes &lt;Dialog&gt;</li>
        <li>Replace Toast: Skeleton's toastStore becomes createToast() composable</li>
        <li>Remove Skeleton: Uninstall packages and remove config artifacts</li>
      </ol>
    </section>
  </div>
</div>
