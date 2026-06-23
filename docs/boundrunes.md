# Boundrunes

Pre-composed page patterns organized by domain. Each domain provides a full set of components for building common B2B SaaS pages without starting from scratch.

## Import

Individual domain components are imported from `bindrunes/domains/<domain>`:

```ts
import { LoginForm, AuthLayout } from "bindrunes/domains/auth";
import { DashboardHome, StatsOverview } from "bindrunes/domains/dashboard";
```

Pre-composed page templates that wire entire domains together are available from `bindrunes/templates`:

```ts
import { AuthTemplate } from "bindrunes/templates";
```

## Templates

Full-page template components that compose domain components into ready-to-use pages:

| Template | Description |
|----------|-------------|
| `AuthTemplate` | Complete auth flow (login, register, forgot password, etc.) |
| `DashboardTemplate` | Dashboard shell with stats, activity, and quick actions |
| `CrudTemplate` | CRUD list, create, edit, detail, and delete pages |
| `CalendarTemplate` | Calendar with scheduling and booking |
| `ChatTemplate` | Chat thread, input, and conversation list |
| `EcommerceTemplate` | Product grid, cart, and checkout flow |
| `MarketingTemplate` | Landing page with hero, features, testimonials, and CTA |
| `MediaTemplate` | Media gallery with upload and player |
| `PortfolioTemplate` | Portfolio grid and case studies |
| `SettingsTemplate` | Tabbed settings with profile, security, and notifications |

```ts
import { AuthTemplate } from "bindrunes/templates";
```

## Categories

### Auth
Authentication flows -- login, registration, password reset, email verification, 2FA, and social login.

**Import from `bindrunes/domains/auth`:**

| Component | Description |
|-----------|-------------|
| `AuthLayout` | Centered auth card layout |
| `LoginForm` | Email/password login form |
| `RegisterForm` | Registration form with validation |
| `ForgotPassword` | Password reset request |
| `ResetPassword` | Password reset confirmation |
| `EmailVerification` | Email verification prompt |
| `TwoFactorAuth` | 2FA code entry |
| `SocialLogin` | OAuth provider buttons |
| `createAuthProvider` | Reactive auth context factory |
| `useAuth` | Auth context hook |

### Dashboard
Dashboard shell components -- stats, activity feeds, quick actions, and home layout.

**Import from `bindrunes/domains/dashboard`:**

| Component | Description |
|-----------|-------------|
| `DashboardHome` | Dashboard home page layout |
| `StatsOverview` | KPI stat cards row |
| `ActivityFeed` | Recent activity timeline |
| `QuickActions` | Shortcut action buttons |
| `DashboardFooter` | Dashboard footer |

### Data
CRUD operations, tables, import/export, and data management pages.

**Import from `bindrunes/domains/data`:**

| Component | Description |
|-----------|-------------|
| `CrudListPage` | Paginated list page with search |
| `CrudCreateForm` / `CrudCreateModal` / `CrudCreateDrawer` | Create variants |
| `CrudEditForm` / `CrudEditModal` / `CrudEditDrawer` | Edit variants |
| `CrudDetailSection` / `CrudDetailDrawer` | Detail view variants |
| `CrudDeleteConfirm` | Delete confirmation dialog |
| `AdvancedTable` | Feature-rich data table |
| `FacetedSearch` | Multi-faceted filter panel |
| `WizardForm` | Multi-step wizard form |
| `ExportFlow` / `ImportFlow` | CSV/Excel import and export |
| `ApiKeyManagement` | API key CRUD |
| `UserManagement` | User admin table |
| `BillingDashboard` | Billing and subscription |
| `TableHeader` | Sortable table header with column config |
| `Form` / `FormField` | Reusable form components |
| `createCrudProvider` | Reactive CRUD context factory |
| `useCrud` | CRUD context hook |

### Calendar
Scheduling and event management.

**Import from `bindrunes/domains/calendar`:**

| Component | Description |
|-----------|-------------|
| `EventCalendar` | Monthly calendar with events |
| `Scheduler` | Time slot scheduler |
| `BookingForm` | Booking request form |
| `AvailabilityGrid` | Weekly availability grid |

### Chat
Real-time messaging components.

**Import from `bindrunes/domains/chat`:**

| Component | Description |
|-----------|-------------|
| `ChatThread` | Message thread view |
| `ChatBubble` | Styled message bubble with variants and optional timestamp |
| `ChatInput` | Message composer |
| `ChatMessage` | Individual message component |
| `ConversationList` | Sidebar conversation list |
| `TypingIndicator` | Typing dots animation |
| `AgentChatPage` | AI agent chat page |
| `AgentStatus` | Agent status indicator |
| `MemoryDisplay` | Agent memory display |
| `ReasoningPanel` | AI reasoning panel |
| `ToolCallDisplay` | Tool call display |

