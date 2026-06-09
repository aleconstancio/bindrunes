<script lang="ts">
import { Separator as BitsSeparator } from "bits-ui";

let {
	orientation = "horizontal" as "horizontal" | "vertical",
	class: className = "",
}: {
	orientation?: "horizontal" | "vertical";
	class?: string;
} = $props();
</script>

<BitsSeparator.Root
	{orientation}
	class="border-border {orientation === 'horizontal' ? 'border-b' : 'border-l'} {className}"
	decorative
/>
