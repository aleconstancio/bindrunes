// ── App Scaffold ──
export { default as AppProvider } from './components/AppProvider.svelte';

// ── Foundation ──
export { default as Button } from './components/Button.svelte';
export { default as Card } from './components/Card.svelte';
export { default as Input } from './components/Input.svelte';
export { default as Spinner } from './components/Spinner.svelte';
export { default as Skeleton } from './components/Skeleton.svelte';
export { default as Badge } from './components/Badge.svelte';
export { default as EmptyState } from './components/EmptyState.svelte';
export { default as Dialog } from './components/Dialog.svelte';
export { default as Progress } from './components/Progress.svelte';

// ── Phase 1: Form Primitives ──
export { default as Kbd } from './components/Kbd.svelte';
export { default as Label } from './components/Label.svelte';
export { default as Switch } from './components/Switch.svelte';
export { default as Checkbox } from './components/Checkbox.svelte';
export { default as Select } from './components/Select.svelte';

// ── Phase 2: Consolidation ──
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as StatusChip } from './components/StatusChip.svelte';
export { default as MetricCard } from './components/MetricCard.svelte';
export { default as Alert } from './components/Alert.svelte';
export { default as SectionHeader } from './components/SectionHeader.svelte';
export { default as RuleFootnote } from './components/RuleFootnote.svelte';

// ── Phase 3: Advanced ──
export { Tabs, TabsList, TabsTrigger, TabsContent } from './components/tabs/index.ts';
export { default as Tooltip } from './components/Tooltip.svelte';
export { default as DropdownMenu } from './components/DropdownMenu.svelte';

// ── Phase 5: Error + Loading ──
export { default as ErrorBoundary } from './components/ErrorBoundary.svelte';
export { default as Pagination } from './components/Pagination.svelte';
export { default as DataTable } from './components/DataTable.svelte';
export { default as Form } from './components/Form.svelte';
export { default as AuthGuard } from './components/AuthGuard.svelte';
export { default as PageLoading } from './components/PageLoading.svelte';
export { default as Suspense } from './components/Suspense.svelte';
export { default as LazyLoad } from './components/LazyLoad.svelte';
export { createAuth } from './utils/createAuth.svelte.ts';
export type { AuthStorage, User } from './utils/createAuth.svelte.ts';
export { hasRole, hasAnyRole, hasPermission } from './utils/hasRole.svelte.ts';
export { createAccess } from './utils/createAccess.svelte.ts';

// ── Data Visualization ──
// export { default as DataChart } from './components/DataChart.svelte'; // disabled — svelte-chartjs incompatible with Svelte 5
export { useChartTheme } from './utils/chartTheme.ts';

// ── File Upload ──
export { default as FileUpload } from './components/FileUpload.svelte';

// ── Rich Text Editor ──
export { default as RichTextEditor } from './components/RichTextEditor.svelte';

// ── Dashboard Shell ──
export { DashboardShell, DashboardShellRight, DashboardShellTopnav, DashboardShellSplit, NavMenu } from './components/dashboard/index.ts';
export type { NavItem, NavGroup } from './components/dashboard/index.ts';
export { derivePageInfo, deriveOmnibarOptions } from './components/dashboard/index.ts';

// ── Sidebar ──
export {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarTrigger,
  SidebarRail,
  SidebarSeparator,
  getSidebarContext,
  createSidebarState,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_MOBILE,
  SIDEBAR_WIDTH_ICON,
} from './components/sidebar/index.ts';

// ── Actions ──
export { shortcut } from './actions/shortcut.ts';
export type { ShortcutOptions } from './actions/shortcut.ts';

// ── Utils ──
export { createApiClient } from './utils/createApiClient.ts';
export type { ApiClientOptions } from './utils/createApiClient.ts';
export { RealtimeClient } from './utils/RealtimeClient.svelte.ts';
export type { RealtimeStatus, RealtimeEvent, RealtimeOptions } from './utils/RealtimeClient.svelte.ts';
export { handleSSEEvent, DEFAULT_SSE_ROUTES } from './utils/sseBridge.svelte.ts';
export type { SSEEventRouter } from './utils/sseBridge.svelte.ts';

// ── Data Layer ──
export { createQuery } from './utils/createQuery.svelte.ts';
export type { CreateQueryOptions, QueryResult } from './utils/createQuery.svelte.ts';
export { createMutation } from './utils/createMutation.svelte.ts';
export type { CreateMutationOptions, MutationResult } from './utils/createMutation.svelte.ts';
export { invalidateQuery, setQueryData } from './utils/queryCache.ts';

// ── Form Validation ──
export { createForm } from './utils/createForm.svelte.ts';
export type { CreateFormOptions, FormState, InferSchemaType } from './utils/createForm.svelte.ts';

// ── Wizard ──
export { createWizard } from './utils/createWizard.svelte.ts';
export type { WizardStep, WizardOptions } from './utils/createWizard.svelte.ts';

// ── Sheet ──
export { default as Sheet } from './components/Sheet.svelte';

// ── Popover ──
export { default as Popover } from './components/Popover.svelte';
export { default as Popconfirm } from './components/Popconfirm.svelte';

// ── Navigation ──
export { default as Breadcrumb } from './components/Breadcrumb.svelte';
export { default as PageHeader } from './components/PageHeader.svelte';

// ── Form ──
export { default as FormField } from './components/FormField.svelte';

// ── Stepper ──
export { default as Stepper } from './components/Stepper.svelte';

// ── Page Presets ──
export { default as ListPage } from './components/ListPage.svelte';

// ── Head ──
export { useHead } from './utils/useHead.svelte.ts';

// ── Breakpoint ──
export { useBreakpoint } from './utils/useBreakpoint.svelte.ts';

// ── Accordion ──
export { default as Accordion } from './components/Accordion.svelte';
export { default as AccordionItem } from './components/AccordionItem.svelte';
export { getAccordionContext } from './utils/accordionContext';

// ── i18n ──
export { createI18n } from './utils/createI18n.svelte.ts';
export type { Dict, I18nOptions, I18nResult, TFunction } from './utils/createI18n.svelte.ts';
export { default as ptBR } from './i18n/pt-BR.ts';

// ── Utilities Core ──
export { createStorage } from './utils/createStorage.ts';
export { createEnv } from './utils/createEnv.ts';
export { isSafeRedirect } from './utils/url.ts';
export {
  formatDate, formatDateShort, formatDateTime, formatTime,
  formatRelative, formatNumber, formatPercentage, formatBytes,
} from './utils/formatters.ts';
export { LOCALE } from './utils/formatters.ts';

// ── Theme ──
export { createTheme } from './utils/createTheme.svelte.ts';
export type { Theme } from './utils/createTheme.svelte.ts';
export { createThemeBuilder } from './utils/createThemeBuilder.svelte.ts';
export { extendTheme } from './utils/extendTheme.svelte.ts';
export { default as ThemeBuilder } from './components/ThemeBuilder.svelte';
export { hexToOklch, oklchToHex } from './utils/colorConvert.ts';

// ── Toast ──
export { createToast } from './utils/createToast.svelte.ts';

// ── Table ──
export { createTable } from './utils/createTable.svelte.ts';
export type { Column, SortState, PaginationState, CreateTableOptions } from './utils/createTable.svelte.ts';

// ── Omnibar ──
export { default as Omnibar } from './components/Omnibar.svelte';
export { createOmnibar } from './utils/createOmnibar.svelte.ts';
export type { OmnibarState, OmnibarOption, CreateOmnibarOptions } from './utils/createOmnibar.svelte.ts';


