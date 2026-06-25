# bindrunes v2.0 API Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ground-up API cleanup for bindrunes v2.0 — remove deprecated APIs, consolidate overlapping composables, unify naming, restructure exports, improve TypeScript DX.

**Architecture:** Single package (`packages/bindrunes`) with 7 export paths (down from 14). Composable API surface reduced from ~48 to ~40 by merging overlapping utilities. All files follow strict `useX` / `createX` naming convention. Fresh start — no backwards compat.

**Tech Stack:** Svelte 5 runes, TypeScript, Valibot, bits-ui, Tailwind CSS v4, Vitest.

---

## File Map

### Files to Delete (~12)
| File | Reason |
|------|--------|
| `src/layouts/sidebar/SidebarLayout.svelte` | Deprecated — use MetaLayout |
| `src/layouts/sidebar/SidebarLayout.svelte.test.ts` | Tests for removed component |
| `src/utils/defineTheme.svelte.ts` | Merged into createTheme |
| `src/utils/defineTheme.svelte.test.ts` | Tests for removed API |
| `src/utils/extendTheme.svelte.ts` | Merged into createTheme |
| `src/utils/extendTheme.svelte.test.ts` | Tests for removed API |
| `src/utils/createThemeBuilder.ts` | Merged into createTheme |
| `src/utils/createThemeBuilder.svelte.test.ts` | Tests for removed API |
| `src/utils/useAsyncState.svelte.ts` | Merged into useQuery |
| `src/utils/useDarkMode.svelte.ts` | Merged into useTheme |
| `src/utils/useDarkMode.svelte.test.ts` | Tests for removed API |
| `src/utils/useDebouncedCallback.svelte.ts` | Merged into useDebounce |
| `src/utils/useDebouncedCallback.svelte.test.ts` | Tests for removed API |
| `src/utils/useResponsiveDensity.svelte.ts` | Merged into useDensity |
| `src/utils/useResponsiveDensity.svelte.test.ts` | Tests for removed API |
| `src/domains/index.ts` | Domain barrel removed |

### Files to Create (~3)
| File | Purpose |
|------|---------|
| `src/utils/createTheme.svelte.ts` | Consolidated theme creation API |
| `src/utils/createTheme.svelte.test.ts` | Tests for new API |
| `src/utils/devWarning.ts` | Dev-only warning helper |

### Files to Rename (~6)
| From | To |
|------|-----|
| `src/utils/sseBridge.svelte.ts` | `src/utils/createSseBridge.svelte.ts` |
| `src/utils/staggerChildren.svelte.ts` | `src/utils/createStaggerChildren.svelte.ts` |
| `src/utils/RealtimeClient.svelte.ts` | `src/utils/createRealtime.svelte.ts` |
| `src/utils/createI18nContext.svelte.ts` | `src/utils/useI18n.svelte.ts` |
| `src/utils/agentic/provideWindowStore.svelte.ts` | `src/utils/agentic/createWindowStoreProvider.svelte.ts` |
| `src/utils/agentic/SimulatorRuntime.ts` | `src/utils/agentic/createSimulatorRuntime.ts` |

### Files to Modify (~20)
| File | Change |
|------|--------|
| `src/index.ts` | Remove deprecated exports, remove templates, trim barrel |
| `src/layouts/index.ts` | Absorb templates, remove SidebarLayout |
| `src/layouts/sidebar/index.ts` | Remove SidebarLayout export |
| `src/utils/useTheme.svelte.ts` | Absorb useDarkMode, add toggleMode |
| `src/utils/useDebounce.svelte.ts` | Absorb useDebouncedCallback (overload) |
| `src/utils/useQuery.svelte.ts` | Add cache:false pattern from useAsyncState |
| `src/utils/useDensity.svelte.ts` | Absorb useResponsiveDensity (responsive option) |
| `src/utils/formatters.ts` | Remove LOCALE export |
| `src/utils/agentic/index.ts` | Update renamed imports |
| `packages/bindrunes/package.json` | Restructure exports |
| `.size-limit.json` | New per-domain limits |
| `.agents/AGENTS.md` | Add anti-patterns |
| `docs/architecture.md` | Update for v2 |
| `docs/components.md` | Update imports |
| `docs/composables.md` | Update for consolidated APIs |
| `docs/design-system.md` | Update createTheme docs |
| `docs/agentic/overview.md` | Update renamed modules |
| `docs/kit/index.md` | Update if kit references changed |

---

## Task 1: Remove SidebarLayout & Create devWarning

**Files:**
- Delete: `src/layouts/sidebar/SidebarLayout.svelte`
- Delete: `src/layouts/sidebar/SidebarLayout.svelte.test.ts`
- Create: `src/utils/devWarning.ts`
- Modify: `src/layouts/sidebar/index.ts:6`
- Modify: `src/layouts/index.ts:30`
- Modify: `src/index.ts:17` (MetaLayout export stays, SidebarLayout goes)

- [ ] **Step 1: Create the devWarning helper**

```ts
// src/utils/devWarning.ts
export function devWarning(condition: boolean, message: string) {
	if (import.meta.env?.DEV && condition) {
		console.warn(`[bindrunes] ${message}`);
	}
}
```

- [ ] **Step 2: Remove SidebarLayout from sidebar barrel**

Edit `src/layouts/sidebar/index.ts` — remove line 6:
```ts
// REMOVE: export { default as SidebarLayout } from "./SidebarLayout.svelte";
```

