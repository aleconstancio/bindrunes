<script lang="ts">
import { createSidebarState } from "./sidebar/sidebar-context.svelte";

let { side = "left", variant = "sidebar", collapsible = "icon" } = $props();
createSidebarState(true);
</script>

<Sidebar {side} {variant} {collapsible} />
