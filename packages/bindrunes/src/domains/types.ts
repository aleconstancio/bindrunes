import type { Component } from "svelte";

// ── CRUD ──

export interface CrudAction {
	label: string;
	href: string;
	variant?: "primary" | "outline" | "destructive";
	icon?: Component | string;
}

export interface CrudConfig {
	title: string;
	description?: string;
	submitLabel?: string;
	fields: CrudField[];
}

export interface CrudField {
	name: string;
	label: string;
	type: "text" | "email" | "password" | "number" | "textarea" | "select" | "switch" | "date";
	placeholder?: string;
	required?: boolean;
	options?: { label: string; value: string }[];
}

export interface DetailSection {
	label: string;
	value: string;
	variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

export interface TableColumnConfig {
	key: string;
	label: string;
	sortable?: boolean;
	align?: "left" | "center" | "right";
	width?: string;
}

export interface SearchFilter {
	key: string;
	label: string;
	options: { label: string; value: string }[];
}

// ── Marketing ──

/** @deprecated Use Testimonial from bindrunes/landing instead */
export interface TestimonialItem {
	quote: string;
	author: string;
	role?: string;
	avatar?: string;
}

/** @deprecated Use Logo from bindrunes/landing instead */
export interface LogoItem {
	name: string;
	url?: string;
}

export interface PortfolioItem {
	title: string;
	description: string;
	image?: string;
	tags?: string[];
	href?: string;
}

export interface CommentItem {
	author: string;
	avatar?: string;
	content: string;
	date?: string;
}

export interface ScheduleItem {
	time: string;
	title: string;
	description: string;
}

export interface ContentItem {
	title: string;
	description: string;
	image?: string;
	imageSide?: "left" | "right";
}
