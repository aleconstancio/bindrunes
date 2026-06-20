<script lang="ts">
import Sidebar from "../../../layouts/sidebar/Sidebar.svelte";
import { createSidebarState } from "../../../layouts/sidebar/sidebar-context.svelte";

let { side = "left", variant = "sidebar", collapsible = "icon" } = $props();
createSidebarState(true);
</script>

<Sidebar {side} {variant} {collapsible} />