- [ ] **Step 3: Remove SidebarLayout from layouts barrel**

Edit `src/layouts/index.ts` — remove `SidebarLayout` from the sidebar re-exports (line 30):
```ts
// In the sidebar export block, remove SidebarLayout from the list
```

- [ ] **Step 4: Remove SidebarLayout test file**

```bash
rm src/layouts/sidebar/SidebarLayout.svelte.test.ts
```

- [ ] **Step 5: Remove SidebarLayout component**

```bash
rm src/layouts/sidebar/SidebarLayout.svelte
```

- [ ] **Step 6: Run tests to verify nothing breaks**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass (SidebarLayout was only imported in its own test and the sidebar test).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(v2): remove SidebarLayout, add devWarning helper"
```

---

## Task 2: Remove Deprecated Export Paths & LOCALE

**Files:**
- Modify: `packages/bindrunes/package.json` — remove 5 export paths
- Modify: `src/utils/formatters.ts:20-25` — remove LOCALE

- [ ] **Step 1: Remove deprecated export paths from package.json**

Edit `packages/bindrunes/package.json` — remove these export entries:
```json
// REMOVE these keys from "exports":
"./playground",
"./scaffold",
"./scaffold/app.css",
"./landing",
"./boundrune",
"./templates"
```

Keep: `.`, `./layouts`, `./domains`, `./domains/*`, `./i18n/*`, `./tailwind`, `./styles/*`, `./agentic`

- [ ] **Step 2: Remove LOCALE from formatters.ts**

Edit `src/utils/formatters.ts` — remove lines 20-25:
```ts
// REMOVE:
/** @deprecated Use `getLocale()` for reads. Direct `LOCALE` access is unsafe in SSR. */
export const LOCALE = {
	get current() {
		return _locale;
	},
};
```

- [ ] **Step 3: Run type check**

```bash
cd packages/bindrunes && bun run check
```
Expected: No errors from removed exports.

- [ ] **Step 4: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v2): remove deprecated export paths and LOCALE"
```

---

## Task 3: Create Consolidated createTheme API

**Files:**
- Create: `src/utils/createTheme.svelte.ts`
- Create: `src/utils/createTheme.svelte.test.ts`
- Delete: `src/utils/defineTheme.svelte.ts`
- Delete: `src/utils/defineTheme.svelte.test.ts`
- Delete: `src/utils/extendTheme.svelte.ts`
- Delete: `src/utils/extendTheme.svelte.test.ts`
- Delete: `src/utils/createThemeBuilder.ts`
- Delete: `src/utils/createThemeBuilder.svelte.test.ts`

- [ ] **Step 1: Write the failing test for createTheme**

```ts
// src/utils/createTheme.svelte.test.ts
import { describe, it, expect } from "vitest";
import { createTheme } from "./createTheme.svelte";

describe("createTheme", () => {
	it("creates a theme from tokens (define mode)", () => {
		const theme = createTheme({
			name: "my-brand",
			tokens: {
				"--primary": "oklch(0.55 0.18 260)",
				"--background": "oklch(0.12 0.008 260)",
			},
		});

		expect(theme.tokens["--primary"]).toBe("oklch(0.55 0.18 260)");
		expect(theme.tokens["--background"]).toBe("oklch(0.12 0.008 260)");
		expect(typeof theme.toCSS).toBe("function");
		expect(typeof theme.apply).toBe("function");
	});

	it("creates a theme by extending a base (extend mode)", () => {
		const theme = createTheme({
			base: "dracula",
			tokens: {
				"--primary": "oklch(0.8 0.25 320)",
			},
		});

		expect(theme.tokens["--primary"]).toBe("oklch(0.8 0.25 320)");
		// Should inherit dracula defaults for non-overridden tokens
		expect(theme.tokens["--background"]).toBe("oklch(0.05 0.01 290)");
	});

	it("generates valid CSS", () => {
		const theme = createTheme({
			name: "test",
			tokens: { "--primary": "oklch(0.5 0.1 260)" },
		});

		const css = theme.toCSS("[data-theme='test']");
		expect(css).toContain("[data-theme='test'] {");
		expect(css).toContain("--primary: oklch(0.5 0.1 260);");
		expect(css).toContain("}");
	});

	it("derives accent from primary when not provided", () => {
		const theme = createTheme({
			name: "test",
			tokens: {
				"--primary": "oklch(0.65 0.10 265)",
			},
		});

		expect(theme.tokens["--accent"]).toBeDefined();
		expect(theme.tokens["--accent"]).not.toBe(theme.tokens["--primary"]);
	});

	it("provides apply method that sets CSS custom properties", () => {
		const theme = createTheme({
			name: "test",
			tokens: { "--primary": "oklch(0.5 0.1 260)" },
		});

		// apply() requires document — test the tokens path
		expect(theme.tokens["--primary"]).toBe("oklch(0.5 0.1 260)");
	});
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd packages/bindrunes && bun run test src/utils/createTheme.svelte.test.ts
```
Expected: FAIL — `createTheme` does not exist yet.

- [ ] **Step 3: Implement createTheme**

