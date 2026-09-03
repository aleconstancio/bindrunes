<script lang="ts">
  import { PageHeader } from "urupe-ui/layouts";
	import { SettingsSection } from "urupe-ui/domains/settings";
	import { Input, Switch, Button } from "urupe-ui";

  let emailNotifications = $state(true);
  let weeklyDigest = $state(false);
</script>

<div class="space-y-6">
  <PageHeader title="Settings" description="Manage your account settings and preferences." />

  <SettingsSection title="Profile">
    <Input label="Name" value="Admin User" />
    <Input label="Email" type="email" value="admin@bindrunes.dev" />
    <div class="flex justify-end">
      <Button variant="primary">Save Changes</Button>
    </div>
  </SettingsSection>

  <SettingsSection title="Notifications">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-body-md font-medium text-foreground">Email Notifications</p>
        <p class="text-body-sm text-muted-foreground">Receive email notifications for important updates.</p>
      </div>
      <Switch bind:checked={emailNotifications} />
    </div>
    <div class="flex items-center justify-between">
      <div>
        <p class="text-body-md font-medium text-foreground">Weekly Digest</p>
        <p class="text-body-sm text-muted-foreground">Receive a weekly summary of your account activity.</p>
      </div>
      <Switch bind:checked={weeklyDigest} />
    </div>
  </SettingsSection>
</div>
