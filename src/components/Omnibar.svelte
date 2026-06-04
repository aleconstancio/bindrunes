<script lang="ts">
  import Card from './Card.svelte';
  import type { OmnibarState } from '../utils/createOmnibar.svelte';

  let {
    state,
    placeholder = 'Search commands, routes, memory...',
  }: {
    state: OmnibarState;
    placeholder?: string;
  } = $props();

  function select(opt: { action: () => void }) {
    state.close();
    opt.action();
  }
</script>

{#if state.isOpen}
  <div
    class="fixed inset-0 z-50 flex justify-start pt-[10vh] bg-[--overlay-strong] backdrop-blur-sm"
    role="dialog"
    aria-modal="true"
    onclick={() => state.close()}
  >
    <div class="w-full max-w-[650px] px-4" onclick={(e) => e.stopPropagation()}>
      <Card variant="glass" padding={false} class="border-primary/20 contain-layout">
        <div class="flex items-center gap-3 px-4 py-3" style="border-bottom: 1px solid var(--border);">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--muted-foreground); flex-shrink: 0;">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder={placeholder}
            value={state.searchQuery}
            class="flex-1 bg-transparent border-none outline-none text-body-lg"
            style="color: var(--foreground); font-family: inherit;"
            oninput={(e) => state.setQuery((e.target as HTMLInputElement).value)}
            autocomplete="off"
            aria-label="Search"
          />
          {#if state.isLoading}
            <span class="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></span>
          {/if}
        </div>

        {#if state.filteredOptions.length > 0}
          <div class="flex flex-col gap-1 p-2 max-h-[350px] overflow-y-auto" role="listbox">
            {#each state.filteredOptions as option, i}
              <button
                class="flex items-center justify-between w-full px-4 py-3 rounded-[--radius] text-left transition-colors cursor-pointer"
                style="outline: none; {i === state.selectedIndex ? 'background: oklch(1 0 0 / 0.06); border-left: 3px solid var(--primary); padding-left: calc(1rem - 3px);' : ''}"
                role="option"
                aria-selected={i === state.selectedIndex}
                onclick={() => select(option)}
              >
                <div>
                  <span class="font-medium text-label-md" style="color: var(--foreground);">{option.label}</span>
                  {#if option.description}
                    <span class="block text-body-sm mt-0.5" style="color: var(--muted-foreground);">{option.description}</span>
                  {/if}
                </div>
                {#if option.category}
                  <span class="text-label-sm font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-[--radius]"
                    style="color: var(--primary); background: oklch(from var(--primary) l c h / 0.1);"
                  >{option.category}</span>
                {/if}
              </button>
            {/each}
          </div>
        {:else if state.searchQuery}
          <div class="py-8 text-center text-body-md" style="color: var(--muted-foreground);">
            No results found for "{state.searchQuery}"
          </div>
        {/if}
      </Card>
    </div>
  </div>
{/if}