### Agentic Copilot
Pre-built UI components for LLM chat interfaces.

**Import from `bindrunes/domains/agentic`:**

| Component | Description |
|-----------|-------------|
| `CopilotMessageList` | Scrollable message list with role-based styling |
| `CopilotInput` | Message composer with send button |
| `CopilotStreamIndicator` | Animated streaming indicator |
| `CopilotToolPanel` | Tool call and result display |
| `CopilotChainProgress` | Multi-step chain progress |
| `CopilotContextSidebar` | Context and token usage sidebar |
| `CopilotSuggestionCard` | Quick prompt suggestion cards |
| `DebateHistoryTree` | Conversation branch tree |
| `InteractiveCitations` | Clickable citation references |

### E-commerce
Product display, cart, and checkout.

**Import from `bindrunes/domains/ecommerce`:**

| Component | Description |
|-----------|-------------|
| `ProductGrid` / `ProductCard` | Product listing |
| `Cart` / `CartItem` | Shopping cart |
| `Checkout` | Checkout flow |
| `OrderSummary` | Order review |
| `PriceTag` | Formatted price display |

### Landing
Landing page building blocks -- hero sections, feature grids, pricing, testimonials, and more.

**Import from `bindrunes/domains/landing`:**

| Component | Description |
|-----------|-------------|
| `HeroBanner` | Hero section with headline and CTA |
| `FeatureGrid` | Feature cards grid |
| `FeatureComparison` | Feature comparison table |
| `ComparisonTable` | Product/plan comparison |
| `PricingTable` | Pricing plans display |
| `Testimonial` / `TestimonialGrid` | Customer testimonials |
| `LogoCloud` | Customer/partner logos |
| `FAQ` | Frequently asked questions |
| `HowItWorks` | Step-by-step how it works |
| `MetricsBar` | Key metrics display |
| `StatsCounter` | Animated stats counters |
| `Newsletter` | Newsletter signup |
| `IntegrationGrid` | Integration partners |
| `TeamSection` | Team members |
| `VideoEmbed` | Embedded video |
| `CtaBanner` | Call-to-action banner |
| `SecurityBadges` | Security compliance badges |
| `LandingNav` | Landing page navigation |
| `LandingSection` | Generic landing section wrapper |
| `SiteFooter` / `SiteFooterColumns` | Footer components |
| `createLandingState` | Landing page state factory |
| `useLanding` | Landing context hook |

### Marketing
Blog, changelog, and promotional components.

**Import from `bindrunes/domains/marketing`:**

| Component | Description |
|-----------|-------------|
| `Banner` | Hero/promo banner |
| `ContentWithImage` | Text + image section |
| `SocialProof` | Testimonials/logos |
| `BlogArticle` | Blog post display |
| `BlogListing` | Blog post listing |
| `ChangelogPage` / `ReleaseNotes` | Changelog display |
| `CommentSection` | Article comments |
| `DocsLayout` | Documentation page shell |
| `Maintenance` | Maintenance mode page |
| `Popup` | Marketing popup |
| `CookieConsent` | Cookie consent banner |
| `Schedule` | Event/feature schedule |

### Media
File handling, uploads, and media players.

**Import from `bindrunes/domains/media`:**

| Component | Description |
|-----------|-------------|
| `MediaGallery` | Image/video gallery |
| `ImageUpload` | Image upload with preview |
| `VideoPlayer` | HTML5 video player |
| `AudioPlayer` | HTML5 audio player |
| `FileCard` | File info display card |

### Portfolio
Case studies and project showcases.

**Import from `bindrunes/domains/portfolio`:**

| Component | Description |
|-----------|-------------|
| `Portfolio` | Portfolio grid page |
| `ProjectGrid` / `ProjectCard` | Project listing |
| `CaseStudy` | Case study detail |

### Settings
Account settings pages -- profile, security, notifications, danger zone.

**Import from `bindrunes/domains/settings`:**

| Component | Description |
|-----------|-------------|
| `TabbedSettings` | Tabbed settings layout |
| `SettingsSection` | Reusable settings section |
| `ProfileSettings` | Profile edit form |
| `SecuritySettings` | Password and 2FA |
| `NotificationSettings` | Notification preferences |
| `DangerZone` | Account deletion/deactivation |

## Types

Shared domain types are exported from `bindrunes/domains`:

```ts
import type {
  CrudItem,
  CrudConfig,
  CrudField,
  TableColumnConfig,
  SearchFilter,
  PortfolioItem,
  CommentItem,
  ScheduleItem,
} from "bindrunes/domains";
```

> **Note:** `TestimonialItem` and `LogoItem` are deprecated in `bindrunes/domains`. Use `Testimonial` and related types from `bindrunes/landing` instead.
