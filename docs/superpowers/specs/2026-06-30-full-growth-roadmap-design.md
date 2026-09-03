# Full Growth Roadmap — urupe-ui

**Date:** 2026-06-30
**Status:** Draft
**Scope:** All tiers (P0–P3), phased execution
**Constraint:** Aggressive pace, no existing users to protect

---

## Executive Summary

urupe-ui is technically excellent (255 components, 82 composables, 126 visual combos) but invisible. This roadmap converts technical quality into adoption and revenue across 4 phases.

**Phase 1 (Week 1–2):** Visibility — hosted playground, npm README, public agentic docs
**Phase 2 (Week 3–4):** Quality — Storybook, accessibility audit
**Phase 3 (Week 5–8):** Revenue — template marketplace (5 templates), Figma design system
**Phase 4 (Week 9–12):** Scale — kit v1.0, multi-framework token port, enterprise features

---

## Phase 1: Visibility (Weeks 1–2)

**Goal:** Anyone who finds urupe-ui can try it in 30 seconds and understand what makes it unique.

### 1.1 Hosted Interactive Playground

**Problem:** Playground components exist in `src/playground/` but aren't published or hosted. Nobody can try the library without cloning the repo.

**Approach:** Deploy the `docs-site` to Vercel with the playground embedded as a route. The playground already has `DemoLayout`, `ComponentRegistry`, `PropControls`, `CodePreview`, `ResponsiveFrame`.

**Implementation:**

- Create a new Vercel project `urupe-ui-playground` (or add to existing docs-site)
- Add `/playground` route to `docs-site` that renders the Playground component
- The playground loads components from the built `dist/` via dynamic imports
- Deploy preview URLs on every PR for instant visual verification
- Add a "Try it" link to the npm README pointing to the playground

**Files affected:**
- `docs-site/src/routes/playground/+page.svelte` (new)
- `docs-site/src/routes/playground/+page.server.ts` (new, for component registry data)
- `packages/bindrunes/src/playground/index.ts` (ensure exports are complete)
- `docs-site/svelte.config.js` (verify adapter-vercel config)

**Success criteria:**
- `https://bindrunes.dev/playground` loads in <3s
- All 84 primitives are browsable with prop controls
- Code preview shows copy-paste Svelte snippets
- Responsive frame shows mobile/tablet/desktop views

### 1.2 npm README Overhaul

**Problem:** The npm page is the #1 discovery channel. Current README is functional but not compelling — no screenshots, no comparison, no "why this over alternatives."

**Approach:** Rewrite README.md with:
- Hero banner screenshot (126 combos grid image)
- Quick start code (3 snippets: install, layout, first component)
- Feature matrix comparison table (vs shadcn-svelte, Skeleton, Melt UI)
- Bundle size badges (already tracked via size-limit)
- Links to playground, docs, migration guides
- "Who's using this" section (empty, ready for social proof)

**Files affected:**
- `README.md` (rewrite)

**Success criteria:**
- npm page renders badges, comparison table, and code snippets
- README conveys value proposition in <10 seconds of reading

### 1.3 Public Agentic Kernel Documentation

**Problem:** The agentic subsystem (`src/utils/agentic/`) is the strongest differentiator but is documented as "internal-only." No public API docs, no tutorial.

**Approach:**
- Write a "Build a Copilot in 5 Minutes" tutorial in `docs/agentic/`
- Publish `AgentRuntime`, `WindowStore`, `TokenBudget`, `Orchestrator` as public API
- Add agentic examples to the playground (CopilotMessageList, CopilotInput, CopilotStreamIndicator)
- Create a dedicated agentic landing section in the docs

**Files affected:**
- `docs/agentic/overview.md` (expand with public API reference)
- `docs/agentic/build-a-copilot.md` (new tutorial)
- `docs/agentic/api-reference.md` (new, detailed API docs)
- `packages/bindrunes/src/utils/agentic/index.ts` (ensure all exports are public)
- Playground: add agentic component demos

**Success criteria:**
- A developer can follow the tutorial and have a working copilot UI in 5 minutes
- All agentic types and composables are documented with examples

### 1.4 Vercel Deployment & CI Integration

**Problem:** No Vercel project exists for urupe-ui. Need to set up automated deployment.

**Approach:**
- User provides `VERCEL_TOKEN` (required — not found in Vico project)
- Create Vercel project linked to the monorepo
- Add GitHub Action workflow for preview deployments on PRs
- Add production deployment on push to main

