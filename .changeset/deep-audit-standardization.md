---
"bindrunes": minor
---

Deep audit: standardization, architecture, LoC savings, and anti-pattern fixes

Shared types: Extract Placement, Align, ComponentSize, InputType to shared-types.ts; update 15+ components to import
Deduplication: Extract ErrorMessage component (4 form components), Button/Card content snippets, gridCols utility (3 components)
CSS utilities: Add .bindrunes-focus-ring, .bindrunes-disabled, .bindrunes-overlay to utilities.css
Anti-patterns: Remove 20+ `as Type` casts, fix Popconfirm Svelte 4 syntax, rename onupdate→onUpdate, fix inline styles, fix Card double-cast, fix NumberInput label, fix LandingNav handler reference
Showcase: Replace console.log→toasts in 6 auth pages, replace raw inputs with library Input, fix Alert variant inconsistency, fix DashboardShell API inconsistency, fix navGroups icon types
