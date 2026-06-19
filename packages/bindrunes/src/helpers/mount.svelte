<script lang="ts">
let { composable, onResult } = $props<{
	composable: () => unknown;
	onResult: (result: unknown) => void;
}>();

let result = $state<unknown>(null);

$effect(() => {
	result = composable();
});

$effect(() => {
	if (result !== null) {
		onResult(result);
	}
});
</script>

{#if result}
  <span data-testid="ready">ready</span>
{/if}