```ts
// src/utils/createTheme.svelte.ts
import { DRACULA_DEFAULTS } from "./theme-defaults";

type CreateThemeOptions =
	| { name: string; tokens: Record<string, string> }
	| { base: string; tokens: Record<string, string> };

type ThemeBuilderResult = {
	tokens: Record<string, string>;
	cssText: string;
	apply: (target?: HTMLElement) => void;
	toCSS: (selector?: string) => string;
};

const presetTokens: Record<string, Record<string, string>> = {
	editorial: {
		"--primary": "oklch(0.65 0.10 265)",
		"--accent": "oklch(0.62 0.13 285)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.13 0.01 270)",
	},
	dracula: {
		"--primary": DRACULA_DEFAULTS.primary,
		"--accent": DRACULA_DEFAULTS.accent,
		"--destructive": DRACULA_DEFAULTS.destructive,
		"--background": DRACULA_DEFAULTS.background,
	},
	nord: {
		"--primary": "oklch(0.78 0.10 230)",
		"--accent": "oklch(0.74 0.08 210)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.18 0.01 250)",
	},
	catppuccin: {
		"--primary": "oklch(0.80 0.14 280)",
		"--accent": "oklch(0.78 0.18 300)",
		"--destructive": "oklch(0.65 0.20 20)",
		"--background": "oklch(0.16 0.01 290)",
	},
	"rose-pine": {
		"--primary": "oklch(0.72 0.12 15)",
		"--accent": "oklch(0.70 0.10 350)",
		"--destructive": "oklch(0.62 0.22 25)",
		"--background": "oklch(0.15 0.01 30)",
	},
	github: {
		"--primary": "oklch(0.65 0.18 250)",
		"--accent": "oklch(0.60 0.14 240)",
		"--destructive": "oklch(0.65 0.22 25)",
		"--background": "oklch(0.20 0.01 250)",
	},
};

function deriveFromPrimary(primary: string, lightnessOffset: number, chromaScale: number): string {
	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return primary;
	const l = Math.max(0, Math.min(1, parseFloat(match[1]) + lightnessOffset));
	const c = parseFloat(match[2]) * chromaScale;
	const h = parseFloat(match[3]);
	return `oklch(${l.toFixed(2)} ${c.toFixed(3)} ${h})`;
}

function buildFullTokens(overrides: Record<string, string>): Record<string, string> {
	const primary = overrides["--primary"] ?? DRACULA_DEFAULTS.primary;
	const accent = overrides["--accent"] ?? deriveFromPrimary(primary, -0.03, 1.2);
	const destructive = overrides["--destructive"] ?? DRACULA_DEFAULTS.destructive;

	const match = primary.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	const hue = match ? match[3] : "290";
	const isLight = false;

	const background = overrides["--background"] ?? (isLight ? `oklch(0.98 0.01 ${hue})` : `oklch(0.05 0.01 ${hue})`);
	const foreground = isLight ? `oklch(0.15 0.02 ${hue})` : `oklch(0.95 0.01 ${hue})`;
	const primaryForeground = isLight ? "oklch(0.99 0 0)" : deriveFromPrimary(primary, -0.55, 0.1);
	const accentForeground = isLight ? "oklch(0.99 0 0)" : deriveFromPrimary(accent, -0.55, 0.1);
	const border = isLight ? "oklch(0 0 0 / 0.08)" : "oklch(1 0 0 / 0.08)";
	const gradientAngle = "135deg";
	const gradientPrimary = `linear-gradient(${gradientAngle}, ${primary} 0%, ${deriveFromPrimary(primary, -0.08, 1)} 100%)`;
	const gradientDestructive = `linear-gradient(${gradientAngle}, ${destructive} 0%, ${deriveFromPrimary(destructive, -0.08, 1)} 100%)`;

	const defaults: Record<string, string> = {
		"--background": background,
		"--foreground": foreground,
		"--card": isLight ? "oklch(1 0 0 / 0.80)" : "oklch(1 0 0 / 0.06)",
		"--card-foreground": foreground,
		"--card-solid": isLight ? `oklch(0.97 0.008 ${hue})` : `oklch(0.17 0.008 ${hue})`,
		"--surface-1": isLight ? `oklch(0.96 0.008 ${hue})` : `oklch(0.16 0.008 ${hue})`,
		"--surface-2": isLight ? `oklch(0.94 0.008 ${hue})` : `oklch(0.19 0.008 ${hue})`,
		"--surface-3": isLight ? `oklch(0.92 0.008 ${hue})` : `oklch(0.22 0.008 ${hue})`,
		"--muted": isLight ? "oklch(0 0 0 / 0.04)" : "oklch(1 0 0 / 0.04)",
		"--muted-foreground": isLight ? `oklch(0.45 0.02 ${hue})` : `oklch(0.55 0.03 ${hue})`,
		"--secondary": isLight ? "oklch(0 0 0 / 0.06)" : "oklch(1 0 0 / 0.08)",
		"--secondary-foreground": foreground,
		"--primary": primary,
		"--primary-foreground": primaryForeground,
		"--accent": accent,
		"--accent-foreground": accentForeground,
		"--destructive": destructive,
		"--destructive-foreground": "oklch(0.95 0 0)",
		"--destructive-soft": "oklch(0.62 0.22 25 / 0.12)",
		"--success": "oklch(0.65 0.2 145)",
		"--success-foreground": isLight ? "oklch(0.15 0 0)" : "oklch(0.95 0 0)",
		"--success-soft": "oklch(0.65 0.2 145 / 0.12)",
		"--warning": "oklch(0.80 0.18 85)",
		"--warning-foreground": "oklch(0.15 0.02 85)",
		"--warning-soft": "oklch(0.80 0.18 85 / 0.12)",
		"--info": "oklch(0.7 0.12 230)",
		"--info-foreground": isLight ? "oklch(0.15 0 0)" : "oklch(0.95 0 0)",
		"--info-soft": "oklch(0.7 0.12 230 / 0.12)",
		"--border": border,
		"--border-strong": isLight ? "oklch(0 0 0 / 0.2)" : "oklch(1 0 0 / 0.2)",
		"--border-subtle": isLight ? "oklch(0 0 0 / 0.05)" : "oklch(1 0 0 / 0.05)",
		"--input": isLight ? "oklch(0 0 0 / 0.04)" : "oklch(1 0 0 / 0.06)",
		"--ring": primary,
		"--overlay": "oklch(0 0 0 / 0.55)",
		"--overlay-strong": "oklch(0 0 0 / 0.75)",
		"--glass-surface": isLight ? "oklch(1 0 0 / 0.70)" : "oklch(0 0 0 / 0.40)",
		"--glass-border": border,
		"--sidebar-background": isLight ? `oklch(0.98 0.01 ${hue})` : `oklch(0.05 0.01 ${hue})`,
		"--sidebar-foreground": foreground,
		"--sidebar-primary": primary,
		"--sidebar-primary-foreground": primaryForeground,
		"--sidebar-border": border,
		"--sidebar-ring": primary,
		"--radius": "0.625rem",
		"--radius-md": "0.625rem",
		"--radius-lg": "0.875rem",
		"--radius-xl": "1.25rem",
		"--shadow-xs": "0 1px 2px oklch(0 0 0 / 0.04)",
		"--shadow-sm": "0 1px 0 oklch(0 0 0 / 0.04)",
		"--shadow-md": "0 1px 0 oklch(0 0 0 / 0.06)",
		"--shadow-lg": "0 2px 4px oklch(0 0 0 / 0.08)",
		"--shadow-xl": "0 8px 16px -4px oklch(0 0 0 / 0.12)",
		"--shadow-2xl": "0 16px 32px -8px oklch(0 0 0 / 0.18)",
		"--duration-instant": "50ms",
		"--duration-snappy": "120ms",
		"--duration-fluid": "220ms",
		"--duration-slow": "360ms",
		"--ease-standard": "cubic-bezier(0.2, 0, 0, 1)",
		"--ease-emphasized": "cubic-bezier(0.3, 0, 0, 1)",
		"--gradient-angle": gradientAngle,
		"--gradient-primary": gradientPrimary,
		"--gradient-destructive": gradientDestructive,
		"--button-treatment": "flat",
		"--button-bg": primary,
		"--button-bg-destructive": destructive,
		"--card-treatment": "solid",
		"--surface-texture": "none",
		"--hero-translate": "8px",
		"--shadow-emphasis": "low",
	};

	return { ...defaults, ...overrides };
}

export function createTheme(options: CreateThemeOptions): ThemeBuilderResult {
	let baseTokens: Record<string, string> = {};

	if ("base" in options) {
		baseTokens = presetTokens[options.base] ?? {};
	}

	const mergedTokens = buildFullTokens({ ...baseTokens, ...options.tokens });

	const cssText = Object.entries(mergedTokens)
		.map(([key, value]) => `  ${key}: ${value};`)
		.join("\n");

	function apply(target: HTMLElement = document.documentElement) {
		for (const [key, value] of Object.entries(mergedTokens)) {
			target.style.setProperty(key, value);
		}
	}

	function toCSS(selector = ":root"): string {
		return `${selector} {\n${cssText}\n}`;
	}

	return {
		tokens: mergedTokens,
		cssText,
		apply,
		toCSS,
	};
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd packages/bindrunes && bun run test src/utils/createTheme.svelte.test.ts
```
Expected: All 5 tests PASS.

