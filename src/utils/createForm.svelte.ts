import { safeParse } from "valibot";
import type { BaseSchema, InferInput, InferOutput } from "valibot";

export interface CreateFormOptions<TShape extends Record<string, BaseSchema<any, any, any>>> {
  schema: TShape;
  initialValues: { [K in keyof TShape]: InferInput<TShape[K]> };
  onSubmit?: (values: { [K in keyof TShape]: InferOutput<TShape[K]> }) => void | Promise<void>;
  onSubmitError?: (error: Error) => void;
}

export interface FormState<TShape extends Record<string, BaseSchema<any, any, any>>> {
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
  validate(): Promise<boolean>;
  reset(): void;
  handleSubmit(e: SubmitEvent): Promise<void>;
}

export type InferSchemaType<T extends Record<string, BaseSchema<any, any, any>>> = {
  [K in keyof T]: InferOutput<T[K]>;
};

export function createForm<TShape extends Record<string, BaseSchema<any, any, any>>>(
  options: CreateFormOptions<TShape>
): FormState<TShape> {
  let initial = { ...options.initialValues } as { [K in keyof TShape]: InferOutput<TShape[K]> };
  let values = $state({ ...initial }) as { [K in keyof TShape]: InferOutput<TShape[K]> };
  let errors = $state({}) as { [K in keyof TShape]?: string };
  let touched = $state({}) as { [K in keyof TShape]?: boolean };
  let dirty = $state({}) as { [K in keyof TShape]?: boolean };
  let isSubmitting = $state(false);
  let isSubmitted = $state(false);

  let isValid = $derived(Object.keys(errors).length === 0);
  let isDirtyDerived = $derived(Object.values(dirty).some(Boolean));

  function runFieldValidation(field: keyof TShape): string | undefined {
    const schema = options.schema[field];
    const value = values[field];
    const result = safeParse(schema, value);
    if (!result.success) {
      return result.issues[0]?.message ?? "Invalid value";
    }
    return undefined;
  }

  function setFieldValue<K extends keyof TShape>(field: K, value: InferOutput<TShape[K]>) {
    values[field] = value;
    if (value !== initial[field]) {
      dirty[field] = true;
    }
    const error = runFieldValidation(field);
    if (error) {
      errors[field] = error;
    } else {
      delete errors[field];
    }
  }

  function setFieldTouched<K extends keyof TShape>(field: K, touchedValue?: boolean) {
    touched[field] = touchedValue ?? true;
  }

  async function validate(): Promise<boolean> {
    let allValid = true;
    for (const field in options.schema) {
      const error = runFieldValidation(field);
      if (error) {
        errors[field] = error;
        allValid = false;
      } else {
        delete errors[field];
      }
    }
    return allValid;
  }

  function reset() {
    values = { ...initial } as { [K in keyof TShape]: InferOutput<TShape[K]> };
    errors = {};
    touched = {};
    dirty = {};
    isSubmitted = false;
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    isSubmitted = true;
    for (const field in options.schema) {
      touched[field] = true;
    }
    const allValid = await validate();
    if (!allValid) return;
    if (!options.onSubmit) return;
    isSubmitting = true;
    try {
      await options.onSubmit(values as { [K in keyof TShape]: InferOutput<TShape[K]> });
    } catch (err) {
      options.onSubmitError?.(err instanceof Error ? err : new Error(String(err)));
      throw err;
    } finally {
      isSubmitting = false;
    }
  }

  return {
    get values() { return values; },
    get errors() { return errors; },
    get touched() { return touched; },
    get dirty() { return dirty; },
    get isSubmitting() { return isSubmitting; },
    get isSubmitted() { return isSubmitted; },
    get isValid() { return isValid; },
    get isDirty() { return isDirtyDerived; },
    setFieldValue,
    setFieldTouched,
    validate,
    reset,
    handleSubmit,
  };
}
