// ── Page Templates ──

// ── Auth ──
export { default as AuthLayout } from "./auth/AuthLayout.svelte";
export { default as AuthPage } from "./auth/AuthPage.svelte";
export type { AuthProviderState, AuthUser } from "./auth/auth-context.svelte";
export { createAuthProvider, useAuthProvider } from "./auth/auth-context.svelte";
export { default as EmailVerification } from "./auth/EmailVerification.svelte";
export { default as ForgotPassword } from "./auth/ForgotPassword.svelte";
export { default as LoginForm } from "./auth/LoginForm.svelte";
export { default as RegisterForm } from "./auth/RegisterForm.svelte";
export { default as ResetPassword } from "./auth/ResetPassword.svelte";
export { default as SocialLogin } from "./auth/SocialLogin.svelte";
export { default as TwoFactorAuth } from "./auth/TwoFactorAuth.svelte";
// ── Layout ──
export { default as Block } from "./Block.svelte";
export { default as CrudPage } from "./CrudPage.svelte";
// ── Calendar ──
export { default as AvailabilityGrid } from "./calendar/AvailabilityGrid.svelte";
export { default as BookingForm } from "./calendar/BookingForm.svelte";
export { default as CalendarPage } from "./calendar/CalendarPage.svelte";
export { default as EventCalendar } from "./calendar/EventCalendar.svelte";
export { default as Scheduler } from "./calendar/Scheduler.svelte";
// ── Chat ──
export { default as ChatBubble } from "./chat/ChatBubble.svelte";
export { default as ChatInput } from "./chat/ChatInput.svelte";
export { default as ChatPage } from "./chat/ChatPage.svelte";
export { default as ChatThread } from "./chat/ChatThread.svelte";
export { default as ConversationList } from "./chat/ConversationList.svelte";
export { default as TypingIndicator } from "./chat/TypingIndicator.svelte";
export { default as DashboardPage } from "./DashboardPage.svelte";
export { default as ActivityFeed } from "./dashboard/ActivityFeed.svelte";
export { default as DashboardFooter } from "./dashboard/DashboardFooter.svelte";
export { default as DashboardHome } from "./dashboard/DashboardHome.svelte";
export { default as QuickActions } from "./dashboard/QuickActions.svelte";
export { default as StatsOverview } from "./dashboard/StatsOverview.svelte";
// ── Data ──
export { default as AdvancedTable } from "./data/AdvancedTable.svelte";
export { default as ApiKeyManagement } from "./data/ApiKeyManagement.svelte";
export { default as BillingDashboard } from "./data/BillingDashboard.svelte";
export { default as CrudCreateDrawer } from "./data/CrudCreateDrawer.svelte";
export { default as CrudCreateForm } from "./data/CrudCreateForm.svelte";
export { default as CrudCreateModal } from "./data/CrudCreateModal.svelte";
export { default as CrudDeleteConfirm } from "./data/CrudDeleteConfirm.svelte";
export { default as CrudDetailDrawer } from "./data/CrudDetailDrawer.svelte";
export { default as CrudDetailSection } from "./data/CrudDetailSection.svelte";
export { default as CrudEditDrawer } from "./data/CrudEditDrawer.svelte";
export { default as CrudEditForm } from "./data/CrudEditForm.svelte";
export { default as CrudEditModal } from "./data/CrudEditModal.svelte";
export { default as CrudForm } from "./data/CrudForm.svelte";
export { default as CrudFormDrawer } from "./data/CrudFormDrawer.svelte";
export { default as CrudFormModal } from "./data/CrudFormModal.svelte";
export { default as CrudListPage } from "./data/CrudListPage.svelte";
export type { CrudItem, CrudProviderState } from "./data/crud-context.svelte";
export { createCrudProvider, useCrudProvider } from "./data/crud-context.svelte";
export { default as ExportFlow } from "./data/ExportFlow.svelte";
export { default as FacetedSearch } from "./data/FacetedSearch.svelte";
export { default as ImportFlow } from "./data/ImportFlow.svelte";
export { default as TableHeader } from "./data/TableHeader.svelte";
export { default as UserManagement } from "./data/UserManagement.svelte";
export { default as WizardForm } from "./data/WizardForm.svelte";
// ── E-commerce ──
export { default as Cart } from "./ecommerce/Cart.svelte";
export { default as CartItem } from "./ecommerce/CartItem.svelte";
export { default as Checkout } from "./ecommerce/Checkout.svelte";
export { default as OrderSummary } from "./ecommerce/OrderSummary.svelte";
export { default as PriceTag } from "./ecommerce/PriceTag.svelte";
export { default as ProductCard } from "./ecommerce/ProductCard.svelte";
export { default as ProductGrid } from "./ecommerce/ProductGrid.svelte";
// ── Marketing ──
export { default as Banner } from "./marketing/Banner.svelte";
export { default as BlogArticle } from "./marketing/BlogArticle.svelte";
export { default as BlogListing } from "./marketing/BlogListing.svelte";
export { default as ChangelogPage } from "./marketing/ChangelogPage.svelte";
export { default as CommentSection } from "./marketing/CommentSection.svelte";
export { default as ContentWithImage } from "./marketing/ContentWithImage.svelte";
export { default as CookieConsent } from "./marketing/CookieConsent.svelte";
export { default as DocsLayout } from "./marketing/DocsLayout.svelte";
export { default as Maintenance } from "./marketing/Maintenance.svelte";
export { default as Popup } from "./marketing/Popup.svelte";
export { default as ReleaseNotes } from "./marketing/ReleaseNotes.svelte";
export { default as Schedule } from "./marketing/Schedule.svelte";
export { default as SocialProof } from "./marketing/SocialProof.svelte";
// ── Media ──
export { default as AudioPlayer } from "./media/AudioPlayer.svelte";
export { default as FileCard } from "./media/FileCard.svelte";
export { default as ImageUpload } from "./media/ImageUpload.svelte";
export { default as MediaGallery } from "./media/MediaGallery.svelte";
export { default as VideoPlayer } from "./media/VideoPlayer.svelte";
// ── Portfolio ──
export { default as CaseStudy } from "./portfolio/CaseStudy.svelte";
export { default as Portfolio } from "./portfolio/Portfolio.svelte";
export { default as ProjectCard } from "./portfolio/ProjectCard.svelte";
export { default as ProjectGrid } from "./portfolio/ProjectGrid.svelte";
// ── Settings ──
export { default as DangerZone } from "./settings/DangerZone.svelte";
export { default as NotificationSettings } from "./settings/NotificationSettings.svelte";
export { default as ProfileSettings } from "./settings/ProfileSettings.svelte";
export { default as SecuritySettings } from "./settings/SecuritySettings.svelte";
export { default as SettingsPage } from "./settings/SettingsPage.svelte";
export { default as SettingsSection } from "./settings/SettingsSection.svelte";
export { default as TabbedSettings } from "./settings/TabbedSettings.svelte";
// ── Types ──
export type {
	CommentItem,
	ContentItem,
	CrudAction,
	CrudConfig,
	CrudField,
	DetailSection,
	LogoItem,
	PortfolioItem,
	ScheduleItem,
	SearchFilter,
	TableColumnConfig,
	TestimonialItem,
} from "./types";
