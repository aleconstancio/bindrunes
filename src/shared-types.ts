import type { Component } from "svelte";

// ── i18n ──
export type TFunction = (key: string, params?: Record<string, string | number>) => string;

// ── Select / Option ──
export interface SelectOption {
	value: string;
	label: string;
	disabled?: boolean;
}

// ── Navigation ──
export interface NavLink {
	label: string;
	href: string;
}

export interface NavItem {
	title: string;
	to: string;
	match?: string;
	description: string;
	icon: Component | string;
}

export interface NavGroup {
	label: string;
	items: NavItem[];
}

// ── Status / Semantic ──
export type StatusVariant = "success" | "warning" | "destructive" | "info";
export type SemanticVariant =
	| "success"
	| "warning"
	| "destructive"
	| "info"
	| "default"
	| "primary"
	| "secondary";

// ── Layout ──
export type ContainerSize = "prose" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

// ── Table ──
export interface Column<T = Record<string, unknown>> {
	key: keyof T & string;
	label: string;
	sortable?: boolean;
	filterable?: boolean;
	width?: number | string;
	align?: "left" | "right" | "center";
	cell?: (row: T, index: number) => import("svelte").Snippet;
}

export interface SortState {
	key: string;
	direction: "asc" | "desc";
}

export interface PaginationState {
	page: number;
	pageSize: number;
}
