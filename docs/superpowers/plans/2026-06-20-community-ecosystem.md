# Phase 3: Community Ecosystem Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make urupe-ui discoverable, documented, and contributor-friendly.

**Architecture:** Wire existing docs into the docs-site, create migration guides, polish community files.

**Tech Stack:** SvelteKit, Svelte 5, Tailwind CSS v4, urupe-ui components

---

## Current State

- `docs-site/` is a bare shell (single page, no routing)
- `docs/` has 18 raw markdown files not wired into any site
- `packages/bindrunes-kit/docs/` has 7 comprehensive guides
- 3 example apps exist and work (showcase, webapp, landing)
- `CONTRIBUTING.md` is complete
- `CODE_OF_CONDUCT.md` needs `[INSERT CONTACT METHOD]` filled in
- `.github/` has full CI/CD, issue templates, PR template

---

## Task 1: Build Docs Site Structure

**Files:**
- Modify: `docs-site/src/routes/+layout.svelte` (add sidebar navigation)
- Create: `docs-site/src/routes/+layout.ts` (ensure prerender)
- Create: `docs-site/src/lib/docs-navigation.ts` (navigation structure)
- Create: `docs-site/src/routes/docs/+page.svelte` (docs landing)
- Create: `docs-site/src/routes/docs/getting-started/+page.svelte`
- Create: `docs-site/src/routes/docs/architecture/+page.svelte`
- Create: `docs-site/src/routes/docs/components/+page.svelte`
- Create: `docs-site/src/routes/docs/composables/+page.svelte`
- Create: `docs-site/src/routes/docs/design-system/+page.svelte`
- Create: `docs-site/src/routes/docs/security/+page.svelte`
- Create: `docs-site/src/routes/docs/testing/+page.svelte`
- Create: `docs-site/src/routes/kit/+page.svelte` (kit landing)
- Create: `docs-site/src/routes/kit/getting-started/+page.svelte`
- Create: `docs-site/src/routes/kit/full-stack/+page.svelte`
- Create: `docs-site/src/routes/kit/spa-backend/+page.svelte`
- Create: `docs-site/src/routes/kit/auth/+page.svelte`
- Create: `docs-site/src/routes/kit/i18n/+page.svelte`
- Create: `docs-site/src/routes/kit/deployment/+page.svelte`
- Create: `docs-site/src/routes/kit/api-reference/+page.svelte`
- Create: `docs-site/src/routes/examples/+page.svelte` (examples listing)
- Create: `docs-site/src/routes/migration/+page.svelte` (migration landing)

Steps:
1. Read the existing `docs-site/src/routes/+layout.svelte` and `+page.svelte`
2. Create `docs-site/src/lib/docs-navigation.ts` with the full navigation tree
3. Update the layout to include a sidebar with navigation
4. Create all doc routes, converting content from `docs/*.md` and `packages/bindrunes-kit/docs/*.md` into Svelte pages
5. Each page should: read the markdown source, convert to Svelte markup, use urupe-ui components (Card, Badge, etc.) for styling
6. Run: `cd docs-site && bun run check` — expected: no type errors
7. Commit

## Task 2: Create Migration Guides

**Files:**
- Create: `docs-site/src/routes/migration/shadcn-svelte/+page.svelte`
- Create: `docs-site/src/routes/migration/melt-ui/+page.svelte`
- Create: `docs-site/src/routes/migration/skeleton/+page.svelte`

Steps:
1. Read `docs/migration-from-shadcn-svelte.md`, `docs/migration-from-melt-ui.md`, `docs/migration-from-skeleton.md`
2. Read `examples/vico-migration/README.md` for shadcn-svelte migration patterns
3. Create migration guide pages with:
   - Side-by-side comparisons (shadcn vs urupe-ui equivalents)
   - Token mapping tables
   - Component equivalencies
   - Step-by-step migration steps
   - Common pitfalls
4. Run: `cd docs-site && bun run check`
5. Commit

## Task 3: Polish Community Files

**Files:**
- Modify: `CODE_OF_CONDUCT.md` (fill in contact method)
- Modify: `CONTRIBUTING.md` (add quick-start section, dev environment setup)
- Create: `.github/ISSUE_TEMPLATE/config.yml` (optional: add links to docs/discussions)

Steps:
1. Read `CODE_OF_CONDUCT.md`, fill in `[INSERT CONTACT METHOD]` with GitHub issues or email
2. Read `CONTRIBUTING.md`, add a "Quick Start" section at the top with: clone, bun install, bun run dev, open browser
3. Verify `.github/` templates are complete
4. Commit

## Task 4: Add Examples Page to Docs Site

**Files:**
- Create: `docs-site/src/routes/examples/showcase/+page.svelte`
- Create: `docs-site/src/routes/examples/webapp/+page.svelte`
- Create: `docs-site/src/routes/examples/landing/+page.svelte`

Steps:
1. Read each example app's main page to understand what it demonstrates
2. Create docs pages that describe each example, what it demonstrates, and how to run it
3. Link to the source code on GitHub
4. Run: `cd docs-site && bun run check`
5. Commit

## Final Verification

- [ ] Run: `cd docs-site && bun run build` — expected: builds successfully
- [ ] Run: `bun run lint` — expected: no new errors
- [ ] Run: `bun run test` — expected: all tests pass
