import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createToast } from './createToast.svelte';
import { toast as sonnerToast } from 'svelte-sonner';

vi.mock('svelte-sonner', () => ({
	toast: {
		success: vi.fn().mockReturnValue('success-id'),
		error: vi.fn().mockReturnValue('error-id'),
		warning: vi.fn().mockReturnValue('warning-id'),
		info: vi.fn().mockReturnValue('info-id'),
		dismiss: vi.fn(),
	},
}));

describe('createToast', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it('exposes success, error, warning, info, dismiss', () => {
		const t = createToast();
		expect(typeof t.success).toBe('function');
		expect(typeof t.error).toBe('function');
		expect(typeof t.warning).toBe('function');
		expect(typeof t.info).toBe('function');
		expect(typeof t.dismiss).toBe('function');
	});

	it('success calls sonner with default duration and position', () => {
		const t = createToast();
		t.success('hi');
		expect(sonnerToast.success).toHaveBeenCalledWith('hi', {
			duration: 4000,
			position: 'bottom-right',
		});
	});

	it('error calls sonner with 5000ms default duration', () => {
		const t = createToast();
		t.error('oops');
		expect(sonnerToast.error).toHaveBeenCalledWith('oops', {
			duration: 5000,
			position: 'bottom-right',
		});
	});

	it('warning and info use default 4000ms duration', () => {
		const t = createToast();
		t.warning('warn');
		expect(sonnerToast.warning).toHaveBeenCalledWith('warn', {
			duration: 4000,
			position: 'bottom-right',
		});
		t.info('info');
		expect(sonnerToast.info).toHaveBeenCalledWith('info', {
			duration: 4000,
			position: 'bottom-right',
		});
	});

	it('passes custom duration from options', () => {
		const t = createToast();
		t.success('hi', { duration: 1000 });
		expect(sonnerToast.success).toHaveBeenCalledWith('hi', {
			duration: 1000,
			position: 'bottom-right',
		});
	});

	it('uses defaultDuration from constructor', () => {
		const t = createToast({ defaultDuration: 2000 });
		t.success('hi');
		expect(sonnerToast.success).toHaveBeenCalledWith('hi', {
			duration: 2000,
			position: 'bottom-right',
		});
	});

	it('uses position from constructor', () => {
		const t = createToast({ position: 'top-right' });
		t.success('hi');
		expect(sonnerToast.success).toHaveBeenCalledWith('hi', {
			duration: 4000,
			position: 'top-right',
		});
	});

	it('forwards action and description options', () => {
		const t = createToast();
		const onClick = vi.fn();
		t.success('hi', { description: 'desc', action: { label: 'go', onClick } });
		expect(sonnerToast.success).toHaveBeenCalledWith('hi', {
			duration: 4000,
			position: 'bottom-right',
			description: 'desc',
			action: { label: 'go', onClick },
		});
	});

	it('dismiss forwards id to sonner', () => {
		const t = createToast();
		t.dismiss('abc');
		expect(sonnerToast.dismiss).toHaveBeenCalledWith('abc');
	});

	it('dismiss without id', () => {
		const t = createToast();
		t.dismiss();
		expect(sonnerToast.dismiss).toHaveBeenCalledWith(undefined);
	});
});
