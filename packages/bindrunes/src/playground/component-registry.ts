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
				label: "Variant",
			},
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			loading: { type: "switch", default: false, label: "Loading" },
			fullWidth: { type: "switch", default: false, label: "Full width" },
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
					"default",
					"primary",
					"secondary",
					"success",
					"warning",
					"destructive",
					"info",
					"outline",
				],
				default: "default",
				label: "Variant",
			},
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
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
				options: ["surface", "glass", "tinted", "outlined", "ghost"],
				default: "surface",
				label: "Variant",
			},
			padding: { type: "switch", default: true, label: "Inner padding" },
			interactive: { type: "switch", default: false, label: "Interactive" },
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
				label: "Variant",
			},
			title: { type: "text", default: "Information", label: "Title" },
		},
		slot: "This is an informational message.",
	},
	{
		name: "Avatar",
		category: "Foundation",
		description: "User avatar",
		importPath: "bindrunes",
		props: {
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
			name: { type: "text", default: "John Doe", label: "Name" },
		},
	},
	{
		name: "Separator",
		category: "Foundation",
		description: "Visual divider",
		importPath: "bindrunes",
		props: {
			orientation: {
				type: "select",
				options: ["horizontal", "vertical"],
				default: "horizontal",
				label: "Orientation",
			},
		},
	},
	{
		name: "Skeleton",
		category: "Foundation",
		description: "Loading skeleton",
		importPath: "bindrunes",
		props: {
			lines: { type: "number", default: 3, label: "Lines" },
			width: { type: "text", default: "100%", label: "Width" },
		},
	},
	{
		name: "Progress",
		category: "Foundation",
		description: "Progress bar",
		importPath: "bindrunes",
		props: {
			value: { type: "number", default: 60, label: "Value" },
			max: { type: "number", default: 100, label: "Max" },
			showValue: { type: "switch", default: true, label: "Show value" },
		},
	},

	// Forms
	{
		name: "Input",
		category: "Forms",
		description: "Text input",
		importPath: "bindrunes",
		props: {
			placeholder: { type: "text", default: "Enter text...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			required: { type: "switch", default: false, label: "Required" },
			type: {
				type: "select",
				options: [
					"text",
					"email",
					"password",
					"number",
					"search",
					"tel",
					"url",
					"date",
					"time",
					"textarea",
				],
				default: "text",
				label: "Type",
			},
		},
	},
	{
		name: "Checkbox",
		category: "Forms",
		description: "Checkbox input",
		importPath: "bindrunes",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
			label: { type: "text", default: "Accept terms", label: "Label" },
		},
	},
	{
		name: "Select",
		category: "Forms",
		description: "Select dropdown",
		importPath: "bindrunes",
		props: {
			placeholder: { type: "text", default: "Select an option...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Switch",
		category: "Forms",
		description: "Toggle switch",
		importPath: "bindrunes",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Slider",
		category: "Forms",
		description: "Range slider",
		importPath: "bindrunes",
		props: {
			min: { type: "number", default: 0, label: "Min" },
			max: { type: "number", default: 100, label: "Max" },
			step: { type: "number", default: 1, label: "Step" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},

	// Data Display
	{
		name: "Tabs",
		category: "Data",
		description: "Tab system",
		importPath: "bindrunes",
		props: {
			value: { type: "text", default: "tab1", label: "Active tab" },
		},
	},
	{
		name: "Pagination",
		category: "Data",
		description: "Page navigation",
		importPath: "bindrunes",
		props: {
			totalPages: { type: "number", default: 10, label: "Total pages" },
			currentPage: { type: "number", default: 1, label: "Current page" },
		},
	},

	// Overlays
	{
		name: "Dialog",
		category: "Overlays",
		description: "Modal dialog",
		importPath: "bindrunes",
		props: {
			title: { type: "text", default: "Dialog Title", label: "Title" },
			size: {
				type: "select",
				options: ["sm", "md", "lg", "xl", "full"],
				default: "md",
				label: "Size",
			},
		},
		slot: "Dialog content goes here.",
	},
	{
		name: "Tooltip",
		category: "Overlays",
		description: "Tooltip",
		importPath: "bindrunes",
		props: {
			side: {
				type: "select",
				options: ["top", "right", "bottom", "left"],
				default: "top",
				label: "Side",
			},
			content: { type: "text", default: "Tooltip content", label: "Content" },
		},
		slot: "Hover me",
	},
	{
		name: "Drawer",
		category: "Overlays",
		description: "Side drawer",
		importPath: "bindrunes",
		props: {
			side: {
				type: "select",
				options: ["left", "right", "top", "bottom"],
				default: "right",
				label: "Side",
			},
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
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
		},
	},
	{
		name: "EmptyState",
		category: "Feedback",
		description: "Empty state placeholders",
		importPath: "bindrunes",
		props: {
			title: { type: "text", default: "No items found", label: "Title" },
			description: {
				type: "text",
				default: "Create your first item to get started.",
				label: "Description",
			},
		},
	},

	// Navigation
	{
		name: "Breadcrumb",
		category: "Navigation",
		description: "Breadcrumb navigation",
		importPath: "bindrunes",
		props: {
			separator: { type: "text", default: "/", label: "Separator" },
		},
	},
	{
		name: "Stepper",
		category: "Navigation",
		description: "Step-by-step wizard UI",
		importPath: "bindrunes",
		props: {
			currentStep: { type: "text", default: "step1", label: "Current step ID" },
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
