import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// jsdom polyfills for bits-ui
if (typeof window !== 'undefined') {
	window.CSS = { supports: () => true, escape: (s: string) => s } as any;
	window.Element.prototype.scrollTo = () => {};
	class MockResizeObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.ResizeObserver = MockResizeObserver as any;
	class MockIntersectionObserver {
		observe() {}
		unobserve() {}
		disconnect() {}
	}
	window.IntersectionObserver = MockIntersectionObserver as any;
	window.HTMLElement.prototype.hasPointerCapture = () => false;
}

vi.mock('svelte-sonner', () => ({
	Toaster: (() => '') as unknown as any,
	toast: {
		error: vi.fn(),
		success: vi.fn(),
		info: vi.fn(),
		warning: vi.fn(),
	},
}));

vi.mock('mode-watcher', () => {
	const mode = { current: 'dark', subscribe: (fn: any) => { fn('dark'); return () => {}; } };
	const theme = { current: 'dark', subscribe: (fn: any) => { fn('dark'); return () => {}; } };
	return {
		ModeWatcher: (() => '') as unknown as any,
		mode,
		theme,
		toggleMode: vi.fn(),
		setMode: vi.fn(),
		resetMode: vi.fn(),
		modeStorageKey: 'mode',
		themeStorageKey: 'theme',
		userPrefersMode: 'dark',
		systemPrefersMode: 'dark',
		generateSetInitialModeExpression: vi.fn(),
	};
});

vi.mock('lucide-svelte', () => {
	const icon = () => '';
	icon.size = 16;
	return { Sun: icon, Moon: icon };
});
