# bindrunes v2.0 Architecture Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure bindrunes from 7 unclear categories into a clean 4-layer hierarchy (Primitives > Layouts > Domains > Templates), standardize naming conventions, and clean up exports.

**Architecture:** Move components from `src/components/` to `src/primitives/`, `src/layouts/`, `src/domains/`, and `src/templates/`. Rename all composables from `createX()` to `useX()`. Update all exports to use layer-based paths.

**Tech Stack:** Svelte 5, TypeScript, Vitest, Bun

---

## Phase 1: Foundation - Directory Structure

### Task 1.1: Create New Directory Structure

**Files:**
- Create: `packages/bindrunes/src/primitives/` (directory)
- Create: `packages/bindrunes/src/layouts/` (directory)
- Create: `packages/bindrunes/src/domains/` (directory)
- Create: `packages/bindrunes/src/templates/` (directory)
- Create: `packages/bindrunes/src/playground/` (directory)

- [ ] **Step 1: Create directory structure**

```bash
cd packages/bindrunes/src
mkdir -p primitives layouts domains/templates playground
```

- [ ] **Step 2: Verify directories exist**

```bash
ls -la
```

Expected: See `primitives/`, `layouts/`, `domains/`, `templates/`, `playground/`

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: create new directory structure for v2.0"
```

### Task 1.2: Move Primitives

**Files:**
- Move: `packages/bindrunes/src/components/*.svelte` → `packages/bindrunes/src/primitives/`
- Move: `packages/bindrunes/src/components/*.svelte.test.ts` → `packages/bindrunes/src/primitives/`

- [ ] **Step 1: List all primitive components**

These are standalone UI components with no domain-specific logic:
- Button, Card, Input, Badge, Alert, Tabs, Switch, Select
- Tooltip, Popover, DropdownMenu, Checkbox, RadioGroup
- Slider, DatePicker, TimeField, PinInput, RatingGroup
- FileUpload, RichTextEditor, CodeSnippet
- Skeleton, Spinner, Progress, Avatar, Pagination
- Stepper, Accordion, Collapsible
- Dialog, Sheet, Drawer, AlertDialog, ContextMenu
- NavigationMenu, Breadcrumb, Separator, ScrollArea
- Toggle, ToggleGroup, TagInput, NumberInput, PasswordInput
- Combobox, TreeView, DataGrid, CommandPalette
- OTPInput, ColorPicker

- [ ] **Step 2: Move primitive components**

```bash
cd packages/bindrunes/src
for file in Button Card Input Badge Alert Tabs Switch Select \
  Tooltip Popover DropdownMenu Checkbox RadioGroup \
  Slider DatePicker TimeField PinInput RatingGroup \
  FileUpload RichTextEditor CodeSnippet \
  Skeleton Spinner Progress Avatar Pagination \
  Stepper Accordion Collapsible \
  Dialog Sheet Drawer AlertDialog ContextMenu \
  NavigationMenu Breadcrumb Separator ScrollArea \
  Toggle ToggleGroup TagInput NumberInput PasswordInput \
  Combobox TreeView DataGrid CommandPalette OTPInput ColorPicker; do
  if [ -f "components/${file}.svelte" ]; then
    mv "components/${file}.svelte" "primitives/"
    mv "components/${file}.svelte.test.ts" "primitives/" 2>/dev/null || true
  fi
done
```

- [ ] **Step 3: Verify files moved**

```bash
ls primitives/ | head -20
```

Expected: See moved component files

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: move primitives to src/primitives/"
```

### Task 1.3: Move Layouts

**Files:**
- Move: `packages/bindrunes/src/components/PageShell.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/PageSection.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/MetaContainer.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/MetaLayout.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/MetaScrollable.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/Block.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/ErrorBoundary.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/DynamicIcon.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/LazyLoad.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/ListPage.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/SEO.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/SectionHeader.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/PageHeader.svelte` → `packages/bindrunes/src/layouts/`
- Move: `packages/bindrunes/src/components/dashboard/` → `packages/bindrunes/src/layouts/dashboard/`
- Move: `packages/bindrunes/src/components/sidebar/` → `packages/bindrunes/src/layouts/sidebar/`

- [ ] **Step 1: Move layout components**

```bash
cd packages/bindrunes/src
for file in PageShell PageSection MetaContainer MetaLayout MetaScrollable \
  Block ErrorBoundary DynamicIcon LazyLoad ListPage SEO SectionHeader PageHeader; do
  if [ -f "components/${file}.svelte" ]; then
    mv "components/${file}.svelte" "layouts/"
    mv "components/${file}.svelte.test.ts" "layouts/" 2>/dev/null || true
  fi
done
```

- [ ] **Step 2: Move dashboard and sidebar directories**

```bash
mv components/dashboard/ layouts/
mv components/sidebar/ layouts/
```

- [ ] **Step 3: Verify files moved**

```bash
ls layouts/ | head -20
```

Expected: See layout component files

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: move layouts to src/layouts/"
```

### Task 1.4: Move Domains

**Files:**
- Move: `packages/bindrunes/src/components/landing/` → `packages/bindrunes/src/domains/landing/`
- Move: `packages/bindrunes/src/components/boundrune/` → `packages/bindrunes/src/domains/`
- Move: `packages/bindrunes/src/components/scaffold/` → `packages/bindrunes/src/playground/`

- [ ] **Step 1: Move landing directory**

```bash
cd packages/bindrunes/src
mv components/landing/ domains/
```

- [ ] **Step 2: Move boundrune directory**

```bash
mv components/boundrune/ domains/
```

- [ ] **Step 3: Move scaffold to playground**

```bash
mv components/scaffold/ playground/
```

- [ ] **Step 4: Verify files moved**

```bash
ls domains/
ls playground/
```

Expected: See domain directories and playground files

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: move domains to src/domains/ and scaffold to src/playground/"
```

### Task 1.5: Move Templates

**Files:**
- Move: Page pattern components from `packages/bindrunes/src/domains/boundrune/` → `packages/bindrunes/src/templates/`

- [ ] **Step 1: Identify template components**

These are the pre-composed page patterns:
- DashboardPage → DashboardTemplate
- AuthPage → AuthTemplate
- ChatPage → ChatTemplate
- SettingsPage → SettingsTemplate
- CrudPage → CrudTemplate
- CalendarPage → CalendarTemplate
- EcommercePage → EcommerceTemplate
- MarketingPage → MarketingTemplate
- MediaPage → MediaTemplate
- PortfolioPage → PortfolioTemplate

- [ ] **Step 2: Move template components**

```bash
cd packages/bindrunes/src
for file in DashboardPage AuthPage ChatPage SettingsPage CrudPage \
  CalendarPage EcommercePage MarketingPage MediaPage PortfolioPage; do
  if [ -f "domains/boundrune/${file}.svelte" ]; then
    mv "domains/boundrune/${file}.svelte" "templates/"
    mv "domains/boundrune/${file}.svelte.test.ts" "templates/" 2>/dev/null || true
  fi
done
```

- [ ] **Step 3: Rename template files**

```bash
cd packages/bindrunes/src/templates
for file in DashboardPage AuthPage ChatPage SettingsPage CrudPage \
  CalendarPage EcommercePage MarketingPage MediaPage PortfolioPage; do
  if [ -f "${file}.svelte" ]; then
    mv "${file}.svelte" "$(echo ${file} | sed 's/Page/Template/').svelte"
    mv "${file}.svelte.test.ts" "$(echo ${file} | sed 's/Page/Template/').svelte.test.ts" 2>/dev/null || true
  fi
done
```

- [ ] **Step 4: Verify files moved and renamed**

```bash
ls templates/
```

Expected: See Template files (DashboardTemplate, AuthTemplate, etc.)

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: move and rename templates to src/templates/"
```

### Task 1.6: Clean Up Empty Directories

**Files:**
- Remove: `packages/bindrunes/src/components/` (if empty)

- [ ] **Step 1: Check if components directory is empty**

```bash
ls packages/bindrunes/src/components/
```

- [ ] **Step 2: Remove empty directory if needed**

```bash
if [ -z "$(ls -A packages/bindrunes/src/components/)" ]; then
  rmdir packages/bindrunes/src/components/
fi
```

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "chore: remove empty components directory"
```

---

## Phase 2: Export Restructuring

### Task 2.1: Create Primitives Index

**Files:**
- Create: `packages/bindrunes/src/primitives/index.ts`

- [ ] **Step 1: Create index file**

```typescript
// primitives/index.ts
export { default as Button } from "./Button.svelte";
export { default as Card } from "./Card.svelte";
export { default as Input } from "./Input.svelte";
export { default as Badge } from "./Badge.svelte";
export { default as Alert } from "./Alert.svelte";
export { default as Tabs } from "./Tabs.svelte";
export { default as Switch } from "./Switch.svelte";
export { default as Select } from "./Select.svelte";
// ... continue for all primitives
```

- [ ] **Step 2: Verify exports work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: create primitives index"
```

### Task 2.2: Create Layouts Index

**Files:**
- Create: `packages/bindrunes/src/layouts/index.ts`

- [ ] **Step 1: Create index file**

```typescript
// layouts/index.ts
export { default as PageShell } from "./PageShell.svelte";
export { default as PageSection } from "./PageSection.svelte";
export { default as MetaContainer } from "./MetaContainer.svelte";
export { default as MetaLayout } from "./MetaLayout.svelte";
export { default as MetaScrollable } from "./MetaScrollable.svelte";
export { default as Block } from "./Block.svelte";
// ... continue for all layouts
```

- [ ] **Step 2: Verify exports work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: create layouts index"
```

### Task 2.3: Create Domains Index

**Files:**
- Create: `packages/bindrunes/src/domains/index.ts`

- [ ] **Step 1: Create index file**

```typescript
// domains/index.ts
export * from "./auth/index.ts";
export * from "./chat/index.ts";
export * from "./data/index.ts";
export * from "./landing/index.ts";
export * from "./media/index.ts";
export * from "./calendar/index.ts";
export * from "./ecommerce/index.ts";
export * from "./portfolio/index.ts";
export * from "./settings/index.ts";
export * from "./marketing/index.ts";
```

- [ ] **Step 2: Verify exports work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: create domains index"
```

### Task 2.4: Create Templates Index

**Files:**
- Create: `packages/bindrunes/src/templates/index.ts`

- [ ] **Step 1: Create index file**

```typescript
// templates/index.ts
export { default as DashboardTemplate } from "./DashboardTemplate.svelte";
export { default as AuthTemplate } from "./AuthTemplate.svelte";
export { default as ChatTemplate } from "./ChatTemplate.svelte";
export { default as SettingsTemplate } from "./SettingsTemplate.svelte";
export { default as CrudTemplate } from "./CrudTemplate.svelte";
export { default as CalendarTemplate } from "./CalendarTemplate.svelte";
export { default as EcommerceTemplate } from "./EcommerceTemplate.svelte";
export { default as MarketingTemplate } from "./MarketingTemplate.svelte";
export { default as MediaTemplate } from "./MediaTemplate.svelte";
export { default as PortfolioTemplate } from "./PortfolioTemplate.svelte";
```

- [ ] **Step 2: Verify exports work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: create templates index"
```

### Task 2.5: Update Package.json Exports

**Files:**
- Modify: `packages/bindrunes/package.json`

- [ ] **Step 1: Update exports in package.json**

```json
{
  "exports": {
    ".": {
      "types": "./dist/primitives/index.d.ts",
      "svelte": "./dist/primitives/index.js",
      "default": "./dist/primitives/index.js"
    },
    "./layouts": {
      "types": "./dist/layouts/index.d.ts",
      "svelte": "./dist/layouts/index.js",
      "default": "./dist/layouts/index.js"
    },
    "./domains": {
      "types": "./dist/domains/index.d.ts",
      "svelte": "./dist/domains/index.js",
      "default": "./dist/domains/index.js"
    },
    "./domains/*": {
      "types": "./dist/domains/*/index.d.ts",
      "svelte": "./dist/domains/*/index.js",
      "default": "./dist/domains/*/index.js"
    },
    "./templates": {
      "types": "./dist/templates/index.d.ts",
      "svelte": "./dist/templates/index.js",
      "default": "./dist/templates/index.js"
    },
    "./playground": {
      "types": "./dist/playground/index.d.ts",
      "svelte": "./dist/playground/index.js",
      "default": "./dist/playground/index.js"
    },
    "./tailwind": {
      "types": "./dist/tailwind-plugin.d.ts",
      "default": "./dist/tailwind-plugin.js"
    },
    "./styles/*": {
      "default": "./src/styles/*"
    },
    "./agentic": {
      "types": "./dist/utils/agentic/index.d.ts",
      "svelte": "./dist/utils/agentic/index.js",
      "default": "./dist/utils/agentic/index.js"
    }
  }
}
```

- [ ] **Step 2: Verify exports work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: update package.json exports for v2.0"
```

