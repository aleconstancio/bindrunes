<script lang="ts">
	import { setSidebarContext } from './sidebar/sidebar-context.svelte';
	import Sidebar from './sidebar/Sidebar.svelte';
	let { side = 'left', variant = 'sidebar', collapsible = 'icon' } = $props();
	setSidebarContext({ defaultOpen: true });
</script>

<Sidebar {side} {variant} {collapsible} />
