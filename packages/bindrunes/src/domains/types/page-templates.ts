import type { Component, Snippet } from "svelte";
import type { NavGroup, StatusVariant } from "../../shared-types";
import type { AuthView } from "./auth";

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

export interface AuthPageProps {
	view?: AuthView;
	brandImage?: string;
	brandTitle?: string;
	brandDescription?: string;
	onLoginSubmit?: (data: { email: string; password: string }) => void | Promise<void>;
	onForgotPassword?: () => void;
	onRegister?: () => void;
	onRegisterSubmit?: (data: {
		name: string;
		email: string;
		password: string;
	}) => void | Promise<void>;
	onLogin?: () => void;
	onForgotSubmit?: (email: string) => void | Promise<void>;
	onResetSubmit?: (data: { password: string }) => void | Promise<void>;
	onTwoFactorSubmit?: (code: string) => void | Promise<void>;
	onUseBackup?: () => void;
	verifyEmail?: string;
	onResendEmail?: () => void;
	socialLogin?: {
		onGoogle?: () => void;
		onGitHub?: () => void;
		onApple?: () => void;
		providers?: ("google" | "github" | "apple")[];
	};
	loading?: boolean;
	error?: string;
	header?: Snippet;
	beforeFields?: Snippet;
	afterFields?: Snippet;
	footer?: Snippet;
	children?: Snippet;
}

export interface SettingsPageProps {
	title?: string;
	activeTab?: string;
	tabs?: { id: string; label: string; icon?: Component | string }[];
	class?: string;
	header?: Snippet;
	footer?: Snippet;
	tabContent?: Snippet<[string]>;
	children?: Snippet;
}

export interface ChatPageProps {
	title?: string;
	class?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	conversationList?: Snippet;
	chatHeader?: Snippet;
	children?: Snippet;
}

export interface CalendarPageProps {
	title?: string;
	class?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
}

export interface EcommercePageProps {
	title?: string;
	class?: string;
	cartCollapsible?: "icon" | "full" | "none";
	cartSnippet?: Snippet;
	header?: Snippet;
	children?: Snippet;
}

export interface BlogPageProps {
	title?: string;
	class?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
}

export interface PortfolioPageProps {
	title?: string;
	description?: string;
	class?: string;
	header?: Snippet;
	children?: Snippet;
}

export interface MediaPageProps {
	title?: string;
	class?: string;
	sidebarCollapsible?: "icon" | "full" | "none";
	sidebar?: Snippet;
	header?: Snippet;
	children?: Snippet;
}
