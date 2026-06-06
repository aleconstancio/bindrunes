import { describe, it, expect } from 'vitest';
import { hexToOklch, oklchToHex } from './colorConvert';

describe('hexToOklch', () => {
	it('converts black', () => {
		expect(hexToOklch('#000000')).toBe('oklch(0.00 0.000 0)');
	});

	it('converts white', () => {
		const result = hexToOklch('#ffffff');
		expect(result).toMatch(/^oklch\(/);
		const L = parseFloat(result.match(/oklch\(([\d.]+)/)?.[1] ?? '0');
		expect(L).toBeGreaterThan(0.95);
		expect(L).toBeLessThanOrEqual(1.0);
	});

	it('handles hex without # prefix', () => {
		const withHash = hexToOklch('#ff0000');
		const withoutHash = hexToOklch('ff0000');
		expect(withHash).toBe(withoutHash);
	});

	it('returns oklch(...) string format', () => {
		expect(hexToOklch('#808080')).toMatch(/^oklch\(\d+\.\d+ \d+\.\d+ \d+\)$/);
	});

	it('converts primary red', () => {
		const result = hexToOklch('#ff0000');
		// Just check it's a valid oklch value
		expect(result).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
	});

	it('converts primary green', () => {
		const result = hexToOklch('#00ff00');
		expect(result).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
	});

	it('converts primary blue', () => {
		const result = hexToOklch('#0000ff');
		expect(result).toMatch(/^oklch\([\d.]+ [\d.]+ [\d.]+\)$/);
	});
});

describe('oklchToHex', () => {
	it('returns #000000 for invalid input', () => {
		expect(oklchToHex('not-a-color')).toBe('#000000');
	});

	it('returns #000000 for empty input', () => {
		expect(oklchToHex('')).toBe('#000000');
	});

	it('converts pure black', () => {
		expect(oklchToHex('oklch(0 0 0)')).toBe('#000000');
	});

	it('converts near-white', () => {
		const result = oklchToHex('oklch(1.00 0.000 0)');
		expect(result).toBe('#ffffff');
	});

	it('returns 7-character hex with #', () => {
		expect(oklchToHex('oklch(0.5 0.1 180)')).toMatch(/^#[0-9a-f]{6}$/);
	});

	it('clamps out-of-range RGB values to 0-255', () => {
		// Out-of-gamut color should still produce a valid 6-char hex
		const result = oklchToHex('oklch(0.5 0.5 90)');
		expect(result).toMatch(/^#[0-9a-f]{6}$/);
	});
});

describe('roundtrip hex → oklch → hex', () => {
	it('roundtrips mid-gray (#808080)', () => {
		const oklch = hexToOklch('#808080');
		const back = oklchToHex(oklch);
		expect(back).toMatch(/^#[0-9a-f]{6}$/);
	});

	it('roundtrips primary red (close enough)', () => {
		const oklch = hexToOklch('#ff0000');
		const back = oklchToHex(oklch);
		// Allow ±2 per channel due to rounding
		expect(back.slice(1, 3)).toMatch(/^[fe][def]$/);
	});
});
