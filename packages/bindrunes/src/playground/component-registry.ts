// packages/bindrunes/src/playground/component-registry.ts

export interface PropDefinition {
	type: "select" | "switch" | "text" | "number" | "color";
	options?: string[];
	default: unknown;
	label?: string;
	description?: string;
}

export interface ComponentDefinition {
	name: string;
	category: string;
	description: string;
	importPath: string;
	props: Record<string, PropDefinition>;
	slot?: string;
	slotType?: "text" | "snippet";
	examples?: string[];
}

export const componentRegistry: ComponentDefinition[] = [
	// Foundation
	{
		name: "Button",
		category: "Foundation",
		description: "Button with aesthetic hooks",
		importPath: "bindrunes",
		props: {
			variant: {
				type: "select",
				options: [
					"primary",
					"secondary",
					"outline",
					"ghost",
					"destructive",
					"link",
					"soft",
					"subtle",
				],
				default: "primary",
			},
			size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
			disabled: { type: "switch", default: false },
			loading: { type: "switch", default: false },
			fullWidth: { type: "switch", default: false },
		},
		slot: "Click me",
	},
	{
		name: "Badge",
		category: "Foundation",
		description: "Status/tag badge",
		importPath: "bindrunes",
		props: {
			variant: {
				type: "select",
				options: [
					"primary",
					"secondary",
					"outline",
					"soft",
					"destructive",
					"success",
					"warning",
					"info",
				],
				default: "primary",
			},
			size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
		},
		slot: "Label",
	},
	{
		name: "Card",
		category: "Foundation",
		description: "Card container",
		importPath: "bindrunes",
		props: {
			variant: {
				type: "select",
				options: ["surface", "glass", "outlined", "ghost"],
				default: "surface",
			},
			padding: { type: "switch", default: true },
			interactive: { type: "switch", default: false },
		},
		slot: "Card content goes here.",
	},
	{
		name: "Alert",
		category: "Foundation",
		description: "Alert messages with variants",
		importPath: "bindrunes",
		props: {
			variant: {
				type: "select",
				options: ["info", "success", "warning", "destructive"],
				default: "info",
			},
			title: { type: "text", default: "Information" },
		},
		slot: "This is an informational message.",
	},
	{
		name: "Avatar",
		category: "Foundation",
		description: "User avatar",
		importPath: "bindrunes",
		props: {
			size: { type: "select", options: ["sm", "md", "lg", "xl"], default: "md" },
			name: { type: "text", default: "John Doe" },
		},
	},
	{
		name: "Separator",
		category: "Foundation",
		description: "Visual divider",
		importPath: "bindrunes",
		props: {
			orientation: { type: "select", options: ["horizontal", "vertical"], default: "horizontal" },
		},
	},
	{
		name: "Skeleton",
		category: "Foundation",
		description: "Loading skeleton",
		importPath: "bindrunes",
		props: {
			lines: { type: "number", default: 3 },
			width: { type: "text", default: "100%" },
		},
	},
	{
		name: "Progress",
		category: "Foundation",
		description: "Progress bar",
		importPath: "bindrunes",
		props: {
			value: { type: "number", default: 60 },
			max: { type: "number", default: 100 },
			showValue: { type: "switch", default: true },
		},
	},

	// Forms
	{
		name: "Input",
		category: "Forms",
		description: "Text input",
		importPath: "bindrunes",
		props: {
			placeholder: { type: "text", default: "Enter text..." },
			disabled: { type: "switch", default: false },
			required: { type: "switch", default: false },
			type: {
				type: "select",
				options: ["text", "email", "password", "number", "search", "tel", "url"],
				default: "text",
			},
		},
	},
	{
		name: "Checkbox",
		category: "Forms",
		description: "Checkbox input",
		importPath: "bindrunes",
		props: {
			disabled: { type: "switch", default: false },
			label: { type: "text", default: "Accept terms" },
		},
	},
	{
		name: "Select",
		category: "Forms",
		description: "Select dropdown",
		importPath: "bindrunes",
		props: {
			placeholder: { type: "text", default: "Select an option..." },
			disabled: { type: "switch", default: false },
		},
	},
	{
		name: "Switch",
		category: "Forms",
		description: "Toggle switch",
		importPath: "bindrunes",
		props: {
			disabled: { type: "switch", default: false },
		},
	},
	{
		name: "Slider",
		category: "Forms",
		description: "Range slider",
		importPath: "bindrunes",
		props: {
			min: { type: "number", default: 0 },
			max: { type: "number", default: 100 },
			step: { type: "number", default: 1 },
			disabled: { type: "switch", default: false },
		},
	},

	// Data Display
	{
		name: "DataTable",
		category: "Data",
		description: "Full data table with sort/filter/pagination",
		importPath: "bindrunes",
		props: {
			striped: { type: "switch", default: false },
			hoverable: { type: "switch", default: true },
		},
	},
	{
		name: "Tabs",
		category: "Data",
		description: "Tab system",
		importPath: "bindrunes",
		props: {
			defaultValue: { type: "text", default: "tab1" },
		},
	},
	{
		name: "Pagination",
		category: "Data",
		description: "Page navigation",
		importPath: "bindrunes",
		props: {
			totalPages: { type: "number", default: 10 },
			currentPage: { type: "number", default: 1 },
		},
	},

	// Overlays
	{
		name: "Dialog",
		category: "Overlays",
		description: "Modal dialog",
		importPath: "bindrunes",
		props: {
			title: { type: "text", default: "Dialog Title" },
			size: { type: "select", options: ["sm", "md", "lg", "xl", "full"], default: "md" },
		},
		slot: "Dialog content goes here.",
	},
	{
		name: "Tooltip",
		category: "Overlays",
		description: "Tooltip",
		importPath: "bindrunes",
		props: {
			side: { type: "select", options: ["top", "right", "bottom", "left"], default: "top" },
			content: { type: "text", default: "Tooltip content" },
		},
		slot: "Hover me",
	},
	{
		name: "Drawer",
		category: "Overlays",
		description: "Side drawer",
		importPath: "bindrunes",
		props: {
			side: { type: "select", options: ["left", "right", "top", "bottom"], default: "right" },
			size: { type: "select", options: ["sm", "md", "lg", "full"], default: "md" },
		},
		slot: "Drawer content goes here.",
	},

	// Feedback
	{
		name: "Spinner",
		category: "Feedback",
		description: "Loading spinner",
		importPath: "bindrunes",
		props: {
			size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
		},
	},
	{
		name: "EmptyState",
		category: "Feedback",
		description: "Empty state placeholders",
		importPath: "bindrunes",
		props: {
			title: { type: "text", default: "No items found" },
			description: { type: "text", default: "Create your first item to get started." },
		},
	},

	// Navigation
	{
		name: "Breadcrumb",
		category: "Navigation",
		description: "Breadcrumb navigation",
		importPath: "bindrunes",
		props: {},
	},
	{
		name: "Stepper",
		category: "Navigation",
		description: "Step-by-step wizard UI",
		importPath: "bindrunes",
		props: {
			currentStep: { type: "number", default: 1 },
			totalSteps: { type: "number", default: 4 },
		},
	},
];

export const categories = [...new Set(componentRegistry.map((c) => c.category))];

export function getComponentsByCategory(category: string): ComponentDefinition[] {
	return componentRegistry.filter((c) => c.category === category);
}

export function searchComponents(query: string): ComponentDefinition[] {
	const q = query.toLowerCase();
	return componentRegistry.filter(
		(c) =>
			c.name.toLowerCase().includes(q) ||
			c.description.toLowerCase().includes(q) ||
			c.category.toLowerCase().includes(q),
	);
}
