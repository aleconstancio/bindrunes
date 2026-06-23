import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import WizardForm from "./WizardForm.svelte";

describe("WizardForm", () => {
	const steps = [
		{ id: "1", title: "Step 1", description: "First step" },
		{ id: "2", title: "Step 2", description: "Second step" },
	];

	it("renders without errors", () => {
		const { container } = render(WizardForm, {
			props: { steps },
		});
		expect(container).toBeTruthy();
	});

	it("renders with current step", () => {
		const { container } = render(WizardForm, {
			props: { steps, currentStep: 1 },
		});
		expect(container).toBeTruthy();
	});

	it("renders with loading state", () => {
		const { container } = render(WizardForm, {
			props: { steps, loading: true },
		});
		expect(container).toBeTruthy();
	});

	it("renders with empty steps", () => {
		const { container } = render(WizardForm, {
			props: { steps: [] },
		});
		expect(container).toBeTruthy();
	});
});
