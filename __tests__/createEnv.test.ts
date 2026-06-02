import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createEnv } from '../src/utils/createEnv';

describe('createEnv', () => {
	it('get returns fallback when var is missing', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.get('MISSING', 'default')).toBe('default');
	});

	it('get returns undefined when var is missing and no fallback', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.get('MISSING')).toBeUndefined();
	});

	it('get throws in strict mode when var is missing', () => {
		const env = createEnv({ prefix: 'VITE', strict: true });
		expect(() => env.get('MISSING')).toThrow('Missing env var: VITE_MISSING');
	});

	it('getNumber returns fallback for non-numeric value', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.getNumber('PORT', 3000)).toBe(3000);
	});

	it('getNumber returns fallback when key is missing', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.getNumber('MISSING', 42)).toBe(42);
	});

	it('getBoolean returns fallback when key is missing', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.getBoolean('MISSING', true)).toBe(true);
	});

	it('works without prefix', () => {
		const env = createEnv();
		expect(env.get('MISSING', 'fallback')).toBe('fallback');
	});

	it('getNumber returns undefined when key missing and no fallback', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.getNumber('MISSING')).toBeUndefined();
	});

	it('getBoolean returns undefined when key missing and no fallback', () => {
		const env = createEnv({ prefix: 'VITE' });
		expect(env.getBoolean('MISSING')).toBeUndefined();
	});
});
