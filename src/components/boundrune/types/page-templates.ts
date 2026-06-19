import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../../shared-types";

export interface DashboardPageProps {
	appName?: string;
	appSubtitle?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	onNavigate?: (to: string) => void;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebarHeader?: Snippet;
	sidebarFooter?: Snippet;
	headerActions?: Snippet;
	statusChip?: {
		variant?: StatusVariant;
		label?: string;
		dot?: boolean;
		animate?: boolean;
	};
	resolvedTitle?: string;
	resolvedDescription?: string;
	class?: string;
	children?: Snippet;
}

export interface CrudPageProps {
	title?: string;
	appName?: string;
	appSubtitle?: string;
	brandIcon?: string | Component;
	navigation?: NavGroup[];
	pathname?: string;
	onNavigate?: (to: string) => void;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebarHeader?: Snippet;
	sidebarFooter?: Snippet;
	headerActions?: Snippet;
	statusChip?: {
		variant?: StatusVariant;
		label?: string;
		dot?: boolean;
		animate?: boolean;
	};
	selectedItem?: Record<string, unknown>;
	emptyTitle?: string;
	emptyDescription?: string;
	class?: string;
	listPanel?: Snippet;
	detailPanel?: Snippet;
	children?: Snippet;
}