---

## Phase 3: Naming Standardization

### Task 3.1: Rename Composables

**Files:**
- Rename: `packages/bindrunes/src/utils/createCounter.svelte.ts` → `useCounter.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createQuery.svelte.ts` → `useQuery.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createMutation.svelte.ts` → `useMutation.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createForm.svelte.ts` → `useForm.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createWizard.svelte.ts` → `useWizard.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createTable.svelte.ts` → `useTable.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createAuth.svelte.ts` → `useAuth.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createAccess.svelte.ts` → `useAccess.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createToast.svelte.ts` → `useToast.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createI18n.svelte.ts` → `useI18n.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createDarkMode.svelte.ts` → `useDarkMode.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createTheme.svelte.ts` → `useTheme.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createAesthetic.svelte.ts` → `useAesthetic.svelte.ts`
- Rename: `packages/bindrunes/src/utils/createDensity.svelte.ts` → `useDensity.svelte.ts`

- [ ] **Step 1: Rename files**

```bash
cd packages/bindrunes/src/utils
for file in createCounter createQuery createMutation createForm createWizard \
  createTable createAuth createAccess createToast createI18n createDarkMode \
  createTheme createAesthetic createDensity; do
  if [ -f "${file}.svelte.ts" ]; then
    mv "${file}.svelte.ts" "$(echo ${file} | sed 's/^create/use/').svelte.ts"
  fi
done
```

