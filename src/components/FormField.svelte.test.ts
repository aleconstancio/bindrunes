import { render, screen } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../helpers/axe";
import FormField from "./FormField.svelte";

describe("FormField", () => {
	it("renders with label", () => {
		render(FormField, { label: "Email", slots: { children: "" } });
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("renders a wrapper div for the field", () => {
		const { container } = render(FormField, { label: "Field", slots: { children: "" } });
		const wrapper = container.firstElementChild;
		expect(wrapper?.tagName).toBe("DIV");
	});

	it("shows required asterisk when required=true", () => {
		const { container } = render(FormField, {
			label: "Field",
			required: true,
			slots: { children: "" },
		});
		expect(container.textContent).toContain("*");
	});

	it("does not show asterisk when required=false", () => {
		const { container } = render(FormField, {
			label: "Field",
			required: false,
			slots: { children: "" },
		});
		// The label should not contain an asterisk
		const label = container.querySelector("label");
		expect(label?.textContent?.trim()).toBe("Field");
		expect(label?.textContent).not.toContain("*");
	});

	it("shows error message when error is provided", () => {
		render(FormField, {
			label: "Field",
			error: "Required field",
			slots: { children: "" },
		});
		expect(screen.getByText("Required field")).toBeInTheDocument();
	});

	it("shows hint message when hint is provided and no error", () => {
		render(FormField, {
			label: "Field",
			hint: "A helpful hint",
			slots: { children: "" },
		});
		expect(screen.getByText("A helpful hint")).toBeInTheDocument();
	});

	it("prefers error over hint when both are provided", () => {
		render(FormField, {
			label: "Field",
			hint: "A hint",
			error: "An error",
			slots: { children: "" },
		});
		expect(screen.getByText("An error")).toBeInTheDocument();
		expect(screen.queryByText("A hint")).not.toBeInTheDocument();
	});

	it("does not render label element when label is empty", () => {
		const { container } = render(FormField, { slots: { children: "" } });
		expect(container.querySelector("label")).toBeNull();
	});

	it("applies class prop to root", () => {
		const { container } = render(FormField, {
			class: "custom-class",
			slots: { children: "" },
		});
		expect(container.firstElementChild?.className).toContain("custom-class");
	});

	it("passes a11y checks", async () => {
		const { container } = render(FormField, {
			label: "Email",
			hint: "Hint",
			slots: { children: "" },
		});
		await expectNoAxeViolations(container);
	});
});
