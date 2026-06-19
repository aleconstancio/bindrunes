import type { BaseIssue, BaseSchema } from "valibot";
import { safeParse } from "valibot";

type FormValues = Record<string, unknown>;

interface CreateFormOptions<T extends FormValues> {
	schema?: BaseSchema<unknown, T, BaseIssue<unknown>>;
	initialValues?: Partial<T>;
	onSubmit?: (values: T) => Promise<void> | void;
	validateOn?: "submit" | "blur" | "change";
}

export function createForm<T extends FormValues>(options: CreateFormOptions<T> = {}) {
	const { schema, initialValues = {} as Partial<T>, onSubmit, validateOn = "submit" } = options;

	let values = $state<T>({ ...initialValues } as T);
	let errors = $state<Record<string, string>>({});
	let touched = $state<Record<string, boolean>>({});
	let isSubmitting = $state(false);
	let isSubmitted = $state(false);

	const isDirty = $derived(JSON.stringify(values) !== JSON.stringify(initialValues));

	const isValid = $derived(Object.keys(errors).length === 0);

	function validate(): boolean {
		if (!schema) return true;

		const result = safeParse(schema, values);
		if (result.success) {
			errors = {};
			return true;
		}

		const newErrors: Record<string, string> = {};
		for (const issue of result.issues) {
			const path = issue.path?.map((p) => p.key).join(".") ?? "";
			if (path && !newErrors[path]) {
				newErrors[path] = issue.message;
			}
		}
		errors = newErrors;
		return false;
	}

	function setFieldValue<K extends keyof T>(field: K, value: T[K]) {
		values = { ...values, [field]: value };

		if (validateOn === "change") {
			validate();
		}
	}

	function setFieldTouched(field: keyof T, value = true) {
		touched = { ...touched, [field]: value };

		if (validateOn === "blur") {
			validate();
		}
	}

	function getFieldError(field: string): string | undefined {
		return errors[field];
	}

	async function handleSubmit(e?: Event) {
		e?.preventDefault();

		if (!validate()) return false;

		isSubmitting = true;
		isSubmitted = false;

		try {
			await onSubmit?.(values);
			isSubmitted = true;
			return true;
		} catch {
			return false;
		} finally {
			isSubmitting = false;
		}
	}

	function reset() {
		values = { ...initialValues } as T;
		errors = {};
		touched = {};
		isSubmitting = false;
		isSubmitted = false;
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
		get isSubmitting() {
			return isSubmitting;
		},
		get isSubmitted() {
			return isSubmitted;
		},
		get isDirty() {
			return isDirty;
		},
		get isValid() {
			return isValid;
		},
		setFieldValue,
		setFieldTouched,
		getFieldError,
		validate,
		handleSubmit,
		reset,
	};
}