- [ ] **Step 2: Update exports in index.ts**

Update all imports and exports to use new names.

- [ ] **Step 3: Verify changes work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: rename composables to useX() convention"
```

### Task 3.2: Rename Context Getters

**Files:**
- Modify: `packages/bindrunes/src/layouts/sidebar/sidebar-context.svelte.ts`
- Modify: `packages/bindrunes/src/domains/auth/auth-context.svelte.ts`
- Modify: `packages/bindrunes/src/domains/data/crud-context.svelte.ts`
- Modify: `packages/bindrunes/src/playground/scaffold-context.svelte.ts`
- Modify: `packages/bindrunes/src/domains/landing/landing-context.svelte.ts`

- [ ] **Step 1: Rename context getters**

```bash
cd packages/bindrunes/src
# Rename getSidebarContext() to useSidebar()
sed -i 's/getSidebarContext/useSidebar/g' layouts/sidebar/sidebar-context.svelte.ts

# Rename useAuthProvider() to useAuth()
sed -i 's/useAuthProvider/useAuth/g' domains/auth/auth-context.svelte.ts

# Rename useCrudProvider() to useCrud()
sed -i 's/useCrudProvider/useCrud/g' domains/data/crud-context.svelte.ts

# Rename useDemoState() to useDemo()
sed -i 's/useDemoState/useDemo/g' playground/scaffold-context.svelte.ts

