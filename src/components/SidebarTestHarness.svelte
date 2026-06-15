<script lang="ts">
import Sidebar from "./sidebar/Sidebar.svelte";
import { createSidebarState } from "./sidebar/sidebar-context.svelte";

let { side = "left", variant = "sidebar", collapsible = "icon" } = $props();
createSidebarState(true);
</script>

<Sidebar {side} {variant} {collapsible} />
