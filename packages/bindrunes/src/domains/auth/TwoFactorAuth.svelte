<script lang="ts">
import { Shield } from "lucide-svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Button from "../../primitives/Button.svelte";
import PinInput from "../../primitives/PinInput.svelte";
import Block from "../Block.svelte";

let {
	onSubmit = undefined as ((code: string) => void | Promise<void>) | undefined,
	onUseBackup = undefined as (() => void) | undefined,
	loading = false,
	error = "",
	class: className = "",
}: {
	onSubmit?: (code: string) => void | Promise<void>;
	onUseBackup?: () => void;
	loading?: boolean;
	error?: string;
	class?: string;
} = $props();

let code = $state("");

async function handleSubmit() {
	if (code.length === 6 && onSubmit) {
		await onSubmit(code);
	}
}
</script>

<Block size="sm" spacing="normal" class={className}>
  <MetaContainer size="sm" padding={false} class="mx-auto text-center space-y-6">
    <div class="flex justify-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-[--radius-pill] bg-primary/10">
        <Shield class="h-8 w-8 text-primary" />
      </div>
    </div>

    <div class="space-y-2">
      <h1 class="text-title-1 text-foreground font-bold">Two-factor authentication</h1>
      <p class="text-body-md text-muted-foreground">
        Enter the 6-digit code from your authenticator app.
      </p>
    </div>

    {#if error}
      <div class="rounded-[--radius] bg-destructive-soft border border-destructive/30 p-3 text-body-sm text-destructive">
        {error}
      </div>
    {/if}

    <form onsubmit={handleSubmit} class="space-y-4">
      <div class="flex justify-center">
        <PinInput bind:value={code} length={6} />
      </div>

      <Button type="submit" fullWidth {loading} disabled={code.length < 6}>
        Verify
      </Button>
    </form>

    {#if onUseBackup}
      <button
        type="button"
        class="text-body-sm text-primary hover:underline cursor-pointer bg-transparent border-none"
        onclick={onUseBackup}
      >
        Use a backup code
      </button>
    {/if}
  </MetaContainer>
</Block>
