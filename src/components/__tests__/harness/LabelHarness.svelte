<script lang="ts">
import Label from "../../Label.svelte";

let { forEl = undefined as string | undefined, text = "Email" } = $props();
</script>

<Label for={forEl}>
	{text}
</Label>
