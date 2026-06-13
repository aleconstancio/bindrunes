import { tick } from "svelte";
import { describe, expect, it, vi } from "vitest";
import { mountComposable } from "../helpers/test-wrapper.svelte";
import { createWizard } from "./createWizard.svelte";

describe("createWizard", () => {
	const steps = [
		{ id: "personal", label: "Personal Info" },
		{ id: "preferences", label: "Preferences" },
		{ id: "confirm", label: "Confirm" },
	];

	it("initializes with first step", async () => {
		const wizard = await mountComposable(() =>
			createWizard({
				steps,
				initialValues: { name: "" },
				onSubmit: vi.fn(),
			}),
		);
		expect(wizard.currentStep.id).toBe("personal");
		expect(wizard.isFirstStep).toBe(true);
		expect(wizard.isLastStep).toBe(false);
	});

	it("navigates to next step", async () => {
		const wizard = await mountComposable(() => createWizard({ steps, onSubmit: vi.fn() }));
		wizard.next();
		await tick();
		expect(wizard.currentStep.id).toBe("preferences");
		expect(wizard.completedSteps.has("personal")).toBe(true);
	});

	it("navigates back", async () => {
		const wizard = await mountComposable(() => createWizard({ steps, onSubmit: vi.fn() }));
		wizard.next();
		wizard.back();
		expect(wizard.currentStep.id).toBe("personal");
	});

	it("goes to specific step", async () => {
		const wizard = await mountComposable(() => createWizard({ steps, onSubmit: vi.fn() }));
		wizard.goTo("confirm");
		expect(wizard.currentStep.id).toBe("confirm");
	});

	it("sets field values", async () => {
		const wizard = await mountComposable(() =>
			createWizard({
				steps,
				initialValues: { name: "" },
				onSubmit: vi.fn(),
			}),
		);
		wizard.setFieldValue("name", "Alice");
		expect(wizard.values.name).toBe("Alice");
	});

	it("submits on last step", async () => {
		const onSubmit = vi.fn();
		const wizard = await mountComposable(() => createWizard({ steps, onSubmit }));
		wizard.goTo("confirm");
		await wizard.submit();
		expect(onSubmit).toHaveBeenCalled();
	});

	it("resets to initial state", async () => {
		const wizard = await mountComposable(() =>
			createWizard({
				steps,
				initialValues: { name: "" },
				onSubmit: vi.fn(),
			}),
		);
		wizard.setFieldValue("name", "Alice");
		wizard.next();
		wizard.reset();
		expect(wizard.currentStep.id).toBe("personal");
		expect(wizard.values.name).toBe("");
		expect(wizard.completedSteps.size).toBe(0);
	});

	it("identifies last step", async () => {
		const wizard = await mountComposable(() => createWizard({ steps, onSubmit: vi.fn() }));
		wizard.goTo("confirm");
		expect(wizard.isLastStep).toBe(true);
	});
});
