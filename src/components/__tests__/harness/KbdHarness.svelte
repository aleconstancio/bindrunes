<script lang="ts">
import Kbd from "../../Kbd.svelte";

let { text = "Ctrl", className = "" } = $props();
</script>

<Kbd class={className}>
	{text}
</Kbd>
