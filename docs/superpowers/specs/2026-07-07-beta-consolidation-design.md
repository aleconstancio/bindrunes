# Beta Consolidation Design

**Date:** 2026-07-07
**Status:** Approved
**Goal:** Consolidate the bindrunes monorepo into a polished, launchable beta where the showcase IS the site, templates actually work, and docs don't drift.

## Context

The library is production-ready (87 primitives, 131 domain components, 30 layouts, 13 domains, agentic subsystem). The showcase app is comprehensive (70+ pages). But the onboarding surface is messy: broken templates, dead config, duplicate documentation, count inconsistencies.

## Scope

Four workstreams, ordered by criticality:

### 1. Template Repair (Critical)

4 of 5 starter templates use shadcn-svelte compound component patterns (`Card.Root`, `Dialog.Header`) that don't exist in bindrunes. Users who clone them get broken code.

**Work:**
- Rewrite `templates/crud-admin` — replace `Card.Root`/`Card.Header`/`Card.Content` with flat `<Card>`, `Dialog.Root`/`Dialog.Content` with `<Dialog>`, fix `Checkbox` and `Select` APIs
- Rewrite `templates/saas-dashboard` — same Card/Dialog pattern fixes
- Rewrite `templates/ecommerce-storefront` — same Card pattern fixes
- Rewrite `templates/marketing-site` — same Card pattern fixes
- `templates/ai-chatbot` is correct — use as reference pattern
- Add README.md to all 5 templates (what it is, how to run, components used)

**Files per template:** ~5 (package.json, svelte.config, vite.config, +page.svelte, +layout.svelte, README.md)

### 2. Dead Config Cleanup + Export Fixes

**Work:**
- Delete root `vercel.json` (points to non-existent `docs-site/`)
- Add export path for 10 page templates in `packages/bindrunes/package.json` as `bindrunes/layouts` sub-exports (they were supposed to be merged into layouts per architecture doc)
- Reconcile component counts: README, showcase homepage, docs/index, component index — all should use the actual count from the component index

### 3. Documentation Unification

Docs exist in two places: `docs/*.md` (markdown) and `examples/showcase/src/routes/docs/**/*.svelte` (hand-maintained). They can drift.

**Work:**
- Add mdsvex to the showcase app so markdown docs can be rendered directly
- Symlink or copy `docs/*.md` into the showcase's docs routes
- Update showcase docs pages to use mdsvex-rendered content instead of hand-written Svelte

### 4. Polish Pass

**Work:**
- Add tests for 7 untested primitives: BottomSheet, IconCircle, SectionHeading, StackedBar, SwipeableItem, SwipeableList, TimelineItem
- Extract shared `uid()` utility from createWindowStore and useOrchestrator
- Standardize SSR guard pattern to `isBrowser` constant everywhere
- Extract shared token source for Tailwind plugin deduplication

## Non-Goals

- Storybook setup (Phase 2 of growth roadmap)
- Interactive prop playground (future enhancement)
- API reference auto-generation (future enhancement)
- New components or features

## Success Criteria

- All 5 templates clone and run without errors
- All templates have READMEs
- Root vercel.json deleted
- Component counts consistent everywhere
- Showcase docs render from markdown source
- 7 missing test files added
- `uid()` extracted to shared utility
- SSR guards use consistent pattern
