<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From shadcn-svelte</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Component mapping, HSL to OKLCH, and Zod to Valibot migration.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">shadcn-svelte</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Button</td>
              <td class="py-2 pr-4">Button</td>
              <td class="py-2">Same name; different variant values</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Card, CardContent, CardHeader, etc.</td>
              <td class="py-2 pr-4">Card</td>
              <td class="py-2">Single component with slot regions</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Dialog, DialogContent, DialogHeader, etc.</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">Single component with named slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Select, SelectContent, SelectItem, etc.</td>
              <td class="py-2 pr-4">Select</td>
              <td class="py-2">Simplified API</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Form, FormField (superforms + Zod)</td>
              <td class="py-2 pr-4">Form, FormField (createForm + Valibot)</td>
              <td class="py-2">Validation library differs</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Toast (Sonner)</td>
              <td class="py-2 pr-4">ToastProvider + createToast()</td>
              <td class="py-2">Composable-based</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme Variable Migration</h2>
      <p class="text-body text-muted-foreground mb-4">
        shadcn-svelte uses HSL CSS variables. bindrunes uses OKLCH — a perceptually uniform color space.
      </p>

      <h3 class="text-title-2 text-foreground mb-3">HSL to OKLCH Conversion Reference</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">shadcn HSL</th>
              <th class="text-left py-2 font-medium text-foreground">bindrunes OKLCH</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">0 0% 100% (white)</td>
              <td class="py-2">oklch(1 0 0)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">222.2 84% 4.9% (dark blue-grey)</td>
              <td class="py-2">oklch(0.12 0.02 250)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">0 84.2% 60.2% (red)</td>
              <td class="py-2">oklch(0.63 0.23 25)</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">142 76% 36% (green)</td>
              <td class="py-2">oklch(0.62 0.19 145)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-body text-muted-foreground mt-3">
        Use <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">hexToOklch()</code> from bindrunes or online converters like oklch.com.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Form Library Migration (Zod to Valibot)</h2>
      <p class="text-body text-muted-foreground mb-4">
        bindrunes uses Valibot instead of Zod. Valibot is smaller (tree-shakeable) with a compatible API.
      </p>
      <CodeSnippet language="ts" title="Valibot API">
{`// Zod (method chaining)
z.string().min(2).max(50).email();

// Valibot (pipe)
v.pipe(v.string(), v.minLength(2), v.maxLength(50), v.email());`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Key API Differences</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Zod</th>
              <th class="text-left py-2 font-medium text-foreground">Valibot</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">z.string()</td>
              <td class="py-2">v.string()</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">z.string().min(2)</td>
              <td class="py-2">v.pipe(v.string(), v.minLength(2))</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">z.string().email()</td>
              <td class="py-2">v.pipe(v.string(), v.email())</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">z.number().min(0)</td>
              <td class="py-2">v.pipe(v.number(), v.minValue(0))</td>
            </tr>
            <tr class="border-b border-border/50">
                <td class="py-2 pr-4">{'z.object({...})'}</td>
                <td class="py-2">{'v.object({...})'}</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">z.infer&lt;typeof schema&gt;</td>
              <td class="py-2">v.InferOutput&lt;typeof schema&gt;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Migration Steps</h2>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Install bindrunes: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install bindrunes</code></li>
        <li>Update app.css: Replace shadcn imports with bindrunes imports</li>
        <li>Add AppProvider: Wrap your root layout</li>
        <li>Replace CSS variables: Swap HSL values for OKLCH (use hexToOklch())</li>
        <li>Replace component imports: Update import paths from local components to bindrunes</li>
        <li>Migrate forms: Replace Zod schemas with Valibot, swap superForm for createForm</li>
        <li>Test theme switching: Verify your color palette in both light and dark modes</li>
        <li>Remove shadcn artifacts: Delete $lib/components, components.json, and unused config files</li>
      </ol>
    </section>
  </div>
</div>