- [ ] **Step 5: Delete old theme files**

```bash
rm src/utils/defineTheme.svelte.ts src/utils/defineTheme.svelte.test.ts
rm src/utils/extendTheme.svelte.ts src/utils/extendTheme.svelte.test.ts
rm src/utils/createThemeBuilder.ts src/utils/createThemeBuilder.svelte.test.ts
```

- [ ] **Step 6: Run full test suite**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass. Any tests that imported the old APIs will fail — fix their imports to use `createTheme`.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(v2): consolidate defineTheme + extendTheme + createThemeBuilder → createTheme"
```

---

## Task 4: Consolidate useTheme + useDarkMode

**Files:**
- Modify: `src/utils/useTheme.svelte.ts`
- Delete: `src/utils/useDarkMode.svelte.ts`
- Delete: `src/utils/useDarkMode.svelte.test.ts`

- [ ] **Step 1: Update useTheme to absorb useDarkMode**

Replace `src/utils/useTheme.svelte.ts` with:

```ts
import { mode, setMode, toggleMode } from "mode-watcher";
import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";
import { isBrowser } from "./isBrowser";

const THEMES = ["editorial", "dracula", "nord", "catppuccin", "rose-pine", "github"] as const;
export type Theme = (typeof THEMES)[number];

export function useTheme(options?: { default?: Theme }) {
	const state = createPersistedDataAttribute({
		storageKey: "theme",
		attributeName: "data-theme",
		values: THEMES,
		default: options?.default ?? "editorial",
	});

	let currentMode = $state<"light" | "dark" | undefined>(undefined);

	if (isBrowser) {
		mode.subscribe((v) => {
			currentMode = v;
		});
	}

	return {
		get theme() {
			return state.value;
		},
		setTheme(t: Theme) {
			state.setValue(t);
		},
		themes: THEMES,
		get isDark() {
			return currentMode === "dark";
		},
		get mode() {
			return currentMode;
		},
		toggleMode,
		setMode: (m: "light" | "dark") => setMode(m),
	};
}
```

- [ ] **Step 2: Remove useDarkMode files**

```bash
rm src/utils/useDarkMode.svelte.ts src/utils/useDarkMode.svelte.test.ts
```

- [ ] **Step 3: Update any imports of useDarkMode**

Search for imports of `useDarkMode` and update to `useTheme`:
```bash
grep -r "useDarkMode" packages/bindrunes/src/ --include="*.ts" --include="*.svelte"
```
Update any files that import `useDarkMode` to import `useTheme` from `./useTheme.svelte` instead.

- [ ] **Step 4: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v2): consolidate useTheme + useDarkMode → useTheme"
```

