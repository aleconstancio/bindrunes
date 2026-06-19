<script lang="ts">
  import { PageHeader, Card, Input, Select, Switch, Button, Badge, CodeSnippet } from "bindrunes";

  const components = [
    {
      name: "Button",
      props: {
        variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"], default: "primary" },
        size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
        disabled: { type: "switch", default: false },
        loading: { type: "switch", default: false },
        fullWidth: { type: "switch", default: false },
      },
      slot: "Click me",
    },
    {
      name: "Badge",
      props: {
        variant: { type: "select", options: ["primary", "secondary", "outline", "soft", "destructive"], default: "primary" },
        size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
      },
      slot: "Label",
    },
    {
      name: "Card",
      props: {
        variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
        padding: { type: "switch", default: true },
        interactive: { type: "switch", default: false },
      },
      slot: "Card content goes here.",
    },
    {
      name: "Input",
      props: {
        placeholder: { type: "text", default: "Enter text..." },
        disabled: { type: "switch", default: false },
        required: { type: "switch", default: false },
      },
      slot: "",
    },
  ];

  let selectedIdx = $state(0);
  let propValues = $state<Record<string, any>>({});

  const current = $derived(components[selectedIdx]);

  $effect(() => {
    const c = components[selectedIdx];
    const initial: Record<string, any> = {};
    for (const [key, prop] of Object.entries(c.props)) {
      initial[key] = prop.default;
    }
    propValues = initial;
  });

  const generatedCode = $derived(() => {
    const c = components[selectedIdx];
    const props = Object.entries(propValues)
      .filter(([, v]) => v !== undefined && v !== "" && v !== false)
      .map(([k, v]) => {
        if (typeof v === "boolean") return v ? k : "";
        return `${k}="${v}"`;
      })
      .filter(Boolean)
      .join(" ");
    const propStr = props ? ` ${props}` : "";
    const slotContent = c.slot ? `\n  ${c.slot}\n` : "";
    return `import { ${c.name} } from "bindrunes";\n\n<${c.name}${propStr}>${slotContent}</${c.name}>`;
  });
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
  <PageHeader title="Playground" description="Tweak component props and see live results with generated code" />

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Controls -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Component</h3>
      <Select
        bind:value={() => current.name, (v) => {
          const idx = components.findIndex((c) => c.name === v);
          if (idx >= 0) selectedIdx = idx;
        }}
        options={components.map((c) => ({ label: c.name, value: c.name }))}
      />

      <div class="space-y-3 pt-4">
        <h4 class="text-title-3 text-foreground">Props</h4>
        {#each Object.entries(current.props) as [key, prop]}
          <div class="space-y-1">
            <label class="text-label-sm text-muted-foreground">{key}</label>
            {#if prop.type === "select"}
              <Select
                bind:value={() => propValues[key], (v) => (propValues[key] = v)}
                options={prop.options.map((o: string) => ({ label: o, value: o }))}
              />
            {:else if prop.type === "switch"}
              <Switch bind:checked={() => propValues[key], (v) => (propValues[key] = v)} />
            {:else if prop.type === "text"}
              <Input bind:value={() => propValues[key], (v) => (propValues[key] = v)} />
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Preview -->
    <div class="space-y-4">
      <h3 class="text-title-3 text-foreground">Preview</h3>
      <Card padding class="min-h-[200px] flex items-center justify-center">
        {#if current.name === "Button"}
          <Button {...propValues}>{current.slot}</Button>
        {:else if current.name === "Badge"}
          <Badge {...propValues}>{current.slot}</Badge>
        {:else if current.name === "Card"}
          <Card {...propValues}>{current.slot}</Card>
        {:else if current.name === "Input"}
          <div class="w-full">
            <Input {...propValues} />
          </div>
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
