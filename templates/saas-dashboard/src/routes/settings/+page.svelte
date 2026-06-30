<script lang="ts">
  import { Card, Button, Input, Separator, Tabs, TabsList, TabsTrigger, TabsContent } from "bindrunes";
  import { User, Bell, Shield, CreditCard } from "lucide-svelte";

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

    <Tabs value={activeTab} onValueChange={(v) => { if (v) activeTab = v; }}>
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
        <Card.Root>
          <Card.Header>
            <Card.Title>Profile</Card.Title>
            <Card.Description>Update your personal information.</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">First Name</label>
                <Input value="Sarah" />
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-foreground">Last Name</label>
                <Input value="Chen" />
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Email</label>
              <Input value="sarah@example.com" type="email" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Bio</label>
              <Input value="CTO at TechFlow Inc." />
            </div>
            <Button>Save Changes</Button>
          </Card.Content>
        </Card.Root>
      </TabsContent>

      <TabsContent value="notifications">
        <Card.Root>
          <Card.Header>
            <Card.Title>Notifications</Card.Title>
            <Card.Description>Configure how you receive notifications.</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
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
          </Card.Content>
        </Card.Root>
      </TabsContent>

      <TabsContent value="security">
        <Card.Root>
          <Card.Header>
            <Card.Title>Security</Card.Title>
            <Card.Description>Manage your security settings.</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Current Password</label>
              <Input type="password" placeholder="Enter current password" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">New Password</label>
              <Input type="password" placeholder="Enter new password" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Confirm New Password</label>
              <Input type="password" placeholder="Confirm new password" />
            </div>
            <Button>Update Password</Button>
          </Card.Content>
        </Card.Root>
      </TabsContent>

      <TabsContent value="billing">
        <Card.Root>
          <Card.Header>
            <Card.Title>Billing</Card.Title>
            <Card.Description>Manage your billing information and subscription.</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="rounded-lg border border-border p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-foreground">Current Plan: Pro</p>
                  <p class="text-xs text-muted-foreground">$19/month, renews on Jan 1, 2026</p>
                </div>
                <Button variant="outline" size="sm">Upgrade</Button>
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-foreground">Card Number</label>
              <Input value="**** **** **** 4242" />
            </div>
            <Button>Update Billing</Button>
          </Card.Content>
        </Card.Root>
      </TabsContent>
    </Tabs>
  </main>
</div>
