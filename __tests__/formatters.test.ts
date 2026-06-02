import { describe, it, expect, vi, afterEach } from 'vitest';
import {
	formatDate,
	formatDateShort,
	formatDateTime,
	formatTime,
	formatRelative,
	formatNumber,
	formatPercentage,
	formatBytes,
} from '../src/utils/formatters';

describe('formatDate', () => {
	it('formatDate returns a formatted date string', () => {
		const date = new Date(2025, 0, 15); // Jan 15, 2025
		const result = formatDate(date);
		// Should contain the date parts
		expect(result).toContain('2025');
		expect(result).toContain('15');
	});
});

describe('formatDateShort', () => {
	it('formats a date in short pt-BR format', () => {
		const date = new Date(2025, 4, 15, 12, 0, 0); // local time
		const result = formatDateShort(date);
		expect(result).toContain('15');
		expect(result).toContain('05');
		expect(result).toContain('2025');
	});
});

describe('formatDateTime', () => {
	it('formats date and time together', () => {
		const date = new Date('2025-05-15T14:30:00');
		const result = formatDateTime(date);
		expect(result).toContain('15');
		expect(result).toContain('2025');
	});
});

describe('formatTime', () => {
	it('formats time only', () => {
		const date = new Date('2025-05-15T14:30:00');
		const result = formatTime(date);
		expect(result).toMatch(/\d{2}:\d{2}/);
	});
});

describe('formatRelative', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns "agora" for very recent timestamps', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const recent = new Date(2025, 4, 15, 11, 59, 30);
		expect(formatRelative(recent)).toBe('agora');
	});

	it('returns minutes ago for recent timestamps', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 5, 0));
		const fiveMinAgo = new Date(2025, 4, 15, 12, 0, 0);
		expect(formatRelative(fiveMinAgo)).toBe('5 minutos atrás');
	});

	it('returns "ontem" for yesterday', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const yesterday = new Date(2025, 4, 14, 12, 0, 0);
		expect(formatRelative(yesterday)).toBe('ontem');
	});
});

describe('formatNumber', () => {
	it('formatNumber formats large numbers', () => {
		const result = formatNumber(1234567.89);
		// The exact format depends on locale, but should include grouping
		expect(result).not.toBe('1234567.89');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(10);
	});

	it('formats integer', () => {
		expect(formatNumber(42)).toContain('42');
	});
});

describe('formatPercentage', () => {
	it('formatPercentage formats ratio as percentage', () => {
		const result = formatPercentage(0.756);
		// Should include the number and percent sign
		expect(result).toContain('%');
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(0);
	});
});

describe('formatBytes', () => {
	it('formats bytes', () => {
		expect(formatBytes(0)).toBe('0 B');
		expect(formatBytes(500)).toBe('500 B');
	});

	it('formats kilobytes', () => {
		expect(formatBytes(1024)).toBe('1.0 KB');
		expect(formatBytes(1536)).toBe('1.5 KB');
	});

	it('formats megabytes', () => {
		expect(formatBytes(1048576)).toBe('1.0 MB');
	});

	it('formats gigabytes', () => {
		expect(formatBytes(1073741824)).toBe('1.0 GB');
	});
});