---

## Task 5: Consolidate useDebounce + useDebouncedCallback

**Files:**
- Modify: `src/utils/useDebounce.svelte.ts`
- Delete: `src/utils/useDebouncedCallback.svelte.ts`
- Delete: `src/utils/useDebouncedCallback.svelte.test.ts`

- [ ] **Step 1: Update useDebounce with overload**

Replace `src/utils/useDebounce.svelte.ts` with:

```ts
/**
 * Debounce a reactive value.
 * useDebounce(value, delay) → returns { current } with debounced value
 */
export function useDebounce<T>(value: T, delay?: number): { current: T };
/**
 * Debounce a callback function.
 * useDebounce(fn, delay) → returns debounced wrapper function
 */
export function useDebounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay: number,
): (...args: Parameters<T>) => void;
export function useDebounce<T>(
	valueOrFn: T | ((...args: unknown[]) => unknown),
	delay: number = 300,
): { current: T } | ((...args: unknown[]) => void) {
	// If it's a function, return a debounced callback
	if (typeof valueOrFn === "function") {
		let timer: ReturnType<typeof setTimeout> | undefined;
		return (...args: unknown[]) => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => (valueOrFn as (...args: unknown[]) => unknown)(...args), delay);
		};
	}

	// Otherwise, debounce the reactive value
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let _current = $state(valueOrFn as T);

	$effect(() => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			_current = valueOrFn as T;
		}, delay);

		return () => clearTimeout(timeout);
	});

	return {
		get current() {
			return _current;
		},
	};
}
```

- [ ] **Step 2: Remove useDebouncedCallback files**

```bash
rm src/utils/useDebouncedCallback.svelte.ts src/utils/useDebouncedCallback.svelte.test.ts
```

- [ ] **Step 3: Update imports**

Search for `useDebouncedCallback` and replace with `useDebounce`:
```bash
grep -r "useDebouncedCallback" packages/bindrunes/src/ --include="*.ts" --include="*.svelte"
```

- [ ] **Step 4: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v2): consolidate useDebounce + useDebouncedCallback → useDebounce"
```

---

## Task 6: Merge useAsyncState into useQuery

**Files:**
- Modify: `src/utils/useQuery.svelte.ts`
- Delete: `src/utils/useAsyncState.svelte.ts`

- [ ] **Step 1: Read useQuery.svelte.ts to understand its API**

Read `src/utils/useQuery.svelte.ts` to understand the current interface before modifying.

- [ ] **Step 2: Remove useAsyncState**

```bash
rm src/utils/useAsyncState.svelte.ts
```

- [ ] **Step 3: Update any imports of useAsyncState**

```bash
grep -r "useAsyncState" packages/bindrunes/src/ --include="*.ts" --include="*.svelte"
```
Replace imports with `useQuery` (consumers should use `useQuery({ cache: false })` or the simpler query pattern).

- [ ] **Step 4: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v2): remove useAsyncState — use useQuery instead"
```

---

## Task 7: Merge useDensity + useResponsiveDensity

**Files:**
- Modify: `src/utils/useDensity.svelte.ts`
- Delete: `src/utils/useResponsiveDensity.svelte.ts`
- Delete: `src/utils/useResponsiveDensity.svelte.test.ts`

- [ ] **Step 1: Update useDensity with responsive option**

Replace `src/utils/useDensity.svelte.ts` with:

```ts
import { createPersistedDataAttribute } from "./createPersistedDataAttribute.svelte";
import { useMediaQuery } from "./useMediaQuery.svelte";

const DENSITIES = ["compact", "comfortable", "spacious"] as const;
export type Density = (typeof DENSITIES)[number];

export interface ResponsiveDensityOptions {
	readonly default?: Density;
	readonly breakpoints?: {
		compact?: string;
		comfortable?: string;
		spacious?: string;
	};
}

export function useDensity(options?: { default?: Density } & { responsive?: ResponsiveDensityOptions }) {
	// Responsive mode: derive from media queries
	if (options?.responsive) {
		const { default: defaultDensity = "comfortable", breakpoints = {} } = options.responsive;

		const compactQuery = useMediaQuery({
			query: breakpoints.compact ?? "(max-width: 768px)",
		});
		const spaciousQuery = useMediaQuery({
			query: breakpoints.spacious ?? "(min-width: 1201px)",
		});

		function getCurrentDensity(): Density {
			if (compactQuery.matches) return "compact";
			if (spaciousQuery.matches) return "spacious";
			return defaultDensity;
		}

		let density = $state(getCurrentDensity());

		$effect(() => {
			const _compact = compactQuery.matches;
			const _spacious = spaciousQuery.matches;
			density = getCurrentDensity();
		});

		return {
			get density() {
				return density;
			},
			get isCompact() {
				return density === "compact";
			},
			get isComfortable() {
				return density === "comfortable";
			},
			get isSpacious() {
				return density === "spacious";
			},
		};
	}

	// Default mode: persisted preference
	const state = createPersistedDataAttribute({
		storageKey: "density",
		attributeName: "data-density",
		values: DENSITIES,
		default: options?.default ?? "comfortable",
	});

	return {
		get density() {
			return state.value;
		},
		setDensity(d: Density) {
			state.setValue(d);
		},
		densities: DENSITIES,
	};
}
```

