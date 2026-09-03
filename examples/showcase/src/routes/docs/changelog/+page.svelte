<script lang="ts">
import { Badge } from "urupe-ui";

const changelog = `# urupe-ui

## 1.2.0

### Minor Changes

- Deep audit: standardization, architecture, LoC savings, and anti-pattern fixes

  Shared types: Extract Placement, Align, ComponentSize, InputType to shared-types.ts; update 15+ components to import
  Deduplication: Extract ErrorMessage component (4 form components), Button/Card content snippets, gridCols utility (3 components)
  CSS utilities: Add .urupe-ui-focus-ring, .urupe-ui-disabled, .urupe-ui-overlay to utilities.css
  Anti-patterns: Remove 20+ \`as Type\` casts, fix Popconfirm Svelte 4 syntax, rename onupdate→onUpdate, fix inline styles, fix Card double-cast, fix NumberInput label, fix LandingNav handler reference
  Showcase: Replace console.log→toasts in 6 auth pages, replace raw inputs with library Input, fix Alert variant inconsistency, fix DashboardShell API inconsistency, fix navGroups icon types

- Deep deduplication and standardization pass — 510+ LoC saved

  Types: Import ContainerSize, StatusVariant in Block/MetaContainer/Progress/MetricCard; extract OrderLineItem and NavLink to shared-types.ts
  Crud: Merge 6 CrudCreate/Edit components into 3 unified components with mode prop (CrudForm, CrudFormDrawer, CrudFormModal)
  Delete: Simplify DashboardShellRight/Topnav to thin wrappers; delete ChatMessage (absorbed into ChatBubble)
  Auth: Replace inline password toggles with PasswordInput in 3 auth forms; apply ErrorMessage to 7 error banners; fix error defaults
  Overlay: Apply shared .urupe-ui-overlay class to 5 overlay components; standardize close button markup
  Standardization: Rename oncopy/onapply/onpreset to camelCase; fix error="" defaults in 9 files; rename FormField hint→helper; remove 40+ redundant as Type casts

- UX/DX & design system audit — 27 fixes across accessibility, API contracts, token architecture, docs drift, and showcase demo polish

  Accessibility: Alert role="alert"/"status", WizardForm aria-current + progressbar, LoginForm role="alert", Input id prop, Select aria-describedby, Checkbox name + visible error
  API contracts: DropdownMenu open bindable, Dialog sizeClasses union typing, Popover wrapper removal, restProps forwarding on Button/Card/Badge/Alert
  Token architecture: Deduplicate editorial.css, add :root z-index values, remove orphaned \\_easingDefault, landing.css utilities import, radius comment
  Docs drift: Alert states doc update, PricingTable English fallbacks, landing.css :global() removal
  Showcase UX: Dead import cleanup, legacy on:click fix, tab overflow, deterministic calendar, anchor fix, dashboard layout, composable demos

### Patch Changes

- Re-audit fixes: critical bugs, showcase polish, exports, and standardization

  Critical: Fix dialogBody snippet never rendering in 6 Crud components; add missing Sheet/Form imports in CrudCreateDrawer
  Showcase: Fix Alert variant="error"→"destructive" in 3 files; fix DashboardShell navGroups→navigation prop; add missing Button import; replace raw inputs/buttons with library components; replace bare text-sm/text-xs with design tokens
  Exports: Add NavLink, OrderLineItem, ErrorMessage to public API; add CrudForm/CrudFormDrawer/CrudFormModal to data/index.ts
  Utilities: Implement .urupe-ui-overlay, .urupe-ui-focus-ring, .urupe-ui-disabled CSS classes
  Standardization: Fix error="" defaults in 6 files; add type annotations to DashboardShellRight/Topnav; use shared DetailSection type in CrudDetailSection
  Tests: Add ErrorMessage test; add timestamp test to ChatBubble; delete stale ChatMessage test`;
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Changelog</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    All notable changes to the urupe-ui package.
  </p>

  <div class="mt-10">
    <div class="prose prose-invert max-w-none text-body text-muted-foreground whitespace-pre-wrap">{changelog}</div>
  </div>
</div>
