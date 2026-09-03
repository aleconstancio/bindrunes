<script lang="ts">
import { Badge, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Components</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    All components are fully interactive Svelte 5 blocks that adapt to the active design axes.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Primitives</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui</code>
      </p>

      <h3 class="text-title-2 text-foreground mb-3">Foundation & Forms</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Component</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Button&gt;</td>
              <td class="py-2">8 variants (primary/secondary/outline/ghost/destructive/link/soft/subtle), loading spinner, iconOnly prop.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Card&gt;</td>
              <td class="py-2">4 styles (surface/glass/outlined/ghost), interactive triggers.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Input&gt;</td>
              <td class="py-2">Text/textarea fields, error and label support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Badge&gt; / &lt;StatusChip&gt;</td>
              <td class="py-2">Status indicators with size/removable/icon props.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Dialog&gt;</td>
              <td class="py-2">Modal boxes with size variants, closeOnOverlayClick, header/footer snippets.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Sheet&gt;</td>
              <td class="py-2">Slide-out drawers with size variants and 4-side support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Tabs&gt;</td>
              <td class="py-2">Sectioned layouts with vertical orientation support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Select&gt;</td>
              <td class="py-2">Dropdown selection with options array.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Switch&gt;</td>
              <td class="py-2">Toggle with label and error support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Checkbox&gt;</td>
              <td class="py-2">Check with indeterminate state support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;CodeSnippet&gt;</td>
              <td class="py-2">Code block with copy-to-clipboard button and optional title.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-3">Button</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Default</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">variant</td>
              <td class="py-2 pr-4 font-mono text-xs">"primary" | "secondary" | "outline" | "ghost" | "destructive" | "link" | "soft" | "subtle"</td>
              <td class="py-2 pr-4">"primary"</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">size</td>
              <td class="py-2 pr-4 font-mono text-xs">"sm" | "md" | "lg"</td>
              <td class="py-2 pr-4">"md"</td>
              <td class="py-2">Button size</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">href</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Render as &lt;a&gt; instead of &lt;button&gt;</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">loading</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Show spinner and disable interaction</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">iconOnly</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Square button for icon-only content</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CodeSnippet language="svelte" class="mt-3">
{`<Button variant="primary" size="lg">Get Started</Button>
<Button href="/signup" variant="outline">Sign Up</Button>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-3">Card</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Prop</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Type</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Default</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">variant</td>
              <td class="py-2 pr-4 font-mono text-xs">"surface" | "glass" | "outlined" | "ghost"</td>
              <td class="py-2 pr-4">"surface"</td>
              <td class="py-2">Visual style</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">interactive</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2 pr-4">false</td>
              <td class="py-2">Hover/active states, role="button"</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">padding</td>
              <td class="py-2 pr-4 font-mono text-xs">boolean</td>
              <td class="py-2 pr-4">true</td>
              <td class="py-2">Apply default padding</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">href</td>
              <td class="py-2 pr-4 font-mono text-xs">string</td>
              <td class="py-2 pr-4">—</td>
              <td class="py-2">Render as link</td>
            </tr>
          </tbody>
        </table>
      </div>
      <CodeSnippet language="svelte" class="mt-3">
{`<Card variant="glass" interactive onclick={handleClick}>
  {#snippet header()}<h3>Title</h3>{/snippet}
  <p>Content goes here.</p>
</Card>`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Overlays & Navigation</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Component</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;AlertDialog&gt;</td>
              <td class="py-2">Important confirmations with customizable content.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Popover&gt;</td>
              <td class="py-2">Hover-triggered content panels.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;DropdownMenu&gt;</td>
              <td class="py-2">Context-sensitive dropdowns with item snippets.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Tooltip&gt;</td>
              <td class="py-2">Hover tooltips with rich content support.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Stepper&gt;</td>
              <td class="py-2">Step-by-step wizard navigation with ARIA list semantics.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Pagination&gt;</td>
              <td class="py-2">Tabular data pagination controls.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Breadcrumb&gt;</td>
              <td class="py-2">Breadcrumb navigation trail.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Drawer&gt;</td>
              <td class="py-2">Mobile-friendly drawer with snap points and gesture dismissal.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;TreeView&gt;</td>
              <td class="py-2">Hierarchical tree display with expand/collapse.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;AppProvider&gt;</td>
              <td class="py-2">App shell provider and route protection.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Layouts</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/layouts</code>
      </p>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Component</th>
              <th class="text-left py-2 font-medium text-foreground">Description</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;PageShell&gt;</td>
              <td class="py-2">Layout primitive with composable topbar/left/right/main zones.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;PageSection&gt;</td>
              <td class="py-2">Content zone wrapper with container sizing, spacing, and section-reveal animation.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;PageHeader&gt;</td>
              <td class="py-2">Page-level header with title, description, and actions slot.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;DashboardShell&gt;</td>
              <td class="py-2">Layout wrapper supporting standard, right, and top navigation structures.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;Sidebar&gt;</td>
              <td class="py-2">Main sidebar panel with side, variant, and collapsible props.</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-mono text-xs">&lt;SEO&gt;</td>
              <td class="py-2">Sets document title, meta descriptions, and Open Graph properties.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Domains</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/domains</code> or <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/domains/&lt;name&gt;</code>
      </p>
      <div class="space-y-4">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Auth</h3>
          <p class="text-body-sm text-muted-foreground">AuthLayout, LoginForm, RegisterForm, ForgotPassword, SocialLogin, TwoFactorAuth</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Dashboard</h3>
          <p class="text-body-sm text-muted-foreground">DashboardHome, StatsOverview, QuickActions, ActivityFeed</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Data</h3>
          <p class="text-body-sm text-muted-foreground">CrudListPage, AdvancedTable, DataTable, FacetedSearch, Form, FormField, WizardForm</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">E-commerce</h3>
          <p class="text-body-sm text-muted-foreground">ProductCard, ProductGrid, Cart, Checkout, OrderSummary, PriceTag</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Landing</h3>
          <p class="text-body-sm text-muted-foreground">HeroBanner, FeatureGrid, PricingTable, Testimonial, FAQ, LogoCloud, Newsletter, SiteFooter</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Chat</h3>
          <p class="text-body-sm text-muted-foreground">ChatThread, ChatInput, ChatMessage, ConversationList, AgentChatPage</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Calendar</h3>
          <p class="text-body-sm text-muted-foreground">EventCalendar, Scheduler, BookingForm, AvailabilityGrid</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Media</h3>
          <p class="text-body-sm text-muted-foreground">ImageUpload, VideoPlayer, AudioPlayer, MediaGallery, FileCard</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">Settings</h3>
          <p class="text-body-sm text-muted-foreground">TabbedSettings, ProfileSettings, SecuritySettings, NotificationSettings, DangerZone</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Templates</h2>
      <p class="text-body text-muted-foreground mb-4">
        Import from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">urupe-ui/templates</code>
      </p>
      <p class="text-body text-muted-foreground mb-4">
        Pre-composed full-page templates that combine primitives, layouts, and domain components into ready-to-use page layouts.
      </p>
      <div class="space-y-4">
        <div>
          <h3 class="text-title-2 text-foreground mb-2">DashboardShell</h3>
          <p class="text-body-sm text-muted-foreground">Full app shell with sidebar navigation, header, and content area.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">CrudTemplate</h3>
          <p class="text-body-sm text-muted-foreground">List + detail split layout with sidebar navigation.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">AuthTemplate</h3>
          <p class="text-body-sm text-muted-foreground">Auth layout with view switching (login/register/forgot/reset/2FA/verify-email).</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">SettingsTemplate</h3>
          <p class="text-body-sm text-muted-foreground">Settings layout with tabbed sidebar navigation.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">ChatTemplate</h3>
          <p class="text-body-sm text-muted-foreground">Chat layout with collapsible conversation list sidebar.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">CalendarTemplate</h3>
          <p class="text-body-sm text-muted-foreground">Calendar layout with optional sidebar.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">EcommerceTemplate</h3>
          <p class="text-body-sm text-muted-foreground">E-commerce layout with collapsible cart sidebar on the right.</p>
        </div>
        <div>
          <h3 class="text-title-2 text-foreground mb-2">MarketingTemplate</h3>
          <p class="text-body-sm text-muted-foreground">Marketing landing page layout.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Accessibility Patterns</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>All interactive controls have default role maps and keyboard bindings.</li>
        <li>Modals, popovers, and comboboxes utilize bits-ui focus-trapping.</li>
        <li>All components pass automated vitest-axe checks.</li>
        <li>Skip-to-content links and ARIA labels on icon-only buttons.</li>
      </ul>
    </section>
  </div>
</div>
