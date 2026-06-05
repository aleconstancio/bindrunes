import { describe, it, expect } from 'vitest';
import Popconfirm from './Popconfirm.svelte';

describe('Popconfirm', () => {
	it('exports a Svelte component', () => {
		expect(Popconfirm).toBeDefined();
	});

	it('is a function (Svelte component signature)', () => {
		expect(typeof Popconfirm).toBe('function');
	});
});
