import { safeParse } from "valibot";

export type WizardStep = {
  id: string;
  label: string;
  schema?: any;
};

export type WizardOptions = {
  steps: WizardStep[];
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
};

export function createWizard(options: WizardOptions) {
  const { steps, onSubmit } = options;

  let currentStepIndex = $state(0);
  let values = $state<Record<string, any>>(options.initialValues ?? {});
  let errors = $state<Record<string, string>>({});
  let isSubmitting = $state(false);
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
        const path = issue.path?.map((p: any) => p.key).join(".") ?? "unknown";
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

  function setFieldValue(field: string, value: any) {
    values = { ...values, [field]: value };
    if (errors[field]) {
      const next = { ...errors };
      delete next[field];
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
    values = options.initialValues ?? {};
    errors = {};
    isSubmitting = false;
    completedSteps = new Set();
  }

  return {
    get currentStep() { return currentStep; },
    get currentStepIndex() { return currentStepIndex; },
    get isFirstStep() { return isFirstStep; },
    get isLastStep() { return isLastStep; },
    get values() { return values; },
    get errors() { return errors; },
    get isSubmitting() { return isSubmitting; },
    get completedSteps() { return completedSteps; },
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
