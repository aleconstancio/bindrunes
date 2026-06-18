import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import "./helpers/polyfills";

vi.mock("esm-env", () => ({ BROWSER: false, DEV: false, NODE: true }));

vi.mock("svelte-sonner", () => ({
	Toaster: (() => "") as unknown as typeof import("svelte-sonner").Toaster,
	toast: {
		error: vi.fn(),
		success: vi.fn(),
		info: vi.fn(),
		warning: vi.fn(),
	},
}));

vi.mock("mode-watcher", () => ({
	ModeWatcher: (() => "") as unknown as typeof import("mode-watcher").ModeWatcher,
	mode: { current: "dark" },
	theme: { current: "dark" },
	toggleMode: vi.fn(),
	setMode: vi.fn(),
	resetMode: vi.fn(),
	modeStorageKey: "mode",
	themeStorageKey: "theme",
	userPrefersMode: "dark",
	systemPrefersMode: "dark",
	generateSetInitialModeExpression: vi.fn(),
}));

const iconFn = (() => "") as unknown as (() => string) & { size: number };
iconFn.size = 16;

const lucideProxy = new Proxy(
	{},
	{
		get: (_target, _prop) => iconFn,
	},
);

vi.mock("lucide-svelte", () => lucideProxy);
