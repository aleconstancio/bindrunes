<script lang="ts">
import type { Snippet } from "svelte";
import type { BaseIssue, BaseSchema } from "valibot";
import type { FormState } from "../../utils/useForm.svelte";
import Block from "../Block.svelte";
import type { CrudConfig } from "../types";
import Form from "./Form.svelte";

let {
	config,
	form = undefined as
		| FormState<Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>>
		| undefined,
	onSubmit = undefined as ((e: SubmitEvent) => void | Promise<void>) | undefined,
	onSuccess = undefined as (() => void) | undefined,
	onError = undefined as ((err: Error) => void) | undefined,
	loading = false,
	mode = "edit" as "create" | "edit",
	children,
	class: className = "",
}: {
	config: CrudConfig;
	form?: FormState<Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>>;
	onSubmit?: (e: SubmitEvent) => void | Promise<void>;
	onSuccess?: () => void;
	onError?: (err: Error) => void;
	loading?: boolean;
	mode?: "create" | "edit";
	children?: Snippet;
	class?: string;
} = $props();
</script>

<Block size="md" spacing="compact" class={className}>
  <div class="space-y-6">
    <div>
      <h2 class="text-title-2 text-foreground">{config.title}</h2>
      {#if config.description}
        <p class="text-body-md text-muted-foreground mt-1">{config.description}</p>
      {/if}
    </div>

    <Form
      {form}
      {onSubmit}
      {onSuccess}
      {onError}
      {loading}
      submitLabel={config.submitLabel ?? (mode === "create" ? "Create" : "Update")}
    >
      {@render children?.()}
    </Form>
  </div>
</Block>
