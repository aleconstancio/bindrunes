# Starter Templates Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create 5 starter SvelteKit apps under `templates/` that showcase bindrunes capabilities for different use cases.

**Architecture:** Each template is a standalone SvelteKit app using workspace dependency on `bindrunes`. Templates use the existing domain components (dashboard, auth, ecommerce, chat, agentic, data, landing) and layout primitives (AppProvider, PageShell, DashboardShell, etc.). Each template follows the same structural pattern: package.json, svelte.config.js, vite.config.ts, tsconfig.json, and src/ with app.html, app.css, routes.

**Tech Stack:** SvelteKit, Svelte 5, Tailwind CSS v4, bindrunes workspace, lucide-svelte, mode-watcher, svelte-sonner, Bun workspaces, turbo.

---

## File Structure

### Common files across all templates

Each template gets these files (paths relative to `templates/<name>/`):

```
package.json              - workspace package with deps
svelte.config.js          - SvelteKit config with adapter-auto
vite.config.ts            - Vite config with tailwind + sveltekit plugins
tsconfig.json             - extends .svelte-kit/tsconfig.json
src/
  app.html                - HTML shell with data-theme/data-aesthetic/data-density attrs
  app.css                 - CSS imports (tailwind + bindrunes)
  routes/
    +layout.svelte        - wraps with AppProvider
    +layout.ts            - export const ssr = false
    +page.svelte          - homepage (template-specific)
    +error.svelte         - error page
```

### Root package.json

Modify `/home/ale/Projects/bindrunes/package.json` workspaces to include `"templates/*"`.

### Template-specific files

