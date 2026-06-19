<script lang="ts">
import { Toaster } from "svelte-sonner";

let {
	position = "bottom-right" as
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right",
	duration = 4000,
	visibleToasts = 5,
}: {
	position?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right";
	duration?: number;
	visibleToasts?: number;
} = $props();
</script>

<Toaster
	richColors
	closeButton
	{position}
	{duration}
	{visibleToasts}
/>
