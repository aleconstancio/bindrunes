# Design: Documentation Audit & Rewrite

## Problem

The bindrunes documentation has drifted significantly from the codebase reality:

1. **Count contradictions**: README says "200+", AGENTS.md says "170+", index.md says "239 components, 33 composables, 13 domain categories" — all different.
2. **Missing package**: `bindrunes-kit` (SvelteKit meta-framework) is not mentioned in root docs, README, or AGENTS.md.
3. **Missing agentic components**: 9 copilot components exist in `src/domains/agentic/` but are undocumented. The agentic overview says "Public metacomponents ship in future releases" — they already shipped.
4. **Missing agentic subsystem modules**: orchestrator, eviction, persistence, compaction are implemented but undocumented.
5. **Missing composables**: `createSessionMonitor`, `createMultiTenant` are exported but not in composables.md.
6. **Scope expansion**: Components from Siren and Vico (personal projects) are partially merged, more incoming.
7. **Stale AGENTS.md**: No routing for kit docs, agentic copilot, or migration guides.

## Approach: Domain-Organized

Reorganize `docs/` by audience/use-case with logical groupings. Consolidate kit docs from `packages/bindrunes-kit/docs/` into root `docs/kit/`.

## New Directory Structure

```
docs/
├── index.md                    # Landing page with accurate counts + links to all sections
├── getting-started.md          # Install, setup, fonts, troubleshooting
├── design-system.md            # Three axes, tokens, custom themes/aesthetics
├── components.md               # All component references (4 layers) + agentic copilot
├── component-states.md         # Visual state specs
├── composables.md              # All composable APIs (with missing composables added)
├── landing.md                  # Landing page primitives & MarketingTemplate
├── boundrunes.md               # Domain component catalog
├── architecture.md             # Four-layer hierarchy, file map, conventions
├── testing.md                  # Vitest, vitest-axe, coverage
├── security.md                 # Auth, XSS, CSRF, CSP
├── kit/                        # bindrunes-kit (moved from packages/bindrunes-kit/docs/)
│   ├── index.md                # Kit overview & quick start (NEW)
│   ├── getting-started.md      # (moved from packages/bindrunes-kit/docs/)
│   ├── full-stack.md
│   ├── spa-backend.md
│   ├── auth.md
│   ├── i18n.md
│   └── deployment.md
├── agentic/                    # Expanded agentic section
│   ├── overview.md             # REWRITTEN: kernel + copilot components + Siren/Vico
├── adr/                        # Architecture Decision Records (unchanged)
│   ├── 001-three-orthogonal-axes.md
│   └── 002-valibot-over-zod.md
├── migration/                  # Relocated migration guides
│   ├── from-shadcn-svelte.md   # (moved from docs/migration-from-shadcn-svelte.md)
│   ├── from-melt-ui.md
│   └── from-skeleton.md
└── superpowers/                # Specs & plans (existing, untouched)
```

## Files to Create

| File | Purpose |
|------|---------|
| `docs/kit/index.md` | bindrunes-kit overview, quick start, links to sub-docs |

## Files to Move

| From | To |
|------|-----|
| `packages/bindrunes-kit/docs/getting-started.md` | `docs/kit/getting-started.md` |
| `packages/bindrunes-kit/docs/full-stack.md` | `docs/kit/full-stack.md` |
| `packages/bindrunes-kit/docs/spa-backend.md` | `docs/kit/spa-backend.md` |
| `packages/bindrunes-kit/docs/auth.md` | `docs/kit/auth.md` |
| `packages/bindrunes-kit/docs/i18n.md` | `docs/kit/i18n.md` |
| `packages/bindrunes-kit/docs/deployment.md` | `docs/kit/deployment.md` |
| `docs/migration-from-shadsn-svelte.md` | `docs/migration/from-shadcn-svelte.md` |
| `docs/migration-from-melt-ui.md` | `docs/migration/from-melt-ui.md` |
| `docs/migration-from-skeleton.md` | `docs/migration/from-skeleton.md` |

## Files to Rewrite

### README.md
- Count actual components/composables from source
- Add bindrunes-kit section with `npx create-bindrunes` quick start
- Add agentic copilot mention
- Update export paths table
- Fix all doc links to new paths

### AGENTS.md
- Update counts
- Add bindrunes-kit architecture rules
- Add agentic copilot conventions
- Add Siren/Vico migration context
- Update routing table to match new docs structure
- Expand agentic coverage section (orchestrator, eviction, persistence, compaction)

### docs/index.md
- Rewrite as documentation landing page
- Accurate counts from source
- Links to all sections including kit/
- Mention Siren/Vico components

### docs/agentic/overview.md
- Remove "Internal kernel landed in v1.0.1" status
- Document 9 copilot components (CopilotChainProgress, CopilotContextSidebar, CopilotInput, CopilotMessageList, CopilotStreamIndicator, CopilotSuggestionCard, CopilotToolPanel, DebateHistoryTree, InteractiveCitations)
- Document orchestrator, eviction, persistence, compaction modules
- Note Siren/Vico origin and partial migration status

### docs/components.md
- Add agentic copilot components section under Domains
- Verify all components from source are listed

### docs/composables.md
- Add `createSessionMonitor`
- Add `createMultiTenant`
- Verify composable count

### docs/landing.md
- Fix internal links if any

### docs/boundrunes.md
- Add agentic copilot components to the chat domain section

## Files to Fix (Links Only)

- `docs/migration/from-shadcn-svelte.md` — fix any internal cross-references
- `docs/migration/from-melt-ui.md` — fix any internal cross-references
- `docs/migration/from-skeleton.md` — fix any internal cross-references
- `CONTRIBUTING.md` — update file paths if referenced

## Content Rules

1. **No invented data**: Count components/composables from actual source files, not guesses.
2. **Accurate counts everywhere**: README, AGENTS.md, index.md must all show the same numbers.
3. **Siren/Vico context**: Note origin of migrated components but don't expose internal project names in user-facing docs — use "contributed by" or "originally from" language.
4. **No emoji** in documentation files (per repo convention).
5. **Cross-reference integrity**: Every link in every doc must resolve to an existing file.

## Execution Phases

### Phase 1: Structure (no content changes)
- Create `docs/kit/` and `docs/migration/` directories
- Move files (git mv)
- Create `docs/kit/index.md`

### Phase 2: Core accuracy
- Count components/composables from source
- Update README.md
- Rewrite AGENTS.md
- Rewrite docs/index.md
- Update all cross-references

### Phase 3: Missing content
- Rewrite docs/agentic/overview.md
- Add copilot components to docs/components.md
- Add missing composables to docs/composables.md
- Verify all component listings

### Phase 4: Cleanup
- Fix migration guide links
- Verify all doc links resolve
- Update CONTRIBUTING.md if needed

Each phase is a separate commit.
