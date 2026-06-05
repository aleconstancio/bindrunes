import { describe, it, expect } from 'vitest';
import DashboardShellRight from './DashboardShellRight.svelte';

describe('DashboardShellRight', () => {
	it('exports a Svelte component', () => {
		expect(DashboardShellRight).toBeDefined();
	});

	it('is a function', () => {
		expect(typeof DashboardShellRight).toBe('function');
	});
});
