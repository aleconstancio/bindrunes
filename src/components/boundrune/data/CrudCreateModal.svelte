<script lang="ts">
import type { BaseIssue, BaseSchema } from "valibot";
import type { FormState } from "../../../utils/createForm.svelte";
import type { CrudConfig } from "../types";
import Dialog from "../../Dialog.svelte";
import Form from "../../Form.svelte";

let {
	open = $bindable(false),
	config,
	form = undefined as
		| FormState<Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>>
		| undefined,
	onSubmit = undefined as ((e: SubmitEvent) => void | Promise<void>) | undefined,
	onSuccess = undefined as (() => void) | undefined,
	onError = undefined as ((err: Error) => void) | undefined,
	loading = false,
	children,
}: {
	open?: boolean;
	config: CrudConfig;
	form?: FormState<Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>>;
	onSubmit?: (e: SubmitEvent) => void | Promise<void>;
	onSuccess?: () => void;
	onError?: (err: Error) => void;
	loading?: boolean;
	children?: import("svelte").Snippet;
} = $props();
</script>

<Dialog bind:open title={config.title}>
  {#snippet dialogBody()}
    <Form
      {form}
      {onSubmit}
      {onSuccess}
      {onError}
      {loading}
      submitLabel={config.submitLabel ?? "Create"}
    >
      {@render children()}
    </Form>
  {/snippet}
</Dialog>
