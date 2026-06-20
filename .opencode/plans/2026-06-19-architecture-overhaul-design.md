# bindrunes v2.0 Architecture Overhaul

## Overview

This design outlines a comprehensive architectural overhaul of the bindrunes component library for v2.0. The overhaul restructures the codebase from 7 unclear categories into a clean 4-layer hierarchy, standardizes naming conventions, and establishes the kit package as the primary entry point for SvelteKit users.

## Goals

- Establish a clear 4-layer component hierarchy (Primitives > Layouts > Domains > Templates)
- Standardize naming conventions for contexts, composables, and exports
- Clean up the export structure with layer-based and domain-based sub-exports
- Position the kit package as the primary entry point for SvelteKit users
- Add visual regression testing alongside co-located tests
- Clean break with v2.0 (no backwards compatibility layers)

## Non-Goals

- Adding new components (this is a restructuring, not a feature release)
- Changing the underlying Svelte 5 runes patterns
- Modifying the CSS token system

---

## 1. The 4-Layer Hierarchy

### Current State

7 categories with unclear boundaries:
- Primitives (root `components/`)
- Meta-Components (root `components/`)
- Dashboard Shell (`components/dashboard/`)
- Sidebar (`components/sidebar/`)
- Landing (`components/landing/`)
- Boundrunes (`components/boundrune/`)
- Scaffold (`components/scaffold/`)

### Proposed Structure

```
Layer 4: Templates     (pre-composed page patterns)
Layer 3: Domains       (domain-specific composites)
Layer 2: Layouts       (page structure components)
Layer 1: Primitives    (basic building blocks)
```

Each layer builds on the previous:
- **Layer 1** has no dependencies on other layers
- **Layer 2** uses Layer 1 components
- **Layer 3** uses Layer 1 + Layer 2 components
- **Layer 4** uses all layers

---

## 2. Layer Definitions

### Layer 1: Primitives

**What:** Basic building blocks with no domain-specific logic.

**Characteristics:**
- Standalone, reusable UI components
- No knowledge of page structure or business logic
- Configurable via props only
- Accessible by default

**Components:**
- Button, Card, Input, Badge, Alert, Tabs, Switch, Select
- Tooltip, Popover, DropdownMenu, Checkbox, RadioGroup
- Slider, DatePicker, TimeField, PinInput, RatingGroup
- FileUpload, RichTextEditor, CodeSnippet
- Skeleton, Spinner, Progress, Avatar, Pagination
- Stepper, Accordion, Collapsible
- Dialog, Sheet, Drawer, AlertDialog, ContextMenu
- NavigationMenu, Breadcrumb, Separator, ScrollArea
- Toggle, ToggleGroup, TagInput, NumberInput, PasswordInput
- Combobox, TreeView, DataGrid, CommandPalette
- OTPInput, ColorPicker

**Export:** `bindrunes` (root)

### Layer 2: Layouts

**What:** Page structure components that define how content is arranged.

**Characteristics:**
- Define page structure and layout
- Use Layer 1 primitives
- Handle responsive behavior
- Manage spacing, containment, and overflow

**Components:**
- PageShell, PageSection, MetaContainer, MetaLayout, MetaScrollable
- Block, ErrorBoundary, DynamicIcon, LazyLoad
- ListPage, SEO, SectionHeader, PageHeader
- DashboardShell, DashboardShellRight, DashboardShellSplit
- DashboardShellTopnav, DashboardShellHeader, DashboardShellBrand, NavMenu
- Sidebar, SidebarProvider, SidebarContent, SidebarHeader, SidebarFooter
- SidebarGroup, SidebarMenu, SidebarMenuItem, SidebarMenuButton
- SidebarMenuBadge, SidebarMenuSkeleton, SidebarRail, SidebarSeparator, SidebarTrigger

**Export:** `bindrunes/layouts`

### Layer 3: Domains

**What:** Domain-specific composites that combine primitives for specific use cases.

**Characteristics:**
- Grouped by business domain
- Use Layer 1 + Layer 2 components
- Include domain-specific logic (auth, CRUD, chat, etc.)
- Have their own context patterns

**Domains:**

