<script lang="ts">
import type { Snippet } from "svelte";
import { SIDEBAR_WIDTH, SIDEBAR_WIDTH_MOBILE } from "./sidebar-constants";
import { createSidebarState } from "./sidebar-context.svelte";

type Collapsible = "offcanvas" | "icon" | "none";

let {
	open = undefined as boolean | undefined,
	onOpenChange = undefined as ((v: boolean) => void) | undefined,
	defaultOpen = true,
	collapsible = "icon" as Collapsible,
	style = "",
	children,
}: {
	open?: boolean;
	onOpenChange?: (v: boolean) => void;
	defaultOpen?: boolean;
	collapsible?: Collapsible;
	style?: string;
	children?: Snippet;
} = $props();

// svelte-ignore state_referenced_locally
let ctx = createSidebarState(defaultOpen);

// Controlled mode
// svelte-ignore state_referenced_locally
if (open !== undefined) {
	$effect(() => {
		ctx.setOpen(open);
	});
}

$effect(() => {
	onOpenChange?.(ctx.open);
});
</script>

<div
  class="flex min-h-0 w-full"
  data-sidebar-collapsible={collapsible}
  data-sidebar-state={ctx.state}
  style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-mobile: {SIDEBAR_WIDTH_MOBILE}; {style}"
>
  {@render children?.()}
</div>
