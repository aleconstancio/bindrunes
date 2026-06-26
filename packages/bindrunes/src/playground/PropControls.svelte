<!-- packages/bindrunes/src/playground/PropControls.svelte -->
<script lang="ts">
import Input from "../primitives/Input.svelte";
import Select from "../primitives/Select.svelte";
import Switch from "../primitives/Switch.svelte";
import type { ComponentDefinition } from "./component-registry";

interface Props {
	definition: ComponentDefinition;
	values: Record<string, unknown>;
	onChange: (key: string, value: unknown) => void;
}

let { definition, values, onChange }: Props = $props();

let localValues = $state<Record<string, unknown>>({ ...values });

$effect(() => {
	localValues = { ...values };
});

function updateLocal(key: string, value: unknown) {
	localValues[key] = value;
	onChange(key, value);
}
</script>

<div class="space-y-4">
  <h4 class="text-title-3 text-foreground">Props</h4>
  {#each Object.entries(definition.props) as [key, prop]}
    <div class="space-y-1">
      <label class="text-label-sm text-muted-foreground">
        {prop.label ?? key}
        {#if prop.description}
          <span class="text-muted-foreground/60"> — {prop.description}</span>
        {/if}
      </label>
      {#if prop.type === "select"}
        <Select
          value={localValues[key] ?? prop.default}
          options={(prop.options ?? []).map((o) => ({ label: o, value: o }))}
          onValueChange={(v) => onChange(key, v)}
        />
      {:else if prop.type === "switch"}
        <Switch
          checked={localValues[key] ?? prop.default}
          onCheckedChange={(v) => onChange(key, v)}
        />
      {:else if prop.type === "text"}
        <Input
          value={String(localValues[key] ?? prop.default ?? "")}
          oninput={(e) => onChange(key, e.currentTarget.value)}
        />
      {:else if prop.type === "number"}
        <Input
          type="number"
          value={String(localValues[key] ?? prop.default ?? "")}
          oninput={(e) => onChange(key, Number(e.currentTarget.value))}
        />
      {:else if prop.type === "color"}
        <input
          type="color"
          value={String(localValues[key] ?? prop.default)}
          onchange={(e) => onChange(key, e.currentTarget.value)}
          class="w-full h-10 rounded-[--radius] border border-border cursor-pointer"
        />
      {/if}
    </div>
  {/each}
</div>
