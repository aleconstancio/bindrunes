<script lang="ts">
  import { createThemeBuilder } from '../utils/createThemeBuilder.svelte';
  import { hexToOklch } from '../utils/colorConvert';
  import Card from './Card.svelte';
  import Button from './Button.svelte';
  import Input from './Input.svelte';
  import Badge from './Badge.svelte';
  import Alert from './Alert.svelte';

  let {
    baseTheme = 'dracula',
    onchange = undefined as ((css: string) => void) | undefined,
  }: {
    baseTheme?: string;
    onchange?: (css: string) => void;
  } = $props();

  let primaryHex = $state('#BD93F9');
  let accentHex = $state('#FF79C6');
  let destructiveHex = $state('#FF5555');
  let radius = $state('0.625rem');

  let primary = $derived(hexToOklch(primaryHex));
  let accent = $derived(hexToOklch(accentHex));
  let destructive = $derived(hexToOklch(destructiveHex));

  let theme = $derived(createThemeBuilder({ primary, accent, destructive, radius }));
  let cssOutput = $derived(theme.toCSS('[data-theme="custom"]'));

  let copied = $state(false);

  function handleCopy() {
    navigator.clipboard.writeText(cssOutput);
    copied = true;
    setTimeout(() => { copied = false; }, 2000);
  }

  function handleApply() {
    theme.apply();
    onchange?.(cssOutput);
  }

  function applyPreset(preset: string) {
    const presets: Record<string, { primary: string; accent: string; destructive: string }> = {
      dracula: { primary: '#BD93F9', accent: '#FF79C6', destructive: '#FF5555' },
      akashic: { primary: '#5B8DEF', accent: '#5CCFEF', destructive: '#FF5555' },
      martian: { primary: '#E06050', accent: '#E09050', destructive: '#CC4444' },
      alchemy: { primary: '#E0C050', accent: '#C0A040', destructive: '#FF5555' },
      druidic: { primary: '#50C070', accent: '#50B0A0', destructive: '#FF5555' },
      obsidian: { primary: '#777788', accent: '#666677', destructive: '#FF5555' },
    };
    const p = presets[preset];
    if (p) {
      primaryHex = p.primary;
      accentHex = p.accent;
      destructiveHex = p.destructive;
    }
  }
</script>

<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <!-- Controls -->
  <Card variant="glass" class="p-6 space-y-5">
    <h3 class="text-lg font-semibold" style="color: var(--foreground);">Theme Builder</h3>

    <div>
      <label class="text-sm font-medium block mb-1.5" style="color: var(--muted-foreground);">Start from preset</label>
      <div class="flex flex-wrap gap-2">
        {#each ['dracula', 'akashic', 'martian', 'alchemy', 'druidic', 'obsidian'] as preset}
          <Button
            size="sm"
            variant={baseTheme === preset ? 'primary' : 'outline'}
            onclick={() => applyPreset(preset)}
          >
            {preset}
          </Button>
        {/each}
      </div>
    </div>

    <div>
      <label class="text-sm font-medium block mb-1.5" style="color: var(--muted-foreground);">Primary Color</label>
      <div class="flex gap-2 items-center">
        <input type="color" bind:value={primaryHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
        <Input bind:value={primaryHex} class="flex-1 mono text-xs" />
      </div>
    </div>

    <div>
      <label class="text-sm font-medium block mb-1.5" style="color: var(--muted-foreground);">Accent Color</label>
      <div class="flex gap-2 items-center">
        <input type="color" bind:value={accentHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
        <Input bind:value={accentHex} class="flex-1 mono text-xs" />
      </div>
    </div>

    <div>
      <label class="text-sm font-medium block mb-1.5" style="color: var(--muted-foreground);">Destructive Color</label>
      <div class="flex gap-2 items-center">
        <input type="color" bind:value={destructiveHex} class="w-10 h-10 rounded cursor-pointer border-0 p-0" />
        <Input bind:value={destructiveHex} class="flex-1 mono text-xs" />
      </div>
    </div>

    <div>
      <label class="text-sm font-medium block mb-1.5" style="color: var(--muted-foreground);">Border Radius</label>
      <Input bind:value={radius} class="mono text-xs" />
    </div>

    <div class="flex gap-2 pt-2">
      <Button onclick={handleApply}>Apply Theme</Button>
      <Button variant="outline" onclick={handleCopy}>
        {copied ? 'Copied!' : 'Copy CSS'}
      </Button>
    </div>
  </Card>

  <!-- Preview -->
  <div class="space-y-4">
    <Card variant="glass" class="p-6">
      <h3 class="text-lg font-semibold mb-4" style="color: var(--foreground);">Preview</h3>
      <div class="space-y-3">
        <div class="flex flex-wrap gap-2">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <Input label="Sample Input" placeholder="Type here..." />
        <div class="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
        </div>
        <Alert title="Alert Title" description="This is a sample alert with the generated theme." />
      </div>
    </Card>

    <Card variant="glass" class="p-6">
      <h3 class="text-sm font-semibold mb-2" style="color: var(--foreground);">Generated CSS</h3>
      <pre class="p-3 rounded text-xs overflow-auto max-h-[300px]" style="background: var(--muted); color: var(--foreground); font-family: 'JetBrains Mono', monospace;"><code>{cssOutput}</code></pre>
    </Card>
  </div>
</div>
