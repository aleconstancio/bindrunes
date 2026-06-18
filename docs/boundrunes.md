# Boundrunes

Pre-composed page patterns organized by domain. Each category provides a full set of components for building common B2B SaaS pages without starting from scratch.

## Import

```ts
import { LoginForm, AuthLayout } from "bindrunes/boundrune";
```

## Categories

### Auth
Authentication flows — login, registration, password reset, email verification, 2FA, and social login.

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

### Dashboard
Dashboard shell components — stats, activity feeds, quick actions, and home layout.

| Component | Description |
|-----------|-------------|
| `DashboardHome` | Dashboard home page layout |
| `StatsOverview` | KPI stat cards row |
| `ActivityFeed` | Recent activity timeline |
| `QuickActions` | Shortcut action buttons |
| `DashboardFooter` | Dashboard footer |

### Data
CRUD operations, tables, import/export, and data management pages.

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
| `createCrudProvider` | Reactive CRUD context factory |

### Calendar
Scheduling and event management.

| Component | Description |
|-----------|-------------|
| `EventCalendar` | Monthly calendar with events |
| `Scheduler` | Time slot scheduler |
| `BookingForm` | Booking request form |
| `AvailabilityGrid` | Weekly availability grid |

### Chat
Real-time messaging components.

| Component | Description |
|-----------|-------------|
| `ChatThread` | Message thread view |
| `ChatBubble` | Styled message bubble with variants and optional timestamp |
| `ChatInput` | Message composer |
| `ConversationList` | Sidebar conversation list |
| `TypingIndicator` | Typing dots animation |

### E-commerce
Product display, cart, and checkout.

| Component | Description |
|-----------|-------------|
| `ProductGrid` / `ProductCard` | Product listing |
| `Cart` / `CartItem` | Shopping cart |
| `Checkout` | Checkout flow |
| `OrderSummary` | Order review |
| `PriceTag` | Formatted price display |

### Marketing
Landing page sections, blog, changelog, and promotional components.

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

| Component | Description |
|-----------|-------------|
| `MediaGallery` | Image/video gallery |
| `ImageUpload` | Image upload with preview |
| `VideoPlayer` | HTML5 video player |
| `AudioPlayer` | HTML5 audio player |
| `FileCard` | File info display card |

### Portfolio
Case studies and project showcases.

| Component | Description |
|-----------|-------------|
| `Portfolio` | Portfolio grid page |
| `ProjectGrid` / `ProjectCard` | Project listing |
| `CaseStudy` | Case study detail |

### Settings
Account settings pages — profile, security, notifications, danger zone.

| Component | Description |
|-----------|-------------|
| `TabbedSettings` | Tabbed settings layout |
| `SettingsSection` | Reusable settings section |
| `ProfileSettings` | Profile edit form |
| `SecuritySettings` | Password and 2FA |
| `NotificationSettings` | Notification preferences |
| `DangerZone` | Account deletion/deactivation |

## Shared Layout

All categories use `Block` as the base layout primitive:

```svelte
<Block size="lg" spacing="compact">
  <!-- category content -->
</Block>
```

## Types

Shared types are exported from `bindrunes/boundrune`:

```ts
import type {
  CrudItem,
  CrudConfig,
  CrudField,
  TableColumnConfig,
  SearchFilter,
  PortfolioItem,
  TestimonialItem,
  CommentItem,
  ScheduleItem,
} from "bindrunes/boundrune";
```
