import type { BaseIssue, BaseSchema, InferInput, InferOutput } from "valibot";
import { safeParse } from "valibot";
import { toError } from "./toError";
import { validateWithSchema } from "./validateWithSchema";

export interface CreateFormOptions<
	TShape extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
> {
	schema: TShape;
	initialValues: { [K in keyof TShape]: InferInput<TShape[K]> };
	onSubmit?: (values: { [K in keyof TShape]: InferOutput<TShape[K]> }) => void | Promise<void>;
	onSubmitError?: (error: Error) => void;
}

export interface FormState<
	TShape extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
> {
	readonly values: { [K in keyof TShape]: InferOutput<TShape[K]> };
	readonly errors: { [K in keyof TShape]?: string };
	readonly touched: { [K in keyof TShape]?: boolean };
	readonly dirty: { [K in keyof TShape]?: boolean };
	readonly isSubmitting: boolean;
	readonly isSubmitted: boolean;
	readonly isValid: boolean;
	readonly isDirty: boolean;
	setFieldValue<K extends keyof TShape>(field: K, value: InferOutput<TShape[K]>): void;
	setFieldTouched<K extends keyof TShape>(field: K, touched?: boolean): void;
	validate(): boolean;
	reset(): void;
	handleSubmit(e: SubmitEvent): Promise<void>;
}

export type InferSchemaType<
	T extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
> = {
	[K in keyof T]: InferOutput<T[K]>;
};

export function useForm<
	TShape extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
>(options: CreateFormOptions<TShape>): FormState<TShape> {
	let initial = { ...options.initialValues } as { [K in keyof TShape]: InferOutput<TShape[K]> };
	let values = $state({ ...initial }) as { [K in keyof TShape]: InferOutput<TShape[K]> };
	let touched = $state({}) as { [K in keyof TShape]?: boolean };
	let isSubmitting = $state<boolean>(false);
	let isSubmitted = $state<boolean>(false);

	let dirty = $derived.by(() => {
		const d: { [K in keyof TShape]?: boolean } = {};
		for (const field in options.schema) {
			if (values[field] !== initial[field]) {
				d[field] = true;
			}
		}
		return d;
	});

	let errors = $derived.by(() => {
		const shouldValidate =
			isSubmitted ||
			Object.keys(options.schema).some(
				(field) => touched[field] || values[field] !== initial[field],
			);
		if (!shouldValidate) return {};
		return validateWithSchema(options.schema, values) as { [K in keyof TShape]?: string };
	});

	let isValid = $derived.by(() => {
		for (const field in options.schema) {
			const result = safeParse(options.schema[field], values[field]);
			if (!result.success) return false;
		}
		return true;
	});

	let isDirtyDerived = $derived(Object.values(dirty).some(Boolean));

	function setFieldValue<K extends keyof TShape>(field: K, value: InferOutput<TShape[K]>) {
		values[field] = value;
	}

	function setFieldTouched<K extends keyof TShape>(field: K, touchedValue?: boolean) {
		touched[field] = touchedValue ?? true;
	}

	function validate(): boolean {
		for (const field in options.schema) {
			touched[field] = true;
		}
		return isValid;
	}

	function reset() {
		values = { ...initial } as { [K in keyof TShape]: InferOutput<TShape[K]> };
		touched = {};
		isSubmitted = false;
	}

	async function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		isSubmitted = true;
		for (const field in options.schema) {
			touched[field] = true;
		}
		const allValid = validate();
		if (!allValid) return;
		if (!options.onSubmit) return;
		isSubmitting = true;
		try {
			await options.onSubmit(values as { [K in keyof TShape]: InferOutput<TShape[K]> });
		} catch (err) {
			options.onSubmitError?.(toError(err));
			throw err;
		} finally {
			isSubmitting = false;
		}
	}

	return {
		get values() {
			return values;
		},
		get errors() {
			return errors;
		},
		get touched() {
			return touched;
		},
		get dirty() {
			return dirty;
		},
		get isSubmitting() {
			return isSubmitting;
		},
		get isSubmitted() {
			return isSubmitted;
		},
		get isValid() {
			return isValid;
		},
		get isDirty() {
			return isDirtyDerived;
		},
		setFieldValue,
		setFieldTouched,
		validate,
		reset,
		handleSubmit,
	};
}
