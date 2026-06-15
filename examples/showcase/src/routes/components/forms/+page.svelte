<script lang="ts">
	import { PageHeader, Card, Badge, Button, Input, PasswordInput, NumberInput, TagInput, Checkbox, Switch, RadioGroup, Select, Slider, Combobox, PinInput, RatingGroup, TimeField, Toggle, ToggleGroup } from "bindrunes";
	import { Tabs, TabsList, TabsTrigger, TabsContent, Collapsible, CodeSnippet } from "bindrunes";

	let textValue = $state("");
	let passwordValue = $state("");
	let numberValue = $state(50);
	let tagValues = $state(["svelte", "tailwind"]);
	let checkValue = $state(false);
	let switchValue = $state(true);
	let radioValue = $state("option1");
	let selectValue = $state("");
	let sliderValue = $state(50);
	let comboboxValue = $state("");
	let pinValue = $state("");
	let ratingValue = $state(3);
	let timeValue = $state("");
	let toggleValue = $state(false);
	let toggleGroupValue = $state(["bold"]);

	const selectOptions = [
		{ value: "svelte", label: "Svelte" },
		{ value: "react", label: "React" },
		{ value: "vue", label: "Vue" },
		{ value: "angular", label: "Angular" },
	];

	const comboboxOptions = [
		{ value: "ts", label: "TypeScript" },
		{ value: "js", label: "JavaScript" },
		{ value: "py", label: "Python" },
		{ value: "rs", label: "Rust" },
		{ value: "go", label: "Go" },
	];

	const radioOptions = [
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	];

	let activeTab = $state("text");
