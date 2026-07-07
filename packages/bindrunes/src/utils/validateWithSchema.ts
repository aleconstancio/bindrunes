import type { BaseIssue, BaseSchema } from "valibot";
import { safeParse } from "valibot";

export function validateWithSchema<
	T extends Record<string, BaseSchema<unknown, unknown, BaseIssue<unknown>>>,
>(schema: T, values: { [K in keyof T]: unknown }): Partial<Record<keyof T & string, string>> {
	const errs: Partial<Record<keyof T & string, string>> = {};
	for (const field in schema) {
		const fieldSchema = schema[field];
		if (!fieldSchema) continue;
		const result = safeParse(fieldSchema, values[field] as unknown);
		if (!result.success) {
			errs[field] = result.issues[0]?.message ?? "Invalid value";
		}
	}
	return errs;
}
