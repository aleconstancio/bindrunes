# Migration Guide

## v0.4.0 → v0.5.0

| Change | Migration |
|--------|-----------|
| `createAccess()` now requires `auth` param | Update `createAccess()` → `createAccess(auth)` |
| `useChartTheme` renamed to `getChartTheme` | Search/replace `useChartTheme` → `getChartTheme` |
| `HeroSection` + `FinalCTA` merged into `HeroBanner` | Use `<HeroBanner level={1}>` for hero, `<HeroBanner level={2}>` for final CTA |
| `base.css` removed | Use `global.css` instead (already covers base styles) |
| `DEFAULT_SSE_ROUTES` deprecated | Pass your own routes to the SSE client |
| ProseMirror moved to optional deps | Run `bun add prosemirror-*` if using `RichTextEditor` |
| `utilities.css` now only contains keyframes | Utility classes are provided by the Tailwind plugin |
| Accordion context now uses `Symbol` | No migration needed — fully backward compatible |
| Sidebar tokens now in Tailwind plugin | `bg-sidebar-*`, `text-sidebar-*` classes now work with the plugin |
| `landing/` directory added | Import landing components from `bindrunes/landing` |
| `TFunction`, `Column`, `SortState` in `shared-types.ts` | Backward compatible via re-exports from `bindrunes` |

## Migrating to v0.5.0

### createAccess

```diff
- const access = createAccess();
+ const auth = createAuth();
+ const access = createAccess(auth);
```

### HeroBanner

```diff
- <HeroSection title="..." ... />
+ <HeroBanner title="..." ... />

- <FinalCTA title="..." ... />
+ <HeroBanner title="..." level={2} ... />
```

### DataTable Column/SortState

No migration needed. The unified `Column` and `SortState` types are backward compatible.