**Files affected:**
- `.github/workflows/vercel.yml` (new)
- `vercel.json` (new, at monorepo root)
- `docs-site/vercel.json` (adapter config if needed)

**Success criteria:**
- Every PR gets a preview URL in the GitHub check
- `main` branch auto-deploys to production

---

## Phase 2: Quality (Weeks 3–4)

**Goal:** 126 visual combinations are verified automatically. Accessibility is auditable.

### 2.1 Storybook Setup

**Problem:** No interactive component explorer. The playground is component-focused but not a proper Storybook with argTypes, controls, docs, and visual testing integration.

**Approach:** Install Storybook 8 for Svelte with the following config:
- Autodetect stories from `src/**/*.stories.ts`
- Each primitive gets a story with all variants
- Domain components get stories with mock data
- Theme switcher addon for live theme/aesthetic/density switching
- Accessibility addon for real-time a11y checks
- Viewport addon for responsive testing

**Files affected:**
- `.storybook/main.ts` (new)
- `.storybook/preview.ts` (new, with theme decorators)
- `src/primitives/*.stories.ts` (new, 84 files)
- `src/domains/**/*.stories.ts` (new, ~50 files for key domains)
- `package.json` (add storybook deps to devDependencies)

**Success criteria:**
- `bun run storybook` launches with all primitives browsable
- Theme/aesthetic/density switcher works live in the toolbar
- Each story shows prop controls, a11y results, and code snippets

### 2.2 Visual Regression Testing (Chromatic) — REMOVED

**Status:** Removed — going solo with Storybook a11y addon and manual testing.

The Storybook a11y addon provides real-time accessibility checks. Visual regression testing can be added later if needed via Percy, BackstopJS, or Playwright screenshot comparisons.

### 2.3 Accessibility Audit & VPAT

**Problem:** Components pass `vitest-axe` checks but there's no formal WCAG 2.1 AA audit or published VPAT/ACR document.

**Approach:**
- Run axe-core automated scan across all components (via Storybook a11y addon)
- Manual audit of critical flows: auth forms, data tables, navigation, dialogs
- Publish `docs/accessibility.md` with findings and compliance status
- Create VPAT 2.4 document for enterprise procurement
- Add `aria-label` props where missing (found: 7 components already have them)

**Files affected:**
- `docs/accessibility.md` (new)
- `docs/VPAT-2.4.md` (new)
- Components with a11y gaps (identified during audit)

**Success criteria:**
- Zero critical axe violations across all components
- VPAT document available for enterprise buyers
- WCAG 2.1 AA compliance declared with caveats

---

## Phase 3: Revenue (Weeks 5–8)

**Goal:** Paid templates generate revenue. Design system is enterprise-ready.

### 3.1 Template Marketplace (5 Templates)

**Problem:** No proof that urupe-ui works end-to-end for real applications. No revenue stream.

**Approach:** Create 5 production-quality templates as free showcase projects (no payment integration):

| Template | Target |
|----------|--------|
| **SaaS Dashboard** | Admin panels, internal tools |
| **AI Chatbot** | AI-powered apps, copilots |
| **E-commerce Storefront** | Online stores, product catalogs |
| **Marketing Site** | Landing pages, SaaS marketing |
| **CRUD Admin** | Data management, user admin |

Each template:
- Full SvelteKit app using `urupe-ui` + `bindrunes-kit`
- Deployed as live demo on Vercel
- Includes auth, dashboard, settings, responsive design
- Documented with setup instructions
- Ships with TypeScript, tests, and CI config

**Files affected:**
- `templates/saas-dashboard/` (new workspace)
- `templates/ai-chatbot/` (new workspace)
- `templates/ecommerce-storefront/` (new workspace)
- `templates/marketing-site/` (new workspace)
- `templates/crud-admin/` (new workspace)
- `package.json` (add `templates/*` to workspaces)
- `turbo.json` (add template build tasks)

**Success criteria:**
- 5 templates live with demo URLs
- Each template builds, passes lint, and passes type check
- Each template is documented with setup instructions

### 3.2 Figma Design System

**Problem:** Design teams can't collaborate with engineering without a design source of truth. Enterprise buyers ask "where's the Figma?"

**Approach:** Create a Figma file with:
- All design tokens as Figma variables (mapped from CSS custom properties)
- Component variants matching Svelte component props
- Auto-layout for responsive components
- Dark/light mode variants per theme
- Documentation pages with usage guidelines

