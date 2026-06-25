// ── Actions ──

export type { ShortcutOptions } from "./actions/shortcut.ts";
export { shortcut } from "./actions/shortcut.ts";
// ── Charts ──
export { default as DataChart } from "./domains/data/DataChart.svelte";
export { default as DataTable } from "./domains/data/DataTable.svelte";
// ── Forms ──
export { default as Form } from "./domains/data/Form.svelte";
export { default as FormField } from "./domains/data/FormField.svelte";
export { default as DynamicIcon } from "./layouts/DynamicIcon.svelte";
export { default as ErrorBoundary } from "./layouts/ErrorBoundary.svelte";
export { default as LazyLoad } from "./layouts/LazyLoad.svelte";
export { default as ListPage } from "./layouts/ListPage.svelte";
// ── Layout ──
export { default as MetaContainer } from "./layouts/MetaContainer.svelte";
export { default as MetaLayout } from "./layouts/MetaLayout.svelte";
export { default as MetaScrollable } from "./layouts/MetaScrollable.svelte";
export { default as PageHeader } from "./layouts/PageHeader.svelte";
export { default as PageSection } from "./layouts/PageSection.svelte";
export { default as PageShell } from "./layouts/PageShell.svelte";
// ── SEO & Head ──
export { default as SEO } from "./layouts/SEO.svelte";
export { default as SectionHeader } from "./layouts/SectionHeader.svelte";
// ── Data Display ──
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./layouts/tabs/index.ts";
// ── Foundation ──
export { default as Accordion } from "./primitives/Accordion.svelte";
export { default as AccordionItem } from "./primitives/AccordionItem.svelte";
// ── Feedback ──
export { default as Alert } from "./primitives/Alert.svelte";
// ── Overlays ──
export { default as AlertDialog } from "./primitives/AlertDialog.svelte";
// ── App Shell ──
export { default as AppProvider } from "./primitives/AppProvider.svelte";
export { default as AuthGuard } from "./primitives/AuthGuard.svelte";
export { default as Avatar } from "./primitives/Avatar.svelte";
export { default as Badge } from "./primitives/Badge.svelte";
export { default as BouncingDots } from "./primitives/BouncingDots.svelte";
// ── Navigation ──
export { default as Breadcrumb } from "./primitives/Breadcrumb.svelte";
export { default as Button } from "./primitives/Button.svelte";
export { default as Card } from "./primitives/Card.svelte";
export { default as Checkbox } from "./primitives/Checkbox.svelte";
export { default as CodeSnippet } from "./primitives/CodeSnippet.svelte";
export { default as Collapsible } from "./primitives/Collapsible.svelte";
export { default as ColorPicker } from "./primitives/ColorPicker.svelte";
export { default as Combobox } from "./primitives/Combobox.svelte";
export { default as CommandPalette } from "./primitives/CommandPalette.svelte";
export { default as ContextMenu } from "./primitives/ContextMenu.svelte";
// ── Data Table ──
export { default as DataGrid } from "./primitives/DataGrid.svelte";
// ── Data Entry ──
export { default as DatePicker } from "./primitives/DatePicker.svelte";
export { default as Dialog } from "./primitives/Dialog.svelte";
export { default as Drawer } from "./primitives/Drawer.svelte";
export { default as DropdownMenu } from "./primitives/DropdownMenu.svelte";
export { default as EmptyState } from "./primitives/EmptyState.svelte";
export { default as ErrorBanner } from "./primitives/ErrorBanner.svelte";
export { default as ErrorMessage } from "./primitives/ErrorMessage.svelte";
export { default as FileUpload } from "./primitives/FileUpload.svelte";
export { default as Input } from "./primitives/Input.svelte";
export { default as Kbd } from "./primitives/Kbd.svelte";
export { default as Label } from "./primitives/Label.svelte";
export { default as MetricCard } from "./primitives/MetricCard.svelte";
export { default as NavigationMenu } from "./primitives/NavigationMenu.svelte";
export { default as NumberInput } from "./primitives/NumberInput.svelte";
export { default as Omnibar } from "./primitives/Omnibar.svelte";
export { default as OTPInput } from "./primitives/OTPInput.svelte";
export { default as PageLoading } from "./primitives/PageLoading.svelte";
export { default as Pagination } from "./primitives/Pagination.svelte";
export { default as PasswordInput } from "./primitives/PasswordInput.svelte";
export { default as PinInput } from "./primitives/PinInput.svelte";
export { default as Popconfirm } from "./primitives/Popconfirm.svelte";
export { default as Popover } from "./primitives/Popover.svelte";
export { default as Progress } from "./primitives/Progress.svelte";
export { default as RadioGroup } from "./primitives/RadioGroup.svelte";
export { default as RangeCalendar } from "./primitives/RangeCalendar.svelte";
export { default as RatingGroup } from "./primitives/RatingGroup.svelte";
// ── Rich Text Editor ──
export { default as RichTextEditor } from "./primitives/RichTextEditor.svelte";
export { default as RuleFootnote } from "./primitives/RuleFootnote.svelte";
export { default as ScrollArea } from "./primitives/ScrollArea.svelte";
export { default as Select } from "./primitives/Select.svelte";
export { default as Separator } from "./primitives/Separator.svelte";
export { default as Sheet } from "./primitives/Sheet.svelte";
export { default as Skeleton } from "./primitives/Skeleton.svelte";
export { default as Slider } from "./primitives/Slider.svelte";
export { default as Spinner } from "./primitives/Spinner.svelte";
export { default as StatusChip } from "./primitives/StatusChip.svelte";
export { default as Stepper } from "./primitives/Stepper.svelte";
export { default as SuccessBanner } from "./primitives/SuccessBanner.svelte";
export { default as Suspense } from "./primitives/Suspense.svelte";
export { default as Switch } from "./primitives/Switch.svelte";
export type { StepperStep } from "./primitives/stepper-types";
export { default as TagInput } from "./primitives/TagInput.svelte";
// ── Theme ──
export { default as ThemeStudio } from "./primitives/ThemeStudio.svelte";
export { default as ThemeToggle } from "./primitives/ThemeToggle.svelte";
export { default as TimeField } from "./primitives/TimeField.svelte";
export { default as Timeline } from "./primitives/Timeline.svelte";
export { default as ToastProvider } from "./primitives/ToastProvider.svelte";
export { default as Toggle } from "./primitives/Toggle.svelte";
export { default as ToggleGroup } from "./primitives/ToggleGroup.svelte";
export { default as Tooltip } from "./primitives/Tooltip.svelte";
export { default as TooltipProvider } from "./primitives/TooltipProvider.svelte";
export { default as TreeView } from "./primitives/TreeView.svelte";
export type {
	Column,
	ContainerSize,
	NavGroup,
	NavItem,
	NavLink,
	PaginationState,
	SelectOption,
	SemanticVariant,
	SortState,
	StatusVariant,
	TFunction,
} from "./shared-types";
// ── Pages ──
//
// ── Templates ──
export {
	AuthTemplate,
	CalendarTemplate,
	ChatTemplate,
	CrudTemplate,
	DashboardTemplate,
	EcommerceTemplate,
	MarketingTemplate,
	MediaTemplate,
	PortfolioTemplate,
	SettingsTemplate,
} from "./templates/index.ts";
export { getChartTheme } from "./utils/chartTheme.ts";
// ── Shared Utilities ──
/** Merge class names with Tailwind conflict resolution (last-wins per utility prefix). */
export { cn } from "./utils/cn.ts";
export { hexToOklch, oklchToHex } from "./utils/colorConvert.ts";
export { checkContrast, oklchContrast, parseOklch } from "./utils/contrastCheck.ts";
// ── Composables: API & Auth ──
/** Typed fetch client with timeout, 401 handling, and domain API grouping. */
export type { ApiClientOptions } from "./utils/createApiClient.ts";
export { createApiClient } from "./utils/createApiClient.ts";
// ── Utilities ──
export { createEnv } from "./utils/createEnv.ts";
// ── Composables: i18n ──
export type { Dict, I18nOptions, I18nResult } from "./utils/createI18n.svelte.ts";
export { createI18n } from "./utils/createI18n.svelte.ts";
export { createI18nContext, useI18n } from "./utils/createI18nContext.svelte.ts";
// ── Composables: Context ──
/** Type-safe Svelte context wrapper using Symbol keys. */
export { createMetaContext, useMetaContext } from "./utils/createMetaContext.svelte.ts";
export type {
	CreateMultiTenantOptions,
	MultiTenantResult,
	Tenant,
} from "./utils/createMultiTenant.svelte.ts";
export {
	createMultiTenantContext,
	useMultiTenant,
	useMultiTenantContext,
} from "./utils/createMultiTenant.svelte.ts";
export { createPersistedDataAttribute } from "./utils/createPersistedDataAttribute.svelte.ts";
export { createPrefersTheme } from "./utils/createPrefersTheme.svelte.ts";
export type { SessionMonitorOptions } from "./utils/createSessionMonitor.svelte.ts";
export { createSessionMonitor } from "./utils/createSessionMonitor.svelte.ts";
export { createStorage } from "./utils/createStorage.ts";
export { createTheme } from "./utils/createTheme.svelte.ts";
export { createTransition } from "./utils/createTransition.svelte.ts";
export {
	formatBytes,
	formatDate,
	formatDateShort,
	formatDateTime,
	formatNumber,
	formatPercentage,
	formatRelative,
	formatTime,
	getLocale,
	setLocale,
} from "./utils/formatters.ts";
export { getGridClass } from "./utils/grid.ts";
export { hasAnyRole, hasPermission, hasRole } from "./utils/hasRole.svelte.ts";
export { isBrowser } from "./utils/isBrowser.ts";
export { deriveOmnibarOptions, derivePageInfo } from "./utils/navigation";
export { invalidateQuery, setQueryData } from "./utils/queryCache.ts";
// ── Composables: Realtime ──
export type {
	RealtimeEvent,
	RealtimeOptions,
	RealtimeStatus,
} from "./utils/RealtimeClient.svelte.ts";
export { RealtimeClient } from "./utils/RealtimeClient.svelte.ts";
export type { SemanticColor } from "./utils/semanticColors.ts";
export { semanticColors } from "./utils/semanticColors.ts";
export type { SSEEventRouter } from "./utils/sseBridge.svelte.ts";
export { handleSSEEvent } from "./utils/sseBridge.svelte.ts";
export { defaultTableFallbacks } from "./utils/tableFallbacks.ts";
/** Normalize unknown errors to Error objects. */
export { toError } from "./utils/toError.ts";
export { isSafeRedirect } from "./utils/url.ts";
/** Role-based access control checks (hasRole, hasAnyRole, hasPermission). */
export { useAccess } from "./utils/useAccess.svelte.ts";
// ── Composables: Design System ──
export type { Aesthetic } from "./utils/useAesthetic.svelte.ts";
export { useAesthetic } from "./utils/useAesthetic.svelte.ts";
// ── Composables: Reactivity ──
/** Animation class names for enter, exit, slide, fade, and scale transitions. */
export { useAnimation } from "./utils/useAnimation.svelte.ts";
/** Reactive wrapper for async operations with loading/error/data states. */
export { useAsyncState } from "./utils/useAsyncState.svelte.ts";
/** Reactive authentication token handling with login/logout/session. */
export type { AuthStorage, User } from "./utils/useAuth.svelte.ts";
export { useAuth } from "./utils/useAuth.svelte.ts";
// ── Composables: Components ──
export { useBreakpoint } from "./utils/useBreakpoint.svelte.ts";
export { useClickOutside } from "./utils/useClickOutside.svelte.ts";
/** Copy to clipboard with success/error state. */
export { useClipboard } from "./utils/useClipboard.svelte.ts";
export { useCounter } from "./utils/useCounter.svelte.ts";
/** Reactive dark mode toggling with system preference detection. */
export { useDarkMode } from "./utils/useDarkMode.svelte.ts";
/** Debounce or throttle reactive values. */
export { useDebounce } from "./utils/useDebounce.svelte.ts";
export { useDebouncedCallback } from "./utils/useDebouncedCallback.svelte.ts";
export type { Density } from "./utils/useDensity.svelte.ts";
export { useDensity } from "./utils/useDensity.svelte.ts";
/** Generic event listener with auto-cleanup on unmount. */
export { useEventListener } from "./utils/useEventListener.svelte.ts";
// ── Composables: Forms & Validation ──
/** Typesafe form state with Valibot schema validation and submit handling. */
export type { CreateFormOptions, FormState, InferSchemaType } from "./utils/useForm.svelte.ts";
export { useForm } from "./utils/useForm.svelte.ts";
export { useHead } from "./utils/useHead.svelte.ts";
export { useInfiniteScroll } from "./utils/useInfiniteScroll.svelte.ts";
export { useIntersectionObserver } from "./utils/useIntersectionObserver.svelte.ts";
export { useInterval } from "./utils/useInterval.svelte.ts";
export { useLocalStorage } from "./utils/useLocalStorage.svelte.ts";
export { useMediaQuery } from "./utils/useMediaQuery.svelte.ts";
/** Server state mutation with optimistic updates and invalidation. */
export type { CreateMutationOptions, MutationResult } from "./utils/useMutation.svelte.ts";
export { useMutation } from "./utils/useMutation.svelte.ts";
// ── Composables: Omnibar ──
export type {
	CreateOmnibarOptions,
	OmnibarOption,
	OmnibarState,
} from "./utils/useOmnibar.svelte.ts";
export { useOmnibar } from "./utils/useOmnibar.svelte.ts";
// ── Composables: Data Layer ──
/** Cached server query with stale-time, refetch, and invalidation support. */
export type { CreateQueryOptions, QueryResult } from "./utils/useQuery.svelte.ts";
export { useQuery } from "./utils/useQuery.svelte.ts";
export { useReducedMotion } from "./utils/useReducedMotion.svelte.ts";
export { useResizeObserver } from "./utils/useResizeObserver.svelte.ts";
export type { ResponsiveDensityOptions } from "./utils/useResponsiveDensity.svelte.ts";
export { useResponsiveDensity } from "./utils/useResponsiveDensity.svelte.ts";
export type { CreateTableOptions } from "./utils/useTable.svelte.ts";
export { useTable } from "./utils/useTable.svelte.ts";
export type { Theme } from "./utils/useTheme.svelte.ts";
export { useTheme } from "./utils/useTheme.svelte.ts";
export { useThrottle } from "./utils/useThrottle.svelte.ts";
export { useTimeout } from "./utils/useTimeout.svelte.ts";
/** Toast notification composable (dynamic import of svelte-sonner). */
export { useToast } from "./utils/useToast.svelte.ts";
export { useToggle } from "./utils/useToggle.svelte.ts";
export { useUrlParams } from "./utils/useUrlParams.svelte.ts";
export { useVirtualList } from "./utils/useVirtualList.svelte.ts";
export type { WizardOptions, WizardStep } from "./utils/useWizard.svelte.ts";
export { useWizard } from "./utils/useWizard.svelte.ts";
export { validateWithSchema } from "./utils/validateWithSchema.ts";