# Rename useLanding() to useLanding() (already correct)
```

- [ ] **Step 2: Update all imports**

Find and update all files that import these context getters.

- [ ] **Step 3: Verify changes work**

```bash
cd packages/bindrunes && bun run check
```

Expected: No TypeScript errors

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: rename context getters to useX() convention"
```

---

## Phase 4: Testing Enhancement

### Task 4.1: Add Visual Regression Tests

**Files:**
- Create: `packages/bindrunes/tests/visual/primitives/button.spec.ts`
- Create: `packages/bindrunes/tests/visual/primitives/card.spec.ts`
- Create: `packages/bindrunes/tests/visual/primitives/input.spec.ts`

- [ ] **Step 1: Create visual test directory**

```bash
cd packages/bindrunes
mkdir -p tests/visual/primitives tests/visual/layouts tests/visual/domains tests/visual/templates
```

- [ ] **Step 2: Create button visual test**

```typescript
// tests/visual/primitives/button.spec.ts
import { test, expect } from "@playwright/test";

test("button variants render correctly", async ({ page }) => {
  await page.goto("/visual/button");
  
  // Test primary variant
  const primaryButton = page.locator('[data-variant="primary"]');
  await expect(primaryButton).toHaveScreenshot("button-primary.png");
  
  // Test secondary variant
  const secondaryButton = page.locator('[data-variant="secondary"]');
  await expect(secondaryButton).toHaveScreenshot("button-secondary.png");
  
  // Test disabled state
  const disabledButton = page.locator('[data-disabled="true"]');
  await expect(disabledButton).toHaveScreenshot("button-disabled.png");
});
```

