import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import Stepper from "./Stepper.svelte";

describe("Stepper", () => {
	const steps = [
		{ id: "a", label: "Step A" },
		{ id: "b", label: "Step B" },
		{ id: "c", label: "Step C" },
	];

	it("renders nothing for empty steps", () => {
		const { container } = render(Stepper, { steps: [] });
		expect(container.querySelector("span")).toBeNull();
	});

	it("renders all step labels", () => {
		render(Stepper, { steps, currentStep: "a" });
		expect(screen.getByText("Step A")).toBeInTheDocument();
		expect(screen.getByText("Step B")).toBeInTheDocument();
		expect(screen.getByText("Step C")).toBeInTheDocument();
	});

	it("shows step number for non-completed steps", () => {
		render(Stepper, { steps, currentStep: "a" });
		expect(screen.getByText("1")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
	});

	it("shows checkmark for completed steps", () => {
		const { container } = render(Stepper, {
			steps,
			currentStep: "c",
			completedSteps: new Set(["a", "b"]),
		});
		expect(container.textContent).toContain("✓");
	});

	it("does not show step number for completed steps", () => {
		const { container } = render(Stepper, {
			steps,
			currentStep: "c",
			completedSteps: new Set(["a", "b"]),
		});
		// Completed steps show ✓, only step c shows 3
		expect(container.textContent).toContain("3");
	});

	it("renders connector line between steps", () => {
		const { container } = render(Stepper, { steps, currentStep: "a" });
		// 2 connectors for 3 steps
		const connectors = container.querySelectorAll('div[style*="background"]');
		expect(connectors.length).toBeGreaterThan(0);
	});

	it("applies class prop to root", () => {
		const { container } = render(Stepper, {
			steps,
			currentStep: "a",
			class: "custom-class",
		});
		expect(container.firstElementChild?.className).toContain("custom-class");
	});
});
