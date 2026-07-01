<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Migration</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">From melt-ui</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Builder functions to components, headless to styled.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component Mapping</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Melt UI Builder</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">bindrunes</th>
              <th class="text-left py-2 font-medium text-foreground">Notes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">createAccordion()</td>
              <td class="py-2 pr-4">Accordion + AccordionItem</td>
              <td class="py-2">Melt uses builders; bindrunes uses components</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">createDialog()</td>
              <td class="py-2 pr-4">Dialog</td>
              <td class="py-2">Direct mapping</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">createDropdownMenu()</td>
              <td class="py-2 pr-4">DropdownMenu</td>
              <td class="py-2">Direct mapping</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">createTabs()</td>
              <td class="py-2 pr-4">Tabs</td>
              <td class="py-2">Direct mapping</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">createTooltip()</td>
              <td class="py-2 pr-4">Tooltip</td>
              <td class="py-2">Direct mapping</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4">—</td>
              <td class="py-2 pr-4">Button, Card, Input, Badge</td>
              <td class="py-2">bindrunes-only (Melt has no button builder)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Composable Migration</h2>

      <h3 class="text-title-2 text-foreground mb-3">Dialog</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (Melt UI)</p>
          <CodeSnippet language="svelte">
{`<script lang="ts">
  import { createDialog } from "@melt-ui/svelte";
  const { trigger, content, close } = createDialog();
</script>

<button {...$trigger}>Open</button>
{#if $open}
  <div {...$content}>...</div>
{/if}`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (bindrunes)</p>
          <CodeSnippet language="svelte">
{`<script lang="ts">
  import { Dialog } from "bindrunes";
  let open = $state(false);
</script>

<button onclick={() => open = true}>Open</button>
<Dialog bind:open>...</Dialog>`}
          </CodeSnippet>
        </div>
      </div>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">Tabs</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">Before (Melt UI)</p>
          <CodeSnippet language="svelte">
{`<script lang="ts">
  import { createTabs } from "@melt-ui/svelte";
  const { root, list, trigger, content } = createTabs();
</script>

<div {...$root}>
  <div {...$list}>
    <button {...$trigger({ value: "tab-1" })}>Tab 1</button>
  </div>
  <div {...$content("tab-1")}>Content</div>
</div>`}
          </CodeSnippet>
        </div>
        <div>
          <p class="text-body-sm font-medium text-foreground mb-2">After (bindrunes)</p>
          <CodeSnippet language="svelte">
{`<script lang="ts">
  import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes";
</script>

<Tabs defaultValue="tab-1">
  <TabsList>
    <TabsTrigger value="tab-1">Tab 1</TabsTrigger>
  </TabsList>
  <TabsContent value="tab-1">Content</TabsContent>
</Tabs>`}
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
              <th class="text-left py-2 pr-4 font-medium text-foreground">Melt UI</th>
              <th class="text-left py-2 font-medium text-foreground">bindrunes</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Approach</td>
              <td class="py-2 pr-4">Headless primitives</td>
              <td class="py-2">Styled components</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theming</td>
              <td class="py-2 pr-4">None (DIY)</td>
              <td class="py-2">3-axis system</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">API style</td>
              <td class="py-2 pr-4">Builder functions returning props</td>
              <td class="py-2">Svelte components with slots</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Styling</td>
              <td class="py-2 pr-4">100% your responsibility</td>
              <td class="py-2">Pre-styled, overridable</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Dark mode</td>
              <td class="py-2 pr-4">Manual</td>
              <td class="py-2">Automatic via data attributes</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</div>
