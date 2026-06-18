<script lang="ts">
import { Tabs } from "bits-ui";

const BitsTabs = Tabs;

let {
	value = "",
	disabled = false,
	children,
}: {
	value?: string;
	disabled?: boolean;
	children?: import("svelte").Snippet;
} = $props();
</script>

<BitsTabs.Trigger
  {value}
  {disabled}
  class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-label-md font-medium
         transition-all duration-[--duration-snappy]
         data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-[--shadow-sm]
         data-[state=inactive]:text-muted-foreground hover:text-foreground
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
         disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
>
  {@render children?.()}
</BitsTabs.Trigger>
