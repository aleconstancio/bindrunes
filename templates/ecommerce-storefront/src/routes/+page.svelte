<script lang="ts">
  import { Card, Button, Badge, Separator, Input } from "bindrunes";
  import { ShoppingCart, Search, Star, ArrowRight } from "lucide-svelte";

  const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, rating: 4.5, reviews: 128, badge: "Best Seller", image: "🎧" },
    { id: 2, name: "Mechanical Keyboard", price: 149.99, rating: 4.8, reviews: 89, badge: "New", image: "⌨️" },
    { id: 3, name: "Ultra-Wide Monitor", price: 599.99, rating: 4.6, reviews: 64, badge: null, image: "🖥️" },
    { id: 4, name: "Ergonomic Mouse", price: 49.99, rating: 4.3, reviews: 256, badge: null, image: "🖱️" },
    { id: 5, name: "USB-C Hub", price: 39.99, rating: 4.4, reviews: 312, badge: "Popular", image: "🔌" },
    { id: 6, name: "Desk Lamp", price: 34.99, rating: 4.2, reviews: 178, badge: null, image: "💡" },
    { id: 7, name: "Webcam HD", price: 89.99, rating: 4.1, reviews: 94, badge: null, image: "📷" },
    { id: 8, name: "Standing Desk", price: 449.99, rating: 4.7, reviews: 52, badge: "Premium", image: "🪑" },
  ];
</script>

<div class="min-h-screen bg-background">
  <header class="border-b border-border sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
      <div class="flex items-center gap-8">
        <a href="/" class="text-xl font-bold text-foreground">Storefront</a>
        <nav class="hidden md:flex items-center gap-6">
          <a href="/" class="text-sm font-medium text-foreground">Home</a>
          <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground">Products</a>
          <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground">Categories</a>
          <a href="/" class="text-sm font-medium text-muted-foreground hover:text-foreground">Deals</a>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative hidden md:block">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search products..." class="pl-8 w-64" />
        </div>
        <Button variant="outline" size="sm">
          <ShoppingCart class="h-4 w-4 mr-2" /> Cart (3)
        </Button>
      </div>
    </div>
  </header>

  <main class="mx-auto max-w-7xl px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-foreground">Featured Products</h1>
      <p class="mt-2 text-muted-foreground">Discover our curated selection of top-rated products.</p>
    </div>

    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {#each products as product}
        <a href="/product/{product.id}" class="group">
          <Card.Root class="h-full transition-shadow group-hover:shadow-lg">
            <Card.Header class="pb-2">
              <div class="relative">
                <div class="flex h-40 items-center justify-center rounded-md bg-muted text-6xl">
                  {product.image}
                </div>
                {#if product.badge}
                  <Badge class="absolute top-2 right-2" variant={product.badge === "Best Seller" ? "default" : "secondary"}>
                    {product.badge}
                  </Badge>
                {/if}
              </div>
            </Card.Header>
            <Card.Content class="pt-4">
              <h3 class="font-semibold text-foreground group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div class="mt-1 flex items-center gap-1">
                {#each Array(5) as _, i}
                  <Star class="h-3.5 w-3.5 {i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}" />
                {/each}
                <span class="ml-1 text-xs text-muted-foreground">({product.reviews})</span>
              </div>
              <div class="mt-3 flex items-center justify-between">
                <span class="text-lg font-bold text-foreground">${product.price}</span>
                <Button size="sm" variant="outline">
                  Add to Cart
                </Button>
              </div>
            </Card.Content>
          </Card.Root>
        </a>
      {/each}
    </div>
  </main>

  <footer class="border-t border-border mt-16">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <div class="flex items-center justify-between">
        <p class="text-sm text-muted-foreground">&copy; 2026 Storefront. All rights reserved.</p>
        <div class="flex items-center gap-4">
          <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
          <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Terms</a>
          <a href="/" class="text-sm text-muted-foreground hover:text-foreground">Support</a>
        </div>
      </div>
    </div>
  </footer>
</div>
