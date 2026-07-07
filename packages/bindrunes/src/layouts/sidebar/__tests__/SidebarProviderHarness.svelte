<script lang="ts">
import type { Snippet } from "svelte";
import SidebarProvider from "../SidebarProvider.svelte";

let {
	defaultOpen = true,
	children,
}: {
	defaultOpen?: boolean;
	children?: Snippet;
} = $props();
</script>

<SidebarProvider {defaultOpen}>
	{@render children?.()}
</SidebarProvider>
