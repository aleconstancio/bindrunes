<script lang="ts">
import { DashboardPage } from "bindrunes/boundrune";
import { Home, Users, Settings, BarChart3 } from "lucide-svelte";

const navigation = [
  {
    label: "Main",
    items: [
      { title: "Dashboard", to: "/dashboard/page", description: "Overview", icon: Home },
      { title: "Users", to: "/dashboard/page/users", description: "Manage users", icon: Users },
      { title: "Analytics", to: "/dashboard/page/analytics", description: "View stats", icon: BarChart3 },
      { title: "Settings", to: "/dashboard/page/settings", description: "App settings", icon: Settings },
    ],
  },
];
</script>

<DashboardPage
  appName="MyApp"
  title="Dashboard"
  {navigation}
  pathname="/dashboard/page"
>
  <div class="p-6 space-y-6">
    <h2 class="text-display-3">Welcome back</h2>
    <p class="text-body-lg text-muted-foreground">This is a DashboardPage template example.</p>
  </div>
</DashboardPage>
