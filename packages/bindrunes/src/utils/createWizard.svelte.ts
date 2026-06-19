import { type GenericSchema, safeParse } from "valibot";

export type WizardStep = {
	id: string;
	label: string;
	schema?: GenericSchema;
};

export type WizardOptions<TValues extends Record<string, unknown> = Record<string, unknown>> = {
	steps: WizardStep[];
	initialValues?: TValues;
	onSubmit: (values: TValues) => Promise<void> | void;
};

export function createWizard<TValues extends Record<string, unknown>>(
	options: WizardOptions<TValues>,
) {
	const { steps, onSubmit } = options;

	let currentStepIndex = $state<number>(0);
	let values = $state<TValues>(options.initialValues ?? ({} as TValues));
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state<boolean>(false);
	let completedSteps = $state<Set<string>>(new Set());

	const currentStep = $derived(steps[currentStepIndex]);
	const isFirstStep = $derived(currentStepIndex === 0);
	const isLastStep = $derived(currentStepIndex === steps.length - 1);

	async function validate(): Promise<boolean> {
		const step = steps[currentStepIndex];
		if (!step?.schema) {
			errors = {};
			return true;
		}
		const result = safeParse(step.schema, values);
		if (!result.success) {
			const newErrors: Record<string, string> = {};
			for (const issue of result.issues) {
				const path = issue.path?.map((p) => String(p.key)).join(".") ?? "unknown";
				newErrors[path] = issue.message;
			}
			errors = newErrors;
			return false;
		}
		errors = {};
		return true;
	}

	async function next() {
		const valid = await validate();
		if (!valid) return;
		completedSteps = new Set([...completedSteps, steps[currentStepIndex].id]);
		if (!isLastStep) {
			currentStepIndex++;
			errors = {};
		}
	}

	function back() {
		if (!isFirstStep) {
			currentStepIndex--;
			errors = {};
		}
	}

	function goTo(stepId: string) {
		const idx = steps.findIndex((s) => s.id === stepId);
		if (idx >= 0) {
			currentStepIndex = idx;
			errors = {};
		}
	}

	function setFieldValue<K extends keyof TValues>(field: K, value: TValues[K]) {
		values = { ...values, [field]: value };
		if (errors[field as string]) {
			const next = { ...errors };
			delete next[field as string];
			errors = next;
		}
	}

	async function submit() {
		const valid = await validate();
		if (!valid) return;
		isSubmitting = true;
		try {
			await onSubmit(values);
		} finally {
			isSubmitting = false;
		}
	}

	function reset() {
		currentStepIndex = 0;
		values = options.initialValues ?? ({} as TValues);
		errors = {};
		isSubmitting = false;
		completedSteps = new Set();
	}

	return {
		get currentStep() {
			return currentStep;
		},
		get currentStepIndex() {
			return currentStepIndex;
		},
		get isFirstStep() {
			return isFirstStep;
		},
		get isLastStep() {
			return isLastStep;
		},
		get values() {
			return values;
		},
		get errors() {
			return errors;
		},
		get isSubmitting() {
			return isSubmitting;
		},
		get completedSteps() {
			return completedSteps;
		},
		steps,
		next,
		back,
		goTo,
		setFieldValue,
		submit,
		reset,
		validate,
	};
}
