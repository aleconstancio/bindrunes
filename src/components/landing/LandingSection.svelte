<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    id = undefined as string | undefined,
    class: className = '',
    maxWidth = '6xl' as '4xl' | '5xl' | '6xl' | '7xl' | 'full',
    children,
  }: {
    id?: string;
    class?: string;
    maxWidth?: '4xl' | '5xl' | '6xl' | '7xl' | 'full';
    children?: Snippet;
  } = $props();

  const maxWidthClass = $derived(
    maxWidth === '4xl' ? 'max-w-4xl' :
    maxWidth === '5xl' ? 'max-w-5xl' :
    maxWidth === '6xl' ? 'max-w-6xl' :
    maxWidth === '7xl' ? 'max-w-7xl' :
    'max-w-full'
  );
</script>

<section {id} class="px-6 py-16 section-reveal {className}">
  <div class="mx-auto {maxWidthClass}">
    {@render children?.()}
  </div>
</section>
