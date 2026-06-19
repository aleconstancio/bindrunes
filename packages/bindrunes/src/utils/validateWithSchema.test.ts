import { minLength, number, pipe, string } from "valibot";
import { describe, expect, it } from "vitest";
import { validateWithSchema } from "./validateWithSchema";

describe("validateWithSchema", () => {
	const schema = {
		name: pipe(string(), minLength(1, "Name is required")),
		age: number(),
	};
	it("returns empty object when all fields valid", () => {
		const errors = validateWithSchema(schema, { name: "Alice", age: 30 });
		expect(Object.keys(errors)).toHaveLength(0);
	});
	it("returns error message for invalid field", () => {
		const errors = validateWithSchema(schema, { name: "", age: 30 });
		expect(errors.name).toBe("Name is required");
	});
	it("returns errors for multiple invalid fields", () => {
		const errors = validateWithSchema(schema, {
			name: "",
			age: "not a number" as unknown as number,
		});
		expect(errors.name).toBeDefined();
		expect(errors.age).toBeDefined();
	});
});
