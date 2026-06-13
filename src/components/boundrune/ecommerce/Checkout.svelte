<script lang="ts">
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Input from "../../Input.svelte";
import Block from "../Block.svelte";
import OrderSummary from "./OrderSummary.svelte";

interface CheckoutItem {
	name: string;
	quantity: number;
	price: number;
	image?: string;
}

let {
	items = [] as CheckoutItem[],
	currency = "$",
	shipping = 0,
	tax = 0,
	onSubmit = undefined as ((data: { email: string; name: string }) => void) | undefined,
	loading = false,
	class: className = "",
}: {
	items?: CheckoutItem[];
	currency?: string;
	shipping?: number;
	tax?: number;
	onSubmit?: (data: { email: string; name: string }) => void;
	loading?: boolean;
	class?: string;
} = $props();

let name = $state("");
let email = $state("");

async function handleSubmit(e: SubmitEvent) {
	e.preventDefault();
	onSubmit?.({ name, email });
}
</script>

<Block size="lg" spacing="compact" class={className}>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div class="lg:col-span-3">
      <Card padding>
        <h2 class="text-title-2 text-foreground mb-6">Checkout</h2>
        <form class="space-y-4" onsubmit={handleSubmit}>
          <Input label="Full name" bind:value={name} placeholder="John Doe" required />
          <Input label="Email" type="email" bind:value={email} placeholder="john@example.com" required />
          <Button type="submit" fullWidth {loading}>
            {loading ? 'Processing...' : 'Complete order'}
          </Button>
        </form>
      </Card>
    </div>

    <div class="lg:col-span-2">
      <OrderSummary {items} {currency} {shipping} {tax} />
    </div>
  </div>
</Block>
