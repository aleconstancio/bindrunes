import { describe, it, expect, vi, beforeEach } from 'vitest';
import { waitFor } from '@testing-library/svelte';
import { mountComposable } from '../helpers/test-wrapper.svelte';
import { createForm } from './createForm.svelte';
import { string, email, minLength, pipe, number } from 'valibot';

const testSchema = {
	name: pipe(string(), minLength(1, 'Name is required')),
	email: pipe(string(), email('Invalid email')),
	age: number(),
};

const testInitialValues = { name: '', email: '', age: 0 };

describe('createForm — initial state', () => {
	it('initializes values from initialValues', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.values).toEqual({ name: '', email: '', age: 0 });
	});

	it('initial errors are empty', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.errors).toEqual({});
	});

	it('initial touched is empty', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.touched).toEqual({});
	});

	it('initial dirty is empty', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.dirty).toEqual({});
	});

	it('isDirty is false initially', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.isDirty).toBe(false);
	});

	it('isValid is true initially when all fields are valid', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
			})
		);
		expect(form.isValid).toBe(true);
	});

	it('isSubmitting is false initially', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.isSubmitting).toBe(false);
	});

	it('isSubmitted is false initially', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		expect(form.isSubmitted).toBe(false);
	});
});

describe('createForm — setFieldValue', () => {
	it('updates the value for the given field', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', 'Alice');
		expect(form.values.name).toBe('Alice');
	});

	it('marks the field as dirty when value differs from initial', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', 'Alice');
		expect(form.dirty.name).toBe(true);
	});

	it('does not mark field as dirty when value equals initial', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', '');
		expect(form.dirty.name).toBeUndefined();
	});

	it('runs field validation and sets error on invalid value', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('email', 'not-an-email');
		expect(form.errors.email).toBeDefined();
	});

	it('clears field error when value becomes valid', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('email', 'bad');
		expect(form.errors.email).toBeDefined();
		form.setFieldValue('email', 'valid@email.com');
		expect(form.errors.email).toBeUndefined();
	});

	it('isDirty becomes true after a field is dirtied', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', 'changed');
		expect(form.isDirty).toBe(true);
	});
});

describe('createForm — setFieldTouched', () => {
	it('marks the field as touched when called without second argument', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldTouched('name');
		expect(form.touched.name).toBe(true);
	});

	it('marks the field as touched when called with true', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldTouched('email', true);
		expect(form.touched.email).toBe(true);
	});

	it('unmarks the field as touched when called with false', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldTouched('name', true);
		form.setFieldTouched('name', false);
		expect(form.touched.name).toBe(false);
	});
});

describe('createForm — validate', () => {
	it('returns true when all fields are valid', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
			})
		);
		const result = await form.validate();
		expect(result).toBe(true);
	});

	it('returns false when a field is invalid', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		const result = await form.validate();
		expect(result).toBe(false);
	});

	it('sets error messages on invalid fields', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		await form.validate();
		expect(form.errors.name).toBe('Name is required');
		expect(form.errors.email).toBe('Invalid email');
	});

	it('clears errors on previously-invalid fields that are now valid', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		await form.validate();
		expect(form.errors.name).toBeDefined();

		form.setFieldValue('name', 'Alice');
		form.setFieldValue('email', 'alice@test.com');
		const result = await form.validate();
		expect(result).toBe(true);
		expect(form.errors.name).toBeUndefined();
		expect(form.errors.email).toBeUndefined();
	});
});

describe('createForm — handleSubmit', () => {
	it('sets isSubmitted to true', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: vi.fn(),
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(form.isSubmitted).toBe(true);
	});

	it('touches all fields', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: vi.fn(),
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(form.touched.name).toBe(true);
		expect(form.touched.email).toBe(true);
	});

	it('calls onSubmit when validation passes', async () => {
		const onSubmit = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit,
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(onSubmit).toHaveBeenCalledWith({
			name: 'Alice',
			email: 'alice@test.com',
			age: 25,
		});
	});

	it('does not call onSubmit when validation fails', async () => {
		const onSubmit = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: testInitialValues,
				onSubmit,
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it('sets isSubmitting while onSubmit is pending', async () => {
		let resolveSubmit!: () => void;
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: () => new Promise<void>((resolve) => { resolveSubmit = resolve; }),
			})
		);

		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		const promise = form.handleSubmit(event);
		await waitFor(() => expect(form.isSubmitting).toBe(true));

		resolveSubmit!();
		await promise;
	});

	it('clears isSubmitting after onSubmit completes', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: vi.fn(),
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(form.isSubmitting).toBe(false);
	});

	it('calls onSubmitError when onSubmit throws', async () => {
		const error = new Error('submit failed');
		const onSubmitError = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: () => { throw error; },
				onSubmitError,
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await expect(form.handleSubmit(event)).rejects.toThrow('submit failed');
		expect(onSubmitError).toHaveBeenCalledWith(error);
	});
});

describe('createForm — reset', () => {
	it('restores values to initialValues', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', 'Alice');
		form.reset();
		expect(form.values.name).toBe('');
	});

	it('clears all errors', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		await form.validate();
		expect(Object.keys(form.errors).length).toBeGreaterThan(0);
		form.reset();
		expect(form.errors).toEqual({});
	});

	it('clears all touched state', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldTouched('name');
		form.reset();
		expect(form.touched).toEqual({});
	});

	it('clears all dirty state', async () => {
		const form = await mountComposable(() =>
			createForm({ schema: testSchema, initialValues: testInitialValues })
		);
		form.setFieldValue('name', 'changed');
		form.reset();
		expect(form.dirty).toEqual({});
	});

	it('sets isSubmitted to false', async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: 'Alice', email: 'alice@test.com', age: 25 },
				onSubmit: vi.fn(),
			})
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(form.isSubmitted).toBe(true);
		form.reset();
		expect(form.isSubmitted).toBe(false);
	});
});
