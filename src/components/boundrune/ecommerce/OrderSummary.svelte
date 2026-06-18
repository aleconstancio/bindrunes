<script lang="ts">
import Card from "../../Card.svelte";

interface OrderItem {
	name: string;
	quantity: number;
	price: number;
	image?: string;
}

let {
	items = [] as OrderItem[],
	currency = "$",
	shipping = 0,
	tax = 0,
	class: className = "",
}: {
	items?: OrderItem[];
	currency?: string;
	shipping?: number;
	tax?: number;
	class?: string;
} = $props();

let { subtotal, total } = $derived.by(() => {
	let subtotal = 0;
	for (const item of items) {
		subtotal += item.price * item.quantity;
	}
	return { subtotal, total: subtotal + shipping + tax };
});
</script>

<Card padding class={className}>
  <div class="space-y-4">
    <h3 class="text-title-2 text-foreground">Order Summary</h3>

    <div class="space-y-3">
      {#each items as item}
        <div class="flex items-center gap-3">
          {#if item.image}
            <img src={item.image} alt={item.name} class="w-12 h-12 rounded object-cover" />
          {/if}
          <div class="flex-1 min-w-0">
            <p class="text-label-sm text-foreground truncate">{item.name}</p>
            <p class="text-body-xs text-muted-foreground">Qty: {item.quantity}</p>
          </div>
          <span class="text-label-sm text-foreground">{currency}{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      {/each}
    </div>

    <div class="border-t border-border pt-3 space-y-2">
      <div class="flex justify-between text-body-sm">
        <span class="text-muted-foreground">Subtotal</span>
        <span class="text-foreground">{currency}{subtotal.toFixed(2)}</span>
      </div>
      {#if shipping > 0}
        <div class="flex justify-between text-body-sm">
          <span class="text-muted-foreground">Shipping</span>
          <span class="text-foreground">{currency}{shipping.toFixed(2)}</span>
        </div>
      {/if}
      {#if tax > 0}
        <div class="flex justify-between text-body-sm">
          <span class="text-muted-foreground">Tax</span>
          <span class="text-foreground">{currency}{tax.toFixed(2)}</span>
        </div>
      {/if}
      <div class="flex justify-between text-title-2 font-semibold pt-2 border-t border-border">
        <span class="text-foreground">Total</span>
        <span class="text-foreground">{currency}{total.toFixed(2)}</span>
      </div>
    </div>
  </div>
</Card>
