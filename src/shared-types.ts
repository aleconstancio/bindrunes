import type { ComponentType } from 'svelte';

// ── i18n ──
export type TFunction = (key: string, params?: Record<string, string | number>) => string;

// ── Navigation ──
export interface NavItem {
  title: string;
  to: string;
  match?: string;
  description: string;
  icon: ComponentType | string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

// ── Status ──
export type StatusVariant = 'success' | 'warning' | 'danger' | 'info';

// ── Table ──
export interface Column<T = Record<string, unknown>> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: number | string;
  align?: 'left' | 'right' | 'center';
  cell?: (row: T, index: number) => import('svelte').Snippet;
}

export interface SortState {
  key: string;
  direction: 'asc' | 'desc';
}

export interface PaginationState {
  page: number;
  pageSize: number;
}
