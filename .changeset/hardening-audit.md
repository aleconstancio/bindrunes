---
"bindrunes": minor
---

UX/DX & design system audit — 27 fixes across accessibility, API contracts, token architecture, docs drift, and showcase demo polish

Accessibility: Alert role="alert"/"status", WizardForm aria-current + progressbar, LoginForm role="alert", Input id prop, Select aria-describedby, Checkbox name + visible error
API contracts: DropdownMenu open bindable, Dialog sizeClasses union typing, Popover wrapper removal, restProps forwarding on Button/Card/Badge/Alert
Token architecture: Deduplicate editorial.css, add :root z-index values, remove orphaned _easingDefault, landing.css utilities import, radius comment
Docs drift: Alert states doc update, PricingTable English fallbacks, landing.css :global() removal
Showcase UX: Dead import cleanup, legacy on:click fix, tab overflow, deterministic calendar, anchor fix, dashboard layout, composable demos
