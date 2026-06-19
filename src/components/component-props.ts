import type { Snippet } from "svelte";

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
