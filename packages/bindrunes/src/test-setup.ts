import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import "./helpers/polyfills";

// Wrap setTimeout to ignore callbacks scheduled during tests that fire after environment teardown
const originalSetTimeout = globalThis.setTimeout;
const wrappedSetTimeout = (cb: (...args: any[]) => void, delay?: number, ...args: any[]) => {
	return originalSetTimeout(() => {
		if (typeof document !== "undefined" && document.body) {
			cb(...args);
		}
	}, delay);
};
globalThis.setTimeout = wrappedSetTimeout as any;
if (typeof window !== "undefined") {
	(window as any).setTimeout = wrappedSetTimeout;
}

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

vi.mock("mode-watcher", () => {
	const modeValue = { current: "dark" };
	return {
		ModeWatcher: (() => "") as unknown as typeof import("mode-watcher").ModeWatcher,
		mode: {
			...modeValue,
			subscribe: (fn: (v: unknown) => void) => {
				fn(modeValue.current);
				return () => {};
			},
		},
		theme: { current: "dark" },
		toggleMode: vi.fn(),
		setMode: vi.fn(),
		resetMode: vi.fn(),
		modeStorageKey: "mode",
		themeStorageKey: "theme",
		userPrefersMode: "dark",
		systemPrefersMode: "dark",
		generateSetInitialModeExpression: vi.fn(),
	};
});

const iconFn = (() => "") as unknown as (() => string) & { size: number };
iconFn.size = 16;

vi.mock("lucide-svelte", () => ({
	default: iconFn,
	ArrowLeft: iconFn,
	Check: iconFn,
	Copy: iconFn,
	Download: iconFn,
	Eye: iconFn,
	EyeOff: iconFn,
	FileJson: iconFn,
	FileSpreadsheet: iconFn,
	FileText: iconFn,
	KeyRound: iconFn,
	LogIn: iconFn,
	Mail: iconFn,
	Menu: iconFn,
	Minus: iconFn,
	Moon: iconFn,
	Pause: iconFn,
	Play: iconFn,
	Plus: iconFn,
	Search: iconFn,
	Send: iconFn,
	Shield: iconFn,
	Sun: iconFn,
	Trash2: iconFn,
	Upload: iconFn,
	UserPlus: iconFn,
	Volume2: iconFn,
	X: iconFn,
}));
