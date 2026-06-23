<script lang="ts">
let {
	error,
	class: className = "",
}: {
	error: string;
	class?: string;
} = $props();
</script>

<div role="alert" class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive {className}">
	{error}
</div>
