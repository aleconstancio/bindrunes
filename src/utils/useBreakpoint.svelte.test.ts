import { describe, it, expect } from 'vitest';
import { useBreakpoint } from './useBreakpoint.svelte';

describe('useBreakpoint', () => {
	it('returns isAbove=true and isBelow=false on SSR (no window)', () => {
		const originalWindow = (globalThis as { window?: unknown }).window;
		// @ts-expect-error test
		delete globalThis.window;
		const bp = useBreakpoint('md');
		expect(bp.isAbove).toBe(true);
		expect(bp.isBelow).toBe(false);
		if (originalWindow !== undefined) {
			(globalThis as { window: unknown }).window = originalWindow;
		}
	});
});
