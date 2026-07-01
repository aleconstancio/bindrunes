<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From Ant Design</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    React to Svelte, ConfigProvider to CSS tokens, and form rules to Valibot schemas.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Ant Design</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes</th>
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
              <td class="py-2 pr-4">Card</td>
              <td class="py-2 pr-4">Card</td>
              <td class="py-2">Uses slots instead of children</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Form, Form.Item</td>
              <td class="py-2 pr-4">useForm() + Form, FormField</td>
              <td class="py-2">Validation via Valibot</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Input</td>
              <td class="py-2 pr-4">Input</td>
              <td class="py-2">Same API surface</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Select</td>
              <td class="py-2 pr-4">Select</td>
              <td class="py-2">Similar API</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Modal</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">Different name</td>
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
              <td class="py-2 pr-4">message (API)</td>
              <td class="py-2 pr-4">useToast()</td>
              <td class="py-2">Composable-based</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Steps</td>
              <td class="py-2 pr-4">Stepper</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Spin</td>
              <td class="py-2 pr-4">Spinner</td>
              <td class="py-2">Different name</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">ConfigProvider</td>
              <td class="py-2 pr-4">AppProvider</td>
              <td class="py-2">Theme via CSS custom properties</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">Tag</td>
              <td class="py-2 pr-4">Badge</td>
              <td class="py-2">Different name and semantics</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Design Token Migration</h2>
      <p class="text-body text-muted-foreground mb-4">
        Ant Design uses a token-based design system with component-level customization. bindrunes uses CSS custom properties with OKLCH color space.
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Ant Design Token</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes Token</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground font-mono text-xs">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorPrimary</td>
              <td class="py-2 pr-4">--primary</td>
              <td class="py-2 font-sans">Main brand color</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorSuccess</td>
              <td class="py-2 pr-4">--success</td>
              <td class="py-2 font-sans">Positive state</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorError</td>
              <td class="py-2 pr-4">--destructive</td>
              <td class="py-2 font-sans">Error/negative state</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorBgBase</td>
              <td class="py-2 pr-4">--background</td>
              <td class="py-2 font-sans">Page background</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorBgContainer</td>
              <td class="py-2 pr-4">--card-solid</td>
              <td class="py-2 font-sans">Card/container background</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">colorBorder</td>
              <td class="py-2 pr-4">--border</td>
              <td class="py-2 font-sans">Border color</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Form Migration (Rules to Valibot)</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (Ant Design)</p>
          <CodeSnippet language="tsx">
{`<Form.Item
  name="email"
  rules={[
    { required: true },
    { type: "email" },
  ]}
>
  <Input />
</Form.Item>`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (bindrunes)</p>
          <CodeSnippet language="svelte">
{`<FormField name="email">
  <Label>Email</Label>
  <Input type="email" bind:value={form.values.email} />
  {#if form.errors.email}
    <span class="text-destructive">
      {form.errors.email}
    </span>
  {/if}
</FormField>`}
          </CodeSnippet>
        </div>
      </div>
      <p class="text-body text-muted-foreground mt-4">
        Validation moves from declarative rules to Valibot schemas using <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">v.pipe()</code>.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Key Differences</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Aspect</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Ant Design</th>
              <th class="text-left py-2 font-medium text-foreground">bindrunes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Framework</td>
              <td class="py-2 pr-4">React</td>
              <td class="py-2">Svelte 5</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theming</td>
              <td class="py-2 pr-4">ConfigProvider + JS tokens</td>
              <td class="py-2">CSS custom properties + OKLCH</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Form validation</td>
              <td class="py-2 pr-4">Declarative rules</td>
              <td class="py-2">Valibot schemas with v.pipe()</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Icons</td>
              <td class="py-2 pr-4">@ant-design/icons</td>
              <td class="py-2">lucide-svelte</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Toasts</td>
              <td class="py-2 pr-4">message/notification API</td>
              <td class="py-2">createToast() composable</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Migration Steps</h2>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li>Set up SvelteKit: Initialize a SvelteKit project if migrating from React</li>
        <li>Install bindrunes: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install bindrunes</code></li>
        <li>Install Valibot: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install valibot</code></li>
        <li>Install lucide-svelte: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm install lucide-svelte</code></li>
        <li>Update app.css: Replace Ant Design styles with bindrunes imports</li>
        <li>Add AppProvider: Wrap your root layout</li>
        <li>Replace ConfigProvider: Swap for AppProvider and CSS custom properties</li>
        <li>Rewrite components: Replace React JSX with Svelte syntax</li>
        <li>Migrate forms: Replace Ant Design Form rules with Valibot schemas</li>
        <li>Replace icons: Swap @ant-design/icons for lucide-svelte</li>
        <li>Remove Ant Design: <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">npm uninstall antd @ant-design/icons-svg</code></li>
        <li>Test: Verify all components render correctly</li>
      </ol>
    </section>
  </div>
</div>
