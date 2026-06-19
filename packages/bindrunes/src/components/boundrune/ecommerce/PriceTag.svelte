<script lang="ts">
let {
	price = 0,
	originalPrice = undefined as number | undefined,
	currency = "$",
	size = "md" as "sm" | "md" | "lg",
	class: className = "",
}: {
	price?: number;
	originalPrice?: number;
	currency?: string;
	size?: "sm" | "md" | "lg";
	class?: string;
} = $props();

let hasDiscount = $derived(originalPrice !== undefined && originalPrice > price);

const sizeClasses: Record<string, string> = {
	sm: "text-label-sm",
	md: "text-title-2",
	lg: "text-display-3",
};
</script>

<div class="inline-flex items-baseline gap-2 {className}">
  <span class="{sizeClasses[size]} text-foreground font-semibold">
    {currency}{price.toFixed(2)}
  </span>
  {#if hasDiscount}
    <span class="text-body-sm text-muted-foreground line-through">
      {currency}{originalPrice!.toFixed(2)}
    </span>
    <span class="text-label-sm text-destructive font-medium">
      -{Math.round(((originalPrice! - price) / originalPrice!) * 100)}%
    </span>
  {/if}
</div>