**Deliverables:**
- `docs/figma-link.md` — Public link to the Figma file
- Token sync script: reads CSS tokens, generates Figma variable definitions
- Component parity checklist: maps Figma components to Svelte components

**Files affected:**
- `docs/figma-link.md` (new)
- `scripts/figma-sync.mjs` (new, optional automation)
- `docs/figma-parity.md` (new, component mapping)

**Success criteria:**
- Figma file covers all primitives and key domain components
- Token variables match CSS custom properties 1:1
- Public link is shared in README and docs

### 3.3 Migration Guide Expansion

**Problem:** Migration guides exist for shadcn-svelte, Melt UI, and Skeleton. Missing: Bootstrap, Ant Design, Material UI — the largest migration pools.

**Approach:** Write migration guides for:
- Bootstrap → urupe-ui (largest pool, most migration pain)
- Ant Design → urupe-ui (enterprise React users considering Svelte)
- Material UI → urupe-ui (largest design system by adoption)

Each guide:
- Component-by-component mapping table
- Token/variable translation table
- Code examples showing before/after
- Common pitfalls and workarounds

**Files affected:**
- `docs/migration/from-bootstrap.md` (new)
- `docs/migration/from-ant-design.md` (new)
- `docs/migration/from-material-ui.md` (new)
- `docs-site/src/lib/navigation.ts` (add new migration pages)

**Success criteria:**
- Each guide has ≥10 component mappings
- Code examples are copy-pasteable and tested

---

## Phase 4: Scale (Weeks 9–12)

**Goal:** Kit is production-ready. Design system is framework-agnostic. Enterprise features are available.

### 4.1 bindrunes-kit v1.0

**Problem:** Kit is v0.1.1 — pre-1.0 signals instability. Missing: database adapters, more deploy targets, production auth flows.

**Approach:**
- Stabilize API surface (no breaking changes after v1.0)
- Add Drizzle and Prisma database adapters (alongside existing `defineSchema`)
- Add AWS (Lambda + API Gateway) and GCP (Cloud Run) adapter configs
- Add production auth flows: magic link, passkey/WebAuthn, session refresh
- Add rate limiting middleware with Redis adapter
- Write comprehensive kit documentation (expand existing 8 docs)
- Add integration tests for each adapter

**Files affected:**
- `packages/bindrunes-kit/src/adapters/aws.ts` (new)
- `packages/bindrunes-kit/src/adapters/gcp.ts` (new)
- `packages/bindrunes-kit/src/server/db-drizzle.ts` (new)
- `packages/bindrunes-kit/src/server/db-prisma.ts` (new)
- `packages/bindrunes-kit/src/server/auth-passkey.ts` (new)
- `packages/bindrunes-kit/src/server/auth-magic-link.ts` (new)
- `packages/bindrunes-kit/src/server/rate-limit-redis.ts` (new)
- `packages/bindrunes-kit/package.json` (version bump to 1.0.0)
- `docs/kit/` (expand all 8 docs, add new pages)

**Success criteria:**
- Kit v1.0.0 published to npm
- All adapters have integration tests
- Auth flows are documented with examples
- Zero known breaking changes from v0.1.1

### 4.2 Multi-Framework Design Token Port

**Problem:** The three-axis design system is CSS-based and framework-agnostic, but only ships as Svelte components. React/Next.js teams can't use it.

**Approach:** Extract the CSS token system into a framework-agnostic package:
- `@bindrunes/tokens` — Pure CSS custom properties, no framework dependency
- `@bindrunes/tokens-react` — React provider component that injects tokens
- `@bindrunes/tokens-vue` — Vue plugin that injects tokens
- Publish token packages to npm

This captures the design system TAM without requiring a full component rewrite.

**Files affected:**
- `packages/tokens/` (new package)
- `packages/tokens-react/` (new package)
- `packages/tokens-vue/` (new package)
- `package.json` (add new workspaces)

**Success criteria:**
- `@bindrunes/tokens` installs and injects all 126 combos via CSS
- React and Vue packages work with a 3-line setup
- Token packages are <5kB gzipped

### 4.3 Enterprise Features

**Problem:** No enterprise-tier features. No way to monetize beyond templates.

**Approach:** Ship enterprise features as premium additions:
- **Role-based component access** — Components that render differently based on user roles (admin vs viewer)
- **Audit logging** — Component interaction logging for compliance
- **SSO integration** — Pre-built SSO flows for Okta, Azure AD, Google Workspace
- **SLA guarantees** — Priority support, guaranteed response times
- **Custom theme creation** — White-glove theme creation service

