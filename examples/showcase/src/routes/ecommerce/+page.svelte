<script lang="ts">
	import { PageHeader } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes";
	import { ProductGrid } from "bindrunes/boundrune";
	import { Cart } from "bindrunes/boundrune";
	import { Checkout } from "bindrunes/boundrune";
	import { OrderSummary } from "bindrunes/boundrune";
	import { PriceTag } from "bindrunes/boundrune";

	const products = [
		{ id: "1", name: "Wireless Headphones", price: 79.99, originalPrice: 99.99, rating: 4.5, reviewCount: 128, badge: "Sale", description: "Premium noise-cancelling headphones" },
		{ id: "2", name: "Smart Watch", price: 199.99, rating: 4.8, reviewCount: 256, description: "Fitness tracking and notifications" },
		{ id: "3", name: "USB-C Hub", price: 49.99, rating: 4.2, reviewCount: 89, description: "7-in-1 multiport adapter" },
		{ id: "4", name: "Mechanical Keyboard", price: 129.99, originalPrice: 149.99, rating: 4.7, reviewCount: 312, badge: "New", description: "RGB backlit with Cherry MX switches" },
		{ id: "5", name: "Webcam HD", price: 59.99, rating: 4.0, reviewCount: 67, description: "1080p with auto-focus" },
		{ id: "6", name: "Desk Lamp", price: 34.99, rating: 4.3, reviewCount: 145, description: "LED with wireless charging base" },
	];

	let cartItems = $state([
		{ id: "1", name: "Wireless Headphones", price: 79.99, quantity: 1 },
		{ id: "2", name: "Smart Watch", price: 199.99, quantity: 1 },
	]);

	// Checkout demo state
	let checkoutStep = $state<"address" | "payment">("address");
	let checkoutName = $state("Jane Smith");
	let checkoutEmail = $state("jane@example.com");
	let checkoutStreet = $state("123 Main Street");
	let checkoutCity = $state("Portland");
	let checkoutZip = $state("97201");
	let checkoutCard = $state("4242 4242 4242 4242");
	let checkoutExpiry = $state("12/28");

	const checkoutItems = [
		{ name: "Wireless Headphones", quantity: 1, price: 79.99 },
		{ name: "USB-C Hub", quantity: 2, price: 49.99 },
	];

	// Order summary demo state
	let summaryItems = $state([
		{ name: "Mechanical Keyboard", quantity: 1, price: 129.99 },
		{ name: "Desk Lamp", quantity: 3, price: 34.99 },
		{ name: "Webcam HD", quantity: 1, price: 59.99 },
	]);

	// PriceTag demo data
	const priceExamples = [
		{ price: 79.99, originalPrice: 99.99, label: "Sale item" },
		{ price: 199.99, originalPrice: undefined, label: "Regular price" },
		{ price: 12.99, originalPrice: 14.99, label: "Small discount" },
		{ price: 299.99, originalPrice: 399.99, label: "Big discount" },
	];

	let activeTab = $state("products");
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
	<PageHeader title="E-commerce" description="Products, cart, checkout, order summary, and price display" />

	<p class="text-body-sm text-muted-foreground">
		See also: <a href="#checkout" on:click={() => activeTab = 'checkout'} class="text-primary hover:underline">Checkout flow</a> tab above.
	</p>

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="products">Products & Cart</TabsTrigger>
			<TabsTrigger value="checkout">Checkout</TabsTrigger>
			<TabsTrigger value="order-summary">Order Summary</TabsTrigger>
			<TabsTrigger value="price-tag">Price Tag</TabsTrigger>
		</TabsList>

		<TabsContent value="products">
			<div class="space-y-8">
				<div>
					<h2 class="text-title-2 text-foreground mb-4">Product Grid</h2>
					<ProductGrid {products} columns={3} onAddToCart={(id) => console.log("Add to cart:", id)} />
				</div>

				<div class="max-w-md">
					<h2 class="text-title-2 text-foreground mb-4">Cart</h2>
					<Cart
						items={cartItems}
						onQuantityChange={(id, qty) => {
							cartItems = cartItems.map(i => i.id === id ? { ...i, quantity: qty } : i);
						}}
						onRemove={(id) => {
							cartItems = cartItems.filter(i => i.id !== id);
						}}
						onCheckout={() => console.log("Checkout")}
					/>
				</div>
			</div>
		</TabsContent>

		<TabsContent value="checkout">
			<div class="space-y-4">
				<h2 class="text-title-2 text-foreground mb-4">Checkout Flow</h2>
				<p class="text-body-sm text-muted-foreground mb-6">
					A two-step checkout with address and payment. Fill in the fields and click through the steps.
				</p>
				<Checkout
					items={checkoutItems}
					currency="$"
					shipping={5.99}
					tax={6.40}
					onSubmit={(data) => console.log("Order submitted:", data)}
				/>
			</div>
		</TabsContent>

		<TabsContent value="order-summary">
			<div class="space-y-4 max-w-lg">
				<h2 class="text-title-2 text-foreground mb-4">Order Summary</h2>
				<p class="text-body-sm text-muted-foreground mb-6">
					Displays line items with subtotals, shipping, tax, and a computed total.
				</p>
				<OrderSummary
					items={summaryItems}
					currency="$"
					shipping={8.50}
					tax={14.28}
				/>
			</div>
		</TabsContent>

		<TabsContent value="price-tag">
			<div class="space-y-6">
				<h2 class="text-title-2 text-foreground mb-4">Price Tag</h2>
				<p class="text-body-sm text-muted-foreground mb-6">
					Displays a price with optional original price and automatic discount percentage.
				</p>

				<div class="space-y-8">
					<div>
						<h3 class="text-label-sm text-muted-foreground mb-3">Sizes</h3>
						<div class="flex items-end gap-8">
							<div class="text-center space-y-1">
								<PriceTag price={49.99} size="sm" />
								<p class="text-body-xs text-muted-foreground">Small</p>
							</div>
							<div class="text-center space-y-1">
								<PriceTag price={99.99} size="md" />
								<p class="text-body-xs text-muted-foreground">Medium</p>
							</div>
							<div class="text-center space-y-1">
								<PriceTag price={199.99} size="lg" />
								<p class="text-body-xs text-muted-foreground">Large</p>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-label-sm text-muted-foreground mb-3">With Discount</h3>
						<div class="flex items-end gap-8">
							{#each priceExamples as example}
								<div class="text-center space-y-1">
									<PriceTag price={example.price} originalPrice={example.originalPrice} />
									<p class="text-body-xs text-muted-foreground">{example.label}</p>
								</div>
							{/each}
						</div>
					</div>

					<div>
						<h3 class="text-label-sm text-muted-foreground mb-3">Custom Currency</h3>
						<div class="flex items-end gap-6">
							<div class="text-center space-y-1">
								<PriceTag price={79.99} originalPrice={99.99} currency="EUR" />
								<p class="text-body-xs text-muted-foreground">Euro</p>
							</div>
							<div class="text-center space-y-1">
								<PriceTag price={8999} originalPrice={10999} currency="¥" size="lg" />
								<p class="text-body-xs text-muted-foreground">Yen</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</TabsContent>
	</Tabs>
</div>