- [ ] **Step 3: Create card visual test**

```typescript
// tests/visual/primitives/card.spec.ts
import { test, expect } from "@playwright/test";

test("card variants render correctly", async ({ page }) => {
  await page.goto("/visual/card");
  
  // Test surface variant
  const surfaceCard = page.locator('[data-variant="surface"]');
  await expect(surfaceCard).toHaveScreenshot("card-surface.png");
  
  // Test glass variant
  const glassCard = page.locator('[data-variant="glass"]');
  await expect(glassCard).toHaveScreenshot("card-glass.png");
});
```

- [ ] **Step 4: Create input visual test**

```typescript
// tests/visual/primitives/input.spec.ts
import { test, expect } from "@playwright/test";

test("input variants render correctly", async ({ page }) => {
  await page.goto("/visual/input");
  
  // Test default state
  const input = page.locator("input");
  await expect(input).toHaveScreenshot("input-default.png");
  
  // Test focus state
  await input.focus();
  await expect(input).toHaveScreenshot("input-focus.png");
  
  // Test error state
  const errorInput = page.locator('[data-error="true"]');
  await expect(errorInput).toHaveScreenshot("input-error.png");
});
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add visual regression tests for primitives"
```

### Task 4.2: Update Coverage Targets

**Files:**
- Modify: `packages/bindrunes/vitest.config.ts`

- [ ] **Step 1: Update coverage thresholds**

```typescript
// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.svelte.test.ts", "src/**/*.test.ts"],
    environment: "happy-dom",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,svelte}"],
      exclude: ["src/test/**", "src/**/*.test.ts", "src/**/*.d.ts"],
      thresholds: {
        "src/primitives/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        "src/layouts/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        "src/domains/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        "src/templates/**": {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        },
        "src/utils/agentic/**": {
          lines: 95,
          branches: 90,
          functions: 92,
          statements: 95
        },
        global: {
          lines: 90,
          branches: 85,
          functions: 88,
          statements: 90
        }
      }
    }
  }
});
```

- [ ] **Step 2: Verify tests pass**

```bash
cd packages/bindrunes && bun run test
```

Expected: All tests pass

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "test: update coverage targets for v2.0"
```

---

## Phase 5: Documentation Update

### Task 5.1: Update Architecture Docs

**Files:**
- Modify: `docs/architecture.md`
- Modify: `docs/components.md`
- Modify: `docs/composables.md`

- [ ] **Step 1: Update architecture.md**

Update the directory structure, layer definitions, and naming conventions.

- [ ] **Step 2: Update components.md**

Update component organization and import paths.

- [ ] **Step 3: Update composables.md**

Update composable naming conventions.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "docs: update documentation for v2.0 architecture"
```

---

## Verification

After completing all tasks, run:

```bash
cd packages/bindrunes
bun run check    # TypeScript check
bun run test     # Run tests
bun run build    # Build library
```

All should pass without errors.
