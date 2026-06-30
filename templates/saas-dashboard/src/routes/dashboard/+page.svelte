<script lang="ts">
  import { Card, Badge, Button, Separator } from "bindrunes";
  import {
    Users,
    DollarSign,
    TrendingUp,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
  } from "lucide-svelte";

  const stats = [
    { label: "Total Revenue", value: "$45,231.89", change: "+20.1%", up: true, icon: DollarSign },
    { label: "Subscriptions", value: "+2,350", change: "+180.1%", up: true, icon: Users },
    { label: "Active Users", value: "+12,234", change: "+19%", up: true, icon: TrendingUp },
    { label: "Bounce Rate", value: "21.3%", change: "-4.5%", up: false, icon: Activity },
  ];

  const activity = [
    { user: "Sarah Chen", action: "deployed v2.4.1 to production", time: "2 min ago", badge: "Deploy" },
    { user: "Marcus Johnson", action: "merged PR #847 into main", time: "15 min ago", badge: "PR" },
    { user: "Priya Patel", action: "created new issue #312", time: "1 hour ago", badge: "Issue" },
    { user: "Alex Rivera", action: "updated billing settings", time: "3 hours ago", badge: "Settings" },
    { user: "Jordan Kim", action: "added 3 new team members", time: "5 hours ago", badge: "Team" },
  ];

  const navItems = [
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "Analytics", href: "/analytics", active: false },
    { label: "Users", href: "/users", active: false },
    { label: "Settings", href: "/settings", active: false },
  ];
</script>

<div class="flex min-h-screen bg-background">
  <aside class="w-64 border-r border-border p-4">
    <div class="mb-6 px-2">
      <h2 class="text-lg font-bold text-foreground">SaaS Dashboard</h2>
    </div>
    <nav class="space-y-1">
      {#each navItems as item}
        <a
          href={item.href}
          class="flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
            {item.active
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
        >
          {item.label}
        </a>
      {/each}
    </nav>
  </aside>

  <main class="flex-1 p-6">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-foreground">Dashboard</h1>
      <p class="text-muted-foreground">Welcome back. Here's an overview of your account.</p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each stats as stat}
        <Card.Root>
          <Card.Header class="flex flex-row items-center justify-between pb-2">
            <Card.Title class="text-sm font-medium text-muted-foreground">{stat.label}</Card.Title>
            <stat.icon class="h-4 w-4 text-muted-foreground" />
          </Card.Header>
          <Card.Content>
            <div class="text-2xl font-bold text-foreground">{stat.value}</div>
            <p class="flex items-center text-xs text-muted-foreground">
              {#if stat.up}
                <ArrowUpRight class="mr-1 h-3 w-3 text-emerald-500" />
                <span class="text-emerald-500">{stat.change}</span>
              {:else}
                <ArrowDownRight class="mr-1 h-3 w-3 text-red-500" />
                <span class="text-red-500">{stat.change}</span>
              {/if}
              <span class="ml-1">from last month</span>
            </p>
          </Card.Content>
        </Card.Root>
      {/each}
    </div>

    <div class="mt-6">
      <Card.Root>
        <Card.Header>
          <Card.Title>Recent Activity</Card.Title>
          <Card.Description>Latest actions across your workspace.</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="space-y-4">
            {#each activity as item}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {item.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <p class="text-sm text-foreground">
                      <span class="font-medium">{item.user}</span>
                      {item.action}
                    </p>
                    <p class="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
                <Badge variant="outline">{item.badge}</Badge>
              </div>
              {#if activity.indexOf(item) < activity.length - 1}
                <Separator />
              {/if}
            {/each}
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </main>
</div>
