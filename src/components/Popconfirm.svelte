<script lang="ts">
  import Popover from './Popover.svelte';
  import Button from './Button.svelte';

  let {
    title = 'Are you sure?',
    description = undefined as string | undefined,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    destructive = false,
    onConfirm = undefined as (() => void) | undefined,
    onCancel = undefined as (() => void) | undefined,
    trigger,
  }: {
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    destructive?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    trigger?: import('svelte').Snippet;
  } = $props();

  let open = $state(false);

  function handleConfirm() {
    open = false;
    onConfirm?.();
  }

  function handleCancel() {
    open = false;
    onCancel?.();
  }
</script>

<Popover bind:open>
  {#snippet trigger()}
    {@render trigger?.()}
  {/snippet}

  <div class="space-y-3 min-w-[220px]">
    <div>
      <p class="text-sm font-semibold" style="color: var(--foreground);">{title}</p>
      {#if description}
        <p class="text-xs mt-1" style="color: var(--muted-foreground);">{description}</p>
      {/if}
    </div>
    <div class="flex items-center gap-2 justify-end">
      <Button variant="ghost" size="sm" onclick={handleCancel}>{cancelLabel}</Button>
      <Button
        variant={destructive ? 'destructive' : 'primary'}
        size="sm"
        onclick={handleConfirm}
      >
        {confirmLabel}
      </Button>
    </div>
  </div>
</Popover>
