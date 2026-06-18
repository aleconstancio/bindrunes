<script lang="ts">
import { Select } from "bits-ui";
import type { Snippet } from "svelte";
import type { SelectOption, TFunction } from "../shared-types";

let {
	t = undefined as TFunction | undefined,
	value = $bindable(""),
	label = undefined as string | undefined,
	placeholder = t?.("input.Select.placeholder") ?? "Select...",
	options = [] as SelectOption[],
	disabled = false,
	required = false,
	error = undefined as string | undefined,
	name = undefined as string | undefined,
	itemSnippet = undefined as Snippet<[{ option: SelectOption }]> | undefined,
	emptySnippet = undefined as Snippet | undefined,
}: {
	t?: TFunction;
	value?: string;
	label?: string;
	placeholder?: string;
	options?: SelectOption[];
	disabled?: boolean;
	required?: boolean;
	error?: string;
	name?: string;
	itemSnippet?: Snippet<[{ option: SelectOption }]>;
	emptySnippet?: Snippet;
} = $props();

let _selectedLabel = $derived(options.find((o) => o.value === value)?.label || placeholder);

let selectId = $derived(`select-${name ?? "fallback"}`);
</script>

{#if label}
  <label class="block text-label-md mb-2 text-muted-foreground" for={selectId}>{label}</label>
{/if}

<Select.Root bind:value {disabled} {required}>
  <Select.Trigger
    id={selectId}
    class="flex w-full items-center justify-between rounded-[--radius] border bg-input px-3 py-2 text-body-md cursor-pointer
           text-foreground transition-colors duration-[--duration-snappy]
           focus:outline-none focus:ring-2 focus:ring-ring
           disabled:opacity-50 disabled:cursor-not-allowed
           data-[placeholder]:text-muted-foreground
           {error ? 'border-destructive' : 'border-border'}"
  >
    <Select.Value placeholder={placeholder} />
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  </Select.Trigger>

  <Select.Content
    class="z-[--z-overlay,30] mt-1 max-h-60 min-w-[--bits-select-anchor-width] overflow-auto rounded-[--radius] border border-border bg-card p-1 shadow-[--shadow-md]"
  >
    <Select.Group class="space-y-0.5">
      {#if options.length === 0 && emptySnippet}
        {@render emptySnippet()}
      {:else}
        {#each options as option}
          <Select.Item
            value={option.value}
            disabled={option.disabled}
            class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-body-md
                   text-foreground hover:bg-muted data-[state=checked]:bg-muted data-[state=checked]:text-foreground
                   focus:outline-none focus:bg-muted"
          >
            <Select.ItemIndicator class="mr-2 inline-flex items-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </Select.ItemIndicator>
            {#if itemSnippet}
              {@render itemSnippet({ option })}
            {:else}
              <Select.ItemLabel>{option.label}</Select.ItemLabel>
            {/if}
          </Select.Item>
        {/each}
      {/if}
    </Select.Group>
  </Select.Content>
</Select.Root>

{#if error}
  <p class="mt-1 text-body-sm text-destructive">{error}</p>
{/if}
