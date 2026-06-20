<script lang="ts">
import type { Snippet } from "svelte";
import type { BaseIssue, BaseSchema } from "valibot";
import Form from "../../components/Form.svelte";
import Sheet from "../../primitives/Sheet.svelte";
import type { FormState } from "../../utils/useForm.svelte";
import type { CrudConfig } from "../types";

let {
	open = $bindable(false),
	config,
	form = undefined as
		| FormState<Record<string, BaseSchema<unknown, unknown, import("valibot").BaseIssue<unknown>>>>
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
	children?: Snippet;
} = $props();
</script>

<Sheet bind:open side="right" title={config.title}>
  {#snippet dialogBody()}
    <Form
      {form}
      {onSubmit}
      {onSuccess}
      {onError}
      {loading}
      submitLabel={config.submitLabel ?? "Update"}
    >
      {@render children?.()}
    </Form>
  {/snippet}
</Sheet>