**1. saas-dashboard/**
- `src/routes/+page.svelte` - redirect to /dashboard
- `src/routes/dashboard/+page.svelte` - StatsOverview + ActivityFeed + MetricCards
- `src/routes/settings/+page.svelte` - TabbedSettings with Profile/Notifications/Security
- `src/routes/login/+page.svelte` - LoginForm from auth domain

**2. ai-chatbot/**
- `src/routes/+page.svelte` - ChatTemplate layout with conversation list + chat area
- Uses CopilotMessageList, CopilotInput, CopilotStreamIndicator, CopilotToolPanel from agentic domain
- Uses ConversationList from chat domain

**3. ecommerce-storefront/**
- `src/routes/+page.svelte` - ProductGrid with ProductCard items
- `src/routes/product/[id]/+page.svelte` - Product detail page
- `src/routes/checkout/+page.svelte` - Checkout with OrderSummary
- Uses EcommerceTemplate, Cart, CartItem, ProductCard, ProductGrid, PriceTag

**4. marketing-site/**
- `src/routes/+page.svelte` - Full landing page using MarketingTemplate components
- Uses HeroBanner, FeatureGrid, PricingTable, FAQ, TestimonialGrid, SiteFooter, LandingNav

**5. crud-admin/**
- `src/routes/+page.svelte` - DashboardShell with CrudListPage, CrudDetailDrawer, CrudFormModal
- Uses FacetedSearch, AdvancedTable from data domain
- Uses createCrudProvider for state management

---

## Task 1: Update root package.json and create templates directory

**Files:**
- Modify: `/home/ale/Projects/bindrunes/package.json`

- [ ] **Step 1: Add templates workspace to root package.json**

Change the workspaces array from:
```json
"workspaces": ["packages/*", "examples/*", "docs-site"]
```
to:
```json
"workspaces": ["packages/*", "examples/*", "docs-site", "templates/*"]
```

- [ ] **Step 2: Create templates directory**

```bash
mkdir -p /home/ale/Projects/bindrunes/templates
```

- [ ] **Step 3: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add package.json templates/
git commit -m "feat: add templates workspace to monorepo"
```

---

## Task 2: Create saas-dashboard template

**Files:**
- Create: `templates/saas-dashboard/package.json`
- Create: `templates/saas-dashboard/svelte.config.js`
- Create: `templates/saas-dashboard/vite.config.ts`
- Create: `templates/saas-dashboard/tsconfig.json`
- Create: `templates/saas-dashboard/src/app.html`
- Create: `templates/saas-dashboard/src/app.css`
- Create: `templates/saas-dashboard/src/routes/+layout.svelte`
- Create: `templates/saas-dashboard/src/routes/+layout.ts`
- Create: `templates/saas-dashboard/src/routes/+page.svelte`
- Create: `templates/saas-dashboard/src/routes/+error.svelte`
- Create: `templates/saas-dashboard/src/routes/dashboard/+page.svelte`
- Create: `templates/saas-dashboard/src/routes/settings/+page.svelte`
- Create: `templates/saas-dashboard/src/routes/login/+page.svelte`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "bindrunes-template-saas-dashboard",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
  server: {
    port: 5177,
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create src/app.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="editorial" data-aesthetic="minimal" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>SaaS Dashboard — bindrunes</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 6: Create src/app.css**

```css
@import "bindrunes/playground/app.css";
```

- [ ] **Step 7: Create src/routes/+layout.ts**

```ts
export const ssr = false;
```

- [ ] **Step 8: Create src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 9: Create src/routes/+error.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { Button, EmptyState } from "bindrunes";
  import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
```

- [ ] **Step 10: Create src/routes/+page.svelte (redirect to /dashboard)**

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  onMount(() => {
    goto("/dashboard");
  });
</script>
```

- [ ] **Step 11: Create src/routes/login/+page.svelte**

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { LoginForm } from "bindrunes/domains/auth";

  function handleLogin(data: { email: string; password: string }) {
    console.log("Login:", data);
    goto("/dashboard");
  }
</script>

<main class="flex min-h-screen items-center justify-center p-6">
  <LoginForm
    onSubmit={handleLogin}
    onRegister={() => goto("/signup")}
  />
</main>
```

- [ ] **Step 12: Create src/routes/dashboard/+page.svelte**

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { PageHeader, ErrorBoundary } from "bindrunes/layouts";
  import { MetricCard, Card, Badge, PageLoading, Button } from "bindrunes";
  import { StatsOverview, ActivityFeed } from "bindrunes/domains/dashboard";
  import { TrendingUp, Users, DollarSign, Activity, Settings, LogOut } from "lucide-svelte";

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

  const navGroups = [
    {
      label: "Main",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: TrendingUp },
        { label: "Settings", href: "/settings", icon: Settings },
      ],
    },
  ];
</script>

<div class="space-y-6">
  <PageHeader
    title="Dashboard"
    description="Welcome back! Here's what's happening with your platform today."
  >
    {#snippet actions()}
      <Button variant="outline" onclick={() => goto("/settings")}>
        <Settings class="h-4 w-4 mr-2" />
        Settings
      </Button>
    {/snippet}
  </PageHeader>

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
        <StatsOverview />
        <ActivityFeed />
      </div>
    {/if}
  </ErrorBoundary>
</div>
```

- [ ] **Step 13: Create src/routes/settings/+page.svelte**

```svelte
<script lang="ts">
  import { PageHeader } from "bindrunes/layouts";
  import { TabbedSettings, ProfileSettings, NotificationSettings, SecuritySettings } from "bindrunes/domains/settings";
</script>

<div class="space-y-6">
  <PageHeader title="Settings" description="Manage your account settings and preferences." />
  <TabbedSettings
    tabs={[
      { label: "Profile", id: "profile" },
      { label: "Notifications", id: "notifications" },
      { label: "Security", id: "security" },
    ]}
  >
    {#snippet content()}
      <ProfileSettings />
    {/snippet}
  </TabbedSettings>
</div>
```

- [ ] **Step 14: Verify build**

```bash
cd /home/ale/Projects/bindrunes && bun install && cd templates/saas-dashboard && bun run build
```

- [ ] **Step 15: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/saas-dashboard/
git commit -m "feat: add saas-dashboard starter template"
```

---

## Task 3: Create ai-chatbot template

**Files:**
- Create: `templates/ai-chatbot/package.json`
- Create: `templates/ai-chatbot/svelte.config.js`
- Create: `templates/ai-chatbot/vite.config.ts`
- Create: `templates/ai-chatbot/tsconfig.json`
- Create: `templates/ai-chatbot/src/app.html`
- Create: `templates/ai-chatbot/src/app.css`
- Create: `templates/ai-chatbot/src/routes/+layout.svelte`
- Create: `templates/ai-chatbot/src/routes/+layout.ts`
- Create: `templates/ai-chatbot/src/routes/+page.svelte`
- Create: `templates/ai-chatbot/src/routes/+error.svelte`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "bindrunes-template-ai-chatbot",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
  server: {
    port: 5177,
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create src/app.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="editorial" data-aesthetic="minimal" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>AI Chatbot — bindrunes</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 6: Create src/app.css**

```css
@import "bindrunes/playground/app.css";
```

- [ ] **Step 7: Create src/routes/+layout.ts**

```ts
export const ssr = false;
```

- [ ] **Step 8: Create src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 9: Create src/routes/+error.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { Button, EmptyState } from "bindrunes";
  import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
```

- [ ] **Step 10: Create src/routes/+page.svelte**

```svelte
<script lang="ts">
  import { ChatTemplate } from "bindrunes/layouts";
  import { CopilotMessageList, CopilotInput, CopilotStreamIndicator, CopilotToolPanel } from "bindrunes/domains/agentic";
  import { ConversationList } from "bindrunes/domains/chat";
  import { MessageSquare, Bot, User } from "lucide-svelte";

  const conversations = [
    { id: "1", title: "Getting started with bindrunes", lastMessage: "How do I set up theming?", timestamp: "2m ago" },
    { id: "2", title: "Component architecture", lastMessage: "What's the best way to compose layouts?", timestamp: "1h ago" },
    { id: "3", title: "Performance optimization", lastMessage: "How do I lazy load components?", timestamp: "3h ago" },
  ];

  const messages = [
    { role: "user", content: "How do I set up a SvelteKit project with bindrunes?", timestamp: "10:00 AM" },
    { role: "assistant", content: "To set up a SvelteKit project with bindrunes, start by creating a new SvelteKit project and installing bindrunes as a workspace dependency. Then configure your CSS imports and wrap your app with AppProvider.", timestamp: "10:01 AM" },
    { role: "user", content: "Can you show me the CSS configuration?", timestamp: "10:02 AM" },
    { role: "assistant", content: "In your app.css, add the tailwind import and bindrunes CSS:\n\n@import \"bindrunes/playground/app.css\";\n\nThis sets up the full design system with three-axis theming.", timestamp: "10:03 AM" },
  ];

  let selectedConversation = $state("1");
  let inputValue = $state("");
  let isStreaming = $state(false);

  function handleSend() {
    if (!inputValue.trim()) return;
    inputValue = "";
    isStreaming = true;
    setTimeout(() => isStreaming = false, 2000);
  }
</script>

<ChatTemplate title="AI Assistant">
  {#snippet conversationList()}
    <ConversationList
      conversations={conversations}
      selectedId={selectedConversation}
      onSelect={(id) => selectedConversation = id}
    />
  {/snippet}

  {#snippet chatHeader()}
    <div class="flex items-center gap-3">
      <Bot class="h-5 w-5 text-primary" />
      <span class="font-medium text-foreground">bindrunes Assistant</span>
      <span class="text-body-sm text-muted-foreground">Online</span>
    </div>
  {/snippet}

  <CopilotMessageList messages={messages} />

  {#if isStreaming}
    <div class="px-6 pb-4">
      <CopilotStreamIndicator />
    </div>
  {/if}

  <div class="border-t border-border p-4">
    <CopilotInput
      bind:value={inputValue}
      onSend={handleSend}
      placeholder="Ask about bindrunes..."
    />
  </div>
</ChatTemplate>
```

- [ ] **Step 11: Verify build**

```bash
cd /home/ale/Projects/bindrunes/templates/ai-chatbot && bun run build
```

- [ ] **Step 12: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/ai-chatbot/
git commit -m "feat: add ai-chatbot starter template"
```

---

## Task 4: Create ecommerce-storefront template

**Files:**
- Create: `templates/ecommerce-storefront/package.json`
- Create: `templates/ecommerce-storefront/svelte.config.js`
- Create: `templates/ecommerce-storefront/vite.config.ts`
- Create: `templates/ecommerce-storefront/tsconfig.json`
- Create: `templates/ecommerce-storefront/src/app.html`
- Create: `templates/ecommerce-storefront/src/app.css`
- Create: `templates/ecommerce-storefront/src/routes/+layout.svelte`
- Create: `templates/ecommerce-storefront/src/routes/+layout.ts`
- Create: `templates/ecommerce-storefront/src/routes/+page.svelte`
- Create: `templates/ecommerce-storefront/src/routes/+error.svelte`
- Create: `templates/ecommerce-storefront/src/routes/product/[id]/+page.svelte`
- Create: `templates/ecommerce-storefront/src/routes/checkout/+page.svelte`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "bindrunes-template-ecommerce-storefront",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
  server: {
    port: 5177,
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create src/app.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="editorial" data-aesthetic="minimal" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Shop — bindrunes</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 6: Create src/app.css**

```css
@import "bindrunes/playground/app.css";
```

- [ ] **Step 7: Create src/routes/+layout.ts**

```ts
export const ssr = false;
```

- [ ] **Step 8: Create src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 9: Create src/routes/+error.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { Button, EmptyState } from "bindrunes";
  import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
```

- [ ] **Step 10: Create src/routes/+page.svelte (product grid)**

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { EcommerceTemplate } from "bindrunes/layouts";
  import { ProductGrid, ProductCard, Cart, CartItem, PriceTag } from "bindrunes/domains/ecommerce";
  import { ShoppingCart, Search } from "lucide-svelte";
  import { Button, Input } from "bindrunes";

  const products = [
    { id: "1", name: "Wireless Headphones", price: 79.99, description: "Premium noise-cancelling wireless headphones", image: "" },
    { id: "2", name: "Mechanical Keyboard", price: 149.99, description: "RGB mechanical keyboard with Cherry MX switches", image: "" },
    { id: "3", name: "USB-C Hub", price: 49.99, description: "7-in-1 USB-C hub with 4K HDMI output", image: "" },
    { id: "4", name: "Webcam HD", price: 89.99, description: "1080p HD webcam with built-in microphone", image: "" },
    { id: "5", name: "Desk Lamp", price: 34.99, description: "LED desk lamp with adjustable brightness", image: "" },
    { id: "6", name: "Monitor Stand", price: 59.99, description: "Ergonomic monitor stand with USB ports", image: "" },
  ];

  let cartItems = $state<Array<{ id: string; name: string; price: number; quantity: number }>>([]);
  let searchQuery = $state("");

  function addToCart(product: typeof products[0]) {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      cartItems = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      cartItems = [...cartItems, { id: product.id, name: product.name, price: product.price, quantity: 1 }];
    }
  }

  function removeFromCart(id: string) {
    cartItems = cartItems.filter(item => item.id !== id);
  }

  const filteredProducts = $derived(
    searchQuery
      ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : products
  );
</script>

<EcommerceTemplate title="Tech Store">
  {#snippet cartSnippet()}
    <Cart items={cartItems} onRemove={removeFromCart} />
  {/snippet}

  {#snippet header()}
    <div class="flex items-center gap-4">
      <div class="relative flex-1 max-w-md">
        <Search class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search products..."
          class="w-full rounded-[--radius] border border-border bg-background pl-10 pr-4 py-2 text-body-md focus:outline-none focus:ring-2 focus:ring-ring"
          bind:value={searchQuery}
        />
      </div>
      <Button variant="outline" onclick={() => goto("/checkout")}>
        <ShoppingCart class="h-4 w-4 mr-2" />
        Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})
      </Button>
    </div>
  {/snippet}

  <div class="space-y-6">
    <h1 class="text-display-2 text-foreground">Products</h1>
    <ProductGrid>
      {#each filteredProducts as product (product.id)}
        <ProductCard
          name={product.name}
          description={product.description}
          price={product.price}
          onAddToCart={() => addToCart(product)}
          onViewDetails={() => goto(`/product/${product.id}`)}
        />
      {/each}
    </ProductGrid>
  </div>
</EcommerceTemplate>
```

- [ ] **Step 11: Create src/routes/product/[id]/+page.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { goto } from "$app/navigation";
  import { Button, Card, Badge } from "bindrunes";
  import { PriceTag } from "bindrunes/domains/ecommerce";
  import { ArrowLeft, ShoppingCart } from "lucide-svelte";

  const products: Record<string, { name: string; price: number; description: string; features: string[] }> = {
    "1": { name: "Wireless Headphones", price: 79.99, description: "Premium noise-cancelling wireless headphones with 30-hour battery life.", features: ["Active noise cancellation", "30-hour battery", "Bluetooth 5.0", "Foldable design"] },
    "2": { name: "Mechanical Keyboard", price: 149.99, description: "RGB mechanical keyboard with Cherry MX switches.", features: ["Cherry MX switches", "RGB backlight", "N-key rollover", "USB-C connection"] },
    "3": { name: "USB-C Hub", price: 49.99, description: "7-in-1 USB-C hub with 4K HDMI output.", features: ["4K HDMI output", "USB 3.0 ports", "SD card reader", "Power delivery"] },
    "4": { name: "Webcam HD", price: 89.99, description: "1080p HD webcam with built-in microphone.", features: ["1080p resolution", "Built-in mic", "Auto-focus", "Low light correction"] },
    "5": { name: "Desk Lamp", price: 34.99, description: "LED desk lamp with adjustable brightness.", features: ["LED technology", "5 brightness levels", "Touch control", "USB charging port"] },
    "6": { name: "Monitor Stand", price: 59.99, description: "Ergonomic monitor stand with USB ports.", features: ["Adjustable height", "USB 3.0 ports", "Cable management", "VESA compatible"] },
  };

  const product = $derived(products[page.params.id] ?? products["1"]);
</script>

<div class="space-y-6 p-6">
  <Button variant="ghost" onclick={() => goto("/")}>
    <ArrowLeft class="h-4 w-4 mr-2" />
    Back to Products
  </Button>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <Card variant="surface" padding>
      {#snippet children()}
        <div class="flex h-64 items-center justify-center rounded-[--radius] bg-muted">
          <span class="text-body-lg text-muted-foreground">Product Image</span>
        </div>
      {/snippet}
    </Card>

    <div class="space-y-4">
      <h1 class="text-display-2 text-foreground">{product.name}</h1>
      <PriceTag price={product.price} />
      <p class="text-body-lg text-muted-foreground">{product.description}</p>

      <div class="space-y-2">
        <h3 class="text-title-2 text-foreground">Features</h3>
        <ul class="space-y-1">
          {#each product.features as feature}
            <li class="flex items-center gap-2 text-body-md text-muted-foreground">
              <Badge variant="success">✓</Badge>
              {feature}
            </li>
          {/each}
        </ul>
      </div>

      <Button variant="primary" size="lg" onclick={() => goto("/checkout")}>
        <ShoppingCart class="h-4 w-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  </div>
</div>
```

- [ ] **Step 12: Create src/routes/checkout/+page.svelte**

```svelte
<script lang="ts">
  import { goto } from "$app/navigation";
  import { Button, Card, Input } from "bindrunes";
  import { Checkout, OrderSummary } from "bindrunes/domains/ecommerce";
  import { ArrowLeft, CreditCard } from "lucide-svelte";

  const orderItems = [
    { name: "Wireless Headphones", price: 79.99, quantity: 1 },
    { name: "USB-C Hub", price: 49.99, quantity: 2 },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  function handleCheckout(data: Record<string, unknown>) {
    console.log("Checkout:", data);
  }
</script>

<div class="space-y-6 p-6">
  <Button variant="ghost" onclick={() => goto("/")}>
    <ArrowLeft class="h-4 w-4 mr-2" />
    Continue Shopping
  </Button>

  <h1 class="text-display-2 text-foreground">Checkout</h1>

  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <div class="space-y-6">
      <Card variant="surface" padding>
        {#snippet children()}
          <h2 class="text-title-1 text-foreground mb-4">Shipping Information</h2>
          <form class="space-y-4" onsubmit={(e) => { e.preventDefault(); handleCheckout({}); }}>
            <div class="grid grid-cols-2 gap-4">
              <Input label="First Name" placeholder="John" />
              <Input label="Last Name" placeholder="Doe" />
            </div>
            <Input label="Email" type="email" placeholder="john@example.com" />
            <Input label="Address" placeholder="123 Main St" />
            <div class="grid grid-cols-3 gap-4">
              <Input label="City" placeholder="New York" />
              <Input label="State" placeholder="NY" />
              <Input label="ZIP" placeholder="10001" />
            </div>
          </form>
        {/snippet}
      </Card>

      <Card variant="surface" padding>
        {#snippet children()}
          <h2 class="text-title-1 text-foreground mb-4">Payment</h2>
          <div class="space-y-4">
            <Input label="Card Number" placeholder="4242 4242 4242 4242" />
            <div class="grid grid-cols-2 gap-4">
              <Input label="Expiry" placeholder="MM/YY" />
              <Input label="CVC" placeholder="123" />
            </div>
          </div>
        {/snippet}
      </Card>
    </div>

    <div>
      <OrderSummary items={orderItems} {subtotal} {shipping} {tax} {total} />
      <div class="mt-6">
        <Button variant="primary" size="lg" class="w-full" onclick={() => handleCheckout({})}>
          <CreditCard class="h-4 w-4 mr-2" />
          Pay ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  </div>
</div>
```

- [ ] **Step 13: Verify build**

```bash
cd /home/ale/Projects/bindrunes/templates/ecommerce-storefront && bun run build
```

- [ ] **Step 14: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/ecommerce-storefront/
git commit -m "feat: add ecommerce-storefront starter template"
```

---

## Task 5: Create marketing-site template

**Files:**
- Create: `templates/marketing-site/package.json`
- Create: `templates/marketing-site/svelte.config.js`
- Create: `templates/marketing-site/vite.config.ts`
- Create: `templates/marketing-site/tsconfig.json`
- Create: `templates/marketing-site/src/app.html`
- Create: `templates/marketing-site/src/app.css`
- Create: `templates/marketing-site/src/routes/+layout.svelte`
- Create: `templates/marketing-site/src/routes/+layout.ts`
- Create: `templates/marketing-site/src/routes/+page.svelte`
- Create: `templates/marketing-site/src/routes/+error.svelte`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "bindrunes-template-marketing-site",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
  server: {
    port: 5177,
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create src/app.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="editorial" data-aesthetic="minimal" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Marketing Site — bindrunes</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 6: Create src/app.css**

```css
@import "bindrunes/playground/app.css";
```

- [ ] **Step 7: Create src/routes/+layout.ts**

```ts
export const ssr = false;
```

- [ ] **Step 8: Create src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 9: Create src/routes/+error.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { Button, EmptyState } from "bindrunes";
  import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
```

- [ ] **Step 10: Create src/routes/+page.svelte**

```svelte
<script lang="ts">
  import {
    createLandingState,
    LandingNav,
    HeroBanner,
    FeatureGrid,
    PricingTable,
    FAQ,
    TestimonialGrid,
    SiteFooter,
  } from "bindrunes/domains/landing";
  import { ArrowRight, Zap, Shield, Layers, BarChart3, Users, Globe } from "lucide-svelte";

  const landing = createLandingState();

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Sub-millisecond response times powered by edge computing." },
    { icon: Shield, title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption." },
    { icon: Layers, title: "Modular Architecture", description: "Composable components and plugins — use what you need." },
    { icon: BarChart3, title: "Real-time Analytics", description: "Live dashboards with streaming data and alerting." },
    { icon: Users, title: "Team Collaboration", description: "Shared workspaces, comments, and approval workflows." },
    { icon: Globe, title: "Global Scale", description: "Multi-region deployment with automatic failover." },
  ];

  const plans = [
    { name: "Starter", monthly: 29, annual: 290, features: ["Up to 5 users", "10 GB storage", "Basic analytics", "Email support"], cta: { label: "Start Free Trial", variant: "outline" as const, href: "/signup" } },
    { name: "Pro", monthly: 79, annual: 790, highlight: true, badge: "Most Popular", features: ["Unlimited users", "100 GB storage", "Advanced analytics", "Priority support", "API access"], cta: { label: "Start Free Trial", variant: "primary" as const, href: "/signup" } },
    { name: "Enterprise", monthly: 199, annual: 1990, features: ["Unlimited everything", "Custom analytics", "24/7 support", "SSO/SAML", "SLA guarantee"], cta: { label: "Contact Sales", variant: "outline" as const, href: "/contact" } },
  ];

  const testimonials = [
    { quote: "This product transformed how we ship features. What used to take weeks now takes days.", author: "Sarah Chen", role: "CTO, TechFlow Inc.", avatarFallback: "SC" },
    { quote: "The design system is a game-changer. Our brand team loves the flexibility.", author: "Marcus Johnson", role: "Lead Engineer, DataSync", avatarFallback: "MJ" },
    { quote: "We evaluated 12 platforms. This was the only one that checked every box.", author: "Priya Patel", role: "VP Product, CloudBase", avatarFallback: "PP" },
  ];

  const faqItems = [
    { question: "What is this product?", answer: "A modern Svelte 5 component library and design system for building B2B SaaS applications at scale." },
    { question: "How does the three-axis design system work?", answer: "Theme controls color identity, aesthetic controls form, and density controls spacing. They are completely independent." },
    { question: "Is there a free trial?", answer: "Yes, all plans come with a 14-day free trial. No credit card required." },
    { question: "Can I self-host?", answer: "Enterprise plans include on-premise deployment options with Docker images and Kubernetes manifests." },
  ];
</script>

<div class="landing-page">
  <LandingNav
    logo={{ href: "/", label: "MyApp" }}
    links={navLinks}
    cta={{ label: "Get Started", href: "/signup" }}
    sectionIds={["features", "pricing", "testimonials", "faq"]}
  />

  <main>
    <HeroBanner
      badge="v1.0 — Now available"
      description="The modern platform for building and scaling SaaS applications. Ship faster with a complete design system."
      ctas={[
        { label: "Get Started", href: "/signup", icon: ArrowRight },
        { label: "See Features", href: "#features", variant: "outline" },
      ]}
      footnote={{ title: "14-day free trial.", description: "No credit card required." }}
    >
      {#snippet title()}Build SaaS Apps<br />at <span class="text-gradient-violet">Scale</span>{/snippet}
    </HeroBanner>

    <section id="features" class="border-t border-border" aria-label="Features">
      <div class="px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-display-3 text-foreground">Everything you need to ship faster</h2>
          <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
            From UI components to data layer, auth, and theming — get the full stack for building modern SaaS apps.
          </p>
          <div class="mt-12">
            <FeatureGrid {features} columns={3} variant="card" />
          </div>
        </div>
      </div>
    </section>

    <section id="pricing" class="border-t border-border" aria-label="Pricing">
      <div class="px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-display-3 text-foreground">Simple, transparent pricing</h2>
          <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
            No hidden fees. No surprises. Scale as you grow.
          </p>
          <div class="mt-12">
            <PricingTable {plans} />
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="border-t border-border" aria-label="Testimonials">
      <div class="px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-display-3 text-foreground">Loved by engineering teams</h2>
          <p class="mx-auto mt-4 max-w-2xl text-center text-body-lg text-muted-foreground">
            See what our customers have to say.
          </p>
          <div class="mt-12">
            <TestimonialGrid {testimonials} columns={3} />
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="border-t border-border" aria-label="FAQ">
      <div class="px-6 py-16">
        <div class="mx-auto max-w-6xl">
          <h2 class="text-center text-display-3 text-foreground">Frequently asked questions</h2>
          <div class="mx-auto mt-12 max-w-3xl">
            <FAQ items={faqItems} />
          </div>
        </div>
      </div>
    </section>
  </main>

  <SiteFooter
    logo={{ label: "MyApp" }}
    links={[
      { label: "Docs", href: "/docs" },
      { label: "Blog", href: "/blog" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ]}
    bottomLinks={[
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ]}
  />
</div>
```

- [ ] **Step 11: Verify build**

```bash
cd /home/ale/Projects/bindrunes/templates/marketing-site && bun run build
```

- [ ] **Step 12: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/marketing-site/
git commit -m "feat: add marketing-site starter template"
```

---

## Task 6: Create crud-admin template

**Files:**
- Create: `templates/crud-admin/package.json`
- Create: `templates/crud-admin/svelte.config.js`
- Create: `templates/crud-admin/vite.config.ts`
- Create: `templates/crud-admin/tsconfig.json`
- Create: `templates/crud-admin/src/app.html`
- Create: `templates/crud-admin/src/app.css`
- Create: `templates/crud-admin/src/routes/+layout.svelte`
- Create: `templates/crud-admin/src/routes/+layout.ts`
- Create: `templates/crud-admin/src/routes/+page.svelte`
- Create: `templates/crud-admin/src/routes/+error.svelte`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "bindrunes-template-crud-admin",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "bindrunes": "workspace:*",
    "lucide-svelte": "^1.0.1",
    "mode-watcher": "^0.5.1",
    "svelte": "^5.0.0",
    "svelte-sonner": "^0.3.28"
  },
  "devDependencies": {
    "@sveltejs/adapter-auto": "^6.0.0",
    "@sveltejs/kit": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^7.0.0",
    "@tailwindcss/vite": "^4.3.0",
    "tailwindcss": "^4.3.0",
    "typescript": "^6.0.0",
    "vite": "^7.0.0"
  }
}
```

- [ ] **Step 2: Create svelte.config.js**

```js
import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
  },
};
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  optimizeDeps: {
    exclude: ['bindrunes'],
  },
  server: {
    port: 5177,
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

- [ ] **Step 5: Create src/app.html**

```html
<!DOCTYPE html>
<html lang="en" data-theme="editorial" data-aesthetic="minimal" data-density="comfortable">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CRUD Admin — bindrunes</title>
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

- [ ] **Step 6: Create src/app.css**

```css
@import "bindrunes/playground/app.css";
```

- [ ] **Step 7: Create src/routes/+layout.ts**

```ts
export const ssr = false;
```

- [ ] **Step 8: Create src/routes/+layout.svelte**

```svelte
<script lang="ts">
  import "../app.css";
  import { AppProvider } from "bindrunes";
  let { children } = $props();
</script>

<AppProvider>
  {@render children()}
</AppProvider>
```

- [ ] **Step 9: Create src/routes/+error.svelte**

```svelte
<script lang="ts">
  import { page } from "$app/state";
  import { Button, EmptyState } from "bindrunes";
  import { Home } from "lucide-svelte";
</script>

<div class="flex min-h-screen items-center justify-center p-6">
  <EmptyState
    icon={Home}
    title={page.status === 404 ? "Page not found" : "Something went wrong"}
    description={page.status === 404 ? "The page you're looking for doesn't exist." : "An unexpected error occurred. Please try again."}
  >
    {#snippet children()}
      <div class="mt-6">
        <Button href="/" variant="primary">Go Home</Button>
      </div>
    {/snippet}
  </EmptyState>
</div>
```

- [ ] **Step 10: Create src/routes/+page.svelte**

```svelte
<script lang="ts">
  import { PageHeader } from "bindrunes/layouts";
  import { CrudListPage, CrudDetailDrawer, CrudFormModal, FacetedSearch, createCrudProvider } from "bindrunes/domains/data";
  import { AdvancedTable } from "bindrunes/domains/data";
  import { Button } from "bindrunes";
  import { Plus } from "lucide-svelte";

  const crud = createCrudProvider({
    schema: {
      name: "user",
      fields: {
        name: { type: "string", required: true, label: "Name" },
        email: { type: "email", required: true, label: "Email" },
        role: { type: "string", required: true, label: "Role" },
        status: { type: "string", label: "Status" },
      },
    },
    data: [
      { id: "1", name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
      { id: "2", name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
      { id: "3", name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
      { id: "4", name: "David Brown", email: "david@example.com", role: "Editor", status: "Active" },
    ],
  });

  const columns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
  ];

  const filters = [
    { key: "role", label: "Role", options: ["Admin", "Editor", "Viewer"] },
    { key: "status", label: "Status", options: ["Active", "Inactive"] },
  ];

  let showForm = $state(false);
  let showDetail = $state(false);
  let selectedItem = $state<Record<string, unknown> | null>(null);

  function handleCreate(item: Record<string, unknown>) {
    console.log("Create:", item);
    showForm = false;
  }

  function handleUpdate(id: string, item: Record<string, unknown>) {
    console.log("Update:", id, item);
    showForm = false;
  }

  function handleDelete(id: string) {
    console.log("Delete:", id);
  }
</script>

<div class="space-y-6">
  <PageHeader title="Users" description="Manage users and their permissions.">
    {#snippet actions()}
      <Button variant="primary" onclick={() => { selectedItem = null; showForm = true; }}>
        <Plus class="h-4 w-4 mr-2" />
        Add User
      </Button>
    {/snippet}
  </PageHeader>

  <FacetedSearch {filters} />

  <AdvancedTable
    {columns}
    rows={crud.data}
    searchPlaceholder="Search users..."
    onRowClick={(row) => { selectedItem = row; showDetail = true; }}
  />
</div>

{#if showForm}
  <CrudFormModal
    schema={crud.schema}
    item={selectedItem}
    onSubmit={selectedItem ? (data) => handleUpdate(String(selectedItem.id), data) : handleCreate}
    onCancel={() => { showForm = false; selectedItem = null; }}
  />
{/if}

{#if showDetail && selectedItem}
  <CrudDetailDrawer
    item={selectedItem}
    schema={crud.schema}
    onEdit={() => { showDetail = false; showForm = true; }}
    onDelete={() => { handleDelete(String(selectedItem.id)); showDetail = false; }}
    onClose={() => { showDetail = false; selectedItem = null; }}
  />
{/if}
```

- [ ] **Step 11: Verify build**

```bash
cd /home/ale/Projects/bindrunes/templates/crud-admin && bun run build
```

- [ ] **Step 12: Commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/crud-admin/
git commit -m "feat: add crud-admin starter template"
```

---

## Task 7: Final verification and commit

- [ ] **Step 1: Install all dependencies**

```bash
cd /home/ale/Projects/bindrunes && bun install
```

- [ ] **Step 2: Build all templates**

```bash
cd /home/ale/Projects/bindrunes && bunx turbo run build --filter='./templates/*'
```

- [ ] **Step 3: Fix any build errors**

If build fails, inspect the error output and fix the template files. Common issues:
- Missing imports (check component signatures in bindrunes)
- Incorrect prop names (verify against domain index.ts exports)
- CSS import path issues

- [ ] **Step 4: Final commit**

```bash
cd /home/ale/Projects/bindrunes
git add templates/ package.json
git commit -m "feat: add 5 starter templates (dashboard, chatbot, ecommerce, marketing, crud)"
```
