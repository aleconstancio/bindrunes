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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
		props: {
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
			name: { type: "text", default: "John Doe", label: "Name" },
		},
	},
	{
		name: "Separator",
		category: "Foundation",
		description: "Visual divider",
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
		props: {
			lines: { type: "number", default: 3, label: "Lines" },
			width: { type: "text", default: "100%", label: "Width" },
		},
	},
	{
		name: "Progress",
		category: "Foundation",
		description: "Progress bar",
		importPath: "urupe-ui",
		props: {
			value: { type: "number", default: 60, label: "Value" },
			max: { type: "number", default: 100, label: "Max" },
			showValue: { type: "switch", default: true, label: "Show value" },
		},
	},
	{
		name: "Accordion",
		category: "Foundation",
		description: "Collapsible accordion container",
		importPath: "urupe-ui",
		props: {
			multiple: { type: "switch", default: false, label: "Allow multiple" },
		},
		slot: "Accordion content",
	},
	{
		name: "AccordionItem",
		category: "Foundation",
		description: "Single accordion section",
		importPath: "urupe-ui",
		props: {
			value: { type: "text", default: "item1", label: "Value" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
		slot: "Accordion item content",
	},
	{
		name: "AlertDialog",
		category: "Foundation",
		description: "Confirmation alert dialog",
		importPath: "urupe-ui",
		props: {
			title: { type: "text", default: "Are you sure?", label: "Title" },
			description: { type: "text", default: "This action cannot be undone.", label: "Description" },
			confirmLabel: { type: "text", default: "Confirm", label: "Confirm label" },
			cancelLabel: { type: "text", default: "Cancel", label: "Cancel label" },
			destructive: { type: "switch", default: false, label: "Destructive" },
		},
		slot: "Alert dialog content",
	},
	{
		name: "CodeSnippet",
		category: "Foundation",
		description: "Code block with copy button",
		importPath: "urupe-ui",
		props: {
			code: { type: "text", default: "const x = 42;", label: "Code" },
			language: { type: "text", default: "javascript", label: "Language" },
			title: { type: "text", default: "", label: "Title" },
		},
	},
	{
		name: "Collapsible",
		category: "Foundation",
		description: "Collapsible content section",
		importPath: "urupe-ui",
		props: {
			open: { type: "switch", default: false, label: "Open" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
		slot: "Collapsible content",
	},
	{
		name: "ColorPicker",
		category: "Foundation",
		description: "OKLCH color picker",
		importPath: "urupe-ui",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Combobox",
		category: "Foundation",
		description: "Searchable combobox input",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Search...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "CommandPalette",
		category: "Foundation",
		description: "Command palette overlay",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Search...", label: "Placeholder" },
		},
	},
	{
		name: "ContextMenu",
		category: "Foundation",
		description: "Right-click context menu",
		importPath: "urupe-ui",
		props: {},
		slot: "Right-click me",
	},
	{
		name: "DatePicker",
		category: "Foundation",
		description: "Date picker input",
		importPath: "urupe-ui",
		props: {
			label: { type: "text", default: "Pick a date", label: "Label" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "DropdownMenu",
		category: "Foundation",
		description: "Dropdown action menu",
		importPath: "urupe-ui",
		props: {
			side: {
				type: "select",
				options: ["top", "right", "bottom", "left"],
				default: "bottom",
				label: "Side",
			},
			align: {
				type: "select",
				options: ["start", "center", "end"],
				default: "start",
				label: "Align",
			},
		},
		slot: "Open menu",
	},
	{
		name: "Kbd",
		category: "Foundation",
		description: "Keyboard shortcut indicator",
		importPath: "urupe-ui",
		props: {},
		slot: "Ctrl+K",
	},
	{
		name: "Label",
		category: "Foundation",
		description: "Form field label",
		importPath: "urupe-ui",
		props: {},
		slot: "Field Label",
	},
	{
		name: "MetricCard",
		category: "Foundation",
		description: "Metric display card",
		importPath: "urupe-ui",
		props: {
			label: { type: "text", default: "Revenue", label: "Label" },
			value: { type: "text", default: "$12,345", label: "Value" },
			detail: { type: "text", default: "+12% from last month", label: "Detail" },
			variant: {
				type: "select",
				options: ["default", "success", "warning", "destructive"],
				default: "default",
				label: "Variant",
			},
		},
	},
	{
		name: "NumberInput",
		category: "Foundation",
		description: "Numeric stepper input",
		importPath: "urupe-ui",
		props: {
			min: { type: "number", default: 0, label: "Min" },
			max: { type: "number", default: 100, label: "Max" },
			step: { type: "number", default: 1, label: "Step" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
			label: { type: "text", default: "Quantity", label: "Label" },
		},
	},
	{
		name: "OTPInput",
		category: "Foundation",
		description: "One-time password input",
		importPath: "urupe-ui",
		props: {
			length: { type: "number", default: 6, label: "Length" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "PasswordInput",
		category: "Foundation",
		description: "Password field with toggle",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Enter password...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			required: { type: "switch", default: false, label: "Required" },
		},
	},
	{
		name: "PinInput",
		category: "Foundation",
		description: "PIN code entry",
		importPath: "urupe-ui",
		props: {
			length: { type: "number", default: 4, label: "Length" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			type: {
				type: "select",
				options: ["text", "password"],
				default: "text",
				label: "Type",
			},
		},
	},
	{
		name: "Popconfirm",
		category: "Foundation",
		description: "Confirmation popover",
		importPath: "urupe-ui",
		props: {
			title: { type: "text", default: "Are you sure?", label: "Title" },
			confirmLabel: { type: "text", default: "Confirm", label: "Confirm label" },
			cancelLabel: { type: "text", default: "Cancel", label: "Cancel label" },
			destructive: { type: "switch", default: false, label: "Destructive" },
		},
		slot: "Delete item",
	},
	{
		name: "Popover",
		category: "Foundation",
		description: "Floating popover panel",
		importPath: "urupe-ui",
		props: {
			side: {
				type: "select",
				options: ["top", "right", "bottom", "left"],
				default: "bottom",
				label: "Side",
			},
			align: {
				type: "select",
				options: ["start", "center", "end"],
				default: "center",
				label: "Align",
			},
		},
		slot: "Open popover",
	},
	{
		name: "RadioGroup",
		category: "Foundation",
		description: "Radio button group",
		importPath: "urupe-ui",
		props: {
			label: { type: "text", default: "Choose one", label: "Label" },
		},
	},
	{
		name: "RangeCalendar",
		category: "Foundation",
		description: "Date range calendar picker",
		importPath: "urupe-ui",
		props: {},
	},
	{
		name: "RatingGroup",
		category: "Foundation",
		description: "Star rating input",
		importPath: "urupe-ui",
		props: {
			max: { type: "number", default: 5, label: "Max stars" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "RichTextEditor",
		category: "Foundation",
		description: "Markdown rich text editor",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Write something...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "ScrollArea",
		category: "Foundation",
		description: "Custom scrollbar container",
		importPath: "urupe-ui",
		props: {},
		slot: "Scrollable content area with overflow",
	},
	{
		name: "Sheet",
		category: "Foundation",
		description: "Side sheet panel",
		importPath: "urupe-ui",
		props: {
			side: {
				type: "select",
				options: ["left", "right", "top", "bottom"],
				default: "right",
				label: "Side",
			},
			size: {
				type: "select",
				options: ["sm", "md", "lg"],
				default: "md",
				label: "Size",
			},
			title: { type: "text", default: "Sheet Title", label: "Title" },
		},
		slot: "Sheet content goes here.",
	},
	{
		name: "StatusChip",
		category: "Foundation",
		description: "Status indicator chip",
		importPath: "urupe-ui",
		props: {
			variant: {
				type: "select",
				options: ["success", "warning", "destructive", "info", "neutral"],
				default: "info",
				label: "Variant",
			},
			label: { type: "text", default: "Active", label: "Label" },
			dot: { type: "switch", default: true, label: "Show dot" },
			animate: { type: "switch", default: false, label: "Animate" },
		},
	},
	{
		name: "SwipeableList",
		category: "Foundation",
		description: "Swipeable list container",
		importPath: "urupe-ui",
		props: {},
		slot: "Swipeable list content",
	},
	{
		name: "TagInput",
		category: "Foundation",
		description: "Tag/chip input field",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Add tag...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
			maxTags: { type: "number", default: 10, label: "Max tags" },
			label: { type: "text", default: "Tags", label: "Label" },
		},
	},
	{
		name: "TimeField",
		category: "Foundation",
		description: "Time input field",
		importPath: "urupe-ui",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Timeline",
		category: "Foundation",
		description: "Vertical timeline display",
		importPath: "urupe-ui",
		props: {},
	},
	{
		name: "Toggle",
		category: "Foundation",
		description: "Toggle button",
		importPath: "urupe-ui",
		props: {
			pressed: { type: "switch", default: false, label: "Pressed" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
		slot: "Toggle",
	},
	{
		name: "ToggleGroup",
		category: "Foundation",
		description: "Group of toggle buttons",
		importPath: "urupe-ui",
		props: {
			multiple: { type: "switch", default: false, label: "Allow multiple" },
		},
	},
	{
		name: "TreeView",
		category: "Foundation",
		description: "Hierarchical tree view",
		importPath: "urupe-ui",
		props: {},
	},
	{
		name: "NavigationMenu",
		category: "Foundation",
		description: "Navigation menu bar",
		importPath: "urupe-ui",
		props: {},
	},
	{
		name: "FileUpload",
		category: "Foundation",
		description: "File upload dropzone",
		importPath: "urupe-ui",
		props: {
			multiple: { type: "switch", default: true, label: "Multiple files" },
			maxFiles: { type: "number", default: 10, label: "Max files" },
		},
	},
	{
		name: "BouncingDots",
		category: "Foundation",
		description: "Animated loading dots",
		importPath: "urupe-ui",
		props: {},
	},
	{
		name: "RuleFootnote",
		category: "Foundation",
		description: "Rule footnote callout",
		importPath: "urupe-ui",
		props: {
			title: { type: "text", default: "Critical Rule", label: "Title" },
			description: { type: "text", default: "This rule must be followed.", label: "Description" },
		},
		slot: "Additional footnote content",
	},
	{
		name: "ErrorBanner",
		category: "Foundation",
		description: "Error message banner",
		importPath: "urupe-ui",
		props: {
			error: { type: "text", default: "Something went wrong.", label: "Error" },
		},
	},
	{
		name: "SuccessBanner",
		category: "Foundation",
		description: "Success message banner",
		importPath: "urupe-ui",
		props: {},
		slot: "Operation completed successfully!",
	},

	// Forms
	{
		name: "Input",
		category: "Forms",
		description: "Text input",
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
			label: { type: "text", default: "Accept terms", label: "Label" },
		},
	},
	{
		name: "Select",
		category: "Forms",
		description: "Select dropdown",
		importPath: "urupe-ui",
		props: {
			placeholder: { type: "text", default: "Select an option...", label: "Placeholder" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Switch",
		category: "Forms",
		description: "Toggle switch",
		importPath: "urupe-ui",
		props: {
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},
	{
		name: "Slider",
		category: "Forms",
		description: "Range slider",
		importPath: "urupe-ui",
		props: {
			min: { type: "number", default: 0, label: "Min" },
			max: { type: "number", default: 100, label: "Max" },
			step: { type: "number", default: 1, label: "Step" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
	},

	// Data
	{
		name: "Tabs",
		category: "Data",
		description: "Tab system",
		importPath: "urupe-ui",
		props: {
			value: { type: "text", default: "tab1", label: "Active tab" },
		},
	},
	{
		name: "TabsList",
		category: "Data",
		description: "Tab list container",
		importPath: "urupe-ui",
		props: {},
		slot: "Tab triggers",
	},
	{
		name: "TabsTrigger",
		category: "Data",
		description: "Individual tab trigger",
		importPath: "urupe-ui",
		props: {
			value: { type: "text", default: "tab1", label: "Value" },
			disabled: { type: "switch", default: false, label: "Disabled" },
		},
		slot: "Tab",
	},
	{
		name: "TabsContent",
		category: "Data",
		description: "Tab content panel",
		importPath: "urupe-ui",
		props: {
			value: { type: "text", default: "tab1", label: "Value" },
		},
		slot: "Tab content goes here.",
	},
	{
		name: "Pagination",
		category: "Data",
		description: "Page navigation",
		importPath: "urupe-ui",
		props: {
			totalPages: { type: "number", default: 10, label: "Total pages" },
			currentPage: { type: "number", default: 1, label: "Current page" },
		},
	},
	{
		name: "DataGrid",
		category: "Data",
		description: "Data grid table",
		importPath: "urupe-ui",
		props: {
			selectable: { type: "switch", default: false, label: "Selectable rows" },
			emptyText: { type: "text", default: "No data available", label: "Empty text" },
		},
	},

	// Overlays
	{
		name: "Dialog",
		category: "Overlays",
		description: "Modal dialog",
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
		props: {
			size: { type: "select", options: ["sm", "md", "lg"], default: "md", label: "Size" },
		},
	},
	{
		name: "EmptyState",
		category: "Feedback",
		description: "Empty state placeholders",
		importPath: "urupe-ui",
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
		importPath: "urupe-ui",
		props: {
			separator: { type: "text", default: "/", label: "Separator" },
		},
	},
	{
		name: "Stepper",
		category: "Navigation",
		description: "Step-by-step wizard UI",
		importPath: "urupe-ui",
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
