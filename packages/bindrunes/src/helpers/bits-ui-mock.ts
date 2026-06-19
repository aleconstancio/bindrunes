const PRIMITIVES = [
	"Accordion",
	"AlertDialog",
	"Avatar",
	"Checkbox",
	"Collapsible",
	"Combobox",
	"DatePicker",
	"Dialog",
	"DropdownMenu",
	"FormField",
	"HoverCard",
	"Input",
	"Label",
	"Menubar",
	"NavigationMenu",
	"PinInput",
	"Popover",
	"Progress",
	"RadioGroup",
	"RangeCalendar",
	"RatingGroup",
	"ScrollArea",
	"Select",
	"Separator",
	"Sheet",
	"Slider",
	"Switch",
	"Tabs",
	"TimeField",
	"Toggle",
	"ToggleGroup",
	"Toolbar",
	"Tooltip",
] as const;

type PrimitiveName = (typeof PRIMITIVES)[number];

function makeShell(name: PrimitiveName) {
	return ((_$$anchor: unknown, $$props: Record<string, unknown> = {}) => {
		const {
			class: cls = "",
			children,
			open,
			value,
			...rest
		} = $$props as {
			class?: string;
			children?: unknown;
			open?: boolean;
			value?: unknown;
		};
		const stateAttrs: Record<string, string> = {};
		if (open !== undefined) stateAttrs["data-state"] = open ? "open" : "closed";
		if (value !== undefined) stateAttrs["data-value"] = String(value);
		return {
			render(): HTMLElement {
				const el = document.createElement("div");
				el.setAttribute("data-testid", `bits-${name.toLowerCase()}`);
				if (cls) el.className = cls;
				for (const [k, v] of Object.entries(stateAttrs)) el.setAttribute(k, v);
				for (const [k, v] of Object.entries(rest)) {
					if (typeof v === "string") el.setAttribute(k, v);
				}
				return el;
			},
		};
	}) as unknown as Parameters<typeof import("vitest").vi.fn>[0];
}

export function mockBitsUi() {
	const out: Record<string, unknown> = {};
	for (const p of PRIMITIVES) out[p] = makeShell(p);
	return out;
}
