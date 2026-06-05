import { describe, it, expect, afterEach } from 'vitest';
import { renderWithTheme } from './theme';
import { expectNoAxeViolations } from './axe';
import { mockBitsUi } from './bits-ui-mock';

describe('helpers', () => {
	afterEach(() => {
		document.documentElement.removeAttribute('data-theme');
		document.documentElement.removeAttribute('data-aesthetic');
		document.documentElement.removeAttribute('data-density');
	});

	it('renderWithTheme applies data-theme', () => {
		const Stub = (() => ({
			render: () => document.createElement('span'),
		})) as never;
		renderWithTheme(Stub, { theme: 'dracula' });
		expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
	});

	it('mockBitsUi returns 32 primitives', () => {
		const m = mockBitsUi();
		expect(Object.keys(m).length).toBeGreaterThanOrEqual(24);
		expect(m.Dialog).toBeDefined();
		expect(m.Tabs).toBeDefined();
	});

	it('expectNoAxeViolations passes for a clean container', async () => {
		const div = document.createElement('div');
		div.innerHTML = '<button>Click</button>';
		await expectNoAxeViolations(div);
	});
});
