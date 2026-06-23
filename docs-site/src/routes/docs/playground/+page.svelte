<script lang="ts">
import { Alert, Badge, Button, Card, CodeSnippet, Dialog, Input, Switch } from "bindrunes";

let selectedComponent = $state("button");

// Button props
let buttonVariant = $state("primary");
let buttonSize = $state("md");
let buttonDisabled = $state(false);
let buttonText = $state("Click me");

// Badge props
let badgeVariant = $state("primary");
let badgeSize = $state("md");
let badgeText = $state("Badge");

// Card props
let cardVariant = $state("surface");
let cardPadding = $state(true);
let cardInteractive = $state(false);
let cardText = $state("Card content goes here.");

// Input props
let inputPlaceholder = $state("Enter text...");
let inputDisabled = $state(false);
let inputError = $state("");

// Alert props
let alertVariant = $state("info");
let alertTitle = $state("Alert");
let alertDescription = $state("This is an alert message.");

// Dialog props
let dialogOpen = $state(false);
let dialogSize = $state("md");
let dialogTitle = $state("Dialog Title");

const codeSnippets: Record<string, string> = $derived({
	button: `<Button variant="${buttonVariant}" size="${buttonSize}"${buttonDisabled ? " disabled" : ""}>
  ${buttonText}
</Button>`,
	badge: `<Badge variant="${badgeVariant}" size="${badgeSize}">
  ${badgeText}
</Badge>`,
	card: `<Card variant="${cardVariant}"${cardPadding ? "" : " padding={false}"}${cardInteractive ? " interactive" : ""}>
  <p>${cardText}</p>
</Card>`,
	input: `<Input placeholder="${inputPlaceholder}"${inputDisabled ? " disabled" : ""}${inputError ? ` error="${inputError}"` : ""} />`,
	alert: `<Alert variant="${alertVariant}" title="${alertTitle}" description="${alertDescription}" />`,
	dialog: `<Dialog bind:open={open} size="${dialogSize}" title="${dialogTitle}">
  <p>Dialog content goes here.</p>
</Dialog>`,
});