**Files affected:**
- `docs/enterprise.md` (new, pricing and features page)
- `packages/bindrunes/src/utils/useAuditLog.svelte.ts` (new)
- `packages/bindrunes-kit/src/server/auth-sso.ts` (new)

**Success criteria:**
- Enterprise page lists features and pricing
- Audit log composable works with sample dashboard
- SSO adapter supports Okta and Azure AD

---

## Cross-Cutting Concerns

### CI/CD Pipeline Updates

Each phase adds to the CI pipeline:

| Phase | Additions |
|-------|-----------|
| Phase 1 | Vercel preview deploys, playground build verification |
| Phase 2 | a11y checks in CI |
| Phase 3 | Template build verification, Figma token sync check |
| Phase 4 | Kit integration tests, multi-package publish pipeline |

### Documentation Updates

Each phase updates docs:

| Phase | Documentation |
|-------|---------------|
| Phase 1 | README rewrite, agentic public API docs |
| Phase 2 | Accessibility docs, VPAT |
| Phase 3 | Migration guides, Figma link |
| Phase 4 | Kit v1.0 docs, enterprise docs, token framework docs |

### Testing Strategy

| Phase | Testing |
|-------|---------|
| Phase 1 | Existing vitest coverage (90%+ agentic, 85%+ global) |
| Phase 2 | a11y (axe-core via Storybook addon) |
| Phase 3 | Template integration tests, purchase flow tests |
| Phase 4 | Kit adapter integration tests, token package tests |

---

## Risk Register

| Risk | Phase | Likelihood | Impact | Mitigation |
|------|-------|------------|--------|------------|
| Vercel token not available | 1 | Low | Medium | Ask user directly |
| Storybook Svelte 5 compatibility issues | 2 | Medium | High | Check Storybook 8 Svelte support; fall back to Ladle |
| Template quality insufficient | 3 | Medium | High | Use existing examples as base; iterate |
| Kit v1.0 breaking changes | 4 | Low | High | API review before version bump |
| Token package bundle size | 4 | Low | Low | CSS-only, no JS runtime |

---

## Success Metrics

| Metric | Baseline | Phase 1 | Phase 2 | Phase 3 | Phase 4 |
|--------|----------|---------|---------|---------|---------|
| npm weekly downloads | ~0 | 10 | 50 | 200 | 500 |
| GitHub stars | Unknown | +20 | +50 | +100 | +200 |
| Playground sessions/week | 0 | 50 | 200 | 500 | 1000 |
| Template demos live | 0 | 0 | 0 | 5 | 5 |
| Enterprise inquiries | 0 | 0 | 0 | 1 | 5 |

---

## Dependency Graph

```
Phase 1 (Visibility)
  ├── 1.4 Vercel deployment ←── needs VERCEL_TOKEN from user
  ├── 1.1 Playground ──────←── depends on 1.4
  ├── 1.2 README overhaul ─←── depends on 1.1 (needs playground URL)
  └── 1.3 Agentic docs ────←── independent

Phase 2 (Quality) ────────←── can start after 1.4
  ├── 2.1 Storybook ───────←── independent
  └── 2.3 Accessibility ───←── depends on 2.1

Phase 3 (Revenue) ────────←── can start after Phase 2
  ├── 3.1 Templates ───────←── independent
  ├── 3.2 Figma ───────────←── independent
  └── 3.3 Migration guides ←── independent

Phase 4 (Scale) ──────────←── can start after Phase 3
  ├── 4.1 Kit v1.0 ────────←── independent
  ├── 4.2 Token port ──────←── independent
  └── 4.3 Enterprise ──────←── depends on 4.1
```

---

## Appendix: Existing State

### What Already Works
- 255 production Svelte components across 13 domains
- 82+ composables (useX/createX pattern)
- 126 visual combinations (6 themes × 7 aesthetics × 3 densities)
- Agentic copilot kernel (window stores, token budgets, orchestration)
- bindrunes-kit with auth, CRUD, i18n, adapters, CLI
- CI: lint, typecheck, build, test, size-limit, CodeQL
- 3 example apps (showcase, webapp, landing)
- Documentation site (SvelteKit + Vercel)
- Playground components (not hosted)

### What's Missing
- Hosted playground
- Interactive component explorer (Storybook)
- Formal accessibility audit
- Paid templates
- Figma design system
- Enterprise features
- Multi-framework token packages
