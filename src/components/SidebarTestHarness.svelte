<script lang="ts">
import { createSidebarState } from "./sidebar/sidebar-context.svelte";
import Sidebar from "./sidebar/Sidebar.svelte";

let { side = "left", variant = "sidebar", collapsible = "icon" } = $props();
createSidebarState(true);
</script>

<Sidebar {side} {variant} {collapsible} />