| Domain | Components |
|--------|-----------|
| auth | AuthLayout, LoginForm, RegisterForm, ForgotPassword, ResetPassword, EmailVerification, TwoFactorAuth, SocialLogin |
| chat | ChatBubble, ChatInput, ChatMessage, ChatThread, ConversationList, TypingIndicator, ToolCallDisplay, AgentStatus, ReasoningPanel, MemoryDisplay |
| data | DataTable, AdvancedTable, FacetedSearch, WizardForm, CrudListPage, CrudCreateForm, CrudEditForm, CrudDetailSection, CrudDeleteConfirm, UserManagement, ApiKeyManagement, BillingDashboard, ExportFlow, ImportFlow |
| landing | HeroBanner, FeatureGrid, HowItWorks, PricingTable, Testimonial, TestimonialGrid, MetricsBar, StatsCounter, FAQ, LogoCloud, TeamSection, IntegrationGrid, FeatureComparison, Newsletter, CtaBanner, VideoEmbed, ComparisonTable, SecurityBadges, SiteFooter, SiteFooterColumns, LandingNav, LandingSection |
| media | MediaGallery, ImageUpload, VideoPlayer, AudioPlayer, FileCard |
| calendar | EventCalendar, Scheduler, BookingForm, AvailabilityGrid |
| ecommerce | ProductCard, ProductGrid, Cart, CartItem, Checkout, OrderSummary, PriceTag |
| portfolio | ProjectCard, ProjectGrid, CaseStudy |
| settings | TabbedSettings, ProfileSettings, SecuritySettings, NotificationSettings, DangerZone, SettingsSection |
| marketing | Banner, BlogArticle, BlogListing, ChangelogPage, CommentSection, ContentWithImage, CookieConsent, DocsLayout, Maintenance, Popup, ReleaseNotes, Schedule, SocialProof |

**Export:** `bindrunes/domains` (all) + `bindrunes/domains/auth`, `bindrunes/domains/chat`, etc.

### Layer 4: Templates

**What:** Pre-composed page patterns that combine all layers into ready-to-use pages.

**Characteristics:**
- Complete page layouts
- Use all layers
- Accept data props for customization
- Include loading, empty, and error states

**Templates:**
- DashboardTemplate - Complete dashboard with sidebar, stats, activity feed
- AuthTemplate - Authentication flow with login, register, forgot password
- ChatTemplate - Chat interface with threads, messages, agent status
- SettingsTemplate - Settings page with tabs, profile, security, notifications
- CrudTemplate - CRUD page with list, create, edit, delete
- CalendarTemplate - Calendar with events, scheduler, booking
- EcommerceTemplate - Product grid, cart, checkout
- MarketingTemplate - Landing page with hero, features, pricing, testimonials
- MediaTemplate - Gallery with upload, video, audio players
- PortfolioTemplate - Project grid with case studies

**Export:** `bindrunes/templates`

---

## 3. Naming Conventions

### Context Getters: `useX()`

All context getters use the `useX()` prefix:

```typescript
// Before (inconsistent)
getSidebarContext()    // get prefix
useAuthProvider()      // use prefix
useCrudProvider()      // use prefix

// After (consistent)
useSidebar()           // use prefix
useAuth()              // use prefix
useCrud()              // use prefix
useDemo()              // use prefix
useLanding()           // use prefix
```

### Composables: `useX()`

All composables use the `useX()` prefix:

```typescript
// Before (mixed)
createCounter()        // create prefix
useClickOutside()      // use prefix
createQuery()          // create prefix

// After (consistent)
useCounter()           // use prefix
useClickOutside()      // use prefix
useQuery()             // use prefix
```

### Component Props

Keep inline type annotations for components with ≤8 props, use `interface Props` for >8 props.

---

## 4. Export Structure

### Layer-based Exports

```
bindrunes              # Primitives (Layer 1)
bindrunes/layouts      # Layouts (Layer 2)
bindrunes/domains      # All domains (Layer 3)
bindrunes/templates    # Templates (Layer 4)
bindrunes/playground   # Demo infrastructure
bindrunes/tailwind     # Tailwind plugin
bindrunes/styles/*     # CSS files
bindrunes/agentic      # Agentic subsystem
```

### Domain Sub-exports

```
bindrunes/domains/auth
bindrunes/domains/chat
bindrunes/domains/data
bindrunes/domains/landing
bindrunes/domains/media
bindrunes/domains/calendar
bindrunes/domains/ecommerce
bindrunes/domains/portfolio
bindrunes/domains/settings
bindrunes/domains/marketing
```

### Deep Component Imports

Keep individual component imports for tree-shaking:

```typescript
import { Button } from "bindrunes";
import { DashboardTemplate } from "bindrunes/templates";
import { LoginForm } from "bindrunes/domains/auth";
```

---

## 5. Kit Package

### Role

Adds SvelteKit-specific utilities only. Users import UI from `bindrunes` directly.

### Exports

```
bindrunes-kit              # Re-exports bindrunes for convenience
bindrunes-kit/server       # Server auth, API, hooks, i18n
bindrunes-kit/client       # Client auth, SSE, WebSocket, autosave
bindrunes-kit/cli          # Project generator
```

### Relationship to Main Package

```typescript
// User imports UI from bindrunes
import { Button, Card } from "bindrunes";
import { DashboardTemplate } from "bindrunes/templates";

// User imports SvelteKit utilities from bindrunes-kit
import { createServerAuth } from "bindrunes-kit/server";
import { createClientAuth } from "bindrunes-kit/client";
```

---

## 6. Testing Strategy

### Co-located Tests

Keep `.svelte.test.ts` files next to components:

```
src/components/Button.svelte
src/components/Button.svelte.test.ts
```

### Visual Regression

Add Playwright visual testing for all components:

