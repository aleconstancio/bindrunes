<script lang="ts">
import { Badge, CodeSnippet } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Design System</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    Three orthogonal customization axes backed by a complete CSS custom property token contract.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">The Three Axes</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left py-2 pr-4 font-medium text-foreground">Axis</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Attribute</th>
              <th class="text-left py-2 pr-4 font-medium text-foreground">Presets</th>
              <th class="text-left py-2 font-medium text-foreground">Controls</th>
            </tr>
          </thead>
          <tbody class="text-muted-foreground">
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Theme</td>
              <td class="py-2 pr-4 font-mono text-xs">data-theme</td>
              <td class="py-2 pr-4">editorial, dracula, nord, catppuccin, rose-pine, github</td>
              <td class="py-2">Color identity</td>
            </tr>
            <tr class="border-b border-border/50">
              <td class="py-2 pr-4 font-medium">Aesthetic</td>
              <td class="py-2 pr-4 font-mono text-xs">data-aesthetic</td>
              <td class="py-2 pr-4">minimal, glass, bento, expressive</td>
              <td class="py-2">Form (radius, shadow, motion)</td>
            </tr>
            <tr>
              <td class="py-2 pr-4 font-medium">Density</td>
              <td class="py-2 pr-4 font-mono text-xs">data-density</td>
              <td class="py-2 pr-4">compact, comfortable, spacious</td>
              <td class="py-2">Spacing scale</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Theme Presets</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">editorial (default)</h3>
          <p class="text-body-sm text-muted-foreground">Warm grey surfaces with restrained indigo accents. Inspired by Linear/Vercel/Geist.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">dracula</h3>
          <p class="text-body-sm text-muted-foreground">Deep purple-black surfaces with vibrant magenta/pink accents. Faithful to the Dracula color palette.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">nord</h3>
          <p class="text-body-sm text-muted-foreground">Cool blue-grey surfaces with icy blue accents. Calm, professional, accessible.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">catppuccin</h3>
          <p class="text-body-sm text-muted-foreground">Soft lavender-mauve surfaces with pastel purple/pink accents. Modern, gentle, highly readable.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">rose-pine</h3>
          <p class="text-body-sm text-muted-foreground">Warm rose/brown surfaces with muted coral accents. Earthy, cozy, low-contrast.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">github</h3>
          <p class="text-body-sm text-muted-foreground">Neutral grey surfaces with saturated blue accents. High-contrast, accessible, universally recognizable.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Aesthetic Presets</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">minimal (default)</h3>
          <p class="text-body-sm text-muted-foreground">0.5rem radius, flat buttons, snappy 120ms transitions. Calm, flat, hairline aesthetic.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">glass</h3>
          <p class="text-body-sm text-muted-foreground">0.625rem radius, gradient buttons, fluid 250ms transitions, grain texture. Atmospheric, translucent surfaces.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">bento</h3>
          <p class="text-body-sm text-muted-foreground">0.875rem radius, inner-light buttons, bouncy 220ms spring transitions. Friendly, rounded, soft.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">expressive</h3>
          <p class="text-body-sm text-muted-foreground">1.0rem radius, gradient buttons, dramatic 300ms transitions, mesh texture. Dramatic, loud.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Density Modes</h2>
      <div class="space-y-4">
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">compact</h3>
          <p class="text-body-sm text-muted-foreground">Spacing scaled by ~0.8x. Dense layouts for data-heavy UIs, dashboards, and tables.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">comfortable (default)</h3>
          <p class="text-body-sm text-muted-foreground">Standard 1x spacing. Balanced for most application UIs.</p>
        </div>
        <div class="p-4 rounded-lg bg-surface-1 border border-border">
          <h3 class="text-title-2 text-foreground mb-1">spacious</h3>
          <p class="text-body-sm text-muted-foreground">Spacing scaled by ~1.25x. Generous whitespace for marketing pages and content-heavy layouts.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Token Cascade Order</h2>
      <p class="text-body text-muted-foreground mb-4">Tokens resolve in this layer order. Later layers override earlier ones.</p>
      <CodeSnippet language="css">
{`@layer bindrunes.reset,
       bindrunes.tokens.contract,    /* CSS custom property types */
       bindrunes.tokens.defaults,    /* Default fallback values */
       bindrunes.tokens.aesthetic,   /* Form overrides (radius, shadow, motion) */
       bindrunes.tokens.theme,       /* Color overrides */
       bindrunes.tokens.density,     /* Spacing overrides */
       bindrunes.utilities,
       bindrunes.components;`}
      </CodeSnippet>
      <div class="mt-4 space-y-2">
        <p class="text-body text-muted-foreground"><strong>Key rules:</strong></p>
        <ul class="text-body text-muted-foreground space-y-1 list-disc list-inside">
          <li>Aesthetics <strong>never</strong> modify colors.</li>
          <li>Themes <strong>never</strong> modify spacing or forms.</li>
          <li>Density <strong>only</strong> modifies spacing tokens.</li>
        </ul>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Custom Theme Guide</h2>
      <CodeSnippet language="ts" title="Using defineTheme()">
{`import { defineTheme } from "bindrunes";

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
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Three-Axis Combinations</h2>
      <div class="space-y-3">
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">minimal x minimal x comfortable</code>
          <p class="text-body-sm text-muted-foreground mt-1">Clean, minimal, professional. The baseline experience.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">dracula x glass x comfortable</code>
          <p class="text-body-sm text-muted-foreground mt-1">Deep purple glassmorphism. Great for developer tools and dark-first apps.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">nord x bento x compact</code>
          <p class="text-body-sm text-muted-foreground mt-1">Soft blue-grey with rounded corners, tight spacing. Ideal for data-heavy dashboards.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">catppuccin x bento x spacious</code>
          <p class="text-body-sm text-muted-foreground mt-1">Friendly pastels with generous spacing and rounded corners. Perfect for consumer apps.</p>
        </div>
        <div class="p-3 rounded-lg bg-surface-1 border border-border">
          <code class="text-sm font-medium text-foreground">github x minimal x compact</code>
          <p class="text-body-sm text-muted-foreground mt-1">Neutral, high-contrast, dense. Excellent for admin panels and internal tools.</p>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">CSS Setup</h2>
      <CodeSnippet language="css" title="app.css">
{`@import "tailwindcss";
@plugin "bindrunes/tailwind";
@import "bindrunes/styles/global.css";
@import "bindrunes/styles/aesthetics/glass.css";`}
      </CodeSnippet>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Utility Classes</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.glass-panel</code> — Glassmorphism backdrop with blur</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.glass-interactive</code> — Hover glow interactive panel</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.text-gradient-violet</code> / <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.text-gradient-gold</code> — Gradient text effects</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">.section-reveal</code> — Scroll-triggered reveal animations</li>
      </ul>
    </section>
  </div>
</div>
