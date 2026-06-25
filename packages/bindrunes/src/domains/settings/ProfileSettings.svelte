<script lang="ts">
import PageSection from "../../layouts/PageSection.svelte";
import Avatar from "../../primitives/Avatar.svelte";
import Button from "../../primitives/Button.svelte";
import Card from "../../primitives/Card.svelte";
import ErrorBanner from "../../primitives/ErrorBanner.svelte";
import Input from "../../primitives/Input.svelte";

let {
	name = "",
	email = "",
	avatar = "",
	onSave = undefined as ((data: { name: string; email: string }) => void) | undefined,
	onChangeAvatar = undefined as (() => void) | undefined,
	loading = false,
	error = "",
	class: className = "",
}: {
	name?: string;
	email?: string;
	avatar?: string;
	onSave?: (data: { name: string; email: string }) => void;
	onChangeAvatar?: () => void;
	loading?: boolean;
	error?: string;
	class?: string;
} = $props();

let formName = $state(name);
let formEmail = $state(email);
</script>

<PageSection reveal={false} size="md" spacing="compact" class={className}>
  <Card padding>
    <div class="space-y-6">
      <h3 class="text-title-2 text-foreground">Profile</h3>

      <div class="flex items-center gap-4">
        <Avatar src={avatar} alt={name} size="lg" />
        {#if onChangeAvatar}
          <Button variant="outline" size="sm" onclick={onChangeAvatar}>Change avatar</Button>
        {/if}
      </div>

      {#if error}
        <ErrorBanner {error} />
      {/if}

      <div class="space-y-4">
        <Input label="Name" bind:value={formName} placeholder="Your name" />
        <Input label="Email" type="email" bind:value={formEmail} placeholder="your@email.com" />
      </div>

      <div class="flex justify-end">
        <Button {loading} onclick={() => onSave?.({ name: formName, email: formEmail })}>
          Save changes
        </Button>
      </div>
    </div>
  </Card>
</PageSection>
