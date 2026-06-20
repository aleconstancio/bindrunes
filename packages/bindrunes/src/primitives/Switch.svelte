<script lang="ts">
import { Switch } from "bits-ui";

const BitsSwitch = Switch;

let {
	checked = $bindable(false),
	disabled = false,
	error = "",
	label = undefined as string | undefined,
	name = undefined as string | undefined,
	class: className = "",
}: {
	checked?: boolean;
	disabled?: boolean;
	error?: string;
	label?: string;
	name?: string;
	class?: string;
} = $props();

let errorId = $derived(name ? `${name}-error` : undefined);
</script>

<label class="inline-flex items-center gap-3 cursor-pointer {className}">
  <BitsSwitch.Root
    {disabled}
    aria-invalid={error ? true : undefined}
    aria-describedby={error && errorId ? errorId : undefined}
    bind:checked
    class="inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-[--duration-snappy]
           data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <BitsSwitch.Thumb
      class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-[--shadow-lg] ring-0 transition-transform duration-[--duration-snappy]
             data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
    />
  </BitsSwitch.Root>
  {#if label}
    <span class="text-label-md text-foreground">{label}</span>
  {/if}
</label>
{#if error && errorId}
  <p id={errorId} class="mt-1.5 text-body-sm text-destructive">{error}</p>
{/if}
