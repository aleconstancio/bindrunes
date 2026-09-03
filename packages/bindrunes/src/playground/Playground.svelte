<!-- packages/bindrunes/src/playground/Playground.svelte -->
<script lang="ts">
import type { Snippet } from "svelte";
import Badge from "../primitives/Badge.svelte";
import Button from "../primitives/Button.svelte";
import Card from "../primitives/Card.svelte";
import Input from "../primitives/Input.svelte";
import Select from "../primitives/Select.svelte";
import CodePreview from "./CodePreview.svelte";
import { type ComponentDefinition, categories, componentRegistry } from "./component-registry";
import ExportButton from "./ExportButton.svelte";
import PropControls from "./PropControls.svelte";
import { createPlaygroundState } from "./playground-state.svelte";
import ResponsiveFrame from "./ResponsiveFrame.svelte";

interface Props {
	initialComponent?: string;
	initialTheme?: string;
	initialAesthetic?: string;
	initialDensity?: string;
	preview: Snippet<[definition: ComponentDefinition, props: Record<string, unknown>]>;
}

let {
	initialComponent = "Button",
	initialTheme = "editorial",
	initialAesthetic = "minimal",
	initialDensity = "comfortable",
	preview,
}: Props = $props();

const playgroundState = createPlaygroundState({
	component: initialComponent,
	theme: initialTheme,
	aesthetic: initialAesthetic,
	density: initialDensity,
});

const currentDefinition = $derived(
	componentRegistry.find((c) => c.name === playgroundState.current.component) ??
		componentRegistry[0],
);

let searchQuery = $state("");
let selectedCategory = $state("All");

let themeValue = {
	get value() {
		return playgroundState.current.theme;
	},
	set value(v: string) {
		playgroundState.setTheme(v);
	},
};

let aestheticValue = {
	get value() {
		return playgroundState.current.aesthetic;
	},
	set value(v: string) {
		playgroundState.setAesthetic(v);
	},
};

let densityValue = {
	get value() {
		return playgroundState.current.density;
	},
	set value(v: string) {
		playgroundState.setDensity(v);
	},
};

const filteredComponents = $derived(
	componentRegistry.filter((c) => {
		const matchesSearch =
			searchQuery === "" ||
			c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			c.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
		return matchesSearch && matchesCategory;
	}),
);

function handlePropChange(key: string, value: unknown) {
	playgroundState.setProp(key, value);
}
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <div>
      <Badge variant="primary">Playground</Badge>
      <h1 class="mt-2 text-display-1 text-foreground">Component Playground</h1>
      <p class="mt-1 text-body-lg text-muted-foreground">
        Interactively explore and configure urupe-ui components.
      </p>
    </div>
    <div class="flex gap-2">
        <Button
            variant="outline"
            size="sm"
            onclick={async () => {
                await playgroundState.copyShareUrl();
            }}
        >
            Share URL
        </Button>
        <ExportButton
            definition={currentDefinition}
            props={playgroundState.current.props}
            theme={playgroundState.current.theme}
            aesthetic={playgroundState.current.aesthetic}
            density={playgroundState.current.density}
        />
    </div>
    <Button
        variant="ghost"
        size="sm"
        onclick={() => playgroundState.reset()}
    >
        Reset
    </Button>
  </div>

  <!-- Theme/Aesthetic/Density Controls -->
  <Card padding>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Theme</label>
        <Select
          bind:value={themeValue.value}
          options={[
            { label: "Editorial", value: "editorial" },
            { label: "Dracula", value: "dracula" },
            { label: "Nord", value: "nord" },
            { label: "Catppuccin", value: "catppuccin" },
            { label: "Rose Pine", value: "rose-pine" },
            { label: "GitHub", value: "github" },
          ]}
        />
      </div>
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Aesthetic</label>
        <Select
          bind:value={aestheticValue.value}
          options={[
            { label: "Minimal", value: "minimal" },
            { label: "Glass", value: "glass" },
            { label: "Bento", value: "bento" },
            { label: "Expressive", value: "expressive" },
          ]}
        />
      </div>
      <div>
        <label class="text-label-sm text-muted-foreground mb-1 block">Density</label>
        <Select
          bind:value={densityValue.value}
          options={[
            { label: "Compact", value: "compact" },
            { label: "Comfortable", value: "comfortable" },
            { label: "Spacious", value: "spacious" },
          ]}
        />
      </div>
    </div>
  </Card>

  <!-- Main Layout -->
  <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
    <!-- Component Selector -->
    <div class="lg:col-span-3 space-y-4">
      <Card padding>
        <h3 class="text-title-3 text-foreground mb-3">Components</h3>

        <!-- Search -->
        <div class="relative mb-3">
          <input
            type="text"
            bind:value={searchQuery}
            placeholder="Search..."
            aria-label="Search components"
            class="w-full h-9 pl-9 pr-3 rounded-[--radius] border border-border bg-background text-body-sm text-foreground"
          />
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <!-- Category Filter -->
        <div class="flex flex-wrap gap-1 mb-3">
          {#each ["All", ...categories] as category}
            <button
              type="button"
              onclick={() => (selectedCategory = category)}
              aria-pressed={selectedCategory === category}
              class="px-2 py-1 rounded-[--radius-sm] text-label-xs transition-colors cursor-pointer {selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}"
            >
              {category}
            </button>
          {/each}
        </div>

        <!-- Component List -->
        <div class="space-y-1 max-h-[400px] overflow-y-auto">
          {#each filteredComponents as comp}
            <button
              type="button"
              onclick={() => playgroundState.setComponent(comp.name)}
              class="w-full text-left px-3 py-2 rounded-[--radius-sm] text-body-sm transition-colors cursor-pointer {playgroundState.current.component === comp.name ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}"
            >
              <div class="font-medium">{comp.name}</div>
              <div class="text-label-xs opacity-60">{comp.category}</div>
            </button>
          {/each}
        </div>
      </Card>
    </div>

    <!-- Preview -->
    <div class="lg:col-span-5 space-y-4">
      <Card padding>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-title-3 text-foreground">Preview</h3>
          <div class="flex gap-1">
            {#each ["desktop", "tablet", "mobile"] as mode}
              <button
                type="button"
                onclick={() => playgroundState.setPreviewMode(mode)}
                aria-pressed={playgroundState.current.previewMode === mode}
                class="px-2 py-1 rounded-[--radius-sm] text-label-xs transition-colors cursor-pointer {playgroundState.current.previewMode === mode ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}"
              >
                {mode}
              </button>
            {/each}
          </div>
        </div>

        <ResponsiveFrame
          mode={playgroundState.current.previewMode}
          theme={playgroundState.current.theme}
          aesthetic={playgroundState.current.aesthetic}
          density={playgroundState.current.density}
        >
          <div class="min-h-[200px] flex items-center justify-center">
            <!-- Component preview will be rendered here by the consumer -->
            {@render preview(currentDefinition, playgroundState.current.props)}
          </div>
        </ResponsiveFrame>
      </Card>
    </div>

    <!-- Controls & Code -->
    <div class="lg:col-span-4 space-y-4">
      <Card padding>
        <PropControls
          definition={currentDefinition}
          values={playgroundState.current.props}
          onChange={handlePropChange}
        />
      </Card>

      <Card padding>
        <CodePreview
          definition={currentDefinition}
      props={playgroundState.current.props}
        />
      </Card>
    </div>
  </div>
</div>
