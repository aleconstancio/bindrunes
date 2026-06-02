<script lang="ts">
  import { Checkbox as BitsCheckbox } from 'bits-ui';

  let {
    checked = $bindable(false),
    disabled = false,
    label = undefined as string | undefined,
    required = false,
  } = $props();
</script>

<label class="inline-flex items-center gap-2 cursor-pointer">
  <BitsCheckbox.Root
    {disabled}
    {required}
    bind:checked
    class="flex h-4 w-4 shrink-0 items-center justify-center rounded-[--radius-sm,4px] border transition-colors duration-[--duration-snappy]
           data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground
           data-[state=unchecked]:bg-input data-[state=unchecked]:border-border
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <BitsCheckbox.Indicator>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </BitsCheckbox.Indicator>
  </BitsCheckbox.Root>
  {#if label}
    <span class="text-sm text-foreground">{label}</span>
  {/if}
</label>