```
tests/visual/
├── primitives/
│   ├── button.spec.ts
│   ├── card.spec.ts
│   └── ...
├── layouts/
│   ├── page-shell.spec.ts
│   └── ...
├── domains/
│   ├── auth.spec.ts
│   └── ...
└── templates/
    ├── dashboard.spec.ts
    └── ...
```

### Coverage Targets

- **All layers:** 90% lines/statements, 85% branches, 88% functions
- **Agentic subsystem:** 95% lines/statements, 90% branches, 92% functions

---

## 7. Migration Strategy

### v2.0 (Clean Break)

- Remove deprecated import paths
- Remove `DashboardPage` (replaced by `DashboardTemplate`)
- Remove old context getter names
- Remove old composable names
- Update all documentation to reflect new structure

---

## 8. File Structure

### Current

```
src/
├── components/
│   ├── Button.svelte
│   ├── Card.svelte
│   ├── dashboard/
│   ├── sidebar/
│   ├── landing/
│   ├── boundrune/
│   └── scaffold/
├── utils/
├── styles/
└── i18n/
```

### Proposed

```
src/
├── primitives/
│   ├── Button.svelte
│   ├── Card.svelte
│   └── ...
├── layouts/
│   ├── PageShell.svelte
│   ├── Sidebar.svelte
│   └── ...
├── domains/
│   ├── auth/
│   │   ├── LoginForm.svelte
│   │   └── ...
│   ├── chat/
│   ├── data/
│   └── ...
├── templates/
│   ├── DashboardTemplate.svelte
│   ├── AuthTemplate.svelte
│   └── ...
├── playground/
│   ├── DemoLayout.svelte
│   └── ...
├── utils/
├── styles/
└── i18n/
```

---

## 9. Implementation Phases

### Phase 1: Foundation (Weeks 1-2)
- Create new directory structure
- Move primitives to `src/primitives/`
- Move layouts to `src/layouts/`
- Update exports

### Phase 2: Domains (Weeks 3-4)
- Move domain components to `src/domains/`
- Rename boundrune contexts
- Update exports

### Phase 3: Templates (Weeks 5-6)
- Rename boundrune page patterns to templates
- Move to `src/templates/`
- Update exports

### Phase 4: Naming (Week 7)
- Rename all composables to `useX()`
- Rename all context getters to `useX()`
- Update documentation

### Phase 5: Testing (Week 8)
- Add visual regression tests
- Update coverage targets
- Verify all tests pass

---

## 10. Success Metrics

- **Clear hierarchy:** 4 layers with obvious boundaries
- **Consistent naming:** All composables and contexts use `useX()`
- **Clean exports:** 8 layer-based exports + 10 domain sub-exports
- **Kit clarity:** Kit adds SvelteKit utilities, main package provides UI
- **Test coverage:** 90%+ across all layers
- **Visual regression:** All components have visual tests

---

## Appendix

### A. Component Inventory

**Layer 1 (Primitives):** ~80 components
**Layer 2 (Layouts):** ~30 components
**Layer 3 (Domains):** ~100 components across 10 domains
**Layer 4 (Templates):** 10 templates

### B. Export Map

| Export Path | Layer | Description |
|-------------|-------|-------------|
| `bindrunes` | 1 | Primitives |
| `bindrunes/layouts` | 2 | Layouts |
| `bindrunes/domains` | 3 | All domains |
| `bindrunes/domains/auth` | 3 | Auth domain |
| `bindrunes/domains/chat` | 3 | Chat domain |
| `bindrunes/domains/data` | 3 | Data domain |
| `bindrunes/domains/landing` | 3 | Landing domain |
| `bindrunes/domains/media` | 3 | Media domain |
| `bindrunes/domains/calendar` | 3 | Calendar domain |
| `bindrunes/domains/ecommerce` | 3 | E-commerce domain |
| `bindrunes/domains/portfolio` | 3 | Portfolio domain |
| `bindrunes/domains/settings` | 3 | Settings domain |
| `bindrunes/domains/marketing` | 3 | Marketing domain |
| `bindrunes/templates` | 4 | Templates |
| `bindrunes/playground` | - | Demo infrastructure |
| `bindrunes/tailwind` | - | Tailwind plugin |
| `bindrunes/styles/*` | - | CSS files |
| `bindrunes/agentic` | - | Agentic subsystem |

### C. Naming Convention Changes

| Old Name | New Name |
|----------|----------|
| `getSidebarContext()` | `useSidebar()` |
| `createCounter()` | `useCounter()` |
| `createQuery()` | `useQuery()` |
| `createMutation()` | `useMutation()` |
| `createForm()` | `useForm()` |
| `createWizard()` | `useWizard()` |
| `createTable()` | `useTable()` |
| `createAuth()` | `useAuth()` |
| `createAccess()` | `useAccess()` |
| `createToast()` | `useToast()` |
| `createI18n()` | `useI18n()` |
| `createDarkMode()` | `useDarkMode()` |
| `createTheme()` | `useTheme()` |
| `createAesthetic()` | `useAesthetic()` |
| `createDensity()` | `useDensity()` |
