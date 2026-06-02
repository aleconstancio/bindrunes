<script lang="ts">
  import { setContext, getContext } from 'svelte';

  type AccordionContext = {
    toggle: (id: string) => void;
    isOpen: (id: string) => boolean;
    multiple: boolean;
  };

  let {
    multiple = false,
    value = $bindable([] as string[]),
    class: className = '',
    children,
  }: {
    multiple?: boolean;
    value?: string[];
    class?: string;
    children?: import('svelte').Snippet;
  } = $props();

  function toggle(itemId: string) {
    if (multiple) {
      if (value.includes(itemId)) {
        value = value.filter(id => id !== itemId);
      } else {
        value = [...value, itemId];
      }
    } else {
      value = value.includes(itemId) ? [] : [itemId];
    }
  }

  function isOpen(itemId: string): boolean {
    return value.includes(itemId);
  }

  setContext('accordion', { toggle, isOpen, multiple });
</script>

<div class="space-y-2 {className}">
  {@render children?.()}
</div>
