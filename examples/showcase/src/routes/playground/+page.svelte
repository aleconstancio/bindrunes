<script lang="ts">
	import { PageHeader, Card, Select, Switch, Button, Badge, Input, Alert, StatusChip, CodeSnippet } from "bindrunes";

	interface PropDef {
		type: "select" | "switch" | "text";
		options?: string[];
		default: string | boolean;
	}

	interface ComponentDef {
		name: string;
		props: Record<string, PropDef>;
	}

	const components: ComponentDef[] = [
		{
			name: "Button",
			props: {
				variant: { type: "select", options: ["primary", "secondary", "outline", "ghost", "destructive", "link", "soft", "subtle"], default: "primary" },
				size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
				disabled: { type: "switch", default: false },
				loading: { type: "switch", default: false },
			},
		},
		{
			name: "Badge",
			props: {
				variant: { type: "select", options: ["default", "primary", "secondary", "success", "warning", "destructive", "info", "outline"], default: "default" },
				size: { type: "select", options: ["sm", "md", "lg"], default: "md" },
			},
		},
		{
			name: "Card",
			props: {
				variant: { type: "select", options: ["surface", "glass", "outlined", "ghost"], default: "surface" },
				padding: { type: "switch", default: true },
				interactive: { type: "switch", default: false },
			},
		},
		{
			name: "Input",
			props: {
				placeholder: { type: "text", default: "Type something..." },
				disabled: { type: "switch", default: false },
				required: { type: "switch", default: false },
			},
		},
		{
			name: "Alert",
			props: {
				variant: { type: "select", options: ["info", "success", "warning", "destructive"], default: "info" },
				title: { type: "text", default: "Alert title" },
				closable: { type: "switch", default: false },
			},
		},
		{
			name: "StatusChip",
			props: {
				variant: { type: "select", options: ["success", "warning", "destructive", "info", "neutral"], default: "info" },
				label: { type: "text", default: "Status" },
				dot: { type: "switch", default: true },
				animate: { type: "switch", default: false },
			},
		},
	];

	const selectOptions = components.map((c) => ({ value: c.name, label: c.name }));

	let selectedName = $state("Button");
	let propValues: Record<string, Record<string, string | boolean>> = $state({});

	function getComponentDef(name: string): ComponentDef {
		return components.find((c) => c.name === name)!;
	}

	function getProps(name: string): Record<string, string | boolean> {
		if (!propValues[name]) {
			const def = getComponentDef(name);
			propValues[name] = {};
			for (const [key, prop] of Object.entries(def.props)) {
				propValues[name][key] = prop.default;
			}
		}
		return propValues[name];
	}

	function setProp(name: string, key: string, value: string | boolean) {
		if (!propValues[name]) {
			getProps(name);
		}
		propValues[name][key] = value;
	}

	function buildCode(name: string, props: Record<string, string | boolean>): string {
		const attrParts: string[] = [];
		for (const [key, value] of Object.entries(props)) {
			const def = getComponentDef(name).props[key];
			if (def.type === "switch") {
				if (value) attrParts.push(`${key}`);
			} else if (def.type === "text") {
				if (value) attrParts.push(`${key}="${value}"`);
			} else {
				attrParts.push(`${key}="${value}"`);
			}
		}
		const attrs = attrParts.length > 0 ? " " + attrParts.join(" ") : "";
		const content = name === "Input" ? "" : name === "Alert" ? "" : name === "StatusChip" ? "" : `>Content`;
		if (name === "Input") return `<Input${attrs} />`;
		if (name === "Alert") return `<Alert${attrs} />`;
		if (name === "StatusChip") return `<StatusChip${attrs} />`;
		return `<${name}${attrs}${content}</${name}>`;
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader
		title="Playground"
		description="Select a component, tweak its props, and see the result live with generated code"
	/>

	<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
		<!-- Controls Panel -->
		<div class="space-y-6">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Component</h3>
				<Select
					bind:value={selectedName}
					options={selectOptions}
					label="Select component"
					name="component-select"
				/>
			</Card>

			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Props</h3>
				<div class="space-y-4">
					{#each Object.entries(getComponentDef(selectedName).props) as [key, def]}
						{@const currentProps = getProps(selectedName)}
						{#if def.type === "select" && def.options}
							<Select
								value={currentProps[key] as string}
								options={def.options.map((o) => ({ value: o, label: o }))}
								label={key}
								name={key}
								onchange={(e) => setProp(selectedName, key, (e.target as HTMLSelectElement).value)}
							/>
						{:else if def.type === "switch"}
							<Switch
								checked={currentProps[key] as boolean}
								label={key}
								name={key}
								onchange={(e) => setProp(selectedName, key, (e.target as HTMLInputElement).checked)}
							/>
						{:else if def.type === "text"}
							<div>
								<label class="block text-label-md mb-2 text-muted-foreground" for={key}>{key}</label>
								<input
									id={key}
									type="text"
									value={currentProps[key] as string}
									oninput={(e) => setProp(selectedName, key, (e.target as HTMLInputElement).value)}
									class="w-full rounded-[--radius] border border-border bg-input px-3 py-2 text-body-md text-foreground placeholder:text-muted-foreground transition-colors duration-[--duration-snappy] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background"
								/>
							</div>
						{/if}
					{/each}
				</div>
			</Card>
		</div>

		<!-- Preview & Code -->
		<div class="lg:col-span-2 space-y-6">
			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Preview</h3>
				<div class="flex items-center justify-center min-h-[120px] rounded-[--radius-md] border border-dashed border-border bg-muted/30 p-8">
					{#if selectedName === "Button"}
						{@const p = getProps("Button")}
						<Button
							variant={p.variant as any}
							size={p.size as any}
							disabled={p.disabled as boolean}
							loading={p.loading as boolean}
						>
							Click me
						</Button>
					{:else if selectedName === "Badge"}
						{@const p = getProps("Badge")}
						<Badge
							variant={p.variant as any}
							size={p.size as any}
						>
							Label
						</Badge>
					{:else if selectedName === "Card"}
						{@const p = getProps("Card")}
						<Card
							variant={p.variant as any}
							padding={p.padding as boolean}
							interactive={p.interactive as boolean}
						>
							Card content
						</Card>
					{:else if selectedName === "Input"}
						{@const p = getProps("Input")}
						<div class="w-full max-w-xs">
							<Input
								placeholder={p.placeholder as string}
								disabled={p.disabled as boolean}
								required={p.required as boolean}
								label="Field"
							/>
						</div>
					{:else if selectedName === "Alert"}
						{@const p = getProps("Alert")}
						<div class="w-full">
							<Alert
								variant={p.variant as any}
								title={p.title as string}
								closable={p.closable as boolean}
							/>
						</div>
					{:else if selectedName === "StatusChip"}
						{@const p = getProps("StatusChip")}
						<StatusChip
							variant={p.variant as any}
							label={p.label as string}
							dot={p.dot as boolean}
							animate={p.animate as boolean}
						/>
					{/if}
				</div>
			</Card>

			<Card padding>
				<h3 class="text-title-3 text-foreground mb-4">Generated Code</h3>
				<CodeSnippet
					code={buildCode(selectedName, getProps(selectedName))}
					language="svelte"
					title="App.svelte"
				/>
			</Card>
		</div>
	</div>
</div>
