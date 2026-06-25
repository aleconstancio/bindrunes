<script lang="ts">
import { Checkbox } from "bits-ui";
import ErrorMessage from "./ErrorMessage.svelte";

const BitsCheckbox = Checkbox;

let {
	checked = $bindable(false),
	indeterminate = $bindable(false),
	disabled = false,
	error = undefined as string | undefined,
	name = undefined as string | undefined,
	ariaDescribedby = undefined as string | undefined,
	label = undefined as string | undefined,
	required = false,
}: {
	checked?: boolean;
	indeterminate?: boolean;
	disabled?: boolean;
	error?: string;
	name?: string;
	ariaDescribedby?: string;
	label?: string;
	required?: boolean;
} = $props();

const errorId = $derived(name ? `checkbox-error-${name}` : undefined);
const describedBy = $derived(
	error ? [ariaDescribedby, errorId].filter(Boolean).join(" ") || undefined : ariaDescribedby,
);
</script>

<div class="inline-flex flex-col">
  <label class="inline-flex items-center gap-2 cursor-pointer">
    <BitsCheckbox.Root
      {disabled}
      {required}
      bind:checked
      bind:indeterminate
      aria-invalid={error ? true : undefined}
      aria-describedby={describedBy}
      class="flex h-4 w-4 shrink-0 items-center justify-center rounded-[--radius-sm,4px] border transition-colors duration-[--duration-snappy]
             data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground
             data-[state=unchecked]:bg-input data-[state=unchecked]:border-border
             data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-primary-foreground
             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <BitsCheckbox.Indicator>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </BitsCheckbox.Indicator>
    </BitsCheckbox.Root>
    {#if name}
      <input type="hidden" {name} value={checked ? "on" : "off"} />
    {/if}
    {#if label}
      <span class="text-label-md text-foreground">{label}</span>
    {/if}
  </label>
  {#if error && errorId}
    <ErrorMessage id={errorId}>{error}</ErrorMessage>
  {/if}
</div>
