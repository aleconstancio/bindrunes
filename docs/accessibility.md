# Accessibility

bindrunes is committed to WCAG 2.1 AA compliance. This document covers the accessibility features, known limitations, and audit results.

## Statement

bindrunes targets WCAG 2.1 Level AA compliance. Components are tested with axe-core automated scanning and manual keyboard/screen reader testing.

## Accessibility Features

### Keyboard Navigation

- All interactive components are fully keyboard navigable
- Tab order follows visual layout
- Arrow keys navigate within composite widgets (tabs, menus, radio groups)
- Escape closes overlays (dialogs, drawers, popovers, dropdowns)
- Focus trapping in modals via bits-ui

### ARIA Support

- All interactive controls have appropriate ARIA roles
- `ariaLabel` prop on icon-only buttons, dialogs, sheets, drawers, sliders, toggles, radio groups, comboboxes, cards, and toggle groups
- `aria-describedby` linked for error messages and helpers on form inputs
- `aria-expanded` on collapsible triggers
- `aria-selected` on tabs
- `aria-checked` on switches, checkboxes, radio buttons
- `aria-invalid` on inputs with validation errors

### Screen Reader Support

- Live regions for dynamic content (toasts via svelte-sonner)
- Meaningful alt text patterns for avatars and images
- Hidden labels for form inputs via `<label for>` association
- Skip navigation links

### Color & Contrast

- OKLCH color space ensures perceptual uniformity
- All theme presets are designed to pass WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Focus indicators are visible on all interactive elements
- Color is never the sole indicator of state

### Motion & Animation

- All animations respect `prefers-reduced-motion`
- `useReducedMotion()` composable available for JS-based animations
- No flashing or strobing content

## Component Audit Results

### Primitives (84 components)

| Category | Components | Keyboard | ARIA | Screen Reader | Notes |
|----------|-----------|----------|------|---------------|-------|
| Foundation | Button, Badge, Card, Alert, Avatar, Separator, Kbd, etc. | ✅ | ✅ | ✅ | — |
| Forms | Input, Select, Checkbox, Switch, Slider, RadioGroup, etc. | ✅ | ✅ | ✅ | `aria-describedby` for errors |
| Overlays | Dialog, Sheet, Drawer, Popover, DropdownMenu, etc. | ✅ | ✅ | ✅ | Focus trapped via bits-ui |
| Navigation | Tabs, Breadcrumb, Accordion, TreeView, NavigationMenu | ✅ | ✅ | ✅ | Arrow key navigation |
| Feedback | Progress, Spinner, Skeleton, Toast | ✅ | ✅ | ✅ | Live regions for toasts |

### Known Limitations

1. **ColorPicker** — Limited keyboard support for color spectrum navigation. Workaround: use keyboard input for hex values.
2. **RichTextEditor** — ProseMirror-based editor has partial ARIA support. Complex editing tasks may require mouse interaction.
3. **DataGrid** — Virtual scrolling may cause issues with screen reader row count announcements.

## Testing Methodology

### Automated Testing

- axe-core integration via vitest-axe
- `expectNoAxeViolations()` helper in `src/helpers/axe.ts` for consistent test setup
- Storybook a11y addon for real-time checks during development
- CI integration via test suite execution

### Manual Testing

- Keyboard-only navigation testing
- Screen reader testing (VoiceOver, NVDA)
- Zoom testing (200% browser zoom)
- Color contrast verification

## Recommendations for Consumers

1. Always provide text labels for icon-only buttons via the `ariaLabel` prop
2. Use the `label` prop on form inputs for screen reader accessibility
3. Test with keyboard navigation before shipping
4. Verify color contrast with your chosen theme
5. Use `aria-describedby` explicitly when adding custom error messages outside of Input components

## VPAT

For formal accessibility conformance documentation, see [VPAT 2.4](./VPAT-2.4.md).
