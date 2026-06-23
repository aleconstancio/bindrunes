<script lang="ts">
import type { Snippet } from "svelte";
import { getGridClass } from "../../utils/grid";
import ProductCard from "./ProductCard.svelte";

interface Product {
	id: string;
	name: string;
	description?: string;
	image?: string;
	price: number;
	originalPrice?: number;
	currency?: string;
	rating?: number;
	reviewCount?: number;
	badge?: string;
}

let {
	products = [] as Product[],
	columns = 4,
	currency = "$",
	onAddToCart = undefined as ((id: string) => void) | undefined,
	class: className = "",
	cardSnippet = undefined as Snippet<[{ product: Product; index: number }]> | undefined,
}: {
	products?: Product[];
	columns?: 2 | 3 | 4;
	currency?: string;
	onAddToCart?: (id: string) => void;
	class?: string;
	cardSnippet?: Snippet<[{ product: Product; index: number }]>;
} = $props();
</script>

<div class="grid {getGridClass(columns)} gap-6 {className}">
  {#each products as product, i}
    {#if cardSnippet}
      {@render cardSnippet({ product, index: i })}
    {:else}
      <ProductCard
        {...product}
        {currency}
        onAddToCart={onAddToCart ? () => onAddToCart(product.id) : undefined}
      />
    {/if}
  {/each}
</div>
