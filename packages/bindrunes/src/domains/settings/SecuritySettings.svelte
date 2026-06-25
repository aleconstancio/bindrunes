<script lang="ts">
import PageSection from "../../layouts/PageSection.svelte";
import Button from "../../primitives/Button.svelte";
import Card from "../../primitives/Card.svelte";
import Input from "../../primitives/Input.svelte";

let {
	onPasswordChange = undefined as
		| ((data: { current: string; newPassword: string }) => void)
		| undefined,
	onEnable2FA = undefined as (() => void) | undefined,
	twoFactorEnabled = false,
	loading = false,
	class: className = "",
}: {
	onPasswordChange?: (data: { current: string; newPassword: string }) => void;
	onEnable2FA?: () => void;
	twoFactorEnabled?: boolean;
	loading?: boolean;
	class?: string;
} = $props();

let currentPassword = $state("");
let newPassword = $state("");
let confirmPassword = $state("");
</script>

<PageSection reveal={false} size="md" spacing="compact" class={className}>
  <div class="space-y-6">
    <Card padding>
      <div class="space-y-4">
        <h3 class="text-title-2 text-foreground">Change Password</h3>
        <Input label="Current password" type="password" bind:value={currentPassword} />
        <Input label="New password" type="password" bind:value={newPassword} />
        <Input label="Confirm new password" type="password" bind:value={confirmPassword} />
        <div class="flex justify-end">
          <Button
            {loading}
            disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
            onclick={() => onPasswordChange?.({ current: currentPassword, newPassword })}
          >
            Update password
          </Button>
        </div>
      </div>
    </Card>

    <Card padding>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-title-2 text-foreground">Two-Factor Authentication</h3>
          <p class="text-body-sm text-muted-foreground mt-1">
            {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security to your account.'}
          </p>
        </div>
        {#if onEnable2FA}
          <Button variant={twoFactorEnabled ? "ghost" : "outline"} onclick={onEnable2FA}>
            {twoFactorEnabled ? 'Manage' : 'Enable 2FA'}
          </Button>
        {/if}
      </div>
    </Card>
  </div>
</PageSection>
