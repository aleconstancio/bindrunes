<script lang="ts">
import { Bell, CreditCard, Shield, User } from "lucide-svelte";
import { Button, Card, Input, Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "urupe-ui";

let activeTab = $state("profile");
</script>

<div class="flex min-h-screen bg-background">
  <aside class="w-64 border-r border-border p-4">
    <div class="mb-6 px-2">
      <h2 class="text-lg font-bold text-foreground">SaaS Dashboard</h2>
    </div>
    <nav class="space-y-1">
      <a href="/dashboard" class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
        Dashboard
      </a>
      <a href="/settings" class="flex items-center rounded-md px-3 py-2 text-sm font-medium bg-primary text-primary-foreground">
        Settings
      </a>
    </nav>
  </aside>

  <main class="flex-1 p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-foreground">Settings</h1>
      <p class="text-muted-foreground">Manage your account settings and preferences.</p>
    </div>

    <Tabs bind:value={activeTab}>
      <TabsList>
        <TabsTrigger value="profile">
          <User class="mr-2 h-4 w-4" /> Profile
        </TabsTrigger>
        <TabsTrigger value="notifications">
          <Bell class="mr-2 h-4 w-4" /> Notifications
        </TabsTrigger>
        <TabsTrigger value="security">
          <Shield class="mr-2 h-4 w-4" /> Security
        </TabsTrigger>
        <TabsTrigger value="billing">
          <CreditCard class="mr-2 h-4 w-4" /> Billing
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile">
        <Card>
          {#snippet header()}
            <div>
              <h3 class="text-lg font-semibold text-foreground">Profile</h3>
              <p class="text-sm text-muted-foreground">Update your personal information.</p>
            </div>
          {/snippet}
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <Input label="First Name" value="Sarah" />
              <Input label="Last Name" value="Chen" />
            </div>
            <Input label="Email" value="sarah@example.com" type="email" />
            <Input label="Bio" value="CTO at TechFlow Inc." />
            <Button>Save Changes</Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="notifications">
        <Card>
          {#snippet header()}
            <div>
              <h3 class="text-lg font-semibold text-foreground">Notifications</h3>
              <p class="text-sm text-muted-foreground">Configure how you receive notifications.</p>
            </div>
          {/snippet}
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-foreground">Email Notifications</p>
                <p class="text-xs text-muted-foreground">Receive email for important updates.</p>
              </div>
              <Button variant="outline" size="sm">Enabled</Button>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-foreground">Push Notifications</p>
                <p class="text-xs text-muted-foreground">Receive push notifications on your devices.</p>
              </div>
              <Button variant="outline" size="sm">Disabled</Button>
            </div>
            <Separator />
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-foreground">Marketing Emails</p>
                <p class="text-xs text-muted-foreground">Receive emails about new features and tips.</p>
              </div>
              <Button variant="outline" size="sm">Disabled</Button>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card>
          {#snippet header()}
            <div>
              <h3 class="text-lg font-semibold text-foreground">Security</h3>
              <p class="text-sm text-muted-foreground">Manage your security settings.</p>
            </div>
          {/snippet}
          <div class="space-y-4">
            <Input label="Current Password" type="password" placeholder="Enter current password" />
            <Input label="New Password" type="password" placeholder="Enter new password" />
            <Input label="Confirm New Password" type="password" placeholder="Confirm new password" />
            <Button>Update Password</Button>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="billing">
        <Card>
          {#snippet header()}
            <div>
              <h3 class="text-lg font-semibold text-foreground">Billing</h3>
              <p class="text-sm text-muted-foreground">Manage your billing information and subscription.</p>
            </div>
          {/snippet}
          <div class="space-y-4">
            <div class="rounded-lg border border-border p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-foreground">Current Plan: Pro</p>
                  <p class="text-xs text-muted-foreground">$19/month, renews on Jan 1, 2026</p>
                </div>
                <Button variant="outline" size="sm">Upgrade</Button>
              </div>
            </div>
            <Input label="Card Number" value="**** **** **** 4242" />
            <Button>Update Billing</Button>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  </main>
</div>
