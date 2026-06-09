<script lang="ts">
import { page } from "$app/stores";
import { DashboardShell, ThemeStudio } from "bindrunes";
import { createSidebarState } from "bindrunes";
import { LayoutDashboard, Settings, Users, BarChart3, FileText, Shield, Palette } from "lucide-svelte";

let { children } = $props();
let showThemeStudio = $state(false);

const sidebar = createSidebarState(true);

const navGroups = [
  {
    label: "Main",
    items: [
      { label: "Dashboard", href: "/app", icon: LayoutDashboard },
      { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
      { label: "Reports", href: "/app/reports", icon: FileText },
    ],
  },
  {
    label: "Team",
    items: [
      { label: "Members", href: "/app/members", icon: Users },
      { label: "Permissions", href: "/app/permissions", icon: Shield },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Settings", href: "/app/settings", icon: Settings },
    ],
  },
];
</script>

<DashboardShell
  brand={{ label: "bindrunes", href: "/" }}
  {navGroups}
  pathname={$page.url.pathname}
  variant="default"
>
  {@render children()}
</DashboardShell>

{#if showThemeStudio}
  <ThemeStudio />
{/if}

<button
  class="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-[--radius] bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
  onclick={() => showThemeStudio = !showThemeStudio}
  aria-label="Toggle theme studio"
>
  <Palette class="h-5 w-5" />
</button>
