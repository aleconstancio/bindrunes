<script lang="ts">
import { X } from "lucide-svelte";

let {
	value = $bindable([] as string[]),
	placeholder = "Add tag...",
	disabled = false,
	maxTags = undefined as number | undefined,
	class: className = "",
	label = undefined as string | undefined,
}: {
	value?: string[];
	placeholder?: string;
	disabled?: boolean;
	maxTags?: number;
	class?: string;
	label?: string;
} = $props();

let inputValue = $state("");
let inputEl = $state<HTMLInputElement | null>(null);

function addTag() {
	const tag = inputValue.trim();
	if (!tag || value.includes(tag)) return;
	if (maxTags && value.length >= maxTags) return;
	value = [...value, tag];
	inputValue = "";
}

function removeTag(tag: string) {
	if (disabled) return;
	value = value.filter((t) => t !== tag);
}

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
		const last = value[value.length - 1];
		if (last !== undefined) removeTag(last);
	} else if (e.key === "Enter" || e.key === ",") {
		e.preventDefault();
		addTag();
	}
}
</script>

<div class="flex flex-col gap-1.5 {className}">
  {#if label}
    <label class="text-label-md text-foreground">{label}</label>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    class="flex flex-wrap items-center gap-1.5 min-h-[2.5rem] rounded-[--radius] border border-border bg-background px-2 py-1.5
           focus-within:ring-2 focus-within:ring-ring cursor-text"
    onclick={() => inputEl?.focus()}
    onkeydown={handleKeydown}
  >
    {#each value as tag}
      <span class="inline-flex items-center gap-1 rounded-[--radius-pill] bg-muted px-2.5 py-0.5 text-label-sm text-foreground">
        {tag}
        {#if !disabled}
          <button
            type="button"
            class="rounded-[--radius-pill] p-0.5 hover:bg-muted-foreground/20 transition-colors cursor-pointer"
            onclick={(e) => { e.stopPropagation(); removeTag(tag); }}
            aria-label="Remove {tag}"
          >
            <X class="h-3 w-3" />
          </button>
        {/if}
      </span>
    {/each}
    <input
      bind:this={inputEl}
      bind:value={inputValue}
      {placeholder}
      {disabled}
      class="flex-1 min-w-[8rem] bg-transparent text-body-md text-foreground placeholder:text-muted-foreground focus:outline-none"
      onblur={addTag}
    />
  </div>
</div>
