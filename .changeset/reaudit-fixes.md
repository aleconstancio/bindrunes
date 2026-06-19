---
"bindrunes": patch
---

Re-audit fixes: critical bugs, showcase polish, exports, and standardization

Critical: Fix dialogBody snippet never rendering in 6 Crud components; add missing Sheet/Form imports in CrudCreateDrawer
Showcase: Fix Alert variant="error"→"destructive" in 3 files; fix DashboardShell navGroups→navigation prop; add missing Button import; replace raw inputs/buttons with library components; replace bare text-sm/text-xs with design tokens
Exports: Add NavLink, OrderLineItem, ErrorMessage to public API; add CrudForm/CrudFormDrawer/CrudFormModal to data/index.ts
Utilities: Implement .bindrunes-overlay, .bindrunes-focus-ring, .bindrunes-disabled CSS classes
Standardization: Fix error="" defaults in 6 files; add type annotations to DashboardShellRight/Topnav; use shared DetailSection type in CrudDetailSection
Tests: Add ErrorMessage test; add timestamp test to ChatBubble; delete stale ChatMessage test
