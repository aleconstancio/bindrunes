<script lang="ts">
  import { toggleMode, mode } from 'mode-watcher';
  import { Sun, Moon } from 'lucide-svelte';
  import Button from './Button.svelte';

  let {
    variant = 'outline' as 'icon' | 'outline',
  } = $props();

  let buttonVariant = $derived(variant === 'icon' ? 'ghost' : variant);
</script>

<Button
  variant={buttonVariant}
  onclick={toggleMode}
  aria-label={$mode === 'dark' ? 'Light mode' : 'Dark mode'}
  class="relative"
>
  <Sun
    size={16}
    class="transition-all duration-[--duration-snappy] { $mode === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 absolute' }"
    style="color: var(--warning)"
  />
  <Moon
    size={16}
    class="transition-all duration-[--duration-snappy] { $mode === 'dark' ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100' }"
    style="color: var(--primary)"
  />
</Button>
