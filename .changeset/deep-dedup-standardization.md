---
"bindrunes": minor
---

Deep deduplication and standardization pass — 510+ LoC saved

Types: Import ContainerSize, StatusVariant in Block/MetaContainer/Progress/MetricCard; extract OrderLineItem and NavLink to shared-types.ts
Crud: Merge 6 CrudCreate/Edit components into 3 unified components with mode prop (CrudForm, CrudFormDrawer, CrudFormModal)
Delete: Simplify DashboardShellRight/Topnav to thin wrappers; delete ChatMessage (absorbed into ChatBubble)
Auth: Replace inline password toggles with PasswordInput in 3 auth forms; apply ErrorMessage to 7 error banners; fix error defaults
Overlay: Apply shared .bindrunes-overlay class to 5 overlay components; standardize close button markup
Standardization: Rename oncopy/onapply/onpreset to camelCase; fix error="" defaults in 9 files; rename FormField hint→helper; remove 40+ redundant as Type casts
