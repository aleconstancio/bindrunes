<script lang="ts">
import type { Snippet } from "svelte";

let {
	delay = 50,
	animation = "stagger-fade-in",
	children,
}: {
	delay?: number;
	animation?: string;
	children?: Snippet;
} = $props();
</script>

<div class="stagger-container">
  {@render children()}
</div>

<style>
  .stagger-container > :global(*) {
    animation: var(--stagger-animation, stagger-fade-in) linear both;
    animation-delay: calc(var(--stagger-index, 0) * var(--stagger-delay, 50ms));
  }
  @keyframes stagger-fade-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
</style>
