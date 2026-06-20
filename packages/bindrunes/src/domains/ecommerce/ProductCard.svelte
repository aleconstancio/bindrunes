<script lang="ts">
import Badge from "../../primitives/Badge.svelte";
import Button from "../../primitives/Button.svelte";

let {
	name = "",
	description = "",
	image = "",
	price = 0,
	originalPrice = undefined as number | undefined,
	currency = "$",
	rating = undefined as number | undefined,
	reviewCount = undefined as number | undefined,
	badge = undefined as string | undefined,
	onAddToCart = undefined as (() => void) | undefined,
	href = "#",
	class: className = "",
}: {
	name?: string;
	description?: string;
	image?: string;
	price?: number;
	originalPrice?: number;
	currency?: string;
	rating?: number;
	reviewCount?: number;
	badge?: string;
	onAddToCart?: () => void;
	href?: string;
	class?: string;
} = $props();

let hasDiscount = $derived(originalPrice !== undefined && originalPrice > price);
</script>

<div class="group rounded-[--radius] border border-border bg-card overflow-hidden hover:shadow-lg transition-all {className}">
  <a {href} class="block">
    <div class="relative aspect-square overflow-hidden">
      {#if image}
        <img
          src={image}
          alt={name}
          class="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      {/if}
      {#if badge}
        <div class="absolute top-3 left-3">
          <Badge variant="primary" size="sm">{badge}</Badge>
        </div>
      {/if}
    </div>
  </a>

  <div class="p-4 space-y-3">
    <div>
      <h3 class="text-label-lg text-foreground font-medium line-clamp-1">{name}</h3>
      {#if description}
        <p class="text-body-sm text-muted-foreground line-clamp-2 mt-1">{description}</p>
      {/if}
    </div>

    {#if rating !== undefined}
      <div class="flex items-center gap-1">
        <span class="text-warning text-sm" aria-label="{rating} out of 5 stars">{'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}</span>
        {#if reviewCount !== undefined}
          <span class="text-body-xs text-muted-foreground">({reviewCount})</span>
        {/if}
      </div>
    {/if}

    <div class="flex items-center justify-between">
      <div class="flex items-baseline gap-2">
        <span class="text-title-2 text-foreground">{currency}{price.toFixed(2)}</span>
        {#if hasDiscount}
          <span class="text-body-sm text-muted-foreground line-through">{currency}{originalPrice!.toFixed(2)}</span>
        {/if}
      </div>
      {#if onAddToCart}
        <Button size="sm" onclick={onAddToCart}>Add to cart</Button>
      {/if}
    </div>
  </div>
</div>
