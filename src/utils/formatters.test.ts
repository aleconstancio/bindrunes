import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import {
	formatDate,
	formatDateShort,
	formatDateTime,
	formatTime,
	formatRelative,
	formatNumber,
	formatPercentage,
	formatBytes,
	setLocale,
} from '../utils/formatters';

describe('formatDate', () => {
	it('formatDate returns a formatted date string', () => {
		const date = new Date(2025, 0, 15);
		const result = formatDate(date);
		expect(result).toContain('2025');
		expect(result).toContain('15');
	});

	it('accepts string input', () => {
		expect(formatDate('2025-01-15')).toContain('2025');
	});

	it('accepts number input', () => {
		expect(formatDate(Date.now())).toBeDefined();
	});

	it('respects custom options', () => {
		const result = formatDate(new Date(2025, 0, 15), { year: 'numeric' });
		expect(result).toContain('2025');
	});
});

describe('setLocale', () => {
	afterEach(() => {
		setLocale('en');
	});

	it('changes the locale used by formatters', () => {
		setLocale('en-US');
		const result = formatDateShort(new Date(2025, 0, 15));
		expect(result).toContain('2025');
	});
});

describe('formatDateShort', () => {
	it('formats a date in short format', () => {
		const date = new Date(2025, 4, 15, 12, 0, 0);
		const result = formatDateShort(date);
		expect(result).toContain('15');
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
	beforeEach(() => {
		setLocale('pt-BR');
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('returns "agora" for very recent timestamps', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const recent = new Date(2025, 4, 15, 11, 59, 30);
		expect(formatRelative(recent)).toBe('agora');
	});

	it('returns "1 minuto atrás" for 1 minute ago', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 1, 0));
		const oneMinAgo = new Date(2025, 4, 15, 12, 0, 0);
		expect(formatRelative(oneMinAgo)).toBe('1 minuto atrás');
	});

	it('returns minutes ago for recent timestamps', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 5, 0));
		const fiveMinAgo = new Date(2025, 4, 15, 12, 0, 0);
		expect(formatRelative(fiveMinAgo)).toBe('5 minutos atrás');
	});

	it('returns "1 hora atrás" for 1 hour ago', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 13, 0, 0));
		const oneHourAgo = new Date(2025, 4, 15, 12, 0, 0);
		expect(formatRelative(oneHourAgo)).toBe('1 hora atrás');
	});

	it('returns hours ago for past hours', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 15, 0, 0));
		const threeHoursAgo = new Date(2025, 4, 15, 12, 0, 0);
		expect(formatRelative(threeHoursAgo)).toBe('3 horas atrás');
	});

	it('returns "ontem" for yesterday', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const yesterday = new Date(2025, 4, 14, 12, 0, 0);
		expect(formatRelative(yesterday)).toBe('ontem');
	});

	it('returns days ago for recent days', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const threeDaysAgo = new Date(2025, 4, 12, 12, 0, 0);
		expect(formatRelative(threeDaysAgo)).toBe('3 dias atrás');
	});

	it('falls back to date format for >30 days', () => {
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const longAgo = new Date(2025, 0, 1, 12, 0, 0);
		const result = formatRelative(longAgo);
		expect(result).toContain('2025');
	});

	it('uses English fallback when locale unknown', () => {
		setLocale('fr-FR');
		vi.useFakeTimers();
		vi.setSystemTime(new Date(2025, 4, 15, 12, 0, 0));
		const recent = new Date(2025, 4, 15, 11, 59, 30);
		expect(formatRelative(recent)).toBe('now');
	});
});

describe('formatNumber', () => {
	it('formatNumber formats large numbers', () => {
		const result = formatNumber(1234567.89);
		expect(typeof result).toBe('string');
		expect(result.length).toBeGreaterThan(10);
	});

	it('formats integer', () => {
		expect(formatNumber(42)).toContain('42');
	});

	it('accepts options', () => {
		const result = formatNumber(3.14159, { maximumFractionDigits: 2 });
		expect(result).toMatch(/3[.,]14/);
	});
});

describe('formatPercentage', () => {
	it('formatPercentage formats ratio as percentage', () => {
		const result = formatPercentage(0.756);
		expect(result).toContain('%');
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
