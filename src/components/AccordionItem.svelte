<script lang="ts">
  import { getAccordionContext } from '../utils/accordionContext';

  let {
    value: itemId,
    disabled = false,
    trigger,
    children,
  }: {
    value: string;
    disabled?: boolean;
    trigger?: import('svelte').Snippet;
    children?: import('svelte').Snippet;
  } = $props();

  const ctx = getAccordionContext();
  const isOpen = $derived(ctx.isOpen(itemId));
</script>

<div
  class="rounded-[--radius] overflow-hidden"
  style="border: 1px solid var(--border); background: var(--card);"
>
  <button
    class="flex w-full items-center justify-between p-4 text-left transition-colors"
    style="color: var(--foreground); background: transparent; border: none; cursor: {disabled ? 'not-allowed' : 'pointer'};"
    onclick={() => !disabled && ctx.toggle(itemId)}
    aria-expanded={isOpen}
    {disabled}
  >
    {#if trigger}
      {@render trigger()}
    {/if}
    <svg
      class="h-4 w-4 shrink-0 transition-transform duration-200"
      style="color: var(--muted-foreground); transform: rotate({isOpen ? '180deg' : '0deg'});"
      fill="none" viewBox="0 0 24 24" stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  {#if isOpen}
    <div class="px-4 pb-4 pt-0" style="color: var(--foreground);">
      {@render children?.()}
    </div>
  {/if}
</div>
