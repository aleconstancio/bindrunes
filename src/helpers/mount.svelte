<script lang="ts">
let { composable, onResult } = $props<{
	composable: () => any;
	onResult: (result: any) => void;
}>();

let result = $state<any>(null);

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