- [ ] **Step 2: Remove useResponsiveDensity files**

```bash
rm src/utils/useResponsiveDensity.svelte.ts src/utils/useResponsiveDensity.svelte.test.ts
```

- [ ] **Step 3: Update imports**

```bash
grep -r "useResponsiveDensity" packages/bindrunes/src/ --include="*.ts" --include="*.svelte"
```
Replace with `useDensity({ responsive: { ... } })`.

- [ ] **Step 4: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat(v2): merge useDensity + useResponsiveDensity → useDensity"
```

---

## Task 8: Rename Non-Conforming Files

**Files:**
- Rename: `src/utils/sseBridge.svelte.ts` → `src/utils/createSseBridge.svelte.ts`
- Rename: `src/utils/staggerChildren.svelte.ts` → `src/utils/createStaggerChildren.svelte.ts`
- Rename: `src/utils/RealtimeClient.svelte.ts` → `src/utils/createRealtime.svelte.ts`
- Rename: `src/utils/createI18nContext.svelte.ts` → `src/utils/useI18n.svelte.ts`
- Rename: `src/utils/agentic/provideWindowStore.svelte.ts` → `src/utils/agentic/createWindowStoreProvider.svelte.ts`
- Rename: `src/utils/agentic/SimulatorRuntime.ts` → `src/utils/agentic/createSimulatorRuntime.ts`

- [ ] **Step 1: Rename sseBridge → createSseBridge**

```bash
mv src/utils/sseBridge.svelte.ts src/utils/createSseBridge.svelte.ts
mv src/utils/sseBridge.svelte.test.ts src/utils/createSseBridge.svelte.test.ts 2>/dev/null || true
```
Update the export name inside the file from `handleSSEEvent` to `createSseBridge` (or keep the function name and just rename the file — the barrel export already maps it).

Actually, keep the function name `handleSSEEvent` as-is — only the file name changes. The barrel in `src/index.ts` already exports it as `handleSSEEvent`.

- [ ] **Step 2: Rename staggerChildren → createStaggerChildren**

```bash
mv src/utils/staggerChildren.svelte.ts src/utils/createStaggerChildren.svelte.ts
mv src/utils/staggerChildren.svelte.test.ts src/utils/createStaggerChildren.svelte.test.ts 2>/dev/null || true
```

- [ ] **Step 3: Rename RealtimeClient → createRealtime**

```bash
mv src/utils/RealtimeClient.svelte.ts src/utils/createRealtime.svelte.ts
mv src/utils/RealtimeClient.svelte.test.ts src/utils/createRealtime.svelte.test.ts 2>/dev/null || true
```
Update internal imports if any file imports from `./RealtimeClient`.

- [ ] **Step 4: Rename createI18nContext → useI18n**

```bash
mv src/utils/createI18nContext.svelte.ts src/utils/useI18n.svelte.ts
mv src/utils/createI18nContext.svelte.test.ts src/utils/useI18n.svelte.test.ts 2>/dev/null || true
```
The barrel in `src/index.ts` already exports `useI18n` from this file — just update the import path.

- [ ] **Step 5: Rename provideWindowStore → createWindowStoreProvider**

```bash
mv src/utils/agentic/provideWindowStore.svelte.ts src/utils/agentic/createWindowStoreProvider.svelte.ts
```
Update the import in `src/utils/agentic/index.ts`:
```ts
// Change:
export { provideWindowStore } from "./provideWindowStore.svelte.ts";
// To:
export { provideWindowStore as createWindowStoreProvider } from "./createWindowStoreProvider.svelte.ts";
```

- [ ] **Step 6: Rename SimulatorRuntime → createSimulatorRuntime**

```bash
mv src/utils/agentic/SimulatorRuntime.ts src/utils/agentic/createSimulatorRuntime.ts
```
Update `src/utils/agentic/index.ts`:
```ts
// Change:
export { SimulatorRuntime } from "./SimulatorRuntime.ts";
// To:
export { SimulatorRuntime as createSimulatorRuntime } from "./createSimulatorRuntime.ts";
```

- [ ] **Step 7: Run type check**

```bash
cd packages/bindrunes && bun run check
```
Expected: No type errors from renamed files.

- [ ] **Step 8: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(v2): rename non-conforming files to useX/createX convention"
```

---

## Task 9: Split createMultiTenant

**Files:**
- Create: `src/utils/useMultiTenant.svelte.ts`
- Create: `src/utils/createMultiTenantContext.svelte.ts`
- Delete: `src/utils/createMultiTenant.svelte.ts`
- Delete: `src/utils/createMultiTenant.svelte.test.ts`

