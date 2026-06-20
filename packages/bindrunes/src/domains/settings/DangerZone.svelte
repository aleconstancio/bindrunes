<script lang="ts">
import AlertDialog from "../../AlertDialog.svelte";
import Button from "../../Button.svelte";
import Card from "../../Card.svelte";
import Block from "../Block.svelte";

let {
	onDeactivate = undefined as (() => void) | undefined,
	onDelete = undefined as (() => void) | undefined,
	onTransfer = undefined as (() => void) | undefined,
	class: className = "",
}: {
	onDeactivate?: () => void;
	onDelete?: () => void;
	onTransfer?: () => void;
	class?: string;
} = $props();
</script>

<Block size="md" spacing="compact" class={className}>
  <Card padding class="border-destructive/30">
    <div class="space-y-6">
      <div>
        <h3 class="text-title-2 text-destructive">Danger Zone</h3>
        <p class="text-body-sm text-muted-foreground mt-1">
          Irreversible actions. Please be careful.
        </p>
      </div>

      <div class="space-y-4">
        {#if onTransfer}
          <div class="flex items-center justify-between p-4 rounded-[--radius] border border-border">
            <div>
              <p class="text-label-md text-foreground">Transfer Ownership</p>
              <p class="text-body-sm text-muted-foreground">Transfer this account to another user.</p>
            </div>
            <Button variant="outline" size="sm" onclick={onTransfer}>Transfer</Button>
          </div>
        {/if}

        {#if onDeactivate}
          <div class="flex items-center justify-between p-4 rounded-[--radius] border border-border">
            <div>
              <p class="text-label-md text-foreground">Deactivate Account</p>
              <p class="text-body-sm text-muted-foreground">Temporarily disable your account.</p>
            </div>
            <AlertDialog
              title="Deactivate account?"
              description="Your account will be disabled. You can reactivate it later."
              confirmLabel="Deactivate"
              destructive
              onConfirm={onDeactivate}
            >
              {#snippet trigger()}
                <Button variant="outline" size="sm">Deactivate</Button>
              {/snippet}
            </AlertDialog>
          </div>
        {/if}

        {#if onDelete}
          <div class="flex items-center justify-between p-4 rounded-[--radius] border border-destructive/30 bg-destructive/5">
            <div>
              <p class="text-label-md text-foreground">Delete Account</p>
              <p class="text-body-sm text-muted-foreground">Permanently delete this account and all data.</p>
            </div>
            <AlertDialog
              title="Delete account?"
              description="This action cannot be undone. All your data will be permanently deleted."
              confirmLabel="Delete forever"
              destructive
              onConfirm={onDelete}
            >
              {#snippet trigger()}
                <Button variant="destructive" size="sm">Delete</Button>
              {/snippet}
            </AlertDialog>
          </div>
        {/if}
      </div>
    </div>
  </Card>
</Block>
