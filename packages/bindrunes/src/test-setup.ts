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
