<script lang="ts">
import type { Component } from "svelte";

let {
	icon = undefined as Component | string | undefined,
	size = 20,
	class: className = "",
}: {
	icon?: Component | string;
	size?: number;
	class?: string;
} = $props();
</script>

{#if icon}
  {#if typeof icon === "string"}
    <span class={className} style="font-size: {size}px; line-height: 1;">{icon}</span>
  {:else}
    {@const Icon = icon}
    <Icon {size} class={className} />
  {/if}
{/if}
