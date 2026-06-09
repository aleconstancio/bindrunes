<script lang="ts">
import type { Snippet } from "svelte";
import type { BaseSchema } from "valibot";
import type { FormState } from "../../../utils/createForm.svelte";
import type { CrudConfig } from "../types";

let {
	open = $bindable(false),
	config,
	form = undefined as FormState<Record<string, BaseSchema<any, any, any>>> | undefined,
	onSubmit = undefined as ((e: SubmitEvent) => void | Promise<void>) | undefined,
	onSuccess = undefined as (() => void) | undefined,
	onError = undefined as ((err: Error) => void) | undefined,
	loading = false,
	children,
}: {
	open?: boolean;
	config: CrudConfig;
	form?: FormState<Record<string, BaseSchema<any, any, any>>>;
	onSubmit?: (e: SubmitEvent) => void | Promise<void>;
	onSuccess?: () => void;
	onError?: (err: Error) => void;
	loading?: boolean;
	children?: Snippet;
} = $props();
</script>

<Sheet bind:open side="right" title={config.title}>
  {#snippet footer()}
    <Form
      {form}
      {onSubmit}
      {onSuccess}
      {onError}
      {loading}
      submitLabel={config.submitLabel ?? "Create"}
    >
      {@render children?.()}
    </Form>
  {/snippet}
</Sheet>
