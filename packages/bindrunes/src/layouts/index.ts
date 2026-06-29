// Layout components

// Templates (moved from src/templates/)
export { default as AuthTemplate } from "../templates/AuthTemplate.svelte";
export { default as CalendarTemplate } from "../templates/CalendarTemplate.svelte";
export { default as ChatTemplate } from "../templates/ChatTemplate.svelte";
export { default as CrudTemplate } from "../templates/CrudTemplate.svelte";
export { default as DashboardTemplate } from "../templates/DashboardTemplate.svelte";
export { default as EcommerceTemplate } from "../templates/EcommerceTemplate.svelte";
export { default as MarketingTemplate } from "../templates/MarketingTemplate.svelte";
export { default as MediaTemplate } from "../templates/MediaTemplate.svelte";
export { default as PortfolioTemplate } from "../templates/PortfolioTemplate.svelte";
export { default as SettingsTemplate } from "../templates/SettingsTemplate.svelte";
export { default as DynamicIcon } from "./DynamicIcon.svelte";
// Dashboard shell components
export { default as DashboardShell } from "./dashboard/DashboardShell.svelte";
export { default as DashboardShellBrand } from "./dashboard/DashboardShellBrand.svelte";
export { default as DashboardShellHeader } from "./dashboard/DashboardShellHeader.svelte";
export { default as DashboardShellRight } from "./dashboard/DashboardShellRight.svelte";
export { default as DashboardShellSplit } from "./dashboard/DashboardShellSplit.svelte";
export { default as DashboardShellTopnav } from "./dashboard/DashboardShellTopnav.svelte";
export { default as NavMenu } from "./dashboard/NavMenu.svelte";
export { default as ErrorBoundary } from "./ErrorBoundary.svelte";
export { default as LazyLoad } from "./LazyLoad.svelte";
export { default as ListPage } from "./ListPage.svelte";
export { default as MetaContainer } from "./MetaContainer.svelte";
export { default as MetaLayout } from "./MetaLayout.svelte";
export { default as MetaScrollable } from "./MetaScrollable.svelte";
export { default as PageHeader } from "./PageHeader.svelte";
export { default as PageSection } from "./PageSection.svelte";
export { default as PageShell } from "./PageShell.svelte";
export { default as SEO } from "./SEO.svelte";
export { default as SectionHeader } from "./SectionHeader.svelte";
// Sidebar components
export {
	createSidebarState,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSkeleton,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
} from "./sidebar/index.ts";
// Tabs components
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs/index.ts";
