// ── Actions ──

export type { ShortcutOptions } from "./actions/shortcut.ts";
export { shortcut } from "./actions/shortcut.ts";
// ── Foundation ──
export { default as Accordion } from "./components/Accordion.svelte";
export { default as AccordionItem } from "./components/AccordionItem.svelte";
// ── Feedback ──
export { default as Alert } from "./components/Alert.svelte";
// ── Overlays ──
export { default as AlertDialog } from "./components/AlertDialog.svelte";
// ── App Shell ──
export { default as AppProvider } from "./components/AppProvider.svelte";
export { default as AuthGuard } from "./components/AuthGuard.svelte";
export { default as Avatar } from "./components/Avatar.svelte";
export { default as Badge } from "./components/Badge.svelte";
// ── Navigation ──
export { default as Breadcrumb } from "./components/Breadcrumb.svelte";
export { default as Button } from "./components/Button.svelte";
export { default as Card } from "./components/Card.svelte";
export { default as Checkbox } from "./components/Checkbox.svelte";
export { default as CodeSnippet } from "./components/CodeSnippet.svelte";
export { default as Collapsible } from "./components/Collapsible.svelte";
export { default as ColorPicker } from "./components/ColorPicker.svelte";
export { default as Combobox } from "./components/Combobox.svelte";
export { default as CommandPalette } from "./components/CommandPalette.svelte";
export { default as ContextMenu } from "./components/ContextMenu.svelte";
// ── Shared Types ──
export type {
	BadgeProps,
	ButtonProps,
	CardProps,
	CommandItem,
	CommandPaletteProps,
	DataGridProps,
	DataTableProps,
	DialogProps,
	InputProps,
	SelectProps,
	SwitchProps,
	TabsProps,
	TooltipProps,
} from "./components/component-props";
// ── Charts ──
export { default as DataChart } from "./components/DataChart.svelte";
// ── Data Table ──
export { default as DataGrid } from "./components/DataGrid.svelte";
export { default as DataTable } from "./components/DataTable.svelte";
// ── Data Entry ──
export { default as DatePicker } from "./components/DatePicker.svelte";
export { default as Dialog } from "./components/Dialog.svelte";
export { default as Drawer } from "./components/Drawer.svelte";
export { default as DropdownMenu } from "./components/DropdownMenu.svelte";
export { default as DynamicIcon } from "./components/DynamicIcon.svelte";
export { default as EmptyState } from "./components/EmptyState.svelte";
export { default as ErrorBoundary } from "./components/ErrorBoundary.svelte";
export { default as ErrorMessage } from "./components/ErrorMessage.svelte";
export { default as FileUpload } from "./components/FileUpload.svelte";
// ── Forms ──
export { default as Form } from "./components/Form.svelte";
export { default as FormField } from "./components/FormField.svelte";
export { default as Input } from "./components/Input.svelte";
export { default as Kbd } from "./components/Kbd.svelte";
export { default as Label } from "./components/Label.svelte";
export { default as LazyLoad } from "./components/LazyLoad.svelte";
// ── Pages ──
export { default as ListPage } from "./components/ListPage.svelte";
// ── Layout ──
export { default as MetaContainer } from "./components/MetaContainer.svelte";
export { default as MetaLayout } from "./components/MetaLayout.svelte";
export { default as MetaScrollable } from "./components/MetaScrollable.svelte";
export { default as MetricCard } from "./components/MetricCard.svelte";
export { default as NavigationMenu } from "./components/NavigationMenu.svelte";
export { default as NumberInput } from "./components/NumberInput.svelte";
export { default as Omnibar } from "./components/Omnibar.svelte";
export { default as OTPInput } from "./components/OTPInput.svelte";
export { default as PageHeader } from "./components/PageHeader.svelte";
export { default as PageLoading } from "./components/PageLoading.svelte";
export { default as PageSection } from "./components/PageSection.svelte";
export { default as PageShell } from "./components/PageShell.svelte";
export { default as Pagination } from "./components/Pagination.svelte";
export { default as PasswordInput } from "./components/PasswordInput.svelte";
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
// ── SEO & Head ──
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
export type { StepperStep } from "./components/stepper-types";
export { default as TagInput } from "./components/TagInput.svelte";
// ── Theme ──
export { default as ThemeStudio } from "./components/ThemeStudio.svelte";
export { default as ThemeToggle } from "./components/ThemeToggle.svelte";
export { default as TimeField } from "./components/TimeField.svelte";
export { default as Timeline } from "./components/Timeline.svelte";
export { default as ToastProvider } from "./components/ToastProvider.svelte";
export { default as Toggle } from "./components/Toggle.svelte";
export { default as ToggleGroup } from "./components/ToggleGroup.svelte";
export { default as Tooltip } from "./components/Tooltip.svelte";
export { default as TooltipProvider } from "./components/TooltipProvider.svelte";
export { default as TreeView } from "./components/TreeView.svelte";
// ── Data Display ──
export { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/tabs/index.ts";
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
export { getChartTheme } from "./utils/chartTheme.ts";
// ── Shared Utilities ──
/** Merge class names with Tailwind conflict resolution (last-wins per utility prefix). */
export { cn } from "./utils/cn.ts";
export { hexToOklch, oklchToHex } from "./utils/colorConvert.ts";
export { checkContrast, oklchContrast, parseOklch } from "./utils/contrastCheck.ts";
/** Role-based access control checks (hasRole, hasAnyRole, hasPermission). */
export { createAccess } from "./utils/createAccess.svelte.ts";
// ── Composables: Design System ──
export type { Aesthetic } from "./utils/createAesthetic.svelte.ts";
export { createAesthetic } from "./utils/createAesthetic.svelte.ts";
// ── Composables: API & Auth ──
/** Typed fetch client with timeout, 401 handling, and domain API grouping. */
export type { ApiClientOptions } from "./utils/createApiClient.ts";
export { createApiClient } from "./utils/createApiClient.ts";
/** Reactive wrapper for async operations with loading/error/data states. */
export { createAsyncState } from "./utils/createAsyncState.svelte.ts";
/** Reactive authentication token handling with login/logout/session. */
export type { AuthStorage, User } from "./utils/createAuth.svelte.ts";
export { createAuth } from "./utils/createAuth.svelte.ts";
/** Reactive dark mode toggling with system preference detection. */
export { createDarkMode } from "./utils/createDarkMode.svelte.ts";
export type { Density } from "./utils/createDensity.svelte.ts";
export { createDensity } from "./utils/createDensity.svelte.ts";
// ── Utilities ──
export { createEnv } from "./utils/createEnv.ts";
// ── Composables: Forms & Validation ──
/** Typesafe form state with Valibot schema validation and submit handling. */
export type { CreateFormOptions, FormState, InferSchemaType } from "./utils/createForm.svelte.ts";
export { createForm } from "./utils/createForm.svelte.ts";
// ── Composables: i18n ──
export type { Dict, I18nOptions, I18nResult } from "./utils/createI18n.svelte.ts";
export { createI18n } from "./utils/createI18n.svelte.ts";
export { createI18nContext, useI18n } from "./utils/createI18nContext.svelte.ts";
export { createMediaQuery } from "./utils/createMediaQuery.svelte.ts";
// ── Composables: Context ──
/** Type-safe Svelte context wrapper using Symbol keys. */
export { createMetaContext, useMetaContext } from "./utils/createMetaContext.svelte";
/** Server state mutation with optimistic updates and invalidation. */
export type { CreateMutationOptions, MutationResult } from "./utils/createMutation.svelte.ts";
export { createMutation } from "./utils/createMutation.svelte.ts";
// ── Composables: Omnibar ──
export type {
	CreateOmnibarOptions,
	OmnibarOption,
	OmnibarState,
} from "./utils/createOmnibar.svelte.ts";
export { createOmnibar } from "./utils/createOmnibar.svelte.ts";
export { createPersistedDataAttribute } from "./utils/createPersistedDataAttribute.svelte.ts";
export { createPrefersTheme } from "./utils/createPrefersTheme.svelte.ts";
// ── Composables: Data Layer ──
/** Cached server query with stale-time, refetch, and invalidation support. */
export type { CreateQueryOptions, QueryResult } from "./utils/createQuery.svelte.ts";
export { createQuery } from "./utils/createQuery.svelte.ts";
export { createStorage } from "./utils/createStorage.ts";
export type { CreateTableOptions } from "./utils/createTable.svelte.ts";
export { createTable } from "./utils/createTable.svelte.ts";
export type { Theme } from "./utils/createTheme.svelte.ts";
export { createTheme } from "./utils/createTheme.svelte.ts";
export { createThemeBuilder } from "./utils/createThemeBuilder.ts";
/** Toast notification composable (dynamic import of svelte-sonner). */
export { createToast } from "./utils/createToast.svelte.ts";
export type { WizardOptions, WizardStep } from "./utils/createWizard.svelte.ts";
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
	getLocale,
	setLocale,
} from "./utils/formatters.ts";
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
// ── Composables: Components ──
export { useBreakpoint } from "./utils/useBreakpoint.svelte.ts";
export { useClickOutside } from "./utils/useClickOutside.svelte.ts";
// ── Composables: Reactivity ──
/** Copy to clipboard with success/error state. */
export { useClipboard } from "./utils/useClipboard.svelte.ts";
export { useCounter } from "./utils/useCounter.svelte.ts";
/** Debounce or throttle reactive values. */
export { useDebounce } from "./utils/useDebounce.svelte.ts";
export { useDebouncedCallback } from "./utils/useDebouncedCallback.svelte.ts";
/** Generic event listener with auto-cleanup on unmount. */
export { useEventListener } from "./utils/useEventListener.svelte.ts";
export { useHead } from "./utils/useHead.svelte.ts";
export { useInfiniteScroll } from "./utils/useInfiniteScroll.svelte.ts";
export { useIntersectionObserver } from "./utils/useIntersectionObserver.svelte.ts";
export { useInterval } from "./utils/useInterval.svelte.ts";
export { useLocalStorage } from "./utils/useLocalStorage.svelte.ts";
export { useReducedMotion } from "./utils/useReducedMotion.svelte.ts";
export { useResizeObserver } from "./utils/useResizeObserver.svelte.ts";
export { useThrottle } from "./utils/useThrottle.svelte.ts";
export { useTimeout } from "./utils/useTimeout.svelte.ts";
export { useToggle } from "./utils/useToggle.svelte.ts";
export { useUrlParams } from "./utils/useUrlParams.svelte.ts";
export { useVirtualList } from "./utils/useVirtualList.svelte.ts";
export { validateWithSchema } from "./utils/validateWithSchema.ts";
