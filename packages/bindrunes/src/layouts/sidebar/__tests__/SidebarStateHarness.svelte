<script lang="ts">
import { createSidebarState } from "../sidebar-context.svelte";

let { initialOpen = true }: { initialOpen?: boolean } = $props();

// svelte-ignore state_referenced_locally
const ctx = createSidebarState(initialOpen);
</script>

<div data-testid="sidebar-state" data-open={ctx.open} data-state={ctx.state} data-mobile={ctx.openMobile}>
	<button data-testid="toggle" onclick={() => ctx.toggle()}>Toggle</button>
	<button data-testid="set-open-false" onclick={() => ctx.setOpen(false)}>Close</button>
	<button data-testid="set-open-true" onclick={() => ctx.setOpen(true)}>Open</button>
	<button data-testid="toggle-mobile" onclick={() => ctx.toggleMobile()}>Toggle Mobile</button>
	<button data-testid="set-mobile-true" onclick={() => ctx.setOpenMobile(true)}>Open Mobile</button>
	<button data-testid="set-mobile-false" onclick={() => ctx.setOpenMobile(false)}>Close Mobile</button>
</div>
