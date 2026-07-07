<script lang="ts">
import { Badge } from "bindrunes";
</script>

<div class="p-6 lg:p-8 max-w-4xl">
  <Badge variant="primary">Docs</Badge>
  <h1 class="mt-4 text-display-1 text-foreground">Accessibility</h1>
  <p class="mt-3 text-body-lg text-muted-foreground">
    WCAG 2.1 AA compliance, keyboard navigation, ARIA support, and screen reader testing.
  </p>

  <div class="mt-10 space-y-10">
    <section>
      <h2 class="text-title-1 text-foreground mb-4">Statement</h2>
      <p class="text-body text-muted-foreground">
        bindrunes targets WCAG 2.1 Level AA compliance. Components are tested with axe-core automated scanning and manual keyboard/screen reader testing.
      </p>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Keyboard Navigation</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>All interactive components are fully keyboard navigable</li>
        <li>Tab order follows visual layout</li>
        <li>Arrow keys navigate within composite widgets (tabs, menus, radio groups)</li>
        <li>Escape closes overlays (dialogs, drawers, popovers, dropdowns)</li>
        <li>Focus trapping in modals via bits-ui</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">ARIA Support</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>All interactive controls have appropriate ARIA roles</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">ariaLabel</code> prop on icon-only buttons, dialogs, sheets, drawers, sliders, toggles, radio groups, comboboxes, cards, and toggle groups</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aria-describedby</code> linked for error messages and helpers on form inputs</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aria-expanded</code> on collapsible triggers</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aria-selected</code> on tabs</li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">aria-checked</code> on switches, checkboxes, radio buttons</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Screen Reader Support</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>Live regions for dynamic content (toasts via svelte-sonner)</li>
        <li>Meaningful alt text patterns for avatars and images</li>
        <li>Hidden labels for form inputs via label association</li>
        <li>Skip navigation links</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Color & Contrast</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>OKLCH color space ensures perceptual uniformity</li>
        <li>All theme presets pass WCAG AA contrast ratios (4.5:1 for text, 3:1 for large text)</li>
        <li>Focus indicators are visible on all interactive elements</li>
        <li>Color is never the sole indicator of state</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Motion & Animation</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li>All animations respect <code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">prefers-reduced-motion</code></li>
        <li><code class="text-sm bg-surface-2 px-1.5 py-0.5 rounded">useReducedMotion()</code> composable for JS-based animations</li>
        <li>No flashing or strobing content</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Known Limitations</h2>
      <ul class="text-body text-muted-foreground space-y-2 list-disc list-inside">
        <li><strong>ColorPicker</strong> — Limited keyboard support for color spectrum navigation. Workaround: use keyboard input for hex values.</li>
        <li><strong>RichTextEditor</strong> — ProseMirror-based editor has partial ARIA support. Complex editing tasks may require mouse interaction.</li>
        <li><strong>DataGrid</strong> — Virtual scrolling may cause issues with screen reader row count announcements.</li>
      </ul>
    </section>

    <section>
      <h2 class="text-title-1 text-foreground mb-4">Testing Methodology</h2>
      <p class="text-body text-muted-foreground mb-4">
        <strong>Automated:</strong> axe-core integration via vitest-axe, Storybook a11y addon for real-time checks, CI integration via test suite.
      </p>
      <p class="text-body text-muted-foreground">
        <strong>Manual:</strong> Keyboard-only navigation testing, screen reader testing (VoiceOver, NVDA), zoom testing (200%), color contrast verification.
      </p>
    </section>
  </div>
</div>