</script>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
	<PageHeader title="Form Components" description="Interactive inputs, selections, and controls" />

	<Tabs bind:value={activeTab}>
		<TabsList>
			<TabsTrigger value="text">Text Inputs</TabsTrigger>
			<TabsTrigger value="selection">Selection</TabsTrigger>
			<TabsTrigger value="specialty">Specialty</TabsTrigger>
		</TabsList>

		<TabsContent value="text">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Input</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Standard text input with label and placeholder.</p>
					<Input bind:value={textValue} placeholder="Type something..." label="Name" />
					<p class="text-body-xs text-muted-foreground mt-2">Value: {textValue || "(empty)"}</p>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">PasswordInput</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Password field with show/hide toggle.</p>
					<PasswordInput bind:value={passwordValue} placeholder="Enter password" label="Password" />
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">NumberInput</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Numeric input with increment/decrement.</p>
					<NumberInput bind:value={numberValue} min={0} max={100} step={5} label="Quantity" />
					<p class="text-body-xs text-muted-foreground mt-2">Value: {numberValue}</p>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">TagInput</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Multi-value chip input with keyboard support.</p>
					<TagInput bind:value={tagValues} label="Tags" placeholder="Add tag..." />
				</Card>
			</div>
		</TabsContent>

		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { Input, PasswordInput, NumberInput, TagInput } from "bindrunes";\n\n<Input bind:value={textValue} placeholder="Type something..." label="Name" />\n<PasswordInput bind:value={passwordValue} placeholder="Enter password" label="Password" />\n<NumberInput bind:value={numberValue} min={0} max={100} step={5} label="Quantity" />\n<TagInput bind:value={tagValues} label="Tags" placeholder="Add tag..." />`}
					language="svelte"
					title="Text Inputs"
				/>
			</div>
		</Collapsible>

		<TabsContent value="selection">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Checkbox</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Toggle a boolean option.</p>
					<div class="space-y-2">
						<Checkbox bind:checked={checkValue} label="Accept terms" />
						<p class="text-body-xs text-muted-foreground">Checked: {checkValue}</p>
					</div>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Switch</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Toggle switch for on/off states.</p>
					<div class="space-y-2">
						<Switch bind:checked={switchValue} label="Enable notifications" />
						<p class="text-body-xs text-muted-foreground">Enabled: {switchValue}</p>
					</div>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">RadioGroup</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Single selection from options.</p>
					<RadioGroup bind:value={radioValue} options={radioOptions} label="Choose one" />
					<p class="text-body-xs text-muted-foreground mt-2">Selected: {radioValue}</p>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Select</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Dropdown selection.</p>
					<Select bind:value={selectValue} options={selectOptions} label="Framework" placeholder="Pick one..." />
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Combobox</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Searchable dropdown.</p>
					<Combobox bind:value={comboboxValue} options={comboboxOptions} label="Language" placeholder="Search..." />
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Slider</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Range slider input.</p>
					<Slider bind:value={sliderValue} min={0} max={100} label="Volume" />
					<p class="text-body-xs text-muted-foreground mt-2">Value: {sliderValue}%</p>
				</Card>
			</div>
		</TabsContent>

		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { Checkbox, Switch, RadioGroup, Select, Combobox, Slider } from "bindrunes";\n\n<Checkbox bind:checked={checkValue} label="Accept terms" />\n<Switch bind:checked={switchValue} label="Enable notifications" />\n<RadioGroup bind:value={radioValue} options={radioOptions} label="Choose one" />\n<Select bind:value={selectValue} options={selectOptions} label="Framework" />\n<Combobox bind:value={comboboxValue} options={comboboxOptions} label="Language" />\n<Slider bind:value={sliderValue} min={0} max={100} label="Volume" />`}
					language="svelte"
					title="Selection Components"
				/>
			</div>
		</Collapsible>

		<TabsContent value="specialty">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">PinInput</h3>
					<p class="text-body-sm text-muted-foreground mb-4">PIN/OTP code input.</p>
					<PinInput bind:value={pinValue} length={6} label="Verification code" />
					<p class="text-body-xs text-muted-foreground mt-2">Code: {pinValue || "(empty)"}</p>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">RatingGroup</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Star rating input.</p>
					<RatingGroup bind:value={ratingValue} max={5} label="Rating" />
					<p class="text-body-xs text-muted-foreground mt-2">Rating: {ratingValue}/5</p>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">TimeField</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Time input field.</p>
					<TimeField bind:value={timeValue} label="Meeting time" placeholder="HH:MM" />
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">Toggle</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Toggle button for on/off.</p>
					<div class="space-y-2">
						<Toggle bind:pressed={toggleValue} label="Bold" />
						<p class="text-body-xs text-muted-foreground">Pressed: {toggleValue}</p>
					</div>
				</Card>

				<Card padding>
					<h3 class="text-title-3 text-foreground mb-3">ToggleGroup</h3>
					<p class="text-body-sm text-muted-foreground mb-4">Multi-toggle group.</p>
					<ToggleGroup bind:value={toggleGroupValue} type="multiple" options={[
						{ value: "bold", label: "B" },
						{ value: "italic", label: "I" },
						{ value: "underline", label: "U" },
					]} label="Formatting" />
					<p class="text-body-xs text-muted-foreground mt-2">Active: {toggleGroupValue.join(", ") || "none"}</p>
				</Card>
			</div>
		</TabsContent>

		<Collapsible>
			{#snippet trigger()}
				<button class="text-label-sm text-primary hover:underline cursor-pointer">Show Code</button>
			{/snippet}
			<div class="space-y-2 mt-2">
				<CodeSnippet
					code={`import { PinInput, RatingGroup, TimeField, Toggle, ToggleGroup } from "bindrunes";\n\n<PinInput bind:value={pinValue} length={6} label="Verification code" />\n<RatingGroup bind:value={ratingValue} max={5} label="Rating" />\n<TimeField bind:value={timeValue} label="Meeting time" placeholder="HH:MM" />\n<Toggle bind:pressed={toggleValue} label="Bold" />\n<ToggleGroup bind:value={toggleGroupValue} type="multiple" options={toggleOptions} label="Formatting" />`}
					language="svelte"
					title="Specialty Components"
				/>
			</div>
		</Collapsible>
	</Tabs>
</div>
