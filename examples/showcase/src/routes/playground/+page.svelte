<script lang="ts">
  import { PageHeader, Card, Input, Select, Switch, Button, Badge, CodeSnippet, Alert, Avatar, Separator, Skeleton, Progress, Dialog, Tooltip, TooltipProvider, Tabs, TabsList, TabsTrigger, TabsContent, Pagination, Spinner, EmptyState } from "bindrunes";
  import { components, categories, type PlaygroundComponent } from "$lib/playground-data";

  let selectedCategory = $state(categories[0]);
  let selectedIdx = $state(0);
  let propValues = $state<Record<string, unknown>>({});
  let dialogOpen = $state(false);

  const filteredComponents = $derived(
    components.filter(c => c.category === selectedCategory)
  );

  const current = $derived(filteredComponents[selectedIdx] || filteredComponents[0]);

  $effect(() => {
    if (current) {
      const initial: Record<string, unknown> = {};
      for (const [key, prop] of Object.entries(current.props)) {
        initial[key] = prop.default;
      }
      propValues = initial;
    }
  });

  const generatedCode = $derived(() => {
    if (!current) return "";
    const props = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "" && v !== false)
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ");
    const propStr = props ? ` ${props}` : "";
    const slotContent = current.slot ? `\n  ${current.slot}\n` : "";
    return `import { ${current.name} } from "bindrunes";\n\n<${current.name}${propStr}>${slotContent}</${current.name}>`;
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <PageHeader title="Playground" description="Tweak component props and see live results with generated code" />

  <!-- Category Tabs -->
  <div class="flex gap-2 flex-wrap">
    {#each categories as category}
      <button
        class="px-4 py-2 text-label-sm rounded-[--radius-md] transition-colors
               {selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}"
        onclick={() => { selectedCategory = category; selectedIdx = 0; }}
      >
        {category}
      </button>
    {/each}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Controls -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Component</h3>
      <Select
        bind:value={() => current?.name || "", (v) => {
          const idx = filteredComponents.findIndex((c) => c.name === v);
          if (idx >= 0) selectedIdx = idx;
        }}
        options={filteredComponents.map((c) => ({ label: c.name, value: c.name }))}
      />

      <div class="space-y-3 pt-4">
        <h4 class="text-title-3 text-foreground">Props</h4>
        {#if current}
          {#each Object.entries(current.props) as [key, prop]}
            <div class="space-y-1">
              <label class="text-label-sm text-muted-foreground">{key}</label>
              {#if prop.type === "select"}
                <Select
                  bind:value={() => propValues[key], (v) => (propValues[key] = v)}
                  options={(prop.options || []).map((o: string) => ({ label: o, value: o }))}
                />
              {:else if prop.type === "switch"}
                <Switch bind:checked={() => propValues[key], (v) => (propValues[key] = v)} />
              {:else if prop.type === "text"}
                <Input bind:value={() => propValues[key], (v) => (propValues[key] = v)} />
              {:else if prop.type === "number"}
                <Input type="number" bind:value={() => propValues[key], (v) => (propValues[key] = v)} />
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>

    <!-- Preview -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Preview</h3>
      <Card padding class="min-h-[200px] flex items-center justify-center">
        {#if current?.name === "Button"}
          <Button {...propValues}>{current.slot}</Button>
        {:else if current?.name === "Badge"}
          <Badge {...propValues}>{current.slot}</Badge>
        {:else if current?.name === "Card"}
          <Card {...propValues}>{current.slot}</Card>
        {:else if current?.name === "Input"}
          <div class="w-full">
            <Input {...propValues} />
          </div>
        {:else if current?.name === "Checkbox"}
          <div class="w-full">
            <input type="checkbox" disabled={propValues.disabled} class="mr-2" />
            <span>{propValues.label}</span>
          </div>
        {:else if current?.name === "Select"}
          <div class="w-full">
            <Select
              options={[
                { label: "Option 1", value: "1" },
                { label: "Option 2", value: "2" },
                { label: "Option 3", value: "3" }
              ]}
              disabled={propValues.disabled}
              placeholder={propValues.placeholder}
            />
          </div>
        {:else if current?.name === "Switch"}
          <Switch disabled={propValues.disabled} />
        {:else if current?.name === "Alert"}
          <div class="w-full">
            <Alert variant={propValues.variant} title={propValues.title}>{current.slot}</Alert>
          </div>
        {:else if current?.name === "Avatar"}
          <Avatar size={propValues.size} name={propValues.name} />
        {:else if current?.name === "Separator"}
          <div class="w-full {propValues.orientation === 'vertical' ? 'h-8' : ''}">
            <Separator orientation={propValues.orientation} />
          </div>
        {:else if current?.name === "Skeleton"}
          <div class="w-full">
            <Skeleton lines={propValues.lines} width={propValues.width} />
          </div>
        {:else if current?.name === "Progress"}
          <div class="w-full">
            <Progress value={propValues.value} max={propValues.max} showValue={propValues.showValue} />
          </div>
        {:else if current?.name === "Dialog"}
          <Dialog title={propValues.title} open={dialogOpen}>
            <p class="text-body-md text-muted-foreground">{current.slot}</p>
          </Dialog>
          <Button onclick={() => (dialogOpen = true)}>Open Dialog</Button>
        {:else if current?.name === "Tooltip"}
          <TooltipProvider>
            <Tooltip content={propValues.content} side={propValues.side}>
              <Button variant="outline">{current.slot}</Button>
            </Tooltip>
          </TooltipProvider>
        {:else if current?.name === "Tabs"}
          <div class="w-full">
            <Tabs value={propValues.defaultValue}>
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1"><p class="text-body-sm text-muted-foreground">Content for Tab 1</p></TabsContent>
              <TabsContent value="tab2"><p class="text-body-sm text-muted-foreground">Content for Tab 2</p></TabsContent>
              <TabsContent value="tab3"><p class="text-body-sm text-muted-foreground">Content for Tab 3</p></TabsContent>
            </Tabs>
          </div>
        {:else if current?.name === "Pagination"}
          <div class="w-full">
            <Pagination totalPages={propValues.totalPages} currentPage={propValues.currentPage} />
          </div>
        {:else if current?.name === "Spinner"}
          <Spinner size={propValues.size} />
        {:else if current?.name === "EmptyState"}
          <div class="w-full">
            <EmptyState title={propValues.title} description={propValues.description} />
          </div>
        {:else}
          <p class="text-body-sm text-muted-foreground">Preview not available</p>
        {/if}
      </Card>
    </div>

    <!-- Code -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Generated Code</h3>
      <CodeSnippet code={generatedCode()} language="svelte" title="App.svelte" />
    </div>
  </div>
</div>
