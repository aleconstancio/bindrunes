<script lang="ts">
import { Mail } from "lucide-svelte";
import MetaContainer from "../../layouts/MetaContainer.svelte";
import Button from "../../primitives/Button.svelte";
import Block from "../Block.svelte";

let {
	email = "",
	onResend = undefined as (() => void) | undefined,
	loading = false,
	resent = false,
	class: className = "",
}: {
	email?: string;
	onResend?: () => void;
	loading?: boolean;
	resent?: boolean;
	class?: string;
} = $props();
</script>

<Block size="sm" spacing="normal" class={className}>
  <MetaContainer size="sm" padding={false} class="mx-auto text-center space-y-6">
    <div class="flex justify-center">
      <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Mail class="h-8 w-8 text-primary" />
      </div>
    </div>

    <div class="space-y-2">
      <h1 class="text-title-1 text-foreground font-bold">Check your email</h1>
      <p class="text-body-md text-muted-foreground">
        We sent a verification link to
        {#if email}
          <span class="font-medium text-foreground">{email}</span>
        {:else}
          your email address.
        {/if}
      </p>
    </div>

    {#if resent}
      <div class="rounded-[--radius] bg-success-soft border border-success/30 p-3 text-body-sm text-success">
        Verification email resent! Check your inbox.
      </div>
    {/if}

    {#if onResend}
      <Button variant="ghost" {loading} onclick={onResend}>
        Resend verification email
      </Button>
    {/if}

    <p class="text-body-sm text-muted-foreground">
      Didn't receive it? Check your spam folder or
      <button
        type="button"
        class="text-primary hover:underline cursor-pointer bg-transparent border-none"
        onclick={onResend}
      >
        try again
      </button>.
    </p>
  </MetaContainer>
</Block>