function selectClass(base = "") {
	return `w-full rounded-[--radius] border border-border bg-input px-3 py-2 text-body-md text-foreground
		focus:outline-none focus:ring-2 focus:ring-ring ${base}`;
}
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Playground</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Component Playground</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Interactively explore and configure bindrunes components. Adjust props and see live results.
  </p>

  <div class="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Component Picker -->
    <div class="lg:col-span-3">
      <Card variant="outlined" padding>
        <label class="block text-label-md mb-2 text-muted-foreground" for="component-picker">Select Component</label>
        <select id="component-picker" bind:value={selectedComponent} class={selectClass()}>
          <option value="button">Button</option>
          <option value="badge">Badge</option>
          <option value="card">Card</option>
          <option value="input">Input</option>
          <option value="alert">Alert</option>
          <option value="dialog">Dialog</option>
        </select>
      </Card>
    </div>

    <!-- Props Panel -->
    <div class="lg:col-span-1">
      <Card variant="surface" padding>
        <h3 class="text-title-2 text-foreground mb-4">Props</h3>

        {#if selectedComponent === "button"}
          <div class="space-y-4">
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="button-variant">Variant</label>
              <select id="button-variant" bind:value={buttonVariant} class={selectClass()}>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
                <option value="ghost">Ghost</option>
                <option value="destructive">Destructive</option>
                <option value="link">Link</option>
                <option value="soft">Soft</option>
                <option value="subtle">Subtle</option>
              </select>
            </div>
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="button-size">Size</label>
              <select id="button-size" bind:value={buttonSize} class={selectClass()}>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <Switch bind:checked={buttonDisabled} label="Disabled" name="button-disabled" />
            <Input bind:value={buttonText} label="Label" placeholder="Button text" name="button-text" />
          </div>
        {:else if selectedComponent === "badge"}
          <div class="space-y-4">
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="badge-variant">Variant</label>
              <select id="badge-variant" bind:value={badgeVariant} class={selectClass()}>
                <option value="default">Default</option>
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="destructive">Destructive</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="outline">Outline</option>
              </select>
            </div>
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="badge-size">Size</label>
              <select id="badge-size" bind:value={badgeSize} class={selectClass()}>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            <Input bind:value={badgeText} label="Label" placeholder="Badge text" name="badge-text" />
          </div>
        {:else if selectedComponent === "card"}
          <div class="space-y-4">
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="card-variant">Variant</label>
              <select id="card-variant" bind:value={cardVariant} class={selectClass()}>
                <option value="surface">Surface</option>
                <option value="glass">Glass</option>
                <option value="outlined">Outlined</option>
                <option value="ghost">Ghost</option>
              </select>
            </div>
            <Switch bind:checked={cardPadding} label="Padding" name="card-padding" />
            <Switch bind:checked={cardInteractive} label="Interactive" name="card-interactive" />
            <Input bind:value={cardText} label="Content" placeholder="Card text" name="card-text" />
          </div>
        {:else if selectedComponent === "input"}
          <div class="space-y-4">
            <Input bind:value={inputPlaceholder} label="Placeholder" placeholder="Placeholder text" name="input-placeholder" />
            <Switch bind:checked={inputDisabled} label="Disabled" name="input-disabled" />
            <Input bind:value={inputError} label="Error" placeholder="Error message (optional)" name="input-error" />
          </div>
        {:else if selectedComponent === "alert"}
          <div class="space-y-4">
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="alert-variant">Variant</label>
              <select id="alert-variant" bind:value={alertVariant} class={selectClass()}>
                <option value="info">Info</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="destructive">Destructive</option>
              </select>
            </div>
            <Input bind:value={alertTitle} label="Title" placeholder="Alert title" name="alert-title" />
            <Input bind:value={alertDescription} label="Description" placeholder="Alert description" name="alert-description" />
          </div>
        {:else if selectedComponent === "dialog"}
          <div class="space-y-4">
            <div>
              <label class="block text-label-md mb-2 text-muted-foreground" for="dialog-size">Size</label>
              <select id="dialog-size" bind:value={dialogSize} class={selectClass()}>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            <Input bind:value={dialogTitle} label="Title" placeholder="Dialog title" name="dialog-title" />
          </div>
        {/if}
      </Card>
    </div>

    <!-- Live Preview -->
    <div class="lg:col-span-1">
      <Card variant="surface" padding>
        <h3 class="text-title-2 text-foreground mb-4">Preview</h3>
        <div class="flex items-center justify-center min-h-[200px]">
          {#if selectedComponent === "button"}
            <Button variant={buttonVariant} size={buttonSize} disabled={buttonDisabled}>
              {buttonText}
            </Button>
          {:else if selectedComponent === "badge"}
            <Badge variant={badgeVariant} size={badgeSize}>
              {badgeText}
            </Badge>
          {:else if selectedComponent === "card"}
            <Card variant={cardVariant} padding={cardPadding} interactive={cardInteractive} class="w-full">
              <p>{cardText}</p>
            </Card>
          {:else if selectedComponent === "input"}
            <div class="w-full">
              <Input placeholder={inputPlaceholder} disabled={inputDisabled} error={inputError || undefined} />
            </div>
          {:else if selectedComponent === "alert"}
            <Alert variant={alertVariant} title={alertTitle} description={alertDescription} />
          {:else if selectedComponent === "dialog"}
            <div>
              <Button variant="outline" onclick={() => (dialogOpen = true)}>Open Dialog</Button>
              <Dialog bind:open={dialogOpen} size={dialogSize} title={dialogTitle}>
                <p class="text-body text-muted-foreground">This is dialog content. You can put anything here.</p>
              </Dialog>
            </div>
          {/if}
        </div>
      </Card>
    </div>

    <!-- Code Snippet -->
    <div class="lg:col-span-1">
      <Card variant="surface" padding>
        <h3 class="text-title-2 text-foreground mb-4">Code</h3>
        <CodeSnippet language="svelte">
          {codeSnippets[selectedComponent]}
        </CodeSnippet>
      </Card>
    </div>
  </div>
</div>
