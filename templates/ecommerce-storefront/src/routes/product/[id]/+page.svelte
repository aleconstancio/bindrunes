<script lang="ts">
import { ArrowLeft, RotateCcw, Shield, ShoppingCart, Star, Truck } from "lucide-svelte";
import { Badge, Button, Card, Separator } from "urupe-ui";

const product = {
	id: 1,
	name: "Wireless Headphones",
	price: 79.99,
	originalPrice: 99.99,
	rating: 4.5,
	reviews: 128,
	badge: "Best Seller",
	description:
		"Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear audio. Designed for comfort with memory foam ear cushions and an adjustable headband.",
	features: [
		"Active Noise Cancellation",
		"30-hour battery",
		"Bluetooth 5.2",
		"Memory foam cushions",
	],
	image: "🎧",
	inStock: true,
};

const features = [
	{ icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
	{ icon: Shield, title: "2 Year Warranty", desc: "Full coverage" },
	{ icon: RotateCcw, title: "30-Day Returns", desc: "Hassle-free" },
];
</script>

<div class="min-h-screen bg-background">
  <header class="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
      <div class="flex items-center gap-8">
        <a href="/" class="text-xl font-bold text-foreground">Storefront</a>
        <nav class="hidden md:flex items-center gap-6">
          <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground">Home</a>
          <a href="/" class="text-sm font-medium text-foreground">Products</a>
          <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground">Categories</a>
        </nav>
      </div>
      <Button variant="outline" size="sm">
        <ShoppingCart class="h-4 w-4 mr-2" /> Cart (3)
      </Button>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-4 py-8">
    <a href="/" class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
      <ArrowLeft class="h-4 w-4" /> Back to products
    </a>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div class="flex items-center justify-center rounded-lg bg-muted p-12 text-8xl">
        {product.image}
      </div>

      <div>
        <Badge class="mb-2">{product.badge}</Badge>
        <h1 class="text-3xl font-bold text-foreground">{product.name}</h1>

        <div class="mt-2 flex items-center gap-2">
          <div class="flex items-center gap-1">
            {#each Array(5) as _, i}
              <Star class="h-4 w-4 {i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}" />
            {/each}
          </div>
          <span class="text-sm text-muted-foreground">{product.rating} ({product.reviews} reviews)</span>
        </div>

        <div class="mt-4 flex items-baseline gap-2">
          <span class="text-3xl font-bold text-foreground">${product.price}</span>
          <span class="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
          <Badge variant="destructive">Save ${(product.originalPrice - product.price).toFixed(2)}</Badge>
        </div>

        <Separator class="my-6" />

        <p class="text-muted-foreground">{product.description}</p>

        <div class="mt-6">
          <h3 class="text-sm font-semibold text-foreground mb-2">Features</h3>
          <ul class="space-y-1">
            {#each product.features as feature}
              <li class="flex items-center gap-2 text-sm text-muted-foreground">
                <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
                {feature}
              </li>
            {/each}
          </ul>
        </div>

        <div class="mt-8 flex gap-3">
          <Button class="flex-1" size="lg">
            <ShoppingCart class="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button variant="outline" size="lg">Buy Now</Button>
        </div>

        <div class="mt-8 grid grid-cols-3 gap-4">
          {#each features as feat}
            <div class="flex flex-col items-center text-center">
              <feat.icon class="h-5 w-5 text-muted-foreground" />
              <p class="mt-1 text-xs font-medium text-foreground">{feat.title}</p>
              <p class="text-xs text-muted-foreground">{feat.desc}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </main>
</div>