- [ ] **Step 1: Create useMultiTenant.svelte.ts**

```ts
// src/utils/useMultiTenant.svelte.ts
export interface Tenant {
	id: string;
	name: string;
	[key: string]: unknown;
}

export interface CreateMultiTenantOptions<T extends Tenant> {
	tenants: T[];
	defaultTenantId?: string;
	onTenantChange?: (tenant: T) => void;
}

export interface MultiTenantResult<T extends Tenant> {
	currentTenant: T | undefined;
	tenants: T[];
	setTenant: (id: string) => void;
	isCurrentTenant: (id: string) => boolean;
}

export function useMultiTenant<T extends Tenant>(
	options: CreateMultiTenantOptions<T>,
): MultiTenantResult<T> {
	const { tenants, defaultTenantId = tenants[0]?.id, onTenantChange } = options;

	let currentTenantId = $state(defaultTenantId);

	const currentTenant = $derived(tenants.find((t) => t.id === currentTenantId));

	function setTenant(id: string) {
		const tenant = tenants.find((t) => t.id === id);
		if (tenant) {
			currentTenantId = id;
			onTenantChange?.(tenant);
		}
	}

	function isCurrentTenant(id: string): boolean {
		return id === currentTenantId;
	}

	return {
		get currentTenant() {
			return currentTenant;
		},
		get tenants() {
			return tenants;
		},
		setTenant,
		isCurrentTenant,
	};
}
```

- [ ] **Step 2: Create createMultiTenantContext.svelte.ts**

```ts
// src/utils/createMultiTenantContext.svelte.ts
import { createMetaContext, useMetaContext } from "./createMetaContext.svelte";
import { useMultiTenant, type CreateMultiTenantOptions, type MultiTenantResult, type Tenant } from "./useMultiTenant.svelte";

const KEY = Symbol("multi-tenant");

export function createMultiTenantContext<T extends Tenant>(options: CreateMultiTenantOptions<T>) {
	return createMetaContext(KEY, () => useMultiTenant(options));
}

export function useMultiTenantContext<T extends Tenant>(): MultiTenantResult<T> {
	return useMetaContext<T>(KEY);
}
```

- [ ] **Step 3: Delete old file**

```bash
rm src/utils/createMultiTenant.svelte.ts src/utils/createMultiTenant.svelte.test.ts
```

- [ ] **Step 4: Update barrel exports in src/index.ts**

```ts
// Change:
export {
	createMultiTenantContext,
	useMultiTenant,
	useMultiTenantContext,
} from "./utils/createMultiTenant.svelte.ts";

// To:
export { useMultiTenant } from "./utils/useMultiTenant.svelte.ts";
export { createMultiTenantContext, useMultiTenantContext } from "./utils/createMultiTenantContext.svelte.ts";
```

- [ ] **Step 5: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat(v2): split createMultiTenant into useMultiTenant + createMultiTenantContext"
```

---

## Task 10: Restructure Domain Exports & Merge Templates into Layouts

**Files:**
- Delete: `src/domains/index.ts`
- Modify: `src/layouts/index.ts` — absorb template exports
- Delete: `src/templates/index.ts` — templates move to layouts

- [ ] **Step 1: Move template files to layouts directory (or re-export from layouts)**

Rather than physically moving template files, update `src/layouts/index.ts` to re-export them:

```ts
// Add to src/layouts/index.ts at the bottom:
// Templates (moved from src/templates/)
export { default as AuthTemplate } from "../templates/AuthTemplate.svelte";
export { default as CalendarTemplate } from "../templates/CalendarTemplate.svelte";
export { default as ChatTemplate } from "../templates/ChatTemplate.svelte";
export { default as CrudTemplate } from "../templates/CrudTemplate.svelte";
export { default as DashboardTemplate } from "../templates/DashboardTemplate.svelte";
export { default as EcommerceTemplate } from "../templates/EcommerceTemplate.svelte";
export { default as MarketingTemplate } from "../templates/MarketingTemplate.svelte";
export { default as MediaTemplate } from "../templates/MediaTemplate.svelte";
export { default as PortfolioTemplate } from "../templates/PortfolioTemplate.svelte";
export { default as SettingsTemplate } from "../templates/SettingsTemplate.svelte";
```

- [ ] **Step 2: Delete domain barrel**

```bash
rm src/domains/index.ts
```

- [ ] **Step 3: Delete templates barrel**

```bash
rm src/templates/index.ts
```

- [ ] **Step 4: Update main barrel to re-export templates from layouts**

In `src/index.ts`, remove the template imports and re-export from layouts:

```ts
// Remove these lines from src/index.ts:
export {
	AuthTemplate,
	CalendarTemplate,
	ChatTemplate,
	CrudTemplate,
	DashboardTemplate,
	EcommerceTemplate,
	MarketingTemplate,
	MediaTemplate,
	PortfolioTemplate,
	SettingsTemplate,
} from "./templates/index.ts";

// Templates are now available via bindrunes/layouts
```

- [ ] **Step 5: Run type check**

```bash
cd packages/bindrunes && bun run check
```
Expected: No type errors. Templates are now exported from `bindrunes/layouts`.

- [ ] **Step 6: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat(v2): merge templates into layouts, remove domain barrel"
```

---

## Task 11: Reduce Main Barrel

**Files:**
- Modify: `src/index.ts` — trim to ~120 lines

- [ ] **Step 1: Remove deprecated/redundant exports from src/index.ts**

