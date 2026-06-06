import { describe, it, expect } from 'vitest';
import DashboardShellTopnav from './DashboardShellTopnav.svelte';

describe('DashboardShellTopnav', () => {
	it('exports a Svelte component', () => {
		expect(DashboardShellTopnav).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof DashboardShellTopnav).toBe('function');
	});
});
