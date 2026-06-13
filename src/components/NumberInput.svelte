<script lang="ts">
import { Minus, Plus } from "lucide-svelte";

let {
	value = $bindable(0),
	min = undefined as number | undefined,
	max = undefined as number | undefined,
	step = 1,
	disabled = false,
	size = "md" as "sm" | "md" | "lg",
	class: className = "",
	label = undefined as string | undefined,
	name = undefined as string | undefined,
}: {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	class?: string;
	label?: string;
	name?: string;
} = $props();

const sizeClasses: Record<string, string> = {
	sm: "h-8 text-label-sm",
	md: "h-10 text-body-md",
	lg: "h-12 text-body-lg",
};

function increment() {
	const next = value + step;
	value = max !== undefined ? Math.min(next, max) : next;
}

function decrement() {
	const next = value - step;
	value = min !== undefined ? Math.max(next, min) : next;
}

function handleInput(e: Event) {
	const val = parseFloat((e.target as HTMLInputElement).value);
	if (!Number.isNaN(val)) {
		let clamped = val;
		if (min !== undefined) clamped = Math.max(clamped, min);
		if (max !== undefined) clamped = Math.min(clamped, max);
		value = clamped;
	}
}
</script>

<div class="flex flex-col gap-1.5 {className}">
  {#if label}
    <label class="text-label-md text-foreground">{label}</label>
  {/if}
  <div class="inline-flex items-center">
    <button
      type="button"
      {disabled}
      onclick={decrement}
      class="flex items-center justify-center rounded-l-[--radius] border border-r-0 border-border bg-muted
             text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer
             disabled:opacity-50 disabled:cursor-not-allowed {sizeClasses[size]}"
      aria-label="Decrease value"
    >
      <Minus class="h-3.5 w-3.5" />
    </button>
    <input
      type="number"
      {name}
      {value}
      {min}
      {max}
      {step}
      {disabled}
      oninput={handleInput}
      class="w-20 text-center rounded-none border border-border bg-background px-2 text-foreground
             focus:outline-none focus:ring-2 focus:ring-ring
             disabled:opacity-50 disabled:cursor-not-allowed
             [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none
             {sizeClasses[size]}"
      aria-label={label ?? "Number input"}
    />
    <button
      type="button"
      {disabled}
      onclick={increment}
      class="flex items-center justify-center rounded-r-[--radius] border border-l-0 border-border bg-muted
             text-muted-foreground hover:bg-muted/80 hover:text-foreground transition-colors cursor-pointer
             disabled:opacity-50 disabled:cursor-not-allowed {sizeClasses[size]}"
      aria-label="Increase value"
    >
      <Plus class="h-3.5 w-3.5" />
    </button>
  </div>
</div>