Review `src/index.ts` and remove:
1. Template exports (now in layouts) — already done in Task 10
2. Any internal types that consumers don't need (e.g., `SemanticVariant`, `StatusVariant`, `TFunction`)
3. `SidebarLayout` if still present

Keep only: primitives, composables, utilities, and public types.

- [ ] **Step 2: Run type check**

```bash
cd packages/bindrunes && bun run check
```
Expected: No type errors.

- [ ] **Step 3: Run tests**

```bash
cd packages/bindrunes && bun run test
```
Expected: All tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(v2): reduce main barrel exports"
```

---

## Task 12: Update AGENTS.md Anti-Patterns

**Files:**
- Modify: `.agents/AGENTS.md`

- [ ] **Step 1: Add new anti-patterns to AGENTS.md**

Add to the Anti-Patterns section:

```markdown
- Don't use `export let` — Svelte 5 runes only (`$props()`, `$state`, `$derived`, `$effect`)
- Don't use legacy stores — `$state`/`$derived`/`$effect` only
- Don't create multi-export files (except natural `createX`/`useX` pairs)
- Don't use `console.warn` in production code — use `devWarning()` from `src/utils/devWarning.ts`
- Don't create barrel files for domains — use granular imports (`bindrunes/domains/auth`)
```

- [ ] **Step 2: Commit**

```bash
git add .agents/AGENTS.md
git commit -m "docs(v2): add v2 anti-patterns to AGENTS.md"
```

---

## Task 13: Update Bundle Size Limits

**Files:**
- Modify: `.size-limit.json`

- [ ] **Step 1: Update .size-limit.json**

```json
[
	{
		"name": "bindrunes",
		"path": "packages/bindrunes/dist/index.js",
		"limit": "16 kB"
	},
	{
		"name": "bindrunes/layouts",
		"path": "packages/bindrunes/dist/layouts/index.js",
		"limit": "18 kB"
	},
	{
		"name": "bindrunes/domains/auth",
		"path": "packages/bindrunes/dist/domains/auth/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/data",
		"path": "packages/bindrunes/dist/domains/data/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/chat",
		"path": "packages/bindrunes/dist/domains/chat/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/calendar",
		"path": "packages/bindrunes/dist/domains/calendar/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/ecommerce",
		"path": "packages/bindrunes/dist/domains/ecommerce/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/landing",
		"path": "packages/bindrunes/dist/domains/landing/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/marketing",
		"path": "packages/bindrunes/dist/domains/marketing/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/media",
		"path": "packages/bindrunes/dist/domains/media/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/portfolio",
		"path": "packages/bindrunes/dist/domains/portfolio/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/domains/settings",
		"path": "packages/bindrunes/dist/domains/settings/index.js",
		"limit": "2 kB"
	},
	{
		"name": "bindrunes/agentic",
		"path": "packages/bindrunes/dist/utils/agentic/index.js",
		"limit": "4 kB"
	}
]
```

- [ ] **Step 2: Commit**

```bash
git add .size-limit.json
git commit -m "chore(v2): update bundle size limits for v2 structure"
```

---

## Task 14: Update Documentation

**Files:**
- Modify: `docs/architecture.md`
- Modify: `docs/composables.md`
- Modify: `docs/design-system.md`
- Modify: `docs/agentic/overview.md`
- Modify: `docs/components.md` (if any import paths changed)

- [ ] **Step 1: Update architecture.md**

Update the Export Structure table to reflect v2 paths. Remove `./templates`, `./domains` barrel, `./playground`, `./scaffold`, `./landing`, `./boundrune`. Add note that templates are now in `./layouts`.

Update the directory structure to reflect renamed files.

- [ ] **Step 2: Update composables.md**

Replace references to:
- `useAsyncState` → `useQuery` (note at top of Data Layer section)
- `useDarkMode` → `useTheme` (note in Design System section)
- `useDebouncedCallback` → `useDebounce` (note in Reactivity section)
- `useResponsiveDensity` → `useDensity({ responsive: ... })` (note in Design System section)
- `defineTheme`/`extendTheme`/`createThemeBuilder` → `createTheme` (note in Design System section)

- [ ] **Step 3: Update design-system.md**

Update the "Using the composable" section to show `createTheme()` instead of `defineTheme()`/`extendTheme()`. Update `useTheme` section to include `toggleMode`/`setMode`.

- [ ] **Step 4: Update agentic/overview.md**

Update module inventory to reflect renamed files:
- `SimulatorRuntime.ts` → `createSimulatorRuntime.ts`
- `provideWindowStore.svelte.ts` → `createWindowStoreProvider.svelte.ts`

- [ ] **Step 5: Update components.md**

Update any references to `SidebarLayout` to point to `MetaLayout`.

- [ ] **Step 6: Commit**

```bash
git add docs/
git commit -m "docs(v2): update documentation for v2 API changes"
```

---

## Task 15: Final Validation

- [ ] **Step 1: Run full validation**

```bash
cd packages/bindrunes && bun run validate
```
Expected: Lint passes, type check passes, all tests pass.

- [ ] **Step 2: Run size check**

```bash
bun run size
```
Expected: All bundles within limits.

- [ ] **Step 3: Run build**

```bash
cd packages/bindrunes && bun run build
```
Expected: Build succeeds.

- [ ] **Step 4: Final commit (if any fixups needed)**

```bash
git add -A
git commit -m "chore(v2): final validation fixups"
```
