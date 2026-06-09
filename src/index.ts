// ── Shared Types ──

export type { ShortcutOptions } from "./actions/shortcut.ts";
// ── Actions ──
export { shortcut } from "./actions/shortcut.ts";
export { default as Accordion } from "./components/Accordion.svelte";
export { default as AccordionItem } from "./components/AccordionItem.svelte";
// ── Feedback & Overlay ──
export { default as Alert } from "./components/Alert.svelte";
// ── App Scaffold ──
export { default as AppProvider } from "./components/AppProvider.svelte";
// ── Auth & Access ──
export { default as AuthGuard } from "./components/AuthGuard.svelte";
export { default as Avatar } from "./components/Avatar.svelte";
export { default as Badge } from "./components/Badge.svelte";

// ── Navigation ──
export { default as Breadcrumb } from "./components/Breadcrumb.svelte";
// ── Foundation (Button, Card, Input, etc.) ──
export { default as Button } from "./components/Button.svelte";
export { default as Card } from "./components/Card.svelte";
export { default as Checkbox } from "./components/Checkbox.svelte";
export { default as Collapsible } from "./components/Collapsible.svelte";
export { default as Combobox } from "./components/Combobox.svelte";
export { default as DataChart } from "./components/DataChart.svelte";
export { default as DataTable } from "./components/DataTable.svelte";
export { default as DatePicker } from "./components/DatePicker.svelte";
export { default as Dialog } from "./components/Dialog.svelte";
export { default as DropdownMenu } from "./components/DropdownMenu.svelte";
// ── Layout (Sidebar, Dashboard Shell) ──
export {
	DashboardShell,
	DashboardShellRight,
	DashboardShellSplit,
	DashboardShellTopnav,
	NavMenu,
} from "./components/dashboard/index.ts";
export { default as EmptyState } from "./components/EmptyState.svelte";
export { default as ErrorBoundary } from "./components/ErrorBoundary.svelte";
// ── File Upload ──
export { default as FileUpload } from "./components/FileUpload.svelte";
export { default as Form } from "./components/Form.svelte";
export { default as FormField } from "./components/FormField.svelte";
export { default as Input } from "./components/Input.svelte";
// ── Form Primitives ──
export { default as Kbd } from "./components/Kbd.svelte";
export { default as Label } from "./components/Label.svelte";
export { default as LazyLoad } from "./components/LazyLoad.svelte";
export { default as ListPage } from "./components/ListPage.svelte";
export type { LandingState } from "./components/landing/index.ts";
// ── Landing ──
export {
	createLandingState,
	FAQ,
	FeatureComparison,
	FeatureGrid,
	HeroBanner,
	HowItWorks,
	IntegrationGrid,
	LandingNav,
	LandingSection,
	LogoCloud,
	MetricsBar,
	Newsletter,
	PricingTable,
	SiteFooter,
	StatsCounter,
	TeamSection,
	Testimonial,
	TestimonialGrid,
	useLanding,
} from "./components/landing/index.ts";
export { default as MetaContainer } from "./components/MetaContainer.svelte";
export { default as MetaLayout } from "./components/MetaLayout.svelte";
export { default as MetaScrollable } from "./components/MetaScrollable.svelte";
export { default as MetricCard } from "./components/MetricCard.svelte";
export { default as NavigationMenu } from "./components/NavigationMenu.svelte";
// ── Omnibar ──
export { default as Omnibar } from "./components/Omnibar.svelte";
export { default as PageHeader } from "./components/PageHeader.svelte";
export { default as PageLoading } from "./components/PageLoading.svelte";
export { default as Pagination } from "./components/Pagination.svelte";
export { default as PinInput } from "./components/PinInput.svelte";
export { default as Popconfirm } from "./components/Popconfirm.svelte";
export { default as Popover } from "./components/Popover.svelte";
export { default as Progress } from "./components/Progress.svelte";
export { default as RadioGroup } from "./components/RadioGroup.svelte";
export { default as RangeCalendar } from "./components/RangeCalendar.svelte";
export { default as RatingGroup } from "./components/RatingGroup.svelte";
// ── Rich Text Editor ──
export { default as RichTextEditor } from "./components/RichTextEditor.svelte";
export { default as RuleFootnote } from "./components/RuleFootnote.svelte";
export { default as ScrollArea } from "./components/ScrollArea.svelte";
export { default as SEO } from "./components/SEO.svelte";
export { default as SectionHeader } from "./components/SectionHeader.svelte";
export { default as Select } from "./components/Select.svelte";
export { default as Separator } from "./components/Separator.svelte";
export { default as Sheet } from "./components/Sheet.svelte";
export { default as Skeleton } from "./components/Skeleton.svelte";
export { default as Slider } from "./components/Slider.svelte";
export { default as Spinner } from "./components/Spinner.svelte";
export { default as StatusChip } from "./components/StatusChip.svelte";
export { default as Stepper } from "./components/Stepper.svelte";
export { default as Suspense } from "./components/Suspense.svelte";
export { default as Switch } from "./components/Switch.svelte";
export {
	createSidebarState,
	getSidebarContext,
	SIDEBAR_WIDTH,
	SIDEBAR_WIDTH_ICON,
	SIDEBAR_WIDTH_MOBILE,
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
} from "./components/sidebar/index.ts";
// ── Theme ──
export { default as ThemeBuilder } from "./components/ThemeBuilder.svelte";
export { default as ThemeStudio } from "./components/ThemeStudio.svelte";
export { default as ThemeToggle } from "./components/ThemeToggle.svelte";
export { default as TimeField } from "./components/TimeField.svelte";
export { default as Toggle } from "./components/Toggle.svelte";
export { default as ToggleGroup } from "./components/ToggleGroup.svelte";
export { default as Tooltip } from "./components/Tooltip.svelte";
// ── Data Display ──
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs/index.ts";
export { default as en } from "./i18n/en.ts";
export { default as ptBR } from "./i18n/pt-BR.ts";
export type {
	Column,
	NavGroup,
	NavItem,
	PaginationState,
	SortState,
	StatusVariant,
	TFunction,
} from "./shared-types";
export { getChartTheme } from "./utils/chartTheme.ts";
export { hexToOklch, oklchToHex } from "./utils/colorConvert.ts";
export { createAccess } from "./utils/createAccess.svelte.ts";
export type { Aesthetic } from "./utils/createAesthetic.svelte.ts";
// ── v1.0: Design System Axes ──
export { createAesthetic } from "./utils/createAesthetic.svelte.ts";
export type { ApiClientOptions } from "./utils/createApiClient.ts";
export { createApiClient } from "./utils/createApiClient.ts";
export type { AuthStorage, User } from "./utils/createAuth.svelte.ts";
export { createAuth } from "./utils/createAuth.svelte.ts";
export { createDarkMode } from "./utils/createDarkMode.svelte.ts";
export type { Density } from "./utils/createDensity.svelte.ts";
export { createDensity } from "./utils/createDensity.svelte.ts";
export { createEnv } from "./utils/createEnv.ts";
export type { CreateFormOptions, FormState, InferSchemaType } from "./utils/createForm.svelte.ts";
// ── Form Validation ──
export { createForm } from "./utils/createForm.svelte.ts";
export type { Dict, I18nOptions, I18nResult } from "./utils/createI18n.svelte.ts";
// ── i18n ──
export { createI18n } from "./utils/createI18n.svelte.ts";
// ── Meta Pragmas ──
export { createMetaContext, useMetaContext } from "./utils/createMetaContext.svelte";
export type { CreateMutationOptions, MutationResult } from "./utils/createMutation.svelte.ts";
export { createMutation } from "./utils/createMutation.svelte.ts";
export type {
	CreateOmnibarOptions,
	OmnibarOption,
	OmnibarState,
} from "./utils/createOmnibar.svelte.ts";
export { createOmnibar } from "./utils/createOmnibar.svelte.ts";
export { createPrefersTheme } from "./utils/createPrefersTheme.svelte.ts";
export type { CreateQueryOptions, QueryResult } from "./utils/createQuery.svelte.ts";
// ── Data Layer ──
export { createQuery } from "./utils/createQuery.svelte.ts";
// ── Utilities ──
export { createStorage } from "./utils/createStorage.ts";
export type { CreateTableOptions } from "./utils/createTable.svelte.ts";
export { createTable } from "./utils/createTable.svelte.ts";
export type { Theme } from "./utils/createTheme.svelte.ts";
export { createTheme } from "./utils/createTheme.svelte.ts";
export { createThemeBuilder } from "./utils/createThemeBuilder.svelte.ts";
export { createToast } from "./utils/createToast.svelte.ts";
export type { WizardOptions, WizardStep } from "./utils/createWizard.svelte.ts";
// ── Wizard ──
export { createWizard } from "./utils/createWizard.svelte.ts";
export { defineTheme } from "./utils/defineTheme.svelte.ts";
export { extendTheme } from "./utils/extendTheme.svelte.ts";
export {
	formatBytes,
	formatDate,
	formatDateShort,
	formatDateTime,
	formatNumber,
	formatPercentage,
	formatRelative,
	formatTime,
	LOCALE,
} from "./utils/formatters.ts";
export { hasAnyRole, hasPermission, hasRole } from "./utils/hasRole.svelte.ts";
export { deriveOmnibarOptions, derivePageInfo } from "./utils/navigation";
export { invalidateQuery, setQueryData } from "./utils/queryCache.ts";
export type {
	RealtimeEvent,
	RealtimeOptions,
	RealtimeStatus,
} from "./utils/RealtimeClient.svelte.ts";
export { RealtimeClient } from "./utils/RealtimeClient.svelte.ts";
export { readonlyGetters } from "./utils/readonlyGetters";
export type { SSEEventRouter } from "./utils/sseBridge.svelte.ts";
/** @deprecated Application-specific defaults — supply routes explicitly to handleSSEEvent() */
export { DEFAULT_SSE_ROUTES, handleSSEEvent } from "./utils/sseBridge.svelte.ts";
export { isSafeRedirect } from "./utils/url.ts";
export { useBreakpoint } from "./utils/useBreakpoint.svelte.ts";
// ── Head & Breakpoint ──
export { useHead } from "./utils/useHead.svelte.ts";
