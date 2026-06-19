<script lang="ts">
import Button from "../../Button.svelte";

let {
	image = "",
	name = "",
	variant = "",
	quantity = 1,
	price = 0,
	currency = "$",
	disabled = false,
	onQuantityChange = undefined as ((qty: number) => void) | undefined,
	onRemove = undefined as (() => void) | undefined,
	class: className = "",
}: {
	image?: string;
	name?: string;
	variant?: string;
	quantity?: number;
	price?: number;
	currency?: string;
	disabled?: boolean;
	onQuantityChange?: (qty: number) => void;
	onRemove?: () => void;
	class?: string;
} = $props();
</script>

<div class="flex items-center gap-4 py-4 {className}">
  {#if image}
    <img src={image} alt={name} class="w-16 h-16 rounded-[--radius] object-cover" />
  {/if}

  <div class="flex-1 min-w-0">
    <p class="text-label-md text-foreground font-medium truncate">{name}</p>
    {#if variant}
      <p class="text-body-xs text-muted-foreground">{variant}</p>
    {/if}
  </div>

  <div class="flex items-center gap-2">
    {#if onQuantityChange}
      <Button
        size="sm"
        variant="outline"
        iconOnly
        disabled={disabled || quantity <= 1}
        aria-label="Decrease quantity"
        onclick={() => onQuantityChange(Math.max(1, quantity - 1))}
      >
        −
      </Button>
    {/if}
    <span class="w-8 text-center text-body-sm" aria-label="Quantity: {quantity}">{quantity}</span>
    {#if onQuantityChange}
      <Button
        size="sm"
        variant="outline"
        iconOnly
        disabled={disabled}
        aria-label="Increase quantity"
        onclick={() => onQuantityChange(quantity + 1)}
      >
        +
      </Button>
    {/if}
  </div>

  <span class="text-label-md text-foreground font-medium">{currency}{(price * quantity).toFixed(2)}</span>

  {#if onRemove}
    <Button
      variant="ghost"
      size="sm"
      disabled={disabled}
      aria-label="Remove {name}"
      onclick={onRemove}
    >
      Remove
    </Button>
  {/if}
</div>
