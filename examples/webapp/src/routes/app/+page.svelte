<script lang="ts">
  import { PageHeader, ErrorBoundary } from "urupe-ui/layouts";
	import { MetricCard, Card, Badge, PageLoading } from "urupe-ui";
  import { AdvancedTable } from "urupe-ui/domains/data";
  import { TrendingUp, Users, DollarSign, Activity } from "lucide-svelte";

  let loading = $state(true);

  $effect(() => {
    const timer = setTimeout(() => loading = false, 1500);
    return () => clearTimeout(timer);
  });

  const metrics = [
    { label: "Total Revenue", value: "$48,250", detail: "+12.5% from last month", icon: DollarSign, variant: "success" as const },
    { label: "Active Users", value: "2,847", detail: "+8.2% from last month", icon: Users, variant: "default" as const },
    { label: "Conversion Rate", value: "3.24%", detail: "+1.1% from last month", icon: TrendingUp, variant: "success" as const },
    { label: "Avg. Response", value: "245ms", detail: "99.9% uptime", icon: Activity, variant: "warning" as const },
  ];

  const userColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const userRows = [
    { name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
    { name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
    { name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
    { name: "David Brown", email: "david@example.com", role: "Editor", status: "Active" },
  ];
</script>

<div class="space-y-6">
  <PageHeader
    title="Dashboard"
    description="Welcome back! Here's what's happening with your platform today."
  />

  <ErrorBoundary>
    {#if loading}
      <PageLoading preset="cards" />
    {:else}
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {#each metrics as metric}
          <MetricCard {...metric} />
        {/each}
      </div>

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card variant="glass" padding>
          {#snippet children()}
            <div class="flex items-center justify-between">
              <h3 class="text-title-2 font-bold text-foreground">Recent Activity</h3>
              <Badge variant="primary">Live</Badge>
            </div>
            <p class="mt-4 text-body-md text-muted-foreground">Activity feed coming soon.</p>
          {/snippet}
        </Card>

        <Card variant="glass" padding>
          {#snippet children()}
            <div class="flex items-center justify-between">
              <h3 class="text-title-2 font-bold text-foreground">System Health</h3>
              <Badge variant="success">All Systems Go</Badge>
            </div>
            <p class="mt-4 text-body-md text-muted-foreground">System status monitoring coming soon.</p>
          {/snippet}
        </Card>
      </div>

      <AdvancedTable
        columns={userColumns}
        rows={userRows}
        searchPlaceholder="Search users..."
        createLabel="Add User"
      />
    {/if}
  </ErrorBoundary>
</div>
