<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../Button.svelte";
import Block from "../Block.svelte";
import CartItem from "./CartItem.svelte";

interface CartItemType {
	id: string;
	name: string;
	variant?: string;
	image?: string;
	price: number;
	quantity: number;
}

let {
	items = [] as CartItemType[],
	currency = "$",
	onQuantityChange = undefined as ((id: string, qty: number) => void) | undefined,
	onRemove = undefined as ((id: string) => void) | undefined,
	onCheckout = undefined as (() => void) | undefined,
	emptyMessage = "Your cart is empty",
	class: className = "",
}: {
	items?: CartItemType[];
	currency?: string;
	onQuantityChange?: (id: string, qty: number) => void;
	onRemove?: (id: string) => void;
	onCheckout?: () => void;
	emptyMessage?: string;
	class?: string;
} = $props();

let subtotal = $derived(items.reduce((sum, item) => sum + item.price * item.quantity, 0));
let itemCount = $derived(items.reduce((sum, item) => sum + item.quantity, 0));
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-6">
    <h2 class="text-title-2 text-foreground">Cart ({itemCount})</h2>

    {#if items.length === 0}
      <p class="text-body-md text-muted-foreground text-center py-8">{emptyMessage}</p>
    {:else}
      <div class="divide-y divide-border">
        {#each items as item}
          <CartItem
            {...item}
            {currency}
            onQuantityChange={onQuantityChange ? (qty) => onQuantityChange(item.id, qty) : undefined}
            onRemove={onRemove ? () => onRemove(item.id) : undefined}
          />
        {/each}
      </div>

      <div class="border-t border-border pt-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-body-md text-muted-foreground">Subtotal</span>
          <span class="text-title-2 text-foreground">{currency}{subtotal.toFixed(2)}</span>
        </div>
        {#if onCheckout}
          <Button fullWidth size="lg" onclick={onCheckout}>
            Checkout — {currency}{subtotal.toFixed(2)}
          </Button>
        {/if}
      </div>
    {/if}
  </div>
</Block>
