import { email, minLength, pipe, string } from "valibot";
import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createForm } from "./createForm.svelte";

const testSchema = {
	name: pipe(string(), minLength(1, "Name is required")),
	email: pipe(string(), email("Invalid email")),
};

describe("createForm", () => {
	it("initializes with provided values", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		expect(form.values).toEqual({ name: "", email: "" });
	});

	it("isDirty is false initially", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		expect(form.isDirty).toBe(false);
	});

	it("setFieldValue updates value and marks dirty", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		form.setFieldValue("name", "Alice");
		expect(form.values.name).toBe("Alice");
		expect(form.dirty.name).toBe(true);
		expect(form.isDirty).toBe(true);
	});

	it("setFieldTouched marks field as touched", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		form.setFieldTouched("name");
		expect(form.touched.name).toBe(true);
	});

	it("validate returns true when all fields are valid", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "Alice", email: "alice@test.com" },
			}),
		);
		expect(form.validate()).toBe(true);
	});

	it("validate returns false when fields are invalid", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		expect(form.validate()).toBe(false);
		expect(form.errors.name).toBe("Name is required");
	});

	it("reset restores initial values", async () => {
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
			}),
		);
		form.setFieldValue("name", "Alice");
		form.reset();
		expect(form.values.name).toBe("");
		expect(form.isDirty).toBe(false);
	});

	it("calls onSubmit on valid submit", async () => {
		const onSubmit = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "Alice", email: "alice@test.com" },
				onSubmit,
			}),
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(onSubmit).toHaveBeenCalledWith({
			name: "Alice",
			email: "alice@test.com",
		});
	});

	it("does not call onSubmit on invalid submit", async () => {
		const onSubmit = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "", email: "" },
				onSubmit,
			}),
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await form.handleSubmit(event);
		expect(onSubmit).not.toHaveBeenCalled();
	});

	it("calls onSubmitError when onSubmit throws", async () => {
		const onSubmitError = vi.fn();
		const form = await mountComposable(() =>
			createForm({
				schema: testSchema,
				initialValues: { name: "Alice", email: "alice@test.com" },
				onSubmit: () => {
					throw new Error("submit fail");
				},
				onSubmitError,
			}),
		);
		const event = { preventDefault: vi.fn() } as unknown as SubmitEvent;
		await expect(form.handleSubmit(event)).rejects.toThrow("submit fail");
		expect(onSubmitError).toHaveBeenCalled();
	});
});
