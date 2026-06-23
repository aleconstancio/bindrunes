// ── CRUD ──

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

// ── Marketing ──

export interface TestimonialItem {
	quote: string;
	author: string;
	role?: string;
	avatar?: string;
}

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
