# Changelog

## 1.1.0

### Minor Changes

- [`3b29071`](https://github.com/aleconstancio/bindrunes/commit/3b29071655f5af32b8ed498abf1c116cb9a283dd) Thanks [@aleconstancio](https://github.com/aleconstancio)! - Added shared meta-component pragmas: `createMetaContext`, `readonlyGetters`, `MetaLayout`, `MetaContainer`, `MetaScrollable`. Refactored sidebar, landing, and dashboard subsystems to use shared pragmas.

- [`667158b`](https://github.com/aleconstancio/bindrunes/commit/667158b98646e10977bc14ff42cf2f32963c6069) Thanks [@aleconstancio](https://github.com/aleconstancio)! - Comprehensive hardening across 5 waves: accessibility (Drawer focus trap, ariaLabel props on 7 components), coverage (15 new test files, +83 tests), performance (EventCalendar map optimization, Cart/OrderSummary derived consolidation), DX (10 domain-specific boundrune entry points, 15 per-component deep import paths, types conditions on all exports), and code quality (shadow tokens, toError adoption, immutable mode removal). Adds StepperStep type export, unhandledrejection listener to ErrorBoundary, and bundle size CI check.

## 1.0.1

### Patch Changes

- **Agentic Chat Kernel**: Landed the internal-only agentic-chat kernel (`src/utils/agentic/` and `src/types/agent.ts`) with core composables (`createWindowStore`, `createTokenBudget`, `createConversationBranches`), simulator runtime, and comprehensive tests.
- **Repository Hardening**: Added `SECURITY.md`, `LICENSE`, Dependabot, and CodeQL workflows. Streamlined build scripts, updated editor configurations, and pinned environment engines.
