<script lang="ts">
import { useVirtualList } from "../utils/useVirtualList.svelte";

export interface CommandItem {
	id: string;
	label: string;
	keywords?: string[];
	icon?: import("svelte").Snippet;
}

export interface Props {
	items?: CommandItem[];
	placeholder?: string;
	open?: $bindable<boolean>;
	onSelect?: (item: CommandItem) => void;
	onClose?: () => void;
	class?: string;
}

let {
	items = [],
	placeholder = "Search...",
	open = $bindable(false),
	onSelect,
	onClose,
	class: className = "",
}: Props = $props();

let query = $state("");
let selectedIndex = $state(0);
let inputEl = $state<HTMLInputElement | null>(null);

const filteredItems = $derived(
	items.filter(
		(item) =>
			item.label.toLowerCase().includes(query.toLowerCase()) ||
			item.keywords?.some((k) => k.toLowerCase().includes(query.toLowerCase())),
	),
);

const VIRTUAL_THRESHOLD = 30;
const shouldVirtualize = $derived(filteredItems.length > VIRTUAL_THRESHOLD);

const virtualList = useVirtualList(shouldVirtualize ? filteredItems : [], {
	itemHeight: 40,
	overscan: 10,
});

let virtualContainer = $state<HTMLDivElement | null>(null);

$effect(() => {
	if (virtualContainer) {
		virtualContainer.addEventListener("scroll", virtualList.scrollHandler);
		virtualList.containerHeight = virtualContainer.clientHeight;
		return () => virtualContainer?.removeEventListener("scroll", virtualList.scrollHandler);
	}
});

$effect(() => {
	if (open) {
		selectedIndex = 0;
		query = "";
		document.body.style.overflow = "hidden";
		requestAnimationFrame(() => inputEl?.focus());
		return () => {
			document.body.style.overflow = "";
		};
	}
});

$effect(() => {
	if (shouldVirtualize && virtualList.scrollTo && filteredItems[selectedIndex]) {
		virtualList.scrollTo(selectedIndex);
	}
});

function handleKeydown(e: KeyboardEvent) {
	if (e.key === "ArrowDown") {
		e.preventDefault();
		selectedIndex = Math.min(selectedIndex + 1, filteredItems.length - 1);
	} else if (e.key === "ArrowUp") {
		e.preventDefault();
		selectedIndex = Math.max(selectedIndex - 1, 0);
	} else if (e.key === "Enter" && filteredItems[selectedIndex]) {
		onSelect?.(filteredItems[selectedIndex]);
		open = false;
		onClose?.();
	} else if (e.key === "Escape") {
		open = false;
		onClose?.();
	}
}

function handleGlobalKeydown(e: KeyboardEvent) {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		open = !open;
		if (open) query = "";
	}
}

$effect(() => {
	document.addEventListener("keydown", handleGlobalKeydown);
	return () => document.removeEventListener("keydown", handleGlobalKeydown);
});
</script>

{#if open}
  <div class="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] {className}">
    <div
      class="fixed inset-0 bg-black/50"
      data-testid="command-palette-overlay"
      onclick={() => { open = false; onClose?.(); }}
      onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { open = false; onClose?.(); } }}
    ></div>
    <div
      class="relative w-full max-w-lg bg-background border border-border rounded-[--radius-lg] shadow-lg overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div class="flex items-center border-b border-border px-4">
        <svg class="w-4 h-4 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          bind:this={inputEl}
          class="flex-1 bg-transparent px-3 py-3 text-body-md outline-none placeholder:text-muted-foreground"
          {placeholder}
          bind:value={query}
          onkeydown={handleKeydown}
          role="combobox"
          aria-expanded={true}
          aria-controls="command-palette-list"
          aria-activedescendant="command-item-{selectedIndex}"
        />
      </div>
      <div id="command-palette-list" role="listbox">
        {#if filteredItems.length === 0}
          <div class="py-6 text-center text-body-sm text-muted-foreground">No results found</div>
        {:else if shouldVirtualize}
          <div
            bind:this={virtualContainer}
            style={virtualList.containerStyle}
            class="max-h-[300px] overflow-y-auto p-2"
          >
            {#each virtualList.visibleItems as vi (vi.item.id)}
              {@const item = vi.item}
              {@const i = vi.index}
              <button
                id="command-item-{i}"
                style={vi.style}
                class="w-full flex items-center gap-3 px-3 py-2 text-body-md rounded-[--radius-md] text-left
                       {i === selectedIndex ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}"
                onclick={() => { onSelect?.(item); open = false; onClose?.(); }}
              >
                {#if item.icon}
                  {@render item.icon()}
                {/if}
                {item.label}
              </button>
            {/each}
          </div>
        {:else}
          <div class="max-h-[300px] overflow-y-auto p-2">
            {#each filteredItems as item, i}
              <button
                id="command-item-{i}"
                class="w-full flex items-center gap-3 px-3 py-2 text-body-md rounded-[--radius-md] text-left
                       {i === selectedIndex ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'}"
                onclick={() => { onSelect?.(item); open = false; onClose?.(); }}
              >
                {#if item.icon}
                  {@render item.icon()}
                {/if}
                {item.label}
              </button>
            {/each}
          </div>
        {/if}
      </div>
    </div>
  </div>
{/if}
