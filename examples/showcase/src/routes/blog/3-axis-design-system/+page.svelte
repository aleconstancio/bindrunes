<script lang="ts">
import { Badge, Button, Card, CodeSnippet } from "urupe-ui";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Blog</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Deep Dive: The 3-Axis Design System</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Why urupe-ui separates theme, aesthetic, and density into orthogonal axes — and how the CSS token cascade makes every combination valid.
  </p>

  <div class="mt-10 space-y-10">

    <!-- Section 1 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Why Orthogonal Axes Matter</h2>
      <p class="text-body text-muted-foreground mb-4">
        Most design systems couple color with form. You pick a theme, and it comes bundled with radius values, shadow depths, and spacing ratios. Change the theme, lose your radius settings. Want a glass aesthetic with a warm color palette? Sorry — pick one.
      </p>
      <p class="text-body text-muted-foreground mb-4">
        This coupling is a design tax. It forces you to maintain separate theme variants for every visual combination, or accept that your "themes" are really monolithic style bundles.
      </p>
      <p class="text-body text-muted-foreground">
        urupe-ui takes a different approach. It separates customization into three independent axes:
      </p>
      <div class="mt-4 overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Axis</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Data Attribute</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Controls</th>
              <th class="text-left py-2 font-medium text-foreground">Never Touches</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theme</td>
              <td class="py-2 pr-4 font-mono text-xs">data-theme</td>
              <td class="py-2 pr-4">Color tokens</td>
              <td class="py-2">Radius, spacing, motion</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Aesthetic</td>
              <td class="py-2 pr-4 font-mono text-xs">data-aesthetic</td>
              <td class="py-2 pr-4">Form (radius, shadow, motion, surface texture)</td>
              <td class="py-2">Colors</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-medium">Density</td>
              <td class="py-2 pr-4 font-mono text-xs">data-density</td>
              <td class="py-2">Spacing scale</td>
              <td class="py-2">Colors, form</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-body text-muted-foreground mt-4">
        Any combination is valid. Dracula + glass + compact? Sure. Editorial + brutalist + spacious? Works. You get 6 × 7 × 3 = 126 distinct visual configurations from a single system, with no invalid states.
      </p>
    </section>

    <!-- Section 2 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme Layer</h2>
      <p class="text-body text-muted-foreground mb-4">
        The theme layer defines your color identity. Each of the 6 built-in themes provides a complete set of OKLCH color tokens — backgrounds, foregrounds, borders, accents, state colors, and glass surfaces.
      </p>
      <div class="space-y-2 mb-4">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">editorial</code>
          <span class="text-body-sm text-muted-foreground ml-2">Warm grey surfaces, restrained indigo accents. Linear/Vercel inspired.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">dracula</code>
          <span class="text-body-sm text-muted-foreground ml-2">Deep purple-black surfaces, vibrant magenta/pink accents.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">nord</code>
          <span class="text-body-sm text-muted-foreground ml-2">Cool blue-grey surfaces, icy blue accents. Calm and accessible.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">catppuccin</code>
          <span class="text-body-sm text-muted-foreground ml-2">Soft lavender-mauve surfaces, pastel purple/pink accents.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">rose-pine</code>
          <span class="text-body-sm text-muted-foreground ml-2">Warm rose/brown surfaces, muted coral accents. Earthy and cozy.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">github</code>
          <span class="text-body-sm text-muted-foreground ml-2">Neutral grey surfaces, saturated blue accents. High-contrast.</span>
        </div>
      </div>
      <p class="text-body text-muted-foreground">
        Themes map to a <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-theme</code> attribute on the root element. Components read color tokens like <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">var(--primary)</code> which resolve through the cascade.
      </p>
    </section>

    <!-- Section 3 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Aesthetic Layer</h2>
      <p class="text-body text-muted-foreground mb-4">
        The aesthetic layer controls form — how things look, not what color they are. Seven built-in aesthetics control radius, shadows, motion timing, button treatment, card treatment, and surface texture. None of them touch a single color token.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">minimal</code>
          <p class="text-body-sm text-muted-foreground mt-1">0.5rem radius, flat buttons, 120ms transitions. Calm and flat.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">glass</code>
          <p class="text-body-sm text-muted-foreground mt-1">0.625rem radius, gradient buttons, 250ms transitions, grain texture.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">bento</code>
          <p class="text-body-sm text-muted-foreground mt-1">0.875rem radius, inner-light buttons, 220ms spring transitions.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">expressive</code>
          <p class="text-body-sm text-muted-foreground mt-1">1.0rem radius, gradient buttons, 300ms transitions, mesh texture.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">neon</code>
          <p class="text-body-sm text-muted-foreground mt-1">0.25rem radius, flat buttons, 80ms transitions, neon glow shadows.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">brutalist</code>
          <p class="text-body-sm text-muted-foreground mt-1">0 radius, flat buttons, 50ms transitions, noise texture.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">organic</code>
          <p class="text-body-sm text-muted-foreground mt-1">1.5rem radius, gradient buttons, 200ms spring transitions, paper texture.</p>
        </div>
      </div>
      <p class="text-body text-muted-foreground mt-4">
        Aesthetics set tokens like <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--radius</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--shadow-lg</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--duration-fluid</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--button-treatment</code>, and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--surface-texture</code>. Components consume these generically — a Button doesn't know if it's "glass" or "brutalist," it just reads <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">var(--button-treatment)</code>.
      </p>
    </section>

    <!-- Section 4 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Density Layer</h2>
      <p class="text-body text-muted-foreground mb-4">
        The density layer scales the entire spacing system with a single switch. Three modes affect every spacing token from <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--space-1</code> through <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">--space-20</code>.
      </p>
      <div class="space-y-2">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">compact</code>
          <span class="text-body-sm text-muted-foreground ml-2">~0.8x scale. Dense layouts for dashboards, tables, data-heavy UIs.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">comfortable</code>
          <span class="text-body-sm text-muted-foreground ml-2">Standard 1x scale. Balanced for most application UIs.</span>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">spacious</code>
          <span class="text-body-sm text-muted-foreground ml-2">~1.25x scale. Generous whitespace for marketing pages and content layouts.</span>
        </div>
      </div>
      <p class="text-body text-muted-foreground mt-4">
        This means a sidebar, a card padding, a form gap, and a page section all scale proportionally. You never manually adjust individual spacing values — the density axis handles it.
      </p>
    </section>

    <!-- Section 5 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">The Token Cascade</h2>
      <p class="text-body text-muted-foreground mb-4">
        The three axes aren't applied in parallel — they cascade through CSS layers, with later layers overriding earlier ones. This is what guarantees valid combinations.
      </p>
      <CodeSnippet language="css" title="Token cascade order">
{`@layer urupe-ui.reset,
       urupe-ui.tokens.contract,    /* CSS custom property types */
       urupe-ui.tokens.defaults,    /* Default fallback values */
       urupe-ui.tokens.aesthetic,   /* Form overrides */
       urupe-ui.tokens.theme,       /* Color overrides */
       urupe-ui.tokens.density,     /* Spacing overrides */
       urupe-ui.utilities,
       urupe-ui.components;`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4 mb-2">
        The cascade resolves in this order:
      </p>
      <ol class="text-body text-muted-foreground space-y-2 list-decimal list-inside">
        <li><strong>Contract</strong> — Declares every token the system uses. Pure type definitions, no values.</li>
        <li><strong>Defaults</strong> — Provides baseline fallback values for all tokens.</li>
        <li><strong>Aesthetic</strong> — Overrides form tokens (radius, shadow, motion, surface texture). Never touches colors.</li>
        <li><strong>Theme</strong> — Overrides color tokens. Never touches form or spacing.</li>
        <li><strong>Density</strong> — Overrides spacing tokens only.</li>
      </ol>
      <p class="text-body text-muted-foreground mt-4">
        Because each axis operates on a disjoint set of tokens, they can't conflict. An aesthetic can never accidentally override a color, and a theme can never break your spacing. The CSS layer ordering enforces this at the language level.
      </p>
    </section>

    <!-- Section 6 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Custom Themes</h2>
      <p class="text-body text-muted-foreground mb-4">
        There are three ways to create custom color themes, depending on how much control you need.
      </p>

      <h3 class="text-title-2 text-foreground mb-3">defineTheme() — Full Control</h3>
      <p class="text-body text-muted-foreground mb-3">
        Provides raw access to every CSS custom property. You define the complete token set as key-value pairs.
      </p>
      <CodeSnippet language="ts" title="defineTheme()">
{`import { defineTheme } from "urupe-ui";

const myBrand = defineTheme("my-brand", {
  "--primary": "oklch(0.55 0.18 260)",
  "--primary-foreground": "oklch(0.99 0 0)",
  "--accent": "oklch(0.65 0.2 310)",
  "--background": "oklch(0.12 0.008 260)",
  "--foreground": "oklch(0.95 0.005 260)",
  "--card-solid": "oklch(0.16 0.01 260)",
  "--destructive": "oklch(0.6 0.22 25)",
  "--success": "oklch(0.68 0.16 145)",
  "--warning": "oklch(0.8 0.16 80)",
  "--info": "oklch(0.7 0.12 230)",
  "--border": "oklch(1 0 0 / 0.08)",
  "--ring": "oklch(0.55 0.18 260)",
});

myBrand.apply();`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">extendTheme() — Shorthand Overrides</h3>
      <p class="text-body text-muted-foreground mb-3">
        Start from a built-in theme and override just the tokens you care about. The builder derives the rest.
      </p>
      <CodeSnippet language="ts" title="extendTheme()">
{`import { extendTheme } from "urupe-ui";

const warmDracula = extendTheme("dracula", {
  primary: "oklch(0.7 0.15 40)",
  accent: "oklch(0.65 0.18 25)",
  background: "oklch(0.14 0.01 30)",
});

// Apply inline
warmDracula.apply();

// Or generate static CSS
const css = warmDracula.toCSS("[data-theme='warm-dracula']");
console.log(css);`}
      </CodeSnippet>

      <h3 class="text-title-2 text-foreground mt-6 mb-3">CSS-Only — No JavaScript</h3>
      <p class="text-body text-muted-foreground mb-3">
        Override tokens directly in your stylesheet. The <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">data-theme</code> attribute selector gives you full specificity.
      </p>
      <CodeSnippet language="css" title="Custom theme via CSS">
{`[data-theme="my-brand"] {
  --primary: oklch(0.55 0.18 260);
  --primary-foreground: oklch(0.99 0 0);
  --accent: oklch(0.65 0.2 310);
  --background: oklch(0.12 0.008 260);
  --foreground: oklch(0.95 0.005 260);
  --border: oklch(1 0 0 / 0.08);
}`}
      </CodeSnippet>
    </section>

    <!-- Section 7 -->
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Component-Level Overrides</h2>
      <p class="text-body text-muted-foreground mb-4">
        AppProvider accepts scoped <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">theme</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aesthetic</code>, and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">density</code> props. This lets you mix axes within a single page — a dark theme sidebar next to a light theme content area, or a dense data table inside a spacious marketing layout.
      </p>
      <CodeSnippet language="svelte" title="Scoped axes in a layout">
{`<script lang="ts">
  import { AppProvider } from "urupe-ui";
</script>

<!-- Global: dracula + glass + comfortable -->
<AppProvider theme="dracula" aesthetic="glass" density="comfortable">
  <div class="layout">
    <!-- Sidebar overrides density to compact -->
    <AppProvider density="compact">
      <Sidebar />
    </AppProvider>

    <!-- Main content stays at global defaults -->
    <main>
      <!-- This section switches to brutalist aesthetic -->
      <AppProvider aesthetic="brutalist">
        <DataPanel />
      </AppProvider>
    </main>
  </div>
</AppProvider>`}
      </CodeSnippet>
      <p class="text-body text-muted-foreground mt-4">
        Scoped providers cascade inward. A child provider only overrides the axes it specifies — un specified axes inherit from the parent. This means you can swap density for a subtree without re-declaring the theme.
      </p>
      <p class="text-body text-muted-foreground">
        The <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">themeDefault</code>, <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aestheticDefault</code>, and <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">densityDefault</code> props set the initial values when no data attribute is present on the element. Use these to establish a baseline without touching the DOM.
      </p>
    </section>

  </div>
</div>
