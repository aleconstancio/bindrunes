import type { Snippet } from "svelte";
import type { Column, SelectOption, SortState, TFunction } from "../shared-types";

export interface DataGridProps {
	columns?: Column[];
	rows?: ReadonlyArray<Record<string, unknown>>;
	rowKey?: string;
	selectable?: boolean;
	selectedIds?: string[];
	onSelectionChange?: (ids: string[]) => void;
	sort?: SortState | null;
	onSort?: (sort: SortState | null) => void;
	onRowClick?: (row: Record<string, unknown>) => void;
	emptyText?: string;
	class?: string;
}

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "destructive"
	| "link"
	| "soft"
	| "subtle";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
	variant?: ButtonVariant;
	size?: ButtonSize;
	fullWidth?: boolean;
	disabled?: boolean;
	loading?: boolean;
	iconOnly?: boolean;
	type?: "button" | "submit" | "reset";
	href?: string;
	ariaLabel?: string;
	onclick?: (e: MouseEvent) => void;
	class?: string;
	style?: string;
	children?: Snippet;
}

export type CardVariant = "surface" | "glass" | "outlined" | "ghost";

export interface CardProps {
	variant?: CardVariant;
	interactive?: boolean;
	padding?: boolean;
	href?: string;
	ariaLabel?: string;
	onclick?: (e: MouseEvent) => void;
	header?: Snippet;
	children?: Snippet;
	footer?: Snippet;
	class?: string;
}

export type InputType =
	| "text"
	| "email"
	| "password"
	| "number"
	| "tel"
	| "url"
	| "search"
	| "date"
	| "time"
	| "textarea";

export interface InputProps {
	label?: string;
	value?: string;
	placeholder?: string;
	error?: string;
	helper?: string;
	disabled?: boolean;
	required?: boolean;
	type?: InputType;
	name?: string;
	id?: string;
	prefix?: Snippet;
	suffix?: Snippet;
	class?: string;
}

export type BadgeVariant =
	| "default"
	| "primary"
	| "secondary"
	| "success"
	| "warning"
	| "destructive"
	| "info"
	| "outline";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
	variant?: BadgeVariant;
	size?: BadgeSize;
	removable?: boolean;
	onRemove?: () => void;
	icon?: Snippet;
	children?: Snippet;
}

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogProps {
	open?: boolean;
	title?: string;
	ariaLabel?: string;
	size?: DialogSize;
	closeOnOverlayClick?: boolean;
	icon?: Snippet;
	header?: Snippet;
	footer?: Snippet;
	children?: Snippet;
	actions?: Snippet;
}

export interface DataTableProps {
	columns?: Column[];
	rows?: ReadonlyArray<Record<string, unknown>>;
	currentPage?: number;
	totalPages?: number;
	onPageChange?: (page: number) => void;
	sort?: SortState | null;
	onSort?: (sort: SortState | null) => void;
	hoverable?: boolean;
	striped?: boolean;
	loading?: boolean;
	onRowClick?: (row: Record<string, unknown>, index: number) => void;
	emptyText?: string;
	selectedIndex?: number;
	rowClass?: (row: Record<string, unknown>, index: number) => string;
	t?: TFunction;
}

export interface SelectProps {
	t?: TFunction;
	value?: string;
	label?: string;
	placeholder?: string;
	options?: SelectOption[];
	disabled?: boolean;
	required?: boolean;
	error?: string;
	name?: string;
	itemSnippet?: Snippet<[{ option: SelectOption }]>;
	emptySnippet?: Snippet;
}

export interface TabsProps {
	value?: string;
	orientation?: "horizontal" | "vertical";
	class?: string;
	children?: Snippet;
}

export interface SwitchProps {
	checked?: boolean;
	disabled?: boolean;
	error?: string;
	label?: string;
	name?: string;
}

export interface TooltipProps {
	content?: string;
	contentSnippet?: Snippet;
	side?: "top" | "right" | "bottom" | "left";
	openDelay?: number;
	closeDelay?: number;
	children?: Snippet;
}

export interface CommandItem {
	id: string;
	label: string;
	keywords?: string[];
	icon?: Snippet;
}

export interface TreeViewProps {
	nodes?: Array<{
		id: string;
		label: string;
		children?: Array<{
			id: string;
			label: string;
			children?: unknown[];
			icon?: Snippet;
			disabled?: boolean;
		}>;
		icon?: Snippet;
		disabled?: boolean;
	}>;
	selectedId?: string;
	onSelect?: (id: string) => void;
	expandedIds?: string[];
	onToggle?: (id: string, expanded: boolean) => void;
	class?: string;
}

export interface CommandPaletteProps {
	items?: CommandItem[];
	placeholder?: string;
	open?: boolean;
	onSelect?: (item: CommandItem) => void;
	onClose?: () => void;
	class?: string;
}
