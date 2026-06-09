import type { Component } from "svelte";

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
